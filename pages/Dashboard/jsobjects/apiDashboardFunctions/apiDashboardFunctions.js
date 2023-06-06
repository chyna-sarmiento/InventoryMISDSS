export default {
	async fetchOutgoingData() {
		const response = await ShowOutgoingStocks.run();
		const data = await response;
		return data;
	}
}