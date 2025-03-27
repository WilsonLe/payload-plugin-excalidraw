"use client";

import type { FC } from "react";

import { useEffect, useRef } from "react";

export const ExcalidrawWrapper: FC = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Dynamically load the Vite bundle script.
    const script = document.createElement("script");
    script.src = "/build/excalidraw.umd.js";
    script.type = "module";
    script.async = true;
    script.onload = () => {
      if (containerRef.current && window.mountExcalidraw) {
        window.mountExcalidraw(containerRef.current);
      } else {
        console.error("mountExcalidraw is not defined");
      }
    };

    document.body.appendChild(script);

    // Cleanup the script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div ref={containerRef} />;
};
