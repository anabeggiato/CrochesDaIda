import { PRODUCT_CATEGORIES } from '../constants/categories';

export function sortProductsByName(products) {
  return [...products].sort((a, b) => a.name.localeCompare(b.name));
}

export function filterProductsByCategory(products, selectedCategory) {
  if (selectedCategory === PRODUCT_CATEGORIES.ALL) {
    return products;
  }

  return products.filter((product) => product.category === selectedCategory);
}

export function isAmigurumiProduct(product) {
  return product.category === PRODUCT_CATEGORIES.AMIGURUMI;
}
