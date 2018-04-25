import React from 'react';
import ReactDOM from 'react-dom';

import StarDef from './stardef';
import PlanetDef from './planetdef';

const makeState = ( props ) => {
	return {
		background: {
			id: 'background-definition',
			x: props.box[ 0 ],
			y: -50,
			width: props.box[ 2 ],
			height: 100,
			fill: 'url( #background )',
		},
		border: {
			id: 'border',
			x: props.box[ 0 ] + 1,
			y: props.box[ 1 ] + 1,
			width: props.box[ 2 ] - 2,
			height: props.box[ 3 ] - 2,
			fill: 'transparent',
			stroke: '#adebe9',
			strokeWidth: 0.25
		},
		star: props.star,
		planets: props.planets,
		belts: props.belts,
		orbits: props.orbits,
		name: props.name,
		bottom: [
			props.box[ 0 ] + props.box[ 2 ] - 2,
			props.box[ 1 ] + props.box[ 3 ] - 2,
		]
	};
};

class Defs extends React.Component {
	constructor( props ) {
		super( props );
		this.state = makeState( props );

		this.updateLabels = () => {
			let element = ReactDOM.findDOMNode( this ).querySelector( '#label' );
			const box = element.getBBox();
			const x = box.width;
			const y = box.height;

			element.setAttribute( 'transform', `translate(${ this.state.bottom[ 0 ] - x } ${ this.state.bottom[ 1 ] - y })` );
		};
	}

	componentWillReceiveProps( props ) {
		this.setState( makeState( props ) );
	}

	render() {
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

        <rect { ...this.state.background } />

        <rect { ...this.state.border } />

        <g id="orbits" fill="transparent" stroke="#b3cccb" strokeWidth="0.125" strokeDasharray="0.25 0.5" strokeLinecap="round">
          { this.state.orbits.map( ( o, oo ) => (
            <circle key={ oo } cx="0" cy="0" r={ o.distance } />
          ) ) }
          { this.state.belts.map( ( b, bb ) => (
            <g key={ bb }>
              { b.rings.map( ( r, rr ) => (
                <circle key={ rr } cx="0" cy="0" r={ r } />
              ) ) }
            </g>
          ) ) }
        </g>

        <g id="planet-definitions">
          { this.state.planets.map( ( p, pp ) => (
            <PlanetDef key={ pp } id={ 'planet-' + pp } { ...p } />
          ) ) }
        </g>

        <StarDef { ...this.state.star } />

        <g id="label" fontFamily="sans-serif" fontSize="1" fill="#adebe9">
          <text x="0" y="0" data-order="0" fontSize="1.5" fontWeight="bold">{ this.state.name.system }</text>
          { this.state.name.orbits.map( ( o, oo ) => (
            <text key={ oo } data-order={ oo + 1 } x="0" y={ ( oo + 1 ) * 1.5 }>{ o }</text>
          ) ) }
        </g>
      </defs>
		);
	}

	componentDidMount() {
		this.updateLabels();
	}

	componentDidUpdate() {
		this.updateLabels();
	}
}

export default Defs;