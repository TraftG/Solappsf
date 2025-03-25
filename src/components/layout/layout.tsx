
import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";
import { useEffect } from "react";

export function Layout() {
  useEffect(() => {
    // Apply reveal animations as elements come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll(".reveal-animation");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
