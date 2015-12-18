'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('./');

var _2 = _interopRequireDefault(_);

// this ensures the cookie is never written
var fakeCookie = {
  load: function load() {},
  save: function save() {}
};
exports['default'] = _react2['default'].createElement(_2['default'], { reactCookieInstance: fakeCookie });
module.exports = exports['default'];