
const BASE_URL = 'http://localhost:8080/Jee-Backend-1.0-SNAPSHOT/api';


export async function createUser(nom: string, prenom: string, email: string, password: string) {
  try {
  
      const user = {
          nom: nom,
          prenom: prenom,
          email: email,
          password: password
      };
      const response = await fetch(`${BASE_URL}/users`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(user) 
      });

      if (!response.ok) {
          throw new Error('Failed to create user');
      }

      return await response.json();
  } catch (error) {
      console.error('Error creating user:', error);
      throw error;
  }
}

export async function ListUsers() {
    try {
    
    
        const response = await fetch(`http://localhost:8080/Jee-Backend-1.0-SNAPSHOT/api/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
  
        if (!response.ok) {
            throw new Error('Failed to create user');
        }
  
        return await response.json();
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
  }