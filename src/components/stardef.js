import React from 'react';

const StarDef = ( props ) => {

	const rays = props.rays.map( ( r, rr ) => {
		return {
			key: rr,
			x1: 0,
			y1: 0,
			x2: r.length,
			y2: 0,
			stroke: props.color,
			strokeWidth: 0.125,
			strokeLinecap: 'round',
			transform: `rotate(${ r.angle } 0 0)`
		};
	} );

	return (
		<g>
      <circle id="star-body" cx="0" cy="0" r={ props.radius } />

      <linearGradient id="star-gradient" gradientTransform="rotate(60)">
        { props.texture.map( t => (
          <stop { ...t } />
        ) ) }
      </linearGradient>

      <clipPath id="star-clip">
        <use href="#star-body" />
      </clipPath>

      <g id="star-definition">
        { rays.map( r => (
          <line { ...r } />
        ) ) }
        <use href="#star-body" fill="url(#star-gradient)" />
        <use href="#star-body" fill="url(#star-gradient)" filter="url(#displace-large)" clipPath="url(#star-clip)" />
      </g>
    </g>
	);
};

export default StarDef;