"use client";

import { useState, useEffect, useMemo } from "react";

export function useImages(count: number) {
  const [loaded, setLoaded] = useState(false);

  const images = useMemo(
    () => Array.from({ length: count }, (_, i) => `/puzzle${i + 1}.png`),
    [count],
  );

  useEffect(() => {
    let cancelled = false;

    const promises = images.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        }),
    );

    Promise.all(promises).then(() => {
      if (!cancelled) setLoaded(true);
    });

    return () => {
      cancelled = true;
    };
  }, [images]);

  return { images, loaded };
}
