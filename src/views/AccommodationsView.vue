<script setup>
import UserAccommodationServices from "../services/userAccommodationServices";
import Utils from "../config/utils.js";
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userAccommodation = ref({});
const user = Utils.getStore("user");
const message = ref("View and approve accommodations");
const approveDialog = ref(false);
const declineDialog = ref(false);

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

const updateStatus = (newStatus) => {
  UserAccommodationServices.update(userAccommodation.value.id, { status: newStatus })
    .then(() => {
      message.value = `Accommodation has been ${newStatus}.`;
      retrieveUserAccommodations(); // Refresh the accommodation data
    })
    .catch((e) => {
      message.value = e.response.data.message || `Failed to update accommodation status to ${newStatus}.`;
    });
};

const confirmApprove = () => {
  updateStatus('approved');
  approveDialog.value = false;
};

const confirmDecline = () => {
  updateStatus('declined');
  declineDialog.value = false;
};

onMounted(() => {
  retrieveUserAccommodations();
});
</script>

<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Hello, {{ user.fName }} {{ user.lName }}!</v-toolbar-title>
      </v-toolbar>
      <br /><br />
      <v-card>
        <v-card-title>Accommodations View</v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">User Accommodation ID</th>
              <th class="text-left">Category</th>
              <th class="text-left">User ID</th>
              <th class="text-left">Name</th>
              <th class="text-left">Description</th>
              <th class="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ userAccommodation.id }}</td>
              <td>{{ userAccommodation.accommodationCategory?.categoryName }}</td>
              <td>{{ userAccommodation.userId }}</td>
              <td>{{ userAccommodation.user?.fName }} {{ userAccommodation.user?.lName }}</td>
              <td>{{ userAccommodation.description }}</td>
              <td>{{ userAccommodation.status }}</td>
            </tr>
          </tbody>
        </v-table>
        <v-row justify="center" class="my-4">
          <v-col cols="12" class="text-center">
            <v-btn color="green" @click="approveDialog = true" class="mx-4" small>Approve</v-btn>
            <v-btn color="red" @click="declineDialog = true" class="mx-4" small>Decline</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <!-- Approve Confirmation Dialog -->
    <v-dialog v-model="approveDialog" persistent max-width="300px">
      <v-card>
        <v-card-title class="text-h5">Confirm Approval</v-card-title>
        <v-card-text>Are you sure you want to approve this accommodation?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="approveDialog = false">Cancel</v-btn>
          <v-btn color="green" text @click="confirmApprove">Approve</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Decline Confirmation Dialog -->
    <v-dialog v-model="declineDialog" persistent max-width="300px">
      <v-card>
        <v-card-title class="text-h5">Confirm Decline</v-card-title>
        <v-card-text>Are you sure you want to decline this accommodation?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="declineDialog = false">Cancel</v-btn>
          <v-btn color="red" text @click="confirmDecline">Decline</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
