export default {
	// tableDataNavigation() {
	// const rowsPerPage = tbl_ListSales.pageSize;
	// const pageNumber = tbl_ListSales.pageNo;
	// const minIndex = rowsPerPage * (pageNumber - 1);
	// const maxIndex = rowsPerPage * pageNumber;
	// 
	// return ShowOutgoingList.data.slice(minIndex, maxIndex);
	// //return minIndex + " " + maxIndex
	// },
	async onToggleDateSelect(){
		switch (true) {
			case toggle_MonthDay.selectedOptionValue == 0 && toggle_DetailSummary.selectedOptionValue == 0:
				await GetMonthlySummaryCount.run();
				await ShowMonthlySummary.run();
				await GetMonthlyProfit.run();
				break;

			case toggle_MonthDay.selectedOptionValue == 1 && toggle_DetailSummary.selectedOptionValue == 0:
				await GetDailySummaryCount.run();
				await ShowDailySummary.run();
				await GetDailyProfit.run();
				break;

			case toggle_MonthDay.selectedOptionValue == 0 && toggle_DetailSummary.selectedOptionValue == 1:
				await getMonthlyDetailedCount.run();
				await ShowMonthlyDetailed.run();
				await GetMonthlyProfit.run();
				break;

			default:
				await GetDailyDetailedCount.run();
				await ShowDailyDetailed.run();
				tbl_ListSales.tableData = ShowDailyDetailed.data;
				await GetDailyProfit.run();
				break;
		}
	},
	getDataCount(){
		let result = {
			tableData: [],
			totalRecordsCount: 0,
			toggleColumnVisibility: "true",
			setProfit: 0
		};

		switch (true) {
			case toggle_MonthDay.selectedOptionValue == 0 && toggle_DetailSummary.selectedOptionValue == 0:
				result.tableData = ShowMonthlySummary.data;
				result.totalRecordsCount = GetMonthlySummaryCount.data;
				result.toggleColumnVisibility = "false";
				result.setProfit = GetMonthlyProfit.data;
				break;

			case toggle_MonthDay.selectedOptionValue == 1 && toggle_DetailSummary.selectedOptionValue == 0:
				result.tableData = ShowDailySummary.data;
				result.totalRecordsCount = GetDailySummaryCount.data;
				result.toggleColumnVisibility = "false";
				result.setProfit = GetDailyProfit.data;
				break;

			case toggle_MonthDay.selectedOptionValue == 0 && toggle_DetailSummary.selectedOptionValue == 1:
				result.tableData = ShowMonthlyDetailed.data;
				result.totalRecordsCount = getMonthlyDetailedCount.data;
				result.toggleColumnVisibility = "true";
				result.setProfit = GetMonthlyProfit.data;
				break;

			default:
				result.tableData = ShowDailyDetailed.data;
				result.totalRecordsCount = GetDailyDetailedCount.data;
				result.toggleColumnVisibility = "true";
				result.setProfit = GetDailyProfit.data;
				break;
		}

		return result;
	}
}