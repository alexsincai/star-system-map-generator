class Ring {
	constructor( width ) {
		this.show = true;
		this.width = width;
	}

	set width( width ) {
		this._width = width;
		if ( width <= 0 ) this.show = false;
		else this.show = true;
	}

	get width() {
		return this._width;
	}

}

export default Ring;