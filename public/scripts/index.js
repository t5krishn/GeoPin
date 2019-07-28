// Function runs on index page load - driver code
// Call get all maps function to show
$(() => {
  getAllListings().then(function( json ) {
    propertyListings.addProperties(json.properties);
    views_manager.show('listings');
  });
});
