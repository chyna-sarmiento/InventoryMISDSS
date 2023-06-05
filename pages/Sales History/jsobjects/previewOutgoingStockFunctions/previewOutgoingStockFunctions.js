export default {
  cart: [],
	totalPrice: '',
  add: async (item) => {
    try {
			const outgoingDateTime = input_OutgoingDateTime.selectedDate;
			const productName = input_SearchProduct.selectedOptionLabel;
			const quantity = input_outgoingQuantity.inputText;
			
      const { id, barcodeId, price } = item;
      const cartItem = { quantity, id, outgoingDateTime, barcodeId, productName, price };
			
      const cart = appsmith.store.cart || [];
			
			cart.push(cartItem);
			storeValue('cart', cart);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  },
  clear: () => storeValue('cart', undefined),
	getLastSelectedRow(table) {
		const lastSelectedRow = appsmith.store.lastSelectedRow || {};
		const tableData = appsmith.store[table] || [];
		
		if (tableData.length > 0) {
			lastSelectedRow[table] = tableData[tableData.length - 1];
		}
		
		appsmith.store.lastSelectedRow = lastSelectedRow;
	},
	resetOutgoingDateTime() {
		input_OutgoingDateTime.selectedDate = moment();
	}
}