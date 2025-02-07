// src/app/(home)/points/[id]/page.tsx
import { auth } from "../../../../../auth";
import { fetchProfile } from "@/features/profile/hooks/useProfile";
import { fetchPoint } from "@/features/point/hooks/usePoint";
import PointPage from "./PointPage"; // クライアントコンポーネントをインポート

export default async function ServerPointPage() {

  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const userProfile = await fetchProfile(session.user.id);
  const pointData = await fetchPoint(session.user.id);

  return <PointPage id={session.user.id} userProfile={userProfile!} pointData={pointData!} />;
}
