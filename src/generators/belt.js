import util from '../helpers/util';

class Belt {
	constructor( distance, radius ) {
		this.distance = distance;
		this.radius = radius;
		this.rings = true;
		this.show = false;
	}

	set radius( r ) {
		this._count = Math.round( r );
		this._radius = r;
		this.rings = true;
	}

	get radius() {
		return this._radius;
	}

	set rings( _ ) {
		const min = this.distance - this.radius * 0.5;
		const max = min + this.radius;
		this._rings = Array( this._count ).fill().map( ( _, i ) => util.round( util.map( i, 0, this._count - 1, min, max ) ) );
	}

	get rings() {
		return this._rings;
	}
}

export default Belt;