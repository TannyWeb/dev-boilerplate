vwo_$(function() {

    if (!document.querySelector('.test01_loaded')) {
        t01Changes();
    }else {
        return;
    }

function t01Changes() {
    vwo_$('body').addClass('test01_loaded')

    hotJarTrigger('Test01', 'Control');
    sendGAevent({
        trackingId: '',
        dimensionNumber: '',
        campaignName: 'Test01 - Control',
        notInteractive: true,
        category: 'iPro CRO',
        action: 'Test loaded',
        label: 'Test01 - Control'
    });
}


function hotJarTrigger(campaignName, campaignVariation) {
    window.hj = window.hj || function() {
        (hj.q = hj.q || []).push(arguments);
    };
    window.hj('trigger', campaignVariation);
    window.hj('tagRecording', [campaignName, campaignVariation]);
}

function sendGAevent(gaPayload) {

    var trackerObject = 'undefined';
    
    initialiseGATracking(gaPayload);

    function initialiseGATracking(data) {

        if (typeof ga === 'function' && ga.loaded) {
            // for debugging only
            console.log('ga loaded')
            return getTrackerName(data);
        }else {
            // for debugging only
            console.log('ga not loaded')
            setLooper(initialiseGATracking, data, 750, 15000)  // stop looping if GA or tracker are not found after 15s
        }
    }

    function getTrackerName(data) {
        var allTrackers;
    
        // use ga object methods inside a readyCallback as they're guaranteed to be available
        ga(function(){
            allTrackers = ga.getAll();

            trackerObject = allTrackers.reduce(function(trackers, tracker) {
                if (tracker.get('trackingId') === data.trackingId) return tracker;
                    return trackers; // accumulator always has to be returned in the reduce method
            });
    
            if (data.dimensionNumber) setGAdimension(data);
            else sendEvent(data);
        });
        
    }

    function setGAdimension(data) {
        trackerObject.set('dimension' + data.dimensionNumber, data.campaignName)
        
        // for debugging only
        console.log('Set dimension' + data.dimensionNumber, data.campaignName)
        return sendEvent(data);
    }

    function sendEvent(data) {
        trackerObject.send('event', {
                nonInteraction: data.notInteractive,
                eventCategory: data.category || 'iPro CRO',
                eventAction: data.action,
                eventLabel: data.label
        });

        // for debugging only
        console.log('event set', data.notInteractive, data.category, data.action, data.label)
    }

    function setLooper(functionToLoop, params, timeToLoop, timeToStop) {

        var initialiserLoop = setTimeout(function() {
                functionToLoop(params); 
            }, timeToLoop);

        setTimeout(function(){
            clearTimeout(initialiserLoop); // stop looping after 15s
        }, timeToStop);
    }
}


});