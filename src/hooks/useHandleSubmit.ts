export function useHandleSubmit(onSubmit: (data: Record<string, string>) => void)
 {
    return function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries()) as Record<string, string>
        onSubmit(data)

    }
}