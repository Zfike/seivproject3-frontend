<script setup>
import UserAccommodationServices from "../services/userAccommodationServices";
import Utils from "../config/utils.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userAccommodations = ref([]);
const user = Utils.getStore("user");
const message = ref("Current Accommodations");


// const viewAccommodation = (accommodation) => {
//   router.push({ name: "view", params: { id: accommodation.id } });
// };

const retrieveUserAccommodations = () => {
  UserAccommodationServices.getAllForUser(user.userId)
    .then((response) => {
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
              <th class="text-left">User Accommodation ID</th>
              <th class="text-left">User ID</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in userAccommodations" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.userId }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-container>
  </div>
</template>
