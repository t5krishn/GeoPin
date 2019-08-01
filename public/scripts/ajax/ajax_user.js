// AJAX Request for getting pin information to populate form
const ajaxGetSingleUser = (userID) => {
  return $.ajax(`/users/${userID}`, { method: 'GET' })
  .done(function(user) {
    if (user) {
      return user;
    }
    return null;
  });
};
