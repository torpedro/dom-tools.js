# dom-tools.js

This is a set of small tools to interact with the DOM in your website.

### Overview

**DomListener:** Get notified about creation and deletion of DOM element thats match a specific selector. ([demo][demo-listener], [blog post][blog-listener])

### DomListener

The DomListener is a small utility (~1.3 kB) to get notified about DOM events for all elements that match your selector. The basic idea is that you would want to do certain actions for each element.

To use it you simply have to include the library in you website by downloading `domlistener.min.js` from [here](https://github.com/torpedro/domlistener.js/tree/master/release) and including this in your website:

```html
<script type="text/javascript" src="domlistener.min.js"></script>
```

Here is a simple example of how to use it. Imagine you want to make sure that every link that points to a different domain has the attribute `target="_blank"` set. In a usual setup you would have to manually add that to every `a` element that exists in you webpage and also those that will be created dynamically by your application. Here you can do it with the following lines:

```javascript
// Attach listener that gets called for all 'a' elements that exist
// and also each time a element gets created
var listener = new DomListener("a", function(element) {
    var href = element.getAttribute("href");
	
    if (href && href.substring(0,4) === "http") {
        element.setAttribute("target", "_blank");
    }
});
```

For a detailed overview over the **DomListener** utility take a look at [this blog post][blog-listener].


### Contributing

Feel free to contribute in any way you can. Creating issues, pull-requests or just any comment is appreciated.

#### Building

This tool is written in Typescript and compiles to JavaScript. To get the development up and running you just have to do

```
npm install
```

and to build the sources, you just need to do

```
grunt build
```


[blog-listener]: http://torpedro.github.io/javascript/html/2015/12/22/dom-tools-domlistener.html
[demo-listener]: http://torpedro.github.io/dom-tools.js/demo/DomListener.html
