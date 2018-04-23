import React from 'react';

import MoonDef from './moondef';
import MoonShadow from './moonshadow';

const PlanetDef = ( props ) => {
	const textured = {
		x: props.radius * -1.2,
		y: props.radius * -1.2,
		width: props.radius * 2.4,
		height: props.radius * 2.4,
		fill: `url(#planet-${ props.id }-gradient)`,
		filter: 'url(#displace-mid)',
		clipPath: `url(#planet-${ props.id }-clip)`
	}

	let holder = [];
	if ( props.angle ) holder.push( `rotate(${ props.angle }, 0, 0)` );
	if ( props.distance ) holder.push( `translate(${ props.distance }, 0)` );
	const transform = !holder.length ? null : {
		transform: holder.join( ', ' )
	}

	const gradientTransform = props.small ? 45 : 90;

	return (
		<g>
      <circle id={ `planet-${ props.id }-body` } cx="0" cy="0" r={ props.radius } />
      <linearGradient id={ `planet-${ props.id }-gradient` } gradientTransform={ `rotate(${ gradientTransform })` }>
        { props.texture.map( t => (
          <stop { ...t } />
        ) ) }
      </linearGradient>

      <clipPath id={ `planet-${ props.id }-clip` }>
        <use href={ `#planet-${ props.id }-body` } />
      </clipPath>

      { props.moons && (
        <clipPath id={ `planet-${ props.id }-moon-clip` }>
          <rect x={ props.radius * -1.2 } y="0" width={ props.radius * 2.4 } height={ props.radius * 1.2 }/>
        </clipPath>
      ) }

      <mask id={ `planet-${ props.id }-mask` }>
        <rect { ...textured } fill="#000000" filter={ null } />
        <use href={ `#planet-${ props.id }-body` } fill="url(#sphere)" filter="url(#displace-small)" />
      </mask>

      { props.moons && (
        <g id={ `planet-${ props.id }-moons` }>
          { props.moons.map( ( m, mm ) => (
            <MoonDef key={ mm } id={ `planet-${ props.id }-moon-${ mm }` } { ...m } />
          ) ) }
        </g>
      ) }
      { props.moons && (
        <g id={ `planet-${ props.id }-moon-shadows` }>
          { props.moons.filter(m => m.angle && m.angle > 90 && m.angle < 200 ).map( ( m, mm ) => (
            <MoonShadow key={ mm } id={ `planet-${ props.id }-moon-${ mm }` } offset={ props.radius * 0.125 } { ...m } />
          ) ) }
        </g>
      ) }

      <g id={ `planet-${ props.id }-definition` }>
        <g { ...transform }>
          <use href={ `#planet-${ props.id }-moons` } />


          <rect { ...textured } />
          <rect { ...textured } fill="#000000" mask={ `url(#planet-${ props.id }-mask)` } />

          <use href={ `#planet-${ props.id }-moon-shadows` } clipPath={ `url(#planet-${ props.id }-clip)` } filter="url(#blur)" />

          <use href={ `#planet-${ props.id }-moons` } clipPath={ `url(#planet-${ props.id }-moon-clip)` } />
        </g>
      </g>
    </g>
	)
};

export default PlanetDef;