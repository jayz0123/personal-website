import { useCallback } from 'react';

import { useSearchParams } from 'next/navigation';

type Operation = 'set' | 'append' | 'delete' | 'has' | 'get' | 'getAll';

// Define the function overloads
export function useQueryString(operation: 'has'): (name: string) => boolean;
export function useQueryString(
  operation: 'get',
): (name: string) => string | null;
export function useQueryString(operation: 'getAll'): (name: string) => string[];
export function useQueryString(
  operation: 'set' | 'append',
): (name: string, value: string | number) => string;
export function useQueryString(operation: 'delete'): (name: string) => string;

// Implement the function
export function useQueryString(operation: Operation) {
  const searchParams = useSearchParams();

  return useCallback(
    (name: string, value: string | number) => {
      const params = new URLSearchParams(searchParams.toString());

      switch (operation) {
        case 'has':
          return params.has(name);
        case 'get':
          return params.get(name);
        case 'getAll':
          return params.getAll(name);
        case 'set':
          if (value !== undefined) {
            params.set(name, value.toString());
            return params.toString();
          }
          throw new Error(`'set' operation requires a 'slug' value.`);
        case 'append':
          if (value !== undefined) {
            params.append(name, value.toString());
            return params.toString();
          }
          throw new Error(`'append' operation requires a 'slug' value.`);
        case 'delete':
          params.delete(name);
          return params.toString();
        default:
          throw new Error(`Unsupported operation: ${operation}`);
      }
    },
    [searchParams, operation],
  );
}
