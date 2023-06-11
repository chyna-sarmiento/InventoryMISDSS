export default {
	getOldDateOutgoing() {
		const arr = Array.isArray(ShowOutgoingStocks.data) ? ShowOutgoingStocks.data : [];
		const filteredArr = arr.filter(element => element && element.dateTimeOutgoing);

		const minDate = filteredArr.length > 0
		? new Date(
			Math.min(
				...filteredArr.map(element => {
					return new Date(element.dateTimeOutgoing);
				}),
			),
		)
		: null;

		console.log(minDate);
		return moment(minDate).toISOString();
	},
	getLatestDateOutgoing() {
		const arr = Array.isArray(ShowOutgoingStocks.data) ? ShowOutgoingStocks.data : [];
		const filteredArr = arr.filter(element => element && element.dateTimeOutgoing);

		const maxDate = filteredArr.length > 0
		? new Date(
			Math.max(
				...filteredArr.map(element => {
					return new Date(element.dateTimeOutgoing);
				}),
			),
		)
		: null;

		console.log(maxDate);
		return moment(maxDate).toISOString();
	}
}