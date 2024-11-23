declare const turnstile: {
  reset: (element: HTMLElement) => void;
  render: (
    container: HTMLElement,
    options: { sitekey: string; size: "normal" | "compact" },
  ) => void;
};
