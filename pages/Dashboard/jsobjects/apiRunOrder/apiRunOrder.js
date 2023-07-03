export default {
	async executeQueriesInOrder() {
		try {
			await getProductForecast.run();
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