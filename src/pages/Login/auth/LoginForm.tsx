import type { LoginFormInputs } from '../../../schemas/loginSchema';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import PasswordInput from '../common/PasswordInput';

interface LoginFormProps {
  onLogin: (data: LoginFormInputs) => void;
  errors: any;
  trigger: any;
  register: any;
  handleSubmit: any;
}

const LoginForm = ({ onLogin, errors, trigger, register, handleSubmit }: LoginFormProps) => {
  return (
    <form onSubmit={handleSubmit(onLogin)} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }} noValidate>
      <Label htmlFor="login-email">Email</Label>
      <input id="login-email" {...register('email', { onChange: () => trigger('email') })} placeholder="Email" type="email" autoFocus />
      {errors.email && <span style={{ color: '#d32f2f', fontSize: '0.95em' }}>{errors.email.message}</span>}
      <Label htmlFor="login-password">Password</Label>
      <PasswordInput register={register} trigger={trigger} errors={errors} />
      <Button type="submit" onClick={() => { trigger(); }}>Login</Button>
    </form>
  );
};

export default LoginForm;
