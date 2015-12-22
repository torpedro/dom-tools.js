var DomListener = (function () {
    function DomListener(selector, _arg2) {
        this.selector = selector;
        if (typeof _arg2 === "function") {
            this.callback = _arg2;
            this.callForExisting = true;
            this.root = document.body;
        }
        else {
            var config = _arg2;
            this.callback = config.callback;
            this.onRemove = config.onRemove;
            this.callForExisting = ("callForExisting" in config) ? config.callForExisting : true;
            this.root = config.root || document.body;
        }
        this.initialize();
    }
    DomListener.prototype.destroy = function () {
        this.observer.disconnect();
    };
    DomListener.prototype.initialize = function () {
        var _this = this;
        if (this.callForExisting) {
            var elements = this.root.querySelectorAll(this.selector);
            for (var i = 0; i < elements.length; ++i) {
                this.callback(elements[i]);
            }
        }
        this.observer = new MutationObserver(function (mutations, observer) {
            _this.onDomMutations(mutations);
        });
        this.observer.observe(this.root, {
            childList: true,
            subtree: true
        });
    };
    DomListener.prototype.onDomMutations = function (mutations) {
        for (var _i = 0; _i < mutations.length; _i++) {
            var mutation = mutations[_i];
            for (var i = 0; i < mutation.addedNodes.length; ++i) {
                var node = mutation.addedNodes[i];
                this.onNodeAdded(node);
            }
            for (var i = 0; i < mutation.removedNodes.length; ++i) {
                var node = mutation.removedNodes[i];
                this.onNodeRemove(node);
            }
        }
    };
    DomListener.prototype.onNodeAdded = function (node) {
        if (this.callback) {
            this.handleDomEvent(node, this.callback);
        }
    };
    DomListener.prototype.onNodeRemove = function (node) {
        if (this.onRemove) {
            this.handleDomEvent(node, this.onRemove);
        }
    };
    DomListener.prototype.handleDomEvent = function (node, callback) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            var element = node;
            if (element.matches) {
                if (element.matches(this.selector)) {
                    callback(element);
                }
            }
            else {
                var candidates = element.parentElement.querySelectorAll(this.selector);
                for (var j = 0; j < candidates.length; ++j) {
                    if (candidates[j] === element) {
                        callback(element);
                        break;
                    }
                }
            }
            var children = element.querySelectorAll(this.selector);
            for (var i = 0; i < children.length; ++i) {
                callback(children[i]);
            }
        }
    };
    return DomListener;
})();
//# sourceMappingURL=DomListener.js.map