import  request  from 'supertest';
import app from '../server'
describe('test to check',()=>{
    it('should send 200', (done)=>{
       request(app).get('/').end((err,res)=>{
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe('Hi world');
        done();
       })
        
    })
})


