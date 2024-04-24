
const BASE_URL = 'http://localhost:8080/Jee-Backend-1.0-SNAPSHOT/api';



export async function  ListEvents()  {
    try {

      const response = await fetch(`${BASE_URL}/events`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

export async function createEvent(eventData) {
    try {
      const event = {
        schedules: eventData.schedules,
        speakers: eventData.speakers,
        event: eventData.event,
        topics: eventData.topics,
        images: eventData.images,
        details: eventData.details
      };
  
      const response = await fetch(`${BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });
  
      if (!response.ok) {
        throw new Error('Failed to create event');
      }
  
      return true;
    } catch (error) {
      console.error('Error creating event:', error);
      throw "Failed to create event";
    }
  }