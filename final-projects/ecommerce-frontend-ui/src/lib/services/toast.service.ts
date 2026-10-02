import { toast } from "sonner";
import type { ReactElement, ReactNode } from "react";
import type { ExternalToast, ToastT, ToastToDismiss } from "sonner";

type ToastMessage = ReactNode;
type ToastId = string | number;

type LoadingToastOptions = ExternalToast & {
  description?: ReactNode;
};

type PromiseToastMessages<T> = {
  loading: ToastMessage;
  success: ToastMessage | ((data: T) => ToastMessage);
  error: ToastMessage | ((error: unknown) => ToastMessage);
};

type ToastPromiseHandle<T> =
  | (ToastId & { unwrap: () => Promise<T> })
  | {
      unwrap: () => Promise<T>;
    };

export const toastService = {
  success(message: ToastMessage, options?: ExternalToast): ToastId {
    return toast.success(message, options);
  },

  error(message: ToastMessage, options?: ExternalToast): ToastId {
    return toast.error(message, options);
  },

  info(message: ToastMessage, options?: ExternalToast): ToastId {
    return toast.info(message, options);
  },

  warning(message: ToastMessage, options?: ExternalToast): ToastId {
    return toast.warning(message, options);
  },

  loading(message: ToastMessage, options?: LoadingToastOptions): ToastId {
    return toast.loading(message, options);
  },

  message(message: ToastMessage, options?: ExternalToast): ToastId {
    return toast.message(message, options);
  },

  custom(
    render: (id: ToastId) => ReactElement,
    options?: ExternalToast,
  ): ToastId {
    return toast.custom(render, options);
  },

  promise<T>(
    promise: Promise<T> | (() => Promise<T>),
    messages: PromiseToastMessages<T>,
    options?: ExternalToast,
  ): ToastPromiseHandle<T> {
    return toast.promise(promise, {
      ...options,
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    });
  },

  dismiss(id?: ToastId): void {
    toast.dismiss(id);
  },

  dismissAll(): void {
    toast.dismiss();
  },

  getHistory(): Array<ToastT | ToastToDismiss> {
    return toast.getToasts();
  },
};

export type { ToastId, ToastMessage };
