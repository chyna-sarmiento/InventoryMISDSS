export default {
	refreshOnAdd() {
		{{ ShowOutgoingList.run(() => {}, () => {}) }}
	},
	addOutgoingEntries: [],
	createAddOutgoingEntriesStore() {
		const addOutgoingEntries = appsmith.store.addOutgoingEntries || [];
		
		const items = appsmith.store.cart.map(item => ({
			outgoingProductId: item.id,
			quantity: item.quantity,
			dateTimeOutgoing: item.outgoingDateTime
		}));
		
		for (const item of items) {
			addOutgoingEntries.push(item);
		}
		
		appsmith.store.addOutgoingEntries = addOutgoingEntries;
	}
}