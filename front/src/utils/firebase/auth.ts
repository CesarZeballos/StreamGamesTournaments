import { IFirebaseSingProps } from "@/interfaces/interfaceFirebase";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";
import { auth } from "../firebase/firebaseConfig";

export const singUpFirebaseWithEmailAndPassword = async ({email, password}: IFirebaseSingProps) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        const tokenFirebase = await user.getIdToken()

        return tokenFirebase
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage, {
            position: 'top-right',
            duration: 1500,
        })}
}

export const singInFirebaseWithEmailAndPassword = async ({ email, password }: IFirebaseSingProps) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;
    const tokenFirebase = await user.getIdToken()

    return tokenFirebase
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage, {
      position: 'top-right',
      duration: 1500,
  })
  }
}