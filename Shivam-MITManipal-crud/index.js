const axios = require('axios');

class Crublibrary {
  static #config = {
    url: null,
    key: null
  };

  static init({ url, key }) {
    if (!url || !key) {
      throw new Error('CRUD_API_URL and CRUD_API_KEY must be provided');
    }
    this.#config = { url, key };
  }

  static #validate() {
    if (!this.#config.url || !this.#config.key) {
      throw new Error('Library not initialized. Call Crublibrary.init() first');
    }
  }

  static async create(data) {
    try {
      this.#validate();
      if (!data?.value || !data?.txHash) {
        throw new Error('Missing required fields: value and txHash');
      }
      
      const response = await axios.post(
        `${this.#config.url}/create`,
        data,
        { headers: { 'x-api-key': this.#config.key } }
      );
      
      return response.data;
    } catch (error) {
      this.#handleError(error);
    }
  }

  static async get(id) {
    try {
      this.#validate();
      if (!id) throw new Error('ID is required');
      
      const response = await axios.get(
        `${this.#config.url}/get/${id}`,
        { headers: { 'x-api-key': this.#config.key } }
      );
      
      return response.data;
    } catch (error) {
      this.#handleError(error);
    }
  }

  static async update(id, data) {
    try {
      this.#validate();
      if (!id) throw new Error('ID is required');
      if (!data?.value) throw new Error('Value is required for update');
      
      const response = await axios.put(
        `${this.#config.url}/update/${id}`,
        data,
        { headers: { 'x-api-key': this.#config.key } }
      );
      
      return response.data;
    } catch (error) {
      this.#handleError(error);
    }
  }

  static async delete(id) {
    try {
      this.#validate();
      if (!id) throw new Error('ID is required');
      
      const response = await axios.delete(
        `${this.#config.url}/delete/${id}`,
        { headers: { 'x-api-key': this.#config.key } }
      );
      
      return response.data;
    } catch (error) {
      this.#handleError(error);
    }
  }

  static #handleError(error) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 403:
          throw new Error('Request limit exceeded. Please recharge credits');
        case 400:
          throw new Error(data.error || 'Invalid request');
        case 404:
          throw new Error('Resource not found');
        default:
          throw new Error(`API Error: ${data.message || 'Unknown error'}`);
      }
    }
    throw error;
  }
}

module.exports = Crublibrary;
