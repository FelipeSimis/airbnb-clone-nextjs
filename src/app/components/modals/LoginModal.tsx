'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';
import { AiFillGithub } from '@react-icons/all-files/ai/AiFillGithub';

import { useLoginModal, useRegisterModal } from '@hooks/useModal';

import { LoginData, loginSchema } from '@schemas/loginSchema';

import Heading from '@components/Heading';
import Input from '@components/inputs/Input';
import PasswordInput from '@components/inputs/PasswordInput';
import Button from '@components/Button';
import Modal from './Modal';

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { refresh } = useRouter();

  const { isOpen, closeModal: closeLoginModal } = useLoginModal();

  const { openModal: openRegisterModal } = useRegisterModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);

    try {
      const callback = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      setIsLoading(false);

      if (callback?.error) {
        return toast.error(callback.error);
      }

      toast.success('Logged in');

      closeLoginModal();

      return refresh();
    } catch (error) {
      return toast.error('Something went wrong');
    }
  };

  const handleSwitchToRegisterModal = () => {
    closeLoginModal();
    openRegisterModal();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Log in to your account!" />

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
          <div>First time using Airbnb?</div>

          <button
            type="button"
            onClick={handleSwitchToRegisterModal}
            className="hover:underline"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      title="Login"
      actionLabel="Continue"
      disabled={isLoading}
      isOpen={isOpen}
      onSubmit={handleSubmit(onSubmit)}
      onClose={closeLoginModal}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
