// Function runs on index page load - driver code
// Call get all maps function to show
$(() => {
  $allMaps = $("#all-maps");
  db.getAllMaps()
  .then(json => {
    $allMaps.addProperties(json.properties);
    // views_manager.show('listings');
  })
  .catch(err => {
    console.log(err);
  });
});
