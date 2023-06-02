'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose';

import Button from '@components/Button';

type ModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
};

const Modal = ({
  isOpen = false,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  const handleClose = () => {
    if (disabled) {
      return;
    }

    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  return isOpen ? (
    <div className="fixed inset-0 z-20 flex justify-center overflow-x-hidden bg-neutral-800/70 outline-none scrollbar scrollbar-track-transparent scrollbar-thumb-transparent">
      <div className="relative mx-auto my-6 h-fit w-full md:w-4/6 lg:w-3/6 xl:w-2/5">
        <div
          className={`translate h-full pl-2 pr-2 duration-300 sm:p-7 ${
            showModal
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0'
          }`}
        >
          <div className="translate relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none">
            <div className="relative flex items-center justify-center rounded-t border-b-[1px] p-6">
              <button
                type="button"
                aria-label="Close"
                onClick={handleClose}
                className="absolute left-9 border-0 p-1 transition-opacity hover:opacity-70"
              >
                <IoMdClose size={18} />
              </button>

              <div className="text-lg font-semibold">{title}</div>
            </div>

            <div className="relative flex-auto p-6">{body}</div>

            <div className="flex flex-col gap-2 p-6">
              <div className="flex w-full items-center gap-4">
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    label={secondaryActionLabel}
                    disabled={disabled}
                    outline
                    onClick={handleSecondaryAction}
                  />
                )}

                <Button
                  aria-label="Submit"
                  label={actionLabel}
                  disabled={disabled}
                  onClick={handleSubmit}
                />
              </div>

              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
