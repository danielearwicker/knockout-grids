var ko = require('knockout');
var grid = require('./grid');

require('./bindings.js');

window.onload = function() {

    var columns = [
        { label: 'ID', template: '<span data-bind="text: id"></span>', width: 70 },
        { label: 'First name', template: '<span data-bind="text: firstName"></span>', width: 120 },
        { label: 'Middle name', template: '<span data-bind="text: middleName"></span>', width: 120 },
        { label: 'Last name', template: '<span data-bind="text: lastName"></span>', width: 160 },
        { label: 'Full name', template: '<span data-bind="text: firstName + \' \' + middleName + \' \' + lastName"></span>', width: 220 }
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
