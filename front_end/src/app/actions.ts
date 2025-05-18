'use server';

// Importing the refactored flow wrapper and type.
// ChatInputSchema is no longer imported as validation happens within the flow.
import { invokeChatFlow, type ChatInput } from '@/ai/flows/chat';

export async function sendMessageToServerAction(
  message: string
): Promise<{ data: string | null; error: string | null }> {
  if (!message.trim()) {
    return { data: null, error: 'Message cannot be empty.' };
  }

  try {
    // Input validation using ChatInputSchema.parse() is removed.
    // Genkit's defineFlow with inputSchema will handle validation.
    // We pass the input object directly to the flow wrapper.
    const response = await invokeChatFlow({ prompt: message });
    
    return { data: response, error: null };
  } catch (e: any) {
    console.error('Error in sendMessageToServerAction:', e);
    // Enhanced Zod error reporting (Genkit will throw Zod errors on schema mismatch)
    if (e.name === 'ZodError' && e.errors && Array.isArray(e.errors)) { 
        const zodErrorMessages = e.errors.map((err: any) => `${err.path.join('.')} - ${err.message}`).join('; ');
        return { data: null, error: `Input validation failed: ${zodErrorMessages}` };
    }
    if (e instanceof Error) {
      return { data: null, error: e.message || 'Failed to get a response from the AI.' };
    }
    return { data: null, error: 'An unknown error occurred.' };
  }
}
