export class UnexpectedError extends Error {
  constructor() {
    super('Algo aconteceu. Tente novamente em breve');
    this.name = 'UnexpectedError';
  }
}
