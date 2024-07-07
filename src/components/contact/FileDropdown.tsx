import { useRef, ChangeEvent } from 'react';
import { Control, useFieldArray } from 'react-hook-form';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/dropdown';
import { Button } from '@nextui-org/button';
import {
  DocumentPlusIcon,
  ChevronUpIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { IFormInput } from './types';

export function FileDropdown({
  control,
  isDisabled,
}: {
  control: Control<IFormInput, any>;
  isDisabled: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attachments',
  });

  const size = 24;

  const handleAddFiles = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const files = Array.from(event.target.files);

    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (r: ProgressEvent<FileReader>) => {
        if (r.target && r.target.result) {
          const attachment: { filename: string; content: string } = {
            filename: file.name,
            content: r.target.result.toString().split(',')[1],
          };
          append(attachment);
        }
      };

      reader.onerror = () => {
        console.error('Failed to load file');
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Dropdown
      placement="top-start"
      backdrop="blur"
      shouldCloseOnBlur
      closeOnSelect={false}
    >
      <DropdownTrigger>
        <Button
          isDisabled={isDisabled}
          isIconOnly
          variant="shadow"
          color={`${fields.length ? 'success' : 'default'}`}
        >
          <input type="file" className="hidden"></input>
          <ChevronUpIcon width={size} height={size} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        hideSelectedIcon
        aria-label="file dropdown"
        selectionMode="none"
        className="min-w-60"
      >
        <DropdownSection showDivider={fields.length > 0}>
          {fields.map((field, index) => (
            <DropdownItem
              isReadOnly
              key={field.id}
              textValue={field.filename}
              endContent={
                <Button
                  isIconOnly
                  size="sm"
                  color="danger"
                  onPress={() => {
                    remove(index);
                  }}
                >
                  <XMarkIcon width={16} height={16} />
                </Button>
              }
            >
              {field.filename}
            </DropdownItem>
          ))}
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="file-upload"
            textValue="Attach new files"
            onPress={() => {
              fileInputRef.current?.click();
            }}
            startContent={<DocumentPlusIcon width={size} height={size} />}
          >
            <span>Attach new files</span>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleAddFiles}
              className="hidden"
            />
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
