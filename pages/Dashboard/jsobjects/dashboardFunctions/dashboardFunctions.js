export default {
	async onTabSelected(tabName) {
		if(tabName == "Item Demand") {
			try {
				await GetLatestDate.run();
				await GetEarliestDate.run();
				await dataDemandCurrent.run();
				await filteredDemandForecast.run();

				// Continue with other actions or logic
				console.log("All queries executed successfully");
			} catch (error) {
				console.error("Error executing queries:", error);
			}
		}
	}
}