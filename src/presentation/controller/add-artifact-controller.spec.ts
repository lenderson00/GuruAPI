import { upgradeTiers } from "../../data/artifact/chances";
import { Sets, Stats, Types } from "../../data/artifact/enums";
import { AddArtifact, AddArtifactResult } from "../../domain/artifact/usecases/add-artifact";
import { InvalidParamError, MissingParamError } from "../errors";
import { AddArtifactController } from "./add-artifact-controller"

const makeSut = () => {
    const addArtifactStub: AddArtifact = {
        add: async (data) => {
            return new Promise((res) => res(true as AddArtifactResult))
        }
    }
   
    const sut = new AddArtifactController(addArtifactStub)
    return { sut, addArtifactStub }
}

describe ('Add Artifact Controller', () => {
    
    // Should return 400 if missing required params

    test('Should return 400 if no set is provided', async () => {
        const { sut } = makeSut();
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
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('set'));
    })
    
    test('Should return 400 if no type is provided', async () => {
        const { sut } = makeSut();
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
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('type'));
    })
    
    test('Should return 400 if no level is provided', async () => {
        const { sut } = makeSut();
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
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('level'));
    })
    
    test('Should return 400 if no mainstat is provided', async () => {
        const { sut } = makeSut();
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
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('mainstat'));
    })
    
    test('Should return 400 if no substat is provided', async () => {
        const { sut } = makeSut();
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
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('substats'));
    })
    
    
    // Set, type, mainstat and substats should be part of their enums
    
    test('Should return 400 if set is invalid', async () => {
        const { sut } = makeSut();
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
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('set'));
    })
    
    test('Should return 400 if type is invalid', async () => {
        const { sut } = makeSut();
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
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('type'));
    })
    
    test('Should return 400 if level is invalid', async () => {
        const { sut } = makeSut();
        const httpRequest = { body: {
            set: Sets.AP,
            type: Types.Flower,
            level: 999, // <= invalid level
            mainstat: Stats.HPFlat,
            substats: [
                {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
                {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
                {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
                {substat: Stats.DEFFlat, value: upgradeTiers.DEF[0]}
            ]
        }};
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('level'));
    })
    
    test('Should return 400 if mainstat is invalid', async () => {
        const { sut } = makeSut();
        const httpRequest = { body: {
            set: Sets.AP,
            type: Types.Flower,
            level: 20,
            mainstat: Stats.CD, // Only Stats.HP is allowed for Type Flower!
            substats: [
                {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
                {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
                {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
                {substat: Stats.DEFFlat, value: upgradeTiers.DEF[0]}
            ]
        }};
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('mainstat'));
    })
    
    test('Should return 400 if any substat is invalid', async () => {
        const { sut } = makeSut();
        const httpRequest = { body: {
            set: Sets.AP,
            type: Types.Flower,
            level: 20,
            mainstat: Stats.HPFlat,
            substats: [
                {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
                {substat: "invalid_substat", value: upgradeTiers.ATK[0]},
                {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
                {substat: Stats.DEFFlat, value: upgradeTiers.DEF[0]}
            ]
        }};
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('substat: invalid_substat'));
    }) 
    
    test('Should return 400 if any substat value is invalid', async () => {
        const { sut } = makeSut();
        const httpRequest = { body: {
            set: Sets.AP,
            type: Types.Flower,
            level: 20,
            mainstat: Stats.HPFlat,
            substats: [
                {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
                {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
                {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
                {substat: Stats.DEFFlat, value: 0}
            ]
        }};
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('substat value: DEF'));
    })
    
    test('Should return 400 if more than 4 substats are provided', async () => {
        const { sut } = makeSut();
        const httpRequest = { body: {
            set: Sets.AP,
            type: Types.Flower,
            level: 20,
            mainstat: Stats.HPFlat,
            substats: [
                {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
                {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
                {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
                {substat: Stats.DEFFlat, value: upgradeTiers.DEF[0]},
                {substat: Stats.EM, value: upgradeTiers["Elemental Mastery"][0]},
            ]
        }};
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('# of substats'));
    })

    test('Should return 400 if substats values indicate more than 5 upgrade rolls', async () => {
        const { sut } = makeSut();
        const httpRequest = { body: {
            set: Sets.AP,
            type: Types.Flower,
            level: 20,
            mainstat: Stats.HPFlat,
            substats: [
                {substat: Stats.ATK, value: Math.round(upgradeTiers["ATK%"][0]*3*100)/100},
                {substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0]*3*100)/100},
                {substat: Stats.DEF, value: Math.round(upgradeTiers["DEF%"][0]*3*100)/100},
                {substat: Stats.DEFFlat, value: Math.round(upgradeTiers.DEF[0]*3*100)/100}
            ]
        }};
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('Invalid # of rolls: 8'));
    })

    test('Should call AddArtifactDB with correct data', async () => {
        const { sut, addArtifactStub } = makeSut();
        const addArtifactSpy = jest.spyOn(addArtifactStub, 'add')
        const httpRequest = { body: {
            set: Sets.AP,
            type: Types.Flower,
            level: 20,
            mainstat: Stats.HPFlat,
            substats: [
                {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
                {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
                {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
                {substat: Stats.DEFFlat, value: upgradeTiers.DEF[0]},
            ]
        }};
        await sut.handle(httpRequest);
        expect(addArtifactSpy).toHaveBeenCalledWith(httpRequest.body);
    })

    test('Should return 200 if valid data is provided', async () => {
        const { sut } = makeSut();
        const httpRequest = { body: {
            set: Sets.AP,
            type: Types.Flower,
            level: 20,
            mainstat: Stats.HPFlat,
            substats: [
                {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]*2},
                {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]*3},
                {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
                {substat: Stats.DEFFlat, value: upgradeTiers.DEF[0]},
            ]
        }};
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(200);
        expect(httpResponse.body).toEqual(true);
    })
})