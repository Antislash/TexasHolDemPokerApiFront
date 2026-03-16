export function Alert({type = 'info', children}: {type?: 'success' | 'danger' | 'warning' | 'info', children: React.ReactNode}) {
    return <div className={`alert alert-${type}`} role="alert">
                {children}
            </div>
}