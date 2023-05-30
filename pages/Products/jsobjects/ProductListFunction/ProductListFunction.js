export default {
	refreshOnAdd() {
		{{ ShowProductListDetails.run(() => {}, () => {}) }}
	},
	scanBarcodeId() {
		{{add_BarcodeId.inputText = scan_AddProduct.value}}
	}
}