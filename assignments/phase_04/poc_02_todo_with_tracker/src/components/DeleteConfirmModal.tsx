import TaskModal from "./TaskModal";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) => {
  return (
    <TaskModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Delete Task
          </h2>

          <p className="text-sm text-slate-500 dark:text-white/50 mt-2">
            Are you sure you want to delete this task?
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-white/20 text-slate-700 dark:text-white/70 hover:border-slate-400 dark:hover:border-white/40 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </TaskModal>
  );
};

export default DeleteConfirmModal;
