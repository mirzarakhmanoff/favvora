"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = document.createElement("div");
    host.style.position = "fixed";
    host.style.inset = "0";
    host.style.zIndex = String(2147483647); // eng yuqori qatlam
    document.body.appendChild(host);
    hostRef.current = host;
    setMounted(true);
    return () => {
      document.body.removeChild(host);
      hostRef.current = null;
    };
  }, []);

  if (!mounted || !hostRef.current) return null;
  return createPortal(children, hostRef.current);
}
