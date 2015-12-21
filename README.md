# domlistener.js

With this small tool you can keep track of all changes that are happening on your DOM. Also filtered by whatever DOM-selector you specify.
The original use case was to automatically apply certain changes on every DOM element of a certain type.

### How to Use

Include the library in you web page by downloading domlistener.min.js from [here](https://github.com/torpedro/domlistener.js/tree/master/release) and including this in your website:

```
<script type="text/javascript" src="domlistener.min.js"></script>
```

See the following examples to get a feeeling on how to use this tool.

### Examples

#### Auto-apply `target="_blank"` to links that point away from the current domain

In a usual setup you would have to manually add that to every `a` element that exists in you webpage and also those that will be created dynamically by your application. Here you can do it with the following lines:

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
