export default {
	toggleContainerVisibility() {
		if (cont_OutgoingDetails.isVisible == true) {
			{{cont_OutgoingDetails.isVisible = false}}
		} else {
			{{cont_OutgoingDetails.isVisible = true}}
		}
	},
	addOutgoingProductInput() {
		{{cont_outStockInput}}
	}
}