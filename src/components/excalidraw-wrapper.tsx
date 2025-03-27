"use client";

import type { FC } from "react";

import { useEffect, useRef } from "react";

export const ExcalidrawWrapper: FC = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/build/excalidraw.umd.js"; // Adjust this path as needed
    // Remove type="module" for UMD bundles.
    script.async = true;
    script.onload = () => {
      if (
        containerRef.current &&
        typeof window.ExcalidrawAppLib === "function"
      ) {
        // Now call the default export (which is the mount function)
        window.ExcalidrawAppLib(containerRef.current);
      } else {
        console.error("mount function not found on ExcalidrawAppLib");
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div ref={containerRef} />;
};
