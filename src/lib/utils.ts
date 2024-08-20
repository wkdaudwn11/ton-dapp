import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const shortenAddress = (
  account: string,
  {
    headLength = 4,
    tailLength = 0,
  }: { headLength?: number; tailLength?: number } = {},
) =>
  `${account.substring(0, headLength + 2)}...${account.substring(42 - tailLength)}`;
