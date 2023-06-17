export default {
	readCsvAsText(){
		const csvForecastData = upload_ForecastExport.files[0].data;
		const fileReader = new FileReader();
		
		fileReader.onload = () => {
			const fileContent = fileReader.result;
			const parsedData = Papa.parse(fileContent, { header: true });
			const jsonForecastData = parsedData.data;

			console.log(jsonForecastData);
		};

		fileReader.readAsText(csvForecastData);
	}
}