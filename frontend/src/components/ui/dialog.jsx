"use client";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { forwardRef } from "react";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

const DialogPortal = ({ children }) => (
  <DialogPrimitive.Portal>{children}</DialogPrimitive.Portal>
);

const DialogOverlay = forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm ${className ?? ""}`}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={`fixed left-[50%] top-[50%] z-50 w-[95vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-[#0b0b0b] ${className ?? ""}`}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-100">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...props }) => (
  <div className={`flex flex-col gap-2 text-center sm:text-left ${className ?? ""}`} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }) => (
  <div className={`flex flex-col-reverse gap-3 sm:flex-row sm:justify-end ${className ?? ""}`} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={`text-lg font-semibold text-slate-950 dark:text-white ${className ?? ""}`} {...props} />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={`text-sm text-zinc-500 dark:text-zinc-400 ${className ?? ""}`} {...props} />
));
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
