import util from '../helpers/util';
import Textured from './textured';

class Star extends Textured {
	constructor( radius ) {
		super( radius, util.map( radius, 30, 80, 4, 8 ) );
		this.setColor();
		this.setRays();
	}

	setRadius( radius ) {
		super.setRadius( radius );
		super.setBandCount( util.map( radius, 30, 80, 4, 8 ) );
		this.setColor();
		this.setRays();
	}

	setColor() {
		const h = util.map( this.radius, 30, 80, 0, 60 );
		super.setColor( util.color.from( h, h, 60, 90, 70, 90 ) );
	}

	setRays() {
		this.rays = [];
		const count = util.round( util.map( this.radius, 30, 80, 300, 300 ), 0 );
		for ( let i = 0; i < count; i++ ) {
			const len = util.random( this.radius * 1.2, this.radius * 1.8, 0 );
			let ang = util.map( i, 0, count, 0, 360 );
			this.rays.push( {
				key: i,
				length: len,
				angle: ang
			} );
		}
	}

	display() {
		let out = super.display();
		delete out.angle;
		delete out.distance;
		out.rays = this.rays;
		return out;
	}
}

export default Star;