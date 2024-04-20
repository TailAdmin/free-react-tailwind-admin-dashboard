
const BASE_URL = 'http://your-java-ee-backend-url';


export async function createUser(nom, prenom, email, password) {
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
  