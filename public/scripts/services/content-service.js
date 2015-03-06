app.factory( 'ContentService', function( $http ){

    function getArticles(){
        return $http({
            method: 'GET',
            url: '/api/contents'
        });
    }

    function deleteArticle( artID ){
        return $http({
            method: 'DELETE',
            url: '/api/contents/' + artID
        });
    }
    
    function addArticle( art ){
        return $http({
            method: 'POST',
            url: '/api/contents',
            data: art
        });
    }
    
    function addKeyword(key){
        return $http({
            method: 'POST',
            url: '/api/keywords',
            data:key
        });
    }
    
    function getKeywords(key){
        return $http({
            method: 'GET',
            url: '/api/keywords'
        });
    }
    
     function deleteKey( keyID ){
        return $http({
            method: 'DELETE',
            url: '/api/keywords/' + keyID
        });
    }

    return {
        getArticles: getArticles,
        deleteArticle: deleteArticle,
        addArticle: addArticle,
        addKeyword:addKeyword,
        getKeywords: getKeywords,
        deleteKey:deleteKey
    };

});
