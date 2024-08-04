import { Product } from '../types/Product';

export const validateProduct = (product: Product): string[] => {
  const errors: string[] = [];
  if (!product.name) errors.push("Name is required");
  if (!product.description) errors.push("Description is required");
  if (product.price <= 0) errors.push("Price must be greater than zero");
  if (product.quantity < 0) errors.push("Quantity must be greater than zero");
  if (product.rating < 0 || product.rating > 5) errors.push("Rating is required");
  if (!product.image) errors.push("Image URL is required");
  if (!product.expiryDate) errors.push("Expiry date is required");
  if (!product.addedDate) errors.push("Added date is required");
  return errors;
};