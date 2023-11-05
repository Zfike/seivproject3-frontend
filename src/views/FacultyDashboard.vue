<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Utils from "../config/utils.js";
import UserAccommodationServices from "../services/userAccommodationServices";

const router = useRouter();
const userAccommodations = ref([]);
const user = Utils.getStore("user");
const message = ref("Outstanding Accommodations");

const viewUserAccommodation = (userAccommodation) => {
  router.push({ name: "view", params: { id: userAccommodation.id } });
};

const retrieveUserAccommodations = () => {
  UserAccommodationServices.getAll()
    .then((response) => {
      console.log(response.data);
      userAccommodations.value = response.data;
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

retrieveUserAccommodations();
</script>

<template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Welcome, {{ user.fName }} {{ user.lName }}!</v-toolbar-title>
        </v-toolbar>
        <br /><br />
        <v-card>
          <v-card-title> Faculty Dashboard </v-card-title>
          <v-card-text>
            <b>{{ message }}</b>
          </v-card-text>
          <v-table>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Category</th>
              <th class="text-left">User ID</th>
              <th class="text-left">Name</th>
              <th class="text-left">Status</th>
              <th class="text-left">View</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in userAccommodations" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.accommodationCategory.categoryName }}</td>
              <td>{{ item.userId }}</td>
              <td>{{ item.user.fName }} {{ item.user.lName }}</td>
              <td>{{ item.status }}</td>
              <td>
                <v-icon small class="mx-4" @click="viewUserAccommodation(item)">
                  mdi-format-list-bulleted-type
                </v-icon>
              </td>
            </tr>
          </tbody>
        </v-table>
        </v-card>
      </v-container>
    </div>
  </template>
  