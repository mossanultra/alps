// src/app/(home)/points/[id]/page.tsx
import { auth } from "../../../../../auth";
import { fetchProfile } from "@/features/profile/hooks/useProfile";
import { fetchPoint } from "@/features/point/hooks/usePoint";
import PointPage from "./PointPage"; // クライアントコンポーネントをインポート

export default async function ServerPointPage({ params }: { params: { id: string } }) {
  // `params.id` を await する前に使用しないよう修正
  const id = params.id;

  const session = await auth();
  if (!session?.user?.id) {
    return <div>ログインが必要です。</div>;
  }

  const userProfile = await fetchProfile(session.user.id);
  const pointData = await fetchPoint(id);

  return <PointPage id={id} userProfile={userProfile!} pointData={pointData!} />;
}
