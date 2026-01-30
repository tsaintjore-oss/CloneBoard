/**
 * Script de protection du dashboard
 * Vérifie l'authentification et l'abonnement actif avant d'afficher le dashboard
 * Si pas d'accès, redirige vers /access.html ou /sales.html
 */

(function() {
  'use strict';

  const AUTH_STORAGE_KEY = 'userEmail';

  function getLoggedInEmail() {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  }

  function redirectToAccess() {
    // Rediriger vers la page d'accès qui gère l'authentification
    window.location.href = '/access.html';
  }

  function redirectToSales() {
    // Rediriger vers la page de vente publique
    window.location.href = '/sales.html#pricing';
  }

  async function checkAccess() {
    const email = getLoggedInEmail();
    
    // Si pas d'email enregistré, rediriger vers la page d'accès
    if (!email) {
      console.log('No email found, redirecting to access page');
      redirectToAccess();
      return false;
    }

    // Vérifier l'accès via l'API
    try {
      const response = await fetch(`/api/payment/check-access?email=${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      
      if (data.hasAccess && data.subscriptionStatus === 'active') {
        console.log('Access granted to dashboard');
        return true;
      } else {
        console.log('No active subscription found');
        // Rediriger vers la page de vente avec un message
        redirectToSales();
        return false;
      }
    } catch (error) {
      console.error('Error checking access:', error);
      // En cas d'erreur (API non disponible), rediriger vers la page d'accès
      redirectToAccess();
      return false;
    }
  }

  // Masquer le contenu du dashboard immédiatement
  const dashboardContent = document.querySelector('.app');
  const body = document.body;
  
  if (dashboardContent) {
    dashboardContent.style.visibility = 'hidden';
    dashboardContent.style.opacity = '0';
  }

  // Afficher un loader pendant la vérification
  const loader = document.createElement('div');
  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0a0a0a;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;
  loader.innerHTML = '<div style="text-align: center;"><div style="margin-bottom: 16px;">Vérification de l\'accès...</div><div style="font-size: 14px; color: #888;">Veuillez patienter</div></div>';
  body.appendChild(loader);

  // Vérifier l'accès
  checkAccess().then((hasAccess) => {
    // Retirer le loader
    if (loader.parentNode) {
      loader.parentNode.removeChild(loader);
    }
    
    if (hasAccess) {
      // Afficher le dashboard si l'accès est autorisé
      if (dashboardContent) {
        dashboardContent.style.visibility = '';
        dashboardContent.style.opacity = '';
      }
    }
    // Si pas d'accès, la redirection a déjà été effectuée dans checkAccess()
  });
})();
