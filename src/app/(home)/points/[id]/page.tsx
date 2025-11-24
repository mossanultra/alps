// src/app/points/[id]/page.tsx
import { fetchProfile } from "@/features/profile/hooks/useProfile";
import { fetchPoint } from "@/features/point/hooks/usePoint";
import PointPage from "./PointPage"; // クライアントコンポーネントをインポート
import { auth } from "../../../../../auth";

export default async function ServerPointPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const userProfile = await fetchProfile(session.user.id);
  if (!userProfile) {
    return null;
  }
  const pointData = await fetchPoint(id);
  if (!pointData) {
    return null;
  }

  return (
    <PointPage
      id={session.user.id}
      userProfile={userProfile}
      pointData={pointData}
    />
  );
}
