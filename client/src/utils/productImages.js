const IMAGE_VARIANTS = {
  thumbnail: {
    width: 480,
    height: 480,
    resize: 'cover',
    quality: 70,
  },
  preview: {
    width: 320,
    height: 320,
    resize: 'cover',
    quality: 70,
  },
  modal: {
    width: 1100,
    height: 1100,
    resize: 'contain',
    quality: 78,
  },
};

const UPLOAD_IMAGE_OPTIONS = {
  maxDimension: 1600,
  quality: 0.82,
  type: 'image/webp',
};

function buildTransformParams(options) {
  return Object.entries(options).filter(([, value]) => value !== undefined);
}

function getRenderPath(pathname) {
  if (pathname.includes('/storage/v1/render/image/')) {
    return pathname;
  }

  if (pathname.includes('/storage/v1/object/public/')) {
    return pathname.replace(
      '/storage/v1/object/public/',
      '/storage/v1/render/image/public/'
    );
  }

  return null;
}

export function getTransformedImageUrl(imageUrl, variant = 'thumbnail') {
  if (!imageUrl) {
    return '';
  }

  const options = IMAGE_VARIANTS[variant] || IMAGE_VARIANTS.thumbnail;

  try {
    const url = new URL(imageUrl);
    const renderPath = getRenderPath(url.pathname);

    if (!renderPath) {
      return imageUrl;
    }

    url.pathname = renderPath;
    buildTransformParams(options).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    return url.toString();
  } catch {
    return imageUrl;
  }
}

export function getProductImageUrl(product, variant = 'thumbnail') {
  if (!product) {
    return '';
  }

  if (variant === 'thumbnail') {
    return (
      product.thumbnail_url ||
      product.image_thumbnail_url ||
      getTransformedImageUrl(product.image_url, variant)
    );
  }

  return getTransformedImageUrl(product.image_url, variant);
}

export function getProductImageSrcSet(product, variant = 'thumbnail') {
  const imageUrl = product?.image_url;

  if (!imageUrl) {
    return undefined;
  }

  if (variant === 'modal') {
    return [
      `${getTransformedImageUrl(imageUrl, 'thumbnail')} 480w`,
      `${getTransformedImageUrl(imageUrl, 'modal')} 1100w`,
    ].join(', ');
  }

  return [
    `${getTransformedImageUrl(imageUrl, 'preview')} 320w`,
    `${getTransformedImageUrl(imageUrl, 'thumbnail')} 480w`,
  ].join(', ');
}

function getScaledDimensions(width, height, maxDimension) {
  if (width <= maxDimension && height <= maxDimension) {
    return { width, height };
  }

  const scale = maxDimension / Math.max(width, height);

  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('IMAGE_LOAD_FAILED'));
    };

    image.src = objectUrl;
  });
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
}

export async function compressImageFile(file) {
  if (
    !file ||
    !file.type.startsWith('image/') ||
    file.type === 'image/svg+xml'
  ) {
    return file;
  }

  try {
    const image = await loadImage(file);
    const { width, height } = getScaledDimensions(
      image.naturalWidth,
      image.naturalHeight,
      UPLOAD_IMAGE_OPTIONS.maxDimension
    );
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      return file;
    }

    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, 0, 0, width, height);

    const blob = await canvasToBlob(
      canvas,
      UPLOAD_IMAGE_OPTIONS.type,
      UPLOAD_IMAGE_OPTIONS.quality
    );

    if (!blob || blob.size >= file.size) {
      return file;
    }

    const fileName = file.name.replace(/\.[^.]+$/, '.webp');

    return new File([blob], fileName, {
      type: UPLOAD_IMAGE_OPTIONS.type,
      lastModified: Date.now(),
    });
  } catch {
    return file;
  }
}
