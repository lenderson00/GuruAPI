/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var route_adapter = require("main/adapters/express-route-adapter");
var artifactControllers = require("main/factories/controller/artifact");
exports.handler = async (event) => {
    const fn = (0, route_adapter.adaptRoute)((0, artifactControllers.makeDelArtifactController)());
    const result = fn.handle(event);
    return result;
};