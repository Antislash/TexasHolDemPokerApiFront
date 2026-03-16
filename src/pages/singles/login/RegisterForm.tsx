import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Form } from "../../../components/Form";
import { Modal } from "../../../components/Modal";

export function RegisterForm({ toggleRegister }: { toggleRegister: () => void }) {
    return (
        <Modal>
            <Form url="https://localhost:44367/login/register" toggleLogin={toggleRegister} title="S'enregistrer">
                <Input name="pseudo" label="Pseudo" placeholder="Pseudo"/>
                <Input name="email" label="Email" placeholder="Email"/>
                <Input name="password" label="Mot de Passe" type="password" placeholder="password"/>
                <div className="hstack gap-2 justify-content-end">
                    <Button type="button" variant="secondary" onClick={toggleRegister}>Annuler</Button>
                    <Button type="submit">S'enregistrer</Button>
                </div>
            </Form>
        </Modal>
    )
}