import sendRequest from "./send-request";
const BASE_URL = '/api/profiles';

export async function getProfile() {
  return sendRequest(BASE_URL);
}

export async function getName() {
  return sendRequest(`${BASE_URL}/username`);
}

export async function updateAvatar(formData) {
  return sendRequest(`${BASE_URL}/avatar`, 'PUT', formData, true);
}