import { useEffect } from "react";

export const usePreventDefaultOnBeforeUnloadingEvent = (
  isPending: () => boolean,
  clear: () => void,
) => {
  useEffect(() => {
    // before unload is triggered user closes the tab or navigates to another page
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isPending()) {
        e.preventDefault();
      }
    };

    // unload is triggered when user refreshes the page
    const handleUnload = () => {
      if (isPending()) {
        clear();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
      if (isPending()) {
        clear();
      }
    };
  }, [clear, isPending]);
};
