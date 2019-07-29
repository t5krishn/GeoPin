// Ajax get request for get all maps route
// calls render maps function upon completion of promise
const ajaxGetAllMaps = () => {
  $.ajax('/maps', { method: 'GET' })
  .done(function(maps) {
    renderMaps(maps);
  })
  .fail(function(error) {
    console.log(error);
  });
};
