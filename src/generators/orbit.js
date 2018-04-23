class Orbit {
	constructor( distance, shown = true ) {
		this.distance = distance;
		this.shown = shown;
	}

	setDistance( distance ) {
		this.distance = distance;
	}

	setShown( show ) {
		this.shown = show;
	}

	show() {
		this.setShown( true );
	}

	hide() {
		this.setShown( false );
	}

	display() {
		return {
			shown: this.shown,
			distance: this.distance
		};
	}
}

export default Orbit;