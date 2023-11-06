<script setup>
import AccommodationCategoryServices from "../services/accommodationCategoryServices";
import UserAccommodationServices from "../services/userAccommodationServices";
import Utils from "../config/utils.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const accommodationCategories = ref([]);
const user = Utils.getStore("user");
const message = ref("Accommodation Types");
const showDialog = ref(false);
const currentCategory = ref({});
const requestDescription = ref("");

const retrieveAccommodationCategories = () => {
  AccommodationCategoryServices.getAll()
    .then((response) => {
      accommodationCategories.value = response.data;
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

const submitRequest = () => {
  const newRequest = {
    userId: user.userId,
    permission: 1,
    accommodationCategoryId: currentCategory.value.id,
    description: requestDescription.value,
  };

  UserAccommodationServices.create(newRequest)
    .then((response) => {
      message.value = "Request submitted successfully";
      showDialog.value = false;
      requestDescription.value = '';
    })
    .catch((e) => {
      message.value = e.response.data.message || "Failed to submit request";
    });
};

const openRequestDialog = (category) => {
  currentCategory.value = category;
  showDialog.value = true;
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
      <v-card>
        <v-card-title>Accommodations Request</v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Title</th>
              <th class="text-left">Description</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in accommodationCategories" :key="category.id">
              <td>{{ category.categoryName }}</td>
              <td>{{ category.desc }}</td>
              <td>
                <!-- Request button for each category -->
                <v-btn color="primary" @click="openRequestDialog(category)">
                  Request
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-container>

    <!-- Dialog for submitting a new accommodation request -->
    <v-dialog v-model="showDialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="headline">Submit Accommodation Request for {{ currentCategory.categoryName }}</v-card-title>
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
          <v-btn color="blue darken-1" text @click="showDialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="submitRequest">Submit Request</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>