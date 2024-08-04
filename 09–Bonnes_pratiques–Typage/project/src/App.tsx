import React, { useState } from 'react';
import { Product } from './types/Product';
import { addProduct, getProducts, removeProduct, updateProductQuantity } from './function/productFunction';
import { validateProduct } from './utils/validation';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(getProducts());
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [errors, setErrors] = useState<string[]>([]);

  const handleAddProduct = () => { 
    if (!newProduct) return;

    // console.log("Adding product", newProduct);

    const product: Product = {
      id: new Date().toISOString(),
      name: newProduct.name || '',
      description: newProduct.description || '',
      price: newProduct.price || 0,
      quantity: newProduct.quantity || 0,
      rating: newProduct.rating || 0,
      available: newProduct.available || false,
      image: newProduct.image || '',
      expiryDate: newProduct.expiryDate || new Date(),
      addedDate: newProduct.addedDate || new Date(),
    };

    const validationErrors = validateProduct(product);
    if (validationErrors.length > 0) { 
      setErrors(validationErrors);
      return;
    }

    addProduct(product);
    setProducts([...getProducts()]);
    setNewProduct({});
    setErrors([]);
  };

  const handleRemoveProduct = (productId: string) => {
    // console.log("Removing product", productId);
    removeProduct(productId);
    setProducts([...getProducts()]);
  };

  const handleUpdateProductQuantity = (productId: string, increment: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const newQuantity = product.quantity + increment;
      if (newQuantity >= 0) { 
        // console.log("Updating quantity");
        updateProductQuantity(productId, newQuantity);
        setProducts([...getProducts()]); 
      }
    }
  };

  return (
    <div>
      <h1>Product Picard</h1>

      <div>

        <label htmlFor="Name">Name</label>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name || ''}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />

        <label htmlFor="Description">Description</label>
        <input
          type="text" 
          placeholder="Description"
          value={newProduct.description || ''}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />

        <label htmlFor="Price">Price</label>
        <input
          type="number"
          placeholder="Price" 
          value={newProduct.price || 0}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
        />

        <label htmlFor="Quantity">Quantity</label>
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity || 0}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
        />

        <label htmlFor="Rating">Rating</label>
        <input
          type="range"
          min="0"
          max="5"
          step="1"
          placeholder="Rating" 
          value={newProduct.rating || 0}
          onChange={(e) => setNewProduct({ ...newProduct, rating: parseFloat(e.target.value) })}
        />
        
        <label htmlFor="Available">Available</label>
        <input
          type="checkbox"
          checked={newProduct.available || false}
          onChange={(e) => setNewProduct({ ...newProduct, available: e.target.checked })}
        />

        <input
          type="text"
          placeholder="Image"
          value={newProduct.image || ''}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />

        <label htmlFor="Expiry Date">Expiry Date</label>
        <input
          type="date" 
          value={newProduct.expiryDate ? newProduct.expiryDate.toISOString().split('T')[0] : ''}
          onChange={(e) => setNewProduct({ ...newProduct, expiryDate: new Date(e.target.value) })}
        />

        <label htmlFor="Added Date">Added Date</label>
        <input
          type="date" 
          value={newProduct.addedDate ? newProduct.addedDate.toISOString().split('T')[0] : ''}
          onChange={(e) => setNewProduct({ ...newProduct, addedDate: new Date(e.target.value) })}
        />

        <button onClick={handleAddProduct}>Add Product</button>

      </div>
      {errors.length > 0 && (
        <div>
          <h2>Validation Errors:</h2>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h2>Product List</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <img src={product.image} alt={product.name} max-width="100" max-height="100" />
              {product.name} - {product.description} - {product.price}€ - {product.quantity} in stock - {product.rating}/5
              <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
              <button onClick={() => handleUpdateProductQuantity(product.id, 1)}>+</button>
              <button onClick={() => handleUpdateProductQuantity(product.id, -1)}>-</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
