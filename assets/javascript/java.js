// LKDMABUgB91SaF3RXEh444YuVwxSkKet  gipy api key

// https://api.giphy.com/v1/gifs/search?api_key=LKDMABUgB91SaF3RXEh444YuVwxSkKet&q=slayer&limit=10&offset=0&rating=R&lang=en

var topic = ["Holy Crap", "Well I'll Be Damned", "Eating Pizza", "I Need TP For My Bunghole", "Playing Guitar", "Do You Have Any Rubber Walrus Protectors", "Camping", "Fishing"];


$(document).ready(function(){

	


	var displayButtons = function(){
		
		$("#gButton").empty();
		
		for (var i = 0; i < topic.length; i++) {
			var button = $("<button>");
			button.addClass("bandButton img-rounded");
			button.attr("data-name", topic[i]);
			button.text(topic[i]);
			$("#gButton").append(button);
			
		}
	};

	var apiCall = function(){
		var name = $(this).attr("data-name");
		var api = "https://api.giphy.com/v1/gifs/search?api_key=LKDMABUgB91SaF3RXEh444YuVwxSkKet&q=" + name + "&limit=10&offset=0&lang=en"
		console.log(name);
		$("#sound").attr("src", "metal.wav");
		document.getElementById("sound").play();

		$.ajax({
			url: api,
			method: "GET"
		}).done(function(response){
			console.log(response.data[0]);
			$("#gDisplay").empty();
			for (var i = 0; i < response.data.length; i++) {
				var div = $("<div>")
				div.addClass("pull-left position");
				var img = $("<img>")
				img.attr("src", response.data[i].images.original_still.url);
				img.attr("data-still", response.data[i].images.original_still.url);
				img.attr("data-animate", response.data[i].images.original.url);
				img.attr("data-state", "still");
				img.addClass("gif img-thumbnail gifSize");
				div.prepend(img);
				var par = $("<p>").text("Rating: "  + response.data[i].rating);
				div.prepend(par);
				$("#gDisplay").prepend(div);

			}
		})

	};

	var animateGif = function(){
		console.log("working");
		var state = $(this).attr("data-state");
		var still = $(this).attr("data-still");
		var animate = $(this).attr("data-animate");
		var source = $(this).attr("src");
		
		if(state === "still"){
			console.log("still");
			source = $(this).attr("src", animate);
			state = $(this).attr("data-state", "animate");
			$("#sound").attr("src", "animate.wav");
		document.getElementById("sound").play();
	}else if(state === "animate"){
		console.log("animate");
		source = $(this).attr("src", still);
		state = $(this).attr("data-state", "still");
		$("#sound").attr("src", "zing.mp3");
		document.getElementById("sound").play();
	}
	
	}

	$("#submit").on("click", function(event){
		event.preventDefault();
		var submission = $("#addBand").val().trim();
		topic.push(submission);
		$("#sound").attr("src", "card.wav");
		document.getElementById("sound").play();
		displayButtons();

	})



	$(document).on("click", ".bandButton", apiCall);
	$(document).on("click", ".gif", animateGif);
	displayButtons();


});