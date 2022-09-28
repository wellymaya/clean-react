import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';
import { faker } from '@faker-js/faker';
import { mockAuthentication } from '@/domain/test/mock-authentication';
import { InvalidCredentialsError } from '@/domain/erros/invalid-credentials-error';
import { HttpStatusCode } from '@/data/protocols/http/http-response';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClienSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClienSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClienSpy);
  return {
    sut,
    httpPostClienSpy,
  };
};

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with the correct URL', () => {
    const url = faker.internet.url();
    const { sut, httpPostClienSpy } = makeSut(url);
    sut.auth(mockAuthentication());
    expect(httpPostClienSpy.url).toBe(url);
  });
});

it('Should call HttpPostClient with the correct body', () => {
  const authenticationParams = mockAuthentication();
  const { sut, httpPostClienSpy } = makeSut();
  sut.auth(authenticationParams);

  expect(httpPostClienSpy.body).toEqual(authenticationParams);
});

it('Should throw InvalidCredentialsError if HttpPostClient returns 401 ', () => {
  const { sut, httpPostClienSpy } = makeSut();
  httpPostClienSpy.response = {
    statusCode: HttpStatusCode.unathorized,
  };
  const promise = sut.auth(mockAuthentication());

  expect(promise).rejects.toThrow(new InvalidCredentialsError());
});
