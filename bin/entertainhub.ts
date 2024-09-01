#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { EntertainhubStack } from '../lib/entertainhub-stack';

const app = new cdk.App();
new EntertainhubStack(app, 'EntertainhubStack');

