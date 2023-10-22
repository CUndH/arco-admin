<script setup lang="ts">
import { BasicModal, useModalInner } from '@/components/BasicModal';

const [register] = useModalInner((data: any) => {
  console.log(data, 'asd');
});
</script>

<template>
  <BasicModal @register="register"></BasicModal>
</template>
