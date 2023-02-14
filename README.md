# Discord Bot

A Discord bot powered by OpenAI and discord.js

Supports:

* Conversation via @ messages to the bot
* Generate animal names with /animal-names
* Generate images with /generate-image

## Setup

Create a `.env` file with the following populated:

Example bot permissions: `https://discord.com/api/oauth2/authorize?client_id=REDACTED&permissions=0&scope=bot%20applications.commands`

```
DISCORD_BOT_TOKEN=xxx
DISCORD_CLIENT_ID=xxx
DISCORD_GUILD_ID=xxx
```

## Lint

`npm run lint`

## Deploy

`npm run deploy`

## Start

`npm start`

## Clean Up

`npm run destroy`