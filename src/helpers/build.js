import util from './util';
import StarSystem from '../generators/starsystem';
import StarSystem2 from '../generator/starsystem';

const build = {
	start: ( s ) => {
		s.system = new StarSystem( s.settings.radius, s.settings.spread );
		s.system2 = new StarSystem2( s.settings.radius );
		build.viewBox( s );
		return s;
	},

	viewBox: ( s ) => {
		s.settings.viewBox = [
			util.round( s.system.star.radius - 5 ),
			util.round( Math.SQRT2 * -25 ),
			100,
			util.round( Math.SQRT2 * 50 )
		];
		return s;
	},

	radius: ( s, r ) => {
		s.system.setRadius( r );
		s.system2.radius = r;
		s.settings.radius = r;
		build.viewBox( s );
		return s;
	},

	spread: ( s, r ) => {
		s.system.setSpread( r );
		s.settings.spread = r;
		return s;
	},

	planetRadius: ( s, i, v ) => {
		s.system.planets[ i ].setRadius( v );
		s.system.belts[ i ].setRadius( v );
		return s;
	}
};

export default build;