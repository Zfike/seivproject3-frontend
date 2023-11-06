<script>
  import axios from 'axios';
  
  export default {
    methods: {
      sendEmail() {
        console.log('sendEmail method called');
        axios.post('http://localhost:3021/send-email')
          .then(response => {
            console.log('Email sent successfully');
          })
          .catch(error => {
            console.error('Email could not be sent:', error);
          });
          console.log('Email sent successfully');  
      }
    }
  };
</script>
  

<!-- <template>
    <div>
      <v-btn 
        variant="outlined" 
        density="comfortable"
        @click="sendEmail"
        >Make Request for Accommodations
      </v-btn>
    </div>
</template> -->
