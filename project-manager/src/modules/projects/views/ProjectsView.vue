<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr></tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr class="hover:bg-base-300">
          <th>2</th>
          <td>Hart Hagerty</td>
          <td>Desktop Support Technician</td>
          <td>Purple</td>
        </tr>
      </tbody>
    </table>

    <FabButton
      position="bottom-right"
      @click="toggleModal"
    >
      <AddIcon />
    </FabButton>

    <InputModal
      :isModalOpen="isModalOpen"
      @toggleModal="toggleModal"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import FabButton from '@/modules/common/FabButton.vue';
  import AddIcon from '@/modules/common/icons/AddIcon.vue';
  import InputModal from '@/modules/projects/components/InputModal.vue';

  const isModalOpen = ref(false);

  const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
  };
</script>

<style scoped></style>
