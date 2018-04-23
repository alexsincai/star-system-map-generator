import React from 'react';

import StarDef from './stardef';
import PlanetDef from './planetdef';
import Orbit from './orbit';
import MoonOrbit from './moonorbit';

const Defs = ( props ) => {
	const background = {
		x: props.box[ 0 ],
		width: props.box[ 2 ],
		y: -50,
		height: 100,
		fill: 'url(#background)',
		id: 'background-definition'
	};

	const moons = props.planets && props.planets.filter( p => p.moons ).map( ( p, i ) => {
		if ( !p.moons ) return null;
		return p.moons.map( m => {
			return {
				parent: i,
				angle: p.angle,
				distance: p.distance,
				width: m.distance,
				height: m.distance * 0.35
			}
		} );
	} ).reduce( ( a, v ) => a.concat( v ), [] ).map( ( o, i ) => {
		o.key = i;
		o.id = `moon-${ i }-orbit`;
		return o;
	} );

	const belts = props.belts.map( ( b, bb ) => {
		return {
			key: bb,
			id: `belt-${ bb }`,
			// radius: b.distance,
			rings: b.rings
		};
	} );

	return (
		<defs>
      <filter id="displace-large">
        <feTurbulence type="turbulence" baseFrequency="2" numOctaves="2" result="turbulence" />
        <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="displace-mid">
        <feTurbulence type="turbulence" baseFrequency="1" numOctaves="2" result="turbulence" />
        <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="2" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="displace-small">
        <feTurbulence type="turbulence" baseFrequency="4" numOctaves="2" result="turbulence" />
        <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>

      <filter id="blur">
        <feGaussianBlur in="SourceGraphic" stdDeviation=".5" />
      </filter>

      <radialGradient id="sphere" r="0.55" fx="0" fy="0.5">
        <stop offset="70%" stopColor="#000000" />
        <stop offset="90%" stopColor="#aaaaaa" />
        <stop offset="100%" stopColor="#000000" />
      </radialGradient>

      <radialGradient id="background" cx="0" cy="0.5" r="1">
        <stop offset="0%" stopColor="#729493" />
        <stop offset="80%" stopColor="#39575f" />
        <stop offset="100%" stopColor="#202639" />
      </radialGradient>

      <rect { ...background } />

      <StarDef { ...props.star } />

      { props.planets && (
        <g id="planet-definitions">
          { props.planets.map( ( p, pp ) => (
            <PlanetDef key={ pp } id={ pp } { ...p } />
          ) ) }
        </g>
      ) }

      <g id="orbits" fill="transparent" stroke="#202639" strokeWidth="0.125" strokeDasharray="0.25 0.5" strokeLinecap="round">
        { moons.map( m => (
          <MoonOrbit { ...m } type="back" />
        ) ) }
        { belts.filter(b => b.shown).map( b => (
          <Orbit { ...b } />
        ) ) }
        { props.orbits.filter(o => o.shown).map( ( o, oo ) => (
          <Orbit key={ oo } id={ `orbit-${ oo }` } { ...o } />
        ) ) }
      </g>

      <g id="moon-orbits-front" fill="transparent" stroke="#202639" strokeWidth="0.125" strokeDasharray="0.25 0.5" strokeLinecap="round">
        { moons.map( m => (
          <MoonOrbit { ...m } type="front" />
        ) ) }
      </g>

    </defs>
	)
};

export default Defs;