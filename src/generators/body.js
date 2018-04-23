import util from '../helpers/util';

class Body {
	constructor( radius, color = util.color.from() ) {
		this.radius = radius;
		this.color = color;
		this.shown = true;
	}

	setRadius( radius ) {
		this.radius = radius;
	}

	setDistance( distance ) {
		this.distance = distance;
	}

	setAngle( angle ) {
		this.angle = angle;
	}

	setColor( color ) {
		this.color = color;
	}

	setShown( shown ) {
		this.shown = shown;
	}

	show() {
		this.setShown( true );
	}

	hide() {
		this.setShown( false );
	}

	display() {
		return {
			shown: this.shown,
			radius: this.radius,
			distance: this.distance,
			angle: this.angle,
			color: this.color
		};
	}
}

export default Body;