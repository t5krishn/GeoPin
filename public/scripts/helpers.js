// Extract a parameter from given url as a string
const getMapIDFromURL = (url) => {
  const urlArray = url.split("/");
  const mapsIndex = urlArray.indexOf("maps");
  if (mapsIndex !== -1) {
    return urlArray[mapsIndex + 1];
  }
  return null;
};

// Clear all HTML from given elementID
const clearCrontainer = (elementID) => {
  $(elementID).empty();
};

// Function to close infowindow after submitting a pin edit or create form
const closePinFormWindow = function() {
  $(document).on("submit", "#pin-create-form", submitPinForm).off();
  infowindow.setContent("");
  infowindow.close();
}

// Function to check if an infowindow is present and delete if so
const closeInfoWindowIfPresent = function() {
  // Close infowindow on page if open
  if (infowindow) {
    $(document).on("submit", "#pin-create-form", submitPinForm).off();

    infowindow.setContent("");
    infowindow.close();
  }
}

// Function to loop through all markers on map and delete them
function removeAllMarkers() {
  for (let i = 0; i < allMarkers.length; i ++) {
    allMarkers[i].setMap(null);
  }
}

// Convert snake case string
function snakeToString(array) {
  let sentence = "";
  for (let i = 0; i < array.length; i ++) {
    let string = "";

    for (let char of array[i]) {
      if (char === "_") {
        string += " ";
      } else {
        string += char;
      }
    }

    sentence += string;

    if (i !== array.length - 1) {
      sentence += ", ";
    }
  }
  return sentence;
}
