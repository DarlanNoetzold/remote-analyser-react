import { getToken } from '../seguranca/Autenticacao';

//const getToken = async () => {
//  const username = "admin";
//  const password = "admin";
//  const tokenEndpoint = "http://localhost:8180/realms/quarkus1/protocol/openid-connect/token";
//
//  const authHeader = btoa("backend-service:secret");
//  const formData = new URLSearchParams();
//  formData.append("username", username);
//  formData.append("password", password);
//  formData.append("grant_type", "password");
//
//  const requestOptions = {
//    method: "POST",
//    headers: {
//      "Authorization": `Basic ${authHeader}`,
//      "Content-Type": "application/x-www-form-urlencoded",
//    },
//    body: formData.toString(),
//  };
//
//  try {
//    const response = await fetch(tokenEndpoint, requestOptions);
//    console.log(response);
//    if (!response.ok) {
//      throw new Error('Falha ao obter o token de autenticação.');
//    }
//
//    const responseBody = await response.text();
//    const responseJson = JSON.parse(responseBody);
//    const accessToken = responseJson.access_token;
//    return accessToken;
//  } catch (error) {
//    console.error(error);
//    throw error;
//  }
//};


const API_BASE_URL = 'http://localhost:9000';

const authenticatedRequest = async (url, method, body = null) => {
  const token = await getToken();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  console.log(headers);

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${url}`, options);
  
  if(response.status === 403){
    return 0;
  }

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();  

  if (!response.ok) {
    throw new Error(data.message || 'Ocorreu um erro na requisição.');
  }
  console.log(data);
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
  return authenticatedRequest('/alert?page=1&size=10&sortBy=id', 'GET');
};

export const getAlertByIdAPI = async (id) => {
  return authenticatedRequest(`/alert/${id}`, 'GET');
};

export const getAlertByPcIdAPI = async (id) => {
  return authenticatedRequest(`/alert/pcId/${id}`, 'GET');
};

export const removeAlertByIdAPI = async (id) => {
  return authenticatedRequest(`/alert/${id}`, 'DELETE');
};

// Funções CRUD para Images
export const addImageAPI = async (imageData) => {
  return authenticatedRequest('/image', 'POST', imageData);
};

export const getAllImagesAPI = async () => {
  return authenticatedRequest('/image?page=1&size=20&sortBy=id', 'GET');
};

export const getImageByIdAPI = async (id) => {
  return authenticatedRequest(`/image/${id}`, 'GET');
};

// Funções CRUD para Malicious Website
export const addMaliciousWebsiteAPI = async (websiteData) => {
  return authenticatedRequest('/website', 'POST', websiteData);
};

export const getAllMaliciousWebsitesAPI = async () => {
  return authenticatedRequest('/website?page=1&size=10&sortBy=id', 'GET');
};

export const getMaliciousWebsiteByIdAPI = async (id) => {
  return authenticatedRequest(`/website/${id}`, 'GET');
};

export const removeMaliciousWebsiteByIdAPI = async (id) => {
  return authenticatedRequest(`/website/${id}`, 'DELETE');
};

export const updateMaliciousWebsiteAPI = async (id, updatedWebsiteData) => {
  return authenticatedRequest(`/website/${id}`, 'PUT', updatedWebsiteData);
};

// Funções CRUD para Malicious Process
export const addMaliciousProcessAPI = async (processData) => {
  return authenticatedRequest('/process', 'POST', processData);
};

export const getAllMaliciousProcessesAPI = async () => {
  return authenticatedRequest('/process?page=1&size=10&sortBy=id', 'GET');
};

export const getMaliciousProcessByIdAPI = async (id) => {
  return authenticatedRequest(`/process/${id}`, 'GET');
};

export const removeMaliciousProcessByIdAPI = async (id) => {
  return authenticatedRequest(`/process/${id}`, 'DELETE');
};

export const updateMaliciousProcessAPI = async (id, updatedProcessData) => {
  return authenticatedRequest(`/process/${id}`, 'PUT', updatedProcessData);
};

// Funções CRUD para Malicious Port
export const addMaliciousPortAPI = async (portData) => {
  return authenticatedRequest('/port', 'POST', portData);
};

export const getAllMaliciousPortsAPI = async () => {
  return authenticatedRequest('/port?page=1&size=10&sortBy=id', 'GET');
};

export const getMaliciousPortByIdAPI = async (id) => {
  return authenticatedRequest(`/port/${id}`, 'GET');
};

export const removeMaliciousPortByIdAPI = async (id) => {
  return authenticatedRequest(`/port/${id}`, 'DELETE');
};

export const updateMaliciousPortAPI = async (id, updatedPortData) => {
  return authenticatedRequest(`/port/${id}`, 'PUT', updatedPortData);
};

// Funções CRUD para Bad Language
export const addBadLanguageAPI = async (languageData) => {
  return authenticatedRequest('/language', 'POST', languageData);
};

export const getBadLanguageByIdAPI = async (id) => {
  return authenticatedRequest(`/language/${id}`, 'GET');
};

export const getAllBadLanguagesAPI = async () => {
  return authenticatedRequest('/language?page=1&size=10&sortBy=id', 'GET');
};

export const removeBadLanguageByIdAPI = async (id) => {
  return authenticatedRequest(`/language/${id}`, 'DELETE');
};

export const updateBadLanguageAPI = async (id, updatedLanguageData) => {
  return authenticatedRequest(`/language/${id}`, 'PUT', updatedLanguageData);
};