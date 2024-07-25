import Link from "next/link"


const Tournament = ({params} : {params: {tournamentId: string}}) => {

    const tournamentId = params.tournamentId

    return (
        <div className="bodyContainer mb-16">
            <h1>Tournament {tournamentId}</h1>
            <Link className="buttonPrimary" href={`/tournaments/${tournamentId}/register`}>Register</Link>
        </div>
    )
}

export default Tournament