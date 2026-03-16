import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Form } from "../../../components/Form";
import { Modal } from "../../../components/Modal";

type LogFormProps = {
    toggleLogin: () => void
}

/**
 * Create a login form that sends a POST request to the API and handles the response.
 * @param param0 
 * @returns 
 */
export function LogForm({toggleLogin} : LogFormProps) 
{
     return (
        <Modal>
            <Form url="https://localhost:44367/login/connect" toggleLogin={toggleLogin} title="Se connecter">
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