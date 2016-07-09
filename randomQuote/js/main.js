
function getQuote() {

  $.ajax({
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies', 
    type: 'GET',  
    data: {}, 
    dataType: 'json',
    success: function(data) {
      $("blockquote").html("<p><span class = 'quote'>"+ data.quote + "</span></p><footer><span class = 'author'>" + data.author + "</span></footer>");
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

  getQuote();

});


