<script setup>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import Utils from "../config/utils.js";
import UserAccommodationServices from "../services/userAccommodationServices";

const router = useRouter();
const userAccommodations = ref([]);
const user = Utils.getStore("user");
const message = ref("");

const viewUserAccommodation = (userAccommodation) => {
  router.push({ name: "view", params: { id: userAccommodation.id } });
};

watchEffect(() => {
  message.value = userAccommodations.value.length === 0
    ? "There are currently no outstanding accommodations."
    : "Outstanding Accommodation Requests";
});

const retrieveUserAccommodations = () => {
  UserAccommodationServices.getAll()
    .then((response) => {
      userAccommodations.value = response.data || [];
    })
    .catch((e) => {
      console.error(e.response?.data?.message || e.message);
      userAccommodations.value = [];
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
              <th class="text-left">Title</th>
              <th class="text-left">Description</th>
              <th class="text-left">View</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in userAccommodations" :key="item.title">
              <td>{{ item.id }}</td>
              <td>{{ item.userId }}</td>
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
  