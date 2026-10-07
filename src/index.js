

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

// Runs when someone joins
client.on(Events.GuildMemberAdd, async (member) => {
  const channel = member.guild.channels.cache.get(
    process.env.WELCOME_CHANNEL_ID
  );

  if (!channel) {
    console.log("❌ Welcome channel not found");
    return;
  }

  await channel.send(
    `👋 Welcome ${member} to **${member.guild.name}**! We're glad to have you here.`
  );
});

client.login(process.env.DISCORD_TOKEN);