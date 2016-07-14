var wikiApi = "https://en.wikipedia.org/w/api.php?action=opensearch&search=";
var wikiApiEndUrl = "&format=json&callback=?"

$(document).ready(function(){
	
	
	var getWikiResult = function (keyWord) {

		var fullUrl = wikiApi + keyWord+ wikiApiEndUrl;

		$.ajax({
	    method: "GET",
	    url: fullUrl,
	    async: false,
	    dataType: "jsonp"
		}).done(function(response){
			$(".searchResults").html(" ");
  			for (var i = 0 ; i < response[1].length; i++) {
  			$(".searchResults").append("<div class = 'search-list'<h4 class = 'searchHeading'><a href ='" + response[3][i] +"'>" + response[1][i] + "</a></h4><p>" + response[2][i] + "</p></div> <hr />" );
  			}
   		
		})
	};


	$(".goButton").on("click", function(){
		var searchTerm = $("#searchInput").val();
		getWikiResult(searchTerm);
	})

	$(document).keypress(function(e){
		if (e.which == 13) {
			var searchTerm = $("#searchInput").val();
			getWikiResult(searchTerm);
		}
	});
 	
})