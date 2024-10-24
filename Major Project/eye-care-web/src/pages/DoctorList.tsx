import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, Button, Typography, Dialog } from '@mui/material';
import axios from 'axios';
import BookingForm from '../components/BookingForm';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Fetch doctors from mock API on component mount
  useEffect(() => {
    axios.get('/doctors.json')
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error('Error fetching doctors:', error));
  }, []);

  const handleOpen = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Doctors List
      </Typography>
      <List>
        {doctors.map((doctor) => (
          <ListItem key={doctor.id}>
            <ListItemText primary={doctor.name} secondary={doctor.specialty} />
            <Button variant="outlined" onClick={() => handleOpen(doctor)}>
              Book Appointment
            </Button>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        {selectedDoctor && <BookingForm doctor={selectedDoctor} />}
      </Dialog>
    </Container>
  );
};

export default DoctorList;
