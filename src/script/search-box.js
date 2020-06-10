class SearchBox extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		this.render();
	}
	
	set buttonEvent(event) {
		this._clicked = event;
		this.render();
	}
	
	get inputValue() {
		return this.querySelector("#countryName").value;
	}
	render() {
		this.innerHTML = `
			<div class="search-box">
				<p>Input country name below to see the country's Covid19 data.</p>
				<input placeholder="Input Country Name" id="countryName" type="text">
				<button id="searchButton" type="submit">Search</button>
			</div>`;
		
		this.querySelector("#searchButton").addEventListener("click", this._clicked);
	}
}

customElements.define("search-box", SearchBox);