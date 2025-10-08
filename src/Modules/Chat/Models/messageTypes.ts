export type UserId = string;
export interface IMessage {
  id: string;
  from: UserId;
  to: UserId;
  text?: string;
  audio?: string;
  audioName?: string;
  createdAt: string;
  file?: {
    url: string;
    name: string;
    type: string;
  };
  image?: string;
}
