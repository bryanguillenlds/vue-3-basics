<template>
  <dialog
    class="modal"
    :open="open"
  >
    <div class="modal-box">
      <div class="">
        <slot name="header" />
      </div>
      <div class="">
        <slot name="body" />
      </div>
      <div class="">
        <slot name="actions" />
      </div>
    </div>
  </dialog>

  <div
    v-if="open"
    class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-50 w-screen h-screen"
  ></div>
</template>

<script setup lang="ts">
interface Props {
  open: boolean;
}

withDefaults(defineProps<Props>(), {
  open: false
});
</script>

<style scoped></style>
