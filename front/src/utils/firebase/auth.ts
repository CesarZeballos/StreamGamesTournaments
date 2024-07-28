import { IFirebaseSingProps } from "@/interfaces/interfaceFirebase";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";
import { auth } from "../firebase/firebaseConfig";

export const singUpFirebaseWithEmailAndPassword = async ({ email, password }: IFirebaseSingProps) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = JSON.stringify(userCredential.user);
            console.log("firebaseToken", user)
            // aca iria el llamado al backend... por lo que la props tendria que incluir todo el form de registro aunque si lo manejamos desde el redux no se si es necesario. ya se vera cuando jugemos jajaja
          })

    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage, {
            position: 'top-right',
            duration: 1500,
        })}
}

export const singInFirebase = ({ email, password }: IFirebaseSingProps) => {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  })
}