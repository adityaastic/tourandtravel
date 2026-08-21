export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-accent-orange border-t-transparent rounded-full animate-spin"></div>
        <p className="text-primary-navy font-poppins font-medium animate-pulse">Loading amazing experiences...</p>
      </div>
    </div>
  );
}
