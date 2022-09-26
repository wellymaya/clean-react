import { HttpPostClientSpy } from '../../test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';
import { faker } from '@faker-js/faker';

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
    sut.auth();
    expect(httpPostClienSpy.url).toBe(url);
  });
});
