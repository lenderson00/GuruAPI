import { upgradeTiers } from "../../data/artifact/chances";
import { Sets, Stats, Types } from "../../data/artifact/enums";
import { InvalidParamError, MissingParamError } from "../errors";
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


    // Set, type, mainstat and substats should be part of their enums

    test('Should return 400 if set is invalid', () => {
        const sut = new AddArtifactController();
        const httpRequest = { body: {
            set: "invalid_set",
            type: Types.Flower,
            level: 20,
            mainstat: Stats.HPFlat,
            substats: [
                {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
                {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
                {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
                {substat: Stats.DEFFlat, value: upgradeTiers.DEF[0]}
            ]
        }};
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('set'));
    })

    test('Should return 400 if type is invalid', () => {
        const sut = new AddArtifactController();
        const httpRequest = { body: {
            set: Sets.AP,
            type: "invalid_type",
            level: 20,
            mainstat: Stats.HPFlat,
            substats: [
                {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
                {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
                {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
                {substat: Stats.DEFFlat, value: upgradeTiers.DEF[0]}
            ]
        }};
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('type'));
    })

   test('Should return 400 if level is invalid', () => {
        const sut = new AddArtifactController();
        const httpRequest = { body: {
            set: Sets.AP,
            type: Types.Flower,
            level: 999,
            mainstat: Stats.HPFlat,
            substats: [
                {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
                {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
                {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
                {substat: Stats.DEFFlat, value: upgradeTiers.DEF[0]}
            ]
        }};
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('level'));
    })

 /*     test('Should return 400 if set is invalid', () => {
        const sut = new AddArtifactController();
        const httpRequest = { body: {
            set: Sets.AP,
            type: Types.Flower,
            level: 20,
            mainstat: Stats.HPFlat,
            substats: [
                {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
                {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
                {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
                {substat: Stats.DEFFlat, value: upgradeTiers.DEF[0]}
            ]
        }};
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('mainstat'));
    })

    test('Should return 400 if set is invalid', () => {
        const sut = new AddArtifactController();
        const httpRequest = { body: {
            set: Sets.AP,
            type: Types.Flower,
            level: 20,
            mainstat: Stats.HPFlat,
            substats: [
                {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
                {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
                {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
                {substat: Stats.DEFFlat, value: upgradeTiers.DEF[0]}
            ]
        }};
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('substats'));
    }) */
})





// Type, mainstat and substat must obey combination parameters

// Level should be from 0 to 20

// Substats values should obey possible combinations n times - where n is RoundDown(Level / 4, 0)

// Substats should have lenght <= 4

// OK scenario