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
