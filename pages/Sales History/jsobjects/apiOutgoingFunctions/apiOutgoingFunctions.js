export default {
	refreshOnAdd() {
		{{ ShowOutgoingStocks.run(() => {}, () => {}) }}
	},
	addOutgoingEntries: async () => {
  const items = appsmith.store.cart.map(item => ({
    outgoingProductId: item.id,
    quantity: item.quantity
  }));

  for (const item of items) {
    try {
      const response = await EncodeOutgoingStock.run({
        "outgoingProductId": item.outgoingProductId,
        "quantity": item.quantity
      });
			
      console.log('HTTP POST success:', response.data);

      showAlert(
        `Successfully added the outgoing product: ${appsmith.store.cart.map(p => p.productName)}`,
        'success'
      );
    } catch (error) {
      console.error('HTTP POST error:', error);

      showAlert(
        `Error occurred in adding the outgoing product: ${appsmith.store.cart.map(p => p.productName)}`,
        'error'
      );
    }
  }
}
}