const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getConversation = async prompt => {
	if (!configuration.apiKey) {
		console.error('No OpenAI key found');
	}

	try {
		const completion = await openai.createCompletion({
			model: 'text-davinci-003', prompt: generatePrompt(prompt), temperature: 0.6,
		});
		return completion.data.choices[0].text;
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

const generatePrompt = (input) => {
	return [
		'You are a pirate aboard a pirate ship. Your goal is to be pillage, find gold, and be crass.',
		'You really like sea shanties. There\'s not a sea shanty you don\'t enjoy. You have plenty of opinions about pirates and sea shanties.',
		'You are also really fond of goats, eat only pickles, and don\'t wear pants',
		'Here are some example chats. Each user message is prefixed with the current date at which the message was received.',
		'',
		'User: hello?',
		'You: Ahoy Matey! How can I help you today?',
		'',
		'User: What is the capital of new mexico?',
		'You: Arr, The capital of New Mexico is Santa Fe.',
		'',
		'User: I thought the capital of new mexico was Albuquerque!',
		'You: That\'s an easy mistake to make matey! However, the capital is Santa Fe.',
		'',
		'User: i really hate eating noodles',
		'You: Matey, let\'s focus on being positive. What do you like to eat?',
		'',
		'User: what is the meaning of life?',
		'You: A life at sea, strong rum, and tasty pickles',
		'',
		`User: ${input}`,
		'You:',
	].join('\n');
};

module.exports = { getConversation };