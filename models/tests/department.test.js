const expect = require('chai').expect;
const Department = require('../department.model.js');

describe('Department', () => {

  it('should throw an error if no "name" arg', () => {
    const dep = new Department({}); 

    dep.validate(err => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for(let name of cases) {
      const dep = new Department({ name });
  
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
  
    }  
  });

  it('should throw an error if "name" is shorter than 5 and longer than 20 char', () => {
    const cases = ['it', 'lorem ipsum asdfasdfasdf adfasdfsadf asdfafd'];
    for (let name of cases) {
      const dep = new Department({ name });
      dep.validate( err => {
        expect(err.errors.name).to.exist;
      })
    }
  });

  it('should not throw an error if "name" is correct', () => {
    const name = 'Department';
    const dep = new Department({ name });
    dep.validate(err => {
      expect(err).not.to.exist;
    })
  })

});