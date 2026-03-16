type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'danger'
  href?: string
} & (
  React.AnchorHTMLAttributes<HTMLAnchorElement> |
  React.ButtonHTMLAttributes<HTMLButtonElement>
)

export function Button({ variant = 'primary', ...props }: ButtonProps) {
  const newProps = {
    ...props,
    className: `btn btn-${variant}`,
  }

  if ('href' in props) {
    return <a {...newProps as React.AnchorHTMLAttributes<HTMLAnchorElement>} />
  }

  return <button {...newProps as React.ButtonHTMLAttributes<HTMLButtonElement>} />
}