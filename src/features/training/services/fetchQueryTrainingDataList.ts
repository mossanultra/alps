import { apiFetch } from "../../../util/api"
import { TrainingListResponse } from "../types/training";

export async function fetchQueryTrainingDataList(userId: string, startDate: string, endDate: string): Promise<TrainingListResponse | null> {
  try {
    const request = {
      userId: userId,
      startDate : startDate,
      endDate: endDate,
    };
    const result = await apiFetch<TrainingListResponse>("/api/training/query", {
      method: "POST",
      body: JSON.stringify(request),
    });
    return result ?? null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}
