// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

function groupOfKey(arr, key) {
    var ret = {};
    for (var i = 0; i < arr.length; i++) {
        var keyval = arr[i][key];
        if (!ret[keyval]) ret[keyval] = [];
        ret[keyval].push(arr[i]);
    }
    return ret;
}

function arrayOfKey(arr, key) {
    var ret = [];
    for (arrkey in arr) {
        ret.push(arr[arrkey][key]);
    }
    return ret;
}

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}   
 
var store = function store(key, value) {
 
    var lsSupport = false;
    
    // Check for native support
    if (localStorage) {
        lsSupport = true;
    }
    
    // If value is detected, set new or modify store
    if (typeof value !== "undefined" && value !== null) {
        // Convert object values to JSON
        if ( typeof value === 'object' ) {
            value = JSON.stringify(value);
        }
        // Set the store
        if (lsSupport) { // Native support
            localStorage.setItem(key, value);
        } else { // Use Cookie
            createCookie(key, value, 30);
        }
    }
    
    // No value supplied, return value
    if (typeof value === "undefined") {
        // Get value
        if (lsSupport) { // Native support
            data = localStorage.getItem(key);
        } else { // Use cookie 
            data = readCookie(key);
        }
        
        // Try to parse JSON...
        try {
           data = JSON.parse(data);
        }
        catch(e) {
           data = data;
        }
        
        return data;
        
    }
    
    // Null specified, remove store
    if (value === null) {
        if (lsSupport) { // Native support
            localStorage.removeItem(key);
        } else { // Use cookie
            createCookie(key, '', -1);
        }
    }
    
    /**
     * Creates new cookie or removes cookie with negative expiration
     * @param  key       The key or identifier for the store
     * @param  value     Contents of the store
     * @param  exp       Expiration - creation defaults to 30 days
     */
    
    function createCookie(key, value, exp) {
        var date = new Date();
        date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = key + "=" + value + expires + "; path=/";
    }
    
    /**
     * Returns contents of cookie
     * @param  key       The key or identifier for the store
     */
    
    function readCookie(key) {
        var nameEQ = key + "=";
        var ca = document.cookie.split(';');
        for (var i = 0, max = ca.length; i < max; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
};