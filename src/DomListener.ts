/**
 * DomListener
 */
type DomListenerCallback = ((element: Element) => void);

interface DomListenerConfig {
    callback: DomListenerCallback;
    onRemove?: DomListenerCallback;
    callForExisting?: boolean;
    root?: Element;
}

class DomListener {
    private observer: MutationObserver;
    private callback: DomListenerCallback;
    private onRemove: DomListenerCallback;
    private callForExisting: boolean;
    private selector: string;
    private root: Element;

    public constructor(selector: string, callback: DomListenerCallback);
    public constructor(selector: string, config: DomListenerConfig);
    public constructor(selector: string, _arg2: DomListenerCallback|DomListenerConfig) {
        this.selector = selector;

        if (typeof _arg2 === "function") {
            this.callback = <DomListenerCallback>_arg2;
            this.callForExisting = true;
            this.root = document.body;
        } else {
            var config: DomListenerConfig = <DomListenerConfig> _arg2;
            this.callback = config.callback;
            this.onRemove = config.onRemove;
            this.callForExisting = ("callForExisting" in config) ? config.callForExisting : true;
            this.root = config.root || document.body;
        }

        this.initialize();
    }

    public destroy() {
        this.observer.disconnect();
    }

    private initialize() {
        // first: trigger the callback for all existing elements
        if (this.callForExisting) {
            var elements: NodeListOf<Element> = this.root.querySelectorAll(this.selector)
            for (var i: number = 0; i < elements.length; ++i) {
                this.callback(elements[i]);
            }
        }

        // register a mutation observer for all DOM changes
        this.observer = new MutationObserver((mutations: MutationRecord[], observer: MutationObserver) => {
            this.onDomMutations(mutations);
        });
        this.observer.observe(this.root, {
            childList: true,
            subtree: true
        });
    }

    private onDomMutations(mutations: MutationRecord[]) {
        for (var mutation of mutations) {
            for (var i: number = 0; i < mutation.addedNodes.length; ++i) {
                var node: Node = mutation.addedNodes[i];
                this.onNodeAdded(node);
            }
            for (var i: number = 0; i < mutation.removedNodes.length; ++i) {
                var node: Node = mutation.removedNodes[i];
                this.onNodeRemove(node);
            }
        }
    }

    private onNodeAdded(node: Node) {
        if (this.callback) {
            this.handleDomEvent(node, this.callback);
        }
    }

    private onNodeRemove(node: Node) {
        if (this.onRemove) {
            this.handleDomEvent(node, this.onRemove);
        }
    }

    private handleDomEvent(node: Node, callback: DomListenerCallback) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            // check the currently added element
            var element: Element = <Element>node;
            if ((<any>element).matches) {
                // Element.matches is experimental
                // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
                if ((<any>element).matches(this.selector)) {
                    callback(element);
                }
            } else {
                var candidates: NodeListOf<Element> = element.parentElement.querySelectorAll(this.selector);
                for (var j: number = 0; j < candidates.length; ++j) {
                    if (candidates[j] === element) {
                        callback(element);
                        break;
                    }
                }
            }

            // check all children of the added element
            var children: NodeListOf<Element> = element.querySelectorAll(this.selector)
            for (var i: number = 0; i < children.length; ++i) {
                callback(children[i]);
            }
        }
    }
}