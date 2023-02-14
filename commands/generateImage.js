const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
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

		try {
			const imageUrl = await generateImage(prompt);

			const imageEmbed = new EmbedBuilder()
				.setTitle('Behold, mysteries of the sea!')
				.setAuthor({
					name: 'Powered By OpenAI',
					iconURL: 'https://yt3.ggpht.com/a/AATXAJzYT1rumwOdi0mza2hb91s3-7nQVtUSVDEBXQ=s900-c-k-c0xffffffff-no-rj-mo',
					url: 'https://openai.com/',
				})
				.setDescription(`I've had the crew to bring you ${prompt}`)
				.setImage(imageUrl)
				.setFooter({ text: 'This image will self destruct in one hour.' });

			await interaction.editReply({ embeds: [imageEmbed] });
		} catch (e) {
			await interaction.editReply({ content: `Yar, there be a problem with ye request: ${e.message}` });
		}
	},
};
