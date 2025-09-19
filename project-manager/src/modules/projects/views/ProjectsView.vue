<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <th>#Project</th>
        <th>Project Name</th>
        <th>#Tasks</th>
        <th>Progress</th>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr
          v-for="(project, index) in projectsStore.projectListWithProgress"
          :key="project.id"
          class="hover:bg-base-300"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ project.name }}</td>
          <td>{{ project.tasks.length }}</td>
          <td>
            <progress
              class="progress progress-secondary w-56"
              :value="project.progress"
              max="100"
            ></progress>
          </td>
        </tr>
      </tbody>
    </table>

    <FabButton
      position="bottom-right"
      @click="toggleModal"
    >
      <AddIcon />
    </FabButton>

    <FabButton
      position="bottom-left"
      @click="toggleCustomModal"
    >
      <InfoIcon />
    </FabButton>

    <InputModal
      :isModalOpen="isModalOpen"
      placeholder="Add a name"
      title="Add Project"
      sub-title="Give a unique name to your project"
      @saveProject="onSaveProject"
      @toggleModal="toggleModal"
    />

    <CustomModal :open="isCustomModalOpen">
      <template #header>
        <h3 class="text-lg text-center font-bold mb-4">Info Modal</h3>
      </template>
      <template #body>
        <p class="text-sm text-center text-gray-400 mb-4">
          This is a custom modal
        </p>
      </template>
      <template #actions>
        <div class="flex justify-end">
          <button
            class="btn btn-secondary"
            @click="toggleCustomModal"
          >
            Close
          </button>
        </div>
      </template>
    </CustomModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FabButton from '@/modules/common/FabButton.vue';
import AddIcon from '@/modules/common/icons/AddIcon.vue';
import InfoIcon from '@/modules/common/icons/InfoIcon.vue';
import InputModal from '@/modules/projects/components/InputModal.vue';
import CustomModal from '@/modules/common/components/CustomModal.vue';
import { useProjectsStore } from '@/modules/projects/store/projects.store';

const isModalOpen = ref(false);
const isCustomModalOpen = ref(false);

const projectsStore = useProjectsStore();

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const toggleCustomModal = () => {
  isCustomModalOpen.value = !isCustomModalOpen.value;
};

const onSaveProject = (projectName: string) => {
  projectsStore.addProject(projectName);
};
</script>

<style scoped></style>
