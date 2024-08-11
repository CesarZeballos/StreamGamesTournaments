

export const SecondStep: React.FC = () => {
    
    return (
        <div>
            <h1>segundo paso</h1>
        </div>
    )
}
// <div className="flex flex-col gap-2 w-fit">
//           <label className="body text-white">Image</label>
//           <input id="image" className="input" type="file" accept="image/*" onChange={handleFileChange} />
//           <br/>
//         </div>

//         <div className="flex flex-row gap-6 w-fit">
//                 <div className="flex flex-col gap-2 w-fit">
//                     <label className="body text-white">Number of members</label>
//                     <input
//                     type="number"
//                     value={data.membersNumber}
//                     onChange={handleChange}
//                     className="inputFit"
//                     required
//                     />
//                     {errorTournament.membersNumber ? (<p className="errorForm">{errorTournament.membersNumber}</p>) : (<p className="errorForm"><br/></p>)}
//                 </div>

//           <div className="flex flex-col gap-2 w-fit">
//             <label className="body text-white">Maximum teams</label>
//             <input
//               type="number"
//               value={data.maxTeam}
//               onChange={handleChange}
//               required
//               className="inputFit"
//               min={2}
//             />
//             {errorTournament.maxTeam ? (<p className="errorForm">{errorTournament.maxTeam}</p>) : (<p className="errorForm"><br/></p>)}
//           </div>
//         </div>

//         <div className="flex flex-row gap-6 w-fit">
//           <div className="flex flex-col gap-2 w-fit">
//             <label className="body text-white">Price</label>
//             <input
//               type="number"
//               value={data.price}
//               onChange={handleChange}
//               className="inputFit"
//               />
//             {errorTournament.price ? (<p className="errorForm">{errorTournament.price}</p>) : (<p className="errorForm"><br/></p>)}
//           </div>

          
//         </div>


//         <div className="flex flex-col gap-2 w-fit">
//           <label className="body text-white">Awards</label>
//           <div className="grid grid-cols-3">
//             <div className="flex flex-col gap-2">
//               <label className="body text-white">First</label>
//               {/* no se como seria la papa renderizar esto */}
//             </div>

//           </div>
//         </div>


//         <div className="flex flex-col gap-2 w-fit">
//           <label className="body text-white">Description</label>
//           <input
//             type="text"
//             value={data.description}
//             onChange={handleChange}
//             required
//             className="input"
//             maxLength={500}
//           />
//           {errorTournament.description ? (<p className="errorForm">{errorTournament.description}</p>) : (<p className="errorForm"><br/></p>)}
//         </div>

//         <div className="flex flex-col gap-2 w-fit">
//         <button className="buttonPrimary" type="submit">Create Tournament</button>
//         </div>
//         </div>