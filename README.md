jqueryExactEvent
================

Special and exact Events For jquery.
<br />License: [GNU GPL v3](https://github.com/meni181818-JS/jqueryExactEvent/blob/master/LICENSE).
<br />Copyright 2014 meni181818.


scroll:
-------
#### Events: ####
- `scroll_y_only` vertical scrolling Happens.

- `scroll_x_only` Horizontal scrolling Happens.

- `scroll_y_and_x` vertical and Horizontal scrolling Happens Together (`scroll_y_only`, and `scroll_x_only` not firing).

##### Examples #####
```javascript
// Horizontal scrolling Event:
$( "div#abc" ).on('scroll_x_only', function(e) {
        // do stuff
});

// vertical scrolling Event:
$( "div#abc" ).on('scroll_y_only', function() {
    // do stuff
});

// Horizontal And vertical scrolling in the same time:
$( "div#abc" ).on('scroll_y_and_x', function() {
    // do stuff
});
```

> <hr />
> NOTE: if you want to listen to Some of those Events on `#document` only (Without children), you wil need to check the target of the Event. **example**:
> ```js
> $( document ).on('scroll_x_only', function(e) {
    if(e.target.nodeName == '#document') {
        // do stuff
    }
});
> ```
<hr />

##### direction #####
you can access the direction of the scrolling by: `e.direction.y` and `e.direction.x`.
###### example: ######
```javascript
$( "div#abc" ).on('scroll_y_only', function(e) {
    console.log(e.direction.y); // Possible output (for 'y'): 'down', 'up'
});

$( "div#abc" ).on('scroll_x_only', function(e) {
    console.log(e.direction.x); // Possible output (for 'x'): 'right', 'left'
});
```
#### Methods ####
###### Disable vartical scrolling: ######
```javascript
$( document ).enableScroll('y', false);
```
###### Enable vartical scrolling: ######
```javascript
$( document ).enableScroll('y', true);
```
###### Disable Horizontal scrolling: ######
```javascript
$( document ).enableScroll('x', false);
```
###### Enable Horizontal scrolling: ######
```javascript
$( document ).enableScroll('x', true);
```
###### get the current state (Enable/Disabled): ######
```javascript
$( document ).enableScroll('y'); // => true/false
```
