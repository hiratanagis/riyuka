const { ShardingManager } = require('discord.js');
//shardingManager.spawn(shardingManager.totalShards, 5500, -1);

const shards = new ShardingManager('./src/app.js', {
    token: process.env.BOT_TOKEN,
    totalShards: 1
});

shards.on('launch', shard => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${shard.id}`);
});

shards.on('message', (shard, msg) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] #${shard.id} | ${msg._eval} | ${msg._result}`);
});

shards.spawn(this.totalShards, 5000);