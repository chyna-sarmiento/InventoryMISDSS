export default {
	refreshOnAdd() {
		{{ ShowOutgoingStocks.run(() => {}, () => {}) }}
	},
  addOutgoingEntries: async (outgoingItems) => {
    await Promise.all(outgoingItems.map(async (item) => {
      try {
        const response = await EncodeOutgoingStock.run(item);
        console.log('HTTP POST success:', response.data);
      } catch (error) {
        console.error('HTTP POST error:', error);
      }
    }));
  }
}