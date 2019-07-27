/* ************** FUNCTIONS WE NEED TO CREATE ******************** */

// loadPins() function refreshes side bar and requires map_id param it uses a loop that calls on createPin() function, appends
// createPin() function creates div element which has pin information and an edit, and delete pin
// createInfoWindow() function takes an argument, if null creates a create form for that marker

/*
  {}
*/
const createInfoWindow = function(object) {
  return `
    <div>
      <form>

      </form>
    </div>
  `
}
