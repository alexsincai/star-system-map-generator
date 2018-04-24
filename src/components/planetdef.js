import util from '../helpers/util';
import React from 'react';

const makeRing = ( planetRadius, ringWidth ) => {
	const width = util.map( ringWidth, 0, 100, 0, planetRadius );
	const center = planetRadius * 2.5;
	const outer = center + ( width * 0.5 );
	const inner = center - ( width * 0.5 );

	return [
		'M', -outer, 0,
		'a', outer, outer * 0.25, 0, 0, 1, outer * 2, 0,
		'a', outer, outer * 0.25, 0, 0, 1, outer * -2, 0,
		'z',
		'M', -inner, 0,
		'a', inner, inner * 0.25, 0, 0, 1, inner * 2, 0,
		'a', inner, inner * 0.25, 0, 0, 1, inner * -2, 0,
		'z',
	].join( ' ' );
};

const colorRing = ( ringWidth, texture ) => {
	const inner = util.map( ringWidth, 0, 100, 1, 0.6 );
	return texture.map( t => {
		t.offset = util.round( util.map( t.offset, 0, 1, inner, 1 ) );
		return t;
	} );
};

const PlanetDef = ( props ) => {
	return (
		<g>
      <circle id={ props.id + '-body' } cx="0" cy="0" r={ props.radius } />

      { props.ring.show && (
        <path id={ props.id + '-ring' } d={ makeRing( props.radius, props.ring.width ) } fillRule="evenodd" />
      ) }

      { props.ring.show && (
        <rect id={ props.id + '-ring-shadow' } x="0" y={ props.radius * -0.4 } width={ props.radius * 3 } height={ props.radius * 0.8 } />
      ) }

      <linearGradient id={ props.id + '-gradient' } gradientTransform={ `rotate(${ props.small ? 45 : 90 })` }>
        { props.texture.map( ( s, ss ) => (
          <stop key={ ss } { ...s } />
        ) ) }
      </linearGradient>

      { props.ring.show && (
        <radialGradient id={ props.id + '-ring-gradient' }>
          { colorRing( props.ring.width, props.texture ).map( ( c, cc ) => (
            <stop key={ c } { ...c } />
          ) ) }
        </radialGradient>
      ) }

      <clipPath id={ props.id + '-clip' }>
        <use href={ '#' + props.id + '-body' } />
      </clipPath>

      { props.ring.show && (
        <clipPath id={ props.id + '-ring-clip' }>
          <rect x={ props.radius * -3 } y="0" width={ props.radius * 6 } height={ props.radius } />
        </clipPath>
      ) }

      { props.ring.show && (
        <mask id={ props.id + '-ring-shadow-mask' }>
          <rect x="0" y={ props.radius * -0.5 } width={ props.radius * 3 } height={ props.radius } fill="#000000" />
          <use href={ '#' + props.id + '-ring' } fill="#666666" />
          <use href={ '#' + props.id + '-body' } fill="#000000" />
        </mask>
      ) }

      <mask id={ props.id + '-mask' }>
        <rect x={ -props.radius } y={ -props.radius } width={ props.radius * 2 } height={ props.radius * 2 } fill="#000000" />
        <use href={ '#' + props.id + '-body' } fill="url( #sphere )" filter="url( #displace-small )" />
      </mask>

      <g id={ props.id + '-definition' }>
        <g transform={ `rotate(${ props.angle } 0 0), translate(${ props.distance } 0)` }>
          <use href={ '#' + props.id + '-ring' } fill={ `url(#${ props.id }-ring-gradient)` } />

          <use href={ '#' + props.id + '-body' } fill={ `url(#${ props.id }-gradient)` } />
          <use href={ '#' + props.id + '-body' } fill={ `url(#${ props.id }-gradient)` } filter="url(#displace-small)" clipPath={ `url(#${ props.id }-clip)` } />
          <use href={ '#' + props.id + '-body' } fill="#000000" mask={ `url(#${ props.id }-mask)` } />

          <use href={ '#' + props.id + '-ring' } fill={ `url(#${ props.id }-ring-gradient)` } clipPath={ `url(#${ props.id }-ring-clip)` } />
          <use href={ '#' + props.id + '-ring-shadow' } fill="#000000" filter="url(#displace-small)" mask={ `url(#${ props.id }-ring-shadow-mask)` } />
        </g>
      </g>
    </g>
	);
};

export default PlanetDef;