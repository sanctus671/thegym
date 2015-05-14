// Dictionary of beacons.
var beacons = {};

// Timer that displays list of beacons.
var updateTimer = null;

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

        startScan();
        updateTimer = setInterval(displayBeaconList, 1000);
    },

    startScan: function()
    {
        function onBeaconsRanged(beaconInfo)
        {
            //console.log('onBeaconsRanged: ' + JSON.stringify(beaconInfo))
            for (var i in beaconInfo.beacons)
            {
                // Insert beacon into table of found beacons.
                // Filter out beacons with invalid RSSI values.
                var beacon = beaconInfo.beacons[i];
                if (beacon.rssi < 0)
                {
                    beacon.timeStamp = Date.now();
                    var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
                    beacons[key] = beacon;
                }
            }
        }

        function onError(errorMessage)
        {
            console.log('Ranging beacons did fail: ' + errorMessage);
        }

        // Request permission from user to access location info.
        // This is needed on iOS 8.
        estimote.beacons.requestAlwaysAuthorization();

        // Start ranging beacons.
        estimote.beacons.startRangingBeaconsInRegion(
            {}, // Empty region matches all beacons
                // with the Estimote factory set UUID.
            this.onBeaconsRanged,
            this.onError);
    },


    displayBeaconList: function()
    {
        // Clear beacon list.
        $('#found-beacons').empty();


        var timeNow = Date.now();

        // Update beacon list.
        $.each(beacons, function(key, beacon)
        {
            // Only show beacons that are updated during the last 60 seconds.
            if (beacon.timeStamp + 60000 > timeNow)
            {
                // Create tag to display beacon data.
                var element = $(
                    '<li>'
                    +   'Major: ' + beacon.major + '<br />'
                    +   'Minor: ' + beacon.minor + '<br />'
                    + '</li>'
                );

                $('#found-beacons').append(element);
            }
        });
    }    

};
