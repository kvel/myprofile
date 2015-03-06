var mongoose = require('mongoose');

module.exports = mongoose.model('article', {
	title : {type : String, default: ''},
    uri : {type : String, default: ''},
    status : {type : String, default:'inactive'},
    keyword : {type : String, default: ''}    
});