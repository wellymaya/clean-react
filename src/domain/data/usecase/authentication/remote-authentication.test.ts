import { HttpPostClient } from '../../protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with the correct URL', () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string

      async post(url: string): Promise<void> {
        this.url = url

        return Promise.resolve()
      }
    }
    const url = 'any_url'
    const httpPostClienSpy = new HttpPostClientSpy()

    const sut = new RemoteAuthentication(url, httpPostClienSpy)
    sut.auth()
    expect(httpPostClienSpy.url).toBe(url)
  })
})
