export default {
	addToQuantity: (index) => {
		const cart = appsmith.store.cart || [];
		const item = cart[index];

		if (item) {
			item.quantity += 1;
			storeValue('cart', cart);
		}
	},
	removeFromQuantity: (index) => {
		const cart = appsmith.store.cart || [];
		const item = cart[index];
		if (item) {
			item.quantity -= 1;
			if (item.quantity <= 0) {
				cart.splice(index, 1);
			}
			storeValue('cart', cart);
		}
	},
	deleteProduct: (index) => {
		const cart = appsmith.store.cart || [];

		if (index >= 0 && index < cart.length) {
			cart.splice(index, 1);
			storeValue('cart', cart);
		}
	}
}