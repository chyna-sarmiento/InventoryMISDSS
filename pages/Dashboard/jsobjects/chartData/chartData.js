export default {
	chartYRange(currentData, forecastData) {
		const visibleDatasets = forecastData.filter(dataset => dataset.visible !== "0");
		let allData = currentData.map(data => data.value);

		visibleDatasets.forEach(dataset => {
			allData = allData.concat(dataset.data.map(data => data.value));
		});

		const minValue = Math.min(...allData) - 1;
		const maxValue = Math.max(...allData) + 1;

		return { minValue, maxValue };
	},
	CustomerDemand() {
		const currentData = dataDemandCurrent.data.map(p => ({
			label: p.productName,
			value: p.outgoingDemandVolume
		}));
		const forecastData = gsForecastData.gsDemandDataset();

		let chartType = "";
		const userAgent = navigator.userAgent.toLowerCase();

		if (currentData.map(data => ({ label: data.label })).length > 20 || !userAgent.includes("desktop")) {
			chartType = "scrollmsstackedcolumn2d";
		} else {
			chartType = "msstackedcolumn2d";
		};
		
		let { minValue, maxValue } = this.chartYRange(currentData, forecastData);
		
		const outputDataSource = {
			type: chartType,
			dataSource: {
				chart: {
					caption: "Customer Demand",
					xaxisname: "Popular Items",
					yaxisname: "Volume of Demand",
					yAxisMinValue: minValue,
					yAxisMaxValue: maxValue,
					interactiveLegend: "1",
					theme: "fusion",
					baseFont: "Montserrat",
					captionFontSize: "24",
					captionFontColor: "#333333",
					captionPadding: "35",
					xAxisNameFontSize: "14",
					slantLabels: "1",
					labelDisplay: "rotate",
					labelWrap: "1",
					maxLabelHeight: "40",
					labelPadding: "10",
					canvasPadding: "0",
					canvasBottomMargin: "0"
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
		const currentData = ShowListLowStocks.data.map(p=> ({label: p.displayName, value: p.stockCount}));
		const forecastData = gsForecastData.gsStockDataset();

		const maxBarValue = Math.max(...currentData.map(data => data.value)) + 1;
		const minBarValue = Math.min(...currentData.map(data => data.value)) - 1;

		let chartType = "";
		const userAgent = navigator.userAgent.toLowerCase();

		if (currentData.map(data => ({ label: data.label })).length > 20 || !userAgent.includes("desktop")) {
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
					yAxisMinValue: minBarValue,
					yAxisMaxValue: maxBarValue,
					theme: "fusion",
					baseFont: "Montserrat",
					captionFontSize: "24",
					captionFontColor: "#333333",
					captionPadding: "35",
					xAxisNameFontSize: "14",
					slantLabels: "1",
					labelDisplay: "rotate",
					labelWrap: "1",
					maxLabelHeight: "40",
					labelPadding: "10",
					canvasPadding: "0",
					canvasBottomMargin: "0"
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