import { getCurrentInstance, nextTick, reactive, ref, toRaw, unref, watchEffect } from "vue";
import { isFunction } from "@/utils/is";
import { ModalMethods, ModalProps, ReturnInnerMethods, ReturnMethods, UseModalInnerReturnType, UseModalReturnType } from "../types";

const dataTransfer = reactive<any>({});

export function useModal(): UseModalReturnType {
  const modal = ref<Nullable<ModalMethods>>(null);
  const uid = ref('')

  function register(modalMethod: ModalMethods, uuid: string) {
    modal.value = modalMethod;
    uid.value = uuid
  }

  const getInstance = () => {
    const instance = unref(modal);
    return instance;
  };

  const methods: ReturnMethods = {
    setModalProps: (props: Partial<ModalProps>): void => {
      getInstance()?.setModalProps(props);
    },

    openModal: <T = any>(visible = true, data?: T): void => {
      getInstance()?.setModalProps({
        visible,
      });

      if (!data) return;
      const id = unref(uid)
      dataTransfer[id] = null
      dataTransfer[id] = toRaw(data)
    },

    closeModal: () => {
      getInstance()?.setModalProps({ visible: false });
    },
  };
  return [register, methods];
}

export const useModalInner = (callbackFn?: (params?: any) => void): UseModalInnerReturnType => {
  const modalInstanceRef = ref<Nullable<ModalMethods>>(null);
  const currentInstance = getCurrentInstance();
  const uidRef = ref('')

  const getInstance = () => {
    const instance = unref(modalInstanceRef);
    return instance;
  };

  const register = (modalInstance: ModalMethods, uuid: string) => {
    modalInstanceRef.value = modalInstance;
    currentInstance?.emit('register', modalInstance, uuid);
    uidRef.value = uuid
  };

  watchEffect(() => {
    const data = dataTransfer[unref(uidRef)];
    if (!data) return
    if (!callbackFn || !isFunction(callbackFn)) return
    nextTick(() => {
      callbackFn(data);
    });
  })

  const methods: ReturnInnerMethods = {
    closeModal: () => {
      getInstance()?.setModalProps({ visible: false });
    },

    setModalProps: (props: Partial<ModalProps>) => {
      getInstance()?.setModalProps(props);
    },
  }

  return [
    register,
    methods,
  ];
};