<script setup>
import AccommodationCategoryServices from "../services/accommodationCategoryServices";
import Utils from "../config/utils.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const accommodationCategories = ref([]);
const user = Utils.getStore("user");
const message = ref("Accommodation Type");

const retrieveAccommodationCategories = () => {
  AccommodationCategoryServices.getAll()
    .then((response) => {
      accommodationCategories.value = response.data;
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

retrieveAccommodationCategories();
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
        <v-card-title> Accommodations Request </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
      </v-card>
      <v-table>
          <thead>
            <tr>
              <th class="text-left">Title</th>
              <th class="text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in accommodationCategories" :key="item.title">
              <td>{{ item.categoryName }}</td>
              <td>{{ item.desc }}</td>
            </tr>
          </tbody>
        </v-table>
    </v-container>
  </div>
</template>
