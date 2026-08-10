export const PRODUCT_CATEGORIES = {
  ALL: 'all',
  AMIGURUMI: 'amigurumi',
  BAG: 'bolsa',
  RUG: 'tapete',
  KEYCHAIN: 'chaveiro',
  OTHERS: 'others',
};

export const PRODUCT_CATEGORY_OPTIONS = [
  { label: 'Amigurumi', value: PRODUCT_CATEGORIES.AMIGURUMI },
  { label: 'Bolsa', value: PRODUCT_CATEGORIES.BAG },
  { label: 'Tapete', value: PRODUCT_CATEGORIES.RUG },
  { label: 'Chaveiro', value: PRODUCT_CATEGORIES.KEYCHAIN },
  { label: 'Outros', value: PRODUCT_CATEGORIES.OTHERS },
];

export const PRODUCT_CATEGORY_FILTER_OPTIONS = [
  { label: 'Todos', value: PRODUCT_CATEGORIES.ALL },
  { label: 'Amigurumi', value: PRODUCT_CATEGORIES.AMIGURUMI },
  { label: 'Bolsas', value: PRODUCT_CATEGORIES.BAG },
  { label: 'Tapetes', value: PRODUCT_CATEGORIES.RUG },
  { label: 'Chaveiros', value: PRODUCT_CATEGORIES.KEYCHAIN },
  { label: 'Outros Produtos', value: PRODUCT_CATEGORIES.OTHERS },
];
