import React from 'react';
import ReactDOM from 'react-dom';

import '../node_modules/normalize.css/normalize.css';
import './index.css';

import build from './helpers/build';
import Editor from './components/editor';
import Defs from './components/defs';

class StarSystemMapGenerator extends React.Component {
	constructor() {
		super();

		let state = {
			editing: true,
			settings: {
				radius: 50,
				spread: 8
			}
		};

		this.state = build.start( state );

		this.edit = {
			radius: ( e ) => this.setState( build.radius( this.state, Number( e.target.value ) ) ),
			spread: ( e ) => this.setState( build.spread( this.state, Number( e.target.value ) ) ),
			planetRadius: ( e ) => this.setState( build.planetRadius( this.state, Number( e.target.dataset.id ), Number( e.target.value ) ) ),
		}
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
			defs: {
				box: this.state.settings.viewBox,
			}
		};
		Object.assign( props.defs, this.state.system.display() );
		props.defs.planets.sort( ( a, b ) => a.radius - b.radius );


		return (
			<div className="container">
        <nav>
          <button onClick={ ( e ) => this.setState({ editing: !this.state.editing }) }>Edit</button>
        </nav>
        { this.state.editing && (
          <Editor settings={ this.state.settings } edit={ this.edit } planets={this.state.system.planets } />
        ) }
        <main>
          <svg { ...props.svg }>
            <Defs { ...props.defs } />

            <use href="#background-definition" />
            <use href="#star-definition" />
            <use href="#orbits" />
            <use href="#planet-definitions" />
            <use href="#moon-orbits-front" />
          </svg>
        </main>
      </div>
		)
	};
};

ReactDOM.render( <StarSystemMapGenerator />, document.getElementById( 'root' ) );