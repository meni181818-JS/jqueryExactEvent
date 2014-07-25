// listen to scroll event on #document
$( document ).scroll(function(e) {
    scrollingHandler(e);
});
// listen to scroll event on all other elements
$( "*" ).scroll(function(e) {
    scrollingHandler(e);
});

// handle scrolling event of ALL elements
function scrollingHandler(e) {
    // check if the scrolled element have 'scrollE' prop
    $( e.target ).checkScrollRegistration();
    
    var scrollE = $( e.target )['0'].scrollE;
    direction = {y: null, x: null}; // up or down or right or left

    if(scrollE.y.last_pos != $( e.target ).scrollTop() && scrollE.x.last_pos == $( e.target ).scrollLeft()) { // if only y scrolled
        direction.y = getUDRLdirection('y'); // set the 'direction.y' ('right' or 'left')
        $( e.target ).trigger({ type: "scroll_y_only", direction: direction }); // fire the 'scroll_y_only' and pass the 'direction' object
        checkIfBlockOrUpdate('y'); // block the scrolling if set to 'enabled = false', if not - update last_pos
        
    } else if(scrollE.y.last_pos == $( e.target ).scrollTop() && scrollE.x.last_pos != $( e.target ).scrollLeft()) { // if only x scroled
        direction.x = getUDRLdirection('x'); // set the 'direction.x' ('right' or 'left')
        $( e.target ).trigger({type: "scroll_x_only", direction: direction }); // fire the 'scroll_x_only' and pass the 'direction' object
        checkIfBlockOrUpdate('x'); // block the scrolling if set to 'enabled = false', if not - update last_pos
        
    } else if(scrollE.y.last_pos != $( e.target ).scrollTop() && scrollE.x.last_pos != $( e.target ).scrollLeft()) { // if scroll y AND x
        direction.y = getUDRLdirection('y'); // set the 'direction.y' ('right' or 'left')
        direction.x = getUDRLdirection('x'); // set the 'direction.x' ('right' or 'left')
        
        $( e.target ).trigger( "scroll_y_and_x" ); // fire the 'scroll_y_and_x' and pass the 'direction' object
        
        checkIfBlockOrUpdate('y'); // block the scrolling if set to 'enabled = false', if not - update last_pos
        checkIfBlockOrUpdate('x'); // block the scrolling if set to 'enabled = false', if not - update last_pos
    }
    
    // check ans return if the scroll was up or down or right or left. 'side' dan be 'y', 'x'
    function getUDRLdirection(side) {
        if(side == 'y') {
            if($( e.target ).scrollTop() > scrollE.y.last_pos) {
                return 'down';
            } else {
                return 'up';
            }
        } else if(side == 'x') {
            if($( e.target ).scrollLeft() > scrollE.x.last_pos) {
                return 'right';
            } else {
                return 'left';
            }
        } else {
            return false;
        }
    }
    
    // block the scroll if set to enabled = false. if enabled = true, update last_pos
    function checkIfBlockOrUpdate(side) {
        if(side == 'y') {
            if(scrollE.y.enabled == false) {
                $( e.target ).scrollTop(scrollE.y.last_pos);
            } else {
                scrollE.y.last_pos = $( e.target ).scrollTop();
            } 
        } else if(side == 'x') {
            if(scrollE.x.enabled == false) {
                 $( e.target ).scrollLeft(scrollE.x.last_pos);
            } else {
                scrollE.x.last_pos = $( e.target ).scrollLeft();
            } 
        }
    }
    
} // END scrollingHandler

// register new Scroll Element by add scrollE object
$.fn.registerScrollElement = function() {
    elemontObj = this['0'];
    var scrollObj = {y: {last_pos: 0, enabled: true},
                     x: {last_pos: 0, enabled: true}};
    elemontObj.scrollE = $.extend(true, {}, scrollObj);
    // update the 'last_pos' properties to the current position
    elemontObj.scrollE.y.last_pos = $( this ).scrollTop();
    elemontObj.scrollE.x.last_pos = $( this ).scrollLeft();
    return this;
}

// update Last Scroll Pos to current pos (params can by: 'all', 'y', 'x')
/* $.fn.updateLastScrollPos = function(which) {
    elemontObj = this['0'];
    if(which == 'all') {
        elemontObj.scrollE.y.last_pos = $( this ).scrollTop();
        elemontObj.scrollE.x.last_pos = $( this ).scrollLeft();
    } else if(which == 'y') {
        elemontObj.scrollE.y.last_pos = $( this ).scrollTop();
    } else if(which == 'x') {
        elemontObj.scrollE.x.last_pos = $( this ).scrollLeft();
    }
    return this;
} */

// check if the element is registered for 'scrollE' object
$.fn.checkScrollRegistration = function() {
    elemontObj = this['0'];
    if(elemontObj.hasOwnProperty('scrollE') == false) { // if not registered
        // register it
        $( this ).registerScrollElement();
    }
    return this;
}

// change the 'enabled' state of some side. side can be: 'y' or 'x'. bool can be: true or false
$.fn.enableScroll = function(side, bool) {
    $( this ).checkScrollRegistration();
    elemontObj = this['0'];
    if(side == 'y') { // update Last Scroll Pos (to lock on current pos)
        elemontObj.scrollE.y.last_pos = $( this ).scrollTop();
    } else if(side == 'x') {
        elemontObj.scrollE.x.last_pos = $( this ).scrollLeft();
    }
    elemontObj.scrollE[side].enabled = bool;
    return this;
}

