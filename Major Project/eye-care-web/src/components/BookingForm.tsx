import React, { useState } from 'react';
import { Button, TextField, MenuItem, Container, Typography } from '@mui/material';
import { Formik, Field, Form, ErrorMessage, FieldProps } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import BookingCalendar from './BookingCalendar';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

interface BookingFormProps {
  doctor: Doctor;
}

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM',
];

const validationSchema = Yup.object({
  date: Yup.string().required('Please select a date'),
  time: Yup.string().required('Please select a time slot'),
});

const BookingForm: React.FC<BookingFormProps> = ({ doctor }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Book an Appointment with {doctor.name}
      </Typography>

      <Formik
        initialValues={{ date: '', time: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const booking = { ...values, doctor: doctor.name, date: selectedDate };
          localStorage.setItem('booking', JSON.stringify(booking));
          navigate('/confirmation');
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            {/* Date Selection Using Calendar */}
            <BookingCalendar onDateSelect={(date) => {
  if (date) { // Check if date is not null
    const dateString = date.toISOString().split('T')[0]; // Format date
    setSelectedDate(dateString);
    setFieldValue('date', dateString); // Update Formik's date value
  } else {
    setSelectedDate(null); // Handle null case if needed
    setFieldValue('date', ''); // Clear the Formik field if no date is selected
  }
}} />
      <label style={{ marginTop: '20px', marginBottom: '8px', fontSize: '25px' }}>
        Select a time slot for the appointment
      </label>


            <Field name="time">
              {({ field }: FieldProps) => (
                <TextField
                  {...field}
                  select
                  label="Select Time Slot"
                  fullWidth
                  margin="normal"
                >
                  {timeSlots.map((slot, index) => (
                    <MenuItem key={index} value={slot}>
                      {slot}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Field>
            <ErrorMessage name="time" component="div" />

            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px', marginBottom: '16px' }}>
              Confirm Appointment
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default BookingForm;
