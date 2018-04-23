import React from 'react';

const Orbit = ( props ) => {

	if ( props.rings )
		return (
			<g id={ props.id }>
        { props.rings.map( ( r, rr ) => (
          <circle key={ rr } cx="0" cy="0" r={ r } />
      ) ) }
    </g>
		);

	if ( props.distance )
		return (
			<circle id={ props.id } cx="0" cy="0" r={ props.distance } />
		);

	return null;
};

export default Orbit;