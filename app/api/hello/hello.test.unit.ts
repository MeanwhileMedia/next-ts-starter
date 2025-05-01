import { expect } from 'chai';
import sinon from 'sinon';
import {GET} from './route';

sinon.stub(global, 'fetch').callsFake(async ():Promise<Response> => {
  return new Promise((resolve) => {
    resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ foo: 'bar' }),
    } as Response | PromiseLike<Response>);
  });
})

describe('api/hello endpoint', () => {
  
  it('should fail with status 500 and provide an error when USER_API environment variable is missing', async () => {
    const res = await GET({} as any);
    expect(res instanceof Response).to.be.equal(true);
    expect(res.status).to.be.equal(500);
    expect(res.statusText).to.be.equal('Missing USER_API environment variables');
  });

  it('should succeed with status 200 when USER_API environment variable is defined', async () => {
    process.env['USER_API_ID'] = 'mockApiKeyForTesting';
    process.env['USER_API_KEY'] = 'mockApiKeyForTesting';
    const res = await GET({} as any);
    expect(res instanceof Response).to.be.equal(true);
    expect(res.status).to.be.equal(200);
    const resData = await res.json();
    expect(resData.foo).to.be.equal('bar');
  });

  it('should fail with status 500 and provide an error when the fetch function fails', async () => {
    sinon.restore();
    sinon.stub(global, 'fetch').callsFake(async ():Promise<Response> => {
      throw new Error('Network error');
    });
    const res = await GET({} as any);
    expect(res instanceof Response).to.be.equal(true);
    expect(res.status).to.be.equal(500);
    expect(res.statusText).to.be.equal('Error fetching data from Users API');    
  });

});