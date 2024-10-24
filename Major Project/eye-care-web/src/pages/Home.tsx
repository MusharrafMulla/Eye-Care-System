import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to the Eye Care App
      </Typography>
      <Typography variant="h5" gutterBottom>
        Book an appointment with a specialist today!
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/doctors">
        View Doctors
      </Button>
    </Container>
  );
};

export default Home;
