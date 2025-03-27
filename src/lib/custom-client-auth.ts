import { useAuth } from "@payloadcms/ui";
import { useEffect, useState } from "react";

export interface CustomClientAuth {
  /**
   * undefined means the user state is still pending
   * null means the user is not authenticated
   * otherwise, the user is authenticated
   */

  strategy?: string;
  token?: null | string;
}
export const useCustomClientAuth = () => {
  const { user } = useAuth();
  const [customAuth, setCustomAuth] = useState<CustomClientAuth>({});
  useEffect(() => {
    let subscribed = true;
    void (async () => {
      try {
        if (user === undefined) {
          return;
        }
        if (user === null) {
          if (subscribed) {
            setCustomAuth({ token: null });
          }
          return;
        }
        const meResponse = await fetch(`/api/${user.collection}/me`);
        if (!meResponse.ok) {
          if (subscribed) {
            setCustomAuth({ token: null });
          }
          return;
        }
        const meResponseBody = await meResponse.json();
        const token = meResponseBody?.token;
        const strategy = meResponseBody?.strategy;
        if (typeof token !== "string" || typeof strategy !== "string") {
          if (subscribed) {
            setCustomAuth({ token: null });
          }
          return;
        }
        if (subscribed) {
          setCustomAuth({ strategy, token });
        }
      } catch {
        if (subscribed) {
          setCustomAuth({ token: null });
        }
      }
    })();
    return () => {
      subscribed = false;
    };
  }, []);

  return customAuth;
};
