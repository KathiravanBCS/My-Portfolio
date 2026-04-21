export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <p className="text-6xl font-bold mb-4">404</p>
      <h1 className="text-xl font-medium mb-4 text-gray-600 dark:text-gray-400">
        Page Not Found
      </h1>
      <p className="text-gray-500 dark:text-gray-500">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}
