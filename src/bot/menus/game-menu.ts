import { Menu } from "@grammyjs/menu";
import { Context } from "../context.js";
import { createackeyboard } from "../keyboards/keyboard-back-game.js";

const getRequisitosMin = (ctx:Context) => {
    const recMin = ctx.session.rec_min
    ctx.editMessageCaption({
        caption:recMin,
        reply_markup: createackeyboard()
    })
}

const getRequisitosRec = (ctx:Context) => {
    // eslint-disable-next-line unicorn/consistent-destructuring
    const recRec = ctx.session.rec_rec
    ctx.editMessageCaption({
        caption:recRec,
        reply_markup: createackeyboard()
    })
}

export const gameMenu = new Menu<Context>("game-menu")
  .text("Requisitos Minimos", getRequisitosMin).row()
  .text('Requisitos Recomendados', getRequisitosRec).row()