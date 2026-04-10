/* ============================================================
   OTOGRAF® — Interactive Script v2
   Product Overlays, Scroll Progress, Animations
   ============================================================ */
(function () {
    'use strict';

    const header = document.getElementById('main-header');
    const hamburger = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const scrollCar = document.getElementById('scroll-car');
    const flameTrail = document.querySelector('.scroll-flame-trail');
    const scrollProgress = document.getElementById('scroll-progress');
    const heroVideo = document.querySelector('.hero-video');
    const productOverlay = document.getElementById('product-overlay');
    const productContent = document.getElementById('product-overlay-content');
    const productClose = document.getElementById('product-close');

    let isMenuOpen = false;
    let scrollTimeout = null;
    let ticking = false;

    // ── Product Data (from old website) ─────────────────────
    const products = {
        'product-penta': {
            name: 'Penta Guard',
            type: 'Paint Protection Film',
            meta: 'Covestro TPU · Ashland Glue | 5-Year Warranty | 7.5mil | 1.52×15m',
            body: 'Our standard Otograf film with 5 year warranty delivers an exceptional, invisible barrier that actively guards against chips, scratches, and environmental contaminants. It\'s the ideal choice for customers seeking premium, foundational defence, to keep their vehicle looking impeccable. This advanced film is not only scratch- and stain-resistant but also remarkably durable and invisible once applied.',
            highlights: ['Scratch resistant', 'Stain resistant', 'Durable and invisible', 'Fade and erosion resistant', 'Preserves vehicle paint', 'Easy to install and maintain', 'UV & Acid rain protection', 'Environmentally friendly', 'Easy to clean']
        },
        'product-hepta': {
            name: 'Hepta Guard',
            type: 'Paint Protection Film',
            meta: 'Covestro TPU · Ashland Glue | 7-Year Warranty | 8.5mil | 1.52×15m',
            body: 'This advanced variant is renowned for its incredible strength and durability, boasting a substantial 8.5 mil thickness and 1.5 mil of acrylic adhesive for superior bonding. Otograf Hepta Guard offers enhanced scratch resistance, superior gloss, and improved hydrophobic properties, allowing water to bead off effortlessly. Made for those who demand an extra layer of resilience and a deeper shine.',
            highlights: ['Enhanced scratch resistance', 'Superior gloss finish', 'Improved hydrophobic properties', 'Water beads off effortlessly', 'Stain resistant', 'UV & Acid rain protection', 'Preserves vehicle paint', 'Environmentally friendly', 'Easy to clean']
        },
        'product-octa': {
            name: 'Octa Guard',
            type: 'Paint Protection Film',
            meta: 'Covestro TPU · Ashland Glue | 8-Year Warranty | 7.5mil | 1.52×15m',
            body: 'Advanced PPF designed for discerning owners who seek a distinctive, non-reflective finish. This variant gives any vehicle a stealth look while delivering the same high-level defense. Its non-reflective surface naturally hides minor imperfections and swirl marks better than gloss films, making it the ideal protective solution for vehicles with a delicate factory matte paint job. Guaranteed total peace of mind for 8 years.',
            highlights: ['Stealth matte finish', 'Non-reflective surface', 'Hides swirl marks', 'Scratch resistant', 'Stain resistant', 'Durable and invisible', 'UV & Acid rain protection', 'Preserves vehicle paint', 'Easy to clean']
        },
        'product-deca': {
            name: 'Deca Guard',
            type: 'Paint Protection Film — Flagship',
            meta: 'Covestro TPU · Ashland Glue | 10-Year Warranty | 9.5mil | 1.52×15m',
            body: 'Give your clients the ultimate in automotive surface protection with Otograf Deca Guard, complete with a 10-year warranty for total peace of mind. This top-tier film represents the zenith of our technology, engineered for the most discerning car owners. Otograf Deca Guard boasts an impressive product thickness of 9.5 mil and a clear coating of 0.5 mil, offering unparalleled scratch resistance and exceptional hydrophobicity.',
            highlights: ['Unparalleled scratch resistance', 'Exceptional hydrophobicity', '0.5 mil clear coating', '9.5 mil product thickness', 'Premium self-healing', 'Stain resistant', 'UV & Acid rain protection', 'Preserves vehicle paint', 'Easy to clean']
        },
        'product-cera': {
            name: 'Cera Guard',
            type: 'Ceramic Coating',
            meta: 'Silica Nanoparticles · Silicon Carbide | 2-Year Warranty',
            body: 'Otograf Cera Guard, our refined paint protection coating engineered for the discerning owner who seeks reliable, premium performance. This advanced formulation features a high concentration of Silica Nanoparticles and Silicon Carbide to form a resilient 5nm–20nm layer. Cera Guard delivers an unparalleled defensive barrier that is oxidation resistant, actively ensuring the vehicle\'s deep, factory color is preserved while offering robust resilience against harsh environmental contaminants.',
            highlights: ['Silica Nanoparticles & Silicon Carbide', '5nm – 20nm particle layer', 'Oxidation resistant', 'Ultra hydrophobic', 'Exceptional heat resistance', 'Preserves factory colour', 'Unrivaled lustrous finish']
        },
        'product-graph': {
            name: 'Graph Guard',
            type: 'Ceramic Coating',
            meta: 'Self-Healing Graphene Matrix | 3-Year Warranty',
            body: 'Cutting-edge graphene formula and nanotechnology designed to repel water, resist ageing and yellowing, and maintain gloss. Graph Guard\'s Self-Healing Graphene Matrix activates at 100°C, instantly self-healing minor scratches and swirl marks. Enjoy exceptional heat resistance and protection that is stronger, glossier, and longer-lasting than anything else on the road.',
            highlights: ['Self-healing at 100°C', 'Graphene Matrix technology', 'Anti-ageing & anti-yellowing', 'Water repellent', 'Extreme heat resistance', 'Maintains gloss permanently', 'Stronger than conventional coatings']
        },
        'product-boro': {
            name: 'Boro Guard',
            type: 'Ceramic Coating — Flagship',
            meta: 'Boron Nitride · Twin Silica Nanoparticle | 4-Year Warranty',
            body: 'Infused with Boron Nitride for an extreme 9H+ hardness, Boro Guard creates an incredibly durable shield that resists the harshest impacts, chips, and scratches. The formula features twin (5nm and 10nm) silica nanoparticle layers — 5nm for exceptional gloss, enhanced surface depth, and ultra-hydrophobic effect; 10nm for lasting structural integrity. Up to 10-micron thick, single-layer coating provides an extremely durable shield against oxidation, UV rays, harsh chemicals, and all environmental contaminants.',
            highlights: ['Boron Nitride 9H+ hardness', 'Twin silica layers (5nm + 10nm)', 'Ultra hydrophobic effect', 'Mirror-like finish', 'Up to 10-micron single layer', 'Industry-first 4-year warranty', 'Oxidation & UV protection', 'Chemical resistant']
        }
    };

    // ── Header scroll ────────────────────────────────────────
    function updateHeader() {
        header.classList.toggle('scrolled', window.scrollY > 80);
    }

    // ── Hamburger menu ───────────────────────────────────────
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        hamburger.classList.toggle('active', isMenuOpen);
        mobileMenu.classList.toggle('open', isMenuOpen);
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }
    hamburger.addEventListener('click', toggleMenu);
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => isMenuOpen && toggleMenu()));

    // ── Smooth scroll ────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            // Check if it's a product link
            if (products[id.replace('#', '')]) {
                e.preventDefault();
                openProduct(id.replace('#', ''));
                return;
            }
            const el = document.querySelector(id);
            if (el) {
                e.preventDefault();
                window.scrollTo({ top: id === '#hero' ? 0 : el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
            }
        });
    });

    // ── Product Overlay ──────────────────────────────────────
    function openProduct(id) {
        const p = products[id];
        if (!p) return;
        productContent.innerHTML = `
            <h2>${p.name}</h2>
            <div class="product-meta">${p.type} — ${p.meta}</div>
            <div class="product-body">${p.body}</div>
            <div class="product-highlights">
                <h3>Product Highlights</h3>
                <ul>${p.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
            </div>
            <div style="margin-top:2rem;padding-top:1.5rem;border-top:1px solid var(--border-subtle);">
                <a href="#contact" style="font-size:.72rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--bg-primary);background:var(--accent);padding:.8rem 2rem;display:inline-block;transition:all .3s;" onmouseover="this.style.background='var(--accent-light)'" onmouseout="this.style.background='var(--accent)'" onclick="document.getElementById('product-overlay').classList.remove('open');document.body.style.overflow='';">Get a Quote →</a>
            </div>
        `;
        productOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    productClose.addEventListener('click', () => {
        productOverlay.classList.remove('open');
        document.body.style.overflow = '';
    });
    productOverlay.addEventListener('click', (e) => {
        if (e.target === productOverlay) {
            productOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // ── Scroll Progress Bar (Supercar) ───────────────────────
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = Math.min(scrollTop / docHeight, 1);

        if (flameTrail) flameTrail.style.width = (pct * 100) + '%';
        if (scrollCar) {
            scrollCar.style.left = (2 + pct * 96) + '%';
            if (scrollTop < 50) {
                scrollProgress.style.opacity = '0';
                scrollProgress.style.transform = 'translateY(100%)';
            } else {
                scrollProgress.style.opacity = '1';
                scrollProgress.style.transform = 'translateY(0)';
            }
            scrollCar.classList.remove('idle');
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => scrollCar.classList.add('idle'), 200);
        }
    }

    if (scrollProgress) {
        scrollProgress.style.transition = 'opacity .4s ease, transform .4s ease';
        scrollProgress.style.opacity = '0';
        scrollProgress.style.transform = 'translateY(100%)';
    }

    // ── Intersection Observer — reveals ──────────────────────
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(el => revealObs.observe(el));

    // ── Counter animation ────────────────────────────────────
    const counterObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const el = e.target;
                const target = parseInt(el.dataset.count, 10);
                let current = 0;
                const step = target / 35;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) { current = target; clearInterval(timer); }
                    el.textContent = Math.round(current);
                }, 40);
                counterObs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

    // ── Hero video fallback ──────────────────────────────────
    if (heroVideo) {
        heroVideo.addEventListener('loadeddata', () => {
            const poster = document.querySelector('.hero-poster');
            if (poster) { poster.style.opacity = '0'; poster.style.transition = 'opacity 1s ease'; }
        });
        heroVideo.addEventListener('error', () => heroVideo.style.display = 'none');
        const p = heroVideo.play();
        if (p) p.catch(() => heroVideo.style.display = 'none');
    }

    // ── Form ─────────────────────────────────────────────────
    const form = document.getElementById('quote-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = form.querySelector('.form-submit');
            const orig = btn.textContent;
            btn.textContent = 'SENDING...'; btn.style.opacity = '.7'; btn.disabled = true;
            setTimeout(() => {
                btn.textContent = '✓ REQUEST SENT'; btn.style.background = '#2ecc71'; btn.style.opacity = '1';
                setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; form.reset(); }, 2500);
            }, 1200);
        });
    }

    // ── Parallax ─────────────────────────────────────────────
    function updateParallax() {
        const y = window.scrollY;
        if (y < window.innerHeight) {
            const poster = document.querySelector('.hero-poster');
            if (poster) poster.style.transform = `scale(${1 + y * .0001}) translateY(${y * .12}px)`;
            if (heroVideo) heroVideo.style.transform = `translateY(${y * .12}px)`;
        }
    }

    // ── Unified scroll handler ───────────────────────────────
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeader();
                updateScrollProgress();
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Nav active state ─────────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links > a');
    const activeObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const id = e.target.id;
                navLinks.forEach(l => {
                    l.style.color = l.getAttribute('href') === '#' + id ? 'var(--accent)' : '';
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });
    sections.forEach(s => activeObs.observe(s));

    // ── Keyboard ─────────────────────────────────────────────
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            if (isMenuOpen) toggleMenu();
            if (productOverlay.classList.contains('open')) {
                productOverlay.classList.remove('open');
                document.body.style.overflow = '';
            }
        }
    });

    // ── Resize ───────────────────────────────────────────────
    window.addEventListener('resize', () => { if (window.innerWidth > 1024 && isMenuOpen) toggleMenu(); });

    // ── Init ─────────────────────────────────────────────────
    updateHeader();
    updateScrollProgress();
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity .5s ease';
        document.body.style.opacity = '1';
        // Fallback: force all reveals visible after 2s
        setTimeout(() => {
            document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(el => {
                if (!el.classList.contains('visible')) el.classList.add('visible');
            });
        }, 2000);
    });
})();
