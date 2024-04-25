
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
        title: eventData.title,
        description: eventData.description,
        dateTime: eventData.dateTime,
        type: eventData.type,
       
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

  export async function updateEvent(Event) {
    try {
       
        const response = await fetch(`${BASE_URL}/events/${Event.id}`, {
          
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Event) 
        });
  
        if (!response.ok) {
            throw new Error('Failed to update Event');
        }
  
        return await response.json();
    } catch (error) {
        console.error('Error updating Event:', error);
        throw error;
    }
  }export async function DeleteEvent(id: string) {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}`, { // Corrected interpolation
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to DELETE Event');
      }
  
      
    } catch (error) {
      console.error('Error DELETING Event:', error);
      throw error;
    }
  }