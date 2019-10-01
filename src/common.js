import { ga } from 'icarus'
import { hotjar } from 'icarus'


// Editable test settings
const testName = 'Test 01', // Add test name
        trackingId = '', // Add GA tracking ID
        dimensionIndex  = ''; // Add GA dimension



// Manual GA and Hotjar tracking
function DDLtrackCampaign(testVar, eventAction) {
    let strippedTestName = testName.replace(/[^0-9a-zA-Z]+/g, '_'), // strip out special characters for HJ trigger
        strippedTestVar = testVar.replace(/[^0-9a-zA-Z]+/g, '_'); // strip out special characters for HJ trigger

    hotjar.trigger(`${strippedTestName}_${strippedTestVar}`);
    hotjar.tag([testName, `${testName} - ${testVar}`]);
    ga.sendEvent({
        trackingId: trackingId, 
        dimensionNumber: dimensionIndex, 
        campaignName: `${testName} - ${testVar}`,
        notInteractive: true,
        category: 'DDL CRO',
        action: (eventAction === undefined) ? 'Test loaded' : eventAction,
        label: `${testName} - ${testVar}`
    });
};

export default DDLtrackCampaign