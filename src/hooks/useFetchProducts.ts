import { useQuery } from 'react-query';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

// async function to fetch products
const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
  return response.data; 
};

// custom hook to fetch products
export const useFetchProducts = () => {
  return useQuery<Product[], Error>('products', fetchProducts);
};
