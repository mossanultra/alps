import { apiFetch } from "../../../util/api"
import { TrainingListResponse } from "../types/training";

export async function fetchTrainingDataList(userId: string, year: string, month: string): Promise<TrainingListResponse | null> {
  try {
    const json = await apiFetch<TrainingListResponse>(`/api/training/list?userId=${userId}&year=${year}&month=${month}`);
    return json ?? null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}
