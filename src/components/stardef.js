import React from 'react';

const StarDef = ( props ) => {
	const rays = props.rays && props.rays.map( ( r, rr ) => {
		return {
			// key: rr,
			x1: 0,
			y1: 0,
			x2: 0,
			y2: r.length,
			stroke: props.color,
			strokeWidth: 0.125,
			transform: `rotate(${ r.angle},0,0)`
		}
	} );
	const textured = {
		x: props.radius * -1.2,
		y: props.radius * -1.2,
		width: props.radius * 2.4,
		height: props.radius * 2.4,
		fill: 'url(#star-gradient)',
		filter: 'url(#displace-large)',
		clipPath: 'url(#star-clip)'
	}

	return (
		<g>
      <circle id="star-body" cx="0" cy="0" r={ props.radius } />
      <linearGradient id="star-gradient" gradientTransform="rotate(-45)">
        { props.texture.map( t => (
          <stop { ...t } />
        ) ) }
      </linearGradient>
      <clipPath id="star-clip">
        <use href="#star-body" />
      </clipPath>
      { props.rays && (
        <g id="star-rays">
          { rays.map( r => (
            <line { ...r } />
          ) ) }
        </g>
      ) }
      <g id="star-definition">
        <use href="#star-rays" />
        <rect { ...textured } />
      </g>
    </g>
	)
};

export default StarDef;