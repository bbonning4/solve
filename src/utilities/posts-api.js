import sendRequest from "./send-request";
const BASE_URL = '/api/posts';

export async function createPost(formData) {
  return sendRequest(`${BASE_URL}/new`, 'POST', formData, true);
}

export async function getPost(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export async function getAll() {
  return sendRequest(`${BASE_URL}`);
}

export async function isUser(postId) {
  return sendRequest(`${BASE_URL}/${postId}/check`);
}

export async function deletePost(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

export async function getPostComments(postId) {
  return sendRequest(`${BASE_URL}/${postId}/comments`);
}

export async function createComment(postId, comment) {
  return sendRequest(`${BASE_URL}/${postId}/comments/new`, 'POST', comment);
}