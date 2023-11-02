<script setup>
import AccommodationServices from "../services/accommodationServices";
import NotificationSender from "../components/NotificationSender.vue";
import Utils from "../config/utils.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const accommodations = ref([]);
const user = Utils.getStore("user");
const message = ref("Request for Accommodations");


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
        <NotificationSender />
      </v-card>
    </v-container>
  </div>
</template>
