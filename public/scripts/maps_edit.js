// Function runs on edit page load - driver code
$(() => {
  const currentURL = $(location).attr('href');

  const mapID = getMapIDFromURL(currentURL);

  $("#all-pins").on("submit", ".edit-form", (event) => {
    event.preventDefault();
    const url = event.target.getAttribute("action");
    ajaxGetSinglePin(url)
    .done((pin) => {
      console.log(pin);
      // createPinEditForm();
    });
  });

  // clearContainer($("#all-pins"));

  // Call get all pins function to show
  ajaxGetAllPins(mapID)
  .done((pins) => {
    addPinsToContainer(pins, "#all-pins", mapID);
  });

});
