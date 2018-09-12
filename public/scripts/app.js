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
  let day = Math.floor((Date.now() - `${obj.created_at}`) / 86400000);
  let $date = `<span> ${day} days ago </span>`; 
  let icon = `<span class='icon'>  
                <i class='fab fa-font-awesome-flag'></i> 
                <i class='fas fa-retweet'></i>
                <i class='fas fa-heart'></i> 
              </span>`;
  let $icons = $('<span>').addClass('icon').html(icon);
  $footer.append($date).append($icons);
  $tweet.append($footer);
  
  return $tweet;
};

function renderTweets(tweets) {
  tweets.forEach(function(tweet){
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  });
}

function submitForm(){
  $("form").on('submit',function(){
    event.preventDefault();
    // $('#error').slideUp("slow");
    $('#error').empty();
    const isValid = validateForm();
    if(isValid === true){
      console.log("form valid");
      // $.ajax({
      //   type: 'POST',
      //   url: '/tweets',
      //   data: $("form").serialize(), //convert raw data into urlencoded format
      //   success: function(response){
      //     console.log('form submission success');
      //     loadTweets();
      //     $('textarea').val('');
      //   },
      //   error: function(){
      //     console.log("form submission fail");
      //   }
      // })
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $("form").serialize(), //convert raw data into urlencoded format
      }).then(function(){
        console.log('form submission success');
        $('#tweets-container').empty();
          loadTweets();
          $('textarea').val('');
      }).fail(function(){
        console.log("form valid but not submitted");
      })
    } else {
      console.log("form invalid and not submitted");
      // $('#error').html(isValid).slideDown("slow");
      $('#error').slideDown("slow", function(){
        $('#error').text(isValid);
})
    }
  })
}

// fetch tweets and reload page
function loadTweets(){
  $.ajax({
    type:'GET',
    url: '/tweets',
  }).then(function(tweetsArr){
    console.log("fetch success", tweetsArr);
    renderTweets(tweetsArr);
    })
};

function validateForm(){
  const str = $('textarea').val();
  const length = str.length;
  if( str === ""){
// $('#error').slideDown("slow", function(){
  // $('#error').text("empty string");
// })
    // $('#error').text("Content cannot be empty, type something.").slideDown("slow");
    return "Content cannot be empty, type anything.";
  } else if( length > 140){
    // $('#error').slideDown();
    // $('#error').text("Max charaters 140");
    return "Characters overlimit, max 140.";
  } else {
    return true;
  }
}


$('document').ready(function(){

  loadTweets();
  submitForm();
  $('#compose-btn').click(function(){
    // if($(".new-tweet").is(':visible')){
    //   $(".new-tweet").slideUp();
    // } else {
    //   $('textarea').slideDown();
    //   $('textarea').focus();
    // }
    $(".new-tweet").slideToggle("slow", function(){
      $('textarea').focus();
    });
    })
  });
