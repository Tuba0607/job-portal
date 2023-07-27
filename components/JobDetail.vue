<template>
  <div class="p-4 border rounded-lg shadow-md">
    <h1 class="text-lg font-bold">{{ store.jobDetail.positionName }}</h1>

    <h2 class="text-base">{{ store.jobDetail.companyName }}</h2>
    <p class="text-base">{{ store.jobDetail.location }}</p>
    <p class="text-base text-[#878787]">{{ store.jobDetail.salary }}</p>
    <p class="text-sm my-1">{{ store.jobDetail.description }}</p>
    <h3>Requirements:</h3>
    <p class="text-sm">{{ store.jobDetail.requirements }}</p>
  </div>
</template>

<script setup>
import { useJobStore } from "@/stores/jobStore";
import { ref, computed, onMounted } from "vue";

const store = useJobStore();
const router = useRoute();

const jobDetail = ref([]);

const jobId = computed(() => router.params);

onMounted(async () => {
  try {
    jobDetail.value = await store.getJobDetail(jobId.value.id);
  } catch (error) {
    console.error("Error fetching job detail:", error);
  }
});
</script>
