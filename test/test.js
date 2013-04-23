/*global, describe, before, it */


describe('Creating a new User', function() {

    //
    'use strict';

    var user;

    before(function(done) {
        user = {
            username: 1
        };
    });

    it('should have a username', function() {
        user.should.have.property('username', 'test');
    });


});