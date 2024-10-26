// src/app/services/localStorageService.js

// Função para obter dados do local storage
// src/app/services/localStorageService.js

export const getFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : []; // Retorna um array vazio se não houver dados
  };
  
  // Função para salvar dados no local storage
  export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  // Função para remover dados do local storage
  export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  };
  