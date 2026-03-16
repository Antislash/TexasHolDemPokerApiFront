import { useId } from "react"

type InputProps = {
  htmlTag?: string
  label?: string
} & (
  React.TextareaHTMLAttributes<HTMLTextAreaElement> |
  React.InputHTMLAttributes<HTMLInputElement>
)

export function Input({ htmlTag, label, ...props }: InputProps) {
  const id = useId()
  const InputComponent = htmlTag === 'textarea' ? 'textarea' : 'input'

  return (
    <div>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <InputComponent
        className="form-control"
        id={id}
        {...props as React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>}
      />
    </div>
  )
}