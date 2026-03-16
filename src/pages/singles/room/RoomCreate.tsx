import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Form } from "../../../components/Form";
import { Modal } from "../../../components/Modal";
import { useToggle } from "../../../hooks/useToggle";
import { useRoomSubmit } from "../../../hooks/useRoomSubmit";

type RoomCreateProps = {
    onCreated?: () => void
}

export function RoomCreate({ onCreated }: RoomCreateProps) {
    const [open, toggleOpen] = useToggle(false)

    function onSuccess() {
        toggleOpen()
        onCreated?.()
    }

    const { handleSubmit, error, loading } = useRoomSubmit(onSuccess)

    return (
        <div>
            <Button onClick={toggleOpen}>Créer une room</Button>
            {open && (
                <Modal>
                    <Form onSubmit={handleSubmit} error={error} loading={loading} title="Créer une room">
                        <Input name="name" label="Nom de la room" placeholder="Nom"/>
                        <div className="hstack gap-2 justify-content-end">
                            <Button type="button" variant="secondary" onClick={toggleOpen}>Annuler</Button>
                            <Button type="submit">Créer</Button>
                        </div>
                    </Form>
                </Modal>
            )}
        </div>
    )
}
