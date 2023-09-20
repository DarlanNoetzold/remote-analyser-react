
const getToken = async () => {
    const loginData = {
      login: "string",
      password: "string",
    };
  
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'PostmanRuntime/7.29.2',
        'Accept': '*/*'
      },
      body: JSON.stringify(loginData),
    };
  
    const response = await fetch('http://localhost:8091/login', requestOptions);
  
    if (!response.ok) {
      throw new Error('Falha ao obter o token de autenticação.');
    }
  
    const data = await response.json();
    return data.token; // Supondo que o token seja retornado como data.token
  };

const API_BASE_URL = 'http://localhost:8091'; // Altere de acordo com o seu ambiente

// Função para fazer uma requisição autenticada
const authenticatedRequest = async (url, method, body = null) => {
  const token = getToken(); // Obtenha o token de autenticação do estado ou de onde quer que esteja armazenado

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${url}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Ocorreu um erro na requisição.');
  }

  return data;
};

// Função para autenticar o usuário
export const loginAPI = async (login, password) => {
  const body = {
    login,
    password,
  };

  return authenticatedRequest('/login', 'POST', body);
};

// Funções CRUD para Alerts
export const addAlertAPI = async (alertData) => {
  return authenticatedRequest('/alert', 'POST', alertData);
};

export const getAllAlertsAPI = async () => {
  return authenticatedRequest('/alert', 'GET');
};

export const getAlertByIdAPI = async (id) => {
  return authenticatedRequest(`/alert/${id}`, 'GET');
};

export const removeAlertByIdAPI = async (id) => {
  return authenticatedRequest(`/alert/${id}`, 'DELETE');
};

// Funções CRUD para Images
export const addImageAPI = async (imageData) => {
  return authenticatedRequest('/image', 'POST', imageData);
};

export const getAllImagesAPI = async () => {
  return authenticatedRequest('/image', 'GET');
};

export const getImageByIdAPI = async (id) => {
  return authenticatedRequest(`/image/${id}`, 'GET');
};

// Funções CRUD para Malicious Website
export const addMaliciousWebsiteAPI = async (websiteData) => {
  return authenticatedRequest('/website', 'POST', websiteData);
};

export const getAllMaliciousWebsitesAPI = async () => {
  return authenticatedRequest('/website', 'GET');
};

export const getMaliciousWebsiteByIdAPI = async (id) => {
  return authenticatedRequest(`/website/${id}`, 'GET');
};

export const removeMaliciousWebsiteByIdAPI = async (id) => {
  return authenticatedRequest(`/website/${id}`, 'DELETE');
};

// Funções CRUD para User
export const addUserAPI = async (userData) => {
  return authenticatedRequest('/user/save', 'POST', userData);
};

export const validateUserPasswordAPI = async () => {
  return authenticatedRequest('/user/validatePass', 'GET');
};

export const getAllUsersAPI = async () => {
  return authenticatedRequest('/user/listAll', 'GET');
};

// Funções CRUD para Malicious Process
export const addMaliciousProcessAPI = async (processData) => {
  return authenticatedRequest('/process', 'POST', processData);
};

export const getAllMaliciousProcessesAPI = async () => {
  return authenticatedRequest('/process', 'GET');
};

export const getMaliciousProcessByIdAPI = async (id) => {
  return authenticatedRequest(`/process/${id}`, 'GET');
};

export const removeMaliciousProcessByIdAPI = async (id) => {
  return authenticatedRequest(`/process/${id}`, 'DELETE');
};

// Funções CRUD para Malicious Port
export const addMaliciousPortAPI = async (portData) => {
  return authenticatedRequest('/port', 'POST', portData);
};

export const getAllMaliciousPortsAPI = async () => {
  return authenticatedRequest('/port', 'GET');
};

export const getMaliciousPortByIdAPI = async (id) => {
  return authenticatedRequest(`/port/${id}`, 'GET');
};

export const removeMaliciousPortByIdAPI = async (id) => {
  return authenticatedRequest(`/port/${id}`, 'DELETE');
};

// Funções CRUD para Bad Language
export const addBadLanguageAPI = async (languageData) => {
  return authenticatedRequest('/language', 'POST', languageData);
};

export const getBadLanguageByIdAPI = async (id) => {
  return authenticatedRequest(`/language/${id}`, 'GET');
};

export const getAllBadLanguagesAPI = async () => {
  return authenticatedRequest('/language', 'GET');
};

export const removeBadLanguageByIdAPI = async (id) => {
  return authenticatedRequest(`/language/${id}`, 'DELETE');
};
