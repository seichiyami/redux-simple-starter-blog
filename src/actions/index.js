import axios from 'axios';

import { POSTS_API_KEY } from '../../config';

export const FETCH_POSTS = 'fetch_posts';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${POSTS_API_KEY}`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}
