import { Artifact } from "./artifact"
import { upgradeTiers } from "./chances"
import { Sets, Stats, Types } from "./enums"
import { makeArtifactValidation } from '../../../validation/validators/artifact-validation'

const makeSut = () => {
    const sut = new Artifact()
    sut.import({
        set: Sets.AP,
        type: Types.Flower,
        level: 20,
        mainstat: Stats.HPFlat,
        substats: [
            {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]*3},
            {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]*2},
            {substat: Stats.CD, value: upgradeTiers["CRIT DMG%"][0]},
            {substat: Stats.CR, value: upgradeTiers["CRIT Rate%"][0]*2}
        ]
    })
    const validation = makeArtifactValidation()
    return { sut, validation }
}

describe ('Artifact Util', () => {
    describe ('Validate', () => {
        test('Should return null on success', () => {
            const { sut, validation } = makeSut()
            const isInvalid = sut.validate(validation)
            expect(isInvalid).toBeNull()
        })
    })
})