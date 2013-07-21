


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

        rowOffset: ko.observable(0),
        rowCount: ko.observable(1000000000),

        rowHeight: ko.observable(24),
        visibleRowsHeight: ko.observable(0),

        scrollLeft: ko.observable(0),

        vViewport: ko.observable(0),
        hViewport: ko.observable(0)
    };

    viewModel.visibleRows = ko.computed(function() {
        return Math.ceil(viewModel.visibleRowsHeight() / viewModel.rowHeight());
    });

    viewModel.verticalRange = ko.computed(function() {
        return viewModel.rowCount() - viewModel.visibleRows();
    });

    viewModel.vPadding = ko.computed(function() {
        return Math.min(100000, Math.max(viewModel.vViewport(),
            viewModel.rowHeight() * viewModel.verticalRange()));
    });

    viewModel.vScroll = ko.computed({
        read: function() {
            var proportion = viewModel.rowOffset() / viewModel.verticalRange();
            return Math.round(proportion * (viewModel.vPadding() - viewModel.vViewport()));
        }, write: function(v) {
            var proportion = v / (viewModel.vPadding() - viewModel.vViewport());
            viewModel.rowOffset(Math.round(viewModel.verticalRange() * proportion));
        }
    });

    viewModel.allColumnsWidth = ko.computed(function() {
        return viewModel.columns.map(function(c) {
            return ko.unwrap(c.width);
        }).reduce(function(l, r) {
            return l + r;
        });
    });

    viewModel.horizontalRange = ko.computed(function() {
        return Math.max(0, viewModel.allColumnsWidth() - viewModel.hViewport());
    });

    viewModel.hPadding = ko.computed(function() {
        return viewModel.hViewport() + viewModel.horizontalRange();
    });

    viewModel.hScroll = ko.computed({
        read: function() {
            var proportion = viewModel.scrollLeft() / viewModel.horizontalRange();
            return Math.round(proportion * (viewModel.hPadding() - viewModel.hViewport()));
        }, write: function(v) {
            var proportion = v / (viewModel.hPadding() - viewModel.hViewport());
            viewModel.scrollLeft(Math.round(viewModel.horizontalRange() * proportion));
        }
    });

    viewModel.rows = ko.computed(function() {

        var rows = [];
        var end = viewModel.rowOffset() + viewModel.visibleRows();
        for (var r = viewModel.rowOffset(); r < end; r++) {
            rows.push(makeRow(r));
        }

        return rows;

    }).extend({ throttle: 10});

    ko.applyBindings(viewModel);
};
