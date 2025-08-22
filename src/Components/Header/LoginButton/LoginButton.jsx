import React, { useEffect, useRef } from "react";
import "./LoginButton.css";
import { AiOutlineGoogle } from "react-icons/ai";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import UserDropdown from "../UserDropdown/UserDropdown";
import {
  TABLES,
  USER_PLANS,
  CONVERSATION_TYPES,
} from "../../../constants/database";
import { setConversations } from "../../../redux/actions";
import { useDispatch } from "react-redux";

export default function LoginButton() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const isCreatingDefault = useRef(false);
  const dispatch = useDispatch();
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

  const checkForDefaultConversation = async () => {
    if (!user) return;
    const { data: existingDefault, error } = await supabase
      .from("conversation_participants")
      .select(
        `conversation_id, ${TABLES.CONVERSATIONS}!inner(id, title, created_at)`
      )
      .eq("user_id", user.id)
      .eq(`${TABLES.CONVERSATIONS}.title`, "Default");
    return { existingDefault, error };
  };

  const ensureDefaultConversation = async () => {
    if (isCreatingDefault.current) return;
    isCreatingDefault.current = true;
    try {
      const { existingDefault, error } = await checkForDefaultConversation();
      if (error) {
        console.log("Errore nel controllo:", error);
        return;
      }
      if (existingDefault.length === 0) {
        const { data: newConversation, error: conversationError } =
          await supabase
            .from(TABLES.CONVERSATIONS)
            .insert({ title: "Default" })
            .select()
            .single();
        if (conversationError) {
          console.log(
            "Errore nella creazione della conversazione:",
            conversationError
          );
          return;
        }
        const { error: participantError } = await supabase
          .from(TABLES.CONVERSATION_PARTICIPANTS)
          .insert({
            conversation_id: newConversation.id,
            user_id: user.id,
            type: CONVERSATION_TYPES.CREATOR,
          });
        if (participantError) {
          console.log(
            "Errore nell'aggiunta del partecipante:",
            participantError
          );
          return;
        }
      }
    } catch (unexpectedError) {
      console.error("Errore imprevisto durante l'operazione:", unexpectedError);
    } finally {
      isCreatingDefault.current = false;
    }
  };

  const ensureUserPlan = async () => {
    if (!user) return;
    if (!user.user_metadata.plan) {
      const { error } = await supabase.auth.updateUser({
        data: { plan: USER_PLANS.FREE },
      });
      if (error) console.log("Error setting plan:", error);
    }
  };

  const getConversations = async () => {
    if (!user) return;
    try {
      const { data: conversationsData, error } = await supabase
        .from(TABLES.CONVERSATION_PARTICIPANTS)
        .select(`conversations!inner(id, title, created_at)`)
        .eq("user_id", user.id)
        .eq("conversations.disabled", false);
      if (error) console.log("Errore nella query:", error);
      if (conversationsData && conversationsData.length > 0) {
        dispatch(
          setConversations(
            conversationsData.map((item) => {
              return {
                id: item.conversations.id,
                title: item.conversations.title,
                created_at: item.conversations.created_at,
              };
            })
          )
        );
      }
    } catch (error) {
      console.log("Errore imprevisto:", error);
    }
  };

  useEffect(() => {
    if (user) {
      ensureUserPlan();
      ensureDefaultConversation();
      getConversations();
    }
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
