import * as apigateway from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';

interface LambdaRouteConfig{
    lambdaFunction : lambda.Function
}
export class Apigatewaytil {
public static createApiGateway(
    stack: cdk.Stack,
    //lambda: lambda.Function[]
    lambdas : LambdaRouteConfig[]
): void {
    const api = new apigateway.LambdaRestApi(stack, 'movieSearchApi', {
        handler: lambdas[0].lambdaFunction,
        proxy: false,
    });

    // Setup /movies route
    const movies = api.root.addResource('movies');
    movies.addMethod('GET', new apigateway.LambdaIntegration(lambdas[0].lambdaFunction), {
        requestParameters: {
            'method.request.querystring.query': true,
            'method.request.querystring.page': true,
            'method.request.querystring.region': true,
        },
        requestValidatorOptions: {
            requestValidatorName: 'RequestValidator',
            validateRequestParameters: true,
        },
    });

    const moviesByLang = api.root.addResource('movies-by-lang');
    moviesByLang.addMethod('GET', new apigateway.LambdaIntegration(lambdas[1].lambdaFunction), {
        requestParameters: {
            'method.request.querystring.query': true,
            'method.request.querystring.page': true,
            'method.request.querystring.language': true,
            'method.request.querystring.region': true,
        },
        requestValidatorOptions: {
            requestValidatorName: 'RequestValidator',
            validateRequestParameters: true,
        },
    });

}
}