'use client';

type MenuItemProps = {
  onClick: () => void;
  label: string;
};

const MenuItem = ({ label, onClick }: MenuItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-4 font-semibold transition-colors hover:bg-neutral-100"
    >
      {label}
    </button>
  );
};

export default MenuItem;
