// Function runs on index page load - driver code
$(() => {
  // Call get all maps function to show
  ajaxGetAllMaps()
  .done((maps) => {
    addMapsToContainer(maps, "#browse-map-wrapper");

  })
  .fail((err) => {
    console.log(err);
  });
});
