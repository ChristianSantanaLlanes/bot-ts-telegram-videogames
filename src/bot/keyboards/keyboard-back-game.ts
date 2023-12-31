import { InlineKeyboard } from "grammy";

export const createackeyboard = () => {
    const inlineKeyboard = new InlineKeyboard()
    .text("Atras", "back-game")

    return inlineKeyboard
}