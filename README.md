jqueryExactEvent
================

Special and exact Events For jquery


Events:
-------
#### scroll: ####
- `scroll_y_only` vertical scrolling Happens.

- `scroll_x_only` Horizontal scrolling Happens.

- `scroll_y_and_x` vertical and Horizontal scrolling Happens Together (`scroll_y_only`, and `scroll_x_only` not firing).

##### Examples #####
```javascript
$( document ).on('scroll_x_only', function(e) {
    if(e.target.nodeName == '#document') {
        // do stuff
    }
});


$( "div#abc" ).on('scroll_y_only', function() {

});


$( "div#abc" ).on('scroll_y_and_x', function() {

});
```
