"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";

type HtmlBlockProps = {
  html: string;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
  suppressHydrationWarning?: boolean;
};

export function HtmlBlock({
  html,
  className,
  as: Tag = "div",
  suppressHydrationWarning = true,
}: HtmlBlockProps) {
  const innerHTML = useMemo(() => ({ __html: html }), [html]);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    // Handle mobile menu toggler (hamburger and close button)
    const toggler = target.closest(".elementskit-menu-toggler");
    if (toggler) {
      e.preventDefault();
      e.stopPropagation();
      const nav = target.closest(".ekit_menu_responsive_mobile") || document.querySelector(".ekit_menu_responsive_mobile");
      if (nav) {
        const container = nav.querySelector(".elementskit-menu-container");
        const overlay = nav.querySelector(".elementskit-menu-overlay");
        container?.classList.toggle("active");
        overlay?.classList.toggle("active");
      }
      return;
    }

    // Handle dropdown toggle for mobile
    const dropdownToggle = target.closest(".ekit-menu-dropdown-toggle");
    if (dropdownToggle) {
      e.preventDefault();
      e.stopPropagation();
      const li = dropdownToggle.closest("li");
      const dropdown = li?.querySelector(".elementskit-dropdown") as HTMLElement;
      if (dropdown) {
        dropdown.classList.toggle("active");
        if (dropdown.style.display === "block") {
          dropdown.style.display = "none";
        } else {
          dropdown.style.display = "block";
        }
      }
      return;
    }

    const anchor = target.closest("a");

    if (!anchor) return;

    // Close mobile menu on link click
    const nav = target.closest(".ekit_menu_responsive_mobile") || document.querySelector(".ekit_menu_responsive_mobile");
    if (nav) {
      const container = nav.querySelector(".elementskit-menu-container");
      const overlay = nav.querySelector(".elementskit-menu-overlay");
      container?.classList.remove("active");
      overlay?.classList.remove("active");
    }
    
    const href = anchor.getAttribute("href");
    const targetAttr = anchor.getAttribute("target");
    
    // Ignore if no href, or if opening in a new tab/window
    if (!href || targetAttr === "_blank" || e.ctrlKey || e.metaKey || e.shiftKey) return;
    
    // Ignore hashes
    if (href.startsWith("#")) return;
    
    // Handle same origin internal navigation
    if (href.startsWith("/") && !href.startsWith("//")) {
      e.preventDefault();
      const cleanHref = href.split("?")[0].replace(/\/$/, "") || "/";
      const cleanPath = window.location.pathname.replace(/\/$/, "") || "/";
      if (cleanHref === cleanPath) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo(0, 0);
        router.push(href);
      }
    } else if (href.startsWith(window.location.origin)) {
      e.preventDefault();
      const relativeHref = href.replace(window.location.origin, "") || "/";
      const cleanHref = relativeHref.split("?")[0].replace(/\/$/, "") || "/";
      const cleanPath = window.location.pathname.replace(/\/$/, "") || "/";
      if (cleanHref === cleanPath) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo(0, 0);
        router.push(relativeHref);
      }
    }
  };

  return React.createElement(Tag, {
    className,
    dangerouslySetInnerHTML: innerHTML,
    suppressHydrationWarning,
    onClick: handleClick,
  });
}
