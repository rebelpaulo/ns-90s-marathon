"use client";

/**
 * Scrub de vídeo por scroll, endurecido para telemóvel:
 * - o clip é carregado como Blob (sempre "seekable", não depende de byte-range);
 * - os seeks são coalescidos (nunca se pede um currentTime novo enquanto o decoder está a fazer seek);
 * - o poster fica visível até o vídeo pintar o 1.º frame.
 */
export type Scrubber = {
  load: () => void;
  seek: (t: number) => void;
  dispose: () => void;
};

export function createScrubber(video: HTMLVideoElement, src: string, onReady?: () => void): Scrubber {
  let url: string | null = null;
  let loading = false;
  let disposed = false;
  let pending: number | null = null;

  const apply = (t: number) => {
    if (!video.src || !Number.isFinite(video.duration) || video.readyState < 1) {
      pending = t;
      return;
    }
    if (video.seeking) {
      pending = t;
      return;
    }
    const target = Math.min(video.duration - 0.04, Math.max(0, t * video.duration));
    if (Math.abs(video.currentTime - target) > 0.012) video.currentTime = target;
  };

  const flush = () => {
    if (pending === null) return;
    const t = pending;
    pending = null;
    apply(t);
  };

  const onLoaded = () => {
    onReady?.();
    flush();
  };
  video.addEventListener("seeked", flush);
  video.addEventListener("loadeddata", onLoaded);

  // iOS: "acordar" o decoder no primeiro toque
  const prime = () => {
    if (!video.src) return;
    const p = video.play();
    if (p) p.then(() => video.pause()).catch(() => {});
  };
  window.addEventListener("touchstart", prime, { once: true, passive: true });

  return {
    load() {
      if (loading || disposed) return;
      loading = true;
      fetch(src)
        .then((r) => {
          if (!r.ok) throw new Error(`clip ${r.status}`);
          return r.blob();
        })
        .then((blob) => {
          if (disposed) return;
          url = URL.createObjectURL(blob);
          video.src = url;
          video.load();
        })
        .catch(() => {
          /* sem vídeo: fica o poster */
        });
    },
    seek: apply,
    dispose() {
      disposed = true;
      video.removeEventListener("seeked", flush);
      video.removeEventListener("loadeddata", onLoaded);
      window.removeEventListener("touchstart", prime);
      video.removeAttribute("src");
      video.load();
      if (url) URL.revokeObjectURL(url);
    },
  };
}
