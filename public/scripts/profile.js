// Function runs on profile page load - driver code
$(() => {
    // Call gets maps for a user function to show
    ajaxGetMapsByUser("#maps-created-container", "#maps-contributed-container");

  });
  