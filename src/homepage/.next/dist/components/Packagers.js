'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Packager = require('./Packager');

var _Packager2 = _interopRequireDefault(_Packager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/i_van_hoorne/Documents/dev/webpack-dll/src/homepage/components/Packagers.js';


var Packagers = function (_React$PureComponent) {
  (0, _inherits3.default)(Packagers, _React$PureComponent);

  function Packagers() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Packagers);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Packagers.__proto__ || (0, _getPrototypeOf2.default)(Packagers)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      connected: false,
      data: {}
    }, _this.setupSocket = function () {
      _this.socket = new WebSocket('wss://webpack-dll-prod.herokuapp.com');

      _this.socket.onmessage = function (ev) {
        try {
          _this.setState({
            connected: true,
            data: (0, _extends3.default)({}, _this.state.data, JSON.parse(ev.data))
          });
        } catch (e) {
          console.error(e);
        }
      };

      _this.socket.onopen = function (ev) {
        _this.setState({ connected: true });
      };

      _this.socket.onclose = function (ev) {
        _this.setState({ connected: false }, function () {
          _this.setupSocket();
        });
      };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Packagers, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setupSocket();
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          connected = _state.connected,
          data = _state.data;

      if (!connected) return _react2.default.createElement('div', { style: { textAlign: 'center' }, __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        }
      }, 'Connecting...');

      return _react2.default.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '4rem'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        }
      }, (0, _keys2.default)(data).sort().map(function (packagerIp, index) {
        var packager = data[packagerIp];

        return _react2.default.createElement(_Packager2.default, {
          key: packagerIp,
          name: 'Packager ' + index,
          isAvailable: packager.isAvailable,
          lastUsed: packager.lastUsed,
          isBusy: packager.isBusyCount > 0,
          resolvedCount: packager.resolvedCount,
          errorCount: packager.errorCount,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 57
          }
        });
      }));
    }
  }]);

  return Packagers;
}(_react2.default.PureComponent);

exports.default = Packagers;