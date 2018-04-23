import util from '../helpers/util';
import Body from './body';

class Textured extends Body {
	constructor( radius, bandCount ) {
		super( radius );
		this.bandCount = Math.round( bandCount );
		this.buildColors();
		this.slice();
	}

	setBandCount( bands ) {
		this.bandCount = Math.round( bands );
		this.buildColors();
		this.slice();
	}

	setColor( color ) {
		super.setColor( color );
		this.buildColors();
	}

	buildColors() {
		this.colors = [];
		for ( let i = 0; i < this.bandCount; i++ )
			this.colors.push( util.color.random( this.color ) );
	}

	setColorArray( array ) {
		this.colors = array;
	}

	slice() {
		let slices = [];
		for ( let i = 0; i <= this.bandCount; i++ ) {
			slices.push( util.random( 0, 100, 0 ) );
		}
		slices.sort( ( a, b ) => a - b );

		const max = slices.reduce( ( a, v ) => a + v, 0 );

		let total = 0;
		for ( let i = 0; i < slices.length; i++ ) {
			slices[ i ] = util.round( total + util.map( slices[ i ], 0, max, 0, 1 ) );
			total = slices[ i ];
		}

		this.slices = [];
		for ( let i = 0; i < this.bandCount; i++ ) {
			this.slices.push( {
				offset: slices[ i ],
				stopColor: this.colors[ i ]
			} );
			this.slices.push( {
				offset: util.round( slices[ i + 1 ] + 0.01 ),
				stopColor: this.colors[ i ]
			} );
		}

		for ( let i = 0; i < this.slices.length; i++ ) {
			this.slices.key = i;
		}
	}

	display() {
		let out = super.display();

		if ( out ) {
			out.texture = this.slices;
		}

		return out;
	}
}

export default Textured;