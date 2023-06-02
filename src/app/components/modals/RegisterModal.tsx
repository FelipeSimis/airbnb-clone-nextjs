'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';
import { AiFillGithub } from '@react-icons/all-files/ai/AiFillGithub';

import { fetchWrapper } from '@services/api';

import { useLoginModal, useRegisterModal } from '@hooks/useModal';

import { SignUpData, signUpSchema } from '@schemas/signUpSchema';

import Heading from '@components/Heading';
import Input from '@components/inputs/Input';
import PasswordInput from '@components/inputs/PasswordInput';
import Button from '@components/Button';
import Modal from './Modal';

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, closeModal: closeRegisterModal } = useRegisterModal();

  const { openModal: openLoginModal } = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpData) => {
    setIsLoading(true);

    try {
      await fetchWrapper('/api/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      toast.success('Account created!');

      closeRegisterModal();
      openLoginModal();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchToLoginModal = () => {
    closeRegisterModal();
    openLoginModal();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />

      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        error={errors.name}
      />

      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        error={errors.email}
      />

      <PasswordInput
        renderInput={isPasswordVisible => (
          <Input
            id="password"
            label="Password"
            disabled={isLoading}
            register={register}
            error={errors.password}
            isPasswordVisible={isPasswordVisible}
          />
        )}
      />
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />

      <Button
        label="Continue with Google"
        icon={FcGoogle}
        outline
        onClick={() => signIn('google')}
      />

      <Button
        label="Continue with Github"
        icon={AiFillGithub}
        outline
        onClick={() => signIn('github')}
      />

      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex items-center justify-center gap-2">
          <div>Already have an account?</div>

          <button
            type="button"
            aria-label="Log in"
            onClick={handleSwitchToLoginModal}
            className="hover:underline"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      title="Register"
      actionLabel="Continue"
      disabled={isLoading}
      isOpen={isOpen}
      onSubmit={handleSubmit(onSubmit)}
      onClose={closeRegisterModal}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
