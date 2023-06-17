export default {
	filterCurrentDemandOnDate() {
		const currentBarData = dataOutgoingDemandCurrent.data
		.filter(p => p.outgoingDemandVolume >= 20)
		.map(p => ({ label: p.productName, value: p.outgoingDemandVolume }))
		.sort((a, b) => b.value - a.value);

		return currentBarData;
	},
	filterForecastOnDate() {
		const csvData = forecastExport_dailyForecast.data.fileData;
		const jsonData = Papa.parse(csvData, { header: true }).data;

		const currentBarData = dataOutgoingDemandCurrent.data
		.filter(p => p.outgoingDemandVolume >= 20)
		.sort((a, b) => b.outgoingDemandVolume - a.outgoingDemandVolume);

		const filteredIds = currentBarData.map((data) => data.outgoingProductId);

		const filteredDate = jsonData.filter((data) => {
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
	},
	demandForecastDataset() {
		const currentData = this.filterCurrentDemandOnDate();
		const forecastData = this.filterForecastOnDate();

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
		const currentData = this.filterCurrentDemandOnDate();
		const forecastData = this.filterForecastOnDate();

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
	}
}