export type UserId =string
export interface IMessage {
  id: string;
  from: UserId;
  to: UserId;
  text?: string;
  audio?: string; // data:audio/...;base64,... (optional)
  audioName?: string; // original filename or "Recording"
  createdAt: string;
}
