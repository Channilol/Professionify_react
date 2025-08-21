import React, { useEffect } from "react";
import "./LoginButton.css";
import { AiOutlineGoogle } from "react-icons/ai";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import UserDropdown from "../UserDropdown/UserDropdown";

export default function LoginButton() {
  const user = useUser();
  const supabase = useSupabaseClient();

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) console.error("Login error:", error);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const ensureUserPlan = async () => {
    if (!user) return;
    if (!user.user_metadata.plan) {
      const { error } = await supabase.auth.updateUser({
        data: { plan: "free" },
      });
      if (error) console.log("Error setting plan:", error);
    }
  };

  useEffect(() => {
    if (user) ensureUserPlan();
  }, [user]);

  return (
    <>
      {!user ? (
        <button
          className="login-logout-btn header-btn"
          onClick={handleGoogleLogin}
        >
          <AiOutlineGoogle />
          <p>Login with Google</p>
        </button>
      ) : (
        <UserDropdown />
      )}
    </>
  );
}
