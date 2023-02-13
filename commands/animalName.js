const { SlashCommandBuilder } = require('discord.js');
const { getAnimalNames } = require('../services/animalNames');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('animal-name')
		.setDescription('Tell me an animal, and I\'ll think up some names')
		.addStringOption(option =>
			option
				.setName('animal')
				.setDescription('Type of animal to generate names for')),
	async execute(interaction) {
		const animal = interaction.options.getString('animal');
		const suggestions = await getAnimalNames(animal);
		await interaction.reply(`Here are some name ideas for a ${animal}: ${suggestions}`);
	},
};
