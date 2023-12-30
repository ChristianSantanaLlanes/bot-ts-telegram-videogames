import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";
import { createStartMenu } from "../keyboards/start-menu.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("start", logHandle("command-start"), (ctx) => {
  const nombre = ctx.from.first_name
  return ctx.reply(ctx.t("welcome", {nombre}),{
    reply_markup:createStartMenu()
  });
});

export { composer as welcomeFeature };
