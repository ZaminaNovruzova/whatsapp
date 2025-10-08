export const users = [
  {
    id: "alice",
    name: "Alice",
    password: "alice123",
    color: "#7c3aed",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: "bob",
    name: "Bob",
    password: "bob123",
    color: "#0ea5e9",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: "carol",
    name: "Carol",
    password: "carol123",
    color: "#f59e0b",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "dave",
    name: "Dave",
    password: "dave123",
    color: "#10b981",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
  },
] as const;

export type UserId = (typeof users)[number]["id"];
