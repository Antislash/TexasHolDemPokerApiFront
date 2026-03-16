import React, { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

interface ModalProps extends React.PropsWithChildren {
    onClose?: () => void
}

export function Modal({ children, onClose }: ModalProps) {

    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        dialogRef.current?.showModal()
    }, [])

    const handleClose = (e: React.SyntheticEvent<HTMLDialogElement>) => {
        e.preventDefault()
        onClose?.()
    }

    return createPortal(
        <dialog
            style={{ width: 'calc(100vw - 2rem)', maxWidth: 600 }}
            ref={dialogRef}
            onCancel={handleClose}
            onClose={handleClose}>
            {children}
        </dialog>,
        document.body
    )
}