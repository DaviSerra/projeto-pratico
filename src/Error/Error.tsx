import { AlertTriangle } from "lucide-react";

interface ErrorProps {
  message: string;
  title?: string;
  className?: string;
  onRetry?: () => void | Promise<void>;
}

const Error = ({
  message,
  title = "Erro ao carregar dados",
  className = "",
  onRetry,
}: ErrorProps) => {
  return (
    <div
      className={`bg-light-50 dark:bg-dark-900 min-h-screen font-inter ${className}`}
    >
      <div className="max-w-8xl mx-auto px-6 py-20">
        <div className="max-w-md mx-auto bg-gradient-to-br from-alert-100 dark:from-alert-800/20 to-white dark:to-dark-800/30 border border-alert-300 dark:border-alert-600/40 rounded-3xl p-8 text-center backdrop-blur-sm">
          <div className="w-16 h-16 bg-alert-600 dark:bg-alert-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-alert-800 dark:text-alert-300 mb-2 font-poppins">
            {title}
          </h3>
          <p className="text-alert-600 dark:text-alert-400 font-medium mb-6">
            {message}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="bg-alert-600 hover:bg-alert-700 cursor-pointer dark:bg-alert-500 dark:hover:bg-alert-600 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Tentar novamente
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Error;
