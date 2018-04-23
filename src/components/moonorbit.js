import React from 'react';
import util from '../helpers/util';

const MoonOrbit = ( props ) => {

	let holder = [];
	if ( props.angle ) holder.push( `rotate(${ props.angle }, 0, 0)` );
	if ( props.distance ) holder.push( `translate(${ props.distance }, 0)` );
	if ( props.angle ) holder.push( `rotate(${ -props.angle }, 0, 0)` );

	let transform = !holder.length ? null : {
		transform: holder.join( ', ' ),
	}
	let d = [
		'M',
		props.width * -1, 0,
		'A',
		props.width * 0.5, props.height * 0.5,
		0, 0, 1,
		props.width, 0,
		'M',
		props.width, 0,
		'A',
		props.width * 0.5, props.height * 0.5,
		0, 0, 1,
		props.width * -1, 0,
	];

	let id = props.id;

	if ( props.type === 'front' ) {
		d = d.slice( 10 );
		id += '-front';
	}


	return (
		<path id={ id } { ...transform } d={ d.join(' ') } />
	);
};

export default MoonOrbit;