export default {
	changeDateFormat(){
		if(toggle_MonthDay.selectedOptionValue == "1") {
			return "LL"
		} else {
			return "MMMM YYYY";
		}
	}
}