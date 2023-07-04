import sendRequest from "./send-request";
const BASE_URL = "/api/comments";

export async function getAll() {
  return sendRequest(`${BASE_URL}`);
}

export async function markAnswer(id) {
  return sendRequest(`${BASE_URL}/${id.id}/mark`, 'PUT', id)
}

export async function unmarkAnswer(id) {
  return sendRequest(`${BASE_URL}/${id.id}/unmark`, 'PUT', id)
}