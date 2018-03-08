$(document).ready(function() {

var topics = [];


 	function displayThronesCharacter() {

	var x = $(this).data("search");
	console.log(x);

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=oU9i3gzLrODH7mO8CGsHuILJ7tvJx8cc";

	console.log(queryURL);

	$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	var results = response.data;
        	console.log(results);
        	for (var i = 0; i < results.length; i++) {
        	
        	var characterDiv = $("<div class='col-md-4'>");

        	var rating = results[i].rating;
        	var defaultAnimatedSrc = results[i].images.fixed_height.url;
        	var staticSrc = results[i].images.fixed_height_still.url;
        	var characterImage = $("<img>");
        	var p = $("<p>").text("Rating: " + rating);

        	characterImage.attr("src", staticSrc);
        	characterImage.addClass("characterGiphy");
        	characterImage.attr("data-state", "still");
        	characterImage.attr("data-still", staticSrc);
        	characterImage.attr("data-animate", defaultAnimatedSrc);
        	characterDiv.append(p);
        	characterDiv.append(characterImage);
        	$("#gifArea").prepend(characterDiv);

        }
	});
}

	$("#addcharacter").on("click", function(event) {
        event.preventDefault();
        var newCharacter = $("#characterInput").val().trim();
        topics.push(newCharacter);
        console.log(topics);
        $("#characterInput").val('');
        displayButtons();
      });

	function displayButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $('<button class="btn btn-primary">');
      a.attr("id", "character");
      a.attr("data-search", topics[i]);
      a.text(topics[i]);
      $("#myButtons").append(a);
    }
  }

  displayButtons();

  $(document).on("click", "#character", displayThronesCharacter);


  $(document).on("click", ".characterGiphy", pausePlayGifs);

  function pausePlayGifs() {
  	 var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}

});