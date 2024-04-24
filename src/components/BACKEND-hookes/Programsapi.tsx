
const BASE_URL = 'http://localhost:8080/Jee-Backend-1.0-SNAPSHOT/api';


export async function createPrograms(ProgramsData) {
    try {
      const PROGRAMS = {
        schedules: ProgramsData.schedules,
        speakers: ProgramsData.speakers,
        event: ProgramsData.event,
        topics: ProgramsData.topics,
        images: ProgramsData.images,
        details: ProgramsData.details
      };
  
      const response = await fetch(`${BASE_URL}/programs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(PROGRAMS)
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