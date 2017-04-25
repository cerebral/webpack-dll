'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('styled-jsx/style.js');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/i_van_hoorne/Documents/dev/webpack-dll/src/homepage/components/Packager.js';

exports.default = function (_ref) {
  var name = _ref.name,
      isAvailable = _ref.isAvailable,
      lastUsed = _ref.lastUsed,
      resolvedCount = _ref.resolvedCount,
      errorCount = _ref.errorCount;

  var color = isAvailable ? 'rgba(39, 174, 96,1.0)' : 'rgba(230, 126, 34,1.0)';

  return _react2.default.createElement('div', {
    style: {
      color: color,
      borderBottom: '3px solid ' + color
    },
    className: 'packager',
    'data-jsx': 1740500944,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }, _react2.default.createElement(_style2.default, {
    styleId: 1740500944,
    css: '.packager[data-jsx="1740500944"] {-webkit-transition: 0.3s ease all;-moz-transition: 0.3s ease all;-ms-transition: 0.3s ease all;transition: 0.3s ease all;background-color: white;padding: 1rem;box-shadow: 0 2px 3px rgba(0,0,0,0.15);border-radius: 2px;width: 200px;height: 100px;display:-webkit-flex; display:flex;-webkit-flex-direction: column;-moz-flex-direction: column;flex-direction: column;justify-content: center;align-items: center;}.date[data-jsx="1740500944"] {font-size: .75rem;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUGFja2FnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOEJrQixBQUNELGtDQUNpQix5SEFDRix3QkFDVixjQUN5Qix1Q0FDcEIsbUJBQ04sYUFDQyxjQUVBLG1DQUNTLGtGQUNDLHdCQUNKLG9CQUNyQixDQUVNLDhCQUNhLGtCQUNuQiIsImZpbGUiOiJjb21wb25lbnRzL1BhY2thZ2VyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9pX3Zhbl9ob29ybmUvRG9jdW1lbnRzL2Rldi93ZWJwYWNrLWRsbC9zcmMvaG9tZXBhZ2UiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxudHlwZSBQcm9wcyA9IHtcbiAgbmFtZTogc3RyaW5nLFxuICBpc0F2YWlsYWJsZTogYm9vbGVhbixcbiAgbGFzdFVzZWQ6IG51bWJlcixcbiAgcmVzb2x2ZWRDb3VudDogbnVtYmVyLFxuICBlcnJvckNvdW50OiBudW1iZXIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCAoe1xuICBuYW1lLFxuICBpc0F2YWlsYWJsZSxcbiAgbGFzdFVzZWQsXG4gIHJlc29sdmVkQ291bnQsXG4gIGVycm9yQ291bnQsXG59OiBQcm9wcykgPT4ge1xuICBjb25zdCBjb2xvciA9IGlzQXZhaWxhYmxlXG4gICAgPyAncmdiYSgzOSwgMTc0LCA5NiwxLjApJ1xuICAgIDogJ3JnYmEoMjMwLCAxMjYsIDM0LDEuMCknO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgY29sb3IsXG4gICAgICAgIGJvcmRlckJvdHRvbTogYDNweCBzb2xpZCAke2NvbG9yfWAsXG4gICAgICB9fVxuICAgICAgY2xhc3NOYW1lPVwicGFja2FnZXJcIlxuICAgID5cbiAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgIC5wYWNrYWdlciB7XG4gICAgICAgIHRyYW5zaXRpb246IDAuM3MgZWFzZSBhbGw7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgICAgICBwYWRkaW5nOiAxcmVtO1xuICAgICAgICBib3gtc2hhZG93OiAwIDJweCAzcHggcmdiYSgwLDAsMCwwLjE1KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICB3aWR0aDogMjAwcHg7XG4gICAgICAgIGhlaWdodDogMTAwcHg7XG5cbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICB9XG5cbiAgICAgIC5kYXRlIHtcbiAgICAgICAgZm9udC1zaXplOiAuNzVyZW07XG4gICAgICB9XG4gICAgYH08L3N0eWxlPlxuICAgICAgPGRpdj57bmFtZX08L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGF0ZVwiPlxuICAgICAgICBTdGF0dXM6XG4gICAgICAgIHsnICd9XG4gICAgICAgIDxzdHJvbmcgc3R5bGU9e3sgY29sb3I6IGNvbG9yIH19PlxuICAgICAgICAgIHtpc0F2YWlsYWJsZSA/ICdpZGxlJyA6ICdidW5kbGluZyd9XG4gICAgICAgIDwvc3Ryb25nPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImRhdGVcIj5cbiAgICAgICAgTGFzdCB1c2VkOiA8c3Ryb25nPntuZXcgRGF0ZShsYXN0VXNlZCkudG9Mb2NhbGVUaW1lU3RyaW5nKCl9PC9zdHJvbmc+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGF0ZVwiPlxuICAgICAgICBTdWNjZXNmdWwgYnVuZGxlczogPHN0cm9uZz57cmVzb2x2ZWRDb3VudH08L3N0cm9uZz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRlXCI+XG4gICAgICAgIE5vdCByZWFjaGVkOiA8c3Ryb25nPntlcnJvckNvdW50fTwvc3Ryb25nPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19 */\n/*@ sourceURL=components/Packager.js */'
  }), _react2.default.createElement('div', {
    'data-jsx': 1740500944,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    }
  }, name), _react2.default.createElement('div', { className: 'date', 'data-jsx': 1740500944,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    }
  }, 'Status:', ' ', _react2.default.createElement('strong', { style: { color: color }, 'data-jsx': 1740500944,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    }
  }, isAvailable ? 'idle' : 'bundling')), _react2.default.createElement('div', { className: 'date', 'data-jsx': 1740500944,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    }
  }, 'Last used: ', _react2.default.createElement('strong', {
    'data-jsx': 1740500944,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    }
  }, new Date(lastUsed).toLocaleTimeString())), _react2.default.createElement('div', { className: 'date', 'data-jsx': 1740500944,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    }
  }, 'Succesful bundles: ', _react2.default.createElement('strong', {
    'data-jsx': 1740500944,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    }
  }, resolvedCount)), _react2.default.createElement('div', { className: 'date', 'data-jsx': 1740500944,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65
    }
  }, 'Not reached: ', _react2.default.createElement('strong', {
    'data-jsx': 1740500944,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66
    }
  }, errorCount)));
};