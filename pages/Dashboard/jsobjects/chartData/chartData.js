export default {
	CustomerDemand() {
		const currentStartDate = moment(input_DemandCurrentDate.selectedDate).startOf('week').tz(moment.tz.guess()).format('DD MMMM YYYY');
		const currentEndDate = moment.tz(moment(input_DemandCurrentDate.selectedDate).add(6, 'days'), moment.tz.guess()).format('DD MMMM YYYY');
		const forecastStartDate = moment(input_DemandForecastDate.selectedDate).startOf('week').tz(moment.tz.guess()).format('DD MMMM YYYY')
		const forecastEndDate = moment.tz(moment(input_DemandForecastDate.selectedDate).add(6, 'days'), moment.tz.guess()).format('DD MMMM YYYY');
		
		const barData = dataOutgoingDemandCurrent.data
		.filter(p => p.outgoingDemandVolume >= 20)
		.map(p => ({ label: p.productName, value: p.outgoingDemandVolume }))
		.sort((a, b) => b.value - a.value);

		const maxBarValue = Math.max(...barData.map(data => data.y)) + 1;

		const outputDataSource = {
			type: "mscombi2d",
			dataSource: {
				chart: {
					caption: "Demand",
					subcaption: "Current Week: " + currentStartDate + " to " + currentEndDate + "\nForecast Week: " + forecastStartDate + " to " + forecastEndDate,
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
					category: barData.map(data => ({ label: data.label }))
				}],
				dataset: [{
					seriesname: "Current",
					data: barData,
					color: "#64748b"
				}]
			}
		};

		return JSON.stringify(outputDataSource);
	},
	InventoryStock() {
		const currentStartDate = moment(input_StockCurrentDate.selectedDate).startOf('week').tz(moment.tz.guess()).format('DD MMMM YYYY');
		const currentEndDate = moment.tz(moment(input_StockCurrentDate.selectedDate).add(6, 'days'), moment.tz.guess()).format('DD MMMM YYYY');
		const forecastStartDate = moment(input_StockForecastDate.selectedDate).startOf('week').tz(moment.tz.guess()).format('DD MMMM YYYY')
		const forecastEndDate = moment.tz(moment(input_StockForecastDate.selectedDate).add(6, 'days'), moment.tz.guess()).format('DD MMMM YYYY');
		
		const barData = ShowProductList.data
		.filter(p => p.stockCount < 20)
		.map(p => ({ label: p.displayName, value: p.stockCount }))
		 .sort((a, b) => a.value - b.value);

		const maxBarValue = Math.max(...barData.map(data => data.y)) + 1;
		const userWarningThreshold = input_WarningThreshold.isValid ? (input_WarningThreshold.inputText || 10) : 10;
		const userRestockThreshold = input_RestockThreshold.isValid ? (input_RestockThreshold.inputText || 5) : 5;
		
		const outputDataSource = {
			type: "mscombi2d",
			dataSource: {
				chart: {
					caption: "Inventory Stock",
					subcaption: "Current Week: " + currentStartDate + " to " + currentEndDate + "\nForecast Week: " + forecastStartDate + " to " + forecastEndDate,
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
					category: barData.map(data => ({ label: data.label }))
				}],
				dataset: [{
					seriesname: "Current",
					data: barData,
					color: "#64748b"
				}],
				trendlines: [{
					line: [{
						startvalue: userWarningThreshold,
						endvalue: "",
						color: "#fde047",
						displayvalue: "Warning",
						valueonright: "1",
						thickness: "2",
						showontop: "1",
						alpha: "80"
					},
								 {
									 startvalue: userRestockThreshold,
									 endvalue: "",
									 color: "#ef4444",
									 displayvalue: "Restock ASAP",
									 valueonright: "1",
									 thickness: "2",
									 showontop: "1",
									 alpha: "80"
								 }]
				}]
			}
		};

		return JSON.stringify(outputDataSource);
	}
}