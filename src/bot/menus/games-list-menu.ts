// eslint-disable-next-line import/no-extraneous-dependencies
import { Menu } from "@grammyjs/menu";
import { getGamebyName } from "../helpers/server-strapi.js";
import { Context } from "../context.js";
import { Datum, Game } from "../models/Game.js";
import { gameMenu } from "./game-menu.js";

export const gamesListMenu = new Menu<Context>("games-list-menu", { onMenuOutdated: false })
function converList(list: Datum[] | undefined):string {
    let text = ''
    if(list) {
        if(list.length === 0) {
            text = '-'
        } else if(list.length === 1) {
            text = list[0].attributes?.name??''
        } else {
            text = list[0].attributes?.name??''
            // eslint-disable-next-line no-plusplus
            for(let index = 1; index < list.length; index++) {
                text += `, ${list[index]}`
            }
        }
    }
    return text
}
interface GameText{
    genero:string;
    caracteristica: string;
    vista: string;
    desarrollador: string;
    plataforma: string;
    name: string;
    description: string;
}

const saveGameText = ( game: Game): GameText => {
    const oldGame = game.attributes
    const generos = oldGame?.generos?.data
    const caracteristicas = oldGame?.caracterisiticas?.data
    const vistas = oldGame?.vistas?.data
    const desarrolladors = oldGame?.companias?.data
    const plataformas = oldGame?.plataformas?.data
    const genero = converList(generos)
    const caracteristica = converList(caracteristicas)
    const vista = converList(vistas)
    const desarrollador = converList(desarrolladors)
    const plataforma = converList(plataformas)
    const name = oldGame?.name??''
    const description = oldGame?.description??''
    return {genero, caracteristica, vista, desarrollador, plataforma, name, description}
}

gamesListMenu.dynamic(async (ctx:Context, range) => {
    const games = await getGamebyName(ctx.session.game_name??'')
    const buttonCount = games.length
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < buttonCount; index++) {
        const game = games[index]
        range.text(game.attributes?.name ?? '', (context) => {
            ctx.session.rec_min = game.attributes?.req_min??''
            ctx.session.rec_rec = game.attributes?.rec_rec??''
            const textGame = saveGameText(game)
            const text = context.t('game_text', {
                name:textGame.name,
                description:textGame.description,
                genero:textGame.genero,
                caracteristica:textGame.caracteristica,
                vista:textGame.vista,
                desarrollador:textGame.desarrollador,
                plataforma:textGame.plataforma
            })
            ctx.session.descr = text
            context.chatAction = 'upload_photo';
            context.replyWithPhoto(
                game.attributes?.cover?.data?.attributes?.url??'',
                {
                    caption:text,
                    reply_markup: gameMenu
                }
            )
        }).row()
    }
})