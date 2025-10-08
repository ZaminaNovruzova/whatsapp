import type { IMessage } from "../Modules/Chat/Models/messageTypes";

export const LS_KEY = "two_user_messages_v1";

export function loadMessages(): IMessage[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as IMessage[]) : [];
  } catch {
    return [];
  }
}
export function saveMessages(arr: IMessage[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
}

export function getConversationMessages(
  all: IMessage[],
  me: string,
  other: string | null
): IMessage[] {
  if (!other) return [];
  return all
    .filter(
      (m) =>
        (m.from === me && m.to === other) || (m.from === other && m.to === me)
    )
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}
