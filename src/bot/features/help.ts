import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("help", logHandle("command-help"), (ctx) => {
  return ctx.reply(ctx.t("help"));
});

feature.hears('Help', logHandle("message-help"), (ctx) => {
    return ctx.reply(ctx.t('help'))
})

export { composer as helpFeature };
