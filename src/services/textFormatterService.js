// src/services/textFormatterService.js

const ANTHROPIC_API_URL = 'http://localhost:3001/api/format';

export class TextFormatterService {
    // Funzione che genera il prompt con i tuoi parametri
    buildPrompt({ model, addressee, textLength, message }) {
        return `Sei un assistente esperto nella riscrittura e formattazione di testi. Il tuo compito è riformattare il seguente messaggio secondo i parametri specificati.

PARAMETRI:
- Stile/Modello: ${model}
- Destinatario: ${addressee}  
- Lunghezza desiderata: ${textLength}
- Messaggio originale: "${message}"

ISTRUZIONI:
1. Mantieni il significato originale del messaggio
2. Adatta il tono e lo stile al modello richiesto (${model})
3. Considera il destinatario (${addressee}) per il livello di formalità
4. Rispetta la lunghezza richiesta (${textLength})
5. Restituisci SOLO il testo riformattato, senza spiegazioni aggiuntive
6. Rispondi sempre in italiano

LUNGHEZZE:
- "short": circa 3-4 righe
- "standard": circa 6-7 righe  
- "long": circa 8-9 righe

ESEMPI DI STILI:
- "professional email": Formale, strutturato, cortese
- "casual message": Informale, amichevole, diretto
- "formal letter": Molto formale, protocollare
- "social media post": Coinvolgente, breve, con personalità

Procedi con la riformattazione:`;
    }

    // Chiamata API principale
    async formatText({ model, addressee, textLength, message }) {
        try {
            const prompt = this.buildPrompt({ model, addressee, textLength, message });

            const response = await fetch(ANTHROPIC_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'claude-3-5-haiku-20241022',
                    max_tokens: 1000, // Sweet spot per questo task
                    messages: [
                        {
                            role: 'user',
                            content: prompt,
                        }
                    ],
                }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`API Error: ${response.status} - ${errorData}`);
            }

            const data = await response.json();
            return data.content[0].text;

        } catch (error) {
            console.error('Errore nella formattazione del testo:', error);
            throw new Error(`Errore nella formattazione: ${error.message}`);
        }
    }
}

// Esempio di utilizzo
export const useTextFormatter = () => {
    const formatter = new TextFormatterService();

    return {
        formatText: formatter.formatText.bind(formatter)
    };
};