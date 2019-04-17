import * as icarus from 'icarus'

vwo_$(function() {

    if (!document.querySelector('.test01_loaded')) {
        t01Changes();
    }else {
        return;
    }

function t01Changes() {
    vwo_$('body').addClass('test01_loaded');

    icarus.hotjar.trigger('Test01');
    icarus.hotjar.tag(['Test01', 'Control']);
    icarus.ga.sendEvent({
        trackingId: '',
        dimensionNumber: '',
        campaignName: 'Test01 - Control',
        notInteractive: true,
        category: 'iPro CRO',
        action: 'Test loaded',
        label: 'Test01 - Control'
    });
}

});