import { Button } from "../../../components/Button";
import { useToggle } from "../../../hooks/useToggle";
import { LogForm } from "./LogForm";
import { RegisterForm } from "./RegisterForm";
import { useAuth } from "../../../hooks/useAuth";

/**
 * Login component that displays login and registration buttons, and shows the appropriate form when clicked. It also displays the user's pseudo and email when logged in, and a logout button.
 * @returns 
 */
export function Login()
{
    const [log, toggleLog] = useToggle(false);
    const [register, toggleRegister] = useToggle(false);
    const {pseudo, email, token, logout} = useAuth();

    return (
        <div>
            {token
                ? <div>
                    <p>Bienvenue {pseudo} ({email})</p>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="svg-icon" 
                        style={{ width: '1em', height: '1em', verticalAlign: 'middle', fill: 'currentColor', overflow: 'hidden', cursor: 'pointer' }}
                        viewBox="0 0 1024 1024" 
                        version="1.1"
                        onClick={logout}
                    >
                        <path d="M768 106V184c97.2 76 160 194.8 160 328 0 229.6-186.4 416-416 416S96 741.6 96 512c0-133.2 62.8-251.6 160-328V106C121.6 190.8 32 341.2 32 512c0 265.2 214.8 480 480 480s480-214.8 480-480c0-170.8-89.6-321.2-224-406z" fill=""/>
                        <path d="M512 32c-17.6 0-32 14.4-32 32v448c0 17.6 14.4 32 32 32s32-14.4 32-32V64c0-17.6-14.4-32-32-32z" fill=""/>
                    </svg>

                </div>
                : <div>
                    <Button onClick={toggleLog}>Se connecter</Button>
                    <Button onClick={toggleRegister}>S'enregistrer</Button>
                </div>
            }
            {log && <LogForm toggleLogin={toggleLog}/>}
            {register && <RegisterForm toggleRegister={toggleRegister}/>}
        </div>
     )
}