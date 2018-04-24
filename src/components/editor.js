import React from 'react';

const Editor = ( props ) => {

	const options = props.planets.map( ( p, pp ) => {
		if ( props.planets[ pp ].show && !props.belts[ pp ].show ) return 0;
		if ( !props.planets[ pp ].show && props.belts[ pp ].show ) return 1;
		return 2;
	} );

	return (
		<aside>
      <div>
        <label>
          <button onClick={ props.edit.refib }>Rebuild Textures</button>
        </label>
      </div>
      <div>
        <label>
          <span>Radius { props.settings.radius }</span>
          <input type="range" min="0" max="100" defaultValue={ props.settings.radius } onChange={ props.edit.radius }/>
        </label>
      </div>
      { props.planets.map( ( p, pp ) => (
        <div key={ pp }>
          <label>
            <span>Planet { pp + 1 } shown as:</span>
            <select onChange={ props.edit.showAs } data-id={ pp } value={ options[ pp ] }>
              <option value="0">Planet</option>
              <option value="1">Belt</option>
              <option value="2">None</option>
            </select>
          </label>
          <label>
            <span>Planet { pp + 1 } radius: { p.radius }</span>
            <input type="range" min="2" max="9" step="0.001" defaultValue={ p.radius } data-id={ pp } onChange={ props.edit.planetRadius }/>
          </label>
          <label>
            <span>Planet { pp + 1 } habitable: { p.habitable ? 'Yes' : 'No' }</span>
            <input type="checkbox" checked={ p.habitable } data-id={ pp } onChange={ props.edit.habitable }/>
          </label>
          <label>
            <span>Planet { pp + 1 } color:</span>
            <input type="color" value={ p.color } data-id={ pp } onChange={ props.edit.planetColor }/>
          </label>
          { !p.small && (
            <label>
              <span>Planet { pp + 1 } ring: { p.ring.width }%</span>
              <input type="range" min="0" max="100" data-id={ pp } defaultValue={ p.ring.width } onChange={ props.edit.ring }/>
            </label>
          ) }
        </div>
      ) ) }
    </aside>
	);
};

export default Editor;