"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import QrCheckClient from "@/components/user/qr-check/QrCheckClient";
import { useModalHistoryBack } from "@/hooks/useModalHistoryBack";

type QrCheckModalProps = {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  onMissionComplete?: () => void;
};

const QrCheckModal = ({
  isOpen,
  onClose,
  eventId,
  onMissionComplete,
}: QrCheckModalProps) => {
  useModalHistoryBack(isOpen, onClose);

  const handleMissionComplete = () => {
    onMissionComplete?.();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="p-0 overflow-hidden max-w-sm w-full h-[85vh] rounded-2xl border-0"
      >
        <DialogTitle className="sr-only">QR 코드 스캔</DialogTitle>
        <DialogDescription className="sr-only">
          미션 QR 코드를 스캔하여 미션을 완료하세요.
        </DialogDescription>
        <QrCheckClient
          eventId={eventId}
          onBack={onClose}
          onMissionComplete={handleMissionComplete}
        />
      </DialogContent>
    </Dialog>
  );
};

export default QrCheckModal;
