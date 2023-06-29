const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_KEY } = process.env;

module.exports = async function (asciimath) {
  const configuration = new Configuration({
    apiKey: OPENAI_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            // { role: "system", content: "You are a user" },
            { role: "user", content: `Solve this problem, no explanations (if unable, respond with "Can't solve."): ${asciimath}` },
          ],
    })
    return completion.data.choices[0].message;
    // return json({ result: completion.data.choices[0].text });
  } catch(error) {
    if (error.response) {
        console.error(error.response.status, error.response.data);
    } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
};