import { useState } from "react";
import { users } from "../../../db/users";

const Login = ({ onLogin }: { onLogin: (id: string) => void }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    const found = users.find(
      (user) => user.name.toLowerCase() === username.toLowerCase()
    );
    if (!found || found.password !== password) {
      setError("Yanlış username və ya parol.");
      return;
    }
    setError(null);
    localStorage.setItem("currentUser", found.id);
    onLogin(found.id);
  }

  return (
    <section className="loginPage">
      <div className="container">
        <div className="row">
          <h2 className="title">Login</h2>
          <form className="loginForm" onSubmit={handleSubmitForm}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
