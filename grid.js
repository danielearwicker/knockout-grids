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

    gridModel.rowOffset = gridModel.scrollTop;

    gridModel.getRowTop = function(index) {
        return (index * gridModel.rowHeight()) + gridModel.scrollTop();
    };

    var ensureVisible = function(columnIndex, rowIndex) {
        var sel = gridModel.selectedCell();
        var top = gridModel.getRowTop(sel.y - gridModel.rowOffset());
        if (top < gridModel.scrollTop()) {
            gridModel.scrollTop(sel.y);
        }
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

    var wrap = function(val, min, max) {
        return val >= max ? min :
               val < min ? (max - 1):
               val;
    }

    gridModel.keyPressed = function(data, evt) {
        var s = gridModel.selectedCell();
        switch (evt.which) {
            case 37: s.x--; break;
            case 39: s.x++; break;
            case 38: s.y--; break;
            case 40: s.y++; break;
        }
        gridModel.selectedCell({
            x: wrap(s.x, 0, ko.unwrap(gridModel.columns).length),
            y: wrap(s.y, 0, gridModel.rowCount())
        });
        ensureVisible(s.x, s.y);
    };

    return {
        view: html,
        model: gridModel
    };
};
