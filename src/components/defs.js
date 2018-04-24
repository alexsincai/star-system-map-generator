import React from 'react';
import StarDef from './stardef';
import PlanetDef from './planetdef';

const Defs = ( props ) => {

	const background = {
		id: 'background-definition',
		x: props.box[ 0 ],
		y: -50,
		width: props.box[ 2 ],
		height: 100,
		fill: 'url( #background )',
	};

	return (
		<defs>
      <filter id="displace-large">
        <feTurbulence type="turbulence" baseFrequency="2" numOctaves="2" result="turbulence" />
        <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="5" xChannelSelector="R" yChannelSelector="G" />
      </filter>

      <filter id="displace-small">
        <feTurbulence type="turbulence" baseFrequency="4" numOctaves="2" result="turbulence" />
        <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>

      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="30" result="noisy" />
        <feColorMatrix type="saturate" values="0" />
        <feBlend in="SourceGraphic" in2="noisy" mode="multiply" />
      </filter>

      <radialGradient id="sphere" r="0.55" fx="0" fy="0.5">
        <stop offset="70%" stopColor="#000000" />
        <stop offset="90%" stopColor="#aaaaaa" />
        <stop offset="100%" stopColor="#000000" />
      </radialGradient>

      <radialGradient id="background" cx="0" cy="0.5" r="0.9">
        <stop offset="0%" stopColor="#729493" />
        <stop offset="80%" stopColor="#39575f" />
        <stop offset="100%" stopColor="#202639" />
      </radialGradient>

      <rect { ...background } />

      <g id="orbits" fill="transparent" stroke="#adebe9" strokeWidth="0.125" strokeDasharray="0.25 0.5" strokeLinecap="round">
        { props.orbits.map( ( o, oo ) => (
          <circle key={ oo } cx="0" cy="0" r={ o.distance } />
        ) ) }
        { props.belts.map( ( b, bb ) => (
          <g key={ bb }>
            { b.rings.map( ( r, rr ) => (
              <circle key={ rr } cx="0" cy="0" r={ r } />
            ) ) }
          </g>
        ) ) }
      </g>

      <g id="planet-definitions">
        { props.planets.map( ( p, pp ) => (
          <PlanetDef key={ pp } id={ 'planet-' + pp } { ...p } />
        ) ) }
      </g>

      <StarDef { ...props.star } />
    </defs>
	)
};

export default Defs;