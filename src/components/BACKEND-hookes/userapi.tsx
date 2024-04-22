
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

      return true;
  } catch (error) {
      console.error('Error creating user:', error);
      throw "user already exists";
  }
}

export async function ListUsers() {
    try {
    
    
        const response = await fetch(`${BASE_URL}/users`, {
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


  export async function updateUser(id: string, nom: string, prenom: string,role: string,  email: string, password: string) {
    try {
        const user = {
       
            nom: nom,
            prenom: prenom,
            email: email,
            role: role,
            password: password
        };
        const response = await fetch(`${BASE_URL}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user) 
        });
  
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
  
        return await response.json();
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
  }
  
  export async function DeleteUsers(id: string) {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}`, { // Corrected interpolation
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to DELETE user');
      }
  
      
    } catch (error) {
      console.error('Error DELETING user:', error);
      throw error;
    }
  }