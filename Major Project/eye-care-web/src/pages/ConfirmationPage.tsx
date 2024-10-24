// src/pages/ConfirmationPage.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Booking {
  doctor: string;
  date: string;
  time: string;
}

const ConfirmationPage: React.FC = () => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBooking = localStorage.getItem('booking');
    if (storedBooking) {
      setBooking(JSON.parse(storedBooking));
    }
  }, []);

  const handleBackToHome = () => {
    localStorage.removeItem('booking'); // Clear the booking after confirmation
    navigate('/');
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem', textAlign: 'center' }}>
      {booking ? (
        <>
          <Typography variant="h4" gutterBottom>
            Appointment Confirmed!
          </Typography>
          <Typography variant="h6">
            Doctor: {booking.doctor}
          </Typography>
          <Typography variant="h6">
            Date: {booking.date}
          </Typography>
          <Typography variant="h6">
            Time: {booking.time}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackToHome}
            style={{ marginTop: '1rem' }}
          >
            Back to Home
          </Button>
        </>
      ) : (
        <Typography variant="h5">No booking found.</Typography>
      )}
    </Container>
  );
};

export default ConfirmationPage;
