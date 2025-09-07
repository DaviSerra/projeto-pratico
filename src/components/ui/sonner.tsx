import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="system"
      className="toaster group"
      position="top-right"
      richColors
      expand
      visibleToasts={4}
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-dark-900 group-[.toaster]:border-light-200 group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl group-[.toaster]:border group-[.toaster]:backdrop-blur-sm dark:group-[.toaster]:bg-dark-800 dark:group-[.toaster]:text-light-50 dark:group-[.toaster]:border-dark-600",
          description:
            "group-[.toast]:text-dark-600 dark:group-[.toast]:text-dark-400",
          actionButton:
            "group-[.toast]:bg-primary-600 group-[.toast]:text-white group-[.toast]:hover:bg-primary-700 group-[.toast]:rounded-lg group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-sm group-[.toast]:font-medium",
          cancelButton:
            "group-[.toast]:bg-light-100 group-[.toast]:text-dark-700 group-[.toast]:hover:bg-light-200 group-[.toast]:rounded-lg group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-sm group-[.toast]:font-medium dark:group-[.toast]:bg-dark-700 dark:group-[.toast]:text-light-200 dark:group-[.toast]:hover:bg-dark-600",
          closeButton:
            "group-[.toast]:bg-light-100 group-[.toast]:text-dark-600 group-[.toast]:hover:bg-light-200 group-[.toast]:border-0 group-[.toast]:rounded-lg dark:group-[.toast]:bg-dark-700 dark:group-[.toast]:text-dark-400 dark:group-[.toast]:hover:bg-dark-600",
          success:
            "group-[.toaster]:bg-success-50 group-[.toaster]:text-success-800 group-[.toaster]:border-success-200 dark:group-[.toaster]:bg-success-900/20 dark:group-[.toaster]:text-success-400 dark:group-[.toaster]:border-success-800",
          error:
            "group-[.toaster]:bg-red-50 group-[.toaster]:text-red-800 group-[.toaster]:border-red-200 dark:group-[.toaster]:bg-red-900/20 dark:group-[.toaster]:text-red-400 dark:group-[.toaster]:border-red-800",
          warning:
            "group-[.toaster]:bg-yellow-50 group-[.toaster]:text-yellow-800 group-[.toaster]:border-yellow-200 dark:group-[.toaster]:bg-yellow-900/20 dark:group-[.toaster]:text-yellow-400 dark:group-[.toaster]:border-yellow-800",
          info: "group-[.toaster]:bg-blue-50 group-[.toaster]:text-blue-800 group-[.toaster]:border-blue-200 dark:group-[.toaster]:bg-blue-900/20 dark:group-[.toaster]:text-blue-400 dark:group-[.toaster]:border-blue-800",
          loading:
            "group-[.toaster]:bg-light-50 group-[.toaster]:text-dark-800 group-[.toaster]:border-light-200 dark:group-[.toaster]:bg-dark-750 dark:group-[.toaster]:text-light-200 dark:group-[.toaster]:border-dark-600",
          title: "group-[.toast]:font-semibold group-[.toast]:text-sm",
          icon: "group-[.toast]:mr-2",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
