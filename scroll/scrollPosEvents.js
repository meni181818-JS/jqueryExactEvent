var scroll = {y: {last_pos: 0, update_pos: function() {this.last_pos = getScroll('y');}, enabled: true},
              x: {last_pos: 0, update_pos: function() {this.last_pos = getScroll('x');} , enabled: true}};

$( document ).scroll(function() {
    if(scroll.y.last_pos != getScroll('y') && scroll.x.last_pos == getScroll('x')) { // if only y scrolled
        $( document ).trigger( "scroll_y_only" );
        if(scroll.y.enabled == false) { // block the y scroll if set to enabled = false
            $( document ).scrollTop(scroll.y.last_pos); 
        } else {
            scroll.y.update_pos();
        }
    } else if(scroll.x.last_pos != getScroll('x') && scroll.y.last_pos == getScroll('y')) { // if only x scroled
        $( document ).trigger( "scroll_x_only" );
        if(scroll.x.enabled == false) { // block the x scroll if set to enabled = false
           window.scrollTo(scroll.x.last_pos, null); 
        } else {
            scroll.x.update_pos();
        }
    } else if(scroll.y.last_pos != getScroll('y') && scroll.x.last_pos != getScroll('x')) { // if scroll y AND x
        $( document ).trigger( "scroll_y_and_x" );
        if(scroll.y.enabled == false) { // block the y scroll if set to enabled = false
            $( document ).scrollTop(scroll.y.last_pos); 
        } else {
            scroll.y.update_pos();
        }
        if(scroll.x.enabled == false) { // block the x scroll if set to enabled = false
           window.scrollTo(scroll.x.last_pos, null); 
        } else {
            scroll.x.update_pos();
        }
    }
});

function getScroll(direction) {
    if(direction == "y") {
        return $( document ).scrollTop();
    } else if(direction == "x") {
        return window.pageXOffset || document.documentElement.scrollLeft;
    } else {
        return false;
    }
}

/* usage:
== Events:

$( document ).on('scroll_x_only', function() {
    console.log("scrolling X only!");
});

$( document ).on('scroll_y_only', function() {
    console.log("scrolling y only!");
});

$( document ).on('scroll_y_and_x', function() {
    console.log("scrolling y and x!");
});

== disable scroling:
scroll.y.enabled = false;
scroll.x.enabled = false;

== TODO:
pass params to events, like "Up", "down", "right", "left".
*/
