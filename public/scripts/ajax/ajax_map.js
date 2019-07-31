// Ajax get request for get all maps route
// calls render maps function upon completion of promise
const ajaxGetAllMaps = (elementID) => {
  $.ajax('/maps', { method: 'GET' })
  .done(function(maps) {
    addMapsToContainer(maps, elementID);
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

