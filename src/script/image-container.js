class ImageContainer extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		this.innerHTML= `
			<div class="image-container">
				<img class="og-image" alt="Worldwide Overall Data" src="https://covid19.mathdro.id/api/og">
			</div>`;
	}
}

customElements.define("image-container", ImageContainer);