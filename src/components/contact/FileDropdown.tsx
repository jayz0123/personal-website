import { ChangeEvent, useRef } from 'react';
import { Control, useFieldArray } from 'react-hook-form';

import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/dropdown';

import type { ContactFormSend } from '@/lib/definitions';

import readFiles from '@/utils/readFiles';

import { AttachmentIcon, FileAddIcon, XMarkIcon } from '../ui/Icons';

export function FileDropdown({
  control,
  isDisabled,
}: {
  control: Control<ContactFormSend, any>;
  isDisabled: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attachments',
  });

  const handleAddFiles = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    readFiles(event.target.files, append);
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
          <AttachmentIcon />
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
              textValue={field.fileName}
              endContent={
                <Button
                  isIconOnly
                  size="sm"
                  color="danger"
                  onPress={() => {
                    remove(index);
                  }}
                >
                  <XMarkIcon />
                </Button>
              }
            >
              {field.fileName}
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
            startContent={<FileAddIcon />}
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
