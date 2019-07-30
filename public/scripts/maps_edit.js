// Function runs on edit page load - driver code
$(() => {
  const currentURL = $(location).attr('href');

  const mapID = getMapIDFromURL(currentURL);

  $("#all-pins").on("submit", ".edit-form", (event) => {
    event.preventDefault();
    console.log("works");
  });

  // clearContainer($("#all-pins"));

  // Call get all pins function to show
  ajaxGetAllPins("#all-pins", mapID)
  .done((pins) => {
    addPinsToContainer(pins, "#all-pins", mapID);
  });

});
