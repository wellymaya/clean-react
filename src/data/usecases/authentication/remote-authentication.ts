import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';
import { AuthenticationParams } from '@/domain/usecases/authentication';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/erros';
import { AccountModel } from '@/domain/models/account-model';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >
  ) {}
  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const htttpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (htttpResponse.statusCode) {
      case HttpStatusCode.ok:
        return htttpResponse.body;
      case HttpStatusCode.unathorized:
        throw new InvalidCredentialsError();
      case HttpStatusCode.badRequest:
        throw new UnexpectedError();
      default:
        throw new UnexpectedError();
    }
  }
}
