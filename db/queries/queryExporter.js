const addMap = require('./addMap');
const addMarker = require('./addMarker');
const addUser = require('./addUser');
const deleteMap = require('./deleteMap');
const deleteMarker = require('./deleteMarker');
const deleteUser = require('./deleteUser');
const getAllMapsForUser = require('./getAllMapsForUser');
const getAllMarkersForMap = require('./getAllMarkersForMap');
const getUsersWithId = require('./getUsersWithId');
const getUsersWithName = require('./getUsersWithName');
const updateMap = require('./updateMap');
const updateMarker = require('./updateMarker');
const updateUser = require('./updateUser');

module.exports = { 
    addMap,
    addMarker,
    addUser,
    deleteMap,
    deleteMarker,
    deleteUser,
    getAllMapsForUser,
    getAllMarkersForMap,
    getUsersWithId,
    getUsersWithName,
    updateMap,
    updateMarker,
    updateUser
};