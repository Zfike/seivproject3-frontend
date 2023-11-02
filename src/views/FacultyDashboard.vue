<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Utils from "../config/utils.js";
import AccommodationServices from "../services/accommodationServices";

const router = useRouter();
const accommodations = ref([]);
const user = Utils.getStore("user");
const message = ref("Outstanding Accommodations");

const viewAccommodation = (accommodation) => {
  router.push({ name: "view", params: { id: accommodation.id } });
};

const retrieveAccommodations = () => {
  AccommodationServices.getAll()
    .then((response) => {
      accommodations.value = response.data;
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

retrieveAccommodations();
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
            <tr v-for="(item, index) in accommodations" :key="item.title">
              <td>{{ item.title }}</td>
              <td>{{ item.desc }}</td>
              <td>
                <v-icon small class="mx-4" @click="viewAccommodation(item)">
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
  