const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	execute(message) {

		const { author, content, client } = message;
		const taggedUser = message.mentions.users.first();
		const botUser = client.user;

		if (taggedUser && taggedUser === botUser) {
			console.log(`${author} sent me a message: ${content}`);
			message.reply('Hello there');
		}

	},
};
