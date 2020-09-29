import { ga } from 'icarus'
import { hotjar } from 'icarus'

// Editable test settings
const testName = 'Test01', // Add test name
  trackingId = 'TRACKINGID', // Add GA tracking ID
  dimensionIndex = 'DIMENSION NUMBER'; // Add GA dimension

// Non-Editable settings
const ddlDebug = window.location.search.toLowerCase().indexOf('ddldebug=1') > -1,
  consoleTableSupport = typeof console.table !== "undefined";


// Manual GA and Hotjar campaign tracking
export function DDLtrackCampaign(testVar) {
  // creating vaibles
  var strippedTestName = testName.replace(/[^0-9a-zA-Z]+/g, '_'), // strip out special characters for HJ trigger
    strippedTestVar = testVar.replace(/[^0-9a-zA-Z]+/g, '_'), // strip out special characters for HJ trigger
    testNameandVar = testName + ' - ' + testVar,
    trackingEventAction = 'Test loaded',
    trackingEventLabel = testNameandVar,
    trackingEventValue = 0;

  // hotjar tracking
  hotjar.trigger(`${strippedTestName}_${strippedTestVar}`);
  hotjar.tag([testName, `${testName} - ${testVar}`]);

  // GA Tracking
  ga.sendEvent({
    trackingId: trackingId,
    dimensionNumber: dimensionIndex,
    campaignName: testNameandVar,
    notInteractive: true,
    category: 'DDL CRO',
    action: trackingEventAction,
    label: trackingEventLabel,
    value: trackingEventValue
  });

  // ddlDebug
  if (ddlDebug && consoleTableSupport) {
    console.warn('//// DDL Debug Campaign Tracking Start ////')

    console.log(`GA Data\nTracking ID - ${trackingId}\nDimension Number - ${dimensionIndex}`)

    // Campaign Event
    console.table({
      ddlDebug: new ddlDebugEventFunction("DDL CRO", trackingEventAction, trackingEventLabel, trackingEventValue)
    });

    // Hotjar 
    console.log('Hotjar Data')
    console.table({
      ddlDebug: new ddlDebugHotjarCampaignFunction(`${strippedTestName}_${strippedTestVar}`, testName, `${testName} - ${testVar}`)
    });

    console.warn('//// DDL Debug Campaign Tracking End ////')
  } else if (ddlDebug === true && consoleTableSupport === false) {
    console.warn('//// DDL Debug Not Supported ////')
  }
};

// Manual GA custom event tracking
export function DDLtrackEvent(testVar, eventAction, eventLabel, eventValue) {
  // creating vaibles
  var trackingEventAction = (eventAction === undefined) ? 'Test loaded' : eventAction,
    trackingEventLabel = (eventLabel === undefined) ? `${testName} - ${testVar}` : eventLabel,
    trackingEventValue = (eventValue === undefined) ? 0 : eventValue

  // GA Tracking
  ga.sendEvent({
    trackingId: trackingId,
    notInteractive: true,
    category: 'DDL CRO',
    action: trackingEventAction,
    label: trackingEventLabel,
    value: trackingEventValue
  });

  // ddlDebug 
  if (ddlDebug && consoleTableSupport) {
    console.warn('//// DDL Debug Custom Event Tracking Start ////')

    // Custom Events
    console.table({
      ddlDebug: new ddlDebugEventFunction("DDL CRO", trackingEventAction, trackingEventLabel, trackingEventValue)
    });

    console.warn('//// DDL Debug Custom Event Tracking End ////')
  }

};

export function HotjarTracking(testVar, hotjarVarible) {
  // creating vaibles
  var strippedTestName = testName.replace(/[^0-9a-zA-Z]+/g, '_'), // strip out special characters for HJ trigger
    strippedTestVar = testVar.replace(/[^0-9a-zA-Z]+/g, '_'), // strip out special characters for HJ trigger 
    strippedhotjarVarible = hotjarVarible.replace(/[^0-9a-zA-Z]+/g, '_'), // strip out special characters for HJ trigger
    hotjarTrigger = `${strippedTestName}_${strippedTestVar}-${strippedhotjarVarible}`,
    hotjarTag = `${testName} - ${testVar} - ${hotjarVarible}`;

  // hotjar tracking
  hotjar.trigger(hotjarTrigger);
  hotjar.tag([hotjarTag]);

  // ddlDebug 
  if (ddlDebug && consoleTableSupport) {
    console.warn('//// DDL Debug Hotjar Start ////')

    // Hotjar 
    console.table({
      ddlDebug: new ddlDebugHotjarVaribleFunction(hotjarTrigger, hotjarTag)
    });

    console.warn('//// DDL Debug Hotjar End ////')
  }
};

function ddlDebugEventFunction(eventCategory, trackingEventAction, trackingEventLabel, trackingEventValue) {
  this.eventCategory = eventCategory;
  this.eventAction = trackingEventAction;
  this.eventLabel = trackingEventLabel;
  this.eventValue = trackingEventValue;
}

function ddlDebugHotjarCampaignFunction(hotjarTrigger_data, hotjarTag_TestID_data, hotjarTag_Variation_data) {
  this.hotjarTrigger = hotjarTrigger_data;
  this.hotjarTag_TestID = hotjarTag_TestID_data;
  this.hotjarTag_Variation = hotjarTag_Variation_data;
}

function ddlDebugHotjarVaribleFunction(hotjarTrigger_data, hotjarTag_data) {
  this.hotjarTrigger = hotjarTrigger_data;
  this.hotjarTag = hotjarTag_data;
}