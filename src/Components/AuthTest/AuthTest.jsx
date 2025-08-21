import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function AuthTest() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const supabase = useSupabaseClient();

  const testConnection = async () => {
    setStatus("loading");
    setMessage("Testing connection...");
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select("count");
      if (error) {
        setStatus("error");
        setMessage(`Error: ${error}`);
      } else {
        setStatus("success");
        setMessage("Connection successful!");
      }
    } catch (error) {
      setStatus("error");
      setMessage(`Connection failed: ${error}`);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #ddd",
        margin: "20px",
        borderRadius: "8px",
      }}
    >
      <h3>Supabase Connection Test</h3>

      <button onClick={testConnection}>Test Connection</button>

      <p>Status: {status}</p>
      <p>Message: {message}</p>
    </div>
  );
}
