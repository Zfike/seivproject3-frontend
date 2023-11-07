<script>
import axios from 'axios';

const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? 'https://project3.eaglesoftwareteam.com/accommodations-t1' // Production URL
  : 'http://localhost:3021'; // Local URL

export default {
  methods: {
    async sendEmail(emailDetails) {
      try {
        const response = await axios.post(`${apiBaseUrl}/send-email`, emailDetails);
        console.log('Email sent successfully:', response.data);
      } catch (error) {
        console.error('Email could not be sent:', error);
      }
    }
  }
};
</script>

<template>
  <!-- This component might be invisible and just serves as an email sender -->
</template>