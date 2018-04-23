import util from '../helpers/util';

//
class Body {
	constructor( radius ) {
		this._radius = radius;
		this.show = true;
	}

	set radius( radius ) {
		this._radius = radius;
	}

	get radius() {
		return this._radius;
	}

	set color( color ) {
		this._color = color;
	}

	get color() {
		return this._color;
	}

	set show( show ) {
		this._show = show;
	}

	get show() {
		return this._show;
	}

	// show() {
	// 	this.show = true;
	// }
	//
	// hide() {
	// 	this.shown = false;
	// }

	display() {
		return {
			show: this.show,
			radius: this.radius,
			color: this.color
		}
	}
}

//
// util
// Body
//
const colorStripes = Array( 8 ).fill().map( ( _, i ) => util.fib( i ) ).sort( () => Math.random() > 0.5 );

class Textured extends Body {
	constructor( radius, stripes ) {
		super( radius );
		this.stripes = stripes;
		this.colors = util.color.from();
	}

	set stripes( stripeCount ) {
		const bands = colorStripes.slice( 0, stripeCount );
		const sum = bands.reduce( ( a, v ) => a + v );
		const values = bands.map( v => util.round( v * 100 / sum ) );
		let total = 0;
		this.bands = [];
		values.forEach( v => {
			total = util.round( total + v );
			this.bands.push( total );
		} );
	}

	get stripes() {
		return this.bands;
	}

	set colors( color ) {
		this._color = color;
		this._colors = Array( this.stripes.length ).fill().map( () => util.color.random( color ) );
	}

	get colors() {
		return this._colors;
	}

	get texture() {
		// return this;
		let out = [];

		for ( let i in this.stripes ) {
			out.push( {
				offset: this.stripes[ i ],
				stopColor: this.colors[ i ]
			} )
		}

		return out;
	}

	// display() {
	// 	let out = super.display();
	//
	// 	out.texture = this.texture;
	// 	// out.stripes = this.stripes;
	// 	// out.color = this.color;
	// 	// out.colors = this.colors;
	//
	// 	return out;
	// }
}

//
// Textured
//
class Planet extends Textured {
	constructor( radius ) {
		super( radius, Math.round( radius ) );
		this.radius = radius;
		this.stripes = Math.round( radius );
	}

	set radius( radius ) {
		this._radius = radius;
		this.stripes = Math.round( radius );
		if ( radius < 5 ) this.small = true;
		if ( radius > 5 ) this.ring = true;
	}

	get radius() {
		return this._radius;
	}

	set small( small ) {
		this._small = small;
		if ( this.small ) {
			if ( this.radius < 5 ) this.radius = util.random( 6, 9 );
			this.ring = false;
		} else {
			if ( this.radius > 5 ) {
				this.radius = util.random( 2, 4 );
				this.ring = true;
			}
			this.habitable = false;
		}
	}

	get small() {
		return this._small;
	}

	set habitable( hab ) {
		this._habitable = hab;
		if ( hab ) {
			this.small = true;
		} else {
			if ( this.small ) this.small = false;
		}
	}

	get habitable() {
		return this._habitable;
	}

	set ring( ring ) {
		this._ring = null;
		if ( ring ) this._ring = {
			width: null,
			thick: null
		};
	}

	get ring() {
		return this._ring;
	}

	set ringWidth( width ) {
		if ( this.ring ) this._ring.width = width;
	}

	get ringRidth() {
		return this._ring.width;
	}

	set ringThickness( thick ) {
		if ( this.ring ) this._ring.thick = thick;
	}

	get ringThickness() {
		return this._ring.thick;
	}

	set color( color ) {
		this.colors = color;
	}

	get color() {
		return this.texture;
	}

	// display() {
	// 	let out = super.display();
	//
	// 	// if ( this.small ) out.small = this.small;
	//
	// 	if ( this.habitable ) out.habitable = this.habitable;
	//
	// 	if ( this.ring ) out.ring = this.ring;
	//
	// 	return out;
	// }
}

//
// Textured
//
class Star extends Textured {
	constructor( radius ) {
		super( radius, Math.round( radius / 10 ) );
	}

	get color() {
		return this._color;
		// return {
		// color: this._color,
		// texture: this.texture
		// }
	}

	get texture() {
		return this.texture;
	}

	set rays( count ) {
		this._rays = [];
		for ( let i = 0; i < count; i++ ) {
			this._rays.push( {
				length: util.random( this.radius * 1.2, this.radius * 1.8 ),
				angle: util.round( util.map( i, 0, count, 0, 360 ) )
			} )
		}
	}

	get rays() {
		return this._rays;
	}

	// display() {
	// 	let out = super.display();
	// 	delete out.show;
	// 	out.rays = this.rays;
	// 	return out;
	// }
}

//
// Star
// Planet
//
class StarSystem2 {
	constructor( radius ) {
		this.radius = radius;
	}

	set radius( radius ) {
		this.star = new Star( util.map( radius, 0, 100, 30, 80 ) );
		let h = Math.round( util.map( radius, 0, 100, 0, 60 ) );
		this.star.rays = Math.round( util.map( radius, 0, 100, 10, 15 ) )
		let s = util.random( 50, 100, 0 );
		let l = util.random( 75, 95, 0 )
		this.star.colors = util.color.from( h, h, s, s, l, l );

		let planets = [];
		const len = Math.round( util.map( radius, 0, 100, 4, 9 ) );
		for ( let i = 0; i < len; i++ ) {
			const small = i < Math.floor( len / 2 );
			const radius = small ? util.random( 2, 4 ) : util.random( 6, 9 );
			let planet = new Planet( radius );
			planets.push( planet );
		};
		this.planets = planets.sort( ( a, b ) => ( a.small || b.small ) ? 0 : b.radius - a.radius );
		util.random( this.planets.filter( p => p.small ) ).habitable = true;
	}

	// display() {
	// 	return {
	// 		star: this.star.display(),
	// 		planets: this.planets.map( p => p.display() )
	// 	}
	// }

}

export default StarSystem2;