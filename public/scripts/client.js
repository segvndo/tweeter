/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // Function to create a tweet element
  const createTweetElement = function(tweet) {
    const $tweet = $(`
    <article class="insideTweetbox"> 
    <div style="display: flex; align-items: center; justify-content: space-between;">
    <div class="clientName">
      <img class="useravatar" src="https://i.imgur.com/73hZDYK.png">
      <span>${tweet.user.name}</span>
    </div>
    <div class="handle">
      ${tweet.user.handle}
    </div>
    </div>
    <span class="actual-tweet">
      ${escape(tweet.content.text)} 
    </span>
    <div class="footer-border"></div>
    <footer>
      <span>
        ${timeago.format(tweet.created_at)}
      </span>
      <div>
        <span class="heart">
          <i class="fa-solid fa-heart"></i>
        </span>
        <span class="retweet">
          <i class="fa-solid fa-retweet"></i>
        </span>
        <span class="flag">
          <i class="fa-solid fa-flag"></i>
        </span>
      </div>
    </footer>
</article>
    `);
    console.log($tweet)

    return $tweet;
  };

  // Function to render multiple tweets
  const renderTweets = function(tweets) {
    const $tweetboxContainer = $('.tweetboxContainer');
    $tweetboxContainer.empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetboxContainer.prepend($tweet);
    }
  };
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": "May 24, 2023 12:34 PM" 
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": "May 24, 2023 12:30 PM" 
    }
  ];

  const $errorContainer = $("#errorContainer");
  // $errorContainer.hide();

  // Function to validate length of tweet and return appropriate error message
  const validation = function(tweet) {
    if (!tweet) {
      const errorMessage = "Error: Must compose a tweet";
      $errorContainer.text(errorMessage);
      $errorContainer.slideDown();
      return false;
    }
   
    if (tweet.length > 140) {
      const errorMessage = "Error: Character exceeded";
      $errorContainer.text(errorMessage);
      $errorContainer.slideDown();
      return false;
    }
    return true;
  };

  renderTweets(data);
  
  $('form').submit(function(event) {
    event.preventDefault();
    $errorContainer.text();
    $errorContainer.slideUp();
    
    const formData = $(this).serializeArray();


    if (validation(formData[0].value)) {
      $.post('/tweets', formData)
      .then(function(response) {
        console.log(response);
        loadTweets();
        $(".counter").text(140);
      })
      .catch(function(error) {
        console.log(error);
      });
    }
    //Optional code below for personal use if text box is desired to be empty post-error message
    // $(this).trigger("reset");
  });


  const loadTweets = function() {
    $.getJSON("/tweets")
      .then(function(data) {
        console.log(data);
        renderTweets(data);
      });
  };
  
  loadTweets();
});


//Function that converts unsafe characters into safe encoded representation
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


//Same as line 22
// const safeHTML = `<p>${escape(textFromUser)}</p>`;
