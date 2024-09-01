import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import { LambdaUtil } from './util/lambda-util';
import { Apigatewaytil } from './util/api-gateway';
import * as ssm from 'aws-cdk-lib/aws-ssm';

//import { createLambdaFunction } from './util/lambda-util';


export class EntertainhubStack extends cdk.Stack {   

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);


        // Create Lambda function


        const lambdas = LambdaUtil.createLambdas(this);

        const lambdaConfigs = [
            
                {lambdaFunction : lambdas.movieSearchLambda},
                {lambdaFunction : lambdas.movieSearchByLangLambda}
            ]
            
        // Create API Gateway
        Apigatewaytil.createApiGateway(this, lambdaConfigs);
    }
}
