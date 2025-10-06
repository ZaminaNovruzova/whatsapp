export const users = [


  { id: "alice", name: "Alice", password: "alice123", color: "#7c3aed" ,image:"",},
  { id: "bob", name: "Bob", password: "bob123", color: "#0ea5e9" },
] as const;
export type UserId = (typeof users)[number]["id"];
