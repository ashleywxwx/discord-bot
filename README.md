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

## Development

### Lint

`npm run lint`

### Bootstrap

Update/deploy Discord Webhooks. Only needs to be done once or after changes.

`npm run bootstrap`

### Start Dev

`npm start`

### Clean Up

Remove webhooks

`npm run destroy`

## Production

### Build

`docker build -t ashleywxwx/discord-bot .`

### Run

`docker run --env-file .env ashleywxwx/discord-bot`