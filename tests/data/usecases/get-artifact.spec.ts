import { GetArtifactParams, GetArtifactResults } from '@/domain/artifact/usecases/crud-artifact'
import { upgradeTiers } from '@/data/artifact/utils/chances'
import { Sets, Stats, Types } from '@/data/artifact/utils/enums'
import { GetArtifactDB } from '@/data/artifact/usecases/get-artifact'

import { mock, MockProxy } from 'jest-mock-extended'
import { GetArtifactRepo } from '@/data/artifact/protocols'

const makeFakeRepoResponse: GetArtifactResults = {
  found: [{
    userid: 'valid_userid',
    dtAdded: 'valid_date',
    set: Sets.AP,
    type: Types.Flower,
    level: 0,
    mainstat: Stats.HPFlat,
    mainstatValue: 717,
    substats: [
      { substat: Stats.ATK, value: upgradeTiers['ATK%'][0] },
      { substat: Stats.ATKFlat, value: upgradeTiers.ATK[0] },
      { substat: Stats.CD, value: upgradeTiers['CRIT DMG%'][0] }
    ],
    scoreDflt: 200
  }],
  notFound: []
}

describe('Get-Artifact-DB Usecase', () => {
  let sut: GetArtifactDB
  let getArtifactRepoSpy: MockProxy<GetArtifactRepo>
  const validKeys: GetArtifactParams = {
    keys: [{ userid: 'valid_userid', dtAdded: 'valid_date' }]
  }

  beforeAll(() => {
    getArtifactRepoSpy = mock()
    getArtifactRepoSpy.get.mockReturnValue(new Promise(resolve => resolve([{
      userid: 'valid_userid',
      set: Sets.AP,
      type: Types.Flower,
      level: 0,
      mainstat: Stats.HPFlat,
      mainstatValue: 717,
      substats: [
        { substat: Stats.ATK, value: upgradeTiers['ATK%'][0] },
        { substat: Stats.ATKFlat, value: upgradeTiers.ATK[0] },
        { substat: Stats.CD, value: upgradeTiers['CRIT DMG%'][0] }
      ],
      scoreDflt: 200,
      scoreMainstat: 100,
      scoreSubstats: 100,
      scoreLvl20Min: 500,
      scoreLvl20Avg: 600,
      scoreLvl20Max: 700,
      scoreLvl20SD: 50,
      dtAdded: 'valid_date',
      dtModified: new Date('August 17, 2021 03:24:00').toISOString()
    }])))
  })

  beforeEach(() => {
    sut = new GetArtifactDB(getArtifactRepoSpy)
  })

  it('Should call GetArtifactRepo with correct values', async () => {
    await sut.get(validKeys)
    expect(getArtifactRepoSpy.get).toHaveBeenCalledTimes(1)
    expect(getArtifactRepoSpy.get).toHaveBeenCalledWith(validKeys)
  })

  it('Should throw if GetArtifactRepo throws', async () => {
    getArtifactRepoSpy.get.mockRejectedValueOnce(new Error('GetArtifactRepo'))
    const promise = sut.get(validKeys)
    await expect(promise).rejects.toThrow(new Error('GetArtifactRepo'))
  })

  it('Should return empty array on Found and id on notFound if no id was found', async () => {
    const expectedReturn: GetArtifactResults = { found: [], notFound: [{ userid: 'valid_userid', dtAdded: 'valid_date' }] }
    getArtifactRepoSpy.get.mockRejectedValueOnce(expectedReturn)
    const response = await sut.get(validKeys)
    expect(response).toEqual(expectedReturn)
  })

  it('Should return empty array on notFound and data on Found if id was found', async () => {
    const response = await sut.get(validKeys)
    expect(response).toEqual(makeFakeRepoResponse)
  })

  it('Should return correct data if just some ids were found', async () => {
    const ids = {
      keys: [
        { userid: 'valid_userid', dtAdded: 'invalid_date1' },
        { userid: 'valid_userid', dtAdded: 'valid_date' },
        { userid: 'valid_userid', dtAdded: 'invalid_date2' }
      ]
    }
    const response = await sut.get(ids)
    expect(response).toEqual({
      found: [{
        userid: 'valid_userid',
        dtAdded: 'valid_date',
        set: Sets.AP,
        type: Types.Flower,
        level: 0,
        mainstat: Stats.HPFlat,
        mainstatValue: 717,
        substats: [
          { substat: Stats.ATK, value: upgradeTiers['ATK%'][0] },
          { substat: Stats.ATKFlat, value: upgradeTiers.ATK[0] },
          { substat: Stats.CD, value: upgradeTiers['CRIT DMG%'][0] }
        ],
        scoreDflt: 200
      }],
      notFound: [
        { userid: 'valid_userid', dtAdded: 'invalid_date1' },
        { userid: 'valid_userid', dtAdded: 'invalid_date2' }
      ]
    }
    )
  })
})
