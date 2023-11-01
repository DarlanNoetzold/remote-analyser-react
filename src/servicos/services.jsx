import { getToken } from '../seguranca/Autenticacao';


const API_BASE_URL = 'http://localhost:9000';
const COMPANY = 1

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

export const loginAPI = async (login, password) => {
  const body = {
    login,
    password,
  };

  return authenticatedRequest('/login', 'POST', body);
};

export const addAlertAPI = async (alertData) => {
  return authenticatedRequest('/alert', 'POST', alertData);
};

export const getAllAlertsAPI = async (page, size) => {
  return authenticatedRequest(`/alert?page=${page}&size=${size}&company=${COMPANY}`, 'GET');
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

export const addImageAPI = async (imageData) => {
  return authenticatedRequest('/image', 'POST', imageData);
};

export const getAllImagesAPI = async () => {
  return authenticatedRequest('/image?page=1&size=20&sortBy=id', 'GET');
};

export const getImageByIdAPI = async (id) => {
  return authenticatedRequest(`/image/${id}`, 'GET');
};

export const addMaliciousWebsiteAPI = async (websiteData) => {
  return authenticatedRequest('/website', 'POST', websiteData);
};

export const getAllMaliciousWebsitesAPI = async (page, size) => {
  return authenticatedRequest(`/website?page=${page}&size=${size}&sortBy=id`, 'GET');
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

export const addMaliciousProcessAPI = async (processData) => {
  return authenticatedRequest('/process', 'POST', processData);
};

export const getAllMaliciousProcessesAPI = async (page, size) => {
  return authenticatedRequest(`/process?page=${page}&size=${size}&sortBy=id`, 'GET');
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

export const addMaliciousPortAPI = async (portData) => {
  return authenticatedRequest('/port', 'POST', portData);
};

export const getAllMaliciousPortsAPI = async (page, size) => {
  return authenticatedRequest(`/port?page=${page}&size=${size}&sortBy=id`, 'GET');
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

export const addBadLanguageAPI = async (languageData) => {
  return authenticatedRequest('/language', 'POST', languageData);
};

export const getBadLanguageByIdAPI = async (id) => {
  return authenticatedRequest(`/language/${id}`, 'GET');
};

export const getAllBadLanguagesAPI = async (page, size) => {
  return authenticatedRequest(`/language?page=${page}&size=${size}&sortBy=id`, 'GET');
};

export const removeBadLanguageByIdAPI = async (id) => {
  return authenticatedRequest(`/language/${id}`, 'DELETE');
};

export const updateBadLanguageAPI = async (id, updatedLanguageData) => {
  return authenticatedRequest(`/language/${id}`, 'PUT', updatedLanguageData);
};