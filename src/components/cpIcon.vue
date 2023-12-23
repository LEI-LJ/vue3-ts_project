<template>
  <div>
    <svg aria-hidden="true" class="icon">
      <use :href="`#icon-${name}`" />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
}
</style>
