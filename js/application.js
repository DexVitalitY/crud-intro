$(document).ready(function() {

var userName;
var titleName;
var textInput;

$('#userName').keyup(function() {
	userName = $('#userName').val();
});

$('#titleName').keyup(function(){
	titleName = $('#titleName').val();
});

$('#textInput').keyup(function(){
  textInput = $('#textInput').val();
});

function makePost() {
// event.preventDefault();
$.ajax({
    type: 'POST',
    url: 'http://ga-wdi-api.meteor.com/api/posts/',
    data: {
        user: userName,
        title: titleName,
        text: textInput,
    },
    dataType: 'json',
    success: function(response){
        console.log(response);
    }
  });
}

// }$.ajax({
//     type: 'POST',
//     url: 'http://ga-wdi-api.meteor.com/api/posts/',
//     data: {
//         user: 'Michael Chow',
//         title: 'Avengers Age of Ultron',
//         text: 'Staring... Everyone you can think of in the Marvel Cinematic Universe.'
//     },
//     dataType: 'json',
//     success: function(response){
//         console.log(response);
//     }
//   });
// }

$('#makePost').click(function() {
	makePost();
});

var allPosts;
//This will return me an array of Objects with each Object with id, text, title, and user as the key with values assigned to them.
function getAllPosts() {
  $.ajax({
      type: 'GET',
      url: 'http://ga-wdi-api.meteor.com/api/posts/',
      dataType: 'json',
      success: function(response){
      console.log(response);
      allPosts = response; 
      }
    });

  }

var foo;
function printPosts() {
$.each(allPosts, function(i, val) {
     // console.log("Going Through Each Object = " + i + " And Val: " + val)
     // foo = val;
	$('#postTable').append(
'<div class="row"><div class="col-xs-2 col-xs-offset-1">' + val["_id"] + '</div><div class="col-xs-2">' + val["title"] + '</div><div class="col-xs-4">' + val["text"] + '</div><div class="col-xs-2">' + val["user"] + '</div></div>'
    )
  });
}

function clearPosts() {
	$('#postTable').text('')
}

setInterval(function() {
	clearPosts();
	getAllPosts();
	printPosts();
}, 1500);

var id; 
$('#postID').keyup(function() {
	id = $('#postID').val();
});

function putPosts() {
	  $.ajax({
      type: 'PUT',
      url: 'http://ga-wdi-api.meteor.com/api/posts/' + id,
      data: {
      	user: userName,
        title: titleName,
        text: textInput, 
      },
      dataType: 'json',
      success: function(response){
      console.log(response);
      allPosts = response; 
      }
    });
}

$('#makePut').click(function() {
	putPosts();
});

function delPosts() {
	$.ajax({
		type: 'DELETE',
		url: 'http://ga-wdi-api.meteor.com/api/posts/' + id,
	  success: function(response){
	  	console.log(response);
	  }
	})
}

$('#delPost').click(function() {
	delPosts();
});

});