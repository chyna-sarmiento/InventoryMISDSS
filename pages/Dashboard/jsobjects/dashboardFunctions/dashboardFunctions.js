export default {
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