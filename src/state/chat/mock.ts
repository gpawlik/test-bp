import { MessageType } from "./types";

export const data = [
  {
    id: "message-1",
    groupId: "1",
    timestamp: 1672397126100,
    content: "I saw Adam picking his nose the whole time we were praying!!! 😂",
    sender: {
      id: "wo5E2SEwa9NTIdqyHg6Sm71zByJ2",
      photoUri: "",
      firstName: "Trevor",
      lastName: "Birch",
    },
    type: MessageType.Text,
  },
  {
    id: "message-2",
    groupId: "3",
    timestamp: 1671397751817,
    content:
      "For sides, we still need: guacamole, cheese, cilantro and gluten-free bread.",
    sender: {
      id: "wo5E2SEwa9NTIdqyHg6Sm71zByJ3",
      photoUri: "",
      firstName: "Greg",
      lastName: "Pawlik",
    },
    type: MessageType.Text,
  },
  {
    id: "message-3",
    groupId: "2",
    timestamp: 1672287719660,
    content:
      "Jonah is sick today so we'll need somebody else to come and explain the plan for this week.",
    sender: {
      id: "wo5E2SEwa9NTIdqyHg6Sm71zByJ5",
      photoUri: "",
      firstName: "Darren",
      lastName: "Furr",
    },
    type: MessageType.Text,
  },
];
