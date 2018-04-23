import React from 'react';
import build from '../helpers/build';

const Editor = ( props ) => {

	return (
		<aside>
      <div>
        <label>
          <span>Radius { props.settings.radius }</span>
          <input type="range" min="0" max="100" defaultValue={ props.settings.radius } onChange={ props.edit.radius }/>
        </label>
        <label>
          <span>Spread { props.settings.spread }</span>
          <input type="range" min="0" max="20" defaultValue={ props.settings.spread } onChange={ props.edit.spread }/>
        </label>
      </div>
      { props.planets.map( ( p, pp ) => (
        <div key={ pp }>
          <label>
            <span>Planet { pp } radius: { p.radius }</span>
            <input type="range" min="2" max="9" ste="0.001" defaultValue={ p.radius } data-id={ pp } onChange={ props.edit.planetRadius }/>
          </label>
        </div>
      ) ) }
    </aside>
	);
};

export default Editor;