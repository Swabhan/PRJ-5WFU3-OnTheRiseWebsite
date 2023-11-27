'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from "@mui/material";

async function sendEmail(formData) {
  try {
    const res = await fetch('http://127.0.0.1:8000/contact_us', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw Error('Failed to post event');
    }
  } catch (error) {
    console.error(error.message);
  }
}


const ContactUs = () => {
  const [formData, setFormData] = useState({
    subject: "",
    from_email: "",
    message: ""
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleAddEvent = () => {
    sendEmail(formData)
    setFormData({
      subject: "",
      from_email: "",
      message: ""
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff", // Set background color to white
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "40px", // Increased padding for a larger box
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "green", mb: 3 }}>
          Contact Us
        </Typography>
        <form>
          <TextField
            label="Subject"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleChange('subject')}
          />
          <TextField
            label="Your Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleChange('from_email')}
          />
          <TextField
            label="Your Message"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleChange('message')}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleAddEvent}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ContactUs;
