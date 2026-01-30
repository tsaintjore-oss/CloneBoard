/**
 * Configuration de l'URL de l'API
 * Utilise VITE_API_URL en production, localhost en développement
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function getApiUrl(path) {
  // Enlever le slash initial si présent
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_URL}/${cleanPath}`;
}

export default API_URL;
