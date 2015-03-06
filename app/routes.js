var article = require('./models/article');
var keyword =  require('./models/keywords');
var fs = require('fs');

function getArticles(res){
	article.find(function(err, articles) {
			if (err)
				res.send(err)
			res.json(articles);
		});
};

function loadArticle(req, res, next) {
  if (req.params.art_id) {
    article.findOne({ _id: req.params.art_id }, function(err, article) {
      if (err) {
        return next(new Error("Couldn't find user: " + err));
      }
      req.article = article;
      next();
    });
  } else {
    next();
  }
}

function loadKeywords(req, res){
    keyword.find(function(err, keywords) {
			if (err)
				res.send(err)
			res.json(keywords);
		});
}

module.exports = function(app) {
    //Articles CRUD
    app.get('/api/contents/:art_id', function (req, res) {
        if (req.params.art_id) {
            article.find({ _id: req.params.art_id }, function (err, art) {
                res.json(art);
            });
        }
    });
    
    app.get('/api/contents', function(req, res) {
		getArticles(res);
	});
    
    app.post('/api/contents', function(req, res) {
        fs.writeFile(req.body.uri, req.body.content, function (err) {
            if (err) throw err;
            console.log('It\'s saved! in'+req.body.uri);
        });
		article.create({
			title : req.body.title,
            uri : req.body.uri,
            keyword: req.body.keyword,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);
			getArticles(res);
		});

	});
    
    app.delete('/api/contents/:art_id',loadArticle, function(req, res) {                
		article.remove({
			_id : req.params.art_id
		}, function(err, todo) {
			if (err)
				res.send(err);            
            if(req.article && req.article.uri)
                fs.unlink(req.article.uri);
			getArticles(res);
		});
	});
    
    //Keywords CRUD
    app.get('/api/keywords', function(req, res) {
		loadKeywords(req,res);
	});
    
    app.post('/api/keywords', function(req, res) {
		keyword.create({
			keyword : req.body.keyword,
            color : req.body.color
		}, function(err, todo) {
			if (err)
				res.send(err);
			loadKeywords(req,res);
		});

	});
    app.delete('/api/keywords/:key_id', function(req, res) {                
		keyword.remove({
			_id : req.params.key_id
		}, function(err, todo) {
			if (err)
				res.send(err);  
			loadKeywords(req,res);
		});
	});
    
    
	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};