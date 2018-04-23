import React from 'react';
import util from '../helpers/util';

const offset = ( angle ) => util.round( util.map( 1 - Math.abs( Math.sin( angle * Math.PI / 180 ) ), 0, 1, 0.35, 1 ) );

const MoonShadow = ( props ) => {

	let dist = props.distance;
	if ( props.angle ) {
		dist = dist * offset( props.angle );
	}

	let holder = [];
	if ( props.angle ) holder.push( `rotate(${ props.angle }, 0, 0)` );
	if ( props.distance ) holder.push( `translate(${ dist }, 0)` );
	if ( props.angle ) holder.push( `rotate(${ -props.angle }, 0, 0)` );

	let transform = !holder.length ? null : {
		transform: holder.join( ', ' ),
	}

	return (
		<g id={ `${ props.id }-shadow-definition` } transform={ `translate(${ props.offset }, ${ props.offset })` }>
      <g { ...transform }>
        <circle cx="0" cy="0" r={ props.radius } fill="#000000aa" />
      </g>
    </g>
	)
};

export default MoonShadow;