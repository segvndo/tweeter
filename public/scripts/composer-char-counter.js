$(document).ready(function() {
  $('#tweetText').on("input", function () {
    let counter = 140;
    let txt = $("#tweetText").val();
    let txtLength = txt.length;
    console.log(txt, txtLength);
    let remainder = counter - txtLength;
    $('.counter').html(remainder);

    if (remainder < 0) {
      $('.counter').css({"color": "red"});
    } else {
      $('.counter').css({"color": "black"});
    }
  });
});
