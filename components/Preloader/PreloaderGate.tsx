import Script from "next/script";

/**
 * Blocking, render-hiding script that runs during HTML parsing — before the
 * first paint.
 *
 * The intro overlay is part of the server-rendered markup so it can cover the
 * hero from the very first frame. That means the "should I even show this?"
 * decision has to be made synchronously, otherwise reduced-motion users would
 * see the overlay flash before React hydrates and unmounts it. Reading
 * `prefers-reduced-motion` here and flipping a `data-preloader` attribute lets
 * CSS hide the overlay with zero flash.
 */
const GATE_SCRIPT = `(function(){try{
if("scrollRestoration" in history){history.scrollRestoration="manual"}
window.scrollTo(0,0);
var reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(reduced){document.documentElement.setAttribute("data-preloader","skip")}
}catch(e){}})();`;

export default function PreloaderGate() {
  return (
    <Script id="preloader-gate" strategy="beforeInteractive">
      {GATE_SCRIPT}
    </Script>
  );
}
