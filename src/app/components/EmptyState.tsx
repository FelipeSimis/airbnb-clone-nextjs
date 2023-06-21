'use client';

import { useRouter } from 'next/navigation';

import Heading from '@components/Heading';
import Button from '@components/Button';

type EmptyStateProps = {
  title?: string;
  subtitle?: string;
  showResetButton?: boolean;
};

export const EmptyState = ({
  title = 'No exact matches',
  subtitle = 'Try changing or remove some of your filters',
  showResetButton,
}: EmptyStateProps) => {
  const { push } = useRouter();

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
      <Heading title={title} subtitle={subtitle} />

      {showResetButton && (
        <div className="mt-4 w-48">
          <Button
            outline
            label="Remove all filters"
            onClick={() => push('/')}
          />
        </div>
      )}
    </div>
  );
};
