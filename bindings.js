var ko = require('knockout');

ko.bindingHandlers.scroll = {
    'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        var params = valueAccessor();

        element.addEventListener('scroll', function(ev) {
            if (ko.isObservable(params.left)) {
                params.left(element.scrollLeft);
            }
            if (ko.isObservable(params.top)) {
                params.top(element.scrollTop);
            }
        }, false);

        ko.computed(function() {
            if (params.left) {
                element.scrollLeft = ko.unwrap(params.left);
            }
            if (params.top) {
                element.scrollTop = ko.unwrap(params.top);
            }
        });
    }
};

ko.bindingHandlers.size = {
    'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        var params = valueAccessor();

        var timer = setInterval(function() {
            var style = window.getComputedStyle(element);
            if (ko.isObservable(params.width)) {
                params.width(parseInt(style.width, 10));
            }
            if (ko.isObservable(params.height)) {
                params.height(parseInt(style.height, 10));
            }
        }, 500);

        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            clearInterval(timer);
        });
    }
};

ko.bindingHandlers.htmlTemplate = {
    'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        ko.computed(function() {
            var params = ko.unwrap(valueAccessor());
            var view = (params ? ko.unwrap(params.view) : null) || '';
            var model = (params ? ko.unwrap(params.model) : null) || {};
            ko.utils.setHtml(element, view);
            ko.applyBindingsToDescendants(bindingContext.createChildContext(model), element);
        });
        return { controlsDescendantBindings: true };
    }
};

