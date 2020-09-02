$(document).ready(function(){



$('button').click(function(){
  var input= $('input:text').val();
  console.log(input);

  $.ajax(
    { url: 'https://api.themoviedb.org/3/search/movie',
      method : 'GET',
      data : {
        api_key: 'c830462730db14d8b93291f626fbdf9e',
        query: 'input',
        language: 'it-IT',
      },
      success : function(data) {
      printMovie(data.results);

    },
    'error': function() {
     alert('Errore ');
    }
});


//funzione per l inserimento dei dati ricavati da API

    function printMovie(movie){
      for (var i = 0; i <movie.length; i++) {
      var thisMovie= movie.results;
      console.log(movie[i]);
      }


    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    var context = {
            title: thisMovie[i].title,
            original_title: thisMovie[i].original_title,
            original_language: thisMovie[i].original_language,
            vote_average: thisMovie[i].vote_average
        };
        var html = template(context);
        $('.movie-container').append(html);
      }




});


});
