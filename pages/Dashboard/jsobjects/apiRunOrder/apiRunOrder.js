export default {
	async executeQueriesInOrder() {
		try {
			// Execute the first query
			await GetLatestDate.run();

			// Execute the second query after the first one
			await GetEarliestDate.run();
			
			// Execute the third query after the second one
			await dataDemandCurrent.run();
			
			await filteredDemandForecast.run();

			// Continue with other actions or logic
			console.log("All queries executed successfully");
		} catch (error) {
			console.error("Error executing queries:", error);
		}
	}
}