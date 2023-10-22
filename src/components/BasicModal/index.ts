import { withInstall } from '@/utils';
import basicModal from './src/BasicModal.vue';

export const BasicModal = withInstall(basicModal);
export { useModal, useModalInner } from './src/hooks/useModal';
