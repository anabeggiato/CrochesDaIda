import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';

function sortProductsByName(products) {
  return [...products].sort((a, b) => a.name.localeCompare(b.name));
}

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const fetchedProducts = await fetchProducts();
      setProducts(sortProductsByName(fetchedProducts));
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
      setError(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  return {
    error,
    loading,
    products,
    refreshProducts,
    setProducts,
  };
}
