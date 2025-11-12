// ===== INITIALISATION DOM =====
document.addEventListener("DOMContentLoaded", function () {
    // ===== GESTION DU LOADER =====
    setTimeout(() => {
        document.querySelector(".loader").classList.add("hidden");
    }, 1000);

    // ===== MENU MOBILE =====
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navMenu = document.querySelector(".nav-menu");

    mobileMenuBtn.addEventListener("click", function () {
        this.classList.toggle("active");
        navMenu.classList.toggle("active");

        // Prévention du scroll quand le menu est ouvert
        if (navMenu.classList.contains("active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    });

    // Fermeture du menu mobile au clic sur un lien
    document.querySelectorAll(".nav-menu a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenuBtn.classList.remove("active");
            navMenu.classList.remove("active");
            document.body.style.overflow = "auto";
        });
    });

    // ===== NAVIGATION FLUIDE =====
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });

    // ===== GALERIE - APERÇU D'IMAGE =====
    const galleryItems = document.querySelectorAll(".gallery-item");
    const imageModal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeImageModal = document.querySelector("#imageModal .close-modal");

    galleryItems.forEach((item) => {
        const img = item.querySelector("img");
        img.style.cursor = "pointer";

        img.addEventListener("click", function () {
            modalImage.src = this.src;
            modalImage.alt = this.alt;
            imageModal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    // Fermer la modal d'image
    closeImageModal.addEventListener("click", function () {
        imageModal.classList.remove("active");
        document.body.style.overflow = "auto";
    });

    // Fermer en cliquant à l'extérieur de l'image
    imageModal.addEventListener("click", function (e) {
        if (e.target === imageModal) {
            imageModal.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });

    // Fermer avec la touche Échap
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && imageModal.classList.contains("active")) {
            imageModal.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });

    // ===== ACCORDÉON FAQ =====
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach((header) => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector("i");

            // Basculer l'élément actuel
            content.classList.toggle("active");
            icon.classList.toggle("fa-chevron-down");
            icon.classList.toggle("fa-chevron-up");

            // Fermer les autres éléments
            accordionHeaders.forEach((otherHeader) => {
                if (otherHeader !== header) {
                    const otherContent = otherHeader.nextElementSibling;
                    const otherIcon = otherHeader.querySelector("i");

                    otherContent.classList.remove("active");
                    otherIcon.classList.remove("fa-chevron-up");
                    otherIcon.classList.add("fa-chevron-down");
                }
            });
        });
    });

    // ===== EFFETS HEADER AU SCROLL =====
    window.addEventListener("scroll", () => {
        const header = document.querySelector(".header");
        const backToTop = document.querySelector(".back-to-top");

        if (window.scrollY > 100) {
            header.classList.add("scrolled");
            backToTop.classList.add("visible");
        } else {
            header.classList.remove("scrolled");
            backToTop.classList.remove("visible");
        }
    });

    // ===== ANIMATIONS AU SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
            }
        });
    }, observerOptions);

    // Observer tous les éléments à animer
    document
        .querySelectorAll(
            ".class-card, .instructor-card, .testimonial-card, .stat-item, .about-image, .accordion-item, .gallery-item"
        )
        .forEach((el) => {
            observer.observe(el);
        });
});