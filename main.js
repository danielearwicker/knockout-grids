
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
        columns: columns,

        rowCount: ko.observable(10000000),

        rowHeight: ko.observable(24),
        visibleRowsHeight: ko.observable(0),

        scrollLeft: ko.observable(0),
        scrollTop: ko.observable(0)
    };

    viewModel.visibleRows = ko.computed(function() {
        return Math.ceil(viewModel.visibleRowsHeight() / viewModel.rowHeight());
    });

    var range = ko.computed(function() {
        return viewModel.rowCount() - viewModel.visibleRows();
    });

    viewModel.spaceHeight = ko.computed(function() {
        return (viewModel.visibleRowsHeight() + range() + 1) + 'px';
    });

    viewModel.rowOffset = ko.computed(function() {
        return viewModel.scrollTop();
    });

    viewModel.getRowTop = function(index) {
        return (index * viewModel.rowHeight()) + viewModel.scrollTop();
    };

    viewModel.rows = ko.computed(function() {

        var rows = [];
        var last = Math.min(viewModel.rowCount() - 1, viewModel.rowOffset() + viewModel.visibleRows());
        for (var r = viewModel.rowOffset(); r <= last; r++) {
            rows.push(makeRow(r));
        }

        return rows;

    }).extend({ throttle: 10 });

    ko.applyBindings(viewModel);
};
