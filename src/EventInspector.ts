/**
 * EventInspector
 */
type EventInspectorCallback = (element: Element, eventType: string, evt: Event) => void;

class EventInspector {
    // https://developer.mozilla.org/en-US/docs/Web/Events
    static EVENTS = {
        "mouse": ["click", "contextmenu", "dblclick", "mousedown", "mouseenter", "mouseleave", "mouseout", "mouseover", "mouseup", "show"], // excl. "mousemove"
        "keyboard": ["keydown", "keypress", "keyup"],
        "touch": ["touchcancel", "touchend", "touchenter", "touchleave", "touchmove", "touchstart"],
        "wheel": ["wheel"],
        "drag": ["drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop"],
        "focus": ["blur", "focus", "focusin", "focusout"],
        "css": ["animationend", "animationiteration", "animationstart", "transitionend"],
        "text": ["compositionend", "compositionstart", "compositionupdate", "copy", "cut", "paste", "select", "text"],
        "view": ["fullscreen", "fullscreenchange", "fullscreenerror", "MozEnteredDomFullscreen", "MozScrolledAreaChanged", "resize", "scroll", "sizemodechange"]
    };

    private callback: EventInspectorCallback;
    private root: Element;

    constructor(selector: string, callback: EventInspectorCallback, root: Element = document.body) {
        this.callback = callback;
        this.root = root;

        var elements: NodeListOf<Element> = root.querySelectorAll(selector)
        for (var i: number = 0; i < elements.length; ++i) {
            this.attachToElement(elements[i]);
        }
    }

    private attachToElement(element: Element) {
        for (var type in EventInspector.EVENTS) {
            for (var event of EventInspector.EVENTS[type]) {
                element.addEventListener(event, (evt: Event): void => {
                    this.callback(evt.srcElement, evt.type, evt);
                });
            }
        }
    }
}