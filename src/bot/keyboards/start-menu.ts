import { Keyboard } from "grammy";

export const createStartMenu = () => {
    const keyboard = new Keyboard()
    .text("🔎 Buscar Videojuego").row()
    .text("Help")
    .text("Info").row()
    .resized();
    return keyboard
}