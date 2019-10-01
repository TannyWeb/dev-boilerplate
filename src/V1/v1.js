import DDLtrackCampaign from '../common/functions/ddl_track';
import { pollFor } from 'icarus'
import './styles/v1.scss'

const testVar = 'Variation 1';

pollFor('body', initMS73)

function initMS73() {
    if (document.body.className.indexOf('MS73_loaded') === -1) {
        DDLtrackCampaign(testVar); // general campaign tracking
        MS73Changes();
    } else {
        console.warn('Experiment not loaded');
    }
}
    

function MS73Changes() {
    document.body.classList.add('MS73_loaded');
    
    DDLtrackCampaign(testVar, 'CTA clicked'); // event tracking

    // your test changes go here

}