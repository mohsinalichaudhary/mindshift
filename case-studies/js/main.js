/**
 * MindShift Tech — Core UI & Conversion Engine
 * High-performance, zero-bloat vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFaqAccordion();
  initLeadCalculator();
  initInquiryModal();
  initAnalyticsTracking();
});

/* -------------------------------------------------------------------------
   1. STICKY NAVBAR & MOBILE DRAWER
   ------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar-wrapper');
  const toggleBtn = document.querySelector('.nav-toggle-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-drawer-backdrop');
  const closeBtn = document.querySelector('.drawer-close-btn');
  const navLinks = document.querySelectorAll('.mobile-nav-links a');

  // Sticky blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Mobile drawer controls
  function openDrawer() {
    drawer?.classList.add('open');
    backdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer?.classList.remove('open');
    backdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* -------------------------------------------------------------------------
   2. INTERACTIVE FAQ ACCORDION
   ------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    header?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others for cognitive simplicity
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBody = otherItem.querySelector('.faq-body');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        if (body) body.style.maxHeight = null;
      } else {
        item.classList.add('active');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
        
        // Track FAQ interaction
        if (window.mindshiftTrack) {
          window.mindshiftTrack('faq_open', { question: header.innerText.trim() });
        }
      }
    });
  });

  // Open first by default
  if (faqItems.length > 0) {
    const firstBody = faqItems[0].querySelector('.faq-body');
    faqItems[0].classList.add('active');
    if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
  }
}

/* -------------------------------------------------------------------------
   3. INTERACTIVE LEAD CALCULATOR & GROWTH PLANNER
   ------------------------------------------------------------------------- */
function initLeadCalculator() {
  const industrySelect = document.getElementById('calc-industry');
  const budgetSelect = document.getElementById('calc-budget');
  const resultInquiries = document.getElementById('calc-inquiries');
  const resultCpl = document.getElementById('calc-cpl');
  const resultChannel = document.getElementById('calc-channel');
  const waPlanBtn = document.getElementById('calc-whatsapp-btn');

  if (!industrySelect || !budgetSelect) return;

  const rates = {
    construction: {
      budget1: { leads: '18 - 32', cpl: 'PKR 1,800 - 2,800', channel: 'Google Search + High-Intent WhatsApp Funnel' },
      budget2: { leads: '45 - 80', cpl: 'PKR 1,600 - 2,400', channel: 'Multi-Channel: Google Search + Meta Retargeting' },
      budget3: { leads: '95 - 180+', cpl: 'PKR 1,400 - 2,100', channel: 'Full Inbound Pipeline + Dedicated Landing Pages' }
    },
    chemicals: {
      budget1: { leads: '22 - 40', cpl: 'PKR 1,500 - 2,400', channel: 'Targeted Meta B2B + Google Keyword Capture' },
      budget2: { leads: '55 - 95', cpl: 'PKR 1,300 - 2,100', channel: 'Google Ads + Technical Spec Download Leads' },
      budget3: { leads: '120 - 230+', cpl: 'PKR 1,100 - 1,800', channel: 'Enterprise Commercial Supply Lead Pipeline' }
    },
    contractors: {
      budget1: { leads: '15 - 28', cpl: 'PKR 2,000 - 3,200', channel: 'Local Search Ads + Direct Phone Call Extensions' },
      budget2: { leads: '40 - 70', cpl: 'PKR 1,800 - 2,700', channel: 'Google Local Ads + Project Proof Showcase' },
      budget3: { leads: '85 - 160+', cpl: 'PKR 1,500 - 2,300', channel: 'Corporate Tender & Specialist B2B Acquisition' }
    },
    other: {
      budget1: { leads: '25 - 50', cpl: 'PKR 1,200 - 2,000', channel: 'Meta Ads + Direct WhatsApp Lead Generation' },
      budget2: { leads: '60 - 120', cpl: 'PKR 1,000 - 1,700', channel: 'Omni-Channel: Search + Meta + Pixel Retargeting' },
      budget3: { leads: '140 - 260+', cpl: 'PKR 850 - 1,500', channel: 'Full Funnel Digital Scalability Architecture' }
    }
  };

  function updateCalculation() {
    const ind = industrySelect.value || 'construction';
    const bud = budgetSelect.value || 'budget1';
    const data = rates[ind]?.[bud] || rates.construction.budget1;

    if (resultInquiries) resultInquiries.innerText = data.leads;
    if (resultCpl) resultCpl.innerText = data.cpl;
    if (resultChannel) resultChannel.innerText = data.channel;

    if (waPlanBtn) {
      const industryName = industrySelect.options[industrySelect.selectedIndex].text;
      const budgetName = budgetSelect.options[budgetSelect.selectedIndex].text;
      const waText = encodeURIComponent(
        `Hi MindShift Tech team, I reviewed my growth plan on your website:\n` +
        `• Industry: ${industryName}\n` +
        `• Estimated Budget: ${budgetName}\n` +
        `• Projected Target: ${data.leads} qualified inquiries\n` +
        `I would like to discuss setting up this marketing pipeline for my business.`
      );
      waPlanBtn.href = `https://wa.me/923335295450?text=${waText}`;
    }
  }

  industrySelect.addEventListener('change', updateCalculation);
  budgetSelect.addEventListener('change', updateCalculation);
  updateCalculation();
}

/* -------------------------------------------------------------------------
   4. INQUIRY MODAL & FORM HANDLING
   ------------------------------------------------------------------------- */
function initInquiryModal() {
  const modal = document.getElementById('inquiry-modal');
  const openButtons = document.querySelectorAll('[data-open-inquiry]');
  const closeButton = modal?.querySelector('.modal-close-btn');
  const inquiryForm = document.getElementById('lead-inquiry-form');

  if (!modal) return;

  function openModal(defaultService = '') {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (defaultService) {
      const select = modal.querySelector('#inquiry-service');
      if (select) select.value = defaultService;
    }
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openModal(service);
    });
  });

  closeButton?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Handle Form Submission
  inquiryForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = inquiryForm.querySelector('#inquiry-name')?.value.trim() || 'Client';
    const phone = inquiryForm.querySelector('#inquiry-phone')?.value.trim() || '';
    const service = inquiryForm.querySelector('#inquiry-service')?.value || 'Digital Marketing';
    const message = inquiryForm.querySelector('#inquiry-message')?.value.trim() || 'No additional details';

    // WhatsApp Direct Bridge
    const waText = encodeURIComponent(
      `*New Project Inquiry — MindShift Tech*\n` +
      `• *Client Name:* ${name}\n` +
      `• *Contact / WhatsApp:* ${phone}\n` +
      `• *Service of Interest:* ${service}\n` +
      `• *Project Notes:* ${message}`
    );

    // Track conversion
    if (window.mindshiftTrack) {
      window.mindshiftTrack('generate_lead', {
        service_requested: service,
        has_phone: !!phone
      });
    }

    showToast('Inquiry captured. Opening WhatsApp to connect directly with our strategist...');

    setTimeout(() => {
      window.open(`https://wa.me/923335295450?text=${waText}`, '_blank');
      closeModal();
      inquiryForm.reset();
    }, 1200);
  });
}

/* -------------------------------------------------------------------------
   5. TOAST NOTIFICATION SYSTEM
   ------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#72BA40" stroke-width="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* -------------------------------------------------------------------------
   6. CONVERSION TRACKING & GA4/PIXEL READINESS
   ------------------------------------------------------------------------- */
function initAnalyticsTracking() {
  window.mindshiftTrack = function(eventName, params = {}) {
    console.log(`[MindShift Analytics Telemetry] Event: ${eventName}`, params);

    // GA4 Trigger (if gtag is configured by client)
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }

    // Meta Pixel Trigger (if fbq is configured by client)
    if (typeof window.fbq === 'function') {
      if (eventName === 'generate_lead') {
        window.fbq('track', 'Lead', params);
      } else {
        window.fbq('trackCustom', eventName, params);
      }
    }
  };
}
