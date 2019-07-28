const addMap = require('./addMap');
const addPin = require('./addPin');
const addUser = require('./addUser');
const deleteMap = require('./deleteMap');
const deletePin = require('./deletePin');
const deleteUser = require('./deleteUser');
const getAllMapsForUser = require('./getAllMapsForUser');
const getAllPinsForMap = require('./getAllPinsForMap');
const getUserWithId = require('./getUserWithId');
const getUserWithName = require('./getUserWithName');
const updateMap = require('./updateMap');
const updatePin = require('./updatePin');
const updateUser = require('./updateUser');

module.exports = { 
    addMap,
    addPin,
    addUser,
    deleteMap,
    deletePin,
    deleteUser,
    getAllMaps,
    getAllMapsForUser,
    getAllPinsForMap,
    
    getUserWithId,
    getUserWithName,
    updateMap,
    updatePin,
    updateUser
};