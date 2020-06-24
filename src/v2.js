import DDLtrackCampaign from './common.js';
import { pollFor } from 'icarus';
import './v2.scss';

const testVar = 'Variation 2';

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

	let text = `<p>How does People's Postcode Lottery work? <span class="ddl-click-ev">Watch this video</span><span class="ddl-bold"> to find out more</span></p>`;

	// $(text).insertAfter('div#cms-block-326 .cms-rich-text p');

	let add = `<iframe class="how-it-works-intro__video-iframe" width="600" height="338" src="//www.youtube.com/embed/5-3RVBve-fQ?rel=0&amp;autoplay=0&amp;loop=0&amp;enablejsapi=1&amp;disablekb=0&amp;egm=0&amp;border=0&amp;fs=1&amp;start=0&amp;hd=1&amp;showsearch=0&amp;showinfo=0&amp;iv_load_policy=1&amp;cc_load_policy=1&amp;wmode=window" frameborder="0" id="widget2" ></iframe>`;

	let overlay = `<div class="ddl-overlay"></div>`;

	let button = `<button type="button" class="close">
                    <svg class="icon"><use xlink:href="#icon-cancel"></use></svg>
					</button>`;

	pollFor(
		function() {
			return typeof $ !== 'undefined' && typeof $ !== undefined;
		},
		function() {
			$(document).ready(function() {
				console.log('run code outer poller');
				pollFor(
					() => {
						return document.querySelector('#react-salesflow-container').length !== 0;
					},
					() => {
						console.log('outside of settimeout');
						setTimeout(() => {
							console.log('inside of settimeout');
							$(text).insertAfter('div#cms-block-326 .cms-rich-text p');
							$(overlay).appendTo('body');
							$(button).appendTo('.ddl-overlay');
							$(add).appendTo('.ddl-overlay');

							document.querySelector('span.ddl-click-ev').addEventListener('click', function() {
								$('.ddl-overlay').addClass('ddl-show');
								DDLtrackCampaign(testVar, 'video-link-clicked');

								pollFor(
									() => {
										return document.querySelector('.how-it-works-intro__video-iframe').length !== 0;
									},
									() => {
										$('.ddl-overlay .close').on('click', function() {
											$('.ddl-overlay').removeClass('ddl-show');
											// document.querySelector('video').pause();
											// document.querySelector('.html5-video-container video').pause();
											let iframe = document.querySelector('.how-it-works-intro__video-iframe');
											var iframeSrc = iframe.src;
											iframe.src = iframeSrc;
										});
									}
								);
							});
						}, 1000);
					}
				);
			});
		}
	);
}
