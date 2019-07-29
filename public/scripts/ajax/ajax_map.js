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
