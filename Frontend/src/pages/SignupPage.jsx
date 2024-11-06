import { useState } from "react";

const signupForm = () => {
  const { name, setName } = useState("");
  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");
  const { error, setError } = useState(null);
  const handleSubmit = async (e) => {
    e.prevenDefault();
    const data = { name, email, password };
    const response = await fetch("/user/signup", {
      method: "POST",
      body: JSON.stringify(data),
      header: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName(" ");
      setEmail(" ");
      setPassword(" ");
      setError(null);
      console.log("new user account added");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <input
        placeholder="name"
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />{" "}
      // input field for name
      <input
        placeholder="email"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />{" "}
      // input field for email
      <input
        placeholder="password"
        type="text"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />{" "}
      // input field for name
    </form>
  );
};
