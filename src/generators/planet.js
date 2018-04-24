import util from '../helpers/util';
import Body from './body';
import Ring from './ring';

class Planet extends Body {
	constructor( radius, color = util.color.from() ) {
		super( radius, Math.round( radius ), color );
		this._ring = new Ring( 100 );
		this.radius = radius;
	}

	set ring( width ) {
		this.ring.width = width;
	}

	get ring() {
		return this._ring;
	}

	set radius( radius ) {
		this._radius = radius;
		this._bands = Math.round( radius );
		this.texture = Math.round( radius );
		if ( radius < 5 ) {
			this._small = true;
			if ( this.ring ) this.ring.show = false;
		}
		if ( radius > 5 ) {
			this.habitable = false;
			this.small = false;
		}
	}

	get radius() {
		return this._radius;
	}

	set small( small ) {
		this._small = small;
		if ( small ) {
			if ( this.radius > 5 ) this.radius = util.random( 2, 4 );
			if ( this.ring ) this.ring.show = false;
		} else {
			if ( this.radius < 5 ) this.radius = util.random( 6, 9 );
			if ( this.habitable ) this.habitable = false;
			if ( this.ring && this.ring.width > 0 ) this.ring.show = true;
		}
	}

	get small() {
		return this._small;
	}

	set habitable( hab ) {
		this._habitable = hab;
		if ( hab ) this.small = true;
	}

	get habitable() {
		return this._habitable;
	}
}

export default Planet;