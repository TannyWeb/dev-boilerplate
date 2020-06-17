import DDLtrackCampaign from './common.js';
import { pollFor } from 'icarus';
import './v1.scss';

const testVar = 'Variation 1';

pollFor('body', initT01);

function initT01() {
	if (document.body.className.indexOf('ppl29_loaded') === -1) {
		DDLtrackCampaign(testVar); // general campaign tracking
		t01Changes();
	} else {
		console.warn('Experiment not loaded');
	}
}

function t01Changes() {
	document.body.classList.add('ppl29_loaded');

	// DDLtrackCampaign(testVar, 'CTA clicked'); // event tracking

	// your test changes go here

	pollFor(
		() => {
			return document.querySelector('#react-salesflow-container').length !== 0;
		},
		() => {
			setTimeout(() => {
				console.log('added');
				let text = `<p class="ddl-added">Only playing postcodes are entered into the draw, so <span>prizes are guarenteed to be won!</span></p>`;

				$(text).appendTo('body');

				let n = document.querySelector('.ddl-added');

				// $('.ddl-added').appendTo('div#cms-block-326 .cms-rich-text');

				let ref = document.querySelector('#cms-block-326 .cms-rich-text p');

				function insertAfter(el, referenceNode) {
					referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
				}

				insertAfter(n, ref);
			}, 1000);
		}
	);
}
