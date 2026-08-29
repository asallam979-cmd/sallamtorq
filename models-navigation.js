// SALLAM TORQ Models navigation helper
(function () {
  const catalog = 'models.html?v=4d43e982';
  window.SALLAM_TORQ_MODELS_CATALOG = catalog;
  window.openModelsCatalog = function () {
    window.location.href = catalog;
  };
  window.openModelFromCatalog = function () {
    sessionStorage.setItem('sallamTorqModelsReturn', window.location.href);
    window.location.href = catalog;
  };
  window.modelsBack = function () {
    const returnTo = sessionStorage.getItem('sallamTorqModelsReturn');
    sessionStorage.removeItem('sallamTorqModelsReturn');
    window.location.href = returnTo || catalog;
  };
})();
