<template>
  <div class="max-w-xl my-0 mx-auto grid grid-cols-3 gap-2">
    <input
      class="border-2 p-3 rounded-md text-[#555] text-base"
      v-model="keyword"
      placeholder="Keyword"
    />
    <input
      class="border-2 p-3 rounded-md text-[#555] text-base"
      v-model="location"
      placeholder="Location"
    />

    <button
      class="bg-primary border-0 cursor-pointer rounded-md p-3 text-base text-white"
      @click="$emit('filter', { keyword, location })"
    >
      Search
    </button>
  </div>
</template>

<script setup></script>
