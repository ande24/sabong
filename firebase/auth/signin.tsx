import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

interface SignInProps {
    email: string,
    password: string
}

export default async function SignIn({ email, password }: SignInProps) {
    const auth = getAuth(firebase_app);
    let res = null,
        err = null;

    try {
        res = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        err = e;
    }

    return { res, err };
}