export default {
	chartYRange(currentData, forecastData) {
		const combineDatasets = [
			...currentData.map(data => data.value),
			...forecastData.flatMap(dataset => dataset.data.map(data => data.value))
		];

		const minValue = Math.floor((Math.min(...combineDatasets) - 1) / 5) * 5;
		const maxValue = Math.ceil((Math.max(...combineDatasets) + 1) / 5) * 5;

		return { minValue, maxValue };
	},
	CustomerDemand() {
		const currentData = dataDemandCurrent.data
		.map(p => ({
			label: p.productName,
			value: p.outgoingDemandVolume
		}));
		// .sort((a, b) => b.value - a.value);
		const forecastData = gsForecastData.gsDemandDataset();

		let chartType = "";
		const userAgent = navigator.userAgent.toLowerCase();

		if (currentData.map(data => ({ label: data.label })).length > 20 || !userAgent.includes("desktop")) {
			chartType = "scrollcolumn2d";
		} else {
			chartType = "mscolumn2d";
		};

		let { minValue, maxValue } = this.chartYRange(currentData, forecastData);
		// return "min: " + minValue + " || max: " + maxValue;

		const outputDataSource = {
			type: "mscolumn2d",
			dataSource: {
				chart: {
					caption: "Item Demand vs Predicted Demand",
					xaxisname: "Popular Items",
					yaxisname: "Volume of Demand",
					yAxisMinValue: minValue,
					yAxisMaxValue: maxValue,
					interactiveLegend: "1",
					plotOverlap: "1",
					theme: "fusion",
					// Cosmetics on Fonts
					baseFont: "Montserrat",
					captionFontSize: "24",
					captionFontColor: "#333333",
					captionPadding: "35",
					xAxisNameFontSize: "14",
					//Cosmetics on Labels
					slantLabels: "1",
					labelDisplay: "rotate",
					//Cosmetics on Canvas
					canvasPadding: "0",
					canvasBottomMargin: "0"
				},
				categories: [{
					category: currentData.map(data => ({ label: data.label }))
				}],
				dataset: [
					{
						seriesname: "Current",
						color: "64748b",
						data: currentData,
					},
					...forecastData.map(dataset => ({
						seriesname: dataset.seriesname,
						initiallyHidden: dataset.seriesname === "P50" || dataset.seriesname === "P90" ? "1" : "0",
						color: dataset.color,
						data: dataset.data,
					}))
				]
			}
		};

		return JSON.stringify(outputDataSource);
	},
	InventoryStock() {
		const currentData = ShowListLowStocks.data.map(p=> ({label: p.displayName, value: p.stockCount}));
		const forecastData = gsForecastData.gsStockDataset();

		let chartType = "";
		const userAgent = navigator.userAgent.toLowerCase();

		if (currentData.map(data => ({ label: data.label })).length > 20 || !userAgent.includes("desktop")) {
			chartType = "scrollcolumn2d";
		} else {
			chartType = "mscolumn2d";
		};
		
		let { minValue, maxValue } = this.chartYRange(currentData, forecastData);

		const outputDataSource = {
			type: chartType,
			dataSource: {
				chart: {
					caption: "Inventory Stock vs Predicted Demand",
					xaxisname: "Low Items",
					yaxisname: "Number of Items",
					yAxisMinValue: minValue,
					yAxisMaxValue: maxValue,
					interactiveLegend: "1",
					plotOverlap: "1",
					theme: "fusion",
					// Cosmetics on Fonts
					baseFont: "Montserrat",
					captionFontSize: "24",
					captionFontColor: "#333333",
					captionPadding: "35",
					xAxisNameFontSize: "14",
					//Cosmetics on Labels
					slantLabels: "1",
					labelDisplay: "rotate",
					//Cosmetics on Canvas
					canvasPadding: "0",
					canvasBottomMargin: "0"
				},
				categories: [{
					category: currentData.map(data => ({ label: data.label }))
				}],
				dataset: [
					{
						seriesname: "Current",
						color: "64748b",
						data: currentData,
					},
					...forecastData.map(dataset => ({
						seriesname: dataset.seriesname,
						initiallyHidden: dataset.seriesname === "P50" || dataset.seriesname === "P90" ? "1" : "0",
						color: dataset.color,
						data: dataset.data,
					}))
				]
			}
		};

		return JSON.stringify(outputDataSource);
	}
}