// Function to scroll to top of screen, core taken from W3 Schools
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction();
};

// Hide button when at top of screen. Show when scrolling down
const scrollFunction = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {

    // document.getElementById("scrollToTop").style.display = "block";
  }
  // else {
  //   document.getElementById("scrollToTop").style.display = "none";
  // }
};

// When the user clicks on the button, scroll to the top of the document
const topFunction = function() {
  $(".new-tweet").slideDown(300);
  $("#newTweetError").css("display", "none");
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
