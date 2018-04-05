$(document).ready(function () {
    console.log("GifTastic!");

    // Initial array of strings.
    var topics = ["Kobe Bryant", "Michael Jordan", "Steph Curry", "LeBron James", "Wilt Chamberlain", "Kareem Abdul Jabbar", "Jerry West", "Allen Iverson", "Kevin Garnett", "Dwyane Wade", "Tim Duncan", "Vince Carter", "Russell Westbrook", "James Harden", "Kevin Durant", "Magic Johnson", "Larry Bird", "Shaquille O'Neal", "Dirk Nowitzki", "Chris Paul"];
    topics.sort();
    console.log(topics);
    var topic = "";

    function displayTopicInfo() {

        var x = $(this).data("search")
        console.log("button clicked")

        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=pfnS3FwNzNigBlgTyp4oju0YHSdUzpL0&limit=10";

        // Display gifs topic information.
        console.log(queryURL);
        $.ajax({ url: queryURL, methd: "GET" })
            .done(function (response) {
                $("#topicsView").empty();
                for (var i = 0; i < response.data.length; i++) {

                    if (response.data[i].rating !== "r" && response.data[i].rating !== "pg-13") {
                        var gifViewDiv = $("<div class ='gifHere'>");
                        $(gifViewDiv).html("");
                        var p = $("<p>").text("Rating: " + response.data[i].rating)
                        var topicImage = $("<img>");
                        topicImage.addClass("gif");
                        topicImage.attr("src", response.data[i].images.fixed_height_still.url);
                        topicImage.attr("data-state", "still")
                        topicImage.attr("data-still", response.data[i].images.fixed_height_still.url);
                        topicImage.attr("data-animate", response.data[i].images.fixed_height.url);
                        gifViewDiv.append(p);
                        gifViewDiv.append(topicImage);
                        $("#topicsView").append(gifViewDiv);

                    }

                }
                console.log(response);

            });

    }
    // Display buttons 

    function renderButtons() {
        $("#buttons-view").empty();

        for (i = 0; i < topics.length; i++) {

            var a = $("<button>");
            a.addClass("topic-btn");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttons-view").append(a);
        }

    }
    $("#add-topic").on("click", function (event) {

        event.preventDefault();
        var topic = $("#topics-input").val().trim();
        $("#topics-input").val("");
        topics.push(topic);
        renderButtons();

    });

    $(document).on("click", ".topic-btn", displayTopicInfo);

    renderButtons();


    // Make the image unfreeze when clicked and freeze when clicked again.

    $(document).on("click", ".gif", function () {

        var state = $(this).attr("data-state")

        console.log(state);
        if (state === "still") {

            // Change the src attribute and the data attribute.
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        } else {

            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }


    });
});