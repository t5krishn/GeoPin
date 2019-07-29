// Add html for single pin container element
const createPinHTML = (pin, allPinsHTML) => {
  return `
  `
};

// Clear all HTML from given elementID
const clearPins = (elementID) => {
  $(elementID).empty();
};

// Loop through array of map objects and call create HTML funciton for each
// When done, append the entire HTML of all Pins to given element
const addPinsToContainer = (pins, elementID) => {
  let allPinsHTML = ``;
  clearPins();
  for (const pin of pins) {
    allPinsHTML += createPinHTML(pin, allPinsHTML);
  }
  console.log('element; ', elementID);
  console.log(allPinsHTML);
  $(elementID).append(allPinsHTML);
};
