<script setup lang="ts">
type OptionsItemType = { label: string; value: number | string }
defineProps<{
  options: OptionsItemType[]
  modelValue?: number | string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', v: string | number): void
}>()
const SelectItem = (item: OptionsItemType) => {
  emits('update:modelValue', item.value)
}
</script>

<template>
  <div class="cp-radio-btn">
    <a
      class="item"
      href="javascript:;"
      v-for="item in options"
      :key="item.value"
      @click="SelectItem(item)"
      :class="modelValue === item.value ? 'active' : ''"
      >{{ item.label }}</a
    >
  </div>
</template>

<style lang="scss" scoped>
.cp-radio-btn {
  display: flex;
  flex-wrap: wrap;

  .item {
    height: 32px;
    min-width: 60px;
    line-height: 30px;
    padding: 0 14px;
    text-align: center;
    border: 1px solid var(--cp-bg);
    background-color: var(--cp-bg);
    margin-right: 10px;
    box-sizing: border-box;
    color: var(--cp-text2);
    margin-bottom: 10px;
    border-radius: 4px;
    transition: all 0.3s;

    &.active {
      border-color: var(--cp-primary);
      background-color: var(--cp-plain);
    }
  }
}
</style>
