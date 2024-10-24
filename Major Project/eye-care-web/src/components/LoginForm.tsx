import React, { useState } from 'react';
import '../styles/FormStyles.css'; // Adjust the path as necessary


interface LoginFormProps {
  onLoginSuccess: () => void; // Prop to handle successful login
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Example API request - replace with your backend endpoint
    try {
      const response = await fetch('http://localhost:4242/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setSuccess('Login successful!'); // Handle success message
      setError(null);
      
      // Call the onLoginSuccess prop to indicate successful login
      onLoginSuccess();
      
    } catch (error: any) {
      setError(error.message); // Handle error
      setSuccess(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>User Login</h3>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Login</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </form>
  );
};

export default LoginForm;
