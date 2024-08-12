import { setThirdStep } from "@/redux/slices/organizerSlice";
import { AppDispatch } from "@/redux/store";
import { uploadFileSlice } from "@/redux/thunks/auxiliarSliceThunk";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";


export const ThirdStep: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [image, setImage] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImage(event.target.files[0]);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!image) {
            toast.info("Your tournament has no banner. Remember that it is not necessary and that your tournament will have a banner by default.", {
                position: 'top-right',
                duration: 1500,
                action: {
                    label: "ok",
                    onClick: () => {dispatch(setThirdStep())},
                }
            })
        } else {
            dispatch(uploadFileSlice(image))
            dispatch(setThirdStep())
        }
    };


    return (
        <form onSubmit={handleSubmit} className="col-span-2 flex flex-col gap-2 w-fit">
            <label className="body text-white">Image</label>
            <input id="image" className="input" type="file" accept="image/*" onChange={handleFileChange} />
            <button type="submit" className="buttonPrimary">Next</button>
        </form>
    )
}