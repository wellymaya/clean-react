import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClienSpy: HttpPostClientSpy
}

const makeSut = (url: string = ''): SutTypes => {
  const httpPostClienSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClienSpy)
  return {
    sut,
    httpPostClienSpy,
  }
}

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with the correct URL', () => {
    const url = 'any_url'
    const { sut, httpPostClienSpy } = makeSut(url)
    sut.auth()
    expect(httpPostClienSpy.url).toBe(url)
  })
})
