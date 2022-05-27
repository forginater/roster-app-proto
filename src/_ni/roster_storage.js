"use strict";
exports.__esModule = true;
exports.addActivity = exports.getRosterNames = exports.getRosterStorage = exports.getRoster = void 0;
//Define music category
var musicCat = {
    categoryTitle: "Coding Roster",
    activities: [
        { topic: "Execute Program: Typescript" },
        { topic: "Build Medication React App" },
        { topic: "Build Battlefields React App" },
        { topic: "COSC260: Web programming tutorials" },
    ]
};
//Roster2 = Coding
var codingRoster = {
    categoryTitle: "Music Roster",
    activities: [
        { topic: "Jazz" },
        { topic: "Open tuning: Gonzalez" },
        { topic: "Reading: Bach" },
        { topic: "Gazza" },
        { topic: "Ableton" },
        { topic: "vox scales" },
        { topic: "singing" },
    ]
};
//Initialise our roster library
var rosterOrig = {
    categories: [
        musicCat,
        codingRoster,
    ]
};
var rosterOriginal = {
    rosterName: 'rosterLibraryInit',
    rosterInstance: rosterOrig
};
var allRosters = {
    rosterStorage: [rosterOriginal]
};
function getRoster(rosterName) {
}
exports.getRoster = getRoster;
function getRosterStorage() {
    return allRosters;
}
exports.getRosterStorage = getRosterStorage;
function getRosterNames() {
    var rosterNames = [];
    for (var _i = 0, _a = Object.values(allRosters.rosterStorage); _i < _a.length; _i++) {
        var rosterInst = _a[_i];
        //rosterNames.push(rosterInst.)
        console.log(rosterInst);
    }
    var rosterDummy = ['dum'];
    return rosterDummy;
}
exports.getRosterNames = getRosterNames;
function addActivity() {
}
exports.addActivity = addActivity;
getRosterNames();
//export default roster_Storage;
