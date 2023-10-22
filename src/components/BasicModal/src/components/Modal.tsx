import { defineComponent, unref } from 'vue';
import { extendSlots } from '@/utils/tsxHelper';
import { useAttrs } from '@/hooks/useAttrs';

export default defineComponent({
  name: 'Modal',
  inheritAttrs: false,
  emits: ['cancel'],
  setup(props, { slots, emit }) {
    const attrs = useAttrs();
    const onCancel = (e: Event) => {
      emit('cancel', e);
    };

    return () => {
      const propsData = { ...unref(attrs), ...props, onCancel } as Recordable;
      return <a-modal {...propsData}>{extendSlots(slots)}</a-modal>;
    };
  },
});
