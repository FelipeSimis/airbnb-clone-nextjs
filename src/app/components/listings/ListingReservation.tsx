import Button from '@components/Button';

type ListingReservationProps = {
  price: number;
  totalPrice: number;
  disabled: boolean;
  calendar: React.ReactNode;
  onSubmit: () => Promise<string | void>;
};

const ListingReservation = ({
  price,
  totalPrice,
  disabled = false,
  calendar,
  onSubmit,
}: ListingReservationProps) => {
  return (
    <div className="overflow-hidden rounded-xl border-[1px] border-neutral-200 bg-white">
      <div className="flex items-center gap-1 p-4">
        <span className="text-2xl font-semibold">$ {price}</span>

        <span className="font-light text-neutral-600"> night</span>
      </div>

      <hr />

      {calendar}

      <hr />

      <div className="p-4">
        <Button label="Reserve" disabled={disabled} onClick={onSubmit} />
      </div>

      <hr />

      <div className="flex items-center justify-between p-4 text-lg font-semibold">
        <div>Total</div>

        <span>$ {totalPrice}</span>
      </div>
    </div>
  );
};

export default ListingReservation;
