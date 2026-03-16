import React from "react";
import { useHandleSubmit } from "../hooks/useHandleSubmit";
import { Spinner } from "./Spinner";
import { Alert } from "./Alert";

type FormProps = React.PropsWithChildren<{
    onSubmit: (data: Record<string, string>) => void;
    error?: string;
    loading?: boolean;
    title?: string;
}>

export function Form({ children, onSubmit, error, loading, title }: FormProps) {

    const handleSubmit = useHandleSubmit(onSubmit)

    return (
        <div className="form-container">
            <h1>{title}</h1>
            {error && <Alert type="danger">{error.toString()}</Alert>}
            <form action="" onSubmit={handleSubmit} className="vstack gap-3">
                {children}
            </form>
            {loading && <Spinner/>}
        </div>
    )
}