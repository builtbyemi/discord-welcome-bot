

const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once("ready", () => {
  console.log(`Bot online as ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.get(
    process.env.WELCOME_CHANNEL_ID
  );

  if (!channel) {
    console.log("Welcome channel not found.");
    return;
  }

  await channel.send(
    `👋 Welcome ${member} to **${member.guild.name}**! We're glad to have you here.`
  );
});

client.once("ready", async () => {
  console.log(`Bot online as ${client.user.tag}`);

  const channel = client.channels.cache.get(
    process.env.WELCOME_CHANNEL_ID
  );

  if (!channel) {
    console.log("❌ Welcome channel not found");
    return;
  }

  await channel.send("👋 Test successful! Welcome bot is working.");
  console.log("✅ Test welcome message sent");
});

client.login(process.env.DISCORD_TOKEN);
