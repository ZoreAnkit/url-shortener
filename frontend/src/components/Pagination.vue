<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "pagination",
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const currentPage = ref(1);

    function updateCurrentPage(page) {
      currentPage.value = page;
      emit("update:current-page", page);
    }

    return {
      currentPage,
      updateCurrentPage,
    };
  },
});
</script>
<template>
  <nav class="flex items-center justify-between p-4">
    <button
      v-if="currentPage > 1"
      @click="currentPage--"
      class="px-4 py-2 bg-blue-500 text-white rounded-full"
    >
      Previous
    </button>
    <div class="text-gray-700 font-bold">
      Page {{ currentPage }} of {{ totalPages }}
    </div>
    <button
      v-if="currentPage < totalPages"
      @click="currentPage++"
      class="px-4 py-2 bg-blue-500 text-white rounded-full"
    >
      Next
    </button>
  </nav>
</template>
