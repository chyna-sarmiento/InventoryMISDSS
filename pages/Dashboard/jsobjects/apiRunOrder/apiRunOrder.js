export default {
	async executeQueriesInOrder() {
		try {
			await GetNumberOfProducts.run();
			await GetCountOutOfStock.run();
			await GetCountLowStock.run();
			
			await GetLatestDate.run();
			await ShowOutgoingPreview.run();
			await GetDailyProfit.run();
			
			await GetActiveItemsCount.run();
			await ShowProductList.run();
			await getProductForecast.run();
			// await GetEarliestDate.run();
			// await dataDemandCurrent.run();
			// await filteredDemandForecast.run();
			console.log("All queries executed successfully");
		} catch (error) {
			console.error("Error executing queries:", error);
		}
	}
}