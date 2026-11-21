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

initialiseInsightFilters();
