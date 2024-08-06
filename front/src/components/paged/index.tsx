import { setPage } from "@/redux/slices/tournamentSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

//icons
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const Paged: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const page = useSelector((state: RootState) => state.tournament.currentPage);
    const tournaments = useSelector((state: RootState) => state.tournament.tournamentsFiltered);
    const tournamentsPerPage = useSelector((state: RootState) => state.tournament.tournamentsPerPage);

    const totalPages = Math.ceil(tournaments.length / tournamentsPerPage);

    const   handleChangePage = (page: number) => {
        dispatch(setPage(page))
    }

    let pageSelector = []
    for (let i = 1; i <= totalPages; i++) {
        pageSelector.push(i)
    }

    return (
        <div className="col-span-3 mb-9 flex flex-row justify-center">
            <div className="grid grid-cols-3 gap-2">
                <div className="flex justify-end">
                    {page === 1 ? <br/> : 
                    <button className="iconButton w-fit" 
                    onClick={() => handleChangePage(page - 1)}
                    >
                        <NavigateBeforeIcon />
                    </button>}
                </div>

                <div className="flex flex-row">
                    {pageSelector.map((number) => (
                            <button className={"buttonSecondary"} 
                            key={number} 
                            onClick={() => handleChangePage(number)}
                            disabled={page === number}
                            >
                                {number}
                            </button>
                        ))
                    }
                </div>
                <div className="flex justify-start">
                    {page === totalPages ? <br/> : 
                    <button className="iconButton w-fit" 
                    onClick={() => handleChangePage(page + 1)}
                    >
                        <NavigateNextIcon />
                    </button>}
                </div>
            </div>
            
        </div>
    )
}