import { xai } from '@ai-sdk/xai';
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';

export const myProvider = customProvider({
  languageModels: {
    'chat-model': xai('grok-2-1212'),
    'chat-model-reasoning': wrapLanguageModel({
      model: xai('grok-3-mini-beta'),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
    'title-model': xai('grok-2-1212'),
    'artifact-model': xai('grok-2-1212'),
  },
  imageModels: {
    'small-model': xai.image('grok-2-image'),
  },
})