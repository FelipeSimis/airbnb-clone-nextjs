import type { IconType } from '@react-icons/all-files';

type ListingCategoryProps = {
  icon: IconType;
  label: string;
  description: string;
};

const ListingCategory = ({
  icon: Icon,
  label,
  description,
}: ListingCategoryProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Icon size={40} className="text-neutral-400" />

        <div className="flex flex-col">
          <p className="text-lg font-semibold">{label}</p>

          <span className="font-light text-neutral-500">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
