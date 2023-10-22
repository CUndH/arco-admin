<script lang="ts" setup>
import { getCurrentInstance, ref, watch } from 'vue';
import { omit } from 'lodash-es';
import Modal from './components/Modal';
import { ModalProps } from './types';

const emits = defineEmits(['register', 'update:visible', 'ok', 'cancel']);

const visibleRef = ref(false);

watch(
  () => visibleRef.value,
  () => {
    emits('update:visible');
  },
);

/**
 * @description: 设置modal参数
 */
function setModalProps(modalProps: Partial<ModalProps>): void {
  if (Reflect.has(modalProps, 'visible')) {
    visibleRef.value = !!modalProps.visible;
  }
}

const modalMethods = {
  setModalProps,
};

const instance = getCurrentInstance();
if (instance) {
  emits('register', modalMethods, instance.uid);
}
</script>

<template>
  <Modal v-bind="$attrs" v-model:visible="visibleRef">
    <slot></slot>

    <template v-for="item in Object.keys(omit($slots, 'default'))" #[item]="data">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Modal>
</template>
