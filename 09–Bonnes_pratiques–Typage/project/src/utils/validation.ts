import { Product } from '../types/Product';

export const validateProduct = (product: Product): string[] => {
  const errors: string[] = [];
  if (!product.name) errors.push("Product name is required");
  if (!product.description) errors.push("Product description is required");
  if (!product.price) errors.push("Product price is required");
  if (!product.quantity) errors.push("Product quantity is required");
  if (!product.rating) errors.push("Product rating is required");
  if (!product.image) errors.push("Product image URL is required");
  if (!product.expiryDate) errors.push("Product expiry date is required");
  if (!product.addedDate) errors.push("Product added date is required");
  return errors;
};