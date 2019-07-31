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
  let totalLikes = $target.parent().text();
  let int = parseInt($target.parent().text());
  // LIKE SOMETHING
  if ($target.attr("class") === "fas fa-heart") {
    $target.removeClass("fas fa-heart").addClass("far fa-heart");
    totalLikes.text(int + 1);
  } else {
  // UNLIKE SOMETHING
    $target.removeClass("far fa-heart").addClass("fas fa-heart");
    totalLikes.text(int - 1);
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
};

const ajaxGetMapsByUser = (mapCreatedEle, mapContributedEle) => {
  const user_id = $('#profile-image').dataset.user_id;

  $.ajax(`/users/${user_id}/maps`, { method: 'GET' })
  .done(function(maps) {
    console.log(maps);
    // addMapsToContainer(maps, elementID);
  })
  .fail(function(error) {
    console.log("oops");
    console.log(error);
  });
};

