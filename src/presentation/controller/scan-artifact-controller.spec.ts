import { throwError } from "../../../tests/mocks/test-helper";
import { ScanArtifactRepo, ScanArtifactRepoResult } from "../../data/artifact/protocols/scan-artifact-repo";
import { upgradeTiers } from "../../data/artifact/utils/chances";
import { Sets, Stats, Types } from "../../data/artifact/utils/enums";
import { ServerError } from "../errors";
import { serverError } from "../helpers";
import { ScanArtifactController } from "./scan-artifact-controller";

const makeSut = () => {
    const scanArtifactRepoStub: ScanArtifactRepo = {
        scan: async () => {
            return new Promise((res) => res(mockAddArtifactParams()))
        }
    }
    const sut = new ScanArtifactController(scanArtifactRepoStub)
    return { sut, scanArtifactRepoStub }
}

const mockAddArtifactParams = (): ScanArtifactRepoResult => ([{
    userid: 'any_userid',
    set: Sets.AP,
    type: Types.Flower,
    level: 0,
    mainstat: Stats.HPFlat,
    mainstatValue: 717,
    substats: [
        {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
        {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
        {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
        {substat: Stats.DEFFlat, value: upgradeTiers.DEF[0]},
    ],
    scoreDflt: 0,
    scoreDfltMainstat: 0,
    scoreDfltSubstats: 0,
    scoreDfltLvl20Min: 0,
    scoreDfltLvl20Avg: 0,
    scoreDfltLvl20Max: 0,
    scoreDfltLvl20SD: 0,
    dtAdded: 'any_date',
    dtModified: 'any_date',
}])

describe ('Scan Artifact Controller', () => {

    test('Should call ScanArtifactRepo with correct data', async () => {
        const { sut, scanArtifactRepoStub } = makeSut();
        const scanArtifactSpy = jest.spyOn(scanArtifactRepoStub, 'scan')
        const httpRequest = { userid: 'any_userid' }
        await sut.handle(httpRequest);
        expect(scanArtifactSpy).toHaveBeenCalledWith(httpRequest);
    })

    test('Should return 500 if ScanArtifactRepo throws', async () => {
        const { sut, scanArtifactRepoStub } = makeSut();
        jest.spyOn(scanArtifactRepoStub, 'scan').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle({ userid: 'any_userid' });
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })

    test('Should return 200 if valid data is provided', async () => {
        const { sut } = makeSut();
        const httpRequest = { userid: 'any_userid' }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(200);
        expect(httpResponse.body).toEqual(mockAddArtifactParams());
    })
})