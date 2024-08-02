// import { IFirebaseSingProps } from "@/interfaces/interfaceFirebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";
import { auth } from "../firebase/firebaseConfig";
import { ILoginForm } from "@/interfaces/interfaceUser";

export const singUpFirebaseWithEmailAndPassword = async ({email, password}: ILoginForm) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        const tokenFirebase = await user.getIdToken()
        console.log(tokenFirebase)

        return tokenFirebase
}

export const singInFirebaseWithEmailAndPassword = async ({ email, password }: ILoginForm) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;
    const tokenFirebase = await user.getIdToken()

    console.log("response firebase", userCredential)
    
    return tokenFirebase
}

export const sendPasswordReset = async (email: string) => {
      const response = await sendPasswordResetEmail(auth, email)
      return response
}