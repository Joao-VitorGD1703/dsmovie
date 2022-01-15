import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "componentes/Navbar/MovieCard/indesx";
import Pagination from "componentes/Navbar/Pagination";
import { BASE_URL } from "utils/requests";
import { MoviePage } from "types/movie";

function Listing() {

    const [pageNumber, setPageNumber] = useState(0);

    const [page, setPage] = useState<MoviePage>({
        content: [],
        last: true,
        totalPages: 0,
        totalElements: 0,
        size: 12,
        number: 0,
        first: true,
        numberOfElements: 0,
        empty: true
    });
//`${BASE_URL}/movies?sizes=12&page=${pageNumber}
    useEffect(() => {
        axios.get(`${BASE_URL}/movies?size=12&page=${pageNumber}&sort=id`)
            .then(response => {
                const data = response.data as MoviePage;
                setPage(data);
            });

    }, [pageNumber]);
const handPageChange =(newPageNumber : number)=>{
    setPageNumber(newPageNumber);
}


    return (
        <>

            <Pagination page = { page } onChange = {handPageChange} />

            <div className="container">
                <div className="row">
                    {page.content.map(movie => (
                        <div key={movie.id} className="col-sm-6 col-lg-4 col=xl-3 mb-3">
                            <MovieCard movie={movie} />
                        </div>
                    )
                    )}
                </div>
            </div>
        </>
    );
}

export default Listing;