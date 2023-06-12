export default {
	tableDataNavigation() {
		const rowsPerPage = tbl_ListSales.pageSize;
		const pageNumber = tbl_ListSales.pageNo;
		const minIndex = rowsPerPage * (pageNumber - 1);
		const maxIndex = rowsPerPage * pageNumber;

		return ShowOutgoingList.data.slice(minIndex, maxIndex);
		//return minIndex + " " + maxIndex
	}
}