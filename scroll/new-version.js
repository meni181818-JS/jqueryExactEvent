$( "#b" ).click(function() {
    $( document ).registerScrollElement();
    $( document ).updateLastScrollPos('y');
    
    console.log($( document )['0'].scrollE);
});

$( "#c" ).click(function() {
    $( document ).enabledScroll('y', false);
    console.log($( document )['0'].scrollE);
    console.log($( document )['0'].hasOwnProperty('scrollE'));
});


function getScrollPos(element ,direction) {
    if(direction == "y") {
        return $( element ).scrollTop();
    } else if(direction == "x") {
        return $( element ).scrollLeft();
    } else {
        return false;
    }
}



// register new Scroll Element by add scrollE object
$.fn.registerScrollElement = function() {
    elemontObj = this['0'];
    var scrollObj = {y: {last_pos: 0, enabled: true},
                     x: {last_pos: 0, enabled: true}};
    elemontObj.scrollE = $.extend(true, {}, scrollObj);
    $( this ).updateLastScrollPos('all');
    return this;
}

// update Last Scroll Pos to current pos (param can by: 'all', 'y', 'x')
$.fn.updateLastScrollPos = function(which) {
    elemontObj = this['0'];
    if(which == 'all') {
        elemontObj.scrollE.y.last_pos = getScrollPos(this ,'y');
        elemontObj.scrollE.x.last_pos = getScrollPos(this ,'x');
    } else {
        elemontObj.scrollE[which].last_pos = getScrollPos(this ,which);
    }
    
    return this;
}

// change the 'enabled' state of some direction
$.fn.enabledScroll = function(direction, bool) {
    elemontObj = this['0'];
    $( this ).updateLastScrollPos(); // update Last Scroll Pos to lock on current pos
    elemontObj.scrollE[direction].enabled = bool;
    return this;
}

$( document ).scroll(function(e) {
    scrollingHandler(e);
});
$( "*" ).scroll(function(e) {
    scrollingHandler(e);
});

// handle scrolling event of ALL elements
function scrollingHandler(e) {
    // if the scrolled element does not have 'scrollE' prop
    if($( e.target )['0'].hasOwnProperty('scrollE') == false) {
        $( e.target ).registerScrollElement();
        console.log($( e.target )['0'].scrollE);
    }   
    
    var scrollE = $( e.target )['0'].scrollE;
    
    if(scrollE.y.last_pos != getScrollPos(e.target ,'y') && scrollE.x.last_pos == getScrollPos(e.target ,'x')) { // if only y scrolled
        $( e.target ).trigger("scroll_y_only");
        if(scrollE.y.enabled == false) { // block the y scroll if set to enabled = false
            $( e.target ).scrollTop(scrollE.y.last_pos); 
        } else {
            $( e.target ).updateLastScrollPos('y');
        }
    } else if(scrollE.y.last_pos == getScrollPos(e.target ,'y') && scrollE.x.last_pos != getScrollPos(e.target ,'x')) { // if only x scroled
        $( e.target ).trigger({type: "scroll_x_only", e: e });
        if(scrollE.x.enabled == false) { // block the x scroll if set to enabled = false
            window.scrollTo(scrollE.x.last_pos, null); 
        } else {
            $( e.target ).updateLastScrollPos('x');
        }
    } else if(scrollE.y.last_pos != getScrollPos(e.target ,'y') && scrollE.x.last_pos != getScrollPos(e.target ,'x')) { // if scroll y AND x
        $( e.target ).trigger( "scroll_y_and_x" );
        if(scrollE.y.enabled == false) { // block the y scroll if set to enabled = false
            $( e.target ).scrollTop(scroll.y.last_pos); 
        } else {
            $( e.target ).updateLastScrollPos('y');
        }
        if(scrollE.x.enabled == false) { // block the x scroll if set to enabled = false
            window.scrollTo(scrollE.x.last_pos, null); 
        } else {
            $( e.target ).updateLastScrollPos('x');
        }
    }
    
    // end copy
        
    
}


$( "#demo" ).on('scroll_y_only', function() {
    console.log('scroll_y_only');
});

$( document ).on('scroll_x_only', function(e) {
    if(e.target.nodeName == '#document') {
        console.log('#document was scrolled');
    } else {
        // do nothing
    }
    
});



