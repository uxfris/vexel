"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
  useRef,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import useBodyLock from "@/lib/hooks/useBodyLock";
import useEscapeModal from "@/lib/hooks/useCloseModal";
import { useClickOutside } from "@/lib/hooks/useClickOutside";

interface ModalOptions {
  className?: string;
  backdropClass?: string;
  lockBody?: boolean;
  clickOutsideToClose?: boolean;
  escapeToClose?: boolean;
}

interface ModalState extends ModalOptions {
  content: ReactNode;
}

interface ModalContextType {
  openModal: (content: ReactNode, options?: ModalOptions) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback(
    (content: ReactNode, options: ModalOptions = {}) => {
      setModal({ content, ...options });
    },
    []
  );

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  const open = !!modal?.content;

  // Hooks
  if (modal?.lockBody !== false) useBodyLock(open);
  if (modal?.escapeToClose !== false) useEscapeModal(open, closeModal);
  if (modal?.clickOutsideToClose !== false)
    useClickOutside(modalRef, closeModal, open);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            className={cn(
              "fixed inset-0 z-100 flex items-center justify-center bg-black/60",
              modal?.backdropClass
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className={cn(
                "w-full bg-white shadow-xl overflow-hidden max-w-lg rounded-2xl md:rounded-2xl",
                modal?.className
              )}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {modal.content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within a ModalProvider");
  return ctx;
}
