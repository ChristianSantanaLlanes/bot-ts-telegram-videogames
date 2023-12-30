import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.hears('🔎 Buscar Videojuego', logHandle('message_search'), (ctx) => {
    return ctx.reply('Buscando...')
})

export { composer as searchFeature };