import { useQuery } from 'react-query';
import axios from 'axios';

// async function to fetch product categories
const fetchCategories = async (): Promise<string[]> => {
  const response = await axios.get<string[]>('https://fakestoreapi.com/products/categories');
  return response.data; 
};

// custom hook to fetch categories
export const useFetchCategories = () => {
  return useQuery<string[], Error>('categories', fetchCategories);
};
