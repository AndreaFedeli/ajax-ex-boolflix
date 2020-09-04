$(document).ready(function(){

  $('button').click(function(){
    var queryInput = $('input:text').val();
    reset();
    insertFilm(queryInput);
    insertTv(queryInput);
  });


});



function insertFilm(data){
  $.ajax(
    {
      url: 'https://api.themoviedb.org/3/search/movie',
      method: 'GET',
      data:
      {
        api_key: '2c42a4436c6db0bbb4e23ee64ca1bc93',
        query: data,
        language: 'it-IT'
      },
      success: function(risposta){
        if(risposta.total_results > 0){
          printResult(risposta.results,'Film');

        } else {
          noResult('Film');
        }

      },
      error: function(){
        alert('Errore');
      }
    }
  );
}


function insertTv(data){
  $.ajax(
    {
      url: 'https://api.themoviedb.org/3/search/tv',
      method: 'GET',
      data:
      {
        api_key: '2c42a4436c6db0bbb4e23ee64ca1bc93',
        query: data,
        language: 'it-IT'
      },
      success: function(risposta){
        if(risposta.total_results > 0){
          printResult(risposta.results,'Tv');

        } else {
          noResult('Tv');
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
      vote_average: stars(data[i].vote_average)
    };
    var html = template(context);
    if(type == 'Film'){
      $('.container-film').append(html);
    } else {
      $('.container-tv').append(html);
    }

  }
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

function reset(){
  $('.container-film').empty();
  $('.container-tv').empty();
  $('input:text').val('');
}
