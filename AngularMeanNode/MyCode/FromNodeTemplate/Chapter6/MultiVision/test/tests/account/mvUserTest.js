// Name module
describe('mvUser', function () {
    // Invoke module
    beforeEach(module('app'));

    // Name test
    describe('isAdmin', function () {
       it('should return false if the roles array does not have an admin entry', inject(function (mvUser) {
           var user = new mvUser();
           user.roles = ['not admin'];
           expect(user.isAdmin()).to.be.falsey;
       }))
    });


});