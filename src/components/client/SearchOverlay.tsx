"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/lib/data/products";

const MAX_SUGGESTIONS = 6;

export function SearchOverlay() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Open the overlay when any header search icon is clicked (icons live in static HTML)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(".custom-search-icon")) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      clearTimeout(focusTimer);
    };
  }, [open]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.composition.toLowerCase().includes(q)
      )
      .slice(0, MAX_SUGGESTIONS);
  }, [query]);

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  const go = (href: string) => {
    close();
    router.push(href);
  };

  const searchAll = () => {
    const q = query.trim();
    if (!q) return;
    go("/products?search=" + encodeURIComponent(q));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchAll();
  };

  if (!open) return null;

  return (
    <div className="ic-search-overlay" role="dialog" aria-modal="true" aria-label="Search products" onClick={close}>
      <div className="ic-search-panel" onClick={(e) => e.stopPropagation()}>
        <form className="ic-search-form" onSubmit={handleSubmit} data-skip-theme-submit>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, e.g. Levoray, syrup, injection..."
            aria-label="Search products"
          />
          <button type="button" className="ic-search-close" onClick={close} aria-label="Close search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </form>

        {query.trim() && (
          <div className="ic-search-results">
            {suggestions.length > 0 ? (
              <>
                {suggestions.map((p) => (
                  <button key={p.id} type="button" className="ic-search-item" onClick={() => go(`/products/${p.slug}`)}>
                    <img
                      src={p.imgSource ? `/assets/uploads/products/${p.imgSource}` : "/assets/uploads/products/tablet_mockup.png"}
                      alt=""
                    />
                    <span className="ic-search-item-text">
                      <span className="ic-search-item-title">{p.title}</span>
                      <span className="ic-search-item-cat">{p.category}</span>
                    </span>
                  </button>
                ))}
                <button type="button" className="ic-search-all" onClick={searchAll}>
                  View all results for &quot;{query.trim()}&quot; →
                </button>
              </>
            ) : (
              <div className="ic-search-empty">No products found for &quot;{query.trim()}&quot;</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
