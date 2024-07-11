import { LoginForm } from '@/components/login';
import { LoginModal } from '@/components/login';

export default function Page() {
  return (
    <LoginModal>
      <LoginForm />
    </LoginModal>
  );
}
