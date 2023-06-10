export default {
	CustomerDemand() {
		const barData = dataOutgoingDemand.data
		.filter(p => p.outgoingDemandVolume >= 20)
		.map(p => ({ label: p.productName, value: p.outgoingDemandVolume }))
		.sort((a, b) => b.value - a.value);

		const maxBarValue = Math.max(...barData.map(data => data.y)) + 1;

		const outputDataSource = {
			type: "mscombi2d",
			dataSource: {
				chart: {
					caption: "Demand",
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