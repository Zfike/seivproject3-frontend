<script>
import axios from 'axios';

export default {
  methods: {
    async sendEmail(emailDetails) {
      try {
        const response = await axios.post('http://localhost:3021/send-email', emailDetails);
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