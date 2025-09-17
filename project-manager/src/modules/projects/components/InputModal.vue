<template>
  <dialog
    id="my_modal_1"
    class="modal"
    :open="isModalOpen"
  >
    <div class="modal-box">
      <h3 class="text-lg font-bold flex justify-center">{{ title }}</h3>
      <p
        v-if="subTitle"
        class="text-sm text-center text-gray-400"
      >
        {{ subTitle }}
      </p>
      <div class="modal-action flex flex-col gap-2">
        <form @submit.prevent="submitForm">
          <input
            ref="inputRef"
            class="input input-bordered input-primary w-full flex-1 mb-2"
            type="text"
            :placeholder="placeholder ?? 'Add a name for your project'"
            v-model="inputValue"
          />

          <div class="flex justify-end gap-2">
            <button
              class="btn btn-secondary mt-4"
              @click="closeModal"
              type="button"
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
import { ref, watch } from 'vue';

interface Props {
  isModalOpen: boolean;
  placeholder: string;
  title: string;
  subTitle: string;
}

const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const props = withDefaults(defineProps<Props>(), {
  isModalOpen: false,
  placeholder: 'Add a name for your project',
  title: 'Add Project',
  subTitle: 'Be sure to fill out all fields'
});

// Watch for modal opening and focus the input
watch(
  () => props.isModalOpen, //ismodal open is boolean primitve, Vue CANNOT watch it, so we create a getter to watch it
  (isModalOpen) => {
    if (isModalOpen) {
      // Add a small delay to ensure dialog is fully rendered
      setTimeout(() => {
        inputRef.value?.focus();
      }, 100);
    }
  }
);

const emit = defineEmits<{
  toggleModal: [void];
  saveProject: [text: string];
}>();

const submitForm = () => {
  console.log('submitForm');
  if (!inputValue.value.trim()) {
    //focus element
    if (inputRef.value) {
      inputRef.value.focus();
    }
    return;
  }

  emit('saveProject', inputValue.value.trim());
  emit('toggleModal');

  inputValue.value = '';
};

const closeModal = () => {
  inputValue.value = '';
  emit('toggleModal');
};
</script>

<style scoped></style>
