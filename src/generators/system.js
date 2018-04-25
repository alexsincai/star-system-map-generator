import util from '../helpers/util';

import Name from './name';
import Star from './star';
import Planet from './planet';
import Belt from './belt';
import Orbit from './orbit';

class System {
	constructor( radius ) {
		this.radius = radius;
		this.name = '';
	}

	set name( name = '' ) {
		this._name = name;
		if ( name === '' ) this._name = new Name().name();
	}

	get name() {
		let out = {
			system: `The ${ this._name } System`,
			star: this._name,
			orbits: []
		};
		let count = 0;
		if ( this.planets ) {
			for ( let i = 0; i < this.planets.length; i++ ) {
				if ( this.planets[ i ].show ) {
					let name = `${ this._name } ${ util.roman( count ) }`;
					let description = 'Gas giant';

					if ( this.planets[ i ].ring.show ) description = 'Ringed gas giant';
					if ( this.planets[ i ].small ) description = 'Rocky planet';
					if ( this.planets[ i ].habitable ) description = 'Habitable planet';

					out.orbits.push( `${ name } - ${ description }` );
					count++;
				}
				if ( this.belts[ i ].show ) out.orbits.push( 'Asteroid belt' );
			}
		}
		return out;
	}

	set radius( rad ) {
		this._radius = rad;
		const star = {
			h: util.map( rad, 0, 100, 0, 60 ),
			s: util.random( 70, 90, 0 ),
			l: util.random( 75, 95, 0 )
		};
		this.star = new Star( util.map( rad, 0, 100, 30, 80 ), util.color.from( star.h, star.h, star.s, star.s, star.l, star.l ) );
		this.star.rays = Math.round( util.map( rad, 0, 100, 300, 500 ) );

		const count = Math.round( util.map( rad, 0, 100, 4, 9 ) );
		const radii = Array( count ).fill().map( ( _, i ) => ( i < Math.floor( count / 2 ) ) ? util.random( 2, 4 ) : util.random( 6, 9 ) ).sort( ( a, b ) => ( a < 5 || b < 5 ) ? 0 : b - a );

		const minDist = this.star.radius + 10 + radii[ 0 ];
		const maxDist = this.star.radius + 95 - radii[ radii.length - 1 ];

		const distances = Array( count ).fill().map( ( _, d ) => util.round( util.map( d, 0, count - 1, minDist, maxDist ) ) );
		const angles = Array( count ).fill().map( ( _, d ) => util.round( util.map( util.fib( d ), 1, util.fib( count - 1 ), 10, -10 ) ) );

		this.planets = radii.map( r => new Planet( r ) );
		this.belts = [];
		this.orbits = [];

		this.planets.forEach( ( p, i ) => {
			p.distance = distances[ i ];
			p.angle = angles[ i ];

			this.belts[ i ] = new Belt( distances[ i ], p.radius );
			this.orbits[ i ] = new Orbit( distances[ i ] );
		} );

		let hab = util.random( this.planets.filter( r => r.radius < 5 ) );
		hab.habitable = true;
	}

	reangle() {
		this.planets.filter( p => p.show ).map( ( p, d, a ) => {
			p.angle = util.round( util.map( util.fib( d ), 1, util.fib( a.length - 1 ), 10, -10 ) );

			if ( isNaN( p.angle ) )
				p.angle = util.round( util.map( d, -a.length, a.length, 10, -10 ) );

			return p;
		} );
	}

	get radius() {
		return this._radius;
	}

	set fib( _ ) {
		this.star.fibs = true;
		this.planets.forEach( p => p.fibs = true );
	}

	get fib() {
		return true;
	}
}

export default System;