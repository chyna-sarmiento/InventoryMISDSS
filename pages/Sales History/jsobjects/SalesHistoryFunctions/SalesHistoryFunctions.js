export default {
  cart: [],
	totalPrice: '',
  add: async (item) => {
    try {
			const productName = input_SearchProduct.selectedOptionLabel;
			const quantity = 1;
			
      const { id, barcodeId, price } = item;
      const cartItem = { quantity, id, barcodeId, productName, price };
			
      const cart = appsmith.store.cart || [];
      cart.push(cartItem);
      storeValue('cart', cart);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  },
  clear: () => storeValue('cart', undefined)
}