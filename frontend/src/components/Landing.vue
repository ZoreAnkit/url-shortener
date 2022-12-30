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
  if (urlCount >= urlLimit) {
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
  ShorturlService.updateShortUrl(row.id, row.original_url)
    .then(async () => {
      await getlistData();
    })
    .catch((error) => {
      console.log(error);
    });
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
  <div>
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
    </div>

    <div>
      <button
        @click="isModalOpen = true"
        class="px-4 py-2 bg-blue-500 text-white rounded-full mt-4"
      >
        Open Modal
      </button>
      <div v-if="isModalOpen" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="mx-auto w-2/4 m-4 flex">
            <label
              for="url"
              class="block text-gray-700 font-bold mb-2 inline-block mt-6 mr-2"
              >Select Plan:</label
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
        <button
          @click="isModalOpen = false"
          class="modal-close is-large"
          aria-label="close"
        ></button>
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
              <input v-model="row.original_url" class="border p-2" />
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
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination v-model="currentPage" :total-pages="totalPages" />
  </div>
</template>
