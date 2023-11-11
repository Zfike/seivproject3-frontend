<script setup>
import UserAccommodationRequestServices from "../services/userAccommodationRequestServices";
import UserAccommodationServices from "../services/userAccommodationServices";
import AccommodationCategoryServices from "../services/accommodationCategoryServices";
import NotificationSender from "../components/NotificationSender.vue";
import Utils from "../config/utils.js";
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userAccommodationRequest = ref({});
const accommodationCategories = ref([]);
const selectedCategories = ref([]);
const user = Utils.getStore("user");
const message = ref("View and approve accommodations");
const approveDialog = ref(false);
const declineDialog = ref(false);

const props = defineProps({
  id: {
    required: true,
  },
});

const retrieveUserAccommodationRequests = () => {
  UserAccommodationRequestServices.get(props.id)
    .then((response) => {
      userAccommodationRequest.value = response.data;
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

const retrieveAccommodationCategories = () => {
  AccommodationCategoryServices.getAll()
    .then((response) => {
      accommodationCategories.value = response.data;
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

const toggleCategorySelection = (categoryId) => {
  const index = selectedCategories.value.indexOf(categoryId);
  if (index > -1) {
    selectedCategories.value.splice(index, 1); // Remove if already selected
  } else {
    selectedCategories.value.push(categoryId); // Add if not selected
  }
};

const updateStatus = (newStatus) => {
  UserAccommodationRequestServices.update(userAccommodationRequest.value.id, { status: newStatus })
    .then(() => {
      message.value = `Accommodation has been ${newStatus}.`;
      retrieveUserAccommodationRequests(); // Refresh the accommodation data
    })
    .catch((e) => {
      message.value = e.response.data.message || `Failed to update accommodation status to ${newStatus}.`;
    });
};

const confirmApprove = () => {
  if (selectedCategories.value.length === 0) {
    message.value = "No accommodation categories selected.";
    return;
  }
  

  // Wrap the creation of user accommodations in a Promise.all to handle them concurrently
  Promise.all(selectedCategories.value.map(categoryId => {
    const accommodationData = {
      ...userAccommodationRequest.value,
      accommodationCategoryId: categoryId,
      userAccommodationRequestId: userAccommodationRequest.value.id
    };
    // Remove properties that are not required or should not be copied directly
    delete accommodationData.id;
    delete accommodationData.status;
    delete accommodationData.user;

    return UserAccommodationServices.create(accommodationData);
  }))
  .then(() => {
    if (notificationSender.value) {
      notificationSender.value.sendEmail({
        from: user.email,
        to: userAccommodationRequest.userId.email,
      }, 'approve');
    } else {
      console.error('NotificationSender component not referenced properly.');
    }

    message.value = "All accommodations have been approved.";
    updateStatus('approved');
    approveDialog.value = false;
    retrieveUserAccommodationRequests();
  })
  .catch((error) => {
    console.error(error);
    message.value = "Failed to approve accommodations.";
  });
};

const confirmDecline = () => {
  updateStatus('declined');
  declineDialog.value = false;
};

onMounted(() => {
  retrieveUserAccommodationRequests();
  retrieveAccommodationCategories();
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
        <v-card-title>Request View</v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Request ID</th>
              <!-- <th class="text-left">Category</th> -->
              <th class="text-left">User ID</th>
              <th class="text-left">Name</th>
              <th class="text-left">Description</th>
              <th class="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ userAccommodationRequest.id }}</td>
              <!-- <td>{{ userAccommodation.accommodationCategory?.categoryName }}</td> -->
              <td>{{ userAccommodationRequest.userId }}</td>
              <td>{{ userAccommodationRequest.user?.fName }} {{ userAccommodationRequest.user?.lName }}</td>
              <td>{{ userAccommodationRequest.description }}</td>
              <td>{{ userAccommodationRequest.status }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
      <v-card>
        <v-card-title>Add Accommodations</v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              v-for="(category, index) in accommodationCategories" :key="category.id"
              cols="12"
              sm="6"
              md="4"
            >
              <v-checkbox
                :label="category.categoryName"
                :value="category.id"
                :input-value="selectedCategories.includes(category.id)"
                @change="toggleCategorySelection(category.id)"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-card-text>
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
