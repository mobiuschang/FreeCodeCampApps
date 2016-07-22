var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "eulcs1", "eleaguetv", "a_seagull"];

$(document).ready(function(){

 	function getChannelInfo (channelName) {

 			var viewClass; // Flag used to display channels that's closed or off
 			var game, status, logo, displayName, channelUrl;
			var twitchAPIUrl = "https://api.twitch.tv/kraken/streams/" + channelName

 			$.ajax({
				method: "GET",
				url: twitchAPIUrl,
				dataType: "jsonp"
			}).done(function(data){
				var stream = data.stream;

				if (stream === undefined) {
					game = "Account Closed";
					status = "offline"
					logo = "http://www.qspectrum.com/wp-content/uploads/2015/08/dummy-profile-pic-male.jpg";
					displayName = channelName;
					viewClass = "AcctClosed"
				} else if (stream === null) {
					game = "Offline"
					status = "offline"
					logo = "http://www.qspectrum.com/wp-content/uploads/2015/08/dummy-profile-pic-male.jpg";
					displayName = channelName;
					viewClass = "AcctOffline"
				} else {
					game = stream.game;
					status = stream.channel.status.split(" ").splice(0, 5).join(" ") + " ...";
					logo = stream.channel.logo;
					displayName = stream.channel.display_name;
					channelUrl = stream.channel.url;
					viewClass = "AcctOnline";
				}
 	
				if (stream) {
					
					$(".channelsList").prepend("<div class = " + viewClass + "><img src = " + logo + " class = 'img-circle'> <a href =" + channelUrl + " target = _blank >" + displayName + "</a> <span id = 'game'>" + game + ": <span id = 'status'>" + status + "</span></span></div>");
				
				} else {

					$(".channelsList").append("<div class = " + viewClass + "><img align = 'top' src = " + logo + " class = 'img-circle'> <a href =" + channelUrl + " target = _blank >" + displayName + "</a> <span id = 'game'>" + game + "</span></div>");
				
				}
	
			}).fail(function(jqXHR, textStatus, error) {
				console.log("Twitch Ajax Call Error" + error);
			})

 	};

 	channels.forEach(function(channel) {
 		getChannelInfo(channel);
 	});

 	$(".channelMenu").on("click", function(){
 		var channelStatus = $(this).attr("id");
 		if (channelStatus === "allChannels") {
	      $(".AcctClosed, .AcctOffline, .AcctOnline").removeClass("hidden");

	    } else if (channelStatus === "onChannels") {
	    	$(".AcctClosed, .AcctOffline").addClass("hidden");
	    	$(".AcctOnline").removeClass("hidden");
	    } else {
	    	$(".AcctOnline").addClass("hidden");
	    	$(".AcctClosed, .AcctOffline").removeClass("hidden");
	    }
 	});



})