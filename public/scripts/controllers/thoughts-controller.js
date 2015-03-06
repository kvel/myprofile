
'use strict';

/* Controllers */
app.controller('ThoughtsCtrl', function ($scope, ContentService) {
        $scope.create=false;
        ContentService.getArticles().then(function(data){
            $scope.articles=data.data;
        },function(data){});
    
        ContentService.getKeywords().then(function(data){
            $scope.keywords=data.data;
        }, function(data){});
    
        $scope.deleteKey = function(key){
             ContentService.deleteKey(key._id).then(function(data){
                $scope.keywords=data.data;
            },function(data){});
        };
    
        $scope.deleteArt = function(art){
             ContentService.deleteArticle(art._id).then(function(data){
                $scope.articles=data.data;
            },function(data){});
        };
        
        
	});