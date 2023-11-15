<script setup>
import AccommodationCategoryServices from '../services/accommodationCategoryServices';
import SemesterServices from '../services/semesterServices';
import AccommodationServices from "../services/accommodationServices";
import Utils from "../config/utils.js";
import { useRouter } from "vue-router";
import { ref, onMounted, watch } from 'vue';

// Function to format date to YYYY-MM-DD
function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

const router = useRouter();
const user = Utils.getStore("user");
const message = ref("");
const selectedTab = ref('Semesters');
const semesters = ref([]);
const accommodationCategories = ref([]);
const accommodations = ref([]);
const showAddSemesterDialog = ref(false);
const showAddCategoryDialog = ref(false);
const showAddAccommodationDialog = ref(false);

const newSemester = ref({
  title: '',
  startDate: '',
  endDate: ''
});
const newCategory = ref({
  categoryName: '',
  desc: ''
});
const newAccommodation = ref({
  title: '',
  accommodationCategoryId: ''
});
const validSemester = ref(true);
const validCategory = ref(false);
const validAccommodation = ref(false);
const rules = {
  required: value => !!value || 'Required.'
};

const retrieveSemesters = async () => {
  try {
    const response = await SemesterServices.getAll();
    semesters.value = response.data;
  } catch (e) {
    message.value = e.response.data.message;
  }
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

const retrieveAccommodations = async () => {
  try {
    const response = await AccommodationServices.getAll(accommodationPagination.value.page, accommodationPagination.value.itemsPerPage);
    accommodations.value = response.data;
    accommodationPagination.value.totalItems = response.total;
  } catch (e) {
    message.value = e.response.data.message;
  }
};

// Add new semester
const addSemester = async () => {
  if (validSemester.value) {
    try {
      const isEditing = newSemester.value && newSemester.value.id;
      const response = isEditing
        ? await SemesterServices.update(newSemester.value.id, {
            ...newSemester.value,
            // Convert the date back to ISO string if needed
            startDate: new Date(newSemester.value.startDate).toISOString(),
            endDate: new Date(newSemester.value.endDate).toISOString(),
          })
        : await SemesterServices.create({
            ...newSemester.value,
            // Convert the date back to ISO string if needed
            startDate: new Date(newSemester.value.startDate).toISOString(),
            endDate: new Date(newSemester.value.endDate).toISOString(),
          });

      if (isEditing) {
        const index = semesters.value.findIndex(s => s.id === newSemester.value.id);
        if (index !== -1) {
          semesters.value[index] = {
            ...semesters.value[index],
            ...response.data,
          };
        }
      } else {
        semesters.value.push(response.data);
      }

      showAddSemesterDialog.value = false;
      newSemester.value = { title: '', startDate: '', endDate: '' };
    } catch (error) {
      console.error(error);
      message.value = "Error adding/updating semester.";
    }
  } else {
    console.error('The form is not valid.');
  }
};

// Add new category
const addCategory = async (categoryData) => {
  try {
    const response = await AccommodationCategoryServices.create(categoryData);
    accommodationCategories.value.push(response.data);
  } catch (error) {
    console.error(error);
    message.value = "Error adding category.";
  }
};

// Add new accommodation
const addAccommodation = async (accommodationData) => {
  try {
    const response = await AccommodationServices.create(accommodationData);
    accommodations.value.push(response.data);
  } catch (error) {
    console.error(error);
    message.value = "Error adding accommodation.";
  }
};

const editingSemester = ref(false);

// Update for editSemester to use formatDate helper
const editSemester = (semester) => {
  newSemester.value = {
    ...semester,
    startDate: formatDate(semester.startDate), // Format date for input field
    endDate: formatDate(semester.endDate), // Format date for input field
  };
  editingSemester.value = true; // We are in editing mode
  showAddSemesterDialog.value = true;
};

// Method to close the dialog and reset the semester form
const closeSemesterDialog = () => {
  showAddSemesterDialog.value = false;
  editingSemester.value = false; // Reset editing mode if you have one
  newSemester.value = { title: '', startDate: '', endDate: '' }; // Reset the form fields
};

const deleteSemester = async (semesterId) => {
  try {
    await SemesterServices.delete(semesterId);
    semesters.value = semesters.value.filter(s => s.id !== semesterId);
  } catch (error) {
    console.error(error);
    message.value = "Error deleting semester.";
  }
};

// const semesterHeaders = ref([
//   { text: 'ID', align: 'start', sortable: true, value: 'id' },
//   { text: 'Title', align: 'start', sortable: true, value: 'title' },
//   { text: 'Start Date', align: 'start', sortable: true, value: 'startDate' },
//   { text: 'End Date', align: 'start', sortable: true, value: 'endDate' },
//   { text: 'Actions', value: 'actions', align: 'end', sortable: false }
// ]);

// const categoryHeaders = ([
//   { text: 'ID', align: 'start', sortable: true, value: 'id'},
//   { text: 'Category Name', align: 'start',  sortable: true, value: 'categoryName'},
//   { text: 'Description', align: 'start',  sortable: true, value: 'desc'},
//   { text: 'Actions', value: 'actions', align: 'end', sortable: false }
// ]);

// const accommodationHeaders = ([
//   { text: 'ID', align: 'start', sortable: true, value: 'id'},
//   { text: 'Accommodation Name', align: 'start', sortable: true, value: 'title' },
//   { text: 'Category', align: 'start', sortable: true, value: 'accommodationCategory.categoryName' },
//   { text: 'Actions', value: 'actions', align: 'end', sortable: false }
// ]);

// Pagination for semesters
const semesterPagination = ref({
  page: 1,
  itemsPerPage: 10,
});

// Pagination for accommodation categories
const categoryPagination = ref({
  page: 1,
  itemsPerPage: 10,
});

const accommodationPagination = ref({
  page: 1,
  itemsPerPage: 10,
});

// Watch for changes on selectedTab and fetch data accordingly
watch(selectedTab, (newValue) => {
  if (newValue === 'Semesters') {
    retrieveSemesters();
  } else if (newValue === 'Categories') {
    retrieveAccommodationCategories();
  } else if (newValue === 'Accommodations') {
    retrieveAccommodations();
  }
});

// Call this once to load the default tab's data when the component mounts
onMounted(() => {
  if (selectedTab.value === 'Semesters') {
    retrieveSemesters();
  } else if (selectedTab.value === 'Categories') {
    retrieveAccommodationCategories();
  } else if (selectedTab.value === 'Accommodations') {
    retrieveAccommodations();
  }
});

</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-toolbar>
            <v-toolbar-title>Management Dashboard</v-toolbar-title>
          </v-toolbar>
          <v-tabs v-model="selectedTab" background-color="primary" dark>
            <v-tab value="Semesters">Semesters</v-tab>
            <v-tab value="Categories">Accommodation Categories</v-tab>
            <v-tab value="Accommodations">Accommodations</v-tab>
          </v-tabs>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-fade-transition mode="out-in">
            
            <!-- Semesters Section -->
            <div v-if="selectedTab === 'Semesters'">
            <v-card>
                <v-card-title>
                Semesters
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="showAddSemesterDialog = true">
                    Add New Semester
                </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-data-table
                        :items="semesters"
                        :options.sync="semesterPagination"
                        @update:options="retrieveSemesters"
                        class="elevation-1"
                        >
                        <template v-slot:item.actions="{ item }">
                            <v-btn icon @click="editSemester(item)">
                            <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon @click="deleteSemester(item.id)">
                            <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
            </div>

            <!-- Categories Section -->
            <div v-if="selectedTab === 'Categories'">
            <v-card>
                <v-card-title>
                Accommodation Categories
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="showAddCategoryDialog = true">
                    Add New Category
                </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-data-table
                        :items="accommodationCategories"
                        :options.sync="categoryPagination"
                        @update:options="retrieveAccommodationCategories"
                        class="elevation-1"
                        >
                        <template v-slot:item.actions="{ item }">
                            <v-btn icon @click="editCategory(item)">
                            <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon @click="deleteCategory(item.id)">
                            <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
            </div>

            <!-- Accommodations Section -->
            <div v-if="selectedTab === 'Accommodations'">
                <v-card>
                    <v-card-title>
                    Accommodations
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="showAddAccommodationDialog = true">
                        Add New Accommodation
                    </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                            :items="accommodations"
                            :options.sync="accommodationPagination"
                            @update:options="retrieveAccommodations"
                            class="elevation-1"
                        >
                            <template v-slot:item.actions="{ item }">
                            <v-btn icon @click="editAccommodation(item)">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon @click="deleteAccommodation(item.id)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </div>


          </v-fade-transition>
        </v-col>
      </v-row>
    </v-container>

  
    <!-- Add/Edit Semester Dialog -->
    <v-dialog v-model="showAddSemesterDialog" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ newSemester.id ? 'Edit' : 'Add' }} Semester</span>
            </v-card-title>
            <v-card-text>
            <v-container>
                <v-row>
                <v-col cols="12">
                    <v-text-field
                    label="Semester Title"
                    v-model="newSemester.title"
                    :rules="[rules.required]"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                    label="Start Date"
                    v-model="newSemester.startDate"
                    type="date"
                    :rules="[rules.required]"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                    label="End Date"
                    v-model="newSemester.endDate"
                    type="date"
                    :rules="[rules.required]"
                    required
                    ></v-text-field>
                </v-col>
                </v-row>
            </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeSemesterDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" @click="addSemester" :disabled="!validSemester">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>


  
      <!-- Add/Edit Category Dialog -->
      <v-dialog v-model="showAddCategoryDialog" max-width="600px">
        <v-card>
            <v-card-title>
            Add New Category
            </v-card-title>
            <v-card-text>
            <v-form ref="formCategory" v-model="validCategory">
                <v-text-field
                label="Category Name"
                v-model="newCategory.categoryName"
                :rules="[rules.required]"
                required
                ></v-text-field>
                <v-text-field
                label="Description"
                v-model="newCategory.desc"
                :rules="[rules.required]"
                required
                ></v-text-field>
            </v-form>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="showAddCategoryDialog = false">Cancel</v-btn>
            <v-btn color="primary" :disabled="!validCategory" @click="addCategory">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

  
    </div>
  </template>
  