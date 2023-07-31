<template>
  <div>
    <Search @filter="applyFilter" class="mx-5" />
    <div v-if="hasFilteredJobs">
      <div v-for="job in filteredJobList" :key="job.id">
        <div class="grid grid-cols-1 gap-4 mt-8 mx-5">
          <JobCart :job="job" />
        </div>
      </div>
    </div>

    <div
      class="p-4 border rounded-lg shadow-md mx-auto my-5 text-center"
      v-else
    >
      No jobs found.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useJobStore } from "@/stores/jobStore";

const store = useJobStore();
const filteredJobList = ref([]);

onMounted(async () => {
  await fetchJobListings();
});

const fetchJobListings = async () => {
  try {
    filteredJobList.value = await store.getJobs();
  } catch (error) {
    console.error("Error fetching job listings:", error);
  }
};

const applyFilter = async ({ location, keyword }) => {
  try {
    filteredJobList.value = await store.filterJobListings(location, keyword);
  } catch (error) {
    console.error("Error filtering job listings:", error);
  }
};

const hasFilteredJobs = computed(() => filteredJobList.value.length > 0);
</script>
