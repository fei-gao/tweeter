/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(obj){
  const $tweet = $('<article>').addClass("tweets");
  
  // Header
  let $header = $("<header>");
  let $img = `<img src=${obj.user.avatars.small} alt = 'image'>`;
  let $name = `<strong id='name'> ${obj.user.name} </strong>`;
  let $handle = `<span id = 'handle'> ${obj.user.handle} </span>`;
  $header.append($img).append($name).append($handle);
  $tweet.append($header);
  
  // Message
  let $message = $('<div>').addClass('tweet-message').text(`${obj.content.text}`);
  $tweet.append($message);
  
  // Footer
  let $footer = $("<footer>");
  let day = Math.floor((Date.now() - `${obj.created_at}`) / (24 * 60 * 60 *1000));
  let $date = `<span> ${day} days ago </span>`; 
  let icon = `<i class='fab fa-font-awesome-flag'></i> 
                <i class='fas fa-retweet'></i>
                <i class='fas fa-heart'></i>`;
  let $icons = $('<span>').addClass('icon').html(icon);
  $footer.append($date).append($icons);
  $tweet.append($footer);
  
  return $tweet;
};

// render newly-created and existing tweets
function renderTweets(tweets) {
  tweets.forEach(function(tweet){
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  });
}

function validateForm(){
  const str = $('textarea').val();
  const length = str.length;
  if( str === ""){
    return "Content cannot be empty.";
  } else if( length > 140){
    return "Max 140 characters.";
  } else {
    return true;
  }
}

// validate form, POST and clear the textarea
function submitForm(){
  $("form").on('submit',function(){
    event.preventDefault();
    $('#error').slideUp();
    $('#error').empty();
    $('.counter').text('140');
    const isValid = validateForm();
    if(isValid === true){
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $("form").serialize(), //convert form data into urlencoded format
      }).then(function(){
        $('#tweets-container').empty();
          loadTweets();
          $('textarea').val('');
      }).fail(function(){
        console.log("form valid but not submitted");
      })
    } else {
      $('#error').text(isValid).slideDown("slow");
    }
  })
}

// fetch all tweets and reload page
function loadTweets(){
  $.ajax({
    type:'GET',
    url: '/tweets',
  }).then(function(tweetsArr){
    renderTweets(tweetsArr);
    })
};

function toggleNewTweet(){
  $('#compose-btn').click(function(){
    $(".new-tweet").slideToggle("slow", function(){
      $('textarea').focus();
    });
  });
}

$('document').ready(function(){
  // inital-load existing tweets
  loadTweets();
  toggleNewTweet();
  submitForm();
});
