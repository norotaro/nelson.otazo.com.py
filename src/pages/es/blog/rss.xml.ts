import type { APIRoute } from 'astro';
import { blogFeed } from '../../../lib/blog-rss';

export const GET: APIRoute = ({ site }) => blogFeed('es', site!);
