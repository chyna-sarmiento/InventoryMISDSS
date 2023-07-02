export default {
	getProductP10() {
			return getProductForecast.data.map(f => ({
				x: moment(f.DateTimeOutgoing).format("MMMM DD"),
				y: parseFloat(f.p10)
			}));
	},
	getProductP50() {
			return getProductForecast.data.map(f => ({
				x: moment(f.DateTimeOutgoing).format("MMMM DD"),
				y: parseFloat(f.p50)
			}));
	},
	getProductP90() {
			return getProductForecast.data.map(f => ({
				x: moment(f.DateTimeOutgoing).format("MMMM DD"),
				y: parseFloat(f.p90)
			}));
	}
}