import { LogErrorRepository } from '.'

export class LogErrorRepositorySpy implements LogErrorRepository {
  stack: string | undefined

  async logError (stack: string): Promise<void> {
    this.stack = stack
  }
}