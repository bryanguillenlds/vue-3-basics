<template>
  <div class="flex flex-col">
    <!-- Top Menu -->
    <TopMenu />
    <main class="flex flex-row">
      <!-- Side Menu -->
      <SideMenu />
      <!-- Router View -->
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import TopMenu from '@/modules/common/components/TopMenu.vue';
import SideMenu from '@/modules/projects/components/SideMenu.vue';
</script>

<style scoped></style>
