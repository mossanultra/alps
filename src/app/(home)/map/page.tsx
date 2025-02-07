// src/app/points/[id]/page.tsx
import { fetchProfile } from "@/features/profile/hooks/useProfile";
import { fetchPoints } from "@/features/point/hooks/usePoint";
import { auth } from "../../../../auth";
import MapWithCustomModalMarker from "./map";

export default async function ServerPointPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const userProfile = await fetchProfile(session.user.id);
  if (!userProfile) {
    return null;
  }
  const pointData = await fetchPoints(session.user.id)
  if (!pointData) {
    return null;
  }

  return (
    <MapWithCustomModalMarker zoom={15} userId={session.user.id} points={pointData}    />
  );
}
