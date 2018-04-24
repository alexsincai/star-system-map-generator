import util from '../helpers/util';
import Body from './body';

class Star extends Body {
	constructor( radius, color ) {
		super( radius, Math.round( radius / 10 ), color );
	}

	set radius( radius ) {
		this._radius = radius;
		this._bands = Math.round( radius / 10 );
		this.texture = Math.round( radius / 10 );
	}

	get radius() {
		return this._radius;
	}

	set rays( count ) {
		this._rays = Array( count ).fill().map( ( _, i ) => {
			return {
				length: util.random( this.radius * 1.2, this.radius * 1.8 ),
				angle: util.round( util.map( i, 0, count, 0, 360 ) )
			};
		} );
	}

	get rays() {
		return this._rays;
	}
}

export default Star;