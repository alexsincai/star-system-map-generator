import util from '../helpers/util';

import Star from './star';
import Planet from './planet';
import Orbit from './orbit';
import Belt from './belt';

class StarSystem {
	constructor( radius, spread ) {
		this.radius = radius;
		this.spread = spread;

		this.star = new Star( util.map( radius, 0, 100, 30, 80 ), util.map( radius, 0, 100, 4, 8 ) );
		this.populateOrbits();
		this.calcSpread();
		this.planets.filter( p => p.angle ).forEach( p => p.angle = p.angle * -1 );
	}

	setRadius( radius ) {
		this.radius = radius;
		this.star.setRadius( util.map( radius, 0, 100, 30, 80 ) );
		this.populateOrbits();
		this.calcSpread();
		this.planets.filter( p => p.angle ).forEach( p => p.angle = p.angle * -1 );
	}

	populateOrbits() {
		const count = util.map( this.radius, 0, 100, 6, 9 );
		this.planets = [];
		this.orbits = [];
		this.belts = [];

		for ( let i = 0; i < count; i++ ) {
			const rad = i < Math.floor( count / 2 ) ? util.random( 2, 4 ) : util.random( 6, 9 );
			this.planets.push( new Planet( rad ) );
		}
		this.planets.sort( ( a, b ) => b.radius - a.radius ).sort( ( a, b ) => {
			if ( a.small && b.small ) return 0;
			if ( a.small && !b.small ) return -1;
			if ( !a.small && b.small ) return 1;
		} );

		// const off = this.star.radius * 0.85;
		const off = this.star.radius - 10;
		const min = off + 15 + this.planets[ 0 ].radius;
		const max = off + 90 - this.planets[ this.planets.length - 1 ].radius;
		for ( let i = 0; i < count; i++ ) {
			const dist = util.round( util.map( i, 0, count - 1, min, max ) );
			this.orbits.push( new Orbit( dist ) );
			this.planets[ i ].setDistance( dist );
		}

		for ( let i = 0; i < count; i++ ) {
			let b = new Belt( this.orbits[ i ].distance, this.planets[ i ].radius );
			b.hide();
			this.belts.push( b );
		}

		let home = util.random( this.planets.filter( p => p.small ) );
		home.setHabitable();
	}

	setSpread( spread ) {
		this.spread = spread;
		this.calcSpread();
	}

	calcSpread() {
		const min = this.spread * -0.5;
		const max = min + this.spread;
		// this.planets.filter( p => !p.small ).forEach( ( g, i, a ) => {
		// 	const angle = util.map( i, 0, a.length - 1, min, max );
		// 	g.setAngle( angle );
		// } );
		this.planets.forEach( ( g, i, a ) => {
			const angle = util.round( util.map( util.fib( i ), 1, util.fib( a.length - 1 ), min, max ) );
			// console.log( util.fib( i ), util.fib( a.length - 1 ), min, max, angle )
			g.setAngle( angle )
		} )
	}

	display() {
		this.calcSpread();
		return {
			star: this.star.display(),
			planets: this.planets.map( p => p.display() ),
			belts: this.belts.map( b => b.display() ),
			orbits: this.orbits.map( o => o.display() ),
		};
	}
}

export default StarSystem;