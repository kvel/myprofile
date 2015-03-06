'use strict';

/* Controllers */
app.controller('CreateViewCtrl', function ($scope, ContentService) {
    $scope.saveContent= function(){
        $scope.cv.uri = ("public/views/articles/"+$scope.cv.title+".html").replace(new RegExp(' ', 'g'), '-').toLowerCase();
        ContentService.addArticle($scope.cv).then(function(data) {
                $scope.cv = {};
                $scope.articles = data;
                console.log(data);
            },function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.saveKeyword = function(){
        ContentService.addKeyword($scope.kw).then(function(data){
            $scope.kw={};
            $scope.keywords=data;
        }, function(data){
            console.log('Error: ' + data);
        });
    };
    $scope.addCount = function(){
        ContentService.addCount();
        $scope.cnt=ContentService.getCount();
    }
});