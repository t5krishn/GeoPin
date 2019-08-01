// Add html for single map container element
const createMapHTML = (map) => {
    return `
      <a class="single-map" href="/maps/${map.id}/edit">
        <div class="map-thumbnail map-container">
          <div class="hover-read">
            <div class="map-header">
              <h4><i class="fas fa-map-marker-alt"></i>${map.pin_count}</h4>
            </div> <!-- map-header -->
            <div class="map-description">
              <p>${map.description.substring(0, 50)}</p>
            </div> <!-- map-description -->
            <div class="map-footer">
              <span class="socials">
                <form method="POST" action="maps/${map.id}/like">
                  <div>
                    <h4 class="total-likes">${map.likes}</h4>
                    <i id="like" class="fa-lg ${doesUserLike(map.likedByUSER)}" onclick="likeMap(${map.id})"></i>
                  </div>
                </form>
              </span> <!-- socials -->
            </div> <!-- map-footer -->
          </div> <!-- hover-read -->
        </div> <!-- map-thumbnail -->
        <h4>${map.username} - ${map.title}</h4>
      </a> <!-- single map -->
    `
  };

  const doesUserLike = (likedByUSER) => {
    if (likedByUSER) {
      // full heart
      return `fas fa-heart`
    } else {
      // empty heart
      return `far fa-heart`
    }
  }

  // Loop through array of map objects and call create HTML funciton for each
  // When done, append the entire HTML of all Maps to given element
  const addUsersMapsToContainer = (maps, elementID) => {
    let allMapsHTML = ``;
    // clearContainer(elementID);
    if (maps.length !== 0) {
        for (const map of maps) {
            allMapsHTML += createMapHTML(map);
        }
    } else {
        allMapsHTML += `<div>No Maps to show. Go check some out or make your own!</div>`;
    }
    $(elementID).append(allMapsHTML);
  };
