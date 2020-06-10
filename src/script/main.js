import "./search-box.js"

//search-box custom element
const searchBoxElement = document.querySelector("search-box");

//array numberLabel menampung label dari masing2 angka statistik
//array numberLabelAttr menampung class utk masing2 angka statistik 
const numberLabel = ["Confirmed","Recovered", "Deaths"];
const numberLabelAttr = ["totalCase","recovered","death"];

function main() {
	//eventhandler saat search button diklik
	const buttonClicked = () => {
		//input value
		const userInput = searchBoxElement.inputValue;
		
		//fetching datanya
		fetch(`https://covid19.mathdro.id/api/countries/${userInput}`)
				.then(response => {
				return response.json();
			})
			.then(responseJson => {
					renderData(responseJson);
			})
			.catch(error => {
				showResponseMessage(error);
			});
		
		//untuk merender bagian yang menunjukan angka statistiknya
		function renderData(responseJson) {
			let dataJson = document.querySelector("#dataContainer");
			dataJson.innerHTML = `
				<div class="data-box">
					<h3>Covid19 Data in ${userInput}</h3>
					<div class="country-data">
					</div>
					<button class="close-button" id="closeDataBox">Close</button>
				</div>`;
			
			//iterating isi Jsonnya. Bagian paling ribet. This took days of googling to be figured out!
			//arrayItem ini utk nampung isi properti "value" (angka statistiknya) dari jsonnya.
			const arrayItem = [];
			for(let i = 0; i <= Object.entries(responseJson).length; i++){
				if(i >= Object.entries(responseJson).length - 1) {
					break
				}
				let item = Object.values(responseJson)[i].value;
				let itemString = item.toString();
				arrayItem[i] = itemString;	
			}
			//ngisi angka statistik ke <h4>
			arrayItem.forEach(item => {
				dataJson.querySelector(".country-data").innerHTML += `
					<div class="card ${numberLabelAttr[arrayItem.indexOf(item)]}" id="dataBox">
						<h4 class="dataH4">${item}</h4>
						<p>${numberLabel[arrayItem.indexOf(item)]}</p>
					</div>`;
			});
			
			dataJson.querySelector("#closeDataBox").addEventListener("click", function() {
				document.querySelector(".data-box").remove();
			});
		
			const showResponseMessage = (message = "Data Tidak Ada!") => {
				alert(message);
			};
			
		};
	};
	
	searchBoxElement.buttonEvent = buttonClicked;
}

export default main;