/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // Function to create a tweet element
  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <img src="${useravatar}" alt="User Avatar">
          <div class="header-content">
            <div>
              <h3 class="clientName">${clientName}</h3>
            </div>
            <div>
              <span class="handle">${handle}</span>
            </div>
          </div>
        </header>
        <div class="insideTweetbox">
          <p>${insideTweetbox}</p>
        </div>
        <footer>
          // <span class="tweet-timestamp">${tweet.created_at}</span>
          <div class="tweet-actions">
            <i class="far fa-comment"></i>
            <i class="fas fa-retweet"></i>
            <i class="far fa-heart"></i>
          </div>
        </footer>
      </article>
    `);

    return $tweet;
  };

  // Function to render multiple tweets
  const renderTweets = function(tweets) {
    const $tweetsContainer = $('#tweets-container');
    $tweetsContainer.empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.append($tweet);
    }
  };
  
  // Function to render multiple tweets
  const renderTweets = function(tweets) {
    const $insideTweetbox = $('.insideTweetbox');
    $insideTweetbox.empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $insideTweetbox.append($tweet);
    }
  };
  
  renderTweets(data);
  
  // Add event listener for form submit
  $('form').submit(function(event) {
    event.preventDefault();
  
    // Serialize the form data
    const formData = $(this).serialize();
  
    // Send the AJAX POST request
    $.post('/tweets', formData)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  });

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
      "created_at": "May 23, 2023 12:34 PM" 
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "text": "Je pense , donc je suis"
      },
      "created_at": "May 23, 2023 12:30 PM" 
    }
  ];
});