$(document).ready(function(){

  $('button').click(function(){
    init();
  });


  $('input:text').keydown(function(){
    if (event.which == 13 || event.keyCode == 13){
      init();
    }
  });


});

function init(){
  var queryInput = $('input:text').val();
  reset();
  var url1 = 'https://api.themoviedb.org/3/search/movie';
  var url2 = 'https://api.themoviedb.org/3/search/tv';

  chiamata(queryInput,url1,'Film');
  chiamata(queryInput,url2,'Tv');
}

function reset(){
  $('.container-film').empty();
  $('.container-tv').empty();
  $('input:text').val('');
}

function chiamata(data,url,type){
  $.ajax(
    {
      url: url,
      method: 'GET',
      data:
      {
        api_key: 'c830462730db14d8b93291f626fbdf9e',
        query: data,
        language: 'it-IT'
      },
      success: function(risposta){
        if(risposta.total_results > 0){
          printResult(risposta.results,type);

        } else {
          noResult(type);
        }

      },
      error: function(){
        alert('Errore');
      }
    }
  );
}


function printResult(data,type){
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < data.length; i++){

    if(type == 'Film'){
      var title = data[i].title;
      var original_title = data[i].original_title;
    } else if (type == 'Tv'){
      var title = data[i].name;
      var original_title = data[i].original_name;
    }

    var context = {
      tipo: type,
      titolo: title,
      original_title: original_title,
      original_language: flag(data[i].original_language),
      vote_average: stars(data[i].vote_average),
      poster: insertPoster(data[i].poster_path,title),
      overview: data[i].overview.substring(0,200)+' [...]'

    };
    var html = template(context);
    if(type == 'Film'){
      $('.container-film').append(html);
    } else {
      $('.container-tv').append(html);
    }

  }
}

function insertPoster(poster,titolo){
  var urlBase = 'https://image.tmdb.org/t/p/w185';
  var percorso = urlBase + poster;
  poster_image = '<img src="'+percorso+'" class="poster" alt="'+titolo+'">';
  if (poster == null){
    poster_image = '<img src="img/default-poster.png" class="poster" alt="'+titolo+'">';
  }

  return poster_image;
}

function flag (lingua){
  var language = ['en', 'it'];
  if (language.includes(lingua)){
    return '<img src="img/'+lingua+'.svg" class="flag">';
  }
  return lingua;
}

function stars(num){
  var resto = num % 2;
  num = Math.floor(num/2);
  var star = '';
  for (var i = 0; i < 5; i++){
    if (i < num){
      star += '<i class="fas fa-star"></i>';
    } else if (resto != 0) {
       star += '<i class="fas fa-star-half-alt"></i>';
       resto = 0;
    } else {
      star += '<i class="far fa-star"></i>';
    }
  }
  return star;
}

function noResult(type){
  var source = $("#no-result-template").html();
  var template = Handlebars.compile(source);
  var context = {
    noResult: 'Non ci sono risultati nella sezione: ' + type
  };
  var html = template(context);
  if (type == 'Film'){
    $('.container-film').append(html);
  } else if (type == 'Tv'){
    $('.container-tv').append(html);
  }

}
