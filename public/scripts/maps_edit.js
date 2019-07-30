// Function runs on edit page load - driver code
$(() => {
  const currentURL = $(location).attr('href');

  const mapID = getMapIDFromURL(currentURL);

  // clearContainer($("#all-pins"));

  // Call get all pins function to show
  ajaxGetAllPins("#all-pins", mapID);

});
