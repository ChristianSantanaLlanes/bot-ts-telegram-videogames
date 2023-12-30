import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command('info', logHandle('info-command'), (ctx) => {
    const {first_name:firstName, id, last_name:lastName} = ctx.from
    const nombre = `${firstName  } ${  lastName}`??''
    const username = ctx.from.username??''
    return ctx.reply(ctx.t('info', {
        nombre,
        username,
        id
    }))
})

feature.hears('Info', logHandle('message-info'), (ctx) => {
    const {first_name:firstName, id, last_name:lastName} = ctx.from
    const nombre = `${firstName  } ${  lastName}`??''
    const username = ctx.from.username??''
    return ctx.reply(ctx.t('info', {
        nombre,
        username,
        id
    }))
})

export { composer as infoFeature };