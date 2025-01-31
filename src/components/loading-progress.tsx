import { FC } from 'react';

// app/loading.tsx
const WholeAppLoadingProgress: FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="animate-spin w-12 h-12 rounded-full border-4 border-t-primary-light"></div>
    </div>
  );
};

export default WholeAppLoadingProgress;
