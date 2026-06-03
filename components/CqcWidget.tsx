"use client";

import { useEffect, useRef } from "react";

type CqcWidgetProps = {
  locationId: string;
};

export function CqcWidget({ locationId }: CqcWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.innerHTML = "";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.cqc.org.uk/sites/all/modules/custom/cqc_widget/widget.js?data-id=${locationId}&data-host=https://www.cqc.org.uk&type=location`;
    script.async = true;
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [locationId]);

  return <div ref={containerRef} className="min-h-24" />;
}
