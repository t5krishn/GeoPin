// Add html for single map container element
const createMapHTML = (map) => {
  return ` <a href="/maps/${map.id}/edit" class="single-map">
      <div class="map-thumbnail map-container">
        <div class="hover-read">
          <div class="map-header">
            <h4>21 Pins</h4>
          </div> <!-- map-header -->
          <div class="map-description">
            <p>${map.description.substring(0, 50)}</p>
          </div> <!-- map-description -->
          <div class="map-footer">
            <span class="socials">
              <i class="fas fa-heart"></i>
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
            </span> <!-- socials -->
          </div> <!-- map-footer -->
        </div> <!-- hover-read -->
      </div> <!-- map-thumbnail -->
      <h4>kendy1234 - ${map.title}</h4>
    </a> <!-- single map -->
  `
};

// Loop through array of map objects and call create HTML funciton for each
// When done, append the entire HTML of all Maps to given element
const addMapsToContainer = (maps, elementID) => {
  let allMapsHTML = ``;
  clearContainer(elementID);
  for (const map of maps) {
    allMapsHTML += createMapHTML(map);
  }
  $(elementID).append(allMapsHTML);
};
