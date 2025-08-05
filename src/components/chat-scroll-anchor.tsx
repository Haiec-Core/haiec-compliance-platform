import * as React from "react";
import { useInView } from "react-intersection-observer";

interface ChatScrollAnchorProps {
  trackVisibility?: boolean;
}

export function ChatScrollAnchor({ trackVisibility }: ChatScrollAnchorProps) {
  const { ref, inView } = useInView({
    trackVisibility,
    delay: 100,
    rootMargin: "0px 0px -150px 0px",
  });

  React.useEffect(() => {
    const scrollArea = document.querySelector(".chat-scroll-area > div");
    if (scrollArea && trackVisibility && !inView) {
      scrollArea.scrollTo({
        top: scrollArea.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [inView, trackVisibility]);

  return <div ref={ref} className="h-px  w-full" />;
}
