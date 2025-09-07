const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: credentials,
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: userData,
    });
  }

  // Public event endpoints
  async getPublicEvents(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/public/events${query ? `?${query}` : ''}`);
  }

  async getEventsByType(eventType, params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/public/events/type/${eventType}${query ? `?${query}` : ''}`);
  }

  async getFeaturedEvents(limit = 6) {
    return this.request(`/public/events/featured?limit=${limit}`);
  }

  async getEventById(eventId) {
    return this.request(`/public/events/${eventId}`);
  }

  async getEventStats() {
    return this.request('/public/events/stats');
  }

  // User endpoints (require authentication)
  async getUserProfile() {
    return this.request('/users/profile');
  }

  async updateUserProfile(profileData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: profileData,
    });
  }

  async saveEvent(eventId) {
    return this.request(`/users/events/${eventId}/save`, {
      method: 'POST',
    });
  }

  async unsaveEvent(eventId) {
    return this.request(`/users/events/${eventId}/save`, {
      method: 'DELETE',
    });
  }

  async registerForEvent(eventId) {
    return this.request(`/users/events/${eventId}/register`, {
      method: 'POST',
    });
  }

  async unregisterFromEvent(eventId) {
    return this.request(`/users/events/${eventId}/register`, {
      method: 'DELETE',
    });
  }

  async getSavedEvents(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/users/saved-events${query ? `?${query}` : ''}`);
  }

  async getRegisteredEvents(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/users/registered-events${query ? `?${query}` : ''}`);
  }

  // Event management endpoints (require authentication)
  async submitEvent(eventData) {
    return this.request('/events/submit', {
      method: 'POST',
      body: eventData,
    });
  }

  async getUserEvents(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/events/my-events${query ? `?${query}` : ''}`);
  }

  async updateEvent(eventId, eventData) {
    return this.request(`/events/${eventId}`, {
      method: 'PUT',
      body: eventData,
    });
  }

  async deleteEvent(eventId) {
    return this.request(`/events/${eventId}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;
