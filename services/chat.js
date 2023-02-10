const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getAnimalNames = async animal => {
	console.log(`Getting names for ${animal}`);
	if (!configuration.apiKey) {
		console.error('No OpenAI key found');
	}

	if (!animal || animal.trim().length === 0) {
		console.error('0 length animal submitted');
		return 'That\'s not an animal';
	}

	try {
		const completion = await openai.createCompletion({
			model: 'text-davinci-003', prompt: generatePrompt(animal), temperature: 0.6,
		});
		return completion.data.choices[0].text;
	} catch (error) {
		// Consider adjusting the error handling logic for your use case
		if (error.response) {
			console.error(error.response.status, error.response.data);
			return 'Something went wrong';
		} else {
			console.error(`Error with OpenAI API request: ${error.message}`);
			return 'Something else went wrong';
		}
	}
};

function generatePrompt(animal) {
	const capitalizedAnimal = animal[0].toUpperCase() + animal.slice(1).toLowerCase();
	return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}

module.exports = { getAnimalNames };