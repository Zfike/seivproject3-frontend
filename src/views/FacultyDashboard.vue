<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Utils from "../config/utils.js";

const router = useRouter();
const user = Utils.getStore("user");
const message = ref("Use the dashboard to manage student accommodations.");

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
          <!-- Example actions -->
          <v-list>
            <!-- <v-list-item @click="manageCourses">
              <v-list-item-content>
                <v-list-item-title>Manage Courses</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
          </v-list>
        </v-card>
      </v-container>
    </div>
  </template>
  