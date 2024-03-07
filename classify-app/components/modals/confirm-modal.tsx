"use client";

import { Check } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ConfirmModalProps {
  children: React.ReactNode;
  disabled?: boolean;
  header: string;
  description?: string;
  onConfirm: () => void;
}

export const ConfirmModal = ({
  children,
  disabled,
  header,
  description,
  onConfirm,
}: ConfirmModalProps) => {
  const handleConfirm = () => {
    onConfirm();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-start">
            <div className="rounded-full bg-emerald-200 p-1 mr-2">
              <Check className="h-5 w-5 stroke-neutral-700" />
            </div>
            {header}
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={disabled}
            onClick={handleConfirm}
            asChild>
            <Button variant="primary" className="bg-blue-500 hover:bg-blue-400">
              Confirm
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
