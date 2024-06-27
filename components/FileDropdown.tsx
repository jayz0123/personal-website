import { useState, useMemo, useRef } from 'react';

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

// import handleFileUpload, { File } from '@/utils/handleFileUpload';

export default function FileDropdown({}: {}) {
  const size = 24;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Dropdown
      placement="top-start"
      backdrop="blur"
      shouldCloseOnBlur
      closeOnSelect={false}
    >
      <DropdownTrigger>
        <Button isIconOnly variant="flat">
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
        <DropdownSection showDivider={files.length > 0}>
          {files.map((file) => (
            <DropdownItem
              isReadOnly
              key={file.name}
              textValue={file.name}
              endContent={
                <Button
                  isIconOnly
                  size="sm"
                  color="danger"
                  onPress={() => {
                    setFiles((prev) =>
                      prev.filter((f) => f.name !== file.name),
                    );
                  }}
                >
                  <XMarkIcon width={16} height={16} />
                </Button>
              }
            >
              {file.name}
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
              onChange={(e) => {
                const newFiles = Array.from(e.target.files || []);
                const uniqueFiles = newFiles.filter(
                  (newFile) =>
                    !files.some((file) => file.name === newFile.name),
                );
                setFiles((prev) => [...prev, ...uniqueFiles]);
              }}
              className="hidden"
            />
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
