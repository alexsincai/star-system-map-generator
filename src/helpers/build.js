import util from './util';
import System from '../generators/system';

const build = {
	start: ( s ) => {
		s.system = new System( s.settings.radius );
		// s.settings.viewBox = build.viewBox( s.system.star.radius );
		// return s;
		return build.randomize( s );
	},

	randomize: ( s ) => {
		s.system.radius = util.random( 0, 100, 0 );
		s.settings.radius = s.system.radius;
		s.system.planets.forEach( ( p, i ) => {
			if ( Math.random() > 0.7 ) {
				if ( Math.random() > 0.5 ) {
					s.system.planets[ i ].show = false;
					s.system.belts[ i ].show = false;
					s.system.orbits[ i ].show = false;
				} else {
					s.system.planets[ i ].show = false;
					s.system.belts[ i ].show = true;
					s.system.orbits[ i ].show = false;
				}
			}
			if ( !p.small ) {
				if ( Math.random() < 0.7 ) {
					p.ring.show = false;
				} else {
					p.ring.width = util.random( 0, 100, 0 );
				}
			}
		} );
		s.settings.viewBox = build.viewBox( s.system.star.radius );
		return s;
	},

	viewBox: ( r ) => [
		util.round( r - 5 ),
		util.round( Math.SQRT2 * -25 ),
		100,
		util.round( Math.SQRT2 * 50 ),
	],

	refib: ( s ) => {
		s.system.fib = true;
		return s;
	},

	radius: ( s, v ) => {
		s.system.radius = v;
		s.settings.radius = v;
		s.settings.viewBox = build.viewBox( s.system.star.radius );
		return s;
	},

	planetRadius: ( s, i, v ) => {
		s.system.planets[ i ].radius = v;
		s.system.belts[ i ].radius = v;
		return s;
	},

	showAs: ( s, i, v ) => {
		if ( v === 0 ) {
			s.system.planets[ i ].show = true;
			s.system.belts[ i ].show = false;
			s.system.orbits[ i ].show = true;
		}
		if ( v === 1 ) {
			s.system.planets[ i ].show = false;
			s.system.belts[ i ].show = true;
			s.system.orbits[ i ].show = false;
		}
		if ( v === 2 ) {
			s.system.planets[ i ].show = false;
			s.system.belts[ i ].show = false;
			s.system.orbits[ i ].show = false;
		}
		return s;
	},

	planetColor: ( s, i, v ) => {
		s.system.planets[ i ].color = v;
		return s;
	},

	habitable: ( s, i, v ) => {
		s.system.planets[ i ].habitable = v;
		return s;
	},

	ring: ( s, i, v ) => {
		s.system.planets[ i ].ring = v;
		return s;
	}
};

export default build;