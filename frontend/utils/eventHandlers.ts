import { apiClient } from '../lib/api';

export const handleRegisterEvent = async (eventId: string, eventTitle: string, website?: string) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Please sign in to register for events');
      window.location.href = '/auth/login';
      return;
    }

    // If there's a registration link, open it in a new tab
    if (website) {
      window.open(website, '_blank', 'noopener,noreferrer');
    }

    // Also register in our system for tracking
    const response = await apiClient.registerForEvent(eventId);
    alert(`Successfully registered for "${eventTitle}"! ${website ? 'Registration page opened in a new tab.' : ''}`);
    
    return response;
  } catch (error) {
    console.error('Registration failed:', error);
    alert(`Failed to register for "${eventTitle}". Please try again.`);
  }
};

export const handleLearnMore = (eventId: string, eventTitle: string) => {
  console.log('Learning more about event:', eventTitle);
  // Navigate to event details page
  window.location.href = `/events/${eventId}`;
};

export const handleSaveForLater = async (eventId: string, eventTitle: string) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Please sign in to save events');
      window.location.href = '/auth/login';
      return;
    }

    // Check if already saved by checking localStorage for saved events
    const savedEvents = JSON.parse(localStorage.getItem('savedEvents') || '[]');
    
    if (savedEvents.includes(eventId)) {
      // Unsave the event
      await apiClient.unsaveEvent(eventId);
      const updatedSaved = savedEvents.filter((id: string) => id !== eventId);
      localStorage.setItem('savedEvents', JSON.stringify(updatedSaved));
      alert(`"${eventTitle}" removed from saved events`);
    } else {
      // Save the event
      await apiClient.saveEvent(eventId);
      savedEvents.push(eventId);
      localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
      alert(`"${eventTitle}" saved for later!`);
    }
    
    // Refresh the page to update UI
    window.location.reload();
  } catch (error) {
    console.error('Save event failed:', error);
    alert(`Failed to save "${eventTitle}". Please try again.`);
  }
};

export const handleSearchEvents = (searchTerm: string, location: string, eventType: string) => {
  console.log('Search executed:', { searchTerm, location, eventType });
  
  // Build search parameters
  const params = new URLSearchParams();
  if (searchTerm.trim()) params.append('search', searchTerm.trim());
  if (eventType && eventType !== 'all') params.append('eventType', eventType);
  if (location.trim()) params.append('location', location.trim());
  
  // Navigate to events page with search parameters
  const searchUrl = `/events${params.toString() ? `?${params.toString()}` : ''}`;
  window.location.href = searchUrl;
};

export const handleSubmitEvent = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Please sign in to submit events');
      window.location.href = '/auth/login';
      return;
    }

    const response = await apiClient.submitEvent(formData);
    return { success: true, message: 'Event submitted successfully for review!', data: response };
  } catch (error) {
    console.error('Event submission failed:', error);
    return { success: false, message: 'Failed to submit event. Please try again.' };
  }
};

export const handleCreateAccount = () => {
  console.log('Redirecting to account creation');
  window.location.href = '/auth/register';
};

export const handleSignIn = () => {
  console.log('Redirecting to sign in');
  window.location.href = '/auth/login';
};

// Check if event is saved (for UI state)
export const isEventSaved = (eventId: string): boolean => {
  if (typeof window === 'undefined') return false;
  const savedEvents = JSON.parse(localStorage.getItem('savedEvents') || '[]');
  return savedEvents.includes(eventId);
};

// Check if user is registered for event (for UI state)
export const isEventRegistered = (eventId: string): boolean => {
  if (typeof window === 'undefined') return false;
  const registeredEvents = JSON.parse(localStorage.getItem('registeredEvents') || '[]');
  return registeredEvents.includes(eventId);
};
