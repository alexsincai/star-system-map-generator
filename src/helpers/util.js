import colr from 'colr';

const util = {
	map: ( v, im = 0, ix = 1, om = 1, ox = 100 ) => ( v - im ) * ( ox - om ) / ( ix - im ) + om,
	random: ( x, y = null, z = 4 ) => x.constructor === Array ? util.randArray( x ) : util.round( util.randInt( x, y, z ), z ),
	randArray: ( a ) => a[ Math.floor( Math.random() * a.length ) ],
	randInt: ( min = 0, max = 1, dec = 4 ) => Math.floor( Math.random() * ( ( max * Math.pow( 10, dec ) ) - ( min * Math.pow( 10, dec ) ) + 1 ) + ( min * Math.pow( 10, dec ) ) ) / Math.pow( 10, dec ),
	round: ( v, d = 4 ) => Math.round( v * Math.pow( 10, d ) ) / Math.pow( 10, d ),
	fib: ( i ) => {
		if ( i < 0 ) return 0;
		if ( i === 0 ) return 1;
		return util.fib( i - 1 ) + util.fib( i - 2 );
	},
	capitalize: ( word ) => {
		let split = word.match( /[ -]/gi );
		let out;
		if ( split ) {
			for ( let i in split ) {
				out = word.split( split[ i ] ).map( w => w.slice( 0, 1 ).toUpperCase() + w.slice( 1 ).toLowerCase() );
				out = out.join( split[ i ] );
			}
		} else out = word.slice( 0, 1 ).toUpperCase() + word.slice( 1 ).toLowerCase();
		return out;
	},
	roman: ( num = 0 ) => {
		num++;
		const lookup = {
			m: 1000,
			cm: 900,
			d: 500,
			cd: 400,
			c: 100,
			xc: 90,
			l: 50,
			xl: 40,
			x: 10,
			ix: 9,
			v: 5,
			iv: 4,
			i: 1
		};
		let roman = '';
		for ( let i in lookup ) {
			while ( num >= lookup[ i ] ) {
				roman += i;
				num -= lookup[ i ];
			}
		}
		return roman.toUpperCase();
	},
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