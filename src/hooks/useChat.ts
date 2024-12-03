import { useReducer, useCallback } from "react";
import { Chat } from "@/app/api/chat/route";

type State = {
  chats: Chat[];
  loadingMore: boolean;
  lastDocId: string | null;
  hasMoreChats: boolean;
  lat: number;
  lng: number;
};

type Action =
  | { type: "SET_CHATS"; chats: Chat[] }
  | { type: "ADD_CHATS"; chats: Chat[] }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_LAST_DOC_ID"; id: string | null }
  | { type: "SET_HAS_MORE"; hasMore: boolean }
  | { type: "SET_LOCATION"; lat: number; lng: number };

const initialState: State = {
  chats: [],
  loadingMore: false,
  lastDocId: null,
  hasMoreChats: true,
  lat: 0,
  lng: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_CHATS":
      return { ...state, chats: action.chats };
    case "ADD_CHATS":
      return { ...state, chats: [...state.chats, ...action.chats] };
    case "SET_LOADING":
      return { ...state, loadingMore: action.loading };
    case "SET_LAST_DOC_ID":
      return { ...state, lastDocId: action.id };
    case "SET_HAS_MORE":
      return { ...state, hasMoreChats: action.hasMore };
    case "SET_LOCATION":
      return { ...state, lat: action.lat, lng: action.lng };
    default:
      return state;
  }
}

function buildApiPath(pagingId: string | null, lat: number, lng: number) {
  const params = new URLSearchParams({ lat: String(lat), lng: String(lng) });
  if (pagingId) params.append("pagingId", pagingId);
  return `/api/chat?${params.toString()}`;
}

export function useChat() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchChats = useCallback(
    async (pagingId: string | null = null, lat: number, lng: number) => {
      dispatch({ type: "SET_LOCATION", lat, lng });
      try {
        const response = await fetch(buildApiPath(pagingId, lat, lng));
        if (response.ok) {
          const data: Chat[] = await response.json();
          if (pagingId) {
            dispatch({ type: "ADD_CHATS", chats: data });
          } else {
            dispatch({ type: "SET_CHATS", chats: data });
          }
          dispatch({ type: "SET_LAST_DOC_ID", id: data[0]?.id || null });
          dispatch({ type: "SET_HAS_MORE", hasMore: data.length === 20 });
        } else {
          console.error("Failed to fetch chats");
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        dispatch({ type: "SET_LOADING", loading: false });
      }
    },
    []
  );

  const fetchMoreChats = useCallback(() => {
    if (state.hasMoreChats && !state.loadingMore && state.lastDocId) {
      dispatch({ type: "SET_LOADING", loading: true });
      fetchChats(state.lastDocId, state.lat, state.lng);
    }
  }, [state, fetchChats]);

  const sendMessage = useCallback(
    async (message: string, userName: string, lat: number, lng: number) => {
      if (!message || !userName) {
        alert("名前とメッセージを入力してください。");
        return;
      }
      try {
        const formData = new FormData();
        formData.append("text", message);
        formData.append("userName", userName);
        formData.append("lat", String(lat));
        formData.append("lng", String(lng));

        const response = await fetch("/api/chat", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("メッセージを送信しました！");
          await fetchChats(null, lat, lng);
        } else {
          alert("送信に失敗しました。");
        }
      } catch (error) {
        console.error("Error sending message:", error);
        alert("エラーが発生しました。");
      }
    },
    [fetchChats]
  );

  return {
    chats: state.chats,
    loadingMore: state.loadingMore,
    hasMoreChats: state.hasMoreChats,
    fetchChats,
    fetchMoreChats,
    sendMessage,
  };
}
