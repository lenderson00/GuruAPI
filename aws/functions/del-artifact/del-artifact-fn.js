/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const artifact_1 = require("main/factories/controller/artifact");
const aws_lambda_route_adapter_1 = require("main/adapters/aws-lambda-route-adapter");
const MongoHelper_1 = require("infra/artifact/db/mongodb/mongo-helper");
const env = require("main/config/env");

exports.handler = async (event) => {
    await MongoHelper_1.MongoHelper.connect(env.mongoUrl)
    const DelArtifactRouteController = aws_lambda_route_adapter_1.adaptRoute(artifact_1.makeDelArtifactController());
    await MongoHelper_1.MongoHelper.disconnect()
    return DelArtifactRouteController(event);
};