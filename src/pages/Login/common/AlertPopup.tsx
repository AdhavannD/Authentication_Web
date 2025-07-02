import { Alert, AlertDescription } from '../../../components/ui/alert';

interface AlertPopupProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const AlertPopup = ({ show, message, onClose }: AlertPopupProps) => {
  if (!show) return null;
  return (
    <Alert className="fixed left-1/2 -translate-x-1/2 top-8 max-w-xs z-50 bg-white border-blue-600 text-blue-900 shadow-lg flex justify-center items-center" onClick={onClose}>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default AlertPopup;
