export default {
	refreshOnAdd() {
		{{ ShowProductListDetails.run(() => {}, () => {}) }}
	},
	toggleBarcodeScannerAdd() {
		if (scan_AddProduct.isVisible == true) {
			{{scan_AddProduct.isVisible = false}}
		} else {
			{{scan_AddProduct.isVisible = true}}
		}
	},
	toggleBarcodeScannerEdit() {
		if (scan_EditProduct.isVisible == true) {
			{{scan_EditProduct.isVisible = false}}
		} else {
			{{scan_EditProduct.isVisible = true}}
		}
	},
	scanAddBarcodeId() {
		{{add_BarcodeId.inputText = scan_AddProduct.value}}
	},
	scanEditBarcodeId() {
		{{edit_BarcodeId.inputText = scan_EditProduct.value}}
	}
}