// Add html for single map container element
const createMapHTML = (map) => {
    return `
    <a class="map-details-link" href="/maps/${map.id}/edit">
      <div class="single-map map-info-container">
        <div class="map-thumbnail map-container" style='background-image: url("https://maps.googleapis.com/maps/api/staticmap?center=${map.city}&size=512x512&key=AIzaSyBwTwnh2Y7IqPIcltHVnlKMyBPI8pF5UcY");'></div>
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
  </a>
    `
  };

const editableMapsHTML = map => {
  return `
  <a class="map-details-link" href="/maps/${map.id}/edit">
  <div class="single-map map-info-container">
    <div class="map-thumbnail map-container" style='background-image: url("https://maps.googleapis.com/maps/api/staticmap?center=${map.city}&size=512x512&key=AIzaSyBwTwnh2Y7IqPIcltHVnlKMyBPI8pF5UcY");'></div>
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
          <button data-map_id="${map.id}" type="button" class="map-update-btn btn btn-outline-info mt-5" data-toggle="collapse" data-target="#collapseForm-${map.id}" aria-expanded="false" aria-controls="collapseExample">
            Update
          </button>
          <button data-map_id="${map.id}" type="button" class="map-delete-btn btn btn-outline-danger mt-5 ml-2" data-toggle="collapse" data-target="#collapseForm-${map.id}" aria-expanded="false" aria-controls="collapseExample">
            Delete
          </button>
          </div>
          </div>

  </div><!-- single map -->
</a>
<div class="collapse mt-4" id="collapseForm-${map.id}">
          </div>
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

// title, subject, description, city
const renderUpdateForm = map_id => {
  return `
  <form id="pin-create-form" class="form-group" action="maps/${map_id}" method="POST">
       <div class="form-row">
          <h3>Update Map</h3>
        </div>
        <div class="form-group" >
          <label for="title">Any fields left blank will be left as they were!</label>
          <!-- title of map -->
          <label for="title">Enter a title</label>
          <input id="title" class="form-control form-control-lg" type="text" name="title" placeholder="Enter a title for your map...">
        </div> <!-- title -->

        <!-- subject of map -->
        <div class="form-group" >
          <label for="subject">What is the subject of your map</label>
          <input id="subject" class="form-control form-control-lg" type="text" name="subject" placeholder="Enter a subject for your map...">
        </div> <!-- subject -->

        <!-- description of map -->
        <div class="form-group" >
          <label for="description">Give your map a description</label>
          <textarea id="description" class="form-control form-control-lg" type="text" name="description" placeholder="Give a brief description of your map..."></textarea>
        </div>  <!-- description -->

        <!-- city of map -->
        <div class="form-group" >
          <label for="city">What city is your map in?</label>
          <input id="city" class="form-control form-control-lg" type="text" name="city" placeholder="Enter the city your map is centered in...">
        </div>  <!-- city -->
        <div class="form-row">
          <button id="create-pin-btn" class="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
  `;
}

const renderDeleteForm = map_id => {
  return `

  `;
}




// Loop through array of map objects and call create HTML funciton for each
// When done, append the entire HTML of all Maps to given element
const addUsersMapsToContainer = (maps, elementID, usersMaps = false) => {
  let allMapsHTML = ``;
  // clearContainer(elementID);
  if (maps.length !== 0) {
    for (const map of maps) {
      if (!usersMaps) {
        allMapsHTML += createMapHTML(map);
      } else {
        allMapsHTML += editableMapsHTML(map);
      }
    }
  } else {
      allMapsHTML += `<div>No Maps to show. Go check some out or make your own!</div>`;
  }
  $(elementID).append(allMapsHTML);

  if (usersMaps) {

    $('.map-update-btn').on("click", function(event) {
      event.preventDefault();
      // console.log(this.dataset.map_id);
      const updateForm = renderUpdateForm(this.dataset.map_id)
      // => returns the string(html) to append to form
      // id for the rendering the form collapseForm-${map.id}
      $(`#collapseForm-${this.dataset.map_id}`).html('');
      $(`#collapseForm-${this.dataset.map_id}`).append(updateForm);
    });

    $('.map-delete-btn').on("click", function(event) {
      event.preventDefault();
        // console.log(this.dataset.map_id);
      const deleteForm = renderDeleteForm(this.dataset.map_id)
      // => returns the string(html) to append to form
      // id for the rendering the form collapseForm-${map.id}
      $(`#collapseForm-${this.dataset.map_id}`).html('');
      $(`#collapseForm-${this.dataset.map_id}`).append(deleteForm);    });
  }
};
