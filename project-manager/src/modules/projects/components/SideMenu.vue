<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <h2 class="text-lg font-bold mx-4 mt-4">Projects</h2>
    <p class="text-sm text-gray-500 mx-4 mt-2">No projects yet</p>

    <ul class="menu bg-base-200 rounded-box w-56">
      <li><a>Item 1</a></li>
      <li>
        <details open>
          <summary>Parent</summary>
          <ul>
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
            <li>
              <details open>
                <summary>Parent</summary>
                <ul>
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </details>
      </li>
      <li><a>Item 3</a></li>
    </ul>
  </aside>
</template>

<script setup lang="ts"></script>

<style scoped></style>
