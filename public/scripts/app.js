/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(obj){
  const avatar = obj.user.avatars.small;
  const name = obj.user.name;
  const handle = obj.user.handle;
  const content = obj.content.text;
  const created_at = obj.created_at;
  
  let $tweet = $('<article>').addClass("tweets");
  
  // Header
  let header = $("<header>");
  let img = `<img src=${avatar} alt = 'image'>`;
  let strong = `<strong id='name'> ${name} </strong>`;
  let span = `<span id = 'handle'> ${handle} </span>`;
  header.append(img).append(strong).append(span);
  $tweet.append(header);
  
  // Message
  let message = $('<div>').addClass('tweet-message').text(`${content}`);
  $tweet.append(message);
  
  // Footer
  let footer = $("<footer>");
  let day = Math.floor((Date.now() - created_at) / 86400000);
  let date = `<span> ${day} days ago </span>`; 
  let iconHtml = `<span class='icon'>  
                    <i class='fab fa-font-awesome-flag'></i> 
                    <i class='fas fa-retweet'></i>
                    <i class='fas fa-heart'></i> 
                  </span>`;
  let icons = $('<span>').addClass('icon').html(iconHtml);
  footer.append(date).append(icons);
  $tweet.append(footer);
  
  return $tweet;
};

function renderTweets(tweets) {
  tweets.forEach(function(tweet){
    var $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  });
}

function submitForm(){
  $("form").on('submit',function(){
    event.preventDefault();
    let isValid = validateForm();
    if(isValid === true){
      console.log("form submmitted");
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $("form").serialize(),
        success: function(response){
          console.log('form submission success');
        },
        error: function(){
          console.log("form submission fail");
        }
      })
    } else {
      console.log("form invalid and not submitted");
    }
    
  })
}

function loadTweets(){
$.ajax({
  type:'GET',
  url: '/tweets',
}).then(function(json){
  console.log("fetch success", json);
  renderTweets(json);
  })
};

function validateForm(){
    const str = $('textarea').val();
    const length = str.length;
    if( str === "" || length === 0){
      alert("empty string");
      return false;
    } else if( length > 140){
      alert("characters over 140");
      return false;
    } else {
      return true;
    }
}

// $(function() {
// function addAllEvents(){
loadTweets();
submitForm();

// };


// document.addEventListener("DOMContentLoaded", function(event){
    // addAllEvents();
// });
