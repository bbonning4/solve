const mathpix = require('../../config/process-image');

module.exports = {
  processImage,
};

async function processImage(req, res) {
    const asciimath = await mathpix(req.body.image);
    console.log(asciimath);
}
