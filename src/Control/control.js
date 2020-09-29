import { DDLtrackCampaign, DDLtrackEvent, HotjarTracking} from '../Common/ddl_tracking.js'
import { pollFor } from 'icarus'

const testVar = 'Control';

pollFor('body', initT01)

function initT01() {
    if (document.body.className.indexOf('test01_loaded') === -1) {
        DDLtrackCampaign(testVar); // general campaign tracking
        t01Changes();
    } else {
        console.warn('Experiment not loaded');
    }
}

function t01Changes() {
    document.body.classList.add('test01_loaded');

    // your test changes go here

    // Tracking Helpers
    // DDLtrackEvent(testVar, 'Test CTA clicked', 'with Label', 2); // event tracking (testVar, 'action', 'label', 'value')
    // HotjarTracking(testVar, 'Custom Varible'); // hotjar (testVar, 'Custom Variable')

}
