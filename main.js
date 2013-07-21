


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
    for (var r = 123; r<223; r++) {
        rows.push(makeRow(r));
    }

    var viewModel = {
        columns: columns,
        rows: ko.observable(rows),

        rowOffset: ko.observable(123),
        rowCount: ko.observable(100000),

        rowHeight: ko.observable(24),

        scrollLeft: ko.observable(0),
        scrollTop: ko.observable(0),
        gridHeight: ko.observable(0)
    };

    viewModel.paddingTop = ko.computed(function() {
        return viewModel.rowOffset() * viewModel.rowHeight();
    });

    viewModel.paddingBottom = ko.computed(function() {
        return Math.max(0, (viewModel.rowCount() -
            (viewModel.rowOffset() + viewModel.rows().length))
                * viewModel.rowHeight());
    });

    var cachedFirst = -1, cachedLast = -1;

    ko.computed(function() {
        var first = Math.floor(viewModel.scrollTop() / viewModel.rowHeight());
        var last = Math.ceil((viewModel.scrollTop() + viewModel.gridHeight()) / viewModel.rowHeight());

        var pageSize = 50;

        first = Math.max(0, Math.floor(first / pageSize) * pageSize);
        last = Math.min(Math.ceil(last / pageSize) * pageSize, viewModel.rowCount());

        if (first != cachedFirst || last != cachedLast) {
            cachedFirst = first;
            cachedLast = last;

            var rows = [];
            for (var r = first; r < last; r++) {
                rows.push(makeRow(r));
            }

            viewModel.rowOffset(first);
            viewModel.rows(rows);
        }
    });

    ko.applyBindings(viewModel);
};
