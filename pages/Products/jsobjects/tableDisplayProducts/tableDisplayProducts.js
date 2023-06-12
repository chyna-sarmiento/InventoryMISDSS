export default {
	tableDataNavigation() {
		const rowsPerPage = tbl_ProductList.pageSize;
		const pageNumber = tbl_ProductList.pageNo;
		const minIndex = rowsPerPage * (pageNumber - 1);
		const maxIndex = rowsPerPage * pageNumber;

		return ShowProductListDetails.data.slice(minIndex, maxIndex);
	}
}