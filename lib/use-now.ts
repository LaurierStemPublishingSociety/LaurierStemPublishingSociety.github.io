"use client";

/**
 * The site is built ahead of time, so "now" at build time can be days old.
 * This hook starts with the build time (so the first render matches the
 * pre-built HTML) and then switches to the visitor's real current time.
 * That way an event moves from "upcoming" to "past" on its own, without
 * a rebuild.
 */
import { useEffect, useState } from "react";

export function useNow(builtAt: number): Date {
  const [now, setNow] = useState(() => new Date(builtAt));
  useEffect(() => {
    setNow(new Date());
  }, []);
  return now;
}
