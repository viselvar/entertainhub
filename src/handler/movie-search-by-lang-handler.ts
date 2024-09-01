import { MovieSearchService } from '../service/movie-search-service';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (event: APIGatewayProxyEvent): Promise<void | APIGatewayProxyResult> => {
    try {

        const response = MovieSearchService.movieByLang(event)
        return {
            statusCode: 200,
            body: JSON.stringify(response),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };

    }
}
