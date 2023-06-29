const mathpix = require('../../config/process-image');
const openAI = require('../../config/openai-solve');

module.exports = {
  processImage,
};

async function processImage(req, res) {
    const asciimath = await mathpix(req.body.image);
    const aiResponse = await openAI(asciimath);
    console.log(aiResponse.content);
}
