// Ajax get request for get all maps route
// calls render maps function upon completion of promise
const ajaxGetAllMaps = () => {
  return $.ajax('/maps', { method: 'GET' })
  .done(function(maps) {
    return maps;
  })
  .fail(function(error) {
    return error;
  });
};

const likeMap = function(mapid) {
  let $target = $(event.target);
  // Unlike a map
  if ($target.attr("class") === "fas fa-heart") {
    // Changes heart to unfilled
    $target.removeClass("fas fa-heart").addClass("far fa-heart");
  } else {
    $target.removeClass("far fa-heart").addClass("fas fa-heart");
  }
  // Send a request to delete/ insert row to liked_maps table depending on if a user already likes the map
  $.ajax(`/maps/${mapid}/like`, { method: 'POST' })
  .done(res => {
    // res.redirect('/login')
    if (res.err) {
      window.location.href = "/login";
    }
  })
  .fail(function(error) {
    console.log("oops");
    console.log(error);
  });
}
