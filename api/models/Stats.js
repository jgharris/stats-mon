/**
* Stats.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	  procs: {
		  r: {
			  
		  },
		  b: {
			  
		  },
	  },
	  memory: {
		  
	  },
	  cpu: {
		  cs: {
			  type: 'integer'
		  },
		  us: {
			  type: 'integer'
		  },
		  sy: {
			  type: 'integer'
		  },
		  id: {
			  type: 'integer'
		  },
		  wa: {
			  type: 'integer'
		  },
		  wt: {
			  type: 'integer'
		  },
	  }
  }
};

