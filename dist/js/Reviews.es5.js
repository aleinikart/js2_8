"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Reviews =
/*#__PURE__*/
function () {
  function Reviews(source) {
    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#revblock';

    _classCallCheck(this, Reviews);

    this.source = source;
    this.container = container;
    this.revItems = [];

    this._init();

    this._addReview();

    this._approve();

    this._deletRev();
  }

  _createClass(Reviews, [{
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(this.source).then(function (result) {
                  return result.json();
                }).then(function (data) {
                  var _iteratorNormalCompletion = true;
                  var _didIteratorError = false;
                  var _iteratorError = undefined;

                  try {
                    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var review = _step.value;

                      _this.revItems.push(review);

                      _this._renderReview(review);
                    }
                  } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                      }
                    } finally {
                      if (_didIteratorError) {
                        throw _iteratorError;
                      }
                    }
                  }

                  console.log(_this.revItems);
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _init() {
        return _init2.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: "_renderReview",
    value: function _renderReview(review) {
      var newRev = new Review(review.id, review.author, review.text, review.isApproved);
    }
  }, {
    key: "_addReview",
    value: function _addReview() {
      var _this2 = this;

      $('#leaverev').on('submit', function (e) {
        e.preventDefault();
        var sentAuthor = $('#leaverev [name="name"]').val();
        var sentText = $('#leaverev [name="text"]').val();

        if (sentAuthor.match(/^[a-zа-яё \-]{2,}$/ig) !== null && sentText !== '') {
          var idReserved = [];
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = _this2.revItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var item = _step2.value;
              idReserved.push(item.id);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          Array.prototype.max = function () {
            return Math.max.apply(null, this);
          };

          var sentId = idReserved.max() + 1;
          var newRev = new Review(sentId, sentAuthor, sentText, false);

          _this2.revItems.push({
            id: sentId,
            author: sentAuthor,
            text: sentText,
            isApproved: false
          });

          console.log(_this2.revItems);
          $('#leaverev [name="name"]').val('');
          $('#leaverev [name="text"]').val('');
        }
      });
    }
  }, {
    key: "_approve",
    value: function _approve() {
      var _this3 = this;

      $('#revblock').on('click', '[data-approve="false"]', function (e) {
        var revId = +$(e.target).parents('.revitem').data('id');
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = _this3.revItems[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var item = _step3.value;

            if (item.id === revId) {
              item.isApproved = true;
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        $(e.currentTarget).attr("data-approve", "true");
        console.log(_this3.revItems);
      });
    }
  }, {
    key: "_deletRev",
    value: function _deletRev() {
      var _this4 = this;

      $('#revblock').on('click', '[data-delete]', function (e) {
        var revId = +$(e.target).parents('.revitem').data('id');
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = _this4.revItems[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var item = _step4.value;

            if (item.id === revId) {
              _this4.revItems = _this4.revItems.filter(function (item) {
                return item.id !== revId;
              });
              $(".revitem[data-id=\"".concat(item.id, "\"]")).remove();
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        console.log(_this4.revItems);
      });
    }
  }], [{
    key: "newRew",
    value: function () {
      var _newRew = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var rev;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                rev = new Reviews(source);
                _context2.next = 3;
                return rev._init();

              case 3:
                return _context2.abrupt("return", rev);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function newRew() {
        return _newRew.apply(this, arguments);
      }

      return newRew;
    }()
  }]);

  return Reviews;
}();

var Review =
/*#__PURE__*/
function () {
  function Review(id, author, text) {
    var isApproved = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var container = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '#revblock';

    _classCallCheck(this, Review);

    this.id = id;
    this.author = author;
    this.text = text;
    this.isApproved = isApproved;
    this.container = container;

    this._render();
  }

  _createClass(Review, [{
    key: "_render",
    value: function _render() {
      var $wrapper = $('<div/>', {
        class: 'revitem',
        "data-id": this.id
      });
      var $idnumber = $("<span class=\"revid\">\u041E\u0442\u0437\u044B\u0432 \u2116".concat(this.id, "</span>"));
      var $author = $('<strong/>', {
        class: 'author',
        text: this.author
      });
      var $text = $("<div class=\"text\"><p>".concat(this.text, "</p></div>"));
      var $approve = $("<div data-approve=\"".concat(this.isApproved, "\"><svg><use xlink:href=\"#check\"></svg></div>"));
      var $delete = $("<div data-delete><svg><use xlink:href=\"#trash\"></svg></div>");
      $idnumber.appendTo($wrapper);
      $author.appendTo($wrapper);
      $text.appendTo($wrapper);
      $approve.appendTo($wrapper);
      $delete.appendTo($wrapper);
      $(this.container).append($wrapper);
    }
  }]);

  return Review;
}();