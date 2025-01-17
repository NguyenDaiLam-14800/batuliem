import React, { CSSProperties } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string
  style?: CSSProperties
  primary?: true
}

export default function Button({
  children,
  style,
  primary,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={`${
        primary ? 'bg-[var(--green)]' : 'bg-[var(--yellow)]'
      } text-white rounded py-2 px-4 hover:opacity-80 min-w-[120px]`}
      style={style}
    >
      {children}
    </button>
  )
}
