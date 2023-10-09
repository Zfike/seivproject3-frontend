<script setup>
import AccommodationServices from "../services/accommodationServices";
import Utils from "../config/utils.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const accommodations = ref([]);
const user = Utils.getStore("user");
const message = ref("Search, Edit or Delete Accommodations");

// const editAccommodation = (accommodation) => {
//   router.push({ name: "edit", params: { id: accommodation.id } });
// };

// const viewAccommodation = (accommodation) => {
//   router.push({ name: "view", params: { id: accommodation.id } });
// };

// const deleteAccommodation = (accommodation) => {
//   AccommodationServices.delete(accommodation.id)
//     .then(() => {
//       retrieveAccommodations();
//     })
//     .catch((e) => {
//       message.value = e.response.data.message;
//     });
// };

// const retrieveAccommodations = () => {
//   AccommodationServices.getAllForUser(user.userId)
//     .then((response) => {
//       accommodations.value = response.data;
//     })
//     .catch((e) => {
//       message.value = e.response.data.message;
//     });
// };

// retrieveAccommodations();
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
        <!-- <v-table>
          <thead>
            <tr>
              <th class="text-left">Title</th>
              <th class="text-left">Description</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in accommodations" :key="item.title">
              <td>{{ item.title }}</td>
              <td>{{ item.description }}</td>
              <td>
                <v-icon small class="mx-4" @click="editAccommodation(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="mx-4" @click="viewAccommodation(item)">
                  mdi-format-list-bulleted-type
                </v-icon>
                <v-icon small class="mx-4" @click="deleteAccommodation(item)">
                  mdi-trash-can
                </v-icon>
              </td>
            </tr>
          </tbody>
        </v-table> -->
      </v-card>
    </v-container>
  </div>
</template>
