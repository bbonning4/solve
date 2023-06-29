import sendRequest from "./send-request";
const BASE_URL = "/api/ai";

export async function processImage(image) {
  return sendRequest(`${BASE_URL}/mathpix`, 'POST', image, false);
}