import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Execute Java code with full analysis
export const executeJavaCode = async (code, options = {}) => {
  try {
    const response = await api.post('/api/execute', {
      code,
      enableJIT: options.enableJIT !== false,
      enableGC: options.enableGC !== false
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message || 'Execution failed');
  }
};

// Compile Java code only
export const compileJavaCode = async (code) => {
  try {
    const response = await api.post('/api/compile', { code });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message || 'Compilation failed');
  }
};

// Get bytecode only
export const getBytecode = async (code) => {
  try {
    const response = await api.post('/api/bytecode', { code });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message || 'Bytecode extraction failed');
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Backend not available');
  }
};

export default {
  executeJavaCode,
  compileJavaCode,
  getBytecode,
  healthCheck
};
