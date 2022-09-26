import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with the correct URL', () => {
    const url = 'any_url'
    const httpPostClienSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClienSpy)
    sut.auth()
    expect(httpPostClienSpy.url).toBe(url)
  })
})
