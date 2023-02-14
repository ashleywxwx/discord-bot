// Inspired by https://dev.to/masbagal/saving-image-from-url-using-node-js-5an6
const fs = require('fs');
const fetch = require('node-fetch');

async function downloadImage(url, destination) {
	const response = await fetch(url);
	const buffer = await response.buffer();
	// eslint-disable-next-line no-empty-function
	fs.writeFile(destination, buffer, () => {});
}

module.exports = { downloadImage };