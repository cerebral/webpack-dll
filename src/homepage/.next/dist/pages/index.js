'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('styled-jsx/style.js');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Answer = require('../components/Answer');

var _Answer2 = _interopRequireDefault(_Answer);

var _Packagers = require('../components/Packagers');

var _Packagers2 = _interopRequireDefault(_Packagers);

var _styledComponents = require('styled-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/i_van_hoorne/Documents/dev/webpack-dll/src/homepage/pages/index.js?entry';

exports.default = function () {
  return _react2.default.createElement('div', {
    'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, _react2.default.createElement(_style2.default, {
    styleId: 987760852,
    css: 'h1[data-jsx="987760852"] {text-align: center;font-weight: 400;color: #585E64;font-size: 3rem;margin-top: 4rem;margin-bottom: 0;}h2[data-jsx="987760852"] {text-align: center;font-weight: 300;color: #7A8490;margin-top: 0;margin-bottom: 4rem;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzP2VudHJ5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9nQixBQUNOLDBCQUNpQixtQkFDRixpQkFDRixlQUNDLGdCQUNDLGlCQUNBLGlCQUNsQixDQUVHLDBCQUNpQixtQkFDRixpQkFDRixlQUNELGNBQ00sb0JBQ3JCIiwiZmlsZSI6InBhZ2VzL2luZGV4LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9pX3Zhbl9ob29ybmUvRG9jdW1lbnRzL2Rldi93ZWJwYWNrLWRsbC9zcmMvaG9tZXBhZ2UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEFuc3dlciBmcm9tICcuLi9jb21wb25lbnRzL0Fuc3dlcic7XG5pbXBvcnQgUGFja2FnZXJzIGZyb20gJy4uL2NvbXBvbmVudHMvUGFja2FnZXJzJztcbmltcG9ydCB7IGluamVjdEdsb2JhbCB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4gKFxuICA8ZGl2PlxuICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgIGgxIHtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBmb250LXdlaWdodDogNDAwO1xuICAgICAgICBjb2xvcjogIzU4NUU2NDtcbiAgICAgICAgZm9udC1zaXplOiAzcmVtO1xuICAgICAgICBtYXJnaW4tdG9wOiA0cmVtO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgfVxuXG4gICAgICBoMiB7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgY29sb3I6ICM3QTg0OTA7XG4gICAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDRyZW07XG4gICAgICB9XG5cblxuICAgIGB9PC9zdHlsZT5cbiAgICA8aDE+TlBNIFBhY2thZ2VyIFNlcnZpY2U8L2gxPlxuICAgIDxoMj5DcmVhdGUgYSBjb25zdW1hYmxlIHNjcmlwdCBmcm9tIGFueSBjb21iaW5hdGlvbiBvZiBkZXBlbmRlbmNpZXM8L2gyPlxuXG4gICAgPEFuc3dlciBxdWVzdGlvbj1cIldoYXQgaXMgdGhpcz9cIj5cbiAgICAgIFRoaXMgaXMgYSBwYWNrYWdlIGJ1bmRsZXIsIGl0IGJ1aWxkcyBhIFVNRCBidWlsZCBvZiBhIGNvbWJpbmF0aW9uIG9mIHBhY2thZ2VzIHdoaWNoIHlvdSBjYW4gdXNlIGFzIERMTCBwbHVnaW4gb3IgYXMgYVxuICAgICAgd2F5IHRvIGluY2x1ZGUgTlBNIGRlcGVuZGVuY2llcyBpbiBhbiBvbmxpbmUgZWRpdG9yLiBJdCBjb25zaXN0cyBvZiB0d28gcGFydHM6IGEgZGxsIHNlcnZpY2UgYW5kIHRoZSBwYWNrYWdlcnMuIFRoZSBkbGwgc2VydmljZSBhY3RzXG4gICAgICBhcyBhIGxvYWQgYmFsYW5jZXIgdGhhdCByb3V0ZXMgdGhlIHJlcXVlc3RzIHRvIHRoZSBhcHByb3ByaWF0ZSBwYWNrYWdlcnMuIEl0J3MgdXNlZCBieVxuICAgICAgeycgJ31cbiAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL3dlYnBhY2tiaW4uY29tXCI+V2VicGFja0JpbjwvYT5cbiAgICAgIHsnICd9XG4gICAgICBhbmRcbiAgICAgIHsnICd9XG4gICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly9jb2Rlc2FuZGJveC5pb1wiPkNvZGVTYW5kYm94PC9hPlxuICAgICAgLlxuICAgIDwvQW5zd2VyPlxuXG4gICAgPEFuc3dlciBxdWVzdGlvbj1cIkNhbiBJIHVzZSBpdD9cIj5cbiAgICAgIFllcyB5b3UgY2FuISBXZSBlbmNvdXJhZ2UgeW91IHRvIGFkZCBhIHBhY2thZ2VyIChjaGVja1xuICAgICAgeycgJ31cbiAgICAgIDxhIGhyZWY9XCIjY2FuaWhlbHBcIj5DYW4gSSBoZWxwPzwvYT5cbiAgICAgICkgd2hlbiB5b3UgbWFrZSBleHRlbnNpdmUgdXNlIG9mIGl0LlxuICAgICAgPHA+XG4gICAgICAgIFlvdSBjYW4gZ2V0IGEgYnVuZGxlIGJ5IHJlcXVlc3Rpbmc6XG4gICAgICAgIDxiciAvPlxuICAgICAgICA8Y29kZT5cbiAgICAgICAgICBodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvd2VicGFjay92Mi9cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogJ3JnYmEoNTIsIDE1MiwgMjE5LDEuMCknIH19PlxuICAgICAgICAgICAgZGVwQHZlcnNpb24rZGVwMkB2ZXJzaW9uXG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIC88c3BhbiBzdHlsZT17eyBjb2xvcjogJ3JnYmEoNDYsIDIwNCwgMTEzLDEuMCknIH19PmRsbC5qczwvc3Bhbj5cbiAgICAgICAgPC9jb2RlPlxuICAgICAgICA8YnIgLz5cbiAgICAgICAgPGJyIC8+XG5cbiAgICAgICAgRXhhbXBsZTpcbiAgICAgICAgPGJyIC8+XG4gICAgICAgIDxjb2RlPlxuICAgICAgICAgIGh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC93ZWJwYWNrL3YyL1xuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAncmdiYSg1MiwgMTUyLCAyMTksMS4wKScgfX0+XG4gICAgICAgICAgICByZWFjdEAxNS41LjMrcmVhY3QtZG9tQDE1LjUuM1xuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAvPHNwYW4gc3R5bGU9e3sgY29sb3I6ICdyZ2JhKDQ2LCAyMDQsIDExMywxLjApJyB9fT5kbGwuanM8L3NwYW4+XG4gICAgICAgIDwvY29kZT5cbiAgICAgIDwvcD5cblxuICAgICAgVG8gcmVxdWVzdCBhIG1hbmlmZXN0IHlvdSBjYW4gcmVwbGFjZSB0aGVcbiAgICAgIHsnICd9XG4gICAgICA8Y29kZT5kbGwuanM8L2NvZGU+XG4gICAgICB7JyAnfVxuICAgICAgdG9cbiAgICAgIHsnICd9XG4gICAgICA8Y29kZT5tYW5pZmVzdC5qc29uPC9jb2RlPi5cbiAgICA8L0Fuc3dlcj5cblxuICAgIDxBbnN3ZXIgaWQ9XCJjYW5paGVscFwiIHF1ZXN0aW9uPVwiQ2FuIEkgaGVscD9cIj5cbiAgICAgIFllcyEgWW91IGNhbiBhbHNvIGhlbHAgYnkgaG9zdGluZyB5b3VyIG93biBwYWNrYWdlciBzZXJ2aWNlLiBUaGlzIGlzIGEgZmFpcmx5XG4gICAgICBzdHJhaWdodGZvcndhcmQgcHJvY2VzcyBhbmQgaGVscHMgdGhlIHNlcnZpY2Ugc2NhbGUuIEZvbGxvdyB0aGUgaW5zdHJ1Y3Rpb25zXG4gICAgICB7JyAnfVxuICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9jZXJlYnJhbC93ZWJwYWNrLXBhY2thZ2VyXCI+XG4gICAgICAgIGhlcmVcbiAgICAgIDwvYT5cbiAgICAgIHsnICd9XG4gICAgICBhbmQgc2VuZCBhIG1lc3NhZ2UgdG9cbiAgICAgIHsnICd9XG4gICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly90d2l0dGVyLmNvbS9jaHJpc3RpYW5hbGZvbmlcIj5cbiAgICAgICAgQ2hyaXN0aWFuXG4gICAgICA8L2E+XG4gICAgICB7JyAnfVxuICAgICAgb3JcbiAgICAgIHsnICd9XG4gICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly90d2l0dGVyLmNvbS9JdmVzMTNcIj5JdmVzPC9hPlxuICAgICAgeycgJ31cbiAgICAgIHRvIGFkZCB5b3VyIHBhY2thZ2VyIHRvIHRoZSBETEwgc2VydmljZSFcblxuICAgICAgPGJyIC8+XG4gICAgICA8YnIgLz5cblxuICAgICAgSWYgeW91IHdhbnQgdG8gaW1wcm92ZSB0aGUgc3BlZWQgb3IgY29tcGF0aWJpbGl0eSB3aXRoIGRlcGVuZGVuY2llcyB5b3UgY2FuIGhlbHBcbiAgICAgIGJ5IGNvbnRyaWJ1dGluZyB0byB0aGUgc291cmNlIG9uIEdpdEh1YjpcbiAgICAgIHsnICd9XG4gICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2NlcmVicmFsL3dlYnBhY2stcGFja2FnZXJcIj5cbiAgICAgICAgUGFja2FnZXJcbiAgICAgIDwvYT5cbiAgICAgICxcbiAgICAgIHsnICd9XG4gICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2NlcmVicmFsL3dlYnBhY2stZGxsXCI+XG4gICAgICAgIERMTCBzZXJ2aWNlXG4gICAgICA8L2E+XG4gICAgICAuXG4gICAgPC9BbnN3ZXI+XG5cbiAgICA8aDIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMXJlbScsIG1hcmdpblRvcDogJzRyZW0nIH19PlxuICAgICAgUGFja2FnZXIgU3RhdHVzXG4gICAgPC9oMj5cbiAgICA8UGFja2FnZXJzIC8+XG4gIDwvZGl2PlxuKTtcbiJdfQ== */\n/*@ sourceURL=pages/index.js?entry */'
  }), _react2.default.createElement('h1', {
    'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    }
  }, 'NPM Packager Service'), _react2.default.createElement('h2', {
    'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }, 'Create a consumable script from any combination of dependencies'), _react2.default.createElement(_Answer2.default, { question: 'What is this?', __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    }
  }, 'This is a package bundler, it builds a UMD build of a combination of packages which you can use as DLL plugin or as a way to include NPM dependencies in an online editor. It consists of two parts: a dll service and the packagers. The dll service acts as a load balancer that routes the requests to the appropriate packagers. It\'s used by', ' ', _react2.default.createElement('a', { target: '_blank', href: 'https://webpackbin.com', 'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    }
  }, 'WebpackBin'), ' ', 'and', ' ', _react2.default.createElement('a', { target: '_blank', href: 'https://codesandbox.io', 'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    }
  }, 'CodeSandbox'), '.'), _react2.default.createElement(_Answer2.default, { question: 'Can I use it?', __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    }
  }, 'Yes you can! We encourage you to add a packager (check', ' ', _react2.default.createElement('a', { href: '#canihelp', 'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    }
  }, 'Can I help?'), ') when you make extensive use of it.', _react2.default.createElement('p', {
    'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    }
  }, 'You can get a bundle by requesting:', _react2.default.createElement('br', {
    'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    }
  }), _react2.default.createElement('code', {
    'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    }
  }, 'https://cdn.jsdelivr.net/webpack/v2/', _react2.default.createElement('span', { style: { color: 'rgba(52, 152, 219,1.0)' }, 'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    }
  }, 'dep@version+dep2@version'), '/', _react2.default.createElement('span', { style: { color: 'rgba(46, 204, 113,1.0)' }, 'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    }
  }, 'dll.js')), _react2.default.createElement('br', {
    'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    }
  }), _react2.default.createElement('br', {
    'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    }
  }), 'Example:', _react2.default.createElement('br', {
    'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    }
  }), _react2.default.createElement('code', {
    'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    }
  }, 'https://cdn.jsdelivr.net/webpack/v2/', _react2.default.createElement('span', { style: { color: 'rgba(52, 152, 219,1.0)' }, 'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66
    }
  }, 'react@15.5.3+react-dom@15.5.3'), '/', _react2.default.createElement('span', { style: { color: 'rgba(46, 204, 113,1.0)' }, 'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    }
  }, 'dll.js'))), 'To request a manifest you can replace the', ' ', _react2.default.createElement('code', {
    'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    }
  }, 'dll.js'), ' ', 'to', ' ', _react2.default.createElement('code', {
    'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    }
  }, 'manifest.json'), '.'), _react2.default.createElement(_Answer2.default, { id: 'canihelp', question: 'Can I help?', __source: {
      fileName: _jsxFileName,
      lineNumber: 82
    }
  }, 'Yes! You can also help by hosting your own packager service. This is a fairly straightforward process and helps the service scale. Follow the instructions', ' ', _react2.default.createElement('a', { target: '_blank', href: 'https://github.com/cerebral/webpack-packager', 'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86
    }
  }, 'here'), ' ', 'and send a message to', ' ', _react2.default.createElement('a', { target: '_blank', href: 'https://twitter.com/christianalfoni', 'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92
    }
  }, 'Christian'), ' ', 'or', ' ', _react2.default.createElement('a', { target: '_blank', href: 'https://twitter.com/Ives13', 'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98
    }
  }, 'Ives'), ' ', 'to add your packager to the DLL service!', _react2.default.createElement('br', {
    'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102
    }
  }), _react2.default.createElement('br', {
    'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103
    }
  }), 'If you want to improve the speed or compatibility with dependencies you can help by contributing to the source on GitHub:', ' ', _react2.default.createElement('a', { target: '_blank', href: 'https://github.com/cerebral/webpack-packager', 'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108
    }
  }, 'Packager'), ',', ' ', _react2.default.createElement('a', { target: '_blank', href: 'https://github.com/cerebral/webpack-dll', 'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113
    }
  }, 'DLL service'), '.'), _react2.default.createElement('h2', { style: { marginBottom: '1rem', marginTop: '4rem' }, 'data-jsx': 987760852,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119
    }
  }, 'Packager Status'), _react2.default.createElement(_Packagers2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122
    }
  }));
};