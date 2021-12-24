/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const artifact_1 = require("main/factories/controller/artifact");
const aws_lambda_route_adapter_1 = require("main/adapters/aws-lambda-route-adapter");

exports.handler = async (event) => {
    const DelArtifactRouteController = aws_lambda_route_adapter_1.adaptRoute(artifact_1.makeDelArtifactController());
    return DelArtifactRouteController(event);
};