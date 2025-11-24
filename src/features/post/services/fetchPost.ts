import { apiFetch } from "../../../util/api";
import { Post } from "../types/post";

export async function fetchPost(): Promise<Post[] | null> {
  try {
    const data = await apiFetch<Post[]>(`/api/post`);
    return data ?? null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}
