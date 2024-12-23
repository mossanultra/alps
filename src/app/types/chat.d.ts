export interface Chat {
  userName: string;
  userIcon: string;
  userId?: string;
  text: string;
  createdAt: string; // ISO形式のタイムスタンプ
  id: string;
  lng: number;
  lat: number;
}