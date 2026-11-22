const initialiseInsightFilters = () => {
  const filterButtons = document.querySelectorAll('[data-insight-filter]');
  const insightCards = document.querySelectorAll('[data-insight-card]');

  if (filterButtons.length === 0 || insightCards.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedType = button.dataset.insightFilter;

      filterButtons.forEach((candidate) => {
        const isActive = candidate === button;
        candidate.classList.toggle('is-active', isActive);
        candidate.setAttribute('aria-pressed', String(isActive));
      });

      insightCards.forEach((card) => {
        const isVisible = selectedType === 'all' || card.dataset.insightType === selectedType;
        card.hidden = !isVisible;
      });
    });
  });
};

const initialiseEmbeddedFormFallbacks = () => {
  const fallbacks = document.querySelectorAll('[data-embedded-form-fallback]');

  fallbacks.forEach((fallback) => {
    const slot = fallback.parentElement;
    const embeddedForm = slot?.querySelector('.ml-embedded');

    if (!embeddedForm) return;

    let observer;
    const hasUsableForm = () => Boolean(embeddedForm.querySelector('form, input, button'));
    const updateFallback = () => {
      if (!hasUsableForm()) return;

      fallback.hidden = true;
      observer?.disconnect();
    };

    observer = new MutationObserver(updateFallback);
    observer.observe(embeddedForm, { childList: true, subtree: true });
    updateFallback();

    window.setTimeout(() => {
      updateFallback();
      if (!hasUsableForm()) fallback.hidden = false;
    }, 4000);
  });
};

initialiseInsightFilters();
initialiseEmbeddedFormFallbacks();
