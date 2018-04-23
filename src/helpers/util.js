import colr from 'colr';

const util = {
	map: ( v, im = 0, ix = 1, om = 1, ox = 100 ) => ( v - im ) * ( ox - om ) / ( ix - im ) + om,
	random: ( x, y = null, z = 4 ) => x.constructor === Array ? util.randArray( x ) : util.round( util.randInt( x, y, z ), z ),
	randArray: ( a ) => a[ Math.floor( Math.random() * a.length ) ],
	randInt: ( min = 0, max = 1, dec = 4 ) => Math.floor( Math.random() * ( ( max * Math.pow( 10, dec ) ) - ( min * Math.pow( 10, dec ) ) + 1 ) + ( min * Math.pow( 10, dec ) ) ) / Math.pow( 10, dec ),
	round: ( v, d = 4 ) => Math.round( v * Math.pow( 10, d ) ) / Math.pow( 10, d ),
	a2r: ( a ) => a * Math.PI / 180,
	color: {
		from: ( hmin = 0, hmax = 360, smin = 20, smax = 50, lmin = 60, lmax = 90 ) => {
			const h = util.random( hmin, hmax, 0 );
			const s = util.random( smin, smax, 0 );
			const l = util.random( lmin, lmax, 0 );
			return colr.fromHsl( h, s, l ).toHex();
		},
		random: ( color, v = 20 ) => {
			color = colr.fromHex( color ).toHslObject();
			const h = util.round( color.h + util.random( -v, v, 0 ) );
			const s = util.round( color.s + util.random( -v, v, 0 ) );
			const l = util.round( color.l + util.random( -v, v, 0 ) );
			return colr.fromHsl( h, s, l ).toHex();
		}
	},
};

export default util;