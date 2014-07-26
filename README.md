jqueryExactEvent
================

Special and exact Events For jquery


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
you can access the direction of the scrolling by: `e.direction.y`.
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
$( document ).enabledScroll('x', false);
```
###### Enable vartical scrolling: ######
```javascript
$( document ).enabledScroll('x', false);
```
###### Disable Horizontal scrolling: ######
```javascript
$( document ).enabledScroll('y', false);
```
###### Enable Horizontal scrolling: ######
```javascript
$( document ).enabledScroll('y', false);
```
