import { useMemo } from 'react';

import { Input } from '@nextui-org/input';
import validateEmail from '@/utils/validateEmail';

export default function EmailInput({
  onEmailChange,
  isSending,
}: {
  onEmailChange: (arg0: string) => void;
  isSending: boolean;
}) {
  // const [isInvalid, setIsInvalid] = useState<boolean | undefined>(undefined);

  return (
    <Input
      isRequired
      isClearable
      isDisabled={isSending}
      type="email"
      label="Email"
      onValueChange={onEmailChange}
      validate={(value) => {
        if (value.length <= 0) {
          return 'Please enter an email address';
        } else if (validateEmail(value) === false) {
          return 'Please enter a valid email';
        } else return true;
      }}
      validationBehavior="native"
      errorMessage={(res) => {
        return res.isInvalid ? res.validationErrors : null;
      }}
    />
  );
}
