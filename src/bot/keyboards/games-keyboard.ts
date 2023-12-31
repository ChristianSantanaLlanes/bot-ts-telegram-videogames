import { InlineKeyboard } from "grammy";
import { Context } from "../context.js";
import { chunk } from "../helpers/keyboard.js";
import { Game } from "../models/game.js";

export const createKeyboardGames = (ctx:Context, games:Game[]) => {
    return InlineKeyboard.from(
        chunk(
          games.map((game) => ({
            text: game.attributes?.name??'',
            callback_data: game.id?.toString()??''
          })),
          2,
        ),
    );
}