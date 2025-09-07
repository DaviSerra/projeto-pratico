interface LoadingProps {
  itemCount?: number;
}

const Loading = ({ itemCount = 10 }: LoadingProps) => {
  return (
    <div className="bg-light-50 dark:bg-dark-900 min-h-screen font-inter">
      <div className="max-w-8xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 w-7xl lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: itemCount }).map((_, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white dark:from-dark-800/50 dark:to-dark-900/30 backdrop-blur-sm border border-light-300 dark:border-dark-600/40 rounded-3xl overflow-hidden animate-pulse"
            >
              <div className="w-full h-56 bg-gradient-to-br from-light-200 dark:from-dark-700 to-light-300 dark:to-dark-600" />
              <div className="p-6">
                <div className="h-5 bg-light-200 dark:bg-dark-700 rounded-lg mb-4" />
                <div className="space-y-3">
                  <div className="h-3 bg-light-300 dark:bg-dark-600 rounded-md" />
                  <div className="h-3 bg-light-300 dark:bg-dark-600 rounded-md w-3/4" />
                  <div className="h-3 bg-light-300 dark:bg-dark-600 rounded-md w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
