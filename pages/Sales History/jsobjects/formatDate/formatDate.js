export default {
	toLocalTimezone() {
		const utcDate = tbl_ListSales.selectedRow.dateTimeOutgoing;
		
		// Splitting the date and time
		const [datePart, timePart] = utcDate.split('T');
		
		// Splitting the time and timezone
		const [time, timezone] = timePart.split('+');
		
		console.log('Original: ', utcDate)
		console.log('Date: ', datePart);
		console.log('Timezone: ', moment.tz.guess());
		console.log('by Moment.js: ', moment.tz(moment.utc(utcDate), moment.tz.guess()).format('DD MMMM YYYY, HH:mm'));
	}
}