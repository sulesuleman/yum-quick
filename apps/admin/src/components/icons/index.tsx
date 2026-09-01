import type { SVGProps } from 'react';

export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.8}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      {children}
    </svg>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x='3' y='3' width='7' height='7' rx='1.5' />
      <rect x='14' y='3' width='7' height='7' rx='1.5' />
      <rect x='3' y='14' width='7' height='7' rx='1.5' />
      <rect x='14' y='14' width='7' height='7' rx='1.5' />
    </Icon>
  );
}

export function ReceiptIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d='M6 3h12v18l-3-2-3 2-3-2-3 2V3z' />
      <path d='M9 8h6M9 12h6' />
    </Icon>
  );
}

export function FastFoodIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d='M4 10h16a1 1 0 0 1 1 1c0 5-4 9-9 9s-9-4-9-9a1 1 0 0 1 1-1z' />
      <path d='M8 10c0-3 1.5-6 4-7 2.5 1 4 4 4 7' />
    </Icon>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx='9' cy='8' r='3.2' />
      <path d='M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6' />
      <circle cx='17' cy='9' r='2.6' />
      <path d='M15.5 14.2c2.4.4 4.5 2.5 4.5 5.8' />
    </Icon>
  );
}

export function UserCircleIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx='12' cy='12' r='9' />
      <circle cx='12' cy='10' r='3' />
      <path d='M6.5 18.5c1-2.5 3-4 5.5-4s4.5 1.5 5.5 4' />
    </Icon>
  );
}

export function CashIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x='2.5' y='6' width='19' height='12' rx='2' />
      <circle cx='12' cy='12' r='3' />
      <path d='M6 9v.01M18 15v.01' />
    </Icon>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d='M9 6l6 6-6 6' />
    </Icon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d='M6 9l6 6 6-6' />
    </Icon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx='11' cy='11' r='7' />
      <path d='M21 21l-4.3-4.3' />
    </Icon>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d='M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z' />
      <path d='M9 12l2 2 4-4' />
    </Icon>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d='M4 7h16' />
      <path d='M10 11v6M14 11v6' />
      <path d='M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13' />
      <path d='M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3' />
    </Icon>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d='M12 5v14M5 12h14' />
    </Icon>
  );
}

export function MenuBarsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d='M4 6h16M4 12h16M4 18h16' />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d='M6 6l12 12M18 6L6 18' />
    </Icon>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx='12' cy='12' r='9' />
      <path d='M12 11v5.5M12 7.5v.01' />
    </Icon>
  );
}

export function LogOutIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
      <path d='M16 17l5-5-5-5' />
      <path d='M21 12H9' />
    </Icon>
  );
}
