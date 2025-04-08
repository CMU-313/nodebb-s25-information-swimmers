'use strict';

require('request');

const translatorApi = module.exports;

translatorApi.translate = async function (postData) {
	// Edit the translator URL below
	// const TRANSLATOR_API = 'http://17313-team02.s3d.cmu.edu:5000';
	const TRANSLATOR_API = 'http://translator:5000';
	try {
		const response = await fetch(`${TRANSLATOR_API}/?content=${postData.content}`);
		const data = await response.json();
		console.log(data);
		return [data.is_english, data.translated_content];
	} catch (error) {
		console.error('Error translating content:', error);
		return [true, postData.content || ''];
	}
};
