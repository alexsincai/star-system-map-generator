import React from 'react';
import ReactDOM from 'react-dom';

import {
	saveSvgAsPng
} from 'save-svg-as-png';

import '../node_modules/normalize.css/normalize.css';
import './index.css';

import util from './helpers/util';
import build from './helpers/build';
import Editor from './components/editor';
import Defs from './components/defs';

class StarSystemMapGenerator extends React.Component {
	constructor() {
		super();

		let state = {
			editing: false,
			fibs: Array( 16 ).fill().map( ( _, i ) => util.fib( i ) ).sort( () => Math.random() > 0.5 ),
			settings: {
				radius: 50,
			}
		};

		this.state = build.start( state );

		this.edit = {
			refib: ( e ) => this.setState( build.refib( this.state ) ),
			radius: ( e ) => this.setState( build.radius( this.state, Number( e.target.value ) ) ),
			planetRadius: ( e ) => this.setState( build.planetRadius( this.state, Number( e.target.dataset.id ), Number( e.target.value ) ) ),
			showAs: ( e ) => this.setState( build.showAs( this.state, Number( e.target.dataset.id ), Number( e.target.value ) ) ),
			planetColor: ( e ) => this.setState( build.planetColor( this.state, Number( e.target.dataset.id ), e.target.value ) ),
			habitable: ( e ) => this.setState( build.habitable( this.state, Number( e.target.dataset.id ), Boolean( e.target.checked ) ) ),
			ring: ( e ) => this.setState( build.ring( this.state, Number( e.target.dataset.id ), Number( e.target.value ) ) ),
			randomize: ( e ) => this.setState( build.randomize( this.state ) )
		};

		this.save = ( e ) => {
			saveSvgAsPng( document.querySelector( 'svg' ), `star-system-${ Date.now() }.png`, {
				left: this.state.settings.viewBox[ 0 ],
				top: this.state.settings.viewBox[ 1 ],
				width: this.state.settings.viewBox[ 2 ],
				height: this.state.settings.viewBox[ 3 ],
				scale: 28,
				encoderOptions: 0.5,
			} );
		};
	}

	render() {
		let props = {
			svg: {
				xmlns: 'http://www.w3.org/2000/svg',
				version: 1.1,
				viewBox: this.state.settings.viewBox.join( ' ' ),
				style: {
					width: '100%',
					border: '1px solid'
				}
			},
			editor: {
				settings: this.state.settings,
				edit: this.edit,
				planets: this.state.system.planets,
				belts: this.state.system.belts
			},
			defs: {
				box: this.state.settings.viewBox,
				star: {
					radius: this.state.system.star.radius,
					color: this.state.system.star.color,
					texture: this.state.system.star.texture,
					rays: this.state.system.star.rays,
				},
				orbits: this.state.system.orbits.filter( o => o.show ),
				belts: this.state.system.belts.filter( o => o.show ),
				planets: this.state.system.planets.filter( p => p.show ).sort( ( a, b ) => a.radius - b.radius ).map( p => {
					return {
						radius: p.radius,
						color: p.color,
						texture: p.texture,
						distance: p.distance,
						angle: p.angle,
						small: p.small,
						ring: p.ring
					};
				} )
			}
		};

		return (
			<div className="container">
			  <nav>
			    <button onClick={ ( e ) => this.setState({ editing: !this.state.editing }) }>Edit</button>
          <button onClick={ this.edit.randomize }>Randomize system</button>
			    <button onClick={ this.save }>Save</button>
			  </nav>
			  { this.state.editing && (
			    <Editor { ...props.editor } />
			  ) }
			  <main>
			    <svg { ...props.svg }>
			      <Defs { ...props.defs } />
			      <g filter="url(#noise)">
			        <use href="#background-definition" />
			        <use href="#orbits" />
			        <use href="#star-definition" />
			        <use href="#planet-definitions" />
			      </g>
			    </svg>
			  </main>
			</div>
		);
	}
}

ReactDOM.render( <StarSystemMapGenerator />, document.getElementById( 'root' ) );