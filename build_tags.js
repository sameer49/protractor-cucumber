var path = require('path');
var fs = require('fs-extra');

var tags = function () {

    this.buildTags = function () {
        return [`@Login or @SignUp`];
    }
}
module.exports = new tags();
