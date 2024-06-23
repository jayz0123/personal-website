import { Textarea } from '@nextui-org/input';

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
        return value.length > 0 ? true : 'Please enter a message';
      }}
      validationBehavior="native"
      errorMessage={(res) => {
        return res.isInvalid ? res.validationErrors : null;
      }}
    />
  );
}
