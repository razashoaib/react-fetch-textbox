'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FetchTextBox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This component is contains the implementation of Fetch Texbox.

var FetchTextBox = exports.FetchTextBox = function (_Component) {
    _inherits(FetchTextBox, _Component);

    function FetchTextBox(props) {
        _classCallCheck(this, FetchTextBox);

        var _this = _possibleConstructorReturn(this, (FetchTextBox.__proto__ || Object.getPrototypeOf(FetchTextBox)).call(this, props));

        _this.state = {
            data: [],
            isLoading: false,
            value: '',
            hideSuggestions: false
        };
        return _this;
    }

    _createClass(FetchTextBox, [{
        key: 'logChange',
        value: function logChange(e) {
            this.setState({ value: e.target.value });
            if (this.state.value.length >= 2) this.fetchResults(e.target.value);
            try {
                this.sendTextBoxValue(e.target.value);
            } catch (ex) {}
        }
    }, {
        key: 'setTextboxValue',
        value: function setTextboxValue(e) {
            this.setState({ hideSuggestions: true, value: e.target.innerHTML });
            try {
                this.sendTextBoxValue(e.target.innerHTML);
            } catch (ex) {}
        }
    }, {
        key: 'sendTextBoxValue',
        value: function sendTextBoxValue(va) {
            this.props.sendData(va);
        }
    }, {
        key: 'fetchResults',
        value: function fetchResults(queryText) {
            var self = this;
            var header = new Headers({
                'Content-Type': 'application/json'
            });

            this.setState({ isLoading: true, hideSuggestions: false });

            fetch(this.props.url + queryText, {
                method: this.props.method
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data) {
                self.setState({ data: data[self.props.jsonArrayKey] != null ? data[self.props.jsonArrayKey] : [], isLoading: false });
            }).catch(function (err) {
                console.log('Error occurred', err);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var className = 'form-control';
            if (this.state.isLoading) {
                className += ' loading-state';
            }

            var suggestionsButtonStyleClassName = 'list-group-item list-group-item-action custom-item';

            if (this.state.hideSuggestions || this.state.value.length < 2) {
                suggestionsButtonStyleClassName = 'hidden';
            }

            return _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement('input', { id: 'fetch-textbox', value: this.state.value, onChange: this.logChange.bind(this), placeholder: 'Enter Value', type: 'text', className: className }),
                _react2.default.createElement(
                    'ul',
                    { className: 'list-group fetch-textbox-suggestions' },
                    this.state.data.map(function (item, key) {
                        return _react2.default.createElement(
                            'li',
                            { key: key, onClick: _this2.setTextboxValue.bind(_this2), className: suggestionsButtonStyleClassName },
                            item[_this2.props.fieldName]
                        );
                    })
                )
            );
        }
    }]);

    return FetchTextBox;
}(_react.Component);

exports.default = FetchTextBox;