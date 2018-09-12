/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function renderTweets(tweets) {
  
  tweets.forEach(function(tweet){
    var $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  })
}

function createTweetElement(obj){
  const avatar = obj.user.avatars.small;
  const name = obj.user.name;
  const handle = obj.user.handle;
  const content = obj.content.text;
  const created_at = obj.created_at;
  
  let $tweet = $('<article>').addClass("tweets");
  
  // Header
  let $header = $("<header>");
  let $img = `<img src=${avatar} alt = 'image'>`;
  let $strong = "<strong id='name'>" + name + "</strong>";
  let $span = "<span id = 'handle'>" + handle + "</span>";
  $header.append($img + $strong + $span);
  $tweet.append($header);

  // Message
  let $message = "<div class='tweet-message'>" + content + "</div>";
  $tweet.append($message);
  
  // Footer
  let $footer = $("<footer>");
  let day = Math.floor((Date.now() - created_at) / 86400000);
  let $date = "<span>" + day + " days ago" + "</span>"; 
  let $icons =  "<span class='icon'>" + 
                "<i class='fab fa-font-awesome-flag'></i> " + 
                "<i class='fas fa-retweet'></i>" + 
                "<i class='fas fa-heart'></i>" + 
                "</span>";
  $footer.append($date + $icons);
  $tweet.append($footer);

  return $tweet;
};


// function addAllEvents(){

  renderTweets(data);

// };


// document.addEventListener("DOMContentLoaded", function(event){
//     addAllEvents();
// });
