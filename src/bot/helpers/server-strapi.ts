// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import { Game } from "../models/game.js";

const url = 'https://strapi-production-2d60.up.railway.app/api/'

export async function getGamebyId(id:number):Promise<Game> {
    const response = await axios.get(`${url}games/${id}?populate=*`);
    const game: Game = response.data.data;
    return game;
  }
  
export async function getGamebyName(name:string):Promise<Game[]> {
    const response = await axios.get(`${url}games?sort[0]=name:asc&filters[name][$containsi]=${name}&populate=*`);
    const games: Game[] = response.data.data;
    return games;
  }