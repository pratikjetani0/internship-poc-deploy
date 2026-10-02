export type ToastType = "success" | "error" | "info" | "warning";

export class Toast {
  private container: HTMLElement;

  constructor() {
    const existing = document.getElementById("toastContainer");

    if (existing) {
      this.container = existing;
    } else {
      this.container = document.createElement("div");
      this.container.id = "toastContainer";
      this.container.className =
        "fixed top-5 right-5 flex flex-col gap-3 z-[9999]";
      document.body.appendChild(this.container);
    }
  }

  show(message: string, type: ToastType = "info", duration: number = 3000) {
    const toast = document.createElement("div");
    const progress = document.createElement("div");

    const styles = {
      success: {
        bg: "bg-emerald-500/95",
        progress: "bg-emerald-200",
      },
      error: {
        bg: "bg-red-500/95",
        progress: "bg-red-200",
      },
      info: {
        bg: "bg-blue-500/95",
        progress: "bg-blue-200",
      },
      warning: {
        bg: "bg-amber-500/95",
        progress: "bg-amber-200",
      },
    };

    toast.className = `
      ${styles[type].bg}
      text-white
      min-w-[280px]
      max-w-sm
      px-4 py-3
      rounded-xl
      shadow-2xl
      backdrop-blur-md
      overflow-hidden
      relative
      animate-toastIn
      flex items-center
      text-sm font-medium
    `;

    toast.innerText = message;

    progress.className = `
      absolute bottom-0 left-0 h-1
      ${styles[type].progress}
      animate-toastProgress
    `;

    progress.style.animationDuration = `${duration}ms`;

    toast.appendChild(progress);
    this.container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("animate-toastIn");
      toast.classList.add("animate-toastOut");

      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  }
}
