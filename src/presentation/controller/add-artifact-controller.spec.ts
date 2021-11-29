import { upgradeTiers } from "../../data/artifact/utils/chances";
import { Sets, Stats, Type, Types } from "../../data/artifact/utils/enums";
import { AddArtifact, AddArtifactResult } from "../../domain/artifact/usecases/crud-artifact";
import { InvalidParamError, MissingParamError } from "../errors";
import { AddArtifactController, Request } from "./add-artifact-controller"

const makeSut = () => {
    const addArtifactStub: AddArtifact = {
        add: async () => {
            return new Promise((res) => res(true as AddArtifactResult))
        }
    }
   
    const sut = new AddArtifactController(addArtifactStub)
    return { sut, addArtifactStub }
}

const makeFakeRequest = (): Request => ({
    set: Sets.AP,
    type: Types.Flower,
    level: 20,
    mainstat: Stats.HPFlat,
    substats: [
        {substat: Stats.ATK, value: Math.round(upgradeTiers["ATK%"][0]*2*10)/10},
        {substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0]*3)},
        {substat: Stats.DEF, value: Math.round(upgradeTiers["DEF%"][0]*10)/10},
        {substat: Stats.DEFFlat, value: Math.round(upgradeTiers.DEF[0]*2)},
    ]
})

describe ('Add Artifact Controller', () => {
    
    // Should return 400 if missing required params

    test('Should return 400 if no set is provided', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        delete httpRequest.set;
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('set'));
    })
    
    test('Should return 400 if no type is provided', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        delete httpRequest.type;
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('type'));
    })
    
    test('Should return 400 if no level is provided', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        delete httpRequest.level;
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('level'));
    })
    
    test('Should return 400 if no mainstat is provided', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        delete httpRequest.mainstat;
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('mainstat'));
    })
    
    test('Should return 400 if no substat is provided', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        delete httpRequest.substats;
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('substats'));
    })
    
    
    // Set, type, mainstat and substats should be part of their enums
    
    test('Should return 400 if set is invalid', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest()
        httpRequest.set = 'invalid_set' as Sets
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('set'));
    })
    
    test('Should return 400 if type is invalid', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest()
        httpRequest.type = 'invalid_type' as Type
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('type'));
    })
    
    test('Should return 400 if level is invalid', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest()
        httpRequest.level = 999 // Only Stats.HP is allowed for Type Flower!
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('level'));
    })
    
    test('Should return 400 if mainstat is invalid', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest()
        httpRequest.mainstat = Stats.CD // Only Stats.HP is allowed for Type Flower!
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('mainstat'));
    })
    
    test('Should return 400 if any substat is invalid', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest()
        httpRequest.substats![3].substat = 'invalid_substat' as Stats;
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('substat: invalid_substat'));
    }) 
    
    test('Should return 400 if any substat value is invalid', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest()
        httpRequest.substats![3] = {substat: Stats.DEFFlat, value: 0}; // Def flat substat value of zero cannot exist
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('substat value: DEF'));
    })
    
    test('Should return 400 if more than 4 substats are provided', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest()
        httpRequest.substats = [
            {substat: Stats.ATK, value: Math.round(upgradeTiers["ATK%"][0]*10)/10},
            {substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0])},
            {substat: Stats.DEF, value: Math.round(upgradeTiers["DEF%"][0]*10)/10},
            {substat: Stats.DEFFlat, value: Math.round(upgradeTiers.DEF[0])},
            {substat: Stats.EM, value: Math.round(upgradeTiers["Elemental Mastery"][0])}, // 5th substat cannot exist
        ]
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('# of substats'));
    })

    test('Should return 400 if substats values indicate more than 5 upgrade rolls', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest()
        httpRequest.substats = [
            {substat: Stats.ATK, value: Math.round(upgradeTiers["ATK%"][0]*3*10)/10},
            {substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0]*3)},
            {substat: Stats.DEF, value: Math.round(upgradeTiers["DEF%"][0]*3*10)/10},
            {substat: Stats.DEFFlat, value: Math.round(upgradeTiers.DEF[0]*3)}
        ]
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('Invalid # of rolls: 8'));
    })

    test('Should call AddArtifactDB with correct data', async () => {
        const { sut, addArtifactStub } = makeSut();
        const addArtifactSpy = jest.spyOn(addArtifactStub, 'add')
        const httpRequest = makeFakeRequest();
        await sut.handle(httpRequest);
        expect(addArtifactSpy).toHaveBeenCalledWith(httpRequest);
    })

    test('Should return 200 if valid data is provided', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(200);
        expect(httpResponse.body).toEqual(true);
    })
})