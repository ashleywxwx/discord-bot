const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async prompt => {
	console.log(`Generating image for ${prompt}`);
	if (!configuration.apiKey) {
		console.error('No OpenAI key found');
	}

	if (!prompt || prompt.trim().length === 0) {
		console.error('0 length prompt submitted');
		return 'I can\'t generate nothing';
	}

	try {
		const response = await openai.createImage({
			prompt,
			n: 1,
			size: '1024x1024',
		});
		return response.data.data[0].url;
	} catch (error) {
		if (error.response) {
			console.error(error.response.status, error.response.data);
			return 'Something went wrong';
		} else {
			console.error(`Error with OpenAI API request: ${error.message}`);
			return 'Something else went wrong';
		}
	}
};

module.exports = { generateImage };