import DDLtrackCampaign from './common.js'
import { pollFor } from 'icarus'
import './v1.scss'

const testVar = 'Variation 1';

pollFor('body', initJDW16)

function initJDW16() {
    if (document.body.className.indexOf('jdw16_loaded') === -1) {
        DDLtrackCampaign(testVar); // general campaign tracking
        JDW16Changes();
    } else {
        console.warn('Experiment not loaded');
    }
}


function JDW16Changes() {
    document.body.classList.add('jdw16_loaded');

    DDLtrackCampaign(testVar, 'CTA clicked'); // event tracking

    // your test changes go here

}
