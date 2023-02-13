const { REST, Routes } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);
