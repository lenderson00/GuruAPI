import { MissingParamError } from "../errors";
import { AddArtifactController } from "./add-artifact-controller"

// Should return 400 if missing required params

describe ('Add Artifact Controller', () => {
    test('Should return 400 if no set is provided', () => {
        const sut = new AddArtifactController();
        const httpRequest = { body: {
            /* set: 'any_set', */
            type: 'any_type',
            level: 20,
            mainstat: 'any_stat',
            substats: [
                {substat: 'any_stat', value: 0},
                {substat: 'any_stat', value: 0},
                {substat: 'any_stat', value: 0},
                {substat: 'any_stat', value: 0}
            ]
        }};
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('set'));
    })
})

describe ('Add Artifact Controller', () => {
    test('Should return 400 if no type is provided', () => {
        const sut = new AddArtifactController();
        const httpRequest = { body: {
            set: 'any_set',
            /* type: 'any_type', */
            level: 20,
            mainstat: 'any_stat',
            substats: [
                {substat: 'any_stat', value: 0},
                {substat: 'any_stat', value: 0},
                {substat: 'any_stat', value: 0},
                {substat: 'any_stat', value: 0}
            ]
        }};
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('type'));
    })
})

describe ('Add Artifact Controller', () => {
    test('Should return 400 if no level is provided', () => {
        const sut = new AddArtifactController();
        const httpRequest = { body: {
            set: 'any_set',
            type: 'any_type',
            /* level: 20, */
            mainstat: 'any_stat',
            substats: [
                {substat: 'any_stat', value: 0},
                {substat: 'any_stat', value: 0},
                {substat: 'any_stat', value: 0},
                {substat: 'any_stat', value: 0}
            ]
        }};
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('level'));
    })
})

describe ('Add Artifact Controller', () => {
    test('Should return 400 if no mainstat is provided', () => {
        const sut = new AddArtifactController();
        const httpRequest = { body: {
            set: 'any_set',
            type: 'any_type',
            level: 20,
            /* mainstat: 'any_stat', */
            substats: [
                {substat: 'any_stat', value: 0},
                {substat: 'any_stat', value: 0},
                {substat: 'any_stat', value: 0},
                {substat: 'any_stat', value: 0}
            ]
        }};
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('mainstat'));
    })
})

describe ('Add Artifact Controller', () => {
    test('Should return 400 if no substat is provided', () => {
        const sut = new AddArtifactController();
        const httpRequest = { body: {
            set: 'any_set',
            type: 'any_type',
            level: 20,
            mainstat: 'any_stat',
            /* substats: [
                {substat: 'any_stat', value: 0},
                {substat: 'any_stat', value: 0},
                {substat: 'any_stat', value: 0},
                {substat: 'any_stat', value: 0}
            ] */
        }};
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('substats'));
    })
})



// Set, type, mainstat and substats should be part of their enums

// Type, mainstat and substat must obey combination parameters

// Level should be from 0 to 20

// Substats values should obey possible combinations n times - where n is RoundDown(Level / 4, 0)

// Substats should have lenght <= 4

// OK scenario