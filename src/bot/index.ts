import { autoChatAction } from "@grammyjs/auto-chat-action";
import { hydrate } from "@grammyjs/hydrate";
import { hydrateReply, parseMode } from "@grammyjs/parse-mode";
import { BotConfig, StorageAdapter, Bot as TelegramBot, session } from "grammy";
import {
  Context,
  SessionData,
  createContextConstructor,
} from "#root/bot/context.js";
// eslint-disable-next-line import/no-extraneous-dependencies
import { freeStorage } from "@grammyjs/storage-free";
import {
  adminFeature,
  backFeature,
  helpFeature,
  infoFeature,
  languageFeature,
  searchFeature,
  unhandledFeature,
  welcomeFeature,
} from "#root/bot/features/index.js";
import { errorHandler } from "#root/bot/handlers/index.js";
import { i18n, isMultipleLocales } from "#root/bot/i18n.js";
import { updateLogger } from "#root/bot/middlewares/index.js";
import { config } from "#root/config.js";
import { logger } from "#root/logger.js";
import { conversations } from "@grammyjs/conversations";
import { greetingConversation } from "./conversations/index.js";
import { gameMenu, gamesListMenu } from "./menus/index.js";

type Options = {
  sessionStorage?: StorageAdapter<SessionData>;
  config?: Omit<BotConfig<Context>, "ContextConstructor">;
};

export function createBot(token: string, options: Options = {}) {
  // const { sessionStorage } = options;
  const bot = new TelegramBot(token, {
    ...options.config,
    ContextConstructor: createContextConstructor({ logger }),
  });
  const protectedBot = bot.errorBoundary(errorHandler);

  // Middlewares
  bot.api.config.use(parseMode("HTML"));

  if (config.isDev) {
    protectedBot.use(updateLogger());
  }

  protectedBot.use(autoChatAction(bot.api));
  protectedBot.use(hydrateReply);
  protectedBot.use(hydrate());
  protectedBot.use(
    session({
      initial: () => ({
        game_name:'',
        rec_min: '',
        rec_rec: '',
        url: '',
        descr: '',
        message_id: 0
      }),
      storage: freeStorage<SessionData>(bot.token),
    }),
  );
  protectedBot.use(i18n);
  protectedBot.use(conversations());
  protectedBot.use(gameMenu)
  protectedBot.use(gamesListMenu)
  protectedBot.use(greetingConversation());

  // Handlers
  protectedBot.use(welcomeFeature);
  protectedBot.use(infoFeature)
  protectedBot.use(helpFeature)
  protectedBot.use(searchFeature)
  protectedBot.use(backFeature)
  protectedBot.use(adminFeature);

  if (isMultipleLocales) {
    protectedBot.use(languageFeature);
  }

  // must be the last handler
  protectedBot.use(unhandledFeature);

  return bot;
}

export type Bot = ReturnType<typeof createBot>;
