import Link from "next/link";

const Tournaments: React.FC = () => {
    
    return (
        <div className="bodyContainer">
            <h1>Tournaments</h1>
            <Link className="buttonPrimary" href="/tournaments/1">view tournament</Link>
        </div>
    )
}

export default Tournaments;