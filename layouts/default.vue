<template>
  <div>
    <header
      class="text-center bg-secondary py-5 flex justify-evenly align-middle"
    >
      <NuxtLink to="/">
        <h1 class="m- text-3xl font-light pt-5 ml-3 text-primary">
          Job Portal
        </h1>
      </NuxtLink>

      <ul class="flex gap-2 items-end text-lg">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/joblist">Job List</NuxtLink></li>
      </ul>
    </header>

    <div class="wrapper">
      <slot />
    </div>
  </div>
</template>

<script setup></script>
<style scoped>
.router-link-exact-active {
  color: #b042b4;
}
</style>
