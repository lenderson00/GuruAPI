import { upgradeTiers } from "../utils/chances"
import { Sets, Types, Stats } from "../utils/enums"
import {
    AddArtifactRepo, AddArtifactRepoParams, AddArtifactRepoResult,
    GetArtifactRepo, GetArtifactRepoParams, GetArtifactRepoResults,
    UpdArtifactRepo, UpdArtifactRepoParams, UpdArtifactRepoResult } from "../protocols"

export class addArtifactRepoSpy implements AddArtifactRepo {
    params!: AddArtifactRepoParams
    result = true
    
    async add (addParams: AddArtifactRepoParams): Promise<AddArtifactRepoResult> {
        this.params = addParams
        return new Promise((res) => res(true as AddArtifactRepoResult))
    }
}

export class getArtifactRepoSpy implements GetArtifactRepo {
    
    params!: GetArtifactRepoParams
    result = true
    
    async get (artifactData: GetArtifactRepoParams): Promise<GetArtifactRepoResults> {
        this.params = artifactData
        return new Promise((res) => res(new Promise((res) => res([{
            id: 'valid_id',
            set: Sets.AP,
            type: Types.Flower,
            level: 0,
            mainstat: Stats.HPFlat,
            mainstatValue: 717,
            substats: [
                {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
                {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
                {substat: Stats.CD, value: upgradeTiers["CRIT DMG%"][0]}
            ],
            scoreDflt: 200,
            scoreMainstat: 100,
            scoreSubstats: 100,
            scoreLvl20Min: 500,
            scoreLvl20Avg: 600,
            scoreLvl20Max: 700,
            scoreLvl20SD: 50,
            dtAdded: new Date('December 17, 2020 03:24:00'),
            dtModified: new Date('August 17, 2021 03:24:00'),
        }]))))
    }

    async getFull (artifactData: GetArtifactRepoParams): Promise<GetArtifactRepoResults> {
        this.params = artifactData
        return new Promise((res) => res(new Promise((res) => res([{
            id: 'valid_id',
            set: Sets.AP,
            type: Types.Flower,
            level: 20,
            mainstat: Stats.ATKFlat,
            mainstatValue: 311,
            substats: [{substat: Stats.CD, value: Math.round(upgradeTiers[Stats.CD][3])}],
            scoreDflt: 200,
            
            scoreDfltMainstat: 100,
            scoreDfltSubstats: 100,
            scoreDfltLvl20Min: 500,
            scoreDfltLvl20Avg: 600,
            scoreDfltLvl20Max: 700,
            scoreDfltLvl20SD: 50,
            dtAdded: new Date('December 17, 2020 03:24:00'),
            dtModified: new Date('August 17, 2021 03:24:00'),
        }]))))
    }
}

export class updArtifactRepoSpy implements UpdArtifactRepo {
    params!: UpdArtifactRepoParams
    result: UpdArtifactRepoResult = true
    
    async update (updParams: UpdArtifactRepoParams): Promise<UpdArtifactRepoResult> {
        this.params = updParams
        return new Promise((res) => res(this.result))
    }
}