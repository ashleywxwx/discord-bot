const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { generateImage } = require('../services/imageGeneration');
const { downloadImage } = require('../services/file');

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
			const localImagePath = 'temp/temp.png';
			await downloadImage(imageUrl, localImagePath);
			const file = new AttachmentBuilder(localImagePath);
			const imageEmbed = buildImageEmbed(prompt);
			await interaction.editReply({ embeds: [imageEmbed], files: [file] });
		} catch (e) {
			await interaction.editReply({ content: `Yar, there be a problem with ye request: ${e.message}` });
		}
	},
};

const buildImageEmbed = prompt => new EmbedBuilder()
	.setTitle('Behold, mysteries of the sea!')
	.setAuthor({
		name: 'Powered By OpenAI',
		iconURL: 'https://yt3.ggpht.com/a/AATXAJzYT1rumwOdi0mza2hb91s3-7nQVtUSVDEBXQ=s900-c-k-c0xffffffff-no-rj-mo',
		url: 'https://openai.com/',
	})
	.setDescription(`I've had the crew to bring you "${prompt}". You can expand it and download it if you'd like. I won't tell.`)
	.setImage('attachment://temp.png')
	.setFooter({ text: 'This image was uploaded to Discord. Forever.' });