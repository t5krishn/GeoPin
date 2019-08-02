// Add html for single map container element
const createMapHTML = (map) => {
    return `
    <a class="map-details-link" href="/maps/${map.id}/edit">
      <div class="single-map map-info-container">
        <div class="map-thumbnail map-container"></div>
        <div class="map-details">
            <h3>${map.title}</h3>
            <small><cite title="location">Created At: ${map.created_at}<i class="glyphicon glyphicon-map-marker">
            </i></cite></small>
            <p>
            <h5><b>Created By:</b> ${map.username}</h5>
            <br />
            <h5><b>Location:</b> ${map.city}</h5>
            <h5><b>Type:</b> ${map.subject}</h5>
            <h5><b>Description:</b> ${map.description}</h5></p>
        </div>
      </div>
    </div><!-- single map -->
  </a>
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
