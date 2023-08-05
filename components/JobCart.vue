<template>
  <div
    class="p-4 border rounded-lg shadow-md cursor-pointer hover:bg-slate-100"
    @click="$router.push(`/jobdetail/${job?.id}`)"
  >
    <div class="flex">
      <img
        :src="job.imageUrl"
        alt="Job Image"
        class="w-16 h-16 object-contain rounded-md flex-shrink-0 mb-4"
      />
      <div class="ml-2 mr-3 flex-grow">
        <h3 class="text-lg font-semibold text-gray-800">
          {{ job.positionName }}
        </h3>
        <p
          class="text-base text-gray-600 overflow-hidden text-ellipsis break-words"
        >
          {{ job.companyName }}
        </p>
        <p class="text-sm text-[#878787]">
          {{ job.location }}
        </p>
      </div>
    </div>
    <span class="flex justify-end text-sm text-[#878787]">{{
      job.durationDay > 0
        ? job.durationDay + " " + job.durationDayText
        : job.durationDayText
    }}</span>
  </div>
</template>

<script setup>
const { job } = defineProps(["job"]);
</script>

<style lang="scss" scoped></style>
