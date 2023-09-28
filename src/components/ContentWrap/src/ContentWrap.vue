<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps({
  // 是否展示标题
  showTitle: {
    type: Boolean,
    default: true,
  },
  title: String,
});

const title = computed(() => props.title || route.meta.title);

const slots = useSlots();
</script>

<template>
  <div class="rounded-4px flex h-full flex-col overflow-hidden">
    <div
      v-if="showTitle"
      class="px-12px h-40px leading-40px rounded-5px mx-0 box-border flex items-center justify-between"
    >
      <div v-if="slots.title">
        <slot name="title" />
      </div>
      <div v-else class="text-[22px] font-bold tracking-normal">
        <div>
          {{ title }}
        </div>
      </div>
    </div>
    <div class="h-100% flex flex-1 flex-col overflow-y-auto">
      <slot name="content" />
    </div>
  </div>
</template>
