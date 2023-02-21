import {Configuration, OpenAIApi} from "openai";

class ChatGPTService {
    async generateCompletion(prompt) {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const completion = await openai.createCompletion({
            model: "text-curie-001",
            prompt,
            temperature: 0,
            max_tokens: 500,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        return completion.data.choices[0].text.replace(/^\s+|\s+$/g, "");
    }
}

export default new ChatGPTService();