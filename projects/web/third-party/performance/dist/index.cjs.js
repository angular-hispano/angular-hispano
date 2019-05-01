'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('firebase/app');
var firebase = _interopDefault(require('@firebase/app'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var SDK_VERSION = '0.0.3';
/** The prefix for start User Timing marks used for creating Traces. */
var TRACE_START_MARK_PREFIX = 'FB-PERF-TRACE-START';
/** The prefix for stop User Timing marks used for creating Traces. */
var TRACE_STOP_MARK_PREFIX = 'FB-PERF-TRACE-STOP';
/** The prefix for User Timing measure used for creating Traces. */
var TRACE_MEASURE_PREFIX = 'FB-PERF-TRACE-MEASURE';
/** The prefix for out of the box page load Trace name. */
var OOB_TRACE_PAGE_LOAD_PREFIX = '_wt_';
var FIRST_PAINT_COUNTER_NAME = '_fp';
var FIRST_CONTENTFUL_PAINT_COUNTER_NAME = '_fcp';
var FIRST_INPUT_DELAY_COUNTER_NAME = '_fid';
var CONFIG_LOCAL_STORAGE_KEY = '@firebase/performance/config';
var CONFIG_EXPIRY_LOCAL_STORAGE_KEY = '@firebase/performance/configexpire';
var SERVICE = 'performance';
var SERVICE_NAME = 'Performance';

var ERROR_NAME = 'FirebaseError';
var captureStackTrace = Error
    .captureStackTrace;
var FirebaseError = /** @class */ (function () {
    function FirebaseError(code, message) {
        this.code = code;
        this.message = message;
        // We want the stack value, if implemented by Error
        if (captureStackTrace) {
            // Patches this.stack, omitted calls above ErrorFactory#create
            captureStackTrace(this, ErrorFactory.prototype.create);
        }
        else {
            try {
                // In case of IE11, stack will be set only after error is raised.
                // https://docs.microsoft.com/en-us/scripting/javascript/reference/stack-property-error-javascript
                throw Error.apply(this, arguments);
            }
            catch (err) {
                this.name = ERROR_NAME;
                // Make non-enumerable getter for the property.
                Object.defineProperty(this, 'stack', {
                    get: function () {
                        return err.stack;
                    }
                });
            }
        }
    }
    return FirebaseError;
}());
// Back-door inheritance
FirebaseError.prototype = Object.create(Error.prototype);
FirebaseError.prototype.constructor = FirebaseError;
FirebaseError.prototype.name = ERROR_NAME;
var ErrorFactory = /** @class */ (function () {
    function ErrorFactory(service, serviceName, errors) {
        this.service = service;
        this.serviceName = serviceName;
        this.errors = errors;
        // Matches {$name}, by default.
        this.pattern = /\{\$([^}]+)}/g;
        // empty
    }
    ErrorFactory.prototype.create = function (code, data) {
        if (data === undefined) {
            data = {};
        }
        var template = this.errors[code];
        var fullCode = this.service + '/' + code;
        var message;
        if (template === undefined) {
            message = 'Error';
        }
        else {
            message = template.replace(this.pattern, function (match, key) {
                var value = data[key];
                return value !== undefined ? value.toString() : '<' + key + '?>';
            });
        }
        // Service: Error message (service/code).
        message = this.serviceName + ': ' + message + ' (' + fullCode + ').';
        var err = new FirebaseError(fullCode, message);
        // Populate the Error object with message parts for programmatic
        // accesses (e.g., e.file).
        for (var prop in data) {
            if (!data.hasOwnProperty(prop) || prop.slice(-1) === '_') {
                continue;
            }
            err[prop] = data[prop];
        }
        return err;
    };
    return ErrorFactory;
}());

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Copyright 2011 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * @fileoverview Abstract cryptographic hash interface.
 *
 * See Sha1 and Md5 for sample implementations.
 *
 */
/**
 * Create a cryptographic hash instance.
 *
 * @constructor
 * @struct
 */
var Hash = /** @class */ (function () {
    function Hash() {
        /**
         * The block size for the hasher.
         * @type {number}
         */
        this.blockSize = -1;
    }
    return Hash;
}());

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview SHA-1 cryptographic hash.
 * Variable names follow the notation in FIPS PUB 180-3:
 * http://csrc.nist.gov/publications/fips/fips180-3/fips180-3_final.pdf.
 *
 * Usage:
 *   var sha1 = new sha1();
 *   sha1.update(bytes);
 *   var hash = sha1.digest();
 *
 * Performance:
 *   Chrome 23:   ~400 Mbit/s
 *   Firefox 16:  ~250 Mbit/s
 *
 */
/**
 * SHA-1 cryptographic hash constructor.
 *
 * The properties declared here are discussed in the above algorithm document.
 * @constructor
 * @extends {Hash}
 * @final
 * @struct
 */
var Sha1 = /** @class */ (function (_super) {
    __extends(Sha1, _super);
    function Sha1() {
        var _this = _super.call(this) || this;
        /**
         * Holds the previous values of accumulated variables a-e in the compress_
         * function.
         * @type {!Array<number>}
         * @private
         */
        _this.chain_ = [];
        /**
         * A buffer holding the partially computed hash result.
         * @type {!Array<number>}
         * @private
         */
        _this.buf_ = [];
        /**
         * An array of 80 bytes, each a part of the message to be hashed.  Referred to
         * as the message schedule in the docs.
         * @type {!Array<number>}
         * @private
         */
        _this.W_ = [];
        /**
         * Contains data needed to pad messages less than 64 bytes.
         * @type {!Array<number>}
         * @private
         */
        _this.pad_ = [];
        /**
         * @private {number}
         */
        _this.inbuf_ = 0;
        /**
         * @private {number}
         */
        _this.total_ = 0;
        _this.blockSize = 512 / 8;
        _this.pad_[0] = 128;
        for (var i = 1; i < _this.blockSize; ++i) {
            _this.pad_[i] = 0;
        }
        _this.reset();
        return _this;
    }
    Sha1.prototype.reset = function () {
        this.chain_[0] = 0x67452301;
        this.chain_[1] = 0xefcdab89;
        this.chain_[2] = 0x98badcfe;
        this.chain_[3] = 0x10325476;
        this.chain_[4] = 0xc3d2e1f0;
        this.inbuf_ = 0;
        this.total_ = 0;
    };
    /**
     * Internal compress helper function.
     * @param {!Array<number>|!Uint8Array|string} buf Block to compress.
     * @param {number=} opt_offset Offset of the block in the buffer.
     * @private
     */
    Sha1.prototype.compress_ = function (buf, opt_offset) {
        if (!opt_offset) {
            opt_offset = 0;
        }
        var W = this.W_;
        // get 16 big endian words
        if (typeof buf === 'string') {
            for (var i = 0; i < 16; i++) {
                // TODO(user): [bug 8140122] Recent versions of Safari for Mac OS and iOS
                // have a bug that turns the post-increment ++ operator into pre-increment
                // during JIT compilation.  We have code that depends heavily on SHA-1 for
                // correctness and which is affected by this bug, so I've removed all uses
                // of post-increment ++ in which the result value is used.  We can revert
                // this change once the Safari bug
                // (https://bugs.webkit.org/show_bug.cgi?id=109036) has been fixed and
                // most clients have been updated.
                W[i] =
                    (buf.charCodeAt(opt_offset) << 24) |
                        (buf.charCodeAt(opt_offset + 1) << 16) |
                        (buf.charCodeAt(opt_offset + 2) << 8) |
                        buf.charCodeAt(opt_offset + 3);
                opt_offset += 4;
            }
        }
        else {
            for (var i = 0; i < 16; i++) {
                W[i] =
                    (buf[opt_offset] << 24) |
                        (buf[opt_offset + 1] << 16) |
                        (buf[opt_offset + 2] << 8) |
                        buf[opt_offset + 3];
                opt_offset += 4;
            }
        }
        // expand to 80 words
        for (var i = 16; i < 80; i++) {
            var t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
            W[i] = ((t << 1) | (t >>> 31)) & 0xffffffff;
        }
        var a = this.chain_[0];
        var b = this.chain_[1];
        var c = this.chain_[2];
        var d = this.chain_[3];
        var e = this.chain_[4];
        var f, k;
        // TODO(user): Try to unroll this loop to speed up the computation.
        for (var i = 0; i < 80; i++) {
            if (i < 40) {
                if (i < 20) {
                    f = d ^ (b & (c ^ d));
                    k = 0x5a827999;
                }
                else {
                    f = b ^ c ^ d;
                    k = 0x6ed9eba1;
                }
            }
            else {
                if (i < 60) {
                    f = (b & c) | (d & (b | c));
                    k = 0x8f1bbcdc;
                }
                else {
                    f = b ^ c ^ d;
                    k = 0xca62c1d6;
                }
            }
            var t = (((a << 5) | (a >>> 27)) + f + e + k + W[i]) & 0xffffffff;
            e = d;
            d = c;
            c = ((b << 30) | (b >>> 2)) & 0xffffffff;
            b = a;
            a = t;
        }
        this.chain_[0] = (this.chain_[0] + a) & 0xffffffff;
        this.chain_[1] = (this.chain_[1] + b) & 0xffffffff;
        this.chain_[2] = (this.chain_[2] + c) & 0xffffffff;
        this.chain_[3] = (this.chain_[3] + d) & 0xffffffff;
        this.chain_[4] = (this.chain_[4] + e) & 0xffffffff;
    };
    Sha1.prototype.update = function (bytes, opt_length) {
        // TODO(johnlenz): tighten the function signature and remove this check
        if (bytes == null) {
            return;
        }
        if (opt_length === undefined) {
            opt_length = bytes.length;
        }
        var lengthMinusBlock = opt_length - this.blockSize;
        var n = 0;
        // Using local instead of member variables gives ~5% speedup on Firefox 16.
        var buf = this.buf_;
        var inbuf = this.inbuf_;
        // The outer while loop should execute at most twice.
        while (n < opt_length) {
            // When we have no data in the block to top up, we can directly process the
            // input buffer (assuming it contains sufficient data). This gives ~25%
            // speedup on Chrome 23 and ~15% speedup on Firefox 16, but requires that
            // the data is provided in large chunks (or in multiples of 64 bytes).
            if (inbuf == 0) {
                while (n <= lengthMinusBlock) {
                    this.compress_(bytes, n);
                    n += this.blockSize;
                }
            }
            if (typeof bytes === 'string') {
                while (n < opt_length) {
                    buf[inbuf] = bytes.charCodeAt(n);
                    ++inbuf;
                    ++n;
                    if (inbuf == this.blockSize) {
                        this.compress_(buf);
                        inbuf = 0;
                        // Jump to the outer loop so we use the full-block optimization.
                        break;
                    }
                }
            }
            else {
                while (n < opt_length) {
                    buf[inbuf] = bytes[n];
                    ++inbuf;
                    ++n;
                    if (inbuf == this.blockSize) {
                        this.compress_(buf);
                        inbuf = 0;
                        // Jump to the outer loop so we use the full-block optimization.
                        break;
                    }
                }
            }
        }
        this.inbuf_ = inbuf;
        this.total_ += opt_length;
    };
    /** @override */
    Sha1.prototype.digest = function () {
        var digest = [];
        var totalBits = this.total_ * 8;
        // Add pad 0x80 0x00*.
        if (this.inbuf_ < 56) {
            this.update(this.pad_, 56 - this.inbuf_);
        }
        else {
            this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
        }
        // Add # bits.
        for (var i = this.blockSize - 1; i >= 56; i--) {
            this.buf_[i] = totalBits & 255;
            totalBits /= 256; // Don't use bit-shifting here!
        }
        this.compress_(this.buf_);
        var n = 0;
        for (var i = 0; i < 5; i++) {
            for (var j = 24; j >= 0; j -= 8) {
                digest[n] = (this.chain_[i] >> j) & 255;
                ++n;
            }
        }
        return digest;
    };
    return Sha1;
}(Hash));

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a;
var ERROR_DESCRIPTION_MAP = (_a = {},
    _a["trace started" /* TRACE_STARTED_BEFORE */] = 'Trace {$traceName} was started before.',
    _a["trace stopped" /* TRACE_STOPPED_BEFORE */] = 'Trace {$traceName} is not running.',
    _a["no window" /* NO_WINDOW */] = 'Window is not available.',
    _a["no app id" /* NO_APP_ID */] = 'App id is not available.',
    _a["no project id" /* NO_PROJECT_ID */] = 'Project id is not available.',
    _a["no api key" /* NO_API_KEY */] = 'Api key is not available.',
    _a["invalid cc log" /* INVALID_CC_LOG */] = 'Attempted to queue invalid cc event',
    _a["FB not default" /* FB_NOT_DEFAULT */] = 'Performance can only start when Firebase app instance is the default one.',
    _a["RC response not ok" /* RC_NOT_OK */] = 'RC response is not ok',
    _a);
var ERROR_FACTORY = new ErrorFactory(SERVICE, SERVICE_NAME, ERROR_DESCRIPTION_MAP);

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var apiInstance;
var windowInstance;
/**
 * This class holds a reference to various browser related objects injected by set methods.
 */
var Api = /** @class */ (function () {
    function Api(window) {
        if (!window) {
            throw ERROR_FACTORY.create("no window" /* NO_WINDOW */);
        }
        this.performance = window.performance;
        this.PerformanceObserver = window.PerformanceObserver;
        this.windowLocation = window.location;
        this.navigator = window.navigator;
        this.document = window.document;
        this.localStorage = window.localStorage;
        if (window.perfMetrics && window.perfMetrics.onFirstInputDelay) {
            this.onFirstInputDelay = window.perfMetrics.onFirstInputDelay;
        }
    }
    Api.prototype.getUrl = function () {
        // Do not capture the string query part of url.
        return this.windowLocation.href.split('?')[0];
    };
    Api.prototype.mark = function (name) {
        if (!this.performance || !this.performance.mark)
            return;
        this.performance.mark(name);
    };
    Api.prototype.measure = function (measureName, mark1, mark2) {
        if (!this.performance || !this.performance.measure)
            return;
        this.performance.measure(measureName, mark1, mark2);
    };
    Api.prototype.getEntriesByType = function (type) {
        if (!this.performance || !this.performance.getEntriesByType)
            return [];
        return this.performance.getEntriesByType(type);
    };
    Api.prototype.getEntriesByName = function (name) {
        if (!this.performance || !this.performance.getEntriesByName)
            return [];
        return this.performance.getEntriesByName(name);
    };
    Api.prototype.getTimeOrigin = function () {
        // Polyfill the time origin with performance.timing.navigationStart.
        return (this.performance &&
            (this.performance.timeOrigin || this.performance.timing.navigationStart));
    };
    Api.prototype.setupObserver = function (entryType, callback) {
        if (!this.PerformanceObserver)
            return;
        var observer = new this.PerformanceObserver(function (list) {
            for (var _i = 0, _a = list.getEntries(); _i < _a.length; _i++) {
                var entry = _a[_i];
                // `entry` is a PerformanceEntry instance.
                callback(entry);
            }
        });
        // Start observing the entry types you care about.
        observer.observe({ entryTypes: [entryType] });
    };
    Api.getInstance = function () {
        if (apiInstance === undefined) {
            apiInstance = new Api(windowInstance);
        }
        return apiInstance;
    };
    return Api;
}());
function setupApi(window) {
    windowInstance = window;
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ERROR_NAME$1 = 'FirebaseError';
var captureStackTrace$1 = Error
    .captureStackTrace;
var FirebaseError$1 = /** @class */ (function () {
    function FirebaseError(code, message) {
        this.code = code;
        this.message = message;
        // We want the stack value, if implemented by Error
        if (captureStackTrace$1) {
            // Patches this.stack, omitted calls above ErrorFactory#create
            captureStackTrace$1(this, ErrorFactory$1.prototype.create);
        }
        else {
            try {
                // In case of IE11, stack will be set only after error is raised.
                // https://docs.microsoft.com/en-us/scripting/javascript/reference/stack-property-error-javascript
                throw Error.apply(this, arguments);
            }
            catch (err) {
                this.name = ERROR_NAME$1;
                // Make non-enumerable getter for the property.
                Object.defineProperty(this, 'stack', {
                    get: function () {
                        return err.stack;
                    }
                });
            }
        }
    }
    return FirebaseError;
}());
// Back-door inheritance
FirebaseError$1.prototype = Object.create(Error.prototype);
FirebaseError$1.prototype.constructor = FirebaseError$1;
FirebaseError$1.prototype.name = ERROR_NAME$1;
var ErrorFactory$1 = /** @class */ (function () {
    function ErrorFactory(service, serviceName, errors) {
        this.service = service;
        this.serviceName = serviceName;
        this.errors = errors;
        // Matches {$name}, by default.
        this.pattern = /\{\$([^}]+)}/g;
        // empty
    }
    ErrorFactory.prototype.create = function (code, data) {
        if (data === undefined) {
            data = {};
        }
        var template = this.errors[code];
        var fullCode = this.service + '/' + code;
        var message;
        if (template === undefined) {
            message = 'Error';
        }
        else {
            message = template.replace(this.pattern, function (match, key) {
                var value = data[key];
                return value !== undefined ? value.toString() : '<' + key + '?>';
            });
        }
        // Service: Error message (service/code).
        message = this.serviceName + ': ' + message + ' (' + fullCode + ').';
        var err = new FirebaseError$1(fullCode, message);
        // Populate the Error object with message parts for programmatic
        // accesses (e.g., e.file).
        for (var prop in data) {
            if (!data.hasOwnProperty(prop) || prop.slice(-1) === '_') {
                continue;
            }
            err[prop] = data[prop];
        }
        return err;
    };
    return ErrorFactory;
}());

function toArray(arr) {
  return Array.prototype.slice.call(arr);
}

function promisifyRequest(request) {
  return new Promise(function(resolve, reject) {
    request.onsuccess = function() {
      resolve(request.result);
    };

    request.onerror = function() {
      reject(request.error);
    };
  });
}

function promisifyRequestCall(obj, method, args) {
  var request;
  var p = new Promise(function(resolve, reject) {
    request = obj[method].apply(obj, args);
    promisifyRequest(request).then(resolve, reject);
  });

  p.request = request;
  return p;
}

function promisifyCursorRequestCall(obj, method, args) {
  var p = promisifyRequestCall(obj, method, args);
  return p.then(function(value) {
    if (!value) return;
    return new Cursor(value, p.request);
  });
}

function proxyProperties(ProxyClass, targetProp, properties) {
  properties.forEach(function(prop) {
    Object.defineProperty(ProxyClass.prototype, prop, {
      get: function() {
        return this[targetProp][prop];
      },
      set: function(val) {
        this[targetProp][prop] = val;
      }
    });
  });
}

function proxyRequestMethods(ProxyClass, targetProp, Constructor, properties) {
  properties.forEach(function(prop) {
    if (!(prop in Constructor.prototype)) return;
    ProxyClass.prototype[prop] = function() {
      return promisifyRequestCall(this[targetProp], prop, arguments);
    };
  });
}

function proxyMethods(ProxyClass, targetProp, Constructor, properties) {
  properties.forEach(function(prop) {
    if (!(prop in Constructor.prototype)) return;
    ProxyClass.prototype[prop] = function() {
      return this[targetProp][prop].apply(this[targetProp], arguments);
    };
  });
}

function proxyCursorRequestMethods(ProxyClass, targetProp, Constructor, properties) {
  properties.forEach(function(prop) {
    if (!(prop in Constructor.prototype)) return;
    ProxyClass.prototype[prop] = function() {
      return promisifyCursorRequestCall(this[targetProp], prop, arguments);
    };
  });
}

function Index(index) {
  this._index = index;
}

proxyProperties(Index, '_index', [
  'name',
  'keyPath',
  'multiEntry',
  'unique'
]);

proxyRequestMethods(Index, '_index', IDBIndex, [
  'get',
  'getKey',
  'getAll',
  'getAllKeys',
  'count'
]);

proxyCursorRequestMethods(Index, '_index', IDBIndex, [
  'openCursor',
  'openKeyCursor'
]);

function Cursor(cursor, request) {
  this._cursor = cursor;
  this._request = request;
}

proxyProperties(Cursor, '_cursor', [
  'direction',
  'key',
  'primaryKey',
  'value'
]);

proxyRequestMethods(Cursor, '_cursor', IDBCursor, [
  'update',
  'delete'
]);

// proxy 'next' methods
['advance', 'continue', 'continuePrimaryKey'].forEach(function(methodName) {
  if (!(methodName in IDBCursor.prototype)) return;
  Cursor.prototype[methodName] = function() {
    var cursor = this;
    var args = arguments;
    return Promise.resolve().then(function() {
      cursor._cursor[methodName].apply(cursor._cursor, args);
      return promisifyRequest(cursor._request).then(function(value) {
        if (!value) return;
        return new Cursor(value, cursor._request);
      });
    });
  };
});

function ObjectStore(store) {
  this._store = store;
}

ObjectStore.prototype.createIndex = function() {
  return new Index(this._store.createIndex.apply(this._store, arguments));
};

ObjectStore.prototype.index = function() {
  return new Index(this._store.index.apply(this._store, arguments));
};

proxyProperties(ObjectStore, '_store', [
  'name',
  'keyPath',
  'indexNames',
  'autoIncrement'
]);

proxyRequestMethods(ObjectStore, '_store', IDBObjectStore, [
  'put',
  'add',
  'delete',
  'clear',
  'get',
  'getAll',
  'getKey',
  'getAllKeys',
  'count'
]);

proxyCursorRequestMethods(ObjectStore, '_store', IDBObjectStore, [
  'openCursor',
  'openKeyCursor'
]);

proxyMethods(ObjectStore, '_store', IDBObjectStore, [
  'deleteIndex'
]);

function Transaction(idbTransaction) {
  this._tx = idbTransaction;
  this.complete = new Promise(function(resolve, reject) {
    idbTransaction.oncomplete = function() {
      resolve();
    };
    idbTransaction.onerror = function() {
      reject(idbTransaction.error);
    };
    idbTransaction.onabort = function() {
      reject(idbTransaction.error);
    };
  });
}

Transaction.prototype.objectStore = function() {
  return new ObjectStore(this._tx.objectStore.apply(this._tx, arguments));
};

proxyProperties(Transaction, '_tx', [
  'objectStoreNames',
  'mode'
]);

proxyMethods(Transaction, '_tx', IDBTransaction, [
  'abort'
]);

function UpgradeDB(db, oldVersion, transaction) {
  this._db = db;
  this.oldVersion = oldVersion;
  this.transaction = new Transaction(transaction);
}

UpgradeDB.prototype.createObjectStore = function() {
  return new ObjectStore(this._db.createObjectStore.apply(this._db, arguments));
};

proxyProperties(UpgradeDB, '_db', [
  'name',
  'version',
  'objectStoreNames'
]);

proxyMethods(UpgradeDB, '_db', IDBDatabase, [
  'deleteObjectStore',
  'close'
]);

function DB(db) {
  this._db = db;
}

DB.prototype.transaction = function() {
  return new Transaction(this._db.transaction.apply(this._db, arguments));
};

proxyProperties(DB, '_db', [
  'name',
  'version',
  'objectStoreNames'
]);

proxyMethods(DB, '_db', IDBDatabase, [
  'close'
]);

// Add cursor iterators
// TODO: remove this once browsers do the right thing with promises
['openCursor', 'openKeyCursor'].forEach(function(funcName) {
  [ObjectStore, Index].forEach(function(Constructor) {
    // Don't create iterateKeyCursor if openKeyCursor doesn't exist.
    if (!(funcName in Constructor.prototype)) return;

    Constructor.prototype[funcName.replace('open', 'iterate')] = function() {
      var args = toArray(arguments);
      var callback = args[args.length - 1];
      var nativeObject = this._store || this._index;
      var request = nativeObject[funcName].apply(nativeObject, args.slice(0, -1));
      request.onsuccess = function() {
        callback(request.result);
      };
    };
  });
});

// polyfill getAll
[Index, ObjectStore].forEach(function(Constructor) {
  if (Constructor.prototype.getAll) return;
  Constructor.prototype.getAll = function(query, count) {
    var instance = this;
    var items = [];

    return new Promise(function(resolve) {
      instance.iterateCursor(query, function(cursor) {
        if (!cursor) {
          resolve(items);
          return;
        }
        items.push(cursor.value);

        if (count !== undefined && items.length == count) {
          resolve(items);
          return;
        }
        cursor.continue();
      });
    });
  };
});

function openDb(name, version, upgradeCallback) {
  var p = promisifyRequestCall(indexedDB, 'open', [name, version]);
  var request = p.request;

  if (request) {
    request.onupgradeneeded = function(event) {
      if (upgradeCallback) {
        upgradeCallback(new UpgradeDB(request.result, event.oldVersion, request.transaction));
      }
    };
  }

  return p.then(function(db) {
    return new DB(db);
  });
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign$1 = function() {
    __assign$1 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var PENDING_TIMEOUT_MS = 10000;
var PACKAGE_VERSION = 'w:0.0.1'; // Will be replaced by Rollup
var INTERNAL_AUTH_VERSION = 'FIS_v2';
var INSTALLATIONS_API_URL = 'https://firebaseinstallations.googleapis.com/v1';
var TOKEN_EXPIRATION_BUFFER = 60 * 60 * 1000; // One hour
var SERVICE$1 = 'installations';
var SERVICE_NAME$1 = 'Installations';

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$1;
var ERROR_DESCRIPTION_MAP$1 = (_a$1 = {},
    _a$1["missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */] = 'Missing App configuration values.',
    _a$1["create-installation-failed" /* CREATE_INSTALLATION_FAILED */] = 'Could not register Firebase Installation.',
    _a$1["generate-token-failed" /* GENERATE_TOKEN_FAILED */] = 'Could not generate Auth Token.',
    _a$1["not-registered" /* NOT_REGISTERED */] = 'Firebase Installation is not registered.',
    _a$1["installation-not-found" /* INSTALLATION_NOT_FOUND */] = 'Firebase Installation not found.',
    _a$1["create-installation-request-failed" /* CREATE_INSTALLATION_REQUEST_FAILED */] = 'Create Installation request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
    _a$1["generate-token-request-failed" /* GENERATE_TOKEN_REQUEST_FAILED */] = 'Generate Auth Token request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
    _a$1["app-offline" /* APP_OFFLINE */] = 'Could not process request. Application offline.',
    _a$1);
var ERROR_FACTORY$1 = new ErrorFactory$1(SERVICE$1, SERVICE_NAME$1, ERROR_DESCRIPTION_MAP$1);
/** Returns true if error is a FirebaseError that is based on an error from the server. */
function isServerError(error) {
    if (!(error instanceof FirebaseError$1)) {
        return false;
    }
    return (error.code.includes("create-installation-request-failed" /* CREATE_INSTALLATION_REQUEST_FAILED */) ||
        error.code.includes("generate-token-request-failed" /* GENERATE_TOKEN_REQUEST_FAILED */));
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function extractAppConfig(app) {
    if (!app || !app.options) {
        throw ERROR_FACTORY$1.create("missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */);
    }
    var appName = app.name;
    var _a = app.options, projectId = _a.projectId, apiKey = _a.apiKey, appId = _a.appId;
    if (!appName || !projectId || !apiKey || !appId) {
        throw ERROR_FACTORY$1.create("missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */);
    }
    return { appName: appName, projectId: projectId, apiKey: apiKey, appId: appId };
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function createInstallation(appConfig, installationEntry) {
    return __awaiter(this, void 0, void 0, function () {
        var endpoint, body, headers, request, response, responseValue, registeredInstallationEntry, errorData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    endpoint = getCreateInstallationEndpoint(appConfig.projectId);
                    body = {
                        fid: installationEntry.fid,
                        authVersion: INTERNAL_AUTH_VERSION,
                        appId: appConfig.appId,
                        sdkVersion: PACKAGE_VERSION
                    };
                    headers = new Headers({
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'x-goog-api-key': appConfig.apiKey
                    });
                    request = {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(body)
                    };
                    return [4 /*yield*/, fetch(endpoint, request)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    responseValue = _a.sent();
                    registeredInstallationEntry = {
                        fid: installationEntry.fid,
                        registrationStatus: 2 /* COMPLETED */,
                        refreshToken: responseValue.refreshToken,
                        authToken: extractAuthTokenInfoFromResponse(responseValue.authToken)
                    };
                    return [2 /*return*/, registeredInstallationEntry];
                case 3: return [4 /*yield*/, getErrorFromResponse(response)];
                case 4:
                    errorData = _a.sent();
                    throw ERROR_FACTORY$1.create("create-installation-request-failed" /* CREATE_INSTALLATION_REQUEST_FAILED */, {
                        serverCode: errorData.code,
                        serverMessage: errorData.message,
                        serverStatus: errorData.status
                    });
            }
        });
    });
}
function generateAuthToken(appConfig, installationEntry) {
    return __awaiter(this, void 0, void 0, function () {
        var endpoint, body, headers, request, response, responseValue, completedAuthToken, errorData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    endpoint = getGenerateAuthTokenEndpoint(appConfig.projectId, installationEntry.fid);
                    body = {
                        installation: {
                            sdkVersion: PACKAGE_VERSION
                        }
                    };
                    headers = new Headers({
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: getAuthorizationHeader(installationEntry.refreshToken),
                        'x-goog-api-key': appConfig.apiKey
                    });
                    request = {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(body)
                    };
                    return [4 /*yield*/, fetch(endpoint, request)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    responseValue = _a.sent();
                    completedAuthToken = extractAuthTokenInfoFromResponse(responseValue);
                    return [2 /*return*/, completedAuthToken];
                case 3: return [4 /*yield*/, getErrorFromResponse(response)];
                case 4:
                    errorData = _a.sent();
                    throw ERROR_FACTORY$1.create("generate-token-request-failed" /* GENERATE_TOKEN_REQUEST_FAILED */, {
                        serverCode: errorData.code,
                        serverMessage: errorData.message,
                        serverStatus: errorData.status
                    });
            }
        });
    });
}
function getCreateInstallationEndpoint(projectId) {
    return INSTALLATIONS_API_URL + "/projects/" + projectId + "/installations";
}
function getGenerateAuthTokenEndpoint(projectId, fid) {
    return getCreateInstallationEndpoint(projectId) + "/" + fid + "/authTokens:generate";
}
function getAuthorizationHeader(refreshToken) {
    return INTERNAL_AUTH_VERSION + " " + refreshToken;
}
function getExpiresInFromResponseExpiresIn(responseExpiresIn) {
    // This works because the server will never respond with fractions of a second.
    return Number(responseExpiresIn.replace('s', '000'));
}
function extractAuthTokenInfoFromResponse(response) {
    return {
        token: response.token,
        requestStatus: 2 /* COMPLETED */,
        expiresIn: getExpiresInFromResponseExpiresIn(response.expiresIn),
        creationTime: Date.now()
    };
}
function getErrorFromResponse(response) {
    return __awaiter(this, void 0, void 0, function () {
        var responseJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, response.json()];
                case 1:
                    responseJson = _a.sent();
                    return [2 /*return*/, responseJson.error];
            }
        });
    });
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DATABASE_NAME = 'firebase-installations-database';
var DATABASE_VERSION = 1;
var OBJECT_STORE_NAME = 'firebase-installations-store';
var dbPromise = openDb(DATABASE_NAME, DATABASE_VERSION, function (upgradeDB) {
    // We don't use 'break' in this switch statement, the fall-through
    // behavior is what we want, because if there are multiple versions between
    // the old version and the current version, we want ALL the migrations
    // that correspond to those versions to run, not only the last one.
    switch (upgradeDB.oldVersion) {
        case 0:
            upgradeDB.createObjectStore(OBJECT_STORE_NAME);
    }
});
/** Assigns or overwrites the record for the given key with the given value. */
function set(appConfig, value) {
    return __awaiter(this, void 0, void 0, function () {
        var key, db, tx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = getKey(appConfig);
                    return [4 /*yield*/, dbPromise];
                case 1:
                    db = _a.sent();
                    tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
                    tx.objectStore(OBJECT_STORE_NAME).put(value, key);
                    return [4 /*yield*/, tx.complete];
                case 2:
                    _a.sent();
                    return [2 /*return*/, value];
            }
        });
    });
}
/** Removes record(s) from the objectStore that match the given key. */
function remove(appConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var key, db, tx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = getKey(appConfig);
                    return [4 /*yield*/, dbPromise];
                case 1:
                    db = _a.sent();
                    tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
                    tx.objectStore(OBJECT_STORE_NAME).delete(key);
                    return [2 /*return*/, tx.complete];
            }
        });
    });
}
/**
 * Atomically updates a record with the result of updateFn, which gets
 * called with the current value. If newValue is undefined, the record is
 * deleted instead.
 * @return Updated value
 */
function update(appConfig, updateFn) {
    return __awaiter(this, void 0, void 0, function () {
        var key, db, tx, store, oldValue, newValue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = getKey(appConfig);
                    return [4 /*yield*/, dbPromise];
                case 1:
                    db = _a.sent();
                    tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
                    store = tx.objectStore(OBJECT_STORE_NAME);
                    return [4 /*yield*/, store.get(key)];
                case 2:
                    oldValue = _a.sent();
                    newValue = updateFn(oldValue);
                    if (newValue === oldValue) {
                        return [2 /*return*/, newValue];
                    }
                    if (newValue === undefined) {
                        store.delete(key);
                    }
                    else {
                        store.put(newValue, key);
                    }
                    return [4 /*yield*/, tx.complete];
                case 3:
                    _a.sent();
                    return [2 /*return*/, newValue];
            }
        });
    });
}
function getKey(appConfig) {
    return appConfig.appName + "!" + appConfig.appId;
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function bufferToBase64UrlSafe(buffer) {
    var array = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    var b64 = btoa(String.fromCharCode.apply(String, __spread(array)));
    return b64.replace(/\+/g, '-').replace(/\//g, '_');
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Generates a new FID using random values from Web Crypto API. */
function generateFid() {
    // A valid FID has exactly 22 base64 characters, which is 132 bits, or 16.5
    // bytes. our implementation generates a 17 byte array instead.
    var fidByteArray = new Uint8Array(17);
    crypto.getRandomValues(fidByteArray);
    // Replace the first 4 random bits with the constant FID header of 0b0111.
    fidByteArray[0] = 112 + (fidByteArray[0] % 16);
    return encode(fidByteArray);
}
/** Converts a FID Uint8Array to a base64 string representation. */
function encode(fidByteArray) {
    var b64String = bufferToBase64UrlSafe(fidByteArray);
    // Remove the 23rd character that was added because of the extra 4 bits at the
    // end of our 17 byte array, and the '=' padding.
    return b64String.substr(0, 22);
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function hasAuthTokenRequestTimedOut(authToken) {
    return (authToken.requestStatus === 1 /* IN_PROGRESS */ &&
        authToken.requestTime + PENDING_TIMEOUT_MS < Date.now());
}
function hasInstallationRequestTimedOut(installationEntry) {
    return (installationEntry.registrationStatus === 1 /* IN_PROGRESS */ &&
        installationEntry.registrationTime + PENDING_TIMEOUT_MS < Date.now());
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Returns a promise that resolves after given time passes. */
function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Updates and returns the InstallationEntry from the database.
 * Also triggers a registration request if it is necessary and possible.
 */
function getInstallationEntry(appConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var registrationPromise, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = {};
                    return [4 /*yield*/, update(appConfig, function (oldEntry) {
                            var installationEntry = updateOrCreateFid(oldEntry);
                            var entryWithPromise = triggerRegistrationIfNecessary(appConfig, installationEntry);
                            registrationPromise = entryWithPromise.registrationPromise;
                            return entryWithPromise.installationEntry;
                        })];
                case 1: return [2 /*return*/, (_a.installationEntry = _b.sent(),
                        _a.registrationPromise = registrationPromise,
                        _a)];
            }
        });
    });
}
function updateOrCreateFid(oldEntry) {
    var entry = oldEntry || {
        fid: generateFid(),
        registrationStatus: 0 /* NOT_STARTED */
    };
    if (hasInstallationRequestTimedOut(entry)) {
        return {
            fid: entry.fid,
            registrationStatus: 0 /* NOT_STARTED */
        };
    }
    return entry;
}
/**
 * If the Firebase Installation is not registered yet, this will trigger the registration
 * and return an InProgressInstallationEntry.
 */
function triggerRegistrationIfNecessary(appConfig, installationEntry) {
    if (installationEntry.registrationStatus === 0 /* NOT_STARTED */) {
        if (!navigator.onLine) {
            // Registration required but app is offline.
            var registrationPromiseWithError = Promise.reject(ERROR_FACTORY$1.create("app-offline" /* APP_OFFLINE */));
            return {
                installationEntry: installationEntry,
                registrationPromise: registrationPromiseWithError
            };
        }
        // Try registering. Change status to IN_PROGRESS.
        var inProgressEntry = {
            fid: installationEntry.fid,
            registrationStatus: 1 /* IN_PROGRESS */,
            registrationTime: Date.now()
        };
        var registrationPromise = registerInstallation(appConfig, inProgressEntry);
        return { installationEntry: inProgressEntry, registrationPromise: registrationPromise };
    }
    else if (installationEntry.registrationStatus === 1 /* IN_PROGRESS */) {
        return {
            installationEntry: installationEntry,
            registrationPromise: waitUntilFidRegistration(appConfig)
        };
    }
    else {
        return { installationEntry: installationEntry };
    }
}
/** This will be executed only once for each new Firebase Installation. */
function registerInstallation(appConfig, installationEntry) {
    return __awaiter(this, void 0, void 0, function () {
        var registeredInstallationEntry, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 8]);
                    return [4 /*yield*/, createInstallation(appConfig, installationEntry)];
                case 1:
                    registeredInstallationEntry = _a.sent();
                    return [4 /*yield*/, set(appConfig, registeredInstallationEntry)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 3:
                    e_1 = _a.sent();
                    if (!(isServerError(e_1) && e_1.serverCode === 409)) return [3 /*break*/, 5];
                    // Server returned a "FID can not be used" error.
                    // Generate a new ID next time.
                    return [4 /*yield*/, remove(appConfig)];
                case 4:
                    // Server returned a "FID can not be used" error.
                    // Generate a new ID next time.
                    _a.sent();
                    return [3 /*break*/, 7];
                case 5: 
                // Registration failed. Set FID as not registered.
                return [4 /*yield*/, set(appConfig, {
                        fid: installationEntry.fid,
                        registrationStatus: 0 /* NOT_STARTED */
                    })];
                case 6:
                    // Registration failed. Set FID as not registered.
                    _a.sent();
                    _a.label = 7;
                case 7: throw e_1;
                case 8: return [2 /*return*/];
            }
        });
    });
}
/** Call if FID registration is pending. */
function waitUntilFidRegistration(appConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var entry;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateInstallationRequest(appConfig)];
                case 1:
                    entry = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(entry.registrationStatus === 1 /* IN_PROGRESS */)) return [3 /*break*/, 5];
                    // createInstallation request still in progress.
                    return [4 /*yield*/, sleep(100)];
                case 3:
                    // createInstallation request still in progress.
                    _a.sent();
                    return [4 /*yield*/, updateInstallationRequest(appConfig)];
                case 4:
                    entry = _a.sent();
                    return [3 /*break*/, 2];
                case 5:
                    if (entry.registrationStatus === 0 /* NOT_STARTED */) {
                        throw ERROR_FACTORY$1.create("create-installation-failed" /* CREATE_INSTALLATION_FAILED */);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Called only if there is a CreateInstallation request in progress.
 *
 * Updates the InstallationEntry in the DB based on the status of the
 * CreateInstallation request.
 *
 * Returns the updated InstallationEntry.
 */
function updateInstallationRequest(appConfig) {
    return update(appConfig, function (oldEntry) {
        if (!oldEntry) {
            throw ERROR_FACTORY$1.create("installation-not-found" /* INSTALLATION_NOT_FOUND */);
        }
        if (hasInstallationRequestTimedOut(oldEntry)) {
            return {
                fid: oldEntry.fid,
                registrationStatus: 0 /* NOT_STARTED */
            };
        }
        return oldEntry;
    });
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getId(app) {
    return __awaiter(this, void 0, void 0, function () {
        var appConfig, _a, installationEntry, registrationPromise;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    appConfig = extractAppConfig(app);
                    return [4 /*yield*/, getInstallationEntry(appConfig)];
                case 1:
                    _a = _b.sent(), installationEntry = _a.installationEntry, registrationPromise = _a.registrationPromise;
                    if (registrationPromise) {
                        // Suppress registration errors as they are not a problem for getId.
                        registrationPromise.catch(function () { });
                    }
                    return [2 /*return*/, installationEntry.fid];
            }
        });
    });
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getToken(app) {
    return __awaiter(this, void 0, void 0, function () {
        var appConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appConfig = extractAppConfig(app);
                    return [4 /*yield*/, completeInstallationRegistration(appConfig)];
                case 1:
                    _a.sent();
                    // At this point we either have a Registered Installation in the DB, or we've
                    // already thrown an error.
                    return [2 /*return*/, fetchAuthToken(appConfig)];
            }
        });
    });
}
function completeInstallationRegistration(appConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, installationEntry, registrationPromise;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getInstallationEntry(appConfig)];
                case 1:
                    _a = _b.sent(), installationEntry = _a.installationEntry, registrationPromise = _a.registrationPromise;
                    if (!registrationPromise) return [3 /*break*/, 3];
                    // A createInstallation request is in progress. Wait until it finishes.
                    return [4 /*yield*/, registrationPromise];
                case 2:
                    // A createInstallation request is in progress. Wait until it finishes.
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    if (installationEntry.registrationStatus !== 2 /* COMPLETED */) {
                        // Installation ID can't be registered.
                        throw ERROR_FACTORY$1.create("create-installation-failed" /* CREATE_INSTALLATION_FAILED */);
                    }
                    _b.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function fetchAuthToken(appConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var tokenPromise, entry, authToken, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, update(appConfig, function (oldEntry) {
                        if (!isEntryRegistered(oldEntry)) {
                            throw ERROR_FACTORY$1.create("not-registered" /* NOT_REGISTERED */);
                        }
                        var oldAuthToken = oldEntry.authToken;
                        if (isAuthTokenValid(oldAuthToken)) {
                            // There is a valid token in the DB.
                            return oldEntry;
                        }
                        else if (oldAuthToken.requestStatus === 1 /* IN_PROGRESS */) {
                            // There already is a token request in progress.
                            tokenPromise = waitUntilAuthTokenRequest(appConfig);
                            return oldEntry;
                        }
                        else {
                            // No token or token expired.
                            if (!navigator.onLine) {
                                throw ERROR_FACTORY$1.create("app-offline" /* APP_OFFLINE */);
                            }
                            var inProgressEntry = makeAuthTokenRequestInProgressEntry(oldEntry);
                            tokenPromise = fetchAuthTokenFromServer(appConfig, inProgressEntry);
                            return inProgressEntry;
                        }
                    })];
                case 1:
                    entry = _b.sent();
                    if (!tokenPromise) return [3 /*break*/, 3];
                    return [4 /*yield*/, tokenPromise];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = entry.authToken;
                    _b.label = 4;
                case 4:
                    authToken = _a;
                    return [2 /*return*/, authToken.token];
            }
        });
    });
}
/**
 * Call only if FID is registered and Auth Token request is in progress.
 */
function waitUntilAuthTokenRequest(appConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var entry, authToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateAuthTokenRequest(appConfig)];
                case 1:
                    entry = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(entry.authToken.requestStatus === 1 /* IN_PROGRESS */)) return [3 /*break*/, 5];
                    // generateAuthToken still in progress.
                    return [4 /*yield*/, sleep(100)];
                case 3:
                    // generateAuthToken still in progress.
                    _a.sent();
                    return [4 /*yield*/, updateAuthTokenRequest(appConfig)];
                case 4:
                    entry = _a.sent();
                    return [3 /*break*/, 2];
                case 5:
                    authToken = entry.authToken;
                    if (authToken.requestStatus === 0 /* NOT_STARTED */) {
                        throw ERROR_FACTORY$1.create("generate-token-failed" /* GENERATE_TOKEN_FAILED */);
                    }
                    else {
                        return [2 /*return*/, authToken];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Called only if there is a GenerateAuthToken request in progress.
 *
 * Updates the InstallationEntry in the DB based on the status of the
 * GenerateAuthToken request.
 *
 * Returns the updated InstallationEntry.
 */
function updateAuthTokenRequest(appConfig) {
    return update(appConfig, function (oldEntry) {
        if (!isEntryRegistered(oldEntry)) {
            throw ERROR_FACTORY$1.create("not-registered" /* NOT_REGISTERED */);
        }
        var oldAuthToken = oldEntry.authToken;
        if (hasAuthTokenRequestTimedOut(oldAuthToken)) {
            return __assign$1({}, oldEntry, { authToken: { requestStatus: 0 /* NOT_STARTED */ } });
        }
        return oldEntry;
    });
}
function fetchAuthTokenFromServer(appConfig, installationEntry) {
    return __awaiter(this, void 0, void 0, function () {
        var authToken, updatedInstallationEntry, e_1, updatedInstallationEntry;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 8]);
                    return [4 /*yield*/, generateAuthToken(appConfig, installationEntry)];
                case 1:
                    authToken = _a.sent();
                    updatedInstallationEntry = __assign$1({}, installationEntry, { authToken: authToken });
                    return [4 /*yield*/, set(appConfig, updatedInstallationEntry)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, authToken];
                case 3:
                    e_1 = _a.sent();
                    if (!(isServerError(e_1) && (e_1.serverCode === 401 || e_1.serverCode === 404))) return [3 /*break*/, 5];
                    // Server returned a "FID not found" or a "Invalid authentication" error.
                    // Generate a new ID next time.
                    return [4 /*yield*/, remove(appConfig)];
                case 4:
                    // Server returned a "FID not found" or a "Invalid authentication" error.
                    // Generate a new ID next time.
                    _a.sent();
                    return [3 /*break*/, 7];
                case 5:
                    updatedInstallationEntry = __assign$1({}, installationEntry, { authToken: { requestStatus: 0 /* NOT_STARTED */ } });
                    return [4 /*yield*/, set(appConfig, updatedInstallationEntry)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: throw e_1;
                case 8: return [2 /*return*/];
            }
        });
    });
}
function isEntryRegistered(installationEntry) {
    return (installationEntry !== undefined &&
        installationEntry.registrationStatus === 2 /* COMPLETED */);
}
function isAuthTokenValid(authToken) {
    return (authToken.requestStatus === 2 /* COMPLETED */ &&
        !isAuthTokenExpired(authToken));
}
function isAuthTokenExpired(authToken) {
    var now = Date.now();
    return (now < authToken.creationTime ||
        authToken.creationTime + authToken.expiresIn < now + TOKEN_EXPIRATION_BUFFER);
}
/** Returns an updated InstallationEntry with an InProgressAuthToken. */
function makeAuthTokenRequestInProgressEntry(oldEntry) {
    var inProgressAuthToken = {
        requestStatus: 1 /* IN_PROGRESS */,
        requestTime: Date.now()
    };
    return __assign$1({}, oldEntry, { authToken: inProgressAuthToken });
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function registerInstallations(instance) {
    var installationsName = 'installations';
    var factoryMethod = function (app) {
        // Throws if app isn't configured properly.
        extractAppConfig(app);
        return {
            app: app,
            getId: function () { return getId(app); },
            getToken: function () { return getToken(app); }
        };
    };
    instance.INTERNAL.registerService(installationsName, factoryMethod);
}
registerInstallations(firebase);

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var settingsServiceInstance;
var SettingsService = /** @class */ (function () {
    function SettingsService() {
        // The variable which controls logging of automatic traces and HTTP/S network monitoring.
        this.instrumentationEnabled = true;
        // The variable which controls logging of custom traces.
        this.dataCollectionEnabled = true;
        // Configuration flags set through remote config.
        this.loggingEnabled = false;
        // Sampling rate between 0 and 1.
        this.tracesSamplingRate = 1;
        this.networkRequestsSamplingRate = 1;
        // Address of logging service.
        this.logEndPointUrl = 'https://firebaselogging.googleapis.com/v0cc/log?format=json_proto';
        this.logSource = 462;
        // Flags which control per session logging of traces and network requests.
        this.logTraceAfterSampling = false;
        this.logNetworkAfterSampling = false;
        // TTL of config retrieved from remote config in hours.
        this.configTimeToLive = 12;
    }
    SettingsService.prototype.getAppId = function () {
        var appId = this.firebaseAppInstance &&
            this.firebaseAppInstance.options &&
            this.firebaseAppInstance.options.appId;
        if (!appId) {
            throw ERROR_FACTORY.create("no app id" /* NO_APP_ID */);
        }
        return appId;
    };
    SettingsService.prototype.getProjectId = function () {
        var projectId = this.firebaseAppInstance &&
            this.firebaseAppInstance.options &&
            this.firebaseAppInstance.options.projectId;
        if (!projectId) {
            throw ERROR_FACTORY.create("no project id" /* NO_PROJECT_ID */);
        }
        return projectId;
    };
    SettingsService.prototype.getApiKey = function () {
        var apiKey = this.firebaseAppInstance &&
            this.firebaseAppInstance.options &&
            this.firebaseAppInstance.options.apiKey;
        if (!apiKey) {
            throw ERROR_FACTORY.create("no api key" /* NO_API_KEY */);
        }
        return apiKey;
    };
    SettingsService.getInstance = function () {
        if (settingsServiceInstance === undefined) {
            settingsServiceInstance = new SettingsService();
        }
        return settingsServiceInstance;
    };
    return SettingsService;
}());

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var iid;
function getIidPromise() {
    var iidPromise = SettingsService.getInstance()
        .firebaseAppInstance.installations()
        .getId();
    iidPromise.then(function (iidVal) {
        iid = iidVal;
    });
    return iidPromise;
}
// This method should be used after the iid is retrieved by getIidPromise method.
function getIid() {
    return iid;
}
function getAuthTokenPromise() {
    var authTokenPromise = SettingsService.getInstance()
        .firebaseAppInstance.installations()
        .getToken();
    authTokenPromise.then(function (authTokenVal) {
    });
    return authTokenPromise;
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var VisibilityState;
(function (VisibilityState) {
    VisibilityState[VisibilityState["UNKNOWN"] = 0] = "UNKNOWN";
    VisibilityState[VisibilityState["VISIBLE"] = 1] = "VISIBLE";
    VisibilityState[VisibilityState["HIDDEN"] = 2] = "HIDDEN";
    VisibilityState[VisibilityState["PRERENDER"] = 3] = "PRERENDER";
    VisibilityState[VisibilityState["UNLOADED"] = 4] = "UNLOADED";
})(VisibilityState || (VisibilityState = {}));
function getServiceWorkerStatus() {
    var navigator = Api.getInstance().navigator;
    if ('serviceWorker' in navigator) {
        if (navigator.serviceWorker.controller) {
            return 2 /* CONTROLLED */;
        }
        else {
            return 3 /* UNCONTROLLED */;
        }
    }
    else {
        return 1 /* UNSUPPORTED */;
    }
}
function getVisibilityState() {
    var document = Api.getInstance().document;
    var visibilityState = document.visibilityState;
    switch (visibilityState) {
        case 'visible':
            return VisibilityState.VISIBLE;
        case 'hidden':
            return VisibilityState.HIDDEN;
        case 'prerender':
            return VisibilityState.PRERENDER;
        default:
            return VisibilityState.UNKNOWN;
    }
}
function getEffectiveConnectionType() {
    var navigator = Api.getInstance().navigator;
    var navigatorConnection = navigator.connection;
    var effectiveType = navigatorConnection && navigatorConnection.effectiveType;
    switch (effectiveType) {
        case 'slow-2g':
            return 1 /* CONNECTION_SLOW_2G */;
        case '2g':
            return 2 /* CONNECTION_2G */;
        case '3g':
            return 3 /* CONNECTION_3G */;
        case '4g':
            return 4 /* CONNECTION_4G */;
        default:
            return 0 /* UNKNOWN */;
    }
}

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The JS SDK supports 5 log levels and also allows a user the ability to
 * silence the logs altogether.
 *
 * The order is a follows:
 * DEBUG < VERBOSE < INFO < WARN < ERROR
 *
 * All of the log types above the current log level will be captured (i.e. if
 * you set the log level to `INFO`, errors will still be logged, but `DEBUG` and
 * `VERBOSE` logs will not)
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
    LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
})(LogLevel || (LogLevel = {}));
/**
 * The default log level
 */
var defaultLogLevel = LogLevel.INFO;
/**
 * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
 * messages on to their corresponding console counterparts (if the log method
 * is supported by the current log level)
 */
var defaultLogHandler = function (instance, logType) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (logType < instance.logLevel)
        return;
    var now = new Date().toISOString();
    switch (logType) {
        /**
         * By default, `console.debug` is not displayed in the developer console (in
         * chrome). To avoid forcing users to have to opt-in to these logs twice
         * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
         * logs to the `console.log` function.
         */
        case LogLevel.DEBUG:
            console.log.apply(console, ["[" + now + "]  " + instance.name + ":"].concat(args));
            break;
        case LogLevel.VERBOSE:
            console.log.apply(console, ["[" + now + "]  " + instance.name + ":"].concat(args));
            break;
        case LogLevel.INFO:
            console.info.apply(console, ["[" + now + "]  " + instance.name + ":"].concat(args));
            break;
        case LogLevel.WARN:
            console.warn.apply(console, ["[" + now + "]  " + instance.name + ":"].concat(args));
            break;
        case LogLevel.ERROR:
            console.error.apply(console, ["[" + now + "]  " + instance.name + ":"].concat(args));
            break;
        default:
            throw new Error("Attempted to log a message with an invalid logType (value: " + logType + ")");
    }
};
var Logger = /** @class */ (function () {
    /**
     * Gives you an instance of a Logger to capture messages according to
     * Firebase's logging scheme.
     *
     * @param name The name that the logs will be associated with
     */
    function Logger(name) {
        this.name = name;
        /**
         * The log level of the given Logger instance.
         */
        this._logLevel = defaultLogLevel;
        /**
         * The log handler for the Logger instance.
         */
        this._logHandler = defaultLogHandler;
    }
    Object.defineProperty(Logger.prototype, "logLevel", {
        get: function () {
            return this._logLevel;
        },
        set: function (val) {
            if (!(val in LogLevel)) {
                throw new TypeError('Invalid value assigned to `logLevel`');
            }
            this._logLevel = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Logger.prototype, "logHandler", {
        get: function () {
            return this._logHandler;
        },
        set: function (val) {
            if (typeof val !== 'function') {
                throw new TypeError('Value assigned to `logHandler` must be a function');
            }
            this._logHandler = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The functions below are all based on the `console` interface
     */
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._logHandler.apply(this, [this, LogLevel.DEBUG].concat(args));
    };
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._logHandler.apply(this, [this, LogLevel.VERBOSE].concat(args));
    };
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._logHandler.apply(this, [this, LogLevel.INFO].concat(args));
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._logHandler.apply(this, [this, LogLevel.WARN].concat(args));
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._logHandler.apply(this, [this, LogLevel.ERROR].concat(args));
    };
    return Logger;
}());

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var consoleLogger = new Logger(SERVICE_NAME);
consoleLogger.logLevel = LogLevel.INFO;

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var REMOTE_CONFIG_SDK_VERSION = '0.0.1';
// These values will be used if the remote config object is successfully
// retrieved, but the template does not have these fields.
var SECONDARY_CONFIGS = {
    loggingEnabled: true
};
var FIS_AUTH_PREFIX = 'FIREBASE_INSTALLATIONS_AUTH';
function getConfig(iid) {
    var config = getStoredConfig();
    if (config) {
        processConfig(config);
        return Promise.resolve();
    }
    return getRemoteConfig(iid)
        .then(function (config) { return processConfig(config); })
        .then(function (config) { return storeConfig(config); }, 
    /** Do nothing for error, use defaults set in settings service. */ function () { });
}
function getStoredConfig() {
    var localStorage = Api.getInstance().localStorage;
    var expiryString = localStorage.getItem(CONFIG_EXPIRY_LOCAL_STORAGE_KEY);
    if (!expiryString || !configValid(expiryString))
        return;
    var configStringified = localStorage.getItem(CONFIG_LOCAL_STORAGE_KEY);
    if (!configStringified)
        return;
    try {
        var configResponse = JSON.parse(configStringified);
        return configResponse;
    }
    catch (_a) {
        return;
    }
}
function storeConfig(config) {
    if (!config)
        return;
    var localStorage = Api.getInstance().localStorage;
    localStorage.setItem(CONFIG_LOCAL_STORAGE_KEY, JSON.stringify(config));
    localStorage.setItem(CONFIG_EXPIRY_LOCAL_STORAGE_KEY, String(Date.now() +
        SettingsService.getInstance().configTimeToLive * 60 * 60 * 1000));
}
var COULD_NOT_GET_CONFIG_MSG = 'Could not fetch config, will use default configs';
function getRemoteConfig(iid) {
    // Perf needs auth token only to retrieve remote config.
    return getAuthTokenPromise()
        .then(function (authToken) {
        var projectId = SettingsService.getInstance().getProjectId();
        var configEndPoint = "https://firebaseremoteconfig.googleapis.com/v1/projects/" + projectId + "/namespaces/fireperf:fetch?key=" + SettingsService.getInstance().getApiKey();
        var request = new Request(configEndPoint, {
            method: 'POST',
            headers: {
                Authorization: FIS_AUTH_PREFIX + " " + authToken
            },
            body: JSON.stringify({
                app_instance_id: iid,
                app_instance_id_token: authToken,
                app_id: SettingsService.getInstance().getAppId(),
                app_version: SDK_VERSION,
                sdk_version: REMOTE_CONFIG_SDK_VERSION
            })
        });
        return fetch(request).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            // In case response is not ok. This will be caught by catch.
            throw ERROR_FACTORY.create("RC response not ok" /* RC_NOT_OK */);
        });
    })
        .catch(function () {
        consoleLogger.info(COULD_NOT_GET_CONFIG_MSG);
        return undefined;
    });
}
/**
 * Processes config coming either from calling RC or from local storage.
 * This method only runs if call is successful or config in storage
 * is valie.
 */
function processConfig(config) {
    if (!config || !config.entries)
        return config;
    var settingsServiceInstance = SettingsService.getInstance();
    var entries = config.entries;
    if (entries.fpr_enabled !== undefined) {
        // TODO: Change the assignment of loggingEnabled once the received type is known.
        settingsServiceInstance.loggingEnabled =
            String(entries.fpr_enabled) === 'true';
    }
    else {
        // Config retrieved successfully, but there is no fpr_enabled in template.
        // Use secondary configs value.
        settingsServiceInstance.loggingEnabled = SECONDARY_CONFIGS.loggingEnabled;
    }
    if (entries.fpr_log_source) {
        settingsServiceInstance.logSource = Number(entries.fpr_log_source);
    }
    if (entries.fpr_log_endpoint_url) {
        settingsServiceInstance.logEndPointUrl = entries.fpr_log_endpoint_url;
    }
    if (entries.fpr_vc_network_request_sampling_rate !== undefined) {
        settingsServiceInstance.networkRequestsSamplingRate = Number(entries.fpr_vc_network_request_sampling_rate);
    }
    if (entries.fpr_vc_trace_sampling_rate !== undefined) {
        settingsServiceInstance.tracesSamplingRate = Number(entries.fpr_vc_trace_sampling_rate);
    }
    // Set the per session trace and network logging flags.
    settingsServiceInstance.logTraceAfterSampling = shouldLogAfterSampling(settingsServiceInstance.tracesSamplingRate);
    settingsServiceInstance.logNetworkAfterSampling = shouldLogAfterSampling(settingsServiceInstance.networkRequestsSamplingRate);
    return config;
}
function configValid(expiry) {
    return Number(expiry) > Date.now();
}
function shouldLogAfterSampling(samplingRate) {
    return Math.random() <= samplingRate;
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var initializationStatus = 1 /* notInitialized */;
var initializationPromise;
function getInitializationPromise() {
    initializationStatus = 2 /* initializationPending */;
    initializationPromise = initializationPromise || initializePerf();
    return initializationPromise;
}
function isPerfInitialized() {
    return initializationStatus === 3 /* initialized */;
}
function initializePerf() {
    return getDocumentReadyComplete()
        .then(function () { return getIidPromise(); })
        .then(function (iid) { return getConfig(iid); })
        .then(function () { return changeInitializationStatus(); }, function () { return changeInitializationStatus(); });
}
/**
 * Returns a promise which resolves whenever the document readystate is complete or
 * immediately if it is called after page load complete.
 */
function getDocumentReadyComplete() {
    var document = Api.getInstance().document;
    return new Promise(function (resolve) {
        if (document && document.readyState !== 'complete') {
            var handler_1 = function () {
                if (document.readyState === 'complete') {
                    document.removeEventListener('readystatechange', handler_1);
                    resolve();
                }
            };
            document.addEventListener('readystatechange', handler_1);
        }
        else {
            resolve();
        }
    });
}
function changeInitializationStatus() {
    initializationStatus = 3 /* initialized */;
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DEFAULT_SEND_INTERVAL_MS = 10 * 1000;
var INITIAL_SEND_TIME_DELAY_MS = 5.5 * 1000;
// If end point does not work, the call will be tried for these many times.
var DEFAULT_REMAINING_TRIES = 3;
var remainingTries = DEFAULT_REMAINING_TRIES;
var queue = [];
function processQueue(timeOffset) {
    setTimeout(function () {
        // If there is no remainingTries left, stop retrying.
        if (remainingTries === 0) {
            return;
        }
        // If there are no events to process, wait for DEFAULT_SEND_INTERVAL_MS and try again.
        if (!queue.length) {
            return processQueue(DEFAULT_SEND_INTERVAL_MS);
        }
        // Capture a snapshot of the queue and empty the "official queue".
        var staged = queue.slice();
        queue = [];
        // We will pass the JSON serialized event to the backend.
        var log_event = staged.map(function (evt) { return ({
            source_extension_json: evt.message,
            event_time_ms: String(evt.eventTime)
        }); });
        var data = {
            request_time_ms: String(Date.now()),
            client_info: {
                client_type: 1,
                js_client_info: {}
            },
            log_source: SettingsService.getInstance().logSource,
            log_event: log_event
        };
        fetch(SettingsService.getInstance().logEndPointUrl, {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(function (res) {
            if (!res.ok) {
                consoleLogger.info('Call to Firebase backend failed.');
            }
            return res.json();
        })
            .then(function (res) {
            // Find the next call wait time from the response.
            var requestOffset = Math.max(DEFAULT_SEND_INTERVAL_MS, parseInt(res.next_request_wait_millis, 10));
            remainingTries = DEFAULT_REMAINING_TRIES;
            // Schedule the next process.
            processQueue(requestOffset);
        })
            .catch(function () {
            /**
             * If the request fails for some reason, add the events that were attempted
             * back to the primary queue to retry later.
             */
            queue = staged.concat(queue);
            remainingTries--;
            consoleLogger.info("Tries left: " + remainingTries + ".");
            processQueue(DEFAULT_SEND_INTERVAL_MS);
        });
    }, timeOffset);
}
processQueue(INITIAL_SEND_TIME_DELAY_MS);
function addToQueue(evt) {
    if (!evt.eventTime || !evt.message) {
        throw ERROR_FACTORY.create("invalid cc log" /* INVALID_CC_LOG */);
    }
    // Add the new event to the queue.
    queue = queue.concat([evt]);
}
/** Log handler for cc service to send the performance logs to the server. */
function ccHandler(serializer) {
    // The underscores for loggerInstance and level parameters are added to avoid the
    // noUnusedParameters related error.
    return function (_loggerInstance, _level) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var message = serializer.apply(void 0, args);
        addToQueue({
            message: message,
            eventTime: Date.now()
        });
    };
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var logger;
// This method is not called before initialization.
function getLogger() {
    if (logger)
        return logger;
    var ccLogger = ccHandler(serializer);
    logger = new Logger('@firebase/performance/cc');
    logger.logHandler = ccLogger;
    return logger;
}
function logTrace(trace) {
    var settingsService = SettingsService.getInstance();
    // Do not log if trace is auto generated and instrumentation is disabled.
    if (!settingsService.instrumentationEnabled && trace.isAuto)
        return;
    // Do not log if trace is custom and data collection is disabled.
    if (!settingsService.dataCollectionEnabled && !trace.isAuto)
        return;
    // Only log the page load auto traces if page is visible.
    if (trace.isAuto && getVisibilityState() !== VisibilityState.VISIBLE)
        return;
    if (!settingsService.loggingEnabled || !settingsService.logTraceAfterSampling)
        return;
    if (isPerfInitialized()) {
        sendTraceLog(trace);
    }
    else {
        // Custom traces can be used before the initialization but logging
        // should wait until after.
        getInitializationPromise().then(function () { return sendTraceLog(trace); }, function () { return sendTraceLog(trace); });
    }
}
function sendTraceLog(trace) {
    if (getIid()) {
        setTimeout(function () { return getLogger().log(trace, 1 /* Trace */); }, 0);
    }
}
function logNetworkRequest(networkRequest) {
    var settingsService = SettingsService.getInstance();
    // Do not log network requests if instrumentation is disabled.
    if (!settingsService.instrumentationEnabled)
        return;
    // Do not log the js sdk's call to cc service to avoid unnecessary cycle.
    if (networkRequest.url === settingsService.logEndPointUrl.split('?')[0])
        return;
    if (!settingsService.loggingEnabled ||
        !settingsService.logNetworkAfterSampling)
        return;
    setTimeout(function () { return getLogger().log(networkRequest, 0 /* NetworkRequest */); }, 0);
}
function serializer(resource, resourceType) {
    if (resourceType === 0 /* NetworkRequest */) {
        return serializeNetworkRequest(resource);
    }
    return serializeTrace(resource);
}
function serializeNetworkRequest(networkRequest) {
    var networkRequestMetric = {
        url: networkRequest.url,
        http_method: 1,
        http_response_code: 200,
        response_payload_bytes: networkRequest.responsePayloadBytes,
        client_start_time_us: networkRequest.startTimeUs,
        time_to_response_initiated_us: networkRequest.timeToResponseInitiatedUs,
        time_to_response_completed_us: networkRequest.timeToResponseCompletedUs
    };
    var perfMetric = {
        application_info: getApplicationInfo(),
        network_request_metric: networkRequestMetric
    };
    return JSON.stringify(perfMetric);
}
function serializeTrace(trace) {
    var traceMetric = {
        name: trace.name,
        is_auto: trace.isAuto,
        client_start_time_us: trace.startTimeUs,
        duration_us: trace.durationUs
    };
    if (Object.keys(trace.counters).length !== 0) {
        traceMetric.counters = convertToKeyValueArray(trace.counters);
    }
    var customAttributes = trace.getAttributes();
    if (Object.keys(customAttributes).length !== 0) {
        traceMetric.custom_attributes = convertToKeyValueArray(customAttributes);
    }
    var perfMetric = {
        application_info: getApplicationInfo(),
        trace_metric: traceMetric
    };
    return JSON.stringify(perfMetric);
}
function getApplicationInfo() {
    return {
        google_app_id: SettingsService.getInstance().getAppId(),
        app_instance_id: getIid(),
        web_app_info: {
            sdk_version: SDK_VERSION,
            page_url: Api.getInstance().getUrl(),
            service_worker_status: getServiceWorkerStatus(),
            visibility_state: getVisibilityState(),
            effective_connection_type: getEffectiveConnectionType()
        },
        application_process_state: 0
    };
}
function convertToKeyValueArray(obj) {
    var keys = Object.keys(obj);
    return keys.map(function (key) { return ({ key: key, value: obj[key] }); });
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Trace = /** @class */ (function () {
    /**
     *
     * @param name The name of the trace.
     * @param isAuto If the trace is auto-instrumented.
     * @param traceMeasureName The name of the measure marker in user timing specification. This field
     * is only set when the trace is built for logging when the user directly uses the user timing
     * api (performance.mark and performance.measure).
     */
    function Trace(name, isAuto, traceMeasureName) {
        if (isAuto === void 0) { isAuto = false; }
        this.name = name;
        this.isAuto = isAuto;
        this.state = 1 /* UNINITIALIZED */;
        this.customAttributes = {};
        this.counters = {};
        this.api = Api.getInstance();
        this.randomId = Math.floor(Math.random() * 1000000);
        if (!this.isAuto) {
            this.traceStartMark = TRACE_START_MARK_PREFIX + "-" + this.randomId + "-" + this.name;
            this.traceStopMark = TRACE_STOP_MARK_PREFIX + "-" + this.randomId + "-" + this.name;
            this.traceMeasure =
                traceMeasureName ||
                    TRACE_MEASURE_PREFIX + "-" + this.randomId + "-" + this.name;
            if (traceMeasureName) {
                // For the case of direct user timing traces, no start stop will happen. The measure object
                // is already available.
                this.calculateTraceMetrics();
            }
        }
    }
    /**
     * Start a trace. The measurement of the duration starts at this point.
     */
    Trace.prototype.start = function () {
        if (this.state !== 1 /* UNINITIALIZED */) {
            throw ERROR_FACTORY.create("trace started" /* TRACE_STARTED_BEFORE */, {
                traceName: this.name
            });
        }
        this.api.mark(this.traceStartMark);
        this.state = 2 /* RUNNING */;
    };
    /**
     * Stop the trace. The measurement of the duration of the trace stops at this point and trace
     * is logged.
     */
    Trace.prototype.stop = function () {
        if (this.state !== 2 /* RUNNING */) {
            throw ERROR_FACTORY.create("trace stopped" /* TRACE_STOPPED_BEFORE */, {
                traceName: this.name
            });
        }
        this.state = 3 /* TERMINATED */;
        this.api.mark(this.traceStopMark);
        this.api.measure(this.traceMeasure, this.traceStartMark, this.traceStopMark);
        this.calculateTraceMetrics();
        logTrace(this);
    };
    /**
     * Record a trace with predetermined values. If this method is used a trace is created and logged
     * directly. No need to use start and stop methods.
     * @param startTime Trace start time since epoch in millisec
     * @param duration The duraction of the trace in millisec
     * @param options An object which can optionally hold maps of custom metrics and custom attributes
     */
    Trace.prototype.record = function (startTime, duration, options) {
        this.durationUs = Math.floor(duration * 1000);
        this.startTimeUs = Math.floor(startTime * 1000);
        if (options && options.attributes) {
            this.customAttributes = __assign({}, options.attributes);
        }
        if (options && options.metrics) {
            for (var _i = 0, _a = Object.keys(options.metrics); _i < _a.length; _i++) {
                var metric = _a[_i];
                if (!isNaN(Number(options.metrics[metric]))) {
                    this.counters[metric] = Number(Math.floor(options.metrics[metric]));
                }
            }
        }
        logTrace(this);
    };
    /**
     * Increment a custom metric by a certain number or 1 if number not specified. Will create a new
     * custom metric if one with the given name does not exist.
     * @param counter Name of the custom metric
     * @param num Increment by value
     */
    Trace.prototype.incrementMetric = function (counter, num) {
        if (num === void 0) { num = 1; }
        if (this.counters[counter] === undefined) {
            this.counters[counter] = 0;
        }
        this.counters[counter] += num;
    };
    /**
     * Set a custom metric to a specified value. Will create a new custom metric if one with the
     * given name does not exist.
     * @param counter Name of the custom metric
     * @param num Set custom metric to this value
     */
    Trace.prototype.putMetric = function (counter, num) {
        this.counters[counter] = num;
    };
    /**
     * Returns the value of the custom metric by that name. If a custom metric with that name does
     * not exist will return zero.
     * @param counter
     */
    Trace.prototype.getMetric = function (counter) {
        return this.counters[counter] || 0;
    };
    /**
     * Set a custom attribute of a trace to a certain value.
     * @param attr
     * @param value
     */
    Trace.prototype.putAttribute = function (attr, value) {
        this.customAttributes[attr] = value;
    };
    /**
     * Retrieve the value a custom attribute of a trace is set to.
     * @param attr
     */
    Trace.prototype.getAttribute = function (attr) {
        return this.customAttributes[attr];
    };
    Trace.prototype.removeAttribute = function (attr) {
        if (this.customAttributes[attr] === undefined)
            return;
        delete this.customAttributes[attr];
    };
    Trace.prototype.getAttributes = function () {
        return __assign({}, this.customAttributes);
    };
    Trace.prototype.setStartTime = function (startTime) {
        this.startTimeUs = startTime;
    };
    Trace.prototype.setDuration = function (duration) {
        this.durationUs = duration;
    };
    /**
     * Calculates and assigns the duration and start time of the trace using the measure performance
     * entry.
     */
    Trace.prototype.calculateTraceMetrics = function () {
        var perfMeasureEntries = this.api.getEntriesByName(this.traceMeasure);
        var perfMeasureEntry = perfMeasureEntries && perfMeasureEntries[0];
        if (perfMeasureEntry) {
            this.durationUs = Math.floor(perfMeasureEntry.duration * 1000);
            this.startTimeUs = Math.floor((perfMeasureEntry.startTime + this.api.getTimeOrigin()) * 1000);
        }
    };
    /**
     * @param navigationTimings A single element array which contains the navigationTIming object of
     * the page load
     * @param paintTimings A array which contains paintTiming object of the page load
     * @param firstInputDelay First input delay in millisec
     */
    Trace.createOobTrace = function (navigationTimings, paintTimings, firstInputDelay) {
        var route = Api.getInstance().getUrl();
        if (!route)
            return;
        var trace = new Trace(OOB_TRACE_PAGE_LOAD_PREFIX + route, true);
        var timeOriginUs = Math.floor(Api.getInstance().getTimeOrigin() * 1000);
        trace.setStartTime(timeOriginUs);
        // navigationTimings includes only one element.
        if (navigationTimings && navigationTimings[0]) {
            trace.setDuration(Math.floor(navigationTimings[0].duration * 1000));
            trace.incrementMetric('domInteractive', Math.floor(navigationTimings[0].domInteractive * 1000));
            trace.incrementMetric('domContentLoadedEventEnd', Math.floor(navigationTimings[0].domContentLoadedEventEnd * 1000));
            trace.incrementMetric('loadEventEnd', Math.floor(navigationTimings[0].loadEventEnd * 1000));
        }
        var FIRST_PAINT = 'first-paint';
        var FIRST_CONTENTFUL_PAINT = 'first-contentful-paint';
        if (paintTimings) {
            var firstPaint = paintTimings.find(function (paintObject) { return paintObject.name === FIRST_PAINT; });
            if (firstPaint && firstPaint.startTime) {
                trace.incrementMetric(FIRST_PAINT_COUNTER_NAME, Math.floor(firstPaint.startTime * 1000));
            }
            var firstContentfulPaint = paintTimings.find(function (paintObject) { return paintObject.name === FIRST_CONTENTFUL_PAINT; });
            if (firstContentfulPaint && firstContentfulPaint.startTime) {
                trace.incrementMetric(FIRST_CONTENTFUL_PAINT_COUNTER_NAME, Math.floor(firstContentfulPaint.startTime * 1000));
            }
            if (firstInputDelay) {
                trace.incrementMetric(FIRST_INPUT_DELAY_COUNTER_NAME, Math.floor(firstInputDelay * 1000));
            }
        }
        logTrace(trace);
    };
    Trace.createUserTimingTrace = function (measureName) {
        var trace = new Trace(measureName, false, measureName);
        logTrace(trace);
    };
    return Trace;
}());

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function createNetworkRequestEntry(entry) {
    var performanceEntry = entry;
    if (!performanceEntry || performanceEntry.responseStart === undefined)
        return;
    var timeOrigin = Api.getInstance().getTimeOrigin();
    var startTimeUs = Math.floor((performanceEntry.startTime + timeOrigin) * 1000);
    var timeToResponseInitiatedUs = performanceEntry.responseStart
        ? Math.floor((performanceEntry.responseStart - performanceEntry.startTime) * 1000)
        : undefined;
    var timeToResponseCompletedUs = Math.floor((performanceEntry.responseEnd - performanceEntry.startTime) * 1000);
    // Remove the query params from logged network request url.
    var url = performanceEntry.name && performanceEntry.name.split('?')[0];
    var networkRequest = {
        url: url,
        responsePayloadBytes: performanceEntry.transferSize,
        startTimeUs: startTimeUs,
        timeToResponseInitiatedUs: timeToResponseInitiatedUs,
        timeToResponseCompletedUs: timeToResponseCompletedUs
    };
    logNetworkRequest(networkRequest);
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var FID_WAIT_TIME_MS = 5000;
function setupOobResources() {
    // Do not initialize unless iid is available.
    if (!getIid())
        return;
    // The load event might not have fired yet, and that means performance navigation timing
    // object has a duration of 0. The setup should run after all current tasks in js queue.
    setTimeout(function () { return setupOobTraces(); }, 0);
    setTimeout(function () { return setupNetworkRequests(); }, 0);
    setTimeout(function () { return setupUserTimingTraces(); }, 0);
}
function setupNetworkRequests() {
    var api = Api.getInstance();
    var resources = api.getEntriesByType('resource');
    for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
        var resource = resources_1[_i];
        createNetworkRequestEntry(resource);
    }
    api.setupObserver('resource', createNetworkRequestEntry);
}
function setupOobTraces() {
    var api = Api.getInstance();
    var navigationTimings = api.getEntriesByType('navigation');
    var paintTimings = api.getEntriesByType('paint');
    // If First Input Desly polyfill is added to the page, report the fid value.
    // https://github.com/GoogleChromeLabs/first-input-delay
    if (api.onFirstInputDelay) {
        // If the fid call back is not called for certain time, continue without it.
        var timeoutId_1 = setTimeout(function () {
            Trace.createOobTrace(navigationTimings, paintTimings);
            timeoutId_1 = undefined;
        }, FID_WAIT_TIME_MS);
        api.onFirstInputDelay(function (fid) {
            if (timeoutId_1) {
                clearTimeout(timeoutId_1);
                Trace.createOobTrace(navigationTimings, paintTimings, fid);
            }
        });
    }
    else {
        Trace.createOobTrace(navigationTimings, paintTimings);
    }
}
function setupUserTimingTraces() {
    var api = Api.getInstance();
    // Run through the measure performance entries collected up to this point.
    var measures = api.getEntriesByType('measure');
    for (var _i = 0, measures_1 = measures; _i < measures_1.length; _i++) {
        var measure = measures_1[_i];
        createUserTimingTrace(measure);
    }
    // Setup an observer to capture the measures from this point on.
    api.setupObserver('measure', createUserTimingTrace);
}
function createUserTimingTrace(measure) {
    var measureName = measure.name;
    // Do not create a trace, if the user timing marks and measures are created by the sdk itself.
    if (measureName.substring(0, TRACE_MEASURE_PREFIX.length) ===
        TRACE_MEASURE_PREFIX)
        return;
    Trace.createUserTimingTrace(measureName);
}

/**
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var PerformanceController = /** @class */ (function () {
    function PerformanceController(app) {
        this.app = app;
        getInitializationPromise().then(setupOobResources, setupOobResources);
    }
    PerformanceController.prototype.trace = function (name) {
        return new Trace(name);
    };
    Object.defineProperty(PerformanceController.prototype, "instrumentationEnabled", {
        get: function () {
            return SettingsService.getInstance().instrumentationEnabled;
        },
        set: function (val) {
            SettingsService.getInstance().instrumentationEnabled = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceController.prototype, "dataCollectionEnabled", {
        get: function () {
            return SettingsService.getInstance().dataCollectionEnabled;
        },
        set: function (val) {
            SettingsService.getInstance().dataCollectionEnabled = val;
        },
        enumerable: true,
        configurable: true
    });
    return PerformanceController;
}());

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DEFAULT_ENTRY_NAME = '[DEFAULT]';
function registerPerformance(instance) {
    var factoryMethod = function (app) {
        if (app.name !== DEFAULT_ENTRY_NAME) {
            throw ERROR_FACTORY.create("FB not default" /* FB_NOT_DEFAULT */);
        }
        SettingsService.getInstance().firebaseAppInstance = app;
        return new PerformanceController(app);
    };
    // Register performance with firebase-app.
    var namespaceExports = {};
    instance.INTERNAL.registerService('performance', factoryMethod, namespaceExports);
}
if (window && fetch && Promise) {
    setupApi(window);
    registerPerformance(firebase);
}
else {
    consoleLogger.info('Firebase Performance cannot start if browser does not support fetch and Promise.');
}

exports.registerPerformance = registerPerformance;
//# sourceMappingURL=index.cjs.js.map
