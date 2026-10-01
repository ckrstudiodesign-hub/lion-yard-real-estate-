"use client";


import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { IntroProvider } from "@/components/providers/IntroProvider";
import { PageTransitionProvider } from "@/components/providers/PageTransitionProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";

/**
 * Single mounting point for every global system, in dependency order:
 *
 *   IntroProvider          entrance choreography state
 *   SmoothScrollProvider   Lenis + GSAP ticker
 *   PageTransitionProvider route-change cover (TransitionLink depends on it)
 *   CustomCursor           desktop pointer treatment (self-disabling)
 *
 * The footer is mounted here rather than per page, so every route ends the same
 * way and nothing can ship without one.
 *
 * The branded preloader belongs to the homepage only. Because the shell knows
 * the route, the Header can also wait for the curtain on the homepage while
 * appearing instantly everywhere else.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <IntroProvider skip={true}>
      <SmoothScrollProvider>
        <PageTransitionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </PageTransitionProvider>
      </SmoothScrollProvider>
    </IntroProvider>
  );
}
