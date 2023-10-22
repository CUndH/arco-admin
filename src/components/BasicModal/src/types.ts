import { ComputedRef } from "vue";

export interface ModalProps {
  visible: boolean;
}

export interface ModalMethods {
  setModalProps: (props: Partial<ModalProps>) => void;
}


export type RegisterFn = (modalMethods: ModalMethods, uuid: string) => void;

export interface ReturnMethods extends ModalMethods {
  openModal: <T = any>(props?: boolean, data?: T) => void;
  closeModal: () => void;
  getVisible?: ComputedRef<boolean>;
}

export type UseModalReturnType = [RegisterFn, ReturnMethods];

export interface ReturnInnerMethods extends ModalMethods {
  closeModal: () => void;
}

export type UseModalInnerReturnType = [RegisterFn, ReturnInnerMethods];
