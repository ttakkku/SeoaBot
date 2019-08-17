const Discord = require('discord.js')
const LMusic = require('./music_lavalink')
const Music = require('./music_native')
const { PlayerManager } = require('discord.js-lavalink')

module.exports = class Seoa extends Discord.Client {
  constructor (config, db) {
    super()
    this.settings = config
    this.db = db || null
    this.m = new Music()
    this.lm = new LMusic(this)
    this.commands = new Discord.Collection()
    this.player

    this.on('guildCreate', guild => {
      if (this.db) return this.db.update('serverdata', { owner: guild.ownerID }, { id: guild.id })
    })

    this.on('guildDelete', guild => {
      if (this.db) return this.db.update('serverdata', { owner: guild.ownerID }, { id: guild.id })
    })

    this.login(config.token)
  }

  ready () {
    if (this.player) return
    this.player = new PlayerManager(this, this.settings.nodes, {
      user: this.user.id,
      shards: 0
    }, { selfdeaf: false, selfmute: false })
  }
}