import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";
import { gameMenu } from "../menus/index.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.callbackQuery('back-game', logHandle('query-back-game'), (ctx) => {
    ctx.editMessageCaption(
        {
            caption:ctx.session.descr,
            reply_markup:gameMenu
        }
    )
})

export { composer as backFeature };