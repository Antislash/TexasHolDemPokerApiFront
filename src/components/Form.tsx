import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useHandleSubmit } from "../hooks/useHandleSubmit";
import type { AuthResponse } from "../types/AuthResponse";
import { Spinner } from "./Spinner";
import { Alert } from "./Alert";

type FormProps = React.PropsWithChildren<{
    url: string;
    toggleLogin: () => void;
    title?: string;
}>

/**
 * Form component that handles form submission and authentication logic.
 * @param param0 
 * @returns 
 */
export function Form({ children, url, toggleLogin, title }: FormProps) {

    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = useHandleSubmit((data) => {
        setError('')
        setLoading(true)
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(r => {
            if (r.status === 401) throw new Error("Identifiants incorrects")
            if (r.status === 404) throw new Error("Serveur introuvable")
            if (r.status === 409) throw new Error("L'email est déjà utilisé")
            if (!r.ok) throw new Error(`Erreur serveur (${r.status})`)
            return r.json() as Promise<AuthResponse>
        })
        .then(data => { 
            login(data.token, data.pseudo, data.email)
            toggleLogin()
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false))
    })

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