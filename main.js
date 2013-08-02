var ko = require('knockout');
var grid = require('./grid');

require('./bindings.js');

window.onload = function() {

    var columns = [
        { label: 'ID', template: '<div data-bind="text: id"></div>', width: 70 },
        { label: 'First name', template: '<div data-bind="text: firstName"></div>', width: 120 },
        { label: 'Middle name', template: '<div data-bind="text: middleName"></div>', width: 120 },
        { label: 'Last name', template: '<div data-bind="text: lastName"></div>', width: 160 },
        { label: 'Full name', template: '<div data-bind="text: firstName + \' \' + middleName + \' \' + lastName"></div>', width: 220 }
    ];

    var firstNames = ['Homer', 'Marge', 'Bart', 'Lisa', 'Maggie', 'Moe', 'Barney', 'Carl', 'Lenny', 'Ned', 'Milhouse'];
    var lastNames = ['Simpson', 'Jetson', 'Flintstone', 'Obama', 'Bush', 'Clinton', 'Smithers'];

    var makeRow = function(i) {
        return {
            id: i,
            firstName: firstNames[i % firstNames.length],
            middleName: firstNames[(i + 4) % firstNames.length],
            lastName: lastNames[i % lastNames.length]
        };
    };

    var rows = [];
    for (var r = 0; r<100; r++) {
        rows.push(makeRow(r));
    }

    var viewModel = {
        grid: grid(columns, makeRow)
    };

    ko.applyBindings(viewModel);
};
