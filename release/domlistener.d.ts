declare type DomListenerCallback = ((element: Element) => void);
interface DomListenerConfig {
    callback: DomListenerCallback;
    onRemove?: DomListenerCallback;
    callForExisting?: boolean;
    root?: Element;
}
declare class DomListener {
    private observer;
    private callback;
    private onRemove;
    private callForExisting;
    private selector;
    private root;
    constructor(selector: string, callback: DomListenerCallback);
    constructor(selector: string, config: DomListenerConfig);
    destroy(): void;
    private initialize();
    private onDomMutations(mutations);
    private onNodeAdded(node);
    private onNodeRemove(node);
    private handleDomEvent(node, callback);
}
