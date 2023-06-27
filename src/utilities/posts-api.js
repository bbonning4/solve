import sendRequest from "./send-request";
const BASE_URL = '/api/posts';

export async function createPost(post) {
  return sendRequest(`${BASE_URL}/new`, 'POST', post);
}

export async function getPost(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export async function getAll() {
  return sendRequest(`${BASE_URL}`);
}