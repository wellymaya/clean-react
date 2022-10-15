import { AxiosHttpClient } from './axios-http-client';
import { faker } from '@faker-js/faker';
import { HttpPostParams } from '@/data/protocols/http';
import { mockAxios } from './../test/mock-axios';
import axios from 'axios';
import { mockPostRequest } from '@/data/test/mock-http-post';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

  return { sut, mockedAxios };
};

describe('AxiosHttpClient', () => {
  it('Should call axios with the correct values', async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  it('Should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut();
    const promise = sut.post(mockPostRequest());

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
