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
  event.preventDefault();
  let $target = $(event.target);
  let int = parseInt($target.parent().text());
  // LIKING MAP, filled heart and adds to like counter
  if ($target.attr("class") === "fa-lg fas fa-heart") {
    $target.removeClass("fas fa-heart").addClass("fa-lg far fa-heart");
    $target.siblings().text(int - 1);
  } else {
  // UNLIKING MAP, unfilled heart and subtract to like counter
    $target.removeClass("far fa-heart").addClass("fa-lg fas fa-heart");
    $target.siblings().text(int + 1);
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
  const user_id = document.querySelector('#profile-username').dataset.user_id;
  console.log(user_id);
  $.ajax(`/users/${user_id}/maps`, { method: 'GET' })
  .done(function(maps) {
    // FOLLOWING SCRIPTS IN public/scripts/components/detailed_maps.js
    addUserMapsToContainer(maps.createdMaps, mapCreatedEle);
    addUserMapsToContainer(maps.contributedMaps, mapContributedEle);

  })
  .fail(function(error) {
    console.log("oops");
    console.log(error);
  });
};

