export type AddArtifactParams = {
    set: string
    type: string
    level: number
    mainstat: string
    substats: {substat: string, value: number}[]
}

export type AddArtifactResult = boolean