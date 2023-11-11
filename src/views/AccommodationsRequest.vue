<script setup>
import AccommodationCategoryServices from "../services/accommodationCategoryServices";
import UserAccommodationRequestServices from "../services/userAccommodationRequestServices";
import Utils from "../config/utils.js";
import NotificationSender from "../components/NotificationSender.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const accommodationCategories = ref([]);
const user = Utils.getStore("user");
const message = ref("");
const requestMessage = ref("");
const showDialog = ref(false);
const currentCategory = ref({});
const requestDescription = ref("");
const notificationSender = ref(null);

const retrieveAccommodationCategories = () => {
  AccommodationCategoryServices.getAll()
    .then((response) => {
      accommodationCategories.value = response.data;
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

const submitRequest = async () => {
  // Create the accommodation request
  const newRequest = {
    userId: user.userId,
    permission: 1,
    description: requestDescription.value,
  };

  try {
    await UserAccommodationRequestServices.create(newRequest);
    requestMessage.value = "Request submitted successfully";
    showDialog.value = false;
    // requestDescription.value = "";

    // After successful submission, call the sendEmail method on NotificationSender
    if (notificationSender.value) {
      notificationSender.value.sendEmail({
        to: user.email,
      }, 'confirm');
    } else {
      console.error('NotificationSender component not referenced properly.');
    }
  } catch (error) {
    requestMessage.value = error.response?.data?.message || "Failed to submit request";
  }
};

retrieveAccommodationCategories();
</script>

<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>
          Hello, {{ user.fName }} {{ user.lName }}!
        </v-toolbar-title>
      </v-toolbar>
      <br /><br />
      <!-- Card for Accommodation Categories -->
      <v-card>
        <v-card-title>Accommodations Categories</v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Title</th>
              <th class="text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in accommodationCategories" :key="category.id">
              <td>{{ category.categoryName }}</td>
              <td>{{ category.desc }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
      <br /><br />
       <!-- Card for Submitting Request -->
       <v-card>
        <v-card-title>Submit Accommodation Request</v-card-title>        
        <v-card-text>
          <b>{{ requestMessage }}</b>
        </v-card-text>
        <v-card-text>
          <v-textarea
            label="Request Description"
            v-model="requestDescription"
            placeholder="Describe your accommodation needs"
            required
            auto-grow
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="submitRequest">
            Submit Request
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>

    <NotificationSender ref="notificationSender" />

  </div>
</template>