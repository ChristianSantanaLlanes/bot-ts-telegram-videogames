import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";
// import { addReplyParam } from "@roziscoding/grammy-autoquote";
import { GREETING_CONVERSATION } from "../conversations/index.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.hears('🔎 Buscar Videojuego', logHandle('message_search'), async (ctx) => {            
    return ctx.conversation.enter(GREETING_CONVERSATION);      
})

// feature.on('callback_query:data', (ctx) =. {

// })

export { composer as searchFeature };