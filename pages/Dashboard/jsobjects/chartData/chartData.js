export default {
	CustomerDemand() {
		const currentData = forecastExportData.filterCurrentDemandOnDate();
		const forecastData = forecastExportData.demandForecastDataset();

		const maxBarValue = Math.max(...currentData.map(data => data.y)) + 1;
		
		let chartType = "";
		if(currentData.map(data => ({ label: data.label })).length > 20) {
			chartType = "scrollmsstackedcolumn2d";
		} else {
			chartType = "msstackedcolumn2d";
		};
		
		const outputDataSource = {
			type: chartType,
			dataSource: {
				chart: {
					caption: "Customer Demand",
					xaxisname: "Popular Items",
					yaxisname: "Volume of Demand",
					yaxismaxvalue: maxBarValue,
					theme: "fusion",
					baseFont: "Montserrat",
					captionFontSize: "24",
					captionFontColor: "#333333",
					xAxisNameFontSize: "14",
					slantLabels: "1",
					labelDisplay: "rotate",
					labelWrap: "1",
					labelPadding: "10"
				},
				categories: [{
					category: currentData.map(data => ({ label: data.label }))
				}],
				dataset: [
					{
						dataset: [
							{
								seriesname: "Current",
								color: "64748b",
								data: currentData,
							}
						]
					},
					{
						dataset: forecastData
					}
				]
			}
		};

		return JSON.stringify(outputDataSource);
	},
	InventoryStock() {
		const currentData = ShowProductList.data
		.filter(p => p.stockCount < 20)
		.map(p => ({ label: p.displayName, value: p.stockCount }))
		.sort((a, b) => a.value - b.value);
		const forecastData = forecastExportData.stockForecastDataset();
		
		const maxBarValue = Math.max(...currentData.map(data => data.y)) + 1;
		let chartType = "";
		if(currentData.map(data => ({ label: data.label })).length > 20) {
			chartType = "scrollmsstackedcolumn2d";
		} else {
			chartType = "msstackedcolumn2d";
		};
		
		const outputDataSource = {
			type: chartType,
			dataSource: {
				chart: {
					caption: "Inventory Stock",
					xaxisname: "Low Items",
					yaxisname: "Number of Items",
					yaxismaxvalue: maxBarValue,
					theme: "fusion",
					baseFont: "Montserrat",
					captionFontSize: "24",
					captionFontColor: "#333333",
					xAxisNameFontSize: "14",
					slantLabels: "1",
					labelDisplay: "rotate",
					labelWrap: "1"
				},
				categories: [{
					category: currentData.map(data => ({ label: data.label }))
				}],
				dataset: [
					{
						dataset: [
							{
								seriesname: "Current",
								color: "64748b",
								data: currentData,
							}
						]
					},
					{
						dataset: forecastData
					}
				]
			}
		};

		return JSON.stringify(outputDataSource);
	}
}