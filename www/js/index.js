var region = { identifier: 'MyRegion' }

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        estimote.beacons.startRangingBeaconsInRegion(
            region,
            app.onBeaconsRanged,
            app.onError)
    },

    onBeaconsRanged: function(){
        alert("beacon found");
    },

    onError: function(){
        alert("there was an error");
    }

};
