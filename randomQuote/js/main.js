
function getQuote(quoteGenre) {
  var urlAddress = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=" + quoteGenre;

  $.ajax({
    url: urlAddress, 
    type: 'GET',  
    data: {}, 
    dataType: 'json',
    success: function(data) {
      $("blockquote").html("<p><span class = 'quote'>"+ data.quote + "</span></p><footer class = 'author'><span >" + data.author + "</span></footer>");
      var twitterURL = "https://twitter.com/intent/tweet?text=" + data.quote + "  -" + data.author;
      $(".twitter-share-button").attr("href", twitterURL);

    },
    error: function(err) {
      alert(err);
    },
    beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "ICHVa91GDimshNL9REgppXI8ZW8fp17DbBajsnV7P508s20LS2"); // Mashape key
      }
    });
};

$(document).ready(function() {

  getQuote("famous");

  // Get new quote based on the new genre
  $("#quoteType").on("change", function(){
    var value = $(this).val();
    
    if (value === "famous"){
      getQuote("famous");
    } else {
      getQuote("movies");
    }

   });

  // Get new quote of the same genre
  $("#newQuote").on ("click", function(){
    var value = $(this).val();
    getQuote(value);
  })

});


