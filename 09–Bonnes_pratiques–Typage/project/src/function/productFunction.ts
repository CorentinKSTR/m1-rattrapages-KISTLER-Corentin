import { Product } from '../types/Product';


let products: Product[] = [];

export const addProduct = (product: Product): void => {
  products.push(product);
};

export const getProducts = (): Product[] => {
  return products;
};

export const removeProduct = (productId: string): void => {
  products = products.filter(product => product.id !== productId);
};

export const updateProductQuantity = (productId: string, quantity: number): void => {
  const product = products.find(product => product.id === productId);
  if (product) {
    product.quantity = quantity;
  }
};