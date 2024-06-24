import { Textarea } from '@nextui-org/input';
import { useState } from 'react';

export default function MsgInput({
  onMsgChange,
  isSending,
}: {
  onMsgChange: (arg0: string) => void;
  isSending: boolean;
}) {
  return (
    <Textarea
      isRequired
      isDisabled={isSending}
      label="Message"
      minRows={6}
      onValueChange={onMsgChange}
      validate={(value) => {
        return value.length <= 0 ? 'Please enter a message' : true;
      }}
      validationBehavior="native"
      errorMessage={(res) => {
        return res.isInvalid ? res.validationErrors : null;
      }}
    />
  );
}
