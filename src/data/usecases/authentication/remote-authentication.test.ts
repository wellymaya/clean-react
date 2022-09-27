import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';
import { faker } from '@faker-js/faker';
import { mockAuthentication } from '@/domain/test/mock-authentication';

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
