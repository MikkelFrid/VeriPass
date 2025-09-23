import { Button } from '@/components/ui/button';
import { useTranslation } from 'next-i18next';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ModalProps {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
}

interface BodyProps {
  children: React.ReactNode;
  className?: string;
}

const Modal = ({ open, close, children }: ModalProps) => {
  useTranslation('common'); // keep namespace loaded (no text here)

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) close(); }}>
      <DialogContent className="dark:border dark:border-gray-100">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 rounded-full"
          onClick={close}
          aria-label="Close"
        >
          ×
        </Button>
        {children}
      </DialogContent>
    </Dialog>
  );
};

const Header = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="font-bold text-lg">{children}</h3>;
};

const Description = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-sm text-gray-700 pt-1">{children}</p>;
};

const Body = ({ children, className }: BodyProps) => {
  return <div className={`py-3 ${className ?? ''}`}>{children}</div>;
};

const Footer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-end gap-2">{children}</div>;
};

Modal.Header = Header;
Modal.Description = Description;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;