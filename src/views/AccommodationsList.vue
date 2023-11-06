<script setup>
import AccommodationServices from "../services/accommodationServices";
import Utils from "../config/utils.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const accommodations = ref([]);
const user = Utils.getStore("user");
const message = ref("");


// const viewAccommodation = (accommodation) => {
//   router.push({ name: "view", params: { id: accommodation.id } });
// };


// const retrieveAccommodations = () => {
//   userAccommodationServices.getAllForUser(user.userId)
//     .then((response) => {
//       accommodations.value = response.data;
//     })
//     .catch((e) => {
//       message.value = e.response.data.message;
//     });
// };


const retrieveAccommodations = () => {
  AccommodationServices.getAll()
    .then((response) => {
      if (response.status === 200) {
        userAccommodations.value = response.data;
      } else {
        console.error(`Error retrieving accommodations: ${response.status}`);
      }
    })
    .catch((e) => {
      console.error(e.response?.data?.message || e.message);
      message.value = "An error occurred while retrieving accommodations.";
      userAccommodations.value = []; // Ensure it's an empty array if there's an error
    });
};

retrieveUserAccommodations();

watchEffect(() => {
  message.value = userAccommodations.value.length === 0
    ? "You currently have no accommodations. Please request for one."
    : "Current Accommodations";
});
</script>

<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title
          >Hello, {{ user.fName }} {{ user.lName }}!</v-toolbar-title
        >
      </v-toolbar>
      <br /><br />
      <v-card>
        <v-card-title> Accommodations </v-card-title>
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
            <tr v-for="(item, index) in accommodations" :key="item.title">
              <td>{{ item.title }}</td>
              <td>{{ item.desc }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-container>
  </div>
</template>
