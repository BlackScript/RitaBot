// -----------------
// Global variables
// Err TAG: RB001??
// -----------------

// Codebeat:disable[LOC,ABC,BLOCK_NESTING]
/* eslint-disable no-inline-comments */
/* eslint-disable line-comment-position */
/* eslint-disable sort-keys */
const time = {
   "long": 60000,
   "mid": 30000,
   "short": 5000
};
const env = `${__dirname.slice(
   0,
   -3
)}.env`;
require("dotenv").config({
   "path": env
});
const {Client, Options, Intents} = require("discord.js");

const myIntents = new Intents(32509);

const client = new Client({
   "restRequestTimeout": time.long,
   "shards": "auto",
   "makeCache": Options.cacheWithLimits({
      "GuildBanManager": 20, // guild.bans
      "GuildManager": Infinity, // client.guilds
      "MessageManager": 2, // channel.messages
      "PresenceManager": 1, // guild.presences
      "UserManager": 1 // client.users
   }),
   "intents": myIntents
});
const auth = require("./core/auth");

// ---------------
// Event Listener
// ---------------
const events = require("./events");

events.listen(client);
exports.client = client;
// ---------------
// Initialize Bot
// ---------------

// eslint-disable-next-line func-style
function login (token)
{

   client.login(token).catch((err) =>
   {

      console.log(err);
      console.log(`retrying login...`);
      setTimeout(
         login,
         5000
      );

   });

}

login(auth.token);
