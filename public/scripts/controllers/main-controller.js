
'use strict';

/* Controllers */
app.controller('MainCtrl', function ($scope, ContentService) {
        $scope.tab="thoughts";
        ContentService.getArticles().then(function(data){
            $scope.articles=data;
        },function(data){})
        $scope.setTab = function (tab){
            $scope.tab=tab;
        };
        $scope.addCount = function(){
            ContentService.addCount();
            $scope.cnt=ContentService.getCount();
        }
	});