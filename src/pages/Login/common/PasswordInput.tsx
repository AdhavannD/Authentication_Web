import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';

interface PasswordInputProps {
  register: any;
  trigger: any;
  errors: any;
}

const PasswordInput = ({ register, trigger, errors }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        id="login-password"
        {...register('password', { onChange: () => trigger('password') })}
        placeholder="Password"
        type={showPassword ? 'text' : 'password'}
        minLength={6}
        style={{ width: '100%' }}
      />
      <Button
        type="button"
        onClick={() => setShowPassword((v) => !v)}
        className="absolute right-0 top-5 -translate-y-1/2 p-0 h-13 w-15 min-w-0 flex items-center justify-center"
        tabIndex={-1}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
      </Button>
      {errors.password && <span style={{ color: '#d32f2f', fontSize: '0.95em' }}>{errors.password.message}</span>}
    </div>
  );
};

export default PasswordInput;
