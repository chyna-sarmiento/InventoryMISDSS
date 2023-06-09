export default {
	gsDemandForecastData() {
		const forecastData = filteredDemandForecast.data
		.map((data) => {
			const matchingBarData = dataDemandCurrent.data.find((barData) => barData.outgoingProductId === data.OutgoingProductId);
			return {
				label: matchingBarData.productName,
				values: [
					{ label: 'p10', value: data.p10 },
					{ label: 'p50', value: data.p50 },
					{ label: 'p90', value: data.p90 }
				]
			};
		});
		
		return forecastData;
	},
	gsDemandDataset() {
		const forecastData = this.gsDemandForecastData();
		const dataset = [];

		for (let i = 0; i < forecastData[0].values.length; i++) {
			const seriesname = ['Non', 'Slow', 'Fast'];
			const colourSeries = ['F2726F', 'FFC533', '62B58F'];
			const data = [];

			for (const item of forecastData) {
				const value = item.values[i].value;
				data.push({ value });
			}
			
			// if(i != 0) {
				// dataset.push({ seriesname: seriesname[i] + "Demand", initiallyHidden: "1", color: colourSeries[i], data });
			// }
			// else { 
				dataset.push({ seriesname: seriesname[i] + "-moving", color: colourSeries[i], data });
			// }
		}

		return dataset;
	},
	gsStockDataset() {
		const forecastData = filteredStockForecast.data.map((data) => {
			const matchingBarData = ShowListLowStocks.data.find((barData) => barData.id === data.OutgoingProductId);
			return {
				label: matchingBarData.displayName,
				values: [
					{ label: 'p10', value: data.p10 },
					{ label: 'p50', value: data.p50 },
					{ label: 'p90', value: data.p90 }
				]
			};
		});

		const dataset = [];

		for (let i = 0; i < forecastData[0].values.length; i++) {
			const seriesname = ['Non', 'Slow', 'Fast'];
			const colourSeries = ['62B58F', 'FFC533', 'F2726F'];
			const data = [];

			for (const item of forecastData) {
				const value = item.values[i].value;
				data.push({ value });
			}

			if(i != 1) {
				dataset.push({ seriesname: seriesname[i] + "-moving", initiallyHidden: "1", color: colourSeries[i], data });
			}
			else { 
				dataset.push({ seriesname: seriesname[i] + "-moving", color: colourSeries[i], data });
			}
		}

		return dataset;
	}
}