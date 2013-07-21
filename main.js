


window.onload = function() {

    var columns = [
        { label: 'ID', template: '<span data-bind="text: id"></span>', width: 60 },
        { label: 'First name', template: '<span data-bind="text: firstName"></span>', width: 120 },
        { label: 'Middle name', template: '<span data-bind="text: middleName"></span>', width: 120 },
        { label: 'Last name', template: '<span data-bind="text: lastName"></span>', width: 160 }
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
    for (var r = 0; r<1000; r++) {
        rows.push(makeRow(r));
    }

    var viewModel = {
        columns: columns,
        rows: ko.observable(rows),

        rowHeight: ko.observable(24),

        scrollLeft: ko.observable(0)
    };

    ko.applyBindings(viewModel);
};
