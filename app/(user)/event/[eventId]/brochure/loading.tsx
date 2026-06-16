const BrochureLoading = () => {
  return (
    <div className="flex flex-col items-center pt-18 pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
      <div className="mb-4 w-75 h-1.5 rounded-[10px] bg-gomin-neutral-100 animate-pulse" />
      <div className="w-78 h-168.5 rounded-[20px] bg-gomin-neutral-100 animate-pulse shadow-card" />
    </div>
  );
};

export default BrochureLoading;
