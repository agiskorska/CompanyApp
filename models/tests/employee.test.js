const expect = require('chai').expect;
const mongoose = require('mongoose');
const Employee = require('../employee.model');

describe('Employee', () => {
  it('should not throw an error if all arguments are given', () => {
    const cases = [{firstName: 'aaa', lastName: 'aaa', department: 'aaa'}]
    const emp = new Employee(cases[0]);
    emp.validate(err => {
      expect(err).not.to.exist;
    })
  });

  it('should throw an error if either of the arguments is not given', () => {
    const cases = [
      {firstName: '', lastName: 'aaa', department: 'aaa'},
      {firstName: 'aaa', lastName: '', department: 'aaa'},
      {firstName: 'aaa', lastName: 'aaa', department: ''},
      {firstName: 'aaa', lastName: '', department: ''},
      {firstName: '', lastName: '', department: 'aaa'},
      {firstName: '', lastName: 'aaa', department: ''},
      {firstName: '', lastName: '', department: ''}
    ]
    for (let obj of cases) {
      const emp = new Employee(obj);
      emp.validate( err => {
        expect(err.errors).to.exist;
      })
    }
  });

  it('should throw an error if any of the arguments is not a string', () => {
    const cases = [
      {firstName: {}, lastName: 'aaa', department: 'aaa'},
      {firstName: 'aaa', lastName: {}, department: 'aaa'},
      {firstName: 'aaa', lastName: 'aaa', department: {}},
      {firstName: 'aaa', lastName: '', department: ''},
      {firstName: [], lastName: 'ss', department: 'aaa'},
      {firstName: 'aa', lastName: [], department: 'dd'},
      {firstName: 'asdasd', lastName: 'sdasd', department: []}
    ]
    for (let obj of cases) {
      const emp = new Employee(obj);
      emp.validate( err => {
        expect(err.errors).to.exist;
      })
    }
  });
})

after(() => {
  mongoose.models = {};
});