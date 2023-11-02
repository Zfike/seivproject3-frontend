<script>
  import axios from 'axios';
  
  export default {
    methods: {
      sendEmail() {
        axios.post('/send-email')
          .then(response => {
            console.log('Email sent successfully');
          })
          .catch(error => {
            console.error('Email could not be sent:', error);
          });
      }
    }
  };
</script>
  

<template>
    <div>
      <button @click="sendEmail">Send Email</button>
    </div>
</template>
