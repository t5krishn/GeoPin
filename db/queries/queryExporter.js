const addMap = require('./addMap');
const addPin = require('./addPin');
const addUser = require('./addUser');
const decrementPinCountWithMapId = require ('./decrementPinCountWithMapId');
const deleteMap = require('./deleteMap');
const deletePin = require('./deletePin');
const deleteUser = require('./deleteUser');
const getAllMaps = require('./getAllMaps');
const getAllMapsForUser = require('./getAllMapsForUser');
const getAllPinsForMap = require('./getAllPinsForMap');
const getMapWithId = require('./getMapWithId');
const getPinWithId = require('./getPinWithId');
const getUserWithId = require('./getUserWithId');
const getUserWithName = require('./getUserWithName');
const incrementPinCountWithMapId = require('./incrementPinCountWithMapId');
const updateMap = require('./updateMap');
const updatePin = require('./updatePin');
const updateUser = require('./updateUser');

module.exports = { 
    addMap,
    addPin,
    addUser,
    decrementPinCountWithMapId,
    deleteMap,
    deletePin,
    deleteUser,
    getAllMaps,
    getAllMapsForUser,
    getAllPinsForMap,
    getMapWithId,
    getPinWithId,
    getUserWithId,
    getUserWithName,
    incrementPinCountWithMapId,
    updateMap,
    updatePin,
    updateUser
};