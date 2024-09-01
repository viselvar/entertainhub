interface MovieList{
page : number,
results : MovieDetails[]

}
interface MovieDetails {
    id : number,
    overview :string,
    popularity : number,
    voteCount : number
}
export {MovieList,MovieDetails}