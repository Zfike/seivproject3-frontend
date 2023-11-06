<script setup>
import UserAccommodationServices from "../services/userAccommodationServices";
import Utils from "../config/utils.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userAccommodation = ref({});
const user = Utils.getStore("user");
const message = ref("View and approve accommodations");

const props = defineProps({
  id: {
    required: true,
  },
});

const retrieveUserAccommodations = () => {
  UserAccommodationServices.get(props.id)
    .then((response) => {
      userAccommodation.value = response.data;
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

onMounted(() => {
  retrieveUserAccommodations();
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
        <v-card-title> Accommodations View </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Title</th>
              <th class="text-left">Description</th>
              <th class="text-left">Category</th>
            </tr>
          </thead>
          <tbody>
              <td>{{ userAccommodation.id }}</td>
              <!-- <td>{{ userAccommodation.title }}</td>
              <td>{{ userAccommodation.desc }}</td>
              <td>{{ userAccommodation.category }}</td> -->
          </tbody>
        </v-table>
      </v-card>
    </v-container>
  </div>
</template>
