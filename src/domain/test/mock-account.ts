import { AuthenticationParams } from '@/domain/usecases/authentication';
import { faker } from '@faker-js/faker';
import { AccountModel } from '@/domain/models/account-model';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  acessToken: faker.random.alphaNumeric(),
});
