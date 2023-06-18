export default {
	jsonData: Papa.parse(forecastExport_dailyForecast.data.fileData, { header: true }).data,
	filterForecastDemandData() {
		const currentBarData = dataDemandCurrent.data
		.filter(p => p.outgoingDemandVolume >= 20)
		.sort((a, b) => b.outgoingDemandVolume - a.outgoingDemandVolume);
		
		const filteredIds = currentBarData.map((data) => data.outgoingProductId);

		const filteredDate = this.jsonData.filter((data) => {
			const date = moment(data.DateTimeOutgoing, 'YYYY-MM-DDTHH:mm:ssZ');
			return date.isSame(input_DemandForecastDate.selectedDate, 'day');
		});
		
		const filteredData = filteredDate
		.filter((data) => filteredIds.includes(parseInt(data.OutgoingProductId)))
		.map((data) => {
			const matchingBarData = currentBarData.find((barData) => barData.outgoingProductId === parseInt(data.OutgoingProductId));
			return {
				label: matchingBarData.productName,
				values: [
					{ label: 'p10', value: data.p10 },
					{ label: 'p50', value: data.p50 },
					{ label: 'p90', value: data.p90 }
				]
			};
		});

		return filteredData;
		// return test;
	},
	filterForecastStockData() {
		const currentBarData = ShowListLowStocks.data
		.filter(p => p.stockCount < 20)
		.sort((a, b) => a.value - b.value);
		
		const filteredIds = currentBarData.map((data) => data.id);

		const filteredDate = this.jsonData.filter((data) => {
			const date = moment(data.DateTimeOutgoing, 'YYYY-MM-DDTHH:mm:ssZ');
			return date.isSame(input_StockForecastDate.selectedDate, 'day');
		});
		
		const filteredData = filteredDate
		.filter((data) => filteredIds.includes(parseInt(data.OutgoingProductId)))
		.map((data) => {
			const matchingBarData = currentBarData.find((barData) => barData.id === parseInt(data.OutgoingProductId));
			return {
				label: matchingBarData.displayName,
				values: [
					{ label: 'p10', value: data.p10 },
					{ label: 'p50', value: data.p50 },
					{ label: 'p90', value: data.p90 }
				]
			};
		});

		return filteredData;
	},
	demandForecastDataset() {
		const forecastData = this.filterForecastDemandData();

		const dataset = [];

		for (let i = 0; i < forecastData[0].values.length; i++) {
			const seriesname = ['P10', 'P50', 'P90'];
			const colourSeries = ['F2726F', 'FFC533', '62B58F'];
			const data = [];

			for (const item of forecastData) {
				const value = item.values[i].value;
				data.push({ value });
			}

			dataset.push({ seriesname: seriesname[i], color: colourSeries[i], data });
		}

		return dataset;
	},
	stockForecastDataset() {
		const forecastData = this.filterForecastStockData();

		const dataset = [];

		for (let i = 0; i < forecastData[0].values.length; i++) {
			const seriesname = ['P10', 'P50', 'P90'];
			const colourSeries = ['62B58F', 'FFC533', 'F2726F'];
			const data = [];

			for (const item of forecastData) {
				const value = item.values[i].value;
				data.push({ value });
			}

			dataset.push({ seriesname: seriesname[i], color: colourSeries[i], data });
		}

		return dataset;
	},
	test() {
		const userAgent = navigator.userAgent.toLowerCase();

		return !userAgent.includes("desktop");
	}
}