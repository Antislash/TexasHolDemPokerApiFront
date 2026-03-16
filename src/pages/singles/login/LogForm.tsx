import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Form } from "../../../components/Form";
import { Modal } from "../../../components/Modal";
import { useAuthSubmit } from "../../../hooks/useAuthSubmit";

type LogFormProps = {
    toggleLogin: () => void
}

export function LogForm({toggleLogin} : LogFormProps)
{
    const { handleSubmit, error, loading } = useAuthSubmit("https://localhost:44367/login/connect", toggleLogin)

    return (
        <Modal>
            <Form onSubmit={handleSubmit} error={error} loading={loading} title="Se connecter">
                <Input name="email" label="Email" placeholder="Email"/>
                <Input name="password" label="Mot de Passe" type="password" placeholder="password"/>
                <div className="hstack gap-2 justify-content-end">
                    <Button type="button" variant="secondary" onClick={toggleLogin}>Annuler</Button>
                    <Button type="submit">Se connecter</Button>
                </div>
            </Form>
        </Modal>
    )
}