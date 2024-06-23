import { Input } from '@nextui-org/input';

export default function NameInput({
  onNameChange,
  isSending,
}: {
  onNameChange: (arg0: string) => void;
  isSending: boolean;
}) {
  return (
    <Input
      isClearable
      isDisabled={isSending}
      type="name"
      label="Name"
      onValueChange={onNameChange}
    />
  );
}
