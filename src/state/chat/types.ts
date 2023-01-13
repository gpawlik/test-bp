export type Sender = {
  id: string;
  photoUri: string;
  firstName: string;
  lastName: string;
};

export enum MessageType {
  Text = "text",
  Reaction = "reaction",
  Image = "image",
}

export type Message = {
  id: string;
  groupId: string;
  timestamp: number;
  sender: Sender;
  content: string;
  type: MessageType;
};

export type ChatState = {
  messages: Message[];
};

export type GroupMessage = {
  id: string;
  senderName: string;
  groupId: string;
  groupName: string;
  groupUri: string;
  timestamp: number;
  text: string;
  isCurrentUser: boolean;
  isRead: boolean;
};
