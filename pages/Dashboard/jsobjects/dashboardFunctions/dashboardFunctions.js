export default {
	onDemandCurrentDateSelected() {
		{{moment(input_DemandCurrentDate.selectedDate).startOf('week').tz(moment.tz.guess()).format()}}
	},
	onDemandForecastDateSelected() {
		{{moment(input_DemandForecastDate.selectedDate).startOf('week').tz(moment.tz.guess()).format()}}
	},
	onTabSelected(tabName) {
		if(tabName == "Inventory Stock") {
			ShowProductList.run();
		} else {
			dataOutgoingDemandCurrent.run();
		}
	}
}