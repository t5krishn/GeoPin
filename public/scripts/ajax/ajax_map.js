// Ajax get request for get all maps route
// calls render maps function upon completion of promise
const ajaxGetAllMaps = () => {
  return $.ajax('/maps', { method: 'GET' })
  .done(function(maps) {
    console.log("ajax request fin", maps);
    return maps;
  })
  .fail(function(error) {
    return error;
  });
};

const likeMap = function(mapid) {
  let $target = $(event.target);
  let int = parseInt($target.parent().text());
  // LIKE SOMETHING
  if ($target.attr("class") === "fas fa-heart") {
    $target.removeClass("fas fa-heart").addClass("far fa-heart");
  } else {
  // UNLIKE SOMETHING
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
