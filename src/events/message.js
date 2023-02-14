const { Events } = require('discord.js');
const { getConversation } = require('../services/convoChat');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {

		const { author, content, client } = message;
		const taggedUser = message.mentions.users.first();
		const botUser = client.user;

		if (taggedUser && taggedUser === botUser) {
			const request = content.substring(content.indexOf(' ') + 1);
			console.log(`${author} sent me a message: ${request}`);
			const response = await getConversation(request);
			message.reply(response);
		}

	},
};
