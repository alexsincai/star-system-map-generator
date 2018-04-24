import util from '../helpers/util';

const fibs = Array( 16 ).fill().map( ( _, i ) => util.fib( i ) ).sort( () => Math.random() > 0.5 );

class Body {
	constructor( radius, bands, color ) {
		this._fibs = fibs;
		this.radius = radius;
		this._bands = bands;
		this.texture = bands;
		this.color = color;
		this.show = true;
	}

	set radius( radius ) {
		this._radius = radius;
		this._bands = Math.round( radius );
		this.texture = Math.round( radius );
	}

	get radius() {
		return this._radius;
	}

	set fibs( _ ) {
		this._fibs = Array( 16 ).fill().map( ( _, i ) => util.fib( i ) ).sort( () => Math.random() > 0.5 );
		this.texture = this._bands;
	}

	get fibs() {
		return this._fibs;
	}

	set color( color ) {
		this._color = color;
		this._colors = Array( this._bands ).fill().map( () => util.color.random( color, 10 ) );
	}

	get color() {
		return this._color;
	}

	set texture( count ) {
		const bands = this.fibs.slice( 0, count );
		const sum = bands.reduce( ( a, v ) => a + v );
		const values = bands.map( v => util.round( v / sum ) );
		let total = 0;
		let out = [ 0 ];
		values.forEach( b => {
			total = util.round( total + b );
			out.push( total );
		} );
		this._texture = out;
	}

	get texture() {
		let out = [];
		for ( let i = 0; i < this._colors.length; i++ ) {
			out.push( {
				offset: this._texture[ i ],
				stopColor: this._colors[ i ]
			} );
			out.push( {
				offset: util.round( this._texture[ i + 1 ] - 0.001 ),
				stopColor: this._colors[ i ]
			} );
		}
		return out;
	}
}

export default Body;