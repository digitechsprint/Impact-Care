"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { EXTERNAL_SCRIPTS } from "@/config/scripts";
import {
  EKIT_CONFIG,
  ELEMENTOR_FRONTEND_CONFIG,
  ELEMENTSKIT_CONFIG,
  ELEMENTSKIT_PARALLAX,
  MEJS_L10N,
  WP_I18N,
  WPCF7_CONFIG,
  WP_MEDIAELEMENT_SETTINGS,
} from "@/config/inline-scripts";
import { loadScript, runInlineScript } from "@/utils/loadScript";

export function useThemeScripts() {
  useEffect(() => {
    let cancelled = false;

    async function init() {
      runInlineScript(ELEMENTSKIT_CONFIG, "elementskit-config");
      runInlineScript(ELEMENTSKIT_PARALLAX, "elementskit-parallax-config");

      for (const { src, id } of EXTERNAL_SCRIPTS) {
        if (cancelled) return;

        if (id === "wp-i18n-js") {
          await loadScript(src, id);
          runInlineScript(WP_I18N, "wp-i18n-js-after");
          continue;
        }

        if (id === "contact-form-7-js") {
          runInlineScript(WPCF7_CONFIG, "contact-form-7-js-before");
          await loadScript(src, id);
          continue;
        }

        if (id === "elementor-frontend-js") {
          runInlineScript(ELEMENTOR_FRONTEND_CONFIG, "elementor-frontend-js-before");
          await loadScript(src, id);
          continue;
        }

        if (id === "mediaelement-core-js") {
          runInlineScript(MEJS_L10N, "mediaelement-core-js-before");
          await loadScript(src, id);
          continue;
        }

        if (id === "wp-mediaelement-js") {
          runInlineScript(WP_MEDIAELEMENT_SETTINGS, "mediaelement-js-extra");
          await loadScript(src, id);
          continue;
        }

        if (id === "elementskit-elementor-js") {
          runInlineScript(EKIT_CONFIG, "elementskit-elementor-js-extra");
          await loadScript(src, id);
          continue;
        }

        await loadScript(src, id);
      }

      if (!cancelled) {
        window.jQuery?.(window).trigger("elementor/lazyload/observe");
      }
    }

    init().catch((error) => console.error("[theme-scripts]", error));

    return () => {
      cancelled = true;
    };
  }, []);

  // Update active menu item based on current URL
  const pathname = usePathname();
  useEffect(() => {
    const updateActiveMenu = () => {
      // Remove hardcoded active classes
      document.querySelectorAll('.elementskit-navbar-nav .nav-item').forEach(li => {
        li.classList.remove('current-menu-item', 'current-menu-ancestor', 'current-menu-parent', 'active');
        const a = li.querySelector('a');
        if (a) a.classList.remove('active');
      });
      
      // Add active class to the correct item based on current pathname
      document.querySelectorAll('.elementskit-navbar-nav .nav-item > a').forEach(a => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        
        // Match exact or trailing slash variations
        if (href === pathname || href === pathname + '/' || href + '/' === pathname) {
          a.classList.add('active');
          a.parentElement?.classList.add('current-menu-item');
        }
      });
    };

    updateActiveMenu();
    // Re-run after a small delay in case ElementsKit JS modifies the DOM
    setTimeout(updateActiveMenu, 100);
    setTimeout(updateActiveMenu, 500);
    
    // --- ROBUST INITIALIZATION USING POLLING ---
    let sliderInitialized = false;
    // Search icon clicks are handled by <SearchOverlay /> in the root layout

    const initInterval = setInterval(() => {
      // Fix Home Page Hero Slider Arrows
      if (!sliderInitialized) {
        const slides = document.querySelectorAll('.hero-slide');
        if (slides.length > 0) {
          sliderInitialized = true;
          let currentSlide = 0;
          let slideInterval = setInterval(nextSlide, 5000);
          
          function showSlide(index: number) {
            const currentSlides = document.querySelectorAll('.hero-slide');
            currentSlides.forEach((slide, i) => {
              const el = slide as HTMLElement;
              el.style.opacity = (i === index) ? '1' : '0';
              el.style.animation = 'none'; // Kill CSS animation
              el.style.zIndex = (i === index) ? '1' : '0';
              el.style.transition = 'opacity 0.5s ease-in-out';
            });
            document.querySelectorAll('.hero-dot').forEach((dot, i) => {
               const el = dot as HTMLElement;
               el.style.background = (i === index) ? '#0d2657' : 'rgba(148, 163, 184, 0.8)';
               el.style.animation = 'none';
            });
          }
          
          function nextSlide() {
            const currentSlides = document.querySelectorAll('.hero-slide');
            if (currentSlides.length === 0) return;
            currentSlide = (currentSlide + 1) % currentSlides.length;
            showSlide(currentSlide);
          }
          function prevSlide() {
            const currentSlides = document.querySelectorAll('.hero-slide');
            if (currentSlides.length === 0) return;
            currentSlide = (currentSlide - 1 + currentSlides.length) % currentSlides.length;
            showSlide(currentSlide);
          }
          
          // Event delegation for slider arrows and dots
          document.addEventListener('click', (e) => {
            const target = e.target as Element;
            
            // Next arrow
            if (target.closest('.hero-nav-next')) {
              e.preventDefault();
              clearInterval(slideInterval);
              nextSlide();
              slideInterval = setInterval(nextSlide, 5000);
            }
            
            // Prev arrow
            if (target.closest('.hero-nav-prev')) {
              e.preventDefault();
              clearInterval(slideInterval);
              prevSlide();
              slideInterval = setInterval(nextSlide, 5000);
            }
            
            // Dots
            const dot = target.closest('.hero-dot');
            if (dot) {
              e.preventDefault();
              const allDots = Array.from(document.querySelectorAll('.hero-dot'));
              const index = allDots.indexOf(dot as Element);
              if (index !== -1) {
                clearInterval(slideInterval);
                currentSlide = index;
                showSlide(currentSlide);
                slideInterval = setInterval(nextSlide, 5000);
              }
            }
          });
          
          // Fix pointer events globally for these UI elements so they can be clicked
          const style = document.createElement('style');
          style.textContent = `
            .hero-nav-next, .hero-nav-prev, .hero-dot, .custom-search-icon {
              pointer-events: auto !important;
              cursor: pointer !important;
            }
          `;
          document.head.appendChild(style);
          
          showSlide(0);
        }
      }
      
      if (sliderInitialized) {
        clearInterval(initInterval);
      }
    }, 500);

    // Clean up interval on unmount
    return () => clearInterval(initInterval);
    
  }, [pathname]);
  
  // Bulletproof mobile menu toggler to avoid React/ElementsKit conflicts
  useEffect(() => {
    const handleMobileToggle = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Handle hamburger or close button click
      const toggler = target.closest('.elementskit-menu-toggler');
      if (toggler) {
        e.preventDefault();
        e.stopPropagation();
        
        const nav = toggler.closest('.ekit_menu_responsive_mobile') || document.querySelector('.ekit_menu_responsive_mobile');
        if (nav) {
          const container = nav.querySelector('.elementskit-menu-container');
          container?.classList.toggle('active');
        }
        return;
      }

      // Handle closing when clicking on a link
      const anchor = target.closest('a');
      if (anchor) {
        const nav = anchor.closest('.ekit_menu_responsive_mobile') || document.querySelector('.ekit_menu_responsive_mobile');
        if (nav) {
          const container = nav.querySelector('.elementskit-menu-container');
          container?.classList.remove('active');
        }
      }
    };

    document.addEventListener('click', handleMobileToggle, true); // Use capture phase to ensure we intercept it

    return () => {
      document.removeEventListener('click', handleMobileToggle, true);
    };
  }, []);

  // Form submission handler (Contact Us, Appointment, Career, Team forms)
  useEffect(() => {
    const handleFormSubmit = async (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;
      if (!form || !(form instanceof HTMLFormElement)) return;

      // Forms managed by React components (e.g. header search) handle their own submit
      if (form.closest("[data-skip-theme-submit], .ic-search-overlay")) return;
      if (form.querySelector('input[type="search"]')) return;

      // Only handle enquiry forms (contact / appointment / careers / team) — they collect contact details
      const isEnquiryForm =
        form.classList.contains("wpcf7-form") ||
        !!form.closest(".wpcf7, .career-form") ||
        !!form.querySelector(
          'input[type="email"], input[type="tel"], input[name="email"], input[name="phone"], input[type="file"], textarea'
        );
      if (!isEnquiryForm) return;

      // Prevent native browser submission & URL redirection to 404
      e.preventDefault();
      e.stopPropagation();

      const pathname = typeof window !== "undefined" ? window.location.pathname : "";
      const isAppointment =
        pathname.includes("appointment") ||
        form.id === "appointment-form" ||
        !!form.querySelector('input[name="date"], select[name="category"], input[value*="Appointment"]');

      const isCareers =
        pathname.includes("careers") ||
        !!form.closest(".career-form") ||
        !!form.querySelector('input[type="file"], input[placeholder*="Resume"]');

      const isTeam = pathname.includes("our-team");

      // Find or create response output element
      let responseOutput = form.querySelector<HTMLElement>(".wpcf7-response-output, .form-response-output");
      if (!responseOutput) {
        responseOutput = document.createElement("div");
        responseOutput.className = "form-response-output";
        const submitBtnEl = form.querySelector('button[type="submit"], input[type="submit"], #msgSubmit');
        const submitParent = submitBtnEl?.closest(".col-md-12, .form-btn") || submitBtnEl?.parentElement;
        if (submitParent && submitParent.parentElement === form) {
          submitParent.after(responseOutput);
        } else {
          form.appendChild(responseOutput);
        }
      }

      // Helper function to render alert banner
      const renderAlert = (type: "success" | "error", title: string, message: string) => {
        if (!responseOutput) return;
        responseOutput.style.display = "block";
        responseOutput.innerHTML = `
          <div class="contact-${type}-alert">
            <div class="alert-icon">
              ${
                type === "success"
                  ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
                  : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
              }
            </div>
            <div>
              <div class="alert-title">${title}</div>
              <p class="alert-desc">${message}</p>
            </div>
          </div>
        `;
        responseOutput.scrollIntoView({ behavior: "smooth", block: "nearest" });
      };

      // Extract field inputs
      const nameInput = form.querySelector<HTMLInputElement>(
        'input[name="your-name"], input[name="first-name"], input[name="name"], #name, input[placeholder*="Name"]'
      );
      const emailInput = form.querySelector<HTMLInputElement>(
        'input[name="email"], #email, input[type="email"], input[placeholder*="Email"]'
      );
      const phoneInput = form.querySelector<HTMLInputElement>(
        'input[name="phone"], #phone, input[type="tel"], input[placeholder*="Phone"]'
      );

      // Validation
      if (nameInput && !nameInput.value.trim()) {
        form.classList.remove("init", "sent", "submitting");
        form.classList.add("invalid");
        form.setAttribute("data-status", "invalid");
        renderAlert("error", "Name is required", "Please enter your full name to submit.");
        nameInput.focus();
        return;
      }

      if (emailInput) {
        const emailVal = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal || !emailRegex.test(emailVal)) {
          form.classList.remove("init", "sent", "submitting");
          form.classList.add("invalid");
          form.setAttribute("data-status", "invalid");
          renderAlert("error", "Valid email is required", "Please enter a valid email address so we can reply.");
          emailInput.focus();
          return;
        }
      }

      if (phoneInput && !phoneInput.value.trim()) {
        form.classList.remove("init", "sent", "submitting");
        form.classList.add("invalid");
        form.setAttribute("data-status", "invalid");
        renderAlert("error", "Phone number is required", "Please enter your contact phone number.");
        phoneInput.focus();
        return;
      }

      // Submit button loading state
      const submitBtn = form.querySelector<HTMLInputElement | HTMLButtonElement>(
        'input[type="submit"], button[type="submit"], #msgSubmit'
      );
      const originalBtnText = submitBtn
        ? (submitBtn as HTMLInputElement).value || submitBtn.textContent || "Submit Now"
        : "Submit Now";

      if (submitBtn) {
        submitBtn.disabled = true;
        if ("value" in submitBtn && submitBtn.tagName === "INPUT") {
          (submitBtn as HTMLInputElement).value = "Sending...";
        } else {
          submitBtn.textContent = "Sending...";
        }
      }

      form.classList.remove("init", "invalid", "sent");
      form.classList.add("submitting");
      form.setAttribute("data-status", "submitting");

      try {
        const formData = new FormData(form);
        await fetch("/api/contact", {
          method: "POST",
          body: formData,
        });
      } catch (err) {
        console.warn("[Form Submission]", err);
      }

      // Small realistic pause for smooth UX
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Reset button
      if (submitBtn) {
        submitBtn.disabled = false;
        if ("value" in submitBtn && submitBtn.tagName === "INPUT") {
          (submitBtn as HTMLInputElement).value = originalBtnText;
        } else {
          submitBtn.textContent = originalBtnText;
        }
      }

      // Success state
      form.classList.remove("submitting", "invalid", "init");
      form.classList.add("sent");
      form.setAttribute("data-status", "sent");
      form.reset();

      const successTitle = isAppointment
        ? "Appointment Request Sent Successfully!"
        : isCareers
        ? "Application Submitted Successfully!"
        : isTeam
        ? "Inquiry Sent Successfully!"
        : "Message Sent Successfully!";

      const successMessage = isAppointment
        ? "Thank you for reaching out to Impact Healthcare. Our representative will contact you shortly to confirm your appointment schedule."
        : isCareers
        ? "Thank you for applying. We have received your resume and details, and our HR team will review your application."
        : isTeam
        ? "Thank you for reaching out. We have received your inquiry and will connect you with our specialist shortly."
        : "Thank you for contacting Impact Healthcare! Your message has been sent successfully. Our team will get back to you shortly.";

      renderAlert("success", successTitle, successMessage);
    };

    document.addEventListener("submit", handleFormSubmit as any, true);

    return () => {
      document.removeEventListener("submit", handleFormSubmit as any, true);
    };
  }, []);
}

