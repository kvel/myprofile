var mongoose = require('mongoose');

module.exports = mongoose.model('keywords', {
	keyword : {type : String, default: ''},
    icon: {type : String, default: 'flag'}
});