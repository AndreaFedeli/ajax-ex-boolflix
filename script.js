$(document).ready(function() {



  $('button').click(function() {
    var input = $('input:text').val();
    console.log(input);

    $.ajax({
      url: 'https://api.themoviedb.org/3/search/movie',
      method: 'GET',
      data: {
        api_key: 'c830462730db14d8b93291f626fbdf9e',
        query: 'input',
        language: 'it-IT',
      },
      success: function(data) {
        printMovie(data.results);

      },
      'error': function() {
        alert('Errore ');
      }
    });


    //funzione per l inserimento dei dati ricavati da API

    function printMovie(movie) {
      var source = $("#entry-template").html();
      var template = Handlebars.compile(source);
      for (var i = 0; i < movie.length; i++) {
        var thisMovie = movie;
        console.log(thisMovie);


        var context = {
          title: thisMovie.title,
          original_title: thisMovie.original_title,
          original_language: thisMovie.original_language,
          vote_average: thisMovie.vote_average
        };
        var html = template(context);
        $('.movie-container').append(html);
      }

    };
  });
});
