export function getEmptyProductFormValues() {
  return {
    name: '',
    value: '',
    height: '',
    width: '',
    weight: '',
    description: '',
    category: '',
  };
}

export function getProductFormValues(product) {
  if (!product) {
    return getEmptyProductFormValues();
  }

  return {
    name: product.name ?? '',
    value: product.value ?? '',
    height: product.height ?? '',
    width: product.width ?? '',
    weight: product.weight ?? '',
    description: product.description ?? '',
    category: product.category ?? '',
  };
}
