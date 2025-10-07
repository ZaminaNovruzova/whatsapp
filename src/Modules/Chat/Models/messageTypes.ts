export type UserId = "alice" | "bob";
export interface Message {
  id: string;
  from: UserId;
  to: UserId;
  text?: string;
  audio?: string; // data:audio/...;base64,... (optional)
  audioName?: string; // original filename or "Recording"
  createdAt: string;
}
