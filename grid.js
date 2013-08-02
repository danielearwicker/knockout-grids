var html = require('./grid.html');
var ko = require('knockout');

exports = module.exports = function(columns, makeRow) {

    var gridModel = {
        columns: columns,

        rowCount: ko.observable(10000000),

        rowHeight: ko.observable(26),
        visibleRowsHeight: ko.observable(0),

        scrollLeft: ko.observable(0),
        scrollTop: ko.observable(0),

        selectedCell: ko.observable({ x: 0, y: 0 })
    };

    gridModel.visibleRows = ko.computed(function() {
        return Math.ceil(gridModel.visibleRowsHeight() / gridModel.rowHeight());
    });

    var range = ko.computed(function() {
        return gridModel.rowCount() - gridModel.visibleRows();
    });

    gridModel.spaceHeight = ko.computed(function() {
        return (gridModel.visibleRowsHeight() + range() + 1) + 'px';
    });

    gridModel.rowOffset = ko.computed(function() {
        return gridModel.scrollTop();
    });

    gridModel.getRowTop = function(index) {
        return (index * gridModel.rowHeight()) + gridModel.scrollTop();
    };

    gridModel.rows = ko.computed(function() {

        var rows = [];
        var last = Math.min(gridModel.rowCount() - 1, gridModel.rowOffset() + gridModel.visibleRows());
        for (var r = gridModel.rowOffset(); r <= last; r++) {
            rows.push(makeRow(r));
        }

        return rows;

    }).extend({ throttle: 10 });

    gridModel.cellClicked = function(columnIndex, rowIndexMinusOffset) {
        gridModel.selectedCell({
            x: columnIndex,
            y: rowIndexMinusOffset + gridModel.rowOffset()
        });
    };

    gridModel.keyPressed = function(data, evt) {
        var s = gridModel.selectedCell();
        switch (evt.which) {
            case 37: // left
                gridModel.selectedCell({
                    x: s.x - 1,
                    y: s.y
                });
                break;
            case 39: // right
                gridModel.selectedCell({
                    x: s.x + 1,
                    y: s.y
                });
                break;
            case 38: // up
                gridModel.selectedCell({
                    x: s.x,
                    y: s.y - 1
                });
                break;
            case 40: // down
                gridModel.selectedCell({
                    x: s.x,
                    y: s.y + 1
                });
                break;
        }
    };

    return {
        view: html,
        model: gridModel
    };
};
