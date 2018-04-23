import util from '../helpers/util';
import Body from './body';
import Textured from './textured';

class Planet extends Textured {
	constructor( radius ) {
		super( radius, radius );

		if ( radius < 5 ) this.setSmall();

		// this.buildMoons();
	}

	setRadius( radius ) {
		super.setRadius( radius );
		super.setBandCount( radius );

		if ( radius < 5 ) this.setSmall();
		// this.buildMoons();
	}

	setSmall( small = true ) {
		this.small = small;

		if ( small && this.radius > 5 )
			this.setRadius( util.random( 2, 4 ) / 1 );

		if ( !small && this.radius < 5 )
			this.setRadius( util.random( 6, 9 ) / 1 );

		// this.buildMoons();
	}

	setHabitable( habitable = true ) {
		this.habitable = habitable;
		this.setSmall( habitable );

		if ( !habitable ) this.buildColors();
		else {
			const options = [ util.color.from( 80, 150, 40, 60, 60, 80 ), util.color.from( 180, 250, 40, 60, 60, 80 ) ];
			const offset = util.random( 0, 1, 0 );
			let colors = Array( this.bandCount ).fill().map( ( _, i ) => options[ ( i + offset + 2 ) % 2 ] );
			this.setColorArray( colors );
		}

		// this.buildMoons();
	}

	// buildMoons() {
	// 	let count = util.random( 4, 6, 0 );
	// 	if ( this.small ) count = util.random( 0, 1, 0 );
	// 	if ( this.habitable ) count = 1;
	//
	// 	this.moons = [];
	// 	for ( let i = 0; i < count; i++ ) {
	// 		let radius = util.round( util.random( this.radius * 0.1, this.radius * 0.3 ) );
	// 		this.moons.push( new Body( radius, util.color.random( this.color ) ) );
	// 	}
	//
	// 	this.moons.sort( ( a, b ) => b.radius - a.radius );
	//
	// 	const min = this.radius * 2;
	// 	const max = this.radius * 2.5;
	// 	for ( let i = 0; i < count; i++ ) {
	// 		let dist = util.round( util.map( i, 0, count, min, max ) );
	// 		let angle = util.map( i, 0, count, 0, 360 );
	// 		this.moons[ i ].setColor( this.color );
	// 		this.moons[ i ].setAngle( angle );
	// 		this.moons[ i ].setDistance( dist );
	// 	}
	// }

	display() {
		let out = super.display();

		if ( out ) {
			delete out.color;
			out.small = this.small;
			out.habitable = this.habitable;

			// if ( this.moons.length ) out.moons = this.moons.map( m => m.display() );
		}

		return out;
	}
}

export default Planet;