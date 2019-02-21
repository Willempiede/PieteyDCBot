const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const bot = new discord.Client();


bot.on("ready", async () => {

    console.log(`${bot.user.username} is online`);

    bot.user.setActivity("Counter-Strike: Global Offensive ", { type: "PLAYING" });

})


bot.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);
    // !hallo
    if (command === `${prefix}hallo`) {

        return message.channel.send("Hallo")

    }

    // !info
    if (command === `${prefix}info`) {

        var botIcon = bot.user.displayAvatarURL;

        var botEmbedInfo = new discord.RichEmbed()
            .setDescription("Informatie")
            .setColor("#0dd1e2")
            .setThumbnail(botIcon)
            .addField("Voor hulp en uitleg over de beschikbare commando's, typ", "!help")
            .addField("Voor informatie over de bot, typ", "!botinfo")
            .addField("Voor informatie over de server, typ", "!serverinfo");


        return message.channel.send(botEmbedInfo);

    }

    // !botinfo
    if (command === `${prefix}botinfo`) {

        var botIcon = bot.user.displayAvatarURL;

        var botEmbedBotinfo = new discord.RichEmbed()
            .setDescription("Over de PieteyBot")
            .setColor("#0dd1e2")
            .setThumbnail(botIcon)
            .addField("Bot naam", bot.user.username)
            .addField("Gemaakt op", bot.user.createdAt)
            .addField("Gemaakt door", "Simon Tuntelder");

        return message.channel.send(botEmbedBotinfo);

    }

    // !serverinfo
    if (command === `${prefix}serverinfo`) {

        var icon = message.guild.iconURL;

        var botEmbedServer = new discord.RichEmbed()
            .setDescription("Over de Pietey server")
            .setColor("#0dd1e2")
            .setThumbnail(icon)
            .addField("NoSkillJustChill", "Head dev/Owner")
            .addField("Relatables", "Admin/Co-Owner")
            .addField("Smarthy", "Admin/Co-Owner")
            .addField("Je bent gejoined op", message.member.joinedAt)
            .addField("Het totaal aantal members is", message.guild.memberCount);


        return message.channel.send(botEmbedServer);

    }

    // !kick @gebruiker reden
    if (command === `${prefix}kick`) {

        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.member(arguments[0]));

        if (!kickUser) return message.channel.send("De keerl die je probeert te kicken is niet gevonden");

        var reason = arguments.join(" ").slice(22);

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Dat kan je niet");

        if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je mag geen mede admin kicken tammo");

        var kick = new discord.RichEmbed()
            .setDescription("Kick")
            .setColor("#ee0000")
            .addField(kickUser, "is dr uut getrapt")
            .addField("Door", message.author)
            .addField("Omdat", reason);

        var kickChannel = message.guild.channels.find(`name`, "general");
        if (!kickChannel) return message.guild.send("Kan het kanaal niet vinden");

        message.guild.member(kickUser).kick(reason);

        kickChannel.send(kick);

        return;

    }


});


bot.login(botConfig.token)

