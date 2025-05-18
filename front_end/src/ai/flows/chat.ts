'use server';
/**
 * @fileOverview A simple chat flow for API Chat Buddy.
 * This file exports `invokeChatFlow` as an async wrapper to call the Genkit flow,
 * and `ChatInput` and `ChatOutput` types.
 * The `chatFlow` itself and its schemas are internal to this module.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit'; // Using z from genkit as per examples

const ChatInputSchema = z.object({
  prompt: z.string().describe('The user input/prompt for the chat.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.string().describe('The AI assistant\'s response.');
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

// Define the Genkit flow using the ai object
// This flow is internal to this module and not exported directly.
const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input: ChatInput): Promise<ChatOutput> => {
    const { prompt } = input;

    // Simulate a more engaging response if the prompt is simple
    if (prompt.toLowerCase() === 'hello' || prompt.toLowerCase() === 'hi') {
      return "Hello there! I'm API Chat Buddy. How can I help you today?";
    }

    try {
      // Use ai.generate and access the .text property for Genkit 1.x
      const llmResponse = await ai.generate({
        prompt: `You are API Chat Buddy, a helpful assistant. The user says: ${prompt}`,
        // model: 'googleai/gemini-2.0-flash', // Default model is configured in ai/genkit.ts
      });
      return llmResponse.text;
    } catch (error) {
      console.error('Error calling AI model:', error);
      // Return an error message string that conforms to ChatOutputSchema
      return "I'm sorry, I encountered an error trying to respond. Please try again.";
    }
  }
);

// Exported async wrapper function to invoke the flow
export async function invokeChatFlow(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}
