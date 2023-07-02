export default {
	async executeQueriesInOrder() {
		try {
			await getProductForecast.run();
			await insightDemandForecast.getProductP10();
			await insightDemandForecast.getProductP50();
			await insightDemandForecast.getProductP90();
			// await GetLatestDate.run();
			// await GetEarliestDate.run();
			// await dataDemandCurrent.run();
			// await filteredDemandForecast.run();
			console.log("All queries executed successfully");
		} catch (error) {
			console.error("Error executing queries:", error);
		}
	}
}