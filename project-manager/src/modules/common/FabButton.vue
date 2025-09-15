<template>
  <button
    class="btn btn-circle btn-secondary fixed"
    :class="position"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
  interface Props {
    position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  }

  withDefaults(defineProps<Props>(), {
    position: 'bottom-right'
  });

  defineEmits<{
    click: [];
  }>();
</script>

<style scoped>
  @import 'tailwindcss';

  .top-right {
    @apply top-10 right-10;
  }

  .bottom-right {
    @apply bottom-10 right-10;
  }

  .top-left {
    @apply top-10 left-10;
  }

  .bottom-left {
    @apply bottom-10 left-10;
  }
</style>
