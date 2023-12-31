import { Conversation, createConversation } from "@grammyjs/conversations";
import { Context } from "#root/bot/context.js";
import { i18n } from "#root/bot/i18n.js";
import { gamesListMenu } from "../menus/index.js";
// import { getGamebyName } from "../helpers/server-strapi.js";
// import { createKeyboardGames } from "../keyboards/games-keyboard.js";

export const GREETING_CONVERSATION = "greeting";



export function greetingConversation() {
  return createConversation(
    async (conversation: Conversation<Context>, ctx: Context) => {
      await conversation.run(i18n);

      await ctx.reply(ctx.t('buscar.buscar_texto'));

      while (true) {
        ctx = await conversation.wait();
        
        if (ctx.hasCommand('cancel')) {
          ctx.reply(ctx.t('buscar.cancel_buscar'))
          return
        }
        if (ctx.has("message:text")) {
          ctx.chatAction = "typing";
          ctx.session.game_name = ctx.message.text
          // await conversation.sleep(1000);
          // const games = await getGamebyName(ctx.message.text)
          ctx.reply(ctx.t('buscar.juegos_encontrados'), {
            // reply_markup: await createKeyboardGames(ctx, games)
            reply_markup: gamesListMenu
          })
          return 
        } 
        await ctx.reply("Please send me your name");
        
      }
    },
    GREETING_CONVERSATION,
  );
}