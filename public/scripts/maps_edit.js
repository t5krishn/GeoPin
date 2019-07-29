// Function runs on edit page load - driver code
$(() => {
  const currentURL = $(location).attr('href');
  console.log(currentURL);

  const mapID = getMapIDFromURL(currentURL);
  console.log(mapID);
  // Call get all pins function to show
  // ajaxGetAllPins("#all-pins");
});
