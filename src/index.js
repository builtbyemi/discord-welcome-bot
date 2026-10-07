

const {
  Client,
  GatewayIntentBits,
  Events,
} = require("discord.js");

require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

// Runs when the bot connects
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Bot online as ${readyClient.user.tag}`);
});

client.on(Events.GuildMemberAdd, async (member) => {
  const channelIds = [
    process.env.WELCOME_CHANNEL_ID,
    process.env.WELCOME_CHANNEL_2_ID,
  ];

  for (const channelId of channelIds) {
    if (!channelId) continue;

    const channel = member.guild.channels.cache.get(channelId);

    if (!channel) {
      console.log(`❌ Channel not found: ${channelId}`);
      continue;
    }

    try {
      await channel.send(
        `👋 Welcome ${member} to **${member.guild.name}**! We're glad to have you here.`
      );
    } catch (error) {
      console.error(`❌ Failed to send welcome message:`, error);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);