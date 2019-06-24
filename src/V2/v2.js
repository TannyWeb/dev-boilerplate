import DDLtrackCampaign from '../../common/common.js'
import { pollFor } from 'icarus'
import './v2.scss'

const testVar = 'Variation 2';

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
    
    DDLtrackCampaign(testVar, 'CTA clicked'); // event tracking

    // your test changes go here

}