export default {
	refreshOnAdd () {
		{{ AddProduct.run(() => ShowProductListDetails.run(), () => {}) }}
	}
}