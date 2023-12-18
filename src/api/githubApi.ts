import axios from 'axios';
import { GITHUB_TOKEN } from '../../private';

/**
 * Create file private.ts in root of project and add the constant GITHUB_TOKEN
 * with your own github token
 * */
const Key = GITHUB_TOKEN;

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization: `Bearer ${Key}`,
  },
});
