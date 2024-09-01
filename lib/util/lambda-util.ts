import { Stack } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';


interface LambdaFunctionProps {
    handlerName: string;
    runtime?: lambda.Runtime;
    environment?: { [key: string]: string };
    memorySize?: number;
    timeout?: cdk.Duration;
}

interface lambdas {
    movieSearchByLangLambda: lambda.Function,
    movieSearchLambda: lambda.Function

}
export class LambdaUtil {

//Create Lambda
    public static createLambdaFunction(stack: cdk.Stack, id: string, props: LambdaFunctionProps): lambda.Function {
        return new lambda.Function(stack, id, {
            runtime: props.runtime || lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('src/handler'),
            handler: props.handlerName,
            environment: props.environment || {},
            memorySize: props.memorySize || 128,
            timeout: props.timeout || cdk.Duration.seconds(30),
        });
    }

    //Create Individual Lambda
    public static createLambdas(stack: cdk.Stack): lambdas {
        const movieSearchLambda = LambdaUtil.createLambdaFunction(stack, 'MovieSearchHandler', {
            handlerName: 'movie-search-handler.handler',
            environment: {
                TMDB_API_KEY: process.env.TMDB_API_KEY!

            },
        });

        const movieSearchByLangLambda = LambdaUtil.createLambdaFunction(stack, 'MovieSearchByLangHandler', {
            handlerName: 'movie-search-by-lang-handler',
            environment: {
                TMDB_API_KEY: process.env.TMDB_API_KEY!
            },
        });

        return {
            movieSearchLambda: movieSearchLambda,
            movieSearchByLangLambda: movieSearchByLangLambda
        }

    }

}