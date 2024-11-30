import { useCallback } from "react";

export function usePoint() {

    /** メッセージ送信 */
    const registerPoint = useCallback(
        async (lat: number, lng: number) => {
            if (!lat || !lng) {
                alert("緯度経度を入れてください。");
                return;
            }
            try {
                const formData = new FormData();
                formData.append("lat", String(lat));
                formData.append("lng", String(lng));
                const response = await fetch("/api/points", {
                    method: "POST",
                    body: formData,
                });
                if (response.ok) {

                } else {
                    alert("送信に失敗しました。");
                }
            } catch (error) {
                console.error("Error sending message:", error);
                alert("エラーが発生しました。");
            }
        },
        []
    );

    return {
        registerPoint
    };
}
