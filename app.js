/**
 * ORASURE Design Assessment — Interactive Presentation Scripts
 * Author: Sachin / Seenozx
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const topNav = document.getElementById('topNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.presentation-section');
  
  // Modals
  const lightboxModal = document.getElementById('imageLightboxModal');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const btnCloseLightbox = document.getElementById('btnCloseLightbox');
  const btnLightboxPrev = document.getElementById('btnLightboxPrev');
  const btnLightboxNext = document.getElementById('btnLightboxNext');
  const btnLightboxZoom = document.getElementById('btnLightboxZoom');
  
  const pdfModal = document.getElementById('pdfViewerModal');
  const btnClosePdfModal = document.getElementById('btnClosePdfModal');
  const btnNavPdf = document.getElementById('btnNavPdf');
  const btnHeroPdf = document.getElementById('btnHeroPdf');
  const btnOpenLabelPdfCard = document.getElementById('btnOpenLabelPdfCard');
  const btnActionMockupPdf = document.getElementById('btnActionMockupPdf');

  // Triggers
  const labelArtworkZoomTrigger = document.getElementById('labelArtworkZoomTrigger');
  const insideLayoutZoomTrigger = document.getElementById('insideLayoutZoomTrigger');
  const mockupCards = document.querySelectorAll('.mockup-card');
  const swatchItems = document.querySelectorAll('.swatch-item');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  // Gallery items for lightbox
  const galleryItems = [
    {
      src: 'public/images/label-design-full.jpg',
      caption: 'ORASURE Hamper Box Label Artwork — 30 × 24 cm (Full 300 DPI Artwork)'
    },
    {
      src: 'public/images/mockup-perspective.jpg',
      caption: '01. Perspective Dual Box View — 30×24cm Lid with Botanical Spine Panel'
    },
    {
      src: 'public/images/mockup-flatlay.jpg',
      caption: '02. Flat-lay Scene — Sunlight & Shadow interplay with Gold Foil Finish'
    },
    {
      src: 'public/images/mockup-angled.jpg',
      caption: '03. Angled Beauty Shot — Matte Lamination & Botanical Wrap-around'
    },
    {
      src: 'public/images/inside-box-layout.png',
      caption: 'Inside View & Product Cavity Layout — Compartment Dimensions & EPE Foam Structure'
    }
  ];

  let currentGalleryIndex = 0;
  let isZoomed = false;

  /* ==========================================================================
     1. LIGHTBOX FUNCTIONS
     ========================================================================== */
  function openLightbox(index) {
    currentGalleryIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentGalleryIndex];
    lightboxImg.src = item.src;
    lightboxCaption.textContent = item.caption;
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    resetZoom();
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    resetZoom();
  }

  function nextLightbox() {
    openLightbox(currentGalleryIndex + 1);
  }

  function prevLightbox() {
    openLightbox(currentGalleryIndex - 1);
  }

  function toggleZoom() {
    isZoomed = !isZoomed;
    if (isZoomed) {
      lightboxImg.classList.add('zoomed');
    } else {
      lightboxImg.classList.remove('zoomed');
    }
  }

  function resetZoom() {
    isZoomed = false;
    lightboxImg.classList.remove('zoomed');
  }

  // Bind Lightbox Triggers
  if (labelArtworkZoomTrigger) {
    labelArtworkZoomTrigger.addEventListener('click', () => openLightbox(0));
  }

  mockupCards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10) + 1; // offset by 1 for label artwork
      openLightbox(idx);
    });
  });

  if (insideLayoutZoomTrigger) {
    insideLayoutZoomTrigger.addEventListener('click', () => openLightbox(4));
  }

  if (btnCloseLightbox) btnCloseLightbox.addEventListener('click', closeLightbox);
  if (btnLightboxNext) btnLightboxNext.addEventListener('click', (e) => { e.stopPropagation(); nextLightbox(); });
  if (btnLightboxPrev) btnLightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); prevLightbox(); });
  if (btnLightboxZoom) btnLightboxZoom.addEventListener('click', (e) => { e.stopPropagation(); toggleZoom(); });

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal || e.target.classList.contains('lightbox-img-container')) {
      closeLightbox();
    }
  });


  /* ==========================================================================
     2. DYNAMIC PDF MODAL VIEWER (Label PDF & Mockup PDF)
     ========================================================================== */
  const pdfModalTitleText = document.getElementById('pdfModalTitleText');
  const btnDownloadPdfModal = document.getElementById('btnDownloadPdfModal');
  const pdfEmbedFrame = document.getElementById('pdfEmbedFrame');
  const btnPdfFallbackLink = document.getElementById('btnPdfFallbackLink');

  const pdfDocs = {
    label: {
      title: 'ORASURE label.pdf — High-Resolution Print Ready Label Artwork',
      file: 'public/ORASURE-label.pdf',
      downloadName: 'ORASURE-label.pdf'
    },
    mockup: {
      title: 'ORASURE mockups.pdf — 3D Product Mockup Showcase (4-Page Deck)',
      file: 'public/ORASURE-mockups.pdf',
      downloadName: 'ORASURE-mockups.pdf'
    }
  };

  function openPdfModal(type = 'label') {
    const doc = pdfDocs[type] || pdfDocs.label;
    if (pdfModalTitleText) pdfModalTitleText.textContent = doc.title;
    if (btnDownloadPdfModal) {
      btnDownloadPdfModal.href = doc.file;
      btnDownloadPdfModal.download = doc.downloadName;
    }
    if (pdfEmbedFrame) {
      pdfEmbedFrame.data = doc.file;
    }
    if (btnPdfFallbackLink) {
      btnPdfFallbackLink.href = doc.file;
    }

    pdfModal.classList.add('active');
    pdfModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePdfModal() {
    pdfModal.classList.remove('active');
    pdfModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (btnNavPdf) btnNavPdf.addEventListener('click', () => openPdfModal('label'));
  if (btnHeroPdf) btnHeroPdf.addEventListener('click', () => openPdfModal('label'));
  if (btnOpenLabelPdfCard) btnOpenLabelPdfCard.addEventListener('click', (e) => {
    e.stopPropagation();
    openPdfModal('label');
  });
  if (btnActionMockupPdf) btnActionMockupPdf.addEventListener('click', () => openPdfModal('mockup'));
  if (btnClosePdfModal) btnClosePdfModal.addEventListener('click', closePdfModal);

  pdfModal.addEventListener('click', (e) => {
    if (e.target === pdfModal) closePdfModal();
  });


  /* ==========================================================================
     3. KEYBOARD SHORTCUTS
     ========================================================================== */
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxModal.classList.contains('active')) closeLightbox();
      if (pdfModal.classList.contains('active')) closePdfModal();
    } else if (lightboxModal.classList.contains('active')) {
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    }
  });


  /* ==========================================================================
     4. COLOR PALETTE COPY TO CLIPBOARD
     ========================================================================== */
  let toastTimeout = null;

  function showToast(msg) {
    if (toastTimeout) clearTimeout(toastTimeout);
    toastMessage.textContent = msg;
    toastNotification.classList.add('show');
    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 2800);
  }

  swatchItems.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const color = swatch.getAttribute('data-color');
      const name = swatch.getAttribute('data-name');
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(color).then(() => {
          showToast(`Copied ${name} (${color}) to clipboard!`);
        }).catch(() => {
          showToast(`Color: ${name} (${color})`);
        });
      } else {
        showToast(`Color: ${name} (${color})`);
      }
    });
  });


  /* ==========================================================================
     5. SCROLLSPY / ACTIVE NAV HIGHLIGHTING
     ========================================================================== */
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

});
