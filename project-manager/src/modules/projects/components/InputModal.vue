<template>
  <dialog
    id="my_modal_1"
    class="modal"
    :open="isModalOpen"
  >
    <div class="modal-box">
      <h3 class="text-lg font-bold flex justify-center">Add Project</h3>
      <p class="text-sm text-center text-gray-400">
        Be sure to fill out all fields
      </p>
      <div class="modal-action flex flex-col gap-2">
        <form @submit.prevent="submitForm">
          <input
            class="input input-bordered input-primary w-full flex-1 mb-2"
            type="text"
            placeholder="Project Name"
            v-model="inputValue"
          />

          <div class="flex justify-end gap-2">
            <button
              class="btn btn-secondary mt-4"
              @click="emit('toggleModal')"
            >
              Close
            </button>
            <button
              class="btn btn-primary mt-4"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </dialog>

  <div
    v-if="isModalOpen"
    class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-50 w-screen h-screen"
  ></div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  interface Props {
    isModalOpen: boolean;
  }

  const inputValue = ref('');

  withDefaults(defineProps<Props>(), {
    isModalOpen: false
  });

  const emit = defineEmits<{
    toggleModal: [void];
    saveProject: [text: string];
  }>();

  const submitForm = () => {
    console.log('submitForm');
    if (!inputValue.value.trim()) {
      //focus element
      return;
    }

    emit('saveProject', inputValue.value.trim());
    emit('toggleModal');

    inputValue.value = '';
  };
</script>

<style scoped></style>
