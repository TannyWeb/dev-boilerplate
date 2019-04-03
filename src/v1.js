import sendGAevent from 'icarus/ga/sendGaEvent'
import './v1.scss';

vwo_$(function() {

    if (!document.querySelector('.test01_loaded')) {
        t01Changes();
    }else {
        return;
    }

function t01Changes() {
    vwo_$('body').addClass('test01_loaded')

    hotJarTrigger('Test01', 'Variation_1');
    sendGAevent({
        trackingId: '',
        dimensionNumber: '',
        campaignName: 'Test01 - Variation 1',
        notInteractive: true,
        category: 'iPro CRO',
        action: 'Test loaded',
        label: 'Test01 - Variation 1'
    });
}


function hotJarTrigger(campaignName, campaignVariation) {
    window.hj = window.hj || function() {
        (hj.q = hj.q || []).push(arguments);
    };
    window.hj('trigger', campaignVariation);
    window.hj('tagRecording', [campaignName, campaignVariation]);
}

});