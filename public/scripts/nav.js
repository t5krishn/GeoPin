$(document).ready(function(){
  $('.hamburger').on('click', function(){
    // toggle class show on the menu
    $('.nav-list-container').toggleClass('show');
    $("nav").toggleClass('expand');
  });
});
