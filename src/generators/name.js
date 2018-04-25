const util = {
	rand: ( list ) => list[ Math.floor( Math.pow( Math.random(), 2 ) * list.length ) ],
	range: ( max, min = 0 ) => Math.floor( Math.random() * ( max - min ) ) + min,
	capitalize: ( word ) => word.slice( 0, 1 ).toUpperCase() + word.slice( 1 )
};

class Name {
	constructor() {
		this.phonemes = {
			C: 'ptkmnls',
			V: 'aeiou',
			S: 'sz',
			F: 'mn',
			L: 'rl'
		};
		this.structure = 'CVC? C?VC SVF? V?L?V';
		this.min = 5;
		this.max = 12;
	}

	set structure( structString ) {
		this._structure = structString.split( ' ' );
	}

	get structure() {
		return this._structure;
	}

	makeSyllable() {
		const struct = util.rand( this.structure ).toUpperCase().split( '' );
		let out = Array( struct.length );
		for ( let i = 0; i < struct.length; i++ ) {
			if ( struct[ i ] === '?' ) {
				if ( Math.random() < 0.5 ) out[ i - 1 ] = '';
			} else out[ i ] = util.rand( this.phonemes[ struct[ i ] ].split( '' ) );
		}
		return out.join( '' );
	}

	name() {
		let out = '';
		while ( out.length < util.range( this.max, this.min ) ) out += this.makeSyllable();
		return util.capitalize( out );
	}
}

export default Name;