const { SlashCommandBuilder } = require('discord.js');
const { generateImage } = require('../services/imageGeneration');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('generate-image')
		.setDescription('Describe an image, and one will be generated')
		.addStringOption(option =>
			option
				.setName('description')
				.setDescription('Prompt description')),
	async execute(interaction) {
		const prompt = interaction.options.getString('description');
		await interaction.deferReply();
		const imageUrl = await generateImage(prompt);
		await interaction.editReply(`Here your image for "${prompt}": ${imageUrl}`);
	},
};
