<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import Pagination from "./Pagination.vue";
import ShorturlService from "../services/shorturl.service";
import UserService from "../services/user.service";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/AuthStore";

const isModalOpen = ref(false);
const currentPage = ref(1);
const perPage = ref(10);
const totalPages = ref(0);
const data = ref([]);
const pagedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return data.value.slice(start, start + perPage.value);
});

totalPages.value = Math.ceil(data.value.length / perPage.value);

function getlistData() {
  ShorturlService.getShortUrls().then((response) => {
    data.value = response.data.shortUrls;
  });
}
const original_url = ref("");
const router = useRouter();
async function submit() {
  if (original_url.value == "") return;
  const urlCount = pagedData.value?.length;
  if (urlCount >= urlLimit.value) {
    router.push({ name: "package" });
  } else {
    ShorturlService.createShortUrl(original_url.value)
      .then(async () => {
        await getlistData();
        original_url.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function update(row) {
  row.editing = false;
  ShorturlService.updateShortUrl(row.id, row.original_url, row.status)
    .then(async () => {
      await getlistData();
    })
    .catch((error) => {
      console.log(error);
    });
}

function urlStatusChange(status, row) {
  console.log("status", status, row);
  row.status = status;
  update(row);
}

const urlLimit = ref("");
const authStore = useAuthStore();
function saveUserPlan() {
  UserService.updateUserPlan(authStore.currentUser.id, urlLimit.value)
    .then(async () => {
      isModalOpen.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(async () => {
  await getlistData();
  UserService.getUserPlan(authStore.currentUser.id).then((response) => {
    urlLimit.value = response.data.user.url_limit;
  });
});
</script>
<template>
  <div class="modal-vue">
    <div class="mx-auto w-2/4 m-4 flex">
      <label
        for="url"
        class="block text-gray-700 font-bold mb-2 inline-block mt-6 mr-2"
        >URL:</label
      >
      <input
        id="url"
        v-model="original_url"
        type="text"
        class="border rounded p-2 w-full inline-block"
      />
      <button
        @click="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded-full mt-4 inline-block mb-3 ml-2"
      >
        Submit
      </button>
      <button
        @click="isModalOpen = true"
        class="px-4 py-2 bg-blue-500 text-white rounded-full mt-4 ml-2 mb-3"
      >
        Upgrade Plan
      </button>
    </div>
    <!-- overlay -->
    <div class="overlay" v-if="isModalOpen" @click="isModalOpen = false"></div>
    <div class="modal" v-if="isModalOpen">
      <button class="close" @click="isModalOpen = false">x</button>
      <div class="mx-auto w-full m-4 flex">
        <label
          for="url"
          class="block text-gray-700 font-bold mb-2 inline-block mt-6 mr-2"
          >Package:</label
        >
        <select
          v-model="urlLimit"
          class="border rounded p-2 w-full inline-block mr-2"
        >
          <option value="10">10 URLs</option>
          <option value="1000">1000 URLs</option>
        </select>
        <button
          @click="saveUserPlan"
          class="px-4 py-2 bg-blue-500 text-white rounded-full mt-4 inline-block mb-3 ml-2"
        >
          Submit
        </button>
      </div>
    </div>
    <table class="table-auto w-full">
      <thead>
        <tr class="bg-gray-400">
          <th class="px-4 py-2">ID</th>
          <th class="px-4 py-2">Original Url</th>
          <th class="px-4 py-2">Short Url</th>
          <th class="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in pagedData" class="text-gray-700" :key="row.id">
          <td class="border px-4 py-2">
            <template v-if="!row.editing">
              {{ row.id }}
            </template>
            <template v-else>
              <input v-model="row.id" class="border p-2" disabled />
            </template>
          </td>
          <td class="border px-4 py-2">
            <template v-if="!row.editing">
              {{ row.original_url }}
            </template>
            <template v-else>
              <input
                v-model="row.original_url"
                class="border p-2"
                :disabled="row.status == 'in_active'"
              />
            </template>
          </td>
          <td class="border px-4 py-2">
            <template v-if="!row.editing">
              {{ row.short_url }}
            </template>
            <template v-else>
              <input v-model="row.short_url" class="border p-2" disabled />
            </template>
          </td>
          <td class="border px-4 py-2">
            <template v-if="!row.editing">
              <button
                @click="row.editing = true"
                class="px-2 py-1 bg-blue-500 text-white rounded-full"
              >
                Edit
              </button>
            </template>
            <template v-else>
              <button
                @click="update(row)"
                class="px-2 py-1 bg-green-500 text-white rounded-full"
              >
                Save
              </button>
            </template>
            <template v-if="!row.editing">
              <button
                @click="urlStatusChange('in_active', row)"
                class="px-2 py-1 bg-red-500 text-white rounded-full ml-2"
                v-if="row.status == 'active'"
              >
                De-activate
              </button>
              <button
                @click="urlStatusChange('active', row)"
                class="px-2 py-1 bg-green-500 text-white rounded-full ml-2"
                v-else
              >
                Activate
              </button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination v-model="currentPage" :total-pages="totalPages" />
  </div>
</template>

<style>
.modal-vue .overlay {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-vue .modal {
  position: relative;
  width: 650px;
  z-index: 9999;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
}

.modal-vue .close {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
