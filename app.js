/**
 * The Digital Atelier — Afshan Sheikh
 * Interactive Behaviors & Client Workflows
 */

// Configuration: Set a real email address here to enable direct mailto handling.
// It is intentionally left blank by default so no email address is invented.
const CONTACT_EMAIL = '';

const DB_NAME = 'digital-atelier-local';
const STORE_NAME = 'portrait';

// Utility Selectors
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// 1. Dynamic Year in Footer
const yearEl = $('#year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// 2. Responsive Mobile Navigation
const menuToggle = $('#menuToggle');
const siteNav = $('#siteNav');

function closeMobileMenu() {
  if (!siteNav || !menuToggle) return;
  siteNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  document.body.classList.remove('menu-open');
}

function openMobileMenu() {
  if (!siteNav || !menuToggle) return;
  siteNav.classList.add('open');
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Close navigation menu');
  document.body.classList.add('menu-open');
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close menu when clicking nav links
  $$('#siteNav a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && siteNav.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // Close when window resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && siteNav.classList.contains('open')) {
      closeMobileMenu();
    }
  });
}

// 3. Scroll Reading Progress Bar
const progressEl = $('#readingProgress');

function updateScrollProgress() {
  if (!progressEl) return;
  const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
  progressEl.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

// 4. Gentle Reveal Animations on Scroll
const revealNodes = $$('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealNodes.forEach(node => revealObserver.observe(node));
} else {
  revealNodes.forEach(node => node.classList.add('is-visible'));
}

// 5. Project Category Filtering
const filterButtons = $$('.filter-chip');
const projectCards = $$('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    // Update button states
    filterButtons.forEach(item => {
      const isActive = item === button;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    // Filter project cards
    projectCards.forEach(card => {
      const category = card.dataset.category;
      const shouldShow = filter === 'all' || category === filter;
      card.classList.toggle('is-hidden', !shouldShow);
    });
  });
});

// 6. Local Portrait Workshop & IndexedDB Persistence
const portraitModal = $('#portraitModal');
const editPortraitBtn = $('#editPortraitBtn');
const portraitUpload = $('#portraitUpload');
const editorImage = $('#editorImage');
const editorPreview = $('#editorPreview');
const portraitImage = $('#portraitImage');
const portraitPlaceholder = $('#portraitPlaceholder');
const zoomControl = $('#zoomControl');
const xControl = $('#xControl');
const yControl = $('#yControl');
const savePortrait = $('#savePortrait');
const downloadPortrait = $('#downloadPortrait');
const resetPortrait = $('#resetPortrait');

let selectedImage = null;
let selectedFileName = 'afshan-sheikh-portrait';
let activeBlobUrl = null;
let imageReady = false;

// IndexedDB Helper
function openPortraitDatabase() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      return reject(new Error('IndexedDB is not supported in this browser.'));
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Could not open IndexedDB.'));
  });
}

async function savePortraitToStorage(record) {
  const db = await openPortraitDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    transaction.objectStore(STORE_NAME).put(record, 'current');
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error || new Error('Failed to save to database.'));
    };
  });
}

async function loadPortraitFromStorage() {
  const db = await openPortraitDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get('current');
    request.onsuccess = () => {
      const result = request.result || null;
      db.close();
      resolve(result);
    };
    request.onerror = () => {
      db.close();
      reject(request.error || new Error('Failed to load from database.'));
    };
  });
}

function applyTransformToImage(imgElement, zoom, x, y) {
  if (!imgElement) return;
  imgElement.style.objectFit = 'cover';
  imgElement.style.objectPosition = `${x}% ${y}%`;
  imgElement.style.transform = `scale(${zoom / 100})`;
}

function updateEditorPreviewTransform() {
  const zoom = Number(zoomControl.value);
  const x = Number(xControl.value);
  const y = Number(yControl.value);
  applyTransformToImage(editorImage, zoom, x, y);
}

function displaySavedPortrait(blob, zoom = 100, x = 50, y = 50) {
  if (activeBlobUrl) {
    URL.revokeObjectURL(activeBlobUrl);
  }
  activeBlobUrl = URL.createObjectURL(blob);
  portraitImage.src = activeBlobUrl;
  portraitImage.hidden = false;
  if (portraitPlaceholder) {
    portraitPlaceholder.hidden = true;
  }
  applyTransformToImage(portraitImage, zoom, x, y);
}

// Modal Open & Close
function openEditorModal() {
  if (!portraitModal) return;
  portraitModal.classList.add('open');
  portraitModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeEditorModal() {
  if (!portraitModal) return;
  portraitModal.classList.remove('open');
  portraitModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (editPortraitBtn) {
  editPortraitBtn.addEventListener('click', openEditorModal);
}

$$('[data-close-editor]').forEach(button => {
  button.addEventListener('click', closeEditorModal);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && portraitModal && portraitModal.classList.contains('open')) {
    closeEditorModal();
  }
});

// File Upload Handler
if (portraitUpload) {
  portraitUpload.addEventListener('change', () => {
    const file = portraitUpload.files && portraitUpload.files[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      showToast('Please select a JPG, PNG or WebP image.');
      portraitUpload.value = '';
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      showToast('Image exceeds 12 MB limit. Please select a smaller file.');
      portraitUpload.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => showToast('Failed to read the selected file.');
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        selectedImage = img;
        selectedFileName = file.name.replace(/\.[^.]+$/, '') || 'afshan-sheikh-portrait';
        editorImage.src = reader.result;
        editorImage.hidden = false;

        const emptyText = $('.preview-empty', editorPreview);
        if (emptyText) emptyText.hidden = true;

        zoomControl.value = '100';
        xControl.value = '50';
        yControl.value = '50';
        updateEditorPreviewTransform();

        imageReady = true;
        savePortrait.disabled = false;
        downloadPortrait.disabled = false;
        showToast('Image loaded. Fine-tune framing, then save or export.');
      };
      img.onerror = () => showToast('Unable to process this image. Try another file.');
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// Sliders Event Handlers
[zoomControl, xControl, yControl].forEach(control => {
  if (control) {
    control.addEventListener('input', updateEditorPreviewTransform);
  }
});

if (resetPortrait) {
  resetPortrait.addEventListener('click', () => {
    zoomControl.value = '100';
    xControl.value = '50';
    yControl.value = '50';
    updateEditorPreviewTransform();
  });
}

// Canvas Render & Crop
function renderCroppedPortraitBlob() {
  if (!selectedImage) {
    throw new Error('Please select an image first.');
  }

  const targetWidth = 900;
  const targetHeight = 1100;
  const zoom = Number(zoomControl.value) / 100;

  const baseScale = Math.max(
    targetWidth / selectedImage.naturalWidth,
    targetHeight / selectedImage.naturalHeight
  ) * zoom;

  const drawWidth = selectedImage.naturalWidth * baseScale;
  const drawHeight = selectedImage.naturalHeight * baseScale;

  const overflowX = Math.max(0, drawWidth - targetWidth);
  const overflowY = Math.max(0, drawHeight - targetHeight);

  const offsetX = -(overflowX * (Number(xControl.value) / 100));
  const offsetY = -(overflowY * (Number(yControl.value) / 100));

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');

  // Fill walnut background to prevent transparent artifacts
  ctx.fillStyle = '#211B16';
  ctx.fillRect(0, 0, targetWidth, targetHeight);
  ctx.drawImage(selectedImage, offsetX, offsetY, drawWidth, drawHeight);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => (blob ? resolve(blob) : reject(new Error('Failed to render canvas image.'))),
      'image/jpeg',
      0.92
    );
  });
}

if (savePortrait) {
  savePortrait.addEventListener('click', async () => {
    try {
      savePortrait.disabled = true;
      const blob = await renderCroppedPortraitBlob();
      await savePortraitToStorage({
        blob,
        zoom: 100,
        x: 50,
        y: 50,
        updatedAt: Date.now()
      });
      displaySavedPortrait(blob, 100, 50, 50);
      closeEditorModal();
      showToast('Portrait saved locally in this browser.');
    } catch (err) {
      showToast(err.message || 'Could not save portrait.');
    } finally {
      savePortrait.disabled = !imageReady;
    }
  });
}

if (downloadPortrait) {
  downloadPortrait.addEventListener('click', async () => {
    try {
      const blob = await renderCroppedPortraitBlob();
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `${selectedFileName}-atelier.jpg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showToast('Cropped portrait file downloaded.');
    } catch (err) {
      showToast(err.message || 'Could not export image.');
    }
  });
}

// Restore saved portrait on page initialization
(async function initPortrait() {
  try {
    const saved = await loadPortraitFromStorage();
    if (saved && saved.blob) {
      displaySavedPortrait(saved.blob, 100, 50, 50);
    }
  } catch (err) {
    console.info('No saved local portrait found in IndexedDB.');
  }
})();

// 7. Contact Form Handling & Validation
const contactForm = $('#contactForm');
const nameInput = $('#senderName');
const emailInput = $('#senderEmail');
const messageInput = $('#senderMessage');
const nameError = $('#nameError');
const emailError = $('#emailError');
const messageError = $('#messageError');
const formFeedback = $('#formFeedback');
const copyMessageBtn = $('#copyMessageBtn');

let lastPreparedText = '';

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearValidationErrors() {
  if (nameError) nameError.textContent = '';
  if (emailError) emailError.textContent = '';
  if (messageError) messageError.textContent = '';
  if (formFeedback) {
    formFeedback.className = 'form-feedback';
  }
}

// Clear individual errors on typing
[nameInput, emailInput, messageInput].forEach(input => {
  if (input) {
    input.addEventListener('input', () => {
      clearValidationErrors();
    });
  }
});

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    clearValidationErrors();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    let hasErrors = false;

    if (!name) {
      nameError.textContent = 'Please enter your name.';
      hasErrors = true;
    }

    if (!email) {
      emailError.textContent = 'Please enter your email address.';
      hasErrors = true;
    } else if (!validateEmail(email)) {
      emailError.textContent = 'Please enter a valid email address.';
      hasErrors = true;
    }

    if (!message) {
      messageError.textContent = 'Please include a few words in your message.';
      hasErrors = true;
    } else if (message.length < 5) {
      messageError.textContent = 'Message should be at least 5 characters long.';
      hasErrors = true;
    }

    if (hasErrors) {
      formFeedback.textContent = 'Please correct the highlighted fields above.';
      formFeedback.className = 'form-feedback error';
      return;
    }

    const subject = `Portfolio enquiry from ${name}`;
    const formattedBody = `Hello Afshan,\n\n${message}\n\n—\nFrom: ${name}\nEmail: ${email}\nSent via The Digital Atelier`;
    lastPreparedText = `Subject: ${subject}\n\n${formattedBody}`;

    // Check if real email is configured
    if (CONTACT_EMAIL && validateEmail(CONTACT_EMAIL)) {
      const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;
      window.location.href = mailtoUrl;
      formFeedback.textContent = 'Your default email client has been opened with your prepared message.';
      formFeedback.className = 'form-feedback success';
      showToast('Email client opened.');
    } else {
      // Honest clipboard copy fallback
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(lastPreparedText).then(() => {
          formFeedback.textContent = 'Direct email sending is unconfigured. Your message has been copied to your clipboard so you can send it via your preferred mail client.';
          formFeedback.className = 'form-feedback success';
          if (copyMessageBtn) copyMessageBtn.style.display = 'inline-flex';
          showToast('Message copied to clipboard.');
        }).catch(() => {
          formFeedback.textContent = 'Direct email sending is unconfigured. Please copy the message manually below.';
          formFeedback.className = 'form-feedback';
          if (copyMessageBtn) copyMessageBtn.style.display = 'inline-flex';
        });
      } else {
        formFeedback.textContent = 'Direct email sending is unconfigured. Configure CONTACT_EMAIL in app.js to enable automatic mail opening.';
        formFeedback.className = 'form-feedback';
        if (copyMessageBtn) copyMessageBtn.style.display = 'inline-flex';
      }
    }
  });
}

if (copyMessageBtn) {
  copyMessageBtn.addEventListener('click', () => {
    if (lastPreparedText && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(lastPreparedText).then(() => {
        showToast('Message re-copied to clipboard.');
      });
    }
  });
}

// 8. Toast Feedback Utility
let toastTimeout;
function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
