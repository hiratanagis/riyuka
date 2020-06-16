const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args, color, prefix, lang) => {
    const balance = await db.fetch(`userBalance_${message.author.id}`)
    
    let OreStone = await db.fetch(`Ore_${message.author.id}.stone`)
    let OreCoal = await db.fetch(`Ore_${message.author.id}.coal`)
    let OreIron = await db.fetch(`Ore_${message.author.id}.iron`)
    let OreGold = await db.fetch(`Ore_${message.author.id}.gold`)
    let OreDiamond = await db.fetch(`Ore_${message.author.id}.diamond`)
    let OreEmerald = await db.fetch(`Ore_${message.author.id}.emerald`)
    let OreRedstone = await db.fetch(`Ore_${message.author.id}.redstone`)
    let OreLapis = await db.fetch(`Ore_${message.author.id}.lapis`)
    let Obsidian = await db.fetch(`Ore_${message.author.id}.obsidian`)
    
    let Zombie = await db.fetch(`Mobs_${message.author.id}.zombie`)
    let Skeleton = await db.fetch(`Mobs_${message.author.id}.skeleton`)
    let Creeper = await db.fetch(`Mobs_${message.author.id}.creeper`)
    let Drowned = await db.fetch(`Mobs_${message.author.id}.drowned`)
    let Husk = await db.fetch(`Mobs_${message.author.id}.husk`)
    let Enderman = await db.fetch(`Mobs_${message.author.id}.enderman`)
    let Spider = await db.fetch(`Mobs_${message.author.id}.spider`)

    let amount = args[2]

    if (!args[0]) {
    let embed = new Discord.RichEmbed()
    .setDescription(`${lang.sell_something} \`${prefix}sell <type> <item> <amount>\``)
    .setColor("RANDOM")
    .addField("Type: Resource", `stone\ncoal\niron\ngold\ndiamond\nemerald\nredstone\nlapis\nobsidian`, true)
    .addField("Type: Mob", `zombie\nskeleton\ncreeper\ndrowned\nhusk\nenderman\nspider`, true)
    .addField("Example", `${prefix}sell resource stone 10\n${prefix}sell mob zombie 15`)
    .setTimestamp()
    message.channel.send(embed)
  
    } else if (args[0] == "resource") {
        if (args[1] == "stone") {
            if (!amount) return message.reply(lang.amount_noinput)
            if (OreStone <= amount) return message.reply(lang.resource_dontenough)
            message.channel.send(`${lang.sell_succes} stone : ${amount}`)
            db.add(`userBalance_${message.author.id}`, amount * 1)
            db.add(`Ore_${message.author.id}.stone`, -amount)

        } else if (args[1] == "coal") {
            if (!amount) return message.reply(lang.amount_noinput)
            if (OreCoal <= amount) return message.reply(lang.resource_dontenough)
            message.channel.send(`${lang.sell_succes} coal : ${amount}`)
            db.add(`userBalance_${message.author.id}`, amount * 2)
            db.add(`Ore_${message.author.id}.coal`, -amount)
  
        } else if (args[1] == "iron") {
            if (!amount) return message.reply(lang.amount_noinput)
            if (OreIron <= amount) return message.reply(lang.resource_dontenough)
            message.channel.send(`${lang.sell_succes} iron : ${amount}`)
            db.add(`userBalance_${message.author.id}`, amount * 4)
            db.add(`Ore_${message.author.id}.iron`, -amount)
  
        } else if (args[1] == "gold") {
            if (!amount) return message.reply(lang.amount_noinput)
            if (OreGold <= amount) return message.reply(lang.resource_dontenough)
            message.channel.send(`${lang.sell_succes} gold : ${amount}`)
            db.add(`userBalance_${message.author.id}`, amount * 5)
            db.add(`Ore_${message.author.id}.gold`, -amount)
  
        } else if (args[1] == "diamond") {
            if (!amount) return message.reply(lang.amount_noinput)
            if (OreDiamond <= amount) return message.reply(lang.resource_dontenough)
             message.channel.send(`${lang.sell_succes} diamond : ${amount}`)
            db.add(`userBalance_${message.author.id}`, amount * 8)
            db.add(`Ore_${message.author.id}.diamond`, -amount)
  
        } else if (args[1] == "emerald") {
            if (!amount) return message.reply(lang.amount_noinput)
            if (OreEmerald <= amount) return message.reply(lang.resource_dontenough)
            message.channel.send(`${lang.sell_succes} emerald : ${amount}`)
            db.add(`userBalance_${message.author.id}`, amount * 10)
            db.add(`Ore_${message.author.id}.emerald`, -amount)

        } else if (args[1] == "redstone") {
            if (!amount) return message.reply(lang.amount_noinput)
            if (OreRedstone <= amount) return message.reply(lang.resource_dontenough)
            message.channel.send(`${lang.sell_succes} redstone : ${amount}`)
            db.add(`userBalance_${message.author.id}`, amount * 3)
            db.add(`Ore_${message.author.id}.redstone`, -amount)

        } else if (args[1] == "lapis") {
            if (!amount) return message.reply(lang.amount_noinput)
            if (OreLapis <= amount) return message.reply(lang.resource_dontenough)
            message.channel.send(`${lang.sell_succes} lapis lazuli : ${amount}`)
            db.add(`userBalance_${message.author.id}`, amount * 5)
            db.add(`Ore_${message.author.id}.lapis`, -amount)

        } else if (args[1] == "obsidian") {
            if (!amount) return message.reply(lang.amount_noinput)
            if (Obsidian <= amount) return message.reply(lang.resource_dontenough)
            message.channel.send(`${lang.sell_succes} obsidian : ${amount}`)
            db.add(`userBalance_${message.author.id}`, amount * 7)
            db.add(`Ore_${message.author.id}.obsidian`, -amount)
        }

    } else if (args[0] == "mob") {
        if (args[1] == "zombie") {
            if (!amount) return message.reply(lang.amount_noinput)
            if (Zombie <= amount) return message.reply(lang.resourcemob_dontenough)
            message.channel.send(`${lang.sell_succes} zombie : ${amount}`)
            db.add(`userBalance_${message.author.id}`, amount * 1)
            db.add(`Mobs_${message.author.id}.zombie`, -amount)

        } else if (args[1] == "skeleton") {
            if (!amount) return message.reply(lang.amount_noinput)
            if (Skeleton <= amount) return message.reply(lang.resourcemob_dontenough)
            message.channel.send(`${lang.sell_succes} skeleton : ${amount}`)
            db.add(`userBalance_${message.author.id}`, amount * 1)
            db.add(`Mobs_${message.author.id}.skeleton`, -amount)

        } else if (args[1] == "creeper") {
            if (!amount) return message.reply(lang.amount_noinput)
            if (Creeper <= amount) return message.reply(lang.resourcemob_dontenough)
            message.channel.send(`${lang.sell_succes} creeper : ${amount}`)
            db.add(`userBalance_${message.author.id}`, amount * 2)
            db.add(`Mobs_${message.author.id}.creeper`, -amount)

        } else if (args[1] == "drowned") {
            if (!amount) return message.reply(lang.amount_noinput)
            if (Drowned <= amount) return message.reply(lang.resourcemob_dontenough)
            message.channel.send(`${lang.sell_succes} drowned : ${amount}`)
            db.add(`userBalance_${message.author.id}`, amount * 3)
            db.add(`Mobs_${message.author.id}.drowned`, -amount)

        } else if (args[1] == "husk") {
            if (!amount) return message.reply(lang.amount_noinput)
            if (Husk <= amount) return message.reply(lang.resourcemob_dontenough)
            message.channel.send(`${lang.sell_succes} husk : ${amount}`)
            db.add(`userBalance_${message.author.id}`, amount * 4)
            db.add(`Mobs_${message.author.id}.husk`, -amount)

        } else if (args[1] == "enderman") {
            if (!amount) return message.reply(lang.amount_noinput)
            if (Enderman <= amount) return message.reply(lang.resourcemob_dontenough)
            message.channel.send(`${lang.sell_succes} enderman : ${amount}`)
            db.add(`userBalance_${message.author.id}`, amount * 8)
            db.add(`Mobs_${message.author.id}.enderman`, -amount)

        } else if (args[1] == "spider") {
            if (!amount) return message.reply(lang.amount_noinput)
            if (Spider <= amount) return message.reply(lang.resourcemob_dontenough)
            message.channel.send(`${lang.sell_succes} spider : ${amount}`)
            db.add(`userBalance_${message.author.id}`, amount * 3)
            db.add(`Mobs_${message.author.id}.spider`, -amount)
        }
    }
}

exports.conf = {
    aliases: [],
    cooldown: "7"
}

exports.help = {
    name: "sell",
    description: "Sell Resource",
    usage: `sell <item> <amount>`
}