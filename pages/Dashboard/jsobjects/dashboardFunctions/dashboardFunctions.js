export default {
	onDemandCurrentDateSelected() {
		{{moment(input_DemandCurrentDate.selectedDate).startOf('week').tz(moment.tz.guess()).format()}}
	},
	onDemandForecastDateSelected() {
		{{moment(input_DemandForecastDate.selectedDate).startOf('week').tz(moment.tz.guess()).format()}}
	},
	onTabSelected(tabName) {
		// forecastExport_dailyForecast.run();
		// forecastExportData.filterCurrentDemand();
		// forecastExportData.filterForecastOnDate();
		
		if(tabName == "Inventory Stock") {
			dataStockCurrent.run();
			ShowListLowStocks.run();
		} else {
			dataDemandCurrent.run();
		}
	}
}