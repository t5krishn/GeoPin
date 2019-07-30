// Function runs on edit page load - driver code
$(() => {
  const currentURL = $(location).attr('href');

  const mapID = getMapIDFromURL(currentURL);

  // Edit button event listener
  $("#all-pins").on("submit", ".edit-form", (event) => {
    event.preventDefault();
    const url = event.target.getAttribute("action");
    ajaxGetSinglePin(url)
    .done((pin) => {
      console.log(pin);
      // createPinEditForm();
    });
  });

  // Delete button event listener
  $("#all-pins").on("submit", ".delete-form", (event) => {
    event.preventDefault();
    const url = event.target.getAttribute("action");
    ajaxDeletePin(url)
    .done(() => {
      const formRow = event.target.closest(".form-row");
      event.target.closest("#all-pins").removeChild(formRow)
    });
  });

  // Call get all pins function to show
  ajaxGetAllPins(mapID)
  .done((pins) => {
    addPinsToContainer(pins, "#all-pins", mapID);
  });

});
