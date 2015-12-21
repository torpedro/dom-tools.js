/**
 * DomListener
 */
type DomCallback = ((node: Element) => void);

class DomListener {
    private observer: MutationObserver;
    private selector: string;
    private callback: DomCallback;
    private root: Node;

    public constructor(selector: string, callback: DomCallback, root?: Element) {
        this.selector = selector;
        this.callback = callback;
        this.root = (typeof root === "undefined") ? document : root;

        // first: trigger the callback for all existing elements
        var elements: NodeListOf<Element> = root.querySelectorAll(selector)
        for (var i: number = 0; i < elements.length; ++i) {
            callback(elements[i]);
        }

        // register a mutation observer for all DOM changes
        this.observer = new MutationObserver((mutations: MutationRecord[], observer: MutationObserver) => {
            this.onDomMutations(mutations);
        });
        this.observer.observe(root, {
            childList: true,
            subtree: true
        });
    }

    public destroy() {
        this.observer.disconnect();
    }

    private onDomMutations(mutations: MutationRecord[]) {
        for (var mutation of mutations) {
            for (var i: number = 0; i < mutation.addedNodes.length; ++i) {
                var node: Node = mutation.addedNodes[i];
                this.onNodeAdded(node);
            }
            // TODO: handle removed nodes
        }
    }

    private onNodeAdded(node: Node) {
        if (node.nodeType === Node.ELEMENT_NODE) {

            // check the currently added element
            var element: Element = <Element>node;
            if ((<any>element).matches) {
                // Element.matches is experimental
                // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
                if ((<any>element).matches(this.selector)) {
                    this.callback(element);
                }
            } else {
                var candidates: NodeListOf<Element> = element.parentElement.querySelectorAll(this.selector);
                for (var j: number = 0; j < candidates.length; ++j) {
                    if (candidates[j] === element) {
                        this.callback(element);
                        break;
                    }
                }
            }

            // check all children of the added element
            var children: NodeListOf<Element> = element.querySelectorAll(this.selector)
            for (var i: number = 0; i < children.length; ++i) {
                this.callback(children[i]);
            }
        }
    }
}