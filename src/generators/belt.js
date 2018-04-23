import util from '../helpers/util';
import Orbit from './orbit';

class Belt extends Orbit {
	constructor( distance = 0, radius = 0 ) {
		super( distance );
		this.radius = Math.round( radius );
		this.fill();
	}

	setRadius( radius ) {
		this.radius = Math.round( radius );
		this.fill();
	}

	fill() {
		this.rings = [];
		const min = this.distance - this.radius * 0.5;
		const max = min + this.radius;

		for ( let i = 0; i < this.radius; i++ ) {
			this.rings.push( util.round( util.map( i, 0, this.radius - 1, min, max ) ) );
		}
	}

	display() {
		let out = super.display();

		if ( out ) {
			out.rings = this.rings;
		}

		return out;
	}

}

export default Belt;