import { APIGatewayProxyEvent } from "aws-lambda";
import { MovieDetails, MovieList } from "../dto/MovieListDto"
import axios from 'axios';

export class MovieSearchService {
    public static async movieSearch(event: APIGatewayProxyEvent): Promise<MovieList> {
        let queryParams = {
            query: event.queryStringParameters?.query,
            page: event.queryStringParameters?.page || 1,

        }
        let baseUrl = `Constants.baseUrl+ search/movie`;

        const response = await axios.request({
            url: baseUrl,
            method: 'get',
            headers: {
                api_key: process.env.api_key,

            },
            data: queryParams,
            timeout: 12000,
            transitional: {
                clarifyTimeoutError: true
            }
        })
        let axiosResponse = response.data;
        let movieDetailArr: MovieDetails[] = []
        axiosResponse.results.forEach((result: MovieDetails) => {
            const res = {
                id: result.id,
                overview: result.overview,
                popularity: result.popularity,
                voteCount: result.voteCount
            }
            movieDetailArr.push(res)
        })
        let movieList: MovieList = {
            page: axiosResponse.page,
            results: movieDetailArr

        }
        return movieList;

    }

    public static async movieByLang(event: APIGatewayProxyEvent): Promise<MovieList[]> {
        let queryParams = {
            page: event.queryStringParameters?.page || 1,
            lang: event.queryStringParameters?.lang || 'en-US'

        }
        let baseUrl = `Constants.baseUrl+ search/movie`;

        const response = await axios.request({
            url: baseUrl,
            method: 'get',
            headers: {
                api_key: process.env.api_key,

            },
            data: queryParams,
            timeout: 12000,
            transitional: {
                clarifyTimeoutError: true
            }
        })
        return response.data

    }
    public static async movieById(event: APIGatewayProxyEvent) {
        let queryParams = {
            page: event.queryStringParameters?.page || 1,
            lang: event.queryStringParameters?.lang || 'en-US'

        }
        let movieId = event.pathParameters?.movieId
        let baseUrl = `Constants.baseUrl+ movie/ + ${movieId} + /lists`;

        const response = await axios.request({
            url: baseUrl,
            method: 'get',
            headers: {
                api_key: process.env.api_key,

            },
            data: queryParams,
            timeout: 12000,
            transitional: {
                clarifyTimeoutError: true
            }
        })
        return response.data
    }
}