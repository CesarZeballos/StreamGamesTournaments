import { IMessage } from "@/interfaces/interfaceRedux";


export const ChatMessage = (data: IMessage) => {
    return (
        <div className="flex flex-col justify-start gap-1 p-2 my-1 bg-BGlight rounded-sm">
            <div className="flex flex-row gap-1">
                <p className="body text-lightViolet">{data.nickname}:</p>
                <p className="body text-white">{data.post}</p>
            </div>
            <p className="font-Roboto font-normal text-xs text-end text-lightViolet">({isoToDate(data.createdAt)})</p>
        </div>
    )
}

export function isoToDate(isoDate: string | number | Date) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month} ${hours}:${minutes}`;
}