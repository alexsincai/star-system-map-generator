import React from 'react';
import util from '../helpers/util';

const offset = ( angle ) => util.round( util.map( 1 - Math.abs( Math.sin( angle * Math.PI / 180 ) ), 0, 1, 0.35, 1 ) );

const MoonDef = ( props ) => {

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

	const maskbg = {
		x: props.radius * -1.2,
		y: props.radius * -1.2,
		width: props.radius * 2.4,
		height: props.radius * 2.4,
		fill: '#000000',
		clipPath: `url(#${ props.id }-clip)`
	};

	return (
		<g>
      <defs>
        <circle id={ `${ props.id }-body` } cx="0" cy="0" r={ props.radius } />
      </defs>

      <clipPath id={ `${ props.id }-clip` }>
        <use href={ `#${ props.id }-body` } />
      </clipPath>
      <mask id={ `${ props.id }-mask` }>
        <rect { ...maskbg } />
        <use href={ `#${ props.id }-body` } fill="url(#sphere)" filter="url(#displace-small)" />
      </mask>

      <g id={ `${ props.id }-definition` }>
        <g { ...transform }>
          <use href={ `#${ props.id }-body` } fill={ props.color } />
          <use href={ `#${ props.id }-body` } fill="#000000" mask={ `url(#${ props.id }-mask)` } />
        </g>
      </g>
    </g>
	)
};

export default MoonDef;