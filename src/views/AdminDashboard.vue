<script setup>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import Utils from "../config/utils.js";
import UserAccommodationRequestServices from "../services/userAccommodationRequestServices";


const router = useRouter();
const userAccommodationRequests = ref([]);
const user = Utils.getStore("user");
const message = ref("");

const viewUserAccommodationRequest = (userAccommodationRequest) => {
  router.push({ name: "view", params: { id: userAccommodationRequest.id } });
};

watchEffect(() => {
  message.value = userAccommodationRequests.value.length === 0
    ? "There are currently no active accommodation requests."
    : "Active Accommodation Requests";
});

const retrieveUserAccommodationRequests = () => {
  UserAccommodationRequestServices.getAll()
    .then((response) => {
      userAccommodationRequests.value = response.data || [];
    })
    .catch((e) => {
      console.error(e.response?.data?.message || e.message);
      userAccommodationRequests.value = [];
    });
};

retrieveUserAccommodationRequests();
</script>

<template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Welcome, {{ user.fName }} {{ user.lName }}!</v-toolbar-title>
        </v-toolbar>
        <br /><br />
        <v-card>
          <v-card-title> Admin Dashboard </v-card-title>
          <v-card-text>
            <b>{{ message }}</b>
          </v-card-text>
          <v-table>
          <thead>
            <tr>
              <th class="text-left">Request ID</th>
              <th class="text-left">User ID</th>
              <th class="text-left">Name</th>
              <th class="text-left">Status</th>
              <th class="text-left">View</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in userAccommodationRequests" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.userId }}</td>
              <td>{{ item.user.fName }} {{ item.user.lName }}</td>
              <td>{{ item.status }}</td>
              <td>
                <v-icon small class="mx-4" @click="viewUserAccommodationRequest(item)">
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
  