const Client = require('./handle/Client');
const client = new Client({disableEveryone: true});

require('./handle/events')(client);
require('./handle/module')(client);

client.login(process.env.BOT_TOKEN);