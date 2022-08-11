/* esm.sh - esbuild bundle(php-wasm@0.0.5/php-worker) deno production */
var K = Object.create;
var z = Object.defineProperty;
var W = Object.getOwnPropertyDescriptor;
var q = Object.getOwnPropertyNames;
var X = Object.getPrototypeOf,
  Z = Object.prototype.hasOwnProperty;
var J = (e, r) => () => (r || e((r = { exports: {} }).exports, r), r.exports);
var $ = (e, r, n, t) => {
  if ((r && typeof r == "object") || typeof r == "function")
    for (let o of q(r))
      !Z.call(e, o) &&
        o !== n &&
        z(e, o, {
          get: () => r[o],
          enumerable: !(t = W(r, o)) || t.enumerable,
        });
  return e;
};
var Q = (e, r, n) => (
  (n = e != null ? K(X(e)) : {}),
  $(
    r || !e || !e.__esModule
      ? z(n, "default", { value: e, enumerable: !0 })
      : n,
    e
  )
);
var j = J((exports, module) => {
  var PHP = (function () {
    var _scriptDir =
      typeof document < "u" && document.currentScript
        ? document.currentScript.src
        : void 0;
    return function (PHP) {
      PHP = PHP || {};
      var Module = typeof PHP < "u" ? PHP : {},
        readyPromiseResolve,
        readyPromiseReject;
      Module.ready = new Promise(function (e, r) {
        (readyPromiseResolve = e), (readyPromiseReject = r);
      });
      var moduleOverrides = {},
        key;
      for (key in Module)
        Module.hasOwnProperty(key) && (moduleOverrides[key] = Module[key]);
      var arguments_ = [],
        thisProgram = "./this.program",
        quit_ = function (e, r) {
          throw r;
        },
        ENVIRONMENT_IS_WEB = !1,
        ENVIRONMENT_IS_WORKER = !0,
        ENVIRONMENT_IS_NODE = !1,
        scriptDirectory = "";
      function locateFile(e) {
        return Module.locateFile
          ? Module.locateFile(e, scriptDirectory)
          : scriptDirectory + e;
      }
      var read_, readAsync, readBinary, setWindowTitle;
      (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) &&
        (ENVIRONMENT_IS_WORKER
          ? (scriptDirectory = self.location.href)
          : document.currentScript &&
            (scriptDirectory = document.currentScript.src),
        _scriptDir && (scriptDirectory = _scriptDir),
        scriptDirectory.indexOf("blob:") !== 0
          ? (scriptDirectory = scriptDirectory.substr(
              0,
              scriptDirectory.lastIndexOf("/") + 1
            ))
          : (scriptDirectory = ""),
        (read_ = function (r) {
          var n = new XMLHttpRequest();
          return n.open("GET", r, !1), n.send(null), n.responseText;
        }),
        ENVIRONMENT_IS_WORKER &&
          (readBinary = function (r) {
            var n = new XMLHttpRequest();
            return (
              n.open("GET", r, !1),
              (n.responseType = "arraybuffer"),
              n.send(null),
              new Uint8Array(n.response)
            );
          }),
        (readAsync = function (r, n, t) {
          var o = new XMLHttpRequest();
          o.open("GET", r, !0),
            (o.responseType = "arraybuffer"),
            (o.onload = function () {
              if (o.status == 200 || (o.status == 0 && o.response)) {
                n(o.response);
                return;
              }
              t();
            }),
            (o.onerror = t),
            o.send(null);
        }),
        (setWindowTitle = function (e) {
          document.title = e;
        }));
      var out = Module.print || console.log.bind(console),
        err = Module.printErr || console.warn.bind(console);
      for (key in moduleOverrides)
        moduleOverrides.hasOwnProperty(key) &&
          (Module[key] = moduleOverrides[key]);
      (moduleOverrides = null),
        Module.arguments && (arguments_ = Module.arguments),
        Module.thisProgram && (thisProgram = Module.thisProgram),
        Module.quit && (quit_ = Module.quit);
      function dynamicAlloc(e) {
        var r = HEAP32[DYNAMICTOP_PTR >> 2],
          n = (r + e + 15) & -16;
        return (HEAP32[DYNAMICTOP_PTR >> 2] = n), r;
      }
      function getNativeTypeSize(e) {
        switch (e) {
          case "i1":
          case "i8":
            return 1;
          case "i16":
            return 2;
          case "i32":
            return 4;
          case "i64":
            return 8;
          case "float":
            return 4;
          case "double":
            return 8;
          default: {
            if (e[e.length - 1] === "*") return 4;
            if (e[0] === "i") {
              var r = Number(e.substr(1));
              return (
                assert(
                  r % 8 === 0,
                  "getNativeTypeSize invalid bits " + r + ", type " + e
                ),
                r / 8
              );
            } else return 0;
          }
        }
      }
      var asm2wasmImports = {
          "f64-rem": function (e, r) {
            return e % r;
          },
          debugger: function () {},
        },
        functionPointers = new Array(0),
        tempRet0 = 0,
        setTempRet0 = function (e) {
          tempRet0 = e;
        },
        getTempRet0 = function () {
          return tempRet0;
        },
        wasmBinary;
      Module.wasmBinary && (wasmBinary = Module.wasmBinary);
      var noExitRuntime;
      Module.noExitRuntime && (noExitRuntime = Module.noExitRuntime),
        typeof WebAssembly != "object" &&
          err("no native wasm support detected");
      function setValue(e, r, n, t) {
        switch (
          ((n = n || "i8"), n.charAt(n.length - 1) === "*" && (n = "i32"), n)
        ) {
          case "i1":
            HEAP8[e >> 0] = r;
            break;
          case "i8":
            HEAP8[e >> 0] = r;
            break;
          case "i16":
            HEAP16[e >> 1] = r;
            break;
          case "i32":
            HEAP32[e >> 2] = r;
            break;
          case "i64":
            (tempI64 = [
              r >>> 0,
              ((tempDouble = r),
              +Math_abs(tempDouble) >= 1
                ? tempDouble > 0
                  ? (Math_min(
                      +Math_floor(tempDouble / 4294967296),
                      4294967295
                    ) |
                      0) >>>
                    0
                  : ~~+Math_ceil(
                      (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                    ) >>> 0
                : 0),
            ]),
              (HEAP32[e >> 2] = tempI64[0]),
              (HEAP32[(e + 4) >> 2] = tempI64[1]);
            break;
          case "float":
            HEAPF32[e >> 2] = r;
            break;
          case "double":
            HEAPF64[e >> 3] = r;
            break;
          default:
            abort("invalid type for setValue: " + n);
        }
      }
      var wasmMemory,
        wasmTable = new WebAssembly.Table({
          initial: 6743,
          maximum: 6743,
          element: "anyfunc",
        }),
        ABORT = !1,
        EXITSTATUS = 0;
      function assert(e, r) {
        e || abort("Assertion failed: " + r);
      }
      function getCFunc(e) {
        var r = Module["_" + e];
        return (
          assert(
            r,
            "Cannot call unknown function " + e + ", make sure it is exported"
          ),
          r
        );
      }
      function ccall(e, r, n, t, o) {
        var a = {
          string: function (d) {
            var m = 0;
            if (d != null && d !== 0) {
              var F = (d.length << 2) + 1;
              (m = stackAlloc(F)), stringToUTF8(d, m, F);
            }
            return m;
          },
          array: function (d) {
            var m = stackAlloc(d.length);
            return writeArrayToMemory(d, m), m;
          },
        };
        function i(d) {
          return r === "string"
            ? UTF8ToString(d)
            : r === "boolean"
            ? Boolean(d)
            : d;
        }
        var s = getCFunc(e),
          u = [],
          c = 0;
        if (t)
          for (var _ = 0; _ < t.length; _++) {
            var E = a[n[_]];
            E
              ? (c === 0 && (c = stackSave()), (u[_] = E(t[_])))
              : (u[_] = t[_]);
          }
        var f = s.apply(null, u);
        return (f = i(f)), c !== 0 && stackRestore(c), f;
      }
      var ALLOC_STACK = 1,
        ALLOC_NONE = 3;
      function allocate(e, r, n, t) {
        var o, a;
        typeof e == "number" ? ((o = !0), (a = e)) : ((o = !1), (a = e.length));
        var i = typeof r == "string" ? r : null,
          s;
        if (
          (n == ALLOC_NONE
            ? (s = t)
            : (s = [_malloc, stackAlloc, dynamicAlloc][n](
                Math.max(a, i ? 1 : r.length)
              )),
          o)
        ) {
          var u;
          for (t = s, assert((s & 3) == 0), u = s + (a & -4); t < u; t += 4)
            HEAP32[t >> 2] = 0;
          for (u = s + a; t < u; ) HEAP8[t++ >> 0] = 0;
          return s;
        }
        if (i === "i8")
          return (
            e.subarray || e.slice
              ? HEAPU8.set(e, s)
              : HEAPU8.set(new Uint8Array(e), s),
            s
          );
        for (var c = 0, _, E, f; c < a; ) {
          var d = e[c];
          if (((_ = i || r[c]), _ === 0)) {
            c++;
            continue;
          }
          _ == "i64" && (_ = "i32"),
            setValue(s + c, d, _),
            f !== _ && ((E = getNativeTypeSize(_)), (f = _)),
            (c += E);
        }
        return s;
      }
      function getMemory(e) {
        return runtimeInitialized ? _malloc(e) : dynamicAlloc(e);
      }
      var UTF8Decoder =
        typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0;
      function UTF8ArrayToString(e, r, n) {
        for (var t = r + n, o = r; e[o] && !(o >= t); ) ++o;
        if (o - r > 16 && e.subarray && UTF8Decoder)
          return UTF8Decoder.decode(e.subarray(r, o));
        for (var a = ""; r < o; ) {
          var i = e[r++];
          if (!(i & 128)) {
            a += String.fromCharCode(i);
            continue;
          }
          var s = e[r++] & 63;
          if ((i & 224) == 192) {
            a += String.fromCharCode(((i & 31) << 6) | s);
            continue;
          }
          var u = e[r++] & 63;
          if (
            ((i & 240) == 224
              ? (i = ((i & 15) << 12) | (s << 6) | u)
              : (i = ((i & 7) << 18) | (s << 12) | (u << 6) | (e[r++] & 63)),
            i < 65536)
          )
            a += String.fromCharCode(i);
          else {
            var c = i - 65536;
            a += String.fromCharCode(55296 | (c >> 10), 56320 | (c & 1023));
          }
        }
        return a;
      }
      function UTF8ToString(e, r) {
        return e ? UTF8ArrayToString(HEAPU8, e, r) : "";
      }
      function stringToUTF8Array(e, r, n, t) {
        if (!(t > 0)) return 0;
        for (var o = n, a = n + t - 1, i = 0; i < e.length; ++i) {
          var s = e.charCodeAt(i);
          if (s >= 55296 && s <= 57343) {
            var u = e.charCodeAt(++i);
            s = (65536 + ((s & 1023) << 10)) | (u & 1023);
          }
          if (s <= 127) {
            if (n >= a) break;
            r[n++] = s;
          } else if (s <= 2047) {
            if (n + 1 >= a) break;
            (r[n++] = 192 | (s >> 6)), (r[n++] = 128 | (s & 63));
          } else if (s <= 65535) {
            if (n + 2 >= a) break;
            (r[n++] = 224 | (s >> 12)),
              (r[n++] = 128 | ((s >> 6) & 63)),
              (r[n++] = 128 | (s & 63));
          } else {
            if (n + 3 >= a) break;
            (r[n++] = 240 | (s >> 18)),
              (r[n++] = 128 | ((s >> 12) & 63)),
              (r[n++] = 128 | ((s >> 6) & 63)),
              (r[n++] = 128 | (s & 63));
          }
        }
        return (r[n] = 0), n - o;
      }
      function stringToUTF8(e, r, n) {
        return stringToUTF8Array(e, HEAPU8, r, n);
      }
      function lengthBytesUTF8(e) {
        for (var r = 0, n = 0; n < e.length; ++n) {
          var t = e.charCodeAt(n);
          t >= 55296 &&
            t <= 57343 &&
            (t = (65536 + ((t & 1023) << 10)) | (e.charCodeAt(++n) & 1023)),
            t <= 127
              ? ++r
              : t <= 2047
              ? (r += 2)
              : t <= 65535
              ? (r += 3)
              : (r += 4);
        }
        return r;
      }
      function allocateUTF8(e) {
        var r = lengthBytesUTF8(e) + 1,
          n = _malloc(r);
        return n && stringToUTF8Array(e, HEAP8, n, r), n;
      }
      function allocateUTF8OnStack(e) {
        var r = lengthBytesUTF8(e) + 1,
          n = stackAlloc(r);
        return stringToUTF8Array(e, HEAP8, n, r), n;
      }
      function writeArrayToMemory(e, r) {
        HEAP8.set(e, r);
      }
      function writeAsciiToMemory(e, r, n) {
        for (var t = 0; t < e.length; ++t) HEAP8[r++ >> 0] = e.charCodeAt(t);
        n || (HEAP8[r >> 0] = 0);
      }
      var WASM_PAGE_SIZE = 65536;
      function alignUp(e, r) {
        return e % r > 0 && (e += r - (e % r)), e;
      }
      var buffer,
        HEAP8,
        HEAPU8,
        HEAP16,
        HEAPU16,
        HEAP32,
        HEAPU32,
        HEAPF32,
        HEAPF64;
      function updateGlobalBufferAndViews(e) {
        (buffer = e),
          (Module.HEAP8 = HEAP8 = new Int8Array(e)),
          (Module.HEAP16 = HEAP16 = new Int16Array(e)),
          (Module.HEAP32 = HEAP32 = new Int32Array(e)),
          (Module.HEAPU8 = HEAPU8 = new Uint8Array(e)),
          (Module.HEAPU16 = HEAPU16 = new Uint16Array(e)),
          (Module.HEAPU32 = HEAPU32 = new Uint32Array(e)),
          (Module.HEAPF32 = HEAPF32 = new Float32Array(e)),
          (Module.HEAPF64 = HEAPF64 = new Float64Array(e));
      }
      var DYNAMIC_BASE = 7748784,
        DYNAMICTOP_PTR = 2505712,
        INITIAL_INITIAL_MEMORY = Module.INITIAL_MEMORY || 1073741824;
      Module.wasmMemory
        ? (wasmMemory = Module.wasmMemory)
        : (wasmMemory = new WebAssembly.Memory({
            initial: INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE,
          })),
        wasmMemory && (buffer = wasmMemory.buffer),
        (INITIAL_INITIAL_MEMORY = buffer.byteLength),
        updateGlobalBufferAndViews(buffer),
        (HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE);
      function callRuntimeCallbacks(e) {
        for (; e.length > 0; ) {
          var r = e.shift();
          if (typeof r == "function") {
            r(Module);
            continue;
          }
          var n = r.func;
          typeof n == "number"
            ? r.arg === void 0
              ? Module.dynCall_v(n)
              : Module.dynCall_vi(n, r.arg)
            : n(r.arg === void 0 ? null : r.arg);
        }
      }
      var __ATPRERUN__ = [],
        __ATINIT__ = [],
        __ATMAIN__ = [],
        __ATPOSTRUN__ = [],
        runtimeInitialized = !1,
        runtimeExited = !1;
      function preRun() {
        if (Module.preRun)
          for (
            typeof Module.preRun == "function" &&
            (Module.preRun = [Module.preRun]);
            Module.preRun.length;

          )
            addOnPreRun(Module.preRun.shift());
        callRuntimeCallbacks(__ATPRERUN__);
      }
      function initRuntime() {
        (runtimeInitialized = !0),
          !Module.noFSInit && !FS.init.initialized && FS.init(),
          TTY.init(),
          (SOCKFS.root = FS.mount(SOCKFS, {}, null)),
          (PIPEFS.root = FS.mount(PIPEFS, {}, null)),
          callRuntimeCallbacks(__ATINIT__);
      }
      function preMain() {
        (FS.ignorePermissions = !1), callRuntimeCallbacks(__ATMAIN__);
      }
      function exitRuntime() {
        runtimeExited = !0;
      }
      function postRun() {
        if (Module.postRun)
          for (
            typeof Module.postRun == "function" &&
            (Module.postRun = [Module.postRun]);
            Module.postRun.length;

          )
            addOnPostRun(Module.postRun.shift());
        callRuntimeCallbacks(__ATPOSTRUN__);
      }
      function addOnPreRun(e) {
        __ATPRERUN__.unshift(e);
      }
      function addOnPostRun(e) {
        __ATPOSTRUN__.unshift(e);
      }
      var Math_abs = Math.abs,
        Math_ceil = Math.ceil,
        Math_floor = Math.floor,
        Math_min = Math.min,
        runDependencies = 0,
        runDependencyWatcher = null,
        dependenciesFulfilled = null;
      function getUniqueRunDependency(e) {
        return e;
      }
      function addRunDependency(e) {
        runDependencies++,
          Module.monitorRunDependencies &&
            Module.monitorRunDependencies(runDependencies);
      }
      function removeRunDependency(e) {
        if (
          (runDependencies--,
          Module.monitorRunDependencies &&
            Module.monitorRunDependencies(runDependencies),
          runDependencies == 0 &&
            (runDependencyWatcher !== null &&
              (clearInterval(runDependencyWatcher),
              (runDependencyWatcher = null)),
            dependenciesFulfilled))
        ) {
          var r = dependenciesFulfilled;
          (dependenciesFulfilled = null), r();
        }
      }
      (Module.preloadedImages = {}), (Module.preloadedAudios = {});
      function abort(e) {
        throw (
          (Module.onAbort && Module.onAbort(e),
          (e += ""),
          out(e),
          err(e),
          (ABORT = !0),
          (EXITSTATUS = 1),
          (e = "abort(" + e + "). Build with -s ASSERTIONS=1 for more info."),
          new WebAssembly.RuntimeError(e))
        );
      }
      function hasPrefix(e, r) {
        return String.prototype.startsWith
          ? e.startsWith(r)
          : e.indexOf(r) === 0;
      }
      var dataURIPrefix = "data:application/";
      function isDataURI(e) {
        return hasPrefix(e, dataURIPrefix);
      }
      var wasmBinaryFile = "php-worker.wasm";
      isDataURI(wasmBinaryFile) ||
        (wasmBinaryFile = locateFile(wasmBinaryFile));
      function getBinary() {
        try {
          if (wasmBinary) return new Uint8Array(wasmBinary);
          if (readBinary) return readBinary(wasmBinaryFile);
          throw "both async and sync fetching of the wasm failed";
        } catch (e) {
          abort(e);
        }
      }
      function getBinaryPromise() {
        return !wasmBinary &&
          (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) &&
          typeof fetch == "function"
          ? fetch(wasmBinaryFile, { credentials: "same-origin" })
              .then(function (e) {
                if (!e.ok)
                  throw (
                    "failed to load wasm binary file at '" +
                    wasmBinaryFile +
                    "'"
                  );
                return e.arrayBuffer();
              })
              .catch(function () {
                return getBinary();
              })
          : new Promise(function (e, r) {
              e(getBinary());
            });
      }
      function createWasm() {
        var e = {
          env: asmLibraryArg,
          wasi_snapshot_preview1: asmLibraryArg,
          global: { NaN: NaN, Infinity: 1 / 0 },
          "global.Math": Math,
          asm2wasm: asm2wasmImports,
        };
        function r(i, s) {
          var u = i.exports;
          (Module.asm = u), removeRunDependency("wasm-instantiate");
        }
        addRunDependency("wasm-instantiate");
        function n(i) {
          r(i.instance);
        }
        function t(i) {
          return getBinaryPromise()
            .then(function (s) {
              return WebAssembly.instantiate(s, e);
            })
            .then(i, function (s) {
              err("failed to asynchronously prepare wasm: " + s), abort(s);
            });
        }
        function o() {
          if (
            !wasmBinary &&
            typeof WebAssembly.instantiateStreaming == "function" &&
            !isDataURI(wasmBinaryFile) &&
            typeof fetch == "function"
          )
            fetch(wasmBinaryFile, { credentials: "same-origin" }).then(
              function (i) {
                var s = WebAssembly.instantiateStreaming(i, e);
                return s.then(n, function (u) {
                  return (
                    err("wasm streaming compile failed: " + u),
                    err("falling back to ArrayBuffer instantiation"),
                    t(n)
                  );
                });
              }
            );
          else return t(n);
        }
        if (Module.instantiateWasm)
          try {
            var a = Module.instantiateWasm(e, r);
            return a;
          } catch (i) {
            return (
              err("Module.instantiateWasm callback failed with error: " + i), !1
            );
          }
        return o(), {};
      }
      Module.asm = createWasm;
      var tempDouble,
        tempI64,
        ASM_CONSTS = [
          function (e, r) {
            let n = Module.targets.get(e) || window,
              t = UTF8ToString(r),
              o = n[t];
            if (
              (console.log("target/prop:", e, n, t, typeof o, o),
              !o || !["function", "object"].includes(typeof o))
            ) {
              let u = "OK" + String(o),
                c = lengthBytesUTF8(u) + 1,
                _ = _malloc(c);
              return stringToUTF8(u, _, c), _;
            }
            let a = "XX",
              i = lengthBytesUTF8(a) + 1,
              s = _malloc(i);
            return stringToUTF8(a, s, i), s;
          },
          function (e, r) {
            let n = Module.targets.get(e) || window,
              t = UTF8ToString(r),
              o = n[t];
            if (
              (console.log("target/prop:", e, n, t, typeof o, o),
              ["function", "object"].includes(typeof o))
            ) {
              let a = Module.targets.has(o);
              return a || (a = Module.targets.add(o)), console.log(a), a;
            }
            return console.log(0), 0;
          },
          function (e, r, n) {
            let t = Module.targets.get(e) || window,
              o = UTF8ToString(r),
              a = n,
              i = {},
              s = () => {
                Module.ccall("exec_callback", "number", ["number"], [a]);
              };
            t.addEventListener(o, s, i);
            let u = () => (t.removeEventListener(o, s, i), n);
            return Module.callbacks.add(u);
          },
          function (e) {
            return Module.callbacks.get(e)();
          },
          function (e, r) {
            let n = Module.targets.get(e) || document,
              t = UTF8ToString(r),
              o = n.querySelector(t);
            if (!o) return 0;
            let a = Module.targets.has(o) || 0;
            return a || (a = Module.targets.add(o)), a;
          },
          function ($0) {
            throw new Error("cant use eval")
            // let jsRet = String(eval(UTF8ToString($0))),
            //   len = lengthBytesUTF8(jsRet) + 1,
            //   strLoc = _malloc(len);
            // return stringToUTF8(jsRet, strLoc, len), strLoc;
          },
          function (e, r) {
            let n = UTF8ToString(e),
              t = UTF8ToString(r),
              o = window[n],
              a = JSON.parse(t || "[]") || [],
              i = String(o(...a)),
              s = lengthBytesUTF8(i) + 1,
              u = _malloc(s);
            return stringToUTF8(i, u, s), u;
          },
          function (e, r) {
            let n = Number(UTF8ToString(e)),
              t = r;
            setTimeout(() => {
              Module.ccall("exec_callback", "number", ["number"], [t]),
                Module.ccall("del_callback", "number", ["number"], [t]);
            }, n);
          },
        ];
      function _emscripten_asm_const_iii(e, r, n) {
        return ASM_CONSTS[e](r, n);
      }
      function _emscripten_asm_const_ii(e, r) {
        return ASM_CONSTS[e](r);
      }
      function _emscripten_asm_const_iiii(e, r, n, t) {
        return ASM_CONSTS[e](r, n, t);
      }
      __ATINIT__.push({
        func: function () {
          ___emscripten_environ_constructor();
        },
      });
      function demangle(e) {
        return e;
      }
      function demangleAll(e) {
        var r = /\b__Z[\w\d_]+/g;
        return e.replace(r, function (n) {
          var t = n;
          return n === t ? n : t + " [" + n + "]";
        });
      }
      function jsStackTrace() {
        var e = new Error();
        if (!e.stack) {
          try {
            throw new Error();
          } catch (r) {
            e = r;
          }
          if (!e.stack) return "(no stack trace available)";
        }
        return e.stack.toString();
      }
      function stackTrace() {
        var e = jsStackTrace();
        return (
          Module.extraStackTrace &&
            (e +=
              `
` + Module.extraStackTrace()),
          demangleAll(e)
        );
      }
      function ___assert_fail(e, r, n, t) {
        abort(
          "Assertion failed: " +
            UTF8ToString(e) +
            ", at: " +
            [
              r ? UTF8ToString(r) : "unknown filename",
              n,
              t ? UTF8ToString(t) : "unknown function",
            ]
        );
      }
      var ENV = {};
      function __getExecutableName() {
        return thisProgram || "./this.program";
      }
      function ___buildEnvironment(e) {
        var r = 64,
          n = 1024,
          t,
          o;
        ___buildEnvironment.called
          ? ((o = HEAP32[e >> 2]), (t = HEAP32[o >> 2]))
          : ((___buildEnvironment.called = !0),
            (ENV.USER = "web_user"),
            (ENV.LOGNAME = "web_user"),
            (ENV.PATH = "/"),
            (ENV.PWD = "/"),
            (ENV.HOME = "/home/web_user"),
            (ENV.LANG =
              (
                (typeof navigator == "object" &&
                  navigator.languages &&
                  navigator.languages[0]) ||
                "C"
              ).replace("-", "_") + ".UTF-8"),
            (ENV._ = __getExecutableName()),
            (t = getMemory(n)),
            (o = getMemory(r * 4)),
            (HEAP32[o >> 2] = t),
            (HEAP32[e >> 2] = o));
        var a = [],
          i = 0;
        for (var s in ENV)
          if (typeof ENV[s] == "string") {
            var u = s + "=" + ENV[s];
            a.push(u), (i += u.length);
          }
        if (i > n) throw new Error("Environment size exceeded TOTAL_ENV_SIZE!");
        for (var c = 4, _ = 0; _ < a.length; _++) {
          var u = a[_];
          writeAsciiToMemory(u, t),
            (HEAP32[(o + _ * c) >> 2] = t),
            (t += u.length + 1);
        }
        HEAP32[(o + a.length * c) >> 2] = 0;
      }
      var _emscripten_get_now;
      _emscripten_get_now = function () {
        return performance.now();
      };
      var _emscripten_get_now_is_monotonic = !0;
      function setErrNo(e) {
        return (HEAP32[___errno_location() >> 2] = e), e;
      }
      function _clock_gettime(e, r) {
        var n;
        if (e === 0) n = Date.now();
        else if ((e === 1 || e === 4) && _emscripten_get_now_is_monotonic)
          n = _emscripten_get_now();
        else return setErrNo(28), -1;
        return (
          (HEAP32[r >> 2] = (n / 1e3) | 0),
          (HEAP32[(r + 4) >> 2] = ((n % 1e3) * 1e3 * 1e3) | 0),
          0
        );
      }
      function ___clock_gettime(e, r) {
        return _clock_gettime(e, r);
      }
      function ___map_file(e, r) {
        return setErrNo(63), -1;
      }
      var PATH = {
          splitPath: function (e) {
            var r =
              /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
            return r.exec(e).slice(1);
          },
          normalizeArray: function (e, r) {
            for (var n = 0, t = e.length - 1; t >= 0; t--) {
              var o = e[t];
              o === "."
                ? e.splice(t, 1)
                : o === ".."
                ? (e.splice(t, 1), n++)
                : n && (e.splice(t, 1), n--);
            }
            if (r) for (; n; n--) e.unshift("..");
            return e;
          },
          normalize: function (e) {
            var r = e.charAt(0) === "/",
              n = e.substr(-1) === "/";
            return (
              (e = PATH.normalizeArray(
                e.split("/").filter(function (t) {
                  return !!t;
                }),
                !r
              ).join("/")),
              !e && !r && (e = "."),
              e && n && (e += "/"),
              (r ? "/" : "") + e
            );
          },
          dirname: function (e) {
            var r = PATH.splitPath(e),
              n = r[0],
              t = r[1];
            return !n && !t
              ? "."
              : (t && (t = t.substr(0, t.length - 1)), n + t);
          },
          basename: function (e) {
            if (e === "/") return "/";
            var r = e.lastIndexOf("/");
            return r === -1 ? e : e.substr(r + 1);
          },
          extname: function (e) {
            return PATH.splitPath(e)[3];
          },
          join: function () {
            var e = Array.prototype.slice.call(arguments, 0);
            return PATH.normalize(e.join("/"));
          },
          join2: function (e, r) {
            return PATH.normalize(e + "/" + r);
          },
        },
        PATH_FS = {
          resolve: function () {
            for (
              var e = "", r = !1, n = arguments.length - 1;
              n >= -1 && !r;
              n--
            ) {
              var t = n >= 0 ? arguments[n] : FS.cwd();
              if (typeof t != "string")
                throw new TypeError(
                  "Arguments to path.resolve must be strings"
                );
              if (!t) return "";
              (e = t + "/" + e), (r = t.charAt(0) === "/");
            }
            return (
              (e = PATH.normalizeArray(
                e.split("/").filter(function (o) {
                  return !!o;
                }),
                !r
              ).join("/")),
              (r ? "/" : "") + e || "."
            );
          },
          relative: function (e, r) {
            (e = PATH_FS.resolve(e).substr(1)),
              (r = PATH_FS.resolve(r).substr(1));
            function n(c) {
              for (var _ = 0; _ < c.length && c[_] === ""; _++);
              for (var E = c.length - 1; E >= 0 && c[E] === ""; E--);
              return _ > E ? [] : c.slice(_, E - _ + 1);
            }
            for (
              var t = n(e.split("/")),
                o = n(r.split("/")),
                a = Math.min(t.length, o.length),
                i = a,
                s = 0;
              s < a;
              s++
            )
              if (t[s] !== o[s]) {
                i = s;
                break;
              }
            for (var u = [], s = i; s < t.length; s++) u.push("..");
            return (u = u.concat(o.slice(i))), u.join("/");
          },
        },
        TTY = {
          ttys: [],
          init: function () {},
          shutdown: function () {},
          register: function (e, r) {
            (TTY.ttys[e] = { input: [], output: [], ops: r }),
              FS.registerDevice(e, TTY.stream_ops);
          },
          stream_ops: {
            open: function (e) {
              var r = TTY.ttys[e.node.rdev];
              if (!r) throw new FS.ErrnoError(43);
              (e.tty = r), (e.seekable = !1);
            },
            close: function (e) {
              e.tty.ops.flush(e.tty);
            },
            flush: function (e) {
              e.tty.ops.flush(e.tty);
            },
            read: function (e, r, n, t, o) {
              if (!e.tty || !e.tty.ops.get_char) throw new FS.ErrnoError(60);
              for (var a = 0, i = 0; i < t; i++) {
                var s;
                try {
                  s = e.tty.ops.get_char(e.tty);
                } catch {
                  throw new FS.ErrnoError(29);
                }
                if (s === void 0 && a === 0) throw new FS.ErrnoError(6);
                if (s == null) break;
                a++, (r[n + i] = s);
              }
              return a && (e.node.timestamp = Date.now()), a;
            },
            write: function (e, r, n, t, o) {
              if (!e.tty || !e.tty.ops.put_char) throw new FS.ErrnoError(60);
              try {
                for (var a = 0; a < t; a++) e.tty.ops.put_char(e.tty, r[n + a]);
              } catch {
                throw new FS.ErrnoError(29);
              }
              return t && (e.node.timestamp = Date.now()), a;
            },
          },
          default_tty_ops: {
            get_char: function (e) {
              if (!e.input.length) {
                var r = null;
                if (
                  (typeof document < "u" && typeof window.prompt == "function"
                    ? ((r = window.prompt("Input: ")),
                      r !== null &&
                        (r += `
`))
                    : typeof readline == "function" &&
                      ((r = readline()),
                      r !== null &&
                        (r += `
`)),
                  !r)
                )
                  return null;
                e.input = intArrayFromString(r, !0);
              }
              return e.input.shift();
            },
            put_char: function (e, r) {
              r === null || r === 10
                ? (out(UTF8ArrayToString(e.output, 0)), (e.output = []))
                : r != 0 && e.output.push(r);
            },
            flush: function (e) {
              e.output &&
                e.output.length > 0 &&
                (out(UTF8ArrayToString(e.output, 0)), (e.output = []));
            },
          },
          default_tty1_ops: {
            put_char: function (e, r) {
              r === null || r === 10
                ? (err(UTF8ArrayToString(e.output, 0)), (e.output = []))
                : r != 0 && e.output.push(r);
            },
            flush: function (e) {
              e.output &&
                e.output.length > 0 &&
                (err(UTF8ArrayToString(e.output, 0)), (e.output = []));
            },
          },
        },
        MEMFS = {
          ops_table: null,
          mount: function (e) {
            return MEMFS.createNode(null, "/", 16895, 0);
          },
          createNode: function (e, r, n, t) {
            if (FS.isBlkdev(n) || FS.isFIFO(n)) throw new FS.ErrnoError(63);
            MEMFS.ops_table ||
              (MEMFS.ops_table = {
                dir: {
                  node: {
                    getattr: MEMFS.node_ops.getattr,
                    setattr: MEMFS.node_ops.setattr,
                    lookup: MEMFS.node_ops.lookup,
                    mknod: MEMFS.node_ops.mknod,
                    rename: MEMFS.node_ops.rename,
                    unlink: MEMFS.node_ops.unlink,
                    rmdir: MEMFS.node_ops.rmdir,
                    readdir: MEMFS.node_ops.readdir,
                    symlink: MEMFS.node_ops.symlink,
                  },
                  stream: { llseek: MEMFS.stream_ops.llseek },
                },
                file: {
                  node: {
                    getattr: MEMFS.node_ops.getattr,
                    setattr: MEMFS.node_ops.setattr,
                  },
                  stream: {
                    llseek: MEMFS.stream_ops.llseek,
                    read: MEMFS.stream_ops.read,
                    write: MEMFS.stream_ops.write,
                    allocate: MEMFS.stream_ops.allocate,
                    mmap: MEMFS.stream_ops.mmap,
                    msync: MEMFS.stream_ops.msync,
                  },
                },
                link: {
                  node: {
                    getattr: MEMFS.node_ops.getattr,
                    setattr: MEMFS.node_ops.setattr,
                    readlink: MEMFS.node_ops.readlink,
                  },
                  stream: {},
                },
                chrdev: {
                  node: {
                    getattr: MEMFS.node_ops.getattr,
                    setattr: MEMFS.node_ops.setattr,
                  },
                  stream: FS.chrdev_stream_ops,
                },
              });
            var o = FS.createNode(e, r, n, t);
            return (
              FS.isDir(o.mode)
                ? ((o.node_ops = MEMFS.ops_table.dir.node),
                  (o.stream_ops = MEMFS.ops_table.dir.stream),
                  (o.contents = {}))
                : FS.isFile(o.mode)
                ? ((o.node_ops = MEMFS.ops_table.file.node),
                  (o.stream_ops = MEMFS.ops_table.file.stream),
                  (o.usedBytes = 0),
                  (o.contents = null))
                : FS.isLink(o.mode)
                ? ((o.node_ops = MEMFS.ops_table.link.node),
                  (o.stream_ops = MEMFS.ops_table.link.stream))
                : FS.isChrdev(o.mode) &&
                  ((o.node_ops = MEMFS.ops_table.chrdev.node),
                  (o.stream_ops = MEMFS.ops_table.chrdev.stream)),
              (o.timestamp = Date.now()),
              e && (e.contents[r] = o),
              o
            );
          },
          getFileDataAsRegularArray: function (e) {
            if (e.contents && e.contents.subarray) {
              for (var r = [], n = 0; n < e.usedBytes; ++n)
                r.push(e.contents[n]);
              return r;
            }
            return e.contents;
          },
          getFileDataAsTypedArray: function (e) {
            return e.contents
              ? e.contents.subarray
                ? e.contents.subarray(0, e.usedBytes)
                : new Uint8Array(e.contents)
              : new Uint8Array(0);
          },
          expandFileStorage: function (e, r) {
            var n = e.contents ? e.contents.length : 0;
            if (!(n >= r)) {
              var t = 1024 * 1024;
              (r = Math.max(r, (n * (n < t ? 2 : 1.125)) >>> 0)),
                n != 0 && (r = Math.max(r, 256));
              var o = e.contents;
              (e.contents = new Uint8Array(r)),
                e.usedBytes > 0 &&
                  e.contents.set(o.subarray(0, e.usedBytes), 0);
            }
          },
          resizeFileStorage: function (e, r) {
            if (e.usedBytes != r) {
              if (r == 0) {
                (e.contents = null), (e.usedBytes = 0);
                return;
              }
              if (!e.contents || e.contents.subarray) {
                var n = e.contents;
                (e.contents = new Uint8Array(r)),
                  n && e.contents.set(n.subarray(0, Math.min(r, e.usedBytes))),
                  (e.usedBytes = r);
                return;
              }
              if ((e.contents || (e.contents = []), e.contents.length > r))
                e.contents.length = r;
              else for (; e.contents.length < r; ) e.contents.push(0);
              e.usedBytes = r;
            }
          },
          node_ops: {
            getattr: function (e) {
              var r = {};
              return (
                (r.dev = FS.isChrdev(e.mode) ? e.id : 1),
                (r.ino = e.id),
                (r.mode = e.mode),
                (r.nlink = 1),
                (r.uid = 0),
                (r.gid = 0),
                (r.rdev = e.rdev),
                FS.isDir(e.mode)
                  ? (r.size = 4096)
                  : FS.isFile(e.mode)
                  ? (r.size = e.usedBytes)
                  : FS.isLink(e.mode)
                  ? (r.size = e.link.length)
                  : (r.size = 0),
                (r.atime = new Date(e.timestamp)),
                (r.mtime = new Date(e.timestamp)),
                (r.ctime = new Date(e.timestamp)),
                (r.blksize = 4096),
                (r.blocks = Math.ceil(r.size / r.blksize)),
                r
              );
            },
            setattr: function (e, r) {
              r.mode !== void 0 && (e.mode = r.mode),
                r.timestamp !== void 0 && (e.timestamp = r.timestamp),
                r.size !== void 0 && MEMFS.resizeFileStorage(e, r.size);
            },
            lookup: function (e, r) {
              throw FS.genericErrors[44];
            },
            mknod: function (e, r, n, t) {
              return MEMFS.createNode(e, r, n, t);
            },
            rename: function (e, r, n) {
              if (FS.isDir(e.mode)) {
                var t;
                try {
                  t = FS.lookupNode(r, n);
                } catch {}
                if (t) for (var o in t.contents) throw new FS.ErrnoError(55);
              }
              delete e.parent.contents[e.name],
                (e.name = n),
                (r.contents[n] = e),
                (e.parent = r);
            },
            unlink: function (e, r) {
              delete e.contents[r];
            },
            rmdir: function (e, r) {
              var n = FS.lookupNode(e, r);
              for (var t in n.contents) throw new FS.ErrnoError(55);
              delete e.contents[r];
            },
            readdir: function (e) {
              var r = [".", ".."];
              for (var n in e.contents)
                !e.contents.hasOwnProperty(n) || r.push(n);
              return r;
            },
            symlink: function (e, r, n) {
              var t = MEMFS.createNode(e, r, 41471, 0);
              return (t.link = n), t;
            },
            readlink: function (e) {
              if (!FS.isLink(e.mode)) throw new FS.ErrnoError(28);
              return e.link;
            },
          },
          stream_ops: {
            read: function (e, r, n, t, o) {
              var a = e.node.contents;
              if (o >= e.node.usedBytes) return 0;
              var i = Math.min(e.node.usedBytes - o, t);
              if (i > 8 && a.subarray) r.set(a.subarray(o, o + i), n);
              else for (var s = 0; s < i; s++) r[n + s] = a[o + s];
              return i;
            },
            write: function (e, r, n, t, o, a) {
              if ((r.buffer === HEAP8.buffer && (a = !1), !t)) return 0;
              var i = e.node;
              if (
                ((i.timestamp = Date.now()),
                r.subarray && (!i.contents || i.contents.subarray))
              ) {
                if (a)
                  return (
                    (i.contents = r.subarray(n, n + t)), (i.usedBytes = t), t
                  );
                if (i.usedBytes === 0 && o === 0)
                  return (i.contents = r.slice(n, n + t)), (i.usedBytes = t), t;
                if (o + t <= i.usedBytes)
                  return i.contents.set(r.subarray(n, n + t), o), t;
              }
              if (
                (MEMFS.expandFileStorage(i, o + t),
                i.contents.subarray && r.subarray)
              )
                i.contents.set(r.subarray(n, n + t), o);
              else for (var s = 0; s < t; s++) i.contents[o + s] = r[n + s];
              return (i.usedBytes = Math.max(i.usedBytes, o + t)), t;
            },
            llseek: function (e, r, n) {
              var t = r;
              if (
                (n === 1
                  ? (t += e.position)
                  : n === 2 &&
                    FS.isFile(e.node.mode) &&
                    (t += e.node.usedBytes),
                t < 0)
              )
                throw new FS.ErrnoError(28);
              return t;
            },
            allocate: function (e, r, n) {
              MEMFS.expandFileStorage(e.node, r + n),
                (e.node.usedBytes = Math.max(e.node.usedBytes, r + n));
            },
            mmap: function (e, r, n, t, o, a) {
              if ((assert(r === 0), !FS.isFile(e.node.mode)))
                throw new FS.ErrnoError(43);
              var i,
                s,
                u = e.node.contents;
              if (!(a & 2) && u.buffer === buffer) (s = !1), (i = u.byteOffset);
              else {
                if (
                  ((t > 0 || t + n < u.length) &&
                    (u.subarray
                      ? (u = u.subarray(t, t + n))
                      : (u = Array.prototype.slice.call(u, t, t + n))),
                  (s = !0),
                  (i = _malloc(n)),
                  !i)
                )
                  throw new FS.ErrnoError(48);
                HEAP8.set(u, i);
              }
              return { ptr: i, allocated: s };
            },
            msync: function (e, r, n, t, o) {
              if (!FS.isFile(e.node.mode)) throw new FS.ErrnoError(43);
              if (o & 2) return 0;
              var a = MEMFS.stream_ops.write(e, r, 0, t, n, !1);
              return 0;
            },
          },
        },
        FS = {
          root: null,
          mounts: [],
          devices: {},
          streams: [],
          nextInode: 1,
          nameTable: null,
          currentPath: "/",
          initialized: !1,
          ignorePermissions: !0,
          trackingDelegate: {},
          tracking: { openFlags: { READ: 1, WRITE: 2 } },
          ErrnoError: null,
          genericErrors: {},
          filesystems: null,
          syncFSRequests: 0,
          handleFSError: function (e) {
            if (!(e instanceof FS.ErrnoError)) throw e + " : " + stackTrace();
            return setErrNo(e.errno);
          },
          lookupPath: function (e, r) {
            if (((e = PATH_FS.resolve(FS.cwd(), e)), (r = r || {}), !e))
              return { path: "", node: null };
            var n = { follow_mount: !0, recurse_count: 0 };
            for (var t in n) r[t] === void 0 && (r[t] = n[t]);
            if (r.recurse_count > 8) throw new FS.ErrnoError(32);
            for (
              var o = PATH.normalizeArray(
                  e.split("/").filter(function (f) {
                    return !!f;
                  }),
                  !1
                ),
                a = FS.root,
                i = "/",
                s = 0;
              s < o.length;
              s++
            ) {
              var u = s === o.length - 1;
              if (u && r.parent) break;
              if (
                ((a = FS.lookupNode(a, o[s])),
                (i = PATH.join2(i, o[s])),
                FS.isMountpoint(a) &&
                  (!u || (u && r.follow_mount)) &&
                  (a = a.mounted.root),
                !u || r.follow)
              )
                for (var c = 0; FS.isLink(a.mode); ) {
                  var _ = FS.readlink(i);
                  i = PATH_FS.resolve(PATH.dirname(i), _);
                  var E = FS.lookupPath(i, { recurse_count: r.recurse_count });
                  if (((a = E.node), c++ > 40)) throw new FS.ErrnoError(32);
                }
            }
            return { path: i, node: a };
          },
          getPath: function (e) {
            for (var r; ; ) {
              if (FS.isRoot(e)) {
                var n = e.mount.mountpoint;
                return r ? (n[n.length - 1] !== "/" ? n + "/" + r : n + r) : n;
              }
              (r = r ? e.name + "/" + r : e.name), (e = e.parent);
            }
          },
          hashName: function (e, r) {
            for (var n = 0, t = 0; t < r.length; t++)
              n = ((n << 5) - n + r.charCodeAt(t)) | 0;
            return ((e + n) >>> 0) % FS.nameTable.length;
          },
          hashAddNode: function (e) {
            var r = FS.hashName(e.parent.id, e.name);
            (e.name_next = FS.nameTable[r]), (FS.nameTable[r] = e);
          },
          hashRemoveNode: function (e) {
            var r = FS.hashName(e.parent.id, e.name);
            if (FS.nameTable[r] === e) FS.nameTable[r] = e.name_next;
            else
              for (var n = FS.nameTable[r]; n; ) {
                if (n.name_next === e) {
                  n.name_next = e.name_next;
                  break;
                }
                n = n.name_next;
              }
          },
          lookupNode: function (e, r) {
            var n = FS.mayLookup(e);
            if (n) throw new FS.ErrnoError(n, e);
            for (
              var t = FS.hashName(e.id, r), o = FS.nameTable[t];
              o;
              o = o.name_next
            ) {
              var a = o.name;
              if (o.parent.id === e.id && a === r) return o;
            }
            return FS.lookup(e, r);
          },
          createNode: function (e, r, n, t) {
            var o = new FS.FSNode(e, r, n, t);
            return FS.hashAddNode(o), o;
          },
          destroyNode: function (e) {
            FS.hashRemoveNode(e);
          },
          isRoot: function (e) {
            return e === e.parent;
          },
          isMountpoint: function (e) {
            return !!e.mounted;
          },
          isFile: function (e) {
            return (e & 61440) === 32768;
          },
          isDir: function (e) {
            return (e & 61440) === 16384;
          },
          isLink: function (e) {
            return (e & 61440) === 40960;
          },
          isChrdev: function (e) {
            return (e & 61440) === 8192;
          },
          isBlkdev: function (e) {
            return (e & 61440) === 24576;
          },
          isFIFO: function (e) {
            return (e & 61440) === 4096;
          },
          isSocket: function (e) {
            return (e & 49152) === 49152;
          },
          flagModes: {
            r: 0,
            rs: 1052672,
            "r+": 2,
            w: 577,
            wx: 705,
            xw: 705,
            "w+": 578,
            "wx+": 706,
            "xw+": 706,
            a: 1089,
            ax: 1217,
            xa: 1217,
            "a+": 1090,
            "ax+": 1218,
            "xa+": 1218,
          },
          modeStringToFlags: function (e) {
            var r = FS.flagModes[e];
            if (typeof r > "u") throw new Error("Unknown file open mode: " + e);
            return r;
          },
          flagsToPermissionString: function (e) {
            var r = ["r", "w", "rw"][e & 3];
            return e & 512 && (r += "w"), r;
          },
          nodePermissions: function (e, r) {
            return FS.ignorePermissions
              ? 0
              : (r.indexOf("r") !== -1 && !(e.mode & 292)) ||
                (r.indexOf("w") !== -1 && !(e.mode & 146)) ||
                (r.indexOf("x") !== -1 && !(e.mode & 73))
              ? 2
              : 0;
          },
          mayLookup: function (e) {
            var r = FS.nodePermissions(e, "x");
            return r || (e.node_ops.lookup ? 0 : 2);
          },
          mayCreate: function (e, r) {
            try {
              var n = FS.lookupNode(e, r);
              return 20;
            } catch {}
            return FS.nodePermissions(e, "wx");
          },
          mayDelete: function (e, r, n) {
            var t;
            try {
              t = FS.lookupNode(e, r);
            } catch (a) {
              return a.errno;
            }
            var o = FS.nodePermissions(e, "wx");
            if (o) return o;
            if (n) {
              if (!FS.isDir(t.mode)) return 54;
              if (FS.isRoot(t) || FS.getPath(t) === FS.cwd()) return 10;
            } else if (FS.isDir(t.mode)) return 31;
            return 0;
          },
          mayOpen: function (e, r) {
            return e
              ? FS.isLink(e.mode)
                ? 32
                : FS.isDir(e.mode) &&
                  (FS.flagsToPermissionString(r) !== "r" || r & 512)
                ? 31
                : FS.nodePermissions(e, FS.flagsToPermissionString(r))
              : 44;
          },
          MAX_OPEN_FDS: 4096,
          nextfd: function (e, r) {
            (e = e || 0), (r = r || FS.MAX_OPEN_FDS);
            for (var n = e; n <= r; n++) if (!FS.streams[n]) return n;
            throw new FS.ErrnoError(33);
          },
          getStream: function (e) {
            return FS.streams[e];
          },
          createStream: function (e, r, n) {
            FS.FSStream ||
              ((FS.FSStream = function () {}),
              (FS.FSStream.prototype = {
                object: {
                  get: function () {
                    return this.node;
                  },
                  set: function (i) {
                    this.node = i;
                  },
                },
                isRead: {
                  get: function () {
                    return (this.flags & 2097155) !== 1;
                  },
                },
                isWrite: {
                  get: function () {
                    return (this.flags & 2097155) !== 0;
                  },
                },
                isAppend: {
                  get: function () {
                    return this.flags & 1024;
                  },
                },
              }));
            var t = new FS.FSStream();
            for (var o in e) t[o] = e[o];
            e = t;
            var a = FS.nextfd(r, n);
            return (e.fd = a), (FS.streams[a] = e), e;
          },
          closeStream: function (e) {
            FS.streams[e] = null;
          },
          chrdev_stream_ops: {
            open: function (e) {
              var r = FS.getDevice(e.node.rdev);
              (e.stream_ops = r.stream_ops),
                e.stream_ops.open && e.stream_ops.open(e);
            },
            llseek: function () {
              throw new FS.ErrnoError(70);
            },
          },
          major: function (e) {
            return e >> 8;
          },
          minor: function (e) {
            return e & 255;
          },
          makedev: function (e, r) {
            return (e << 8) | r;
          },
          registerDevice: function (e, r) {
            FS.devices[e] = { stream_ops: r };
          },
          getDevice: function (e) {
            return FS.devices[e];
          },
          getMounts: function (e) {
            for (var r = [], n = [e]; n.length; ) {
              var t = n.pop();
              r.push(t), n.push.apply(n, t.mounts);
            }
            return r;
          },
          syncfs: function (e, r) {
            typeof e == "function" && ((r = e), (e = !1)),
              FS.syncFSRequests++,
              FS.syncFSRequests > 1 &&
                err(
                  "warning: " +
                    FS.syncFSRequests +
                    " FS.syncfs operations in flight at once, probably just doing extra work"
                );
            var n = FS.getMounts(FS.root.mount),
              t = 0;
            function o(i) {
              return FS.syncFSRequests--, r(i);
            }
            function a(i) {
              if (i) return a.errored ? void 0 : ((a.errored = !0), o(i));
              ++t >= n.length && o(null);
            }
            n.forEach(function (i) {
              if (!i.type.syncfs) return a(null);
              i.type.syncfs(i, e, a);
            });
          },
          mount: function (e, r, n) {
            var t = n === "/",
              o = !n,
              a;
            if (t && FS.root) throw new FS.ErrnoError(10);
            if (!t && !o) {
              var i = FS.lookupPath(n, { follow_mount: !1 });
              if (((n = i.path), (a = i.node), FS.isMountpoint(a)))
                throw new FS.ErrnoError(10);
              if (!FS.isDir(a.mode)) throw new FS.ErrnoError(54);
            }
            var s = { type: e, opts: r, mountpoint: n, mounts: [] },
              u = e.mount(s);
            return (
              (u.mount = s),
              (s.root = u),
              t
                ? (FS.root = u)
                : a && ((a.mounted = s), a.mount && a.mount.mounts.push(s)),
              u
            );
          },
          unmount: function (e) {
            var r = FS.lookupPath(e, { follow_mount: !1 });
            if (!FS.isMountpoint(r.node)) throw new FS.ErrnoError(28);
            var n = r.node,
              t = n.mounted,
              o = FS.getMounts(t);
            Object.keys(FS.nameTable).forEach(function (i) {
              for (var s = FS.nameTable[i]; s; ) {
                var u = s.name_next;
                o.indexOf(s.mount) !== -1 && FS.destroyNode(s), (s = u);
              }
            }),
              (n.mounted = null);
            var a = n.mount.mounts.indexOf(t);
            n.mount.mounts.splice(a, 1);
          },
          lookup: function (e, r) {
            return e.node_ops.lookup(e, r);
          },
          mknod: function (e, r, n) {
            var t = FS.lookupPath(e, { parent: !0 }),
              o = t.node,
              a = PATH.basename(e);
            if (!a || a === "." || a === "..") throw new FS.ErrnoError(28);
            var i = FS.mayCreate(o, a);
            if (i) throw new FS.ErrnoError(i);
            if (!o.node_ops.mknod) throw new FS.ErrnoError(63);
            return o.node_ops.mknod(o, a, r, n);
          },
          create: function (e, r) {
            return (
              (r = r !== void 0 ? r : 438),
              (r &= 4095),
              (r |= 32768),
              FS.mknod(e, r, 0)
            );
          },
          mkdir: function (e, r) {
            return (
              (r = r !== void 0 ? r : 511),
              (r &= 1023),
              (r |= 16384),
              FS.mknod(e, r, 0)
            );
          },
          mkdirTree: function (e, r) {
            for (var n = e.split("/"), t = "", o = 0; o < n.length; ++o)
              if (!!n[o]) {
                t += "/" + n[o];
                try {
                  FS.mkdir(t, r);
                } catch (a) {
                  if (a.errno != 20) throw a;
                }
              }
          },
          mkdev: function (e, r, n) {
            return (
              typeof n > "u" && ((n = r), (r = 438)),
              (r |= 8192),
              FS.mknod(e, r, n)
            );
          },
          symlink: function (e, r) {
            if (!PATH_FS.resolve(e)) throw new FS.ErrnoError(44);
            var n = FS.lookupPath(r, { parent: !0 }),
              t = n.node;
            if (!t) throw new FS.ErrnoError(44);
            var o = PATH.basename(r),
              a = FS.mayCreate(t, o);
            if (a) throw new FS.ErrnoError(a);
            if (!t.node_ops.symlink) throw new FS.ErrnoError(63);
            return t.node_ops.symlink(t, o, e);
          },
          rename: function (e, r) {
            var n = PATH.dirname(e),
              t = PATH.dirname(r),
              o = PATH.basename(e),
              a = PATH.basename(r),
              i,
              s,
              u;
            try {
              (i = FS.lookupPath(e, { parent: !0 })),
                (s = i.node),
                (i = FS.lookupPath(r, { parent: !0 })),
                (u = i.node);
            } catch {
              throw new FS.ErrnoError(10);
            }
            if (!s || !u) throw new FS.ErrnoError(44);
            if (s.mount !== u.mount) throw new FS.ErrnoError(75);
            var c = FS.lookupNode(s, o),
              _ = PATH_FS.relative(e, t);
            if (_.charAt(0) !== ".") throw new FS.ErrnoError(28);
            if (((_ = PATH_FS.relative(r, n)), _.charAt(0) !== "."))
              throw new FS.ErrnoError(55);
            var E;
            try {
              E = FS.lookupNode(u, a);
            } catch {}
            if (c !== E) {
              var f = FS.isDir(c.mode),
                d = FS.mayDelete(s, o, f);
              if (d) throw new FS.ErrnoError(d);
              if (((d = E ? FS.mayDelete(u, a, f) : FS.mayCreate(u, a)), d))
                throw new FS.ErrnoError(d);
              if (!s.node_ops.rename) throw new FS.ErrnoError(63);
              if (FS.isMountpoint(c) || (E && FS.isMountpoint(E)))
                throw new FS.ErrnoError(10);
              if (u !== s && ((d = FS.nodePermissions(s, "w")), d))
                throw new FS.ErrnoError(d);
              try {
                FS.trackingDelegate.willMovePath &&
                  FS.trackingDelegate.willMovePath(e, r);
              } catch (m) {
                err(
                  "FS.trackingDelegate['willMovePath']('" +
                    e +
                    "', '" +
                    r +
                    "') threw an exception: " +
                    m.message
                );
              }
              FS.hashRemoveNode(c);
              try {
                s.node_ops.rename(c, u, a);
              } catch (m) {
                throw m;
              } finally {
                FS.hashAddNode(c);
              }
              try {
                FS.trackingDelegate.onMovePath &&
                  FS.trackingDelegate.onMovePath(e, r);
              } catch (m) {
                err(
                  "FS.trackingDelegate['onMovePath']('" +
                    e +
                    "', '" +
                    r +
                    "') threw an exception: " +
                    m.message
                );
              }
            }
          },
          rmdir: function (e) {
            var r = FS.lookupPath(e, { parent: !0 }),
              n = r.node,
              t = PATH.basename(e),
              o = FS.lookupNode(n, t),
              a = FS.mayDelete(n, t, !0);
            if (a) throw new FS.ErrnoError(a);
            if (!n.node_ops.rmdir) throw new FS.ErrnoError(63);
            if (FS.isMountpoint(o)) throw new FS.ErrnoError(10);
            try {
              FS.trackingDelegate.willDeletePath &&
                FS.trackingDelegate.willDeletePath(e);
            } catch (i) {
              err(
                "FS.trackingDelegate['willDeletePath']('" +
                  e +
                  "') threw an exception: " +
                  i.message
              );
            }
            n.node_ops.rmdir(n, t), FS.destroyNode(o);
            try {
              FS.trackingDelegate.onDeletePath &&
                FS.trackingDelegate.onDeletePath(e);
            } catch (i) {
              err(
                "FS.trackingDelegate['onDeletePath']('" +
                  e +
                  "') threw an exception: " +
                  i.message
              );
            }
          },
          readdir: function (e) {
            var r = FS.lookupPath(e, { follow: !0 }),
              n = r.node;
            if (!n.node_ops.readdir) throw new FS.ErrnoError(54);
            return n.node_ops.readdir(n);
          },
          unlink: function (e) {
            var r = FS.lookupPath(e, { parent: !0 }),
              n = r.node,
              t = PATH.basename(e),
              o = FS.lookupNode(n, t),
              a = FS.mayDelete(n, t, !1);
            if (a) throw new FS.ErrnoError(a);
            if (!n.node_ops.unlink) throw new FS.ErrnoError(63);
            if (FS.isMountpoint(o)) throw new FS.ErrnoError(10);
            try {
              FS.trackingDelegate.willDeletePath &&
                FS.trackingDelegate.willDeletePath(e);
            } catch (i) {
              err(
                "FS.trackingDelegate['willDeletePath']('" +
                  e +
                  "') threw an exception: " +
                  i.message
              );
            }
            n.node_ops.unlink(n, t), FS.destroyNode(o);
            try {
              FS.trackingDelegate.onDeletePath &&
                FS.trackingDelegate.onDeletePath(e);
            } catch (i) {
              err(
                "FS.trackingDelegate['onDeletePath']('" +
                  e +
                  "') threw an exception: " +
                  i.message
              );
            }
          },
          readlink: function (e) {
            var r = FS.lookupPath(e),
              n = r.node;
            if (!n) throw new FS.ErrnoError(44);
            if (!n.node_ops.readlink) throw new FS.ErrnoError(28);
            return PATH_FS.resolve(
              FS.getPath(n.parent),
              n.node_ops.readlink(n)
            );
          },
          stat: function (e, r) {
            var n = FS.lookupPath(e, { follow: !r }),
              t = n.node;
            if (!t) throw new FS.ErrnoError(44);
            if (!t.node_ops.getattr) throw new FS.ErrnoError(63);
            return t.node_ops.getattr(t);
          },
          lstat: function (e) {
            return FS.stat(e, !0);
          },
          chmod: function (e, r, n) {
            var t;
            if (typeof e == "string") {
              var o = FS.lookupPath(e, { follow: !n });
              t = o.node;
            } else t = e;
            if (!t.node_ops.setattr) throw new FS.ErrnoError(63);
            t.node_ops.setattr(t, {
              mode: (r & 4095) | (t.mode & -4096),
              timestamp: Date.now(),
            });
          },
          lchmod: function (e, r) {
            FS.chmod(e, r, !0);
          },
          fchmod: function (e, r) {
            var n = FS.getStream(e);
            if (!n) throw new FS.ErrnoError(8);
            FS.chmod(n.node, r);
          },
          chown: function (e, r, n, t) {
            var o;
            if (typeof e == "string") {
              var a = FS.lookupPath(e, { follow: !t });
              o = a.node;
            } else o = e;
            if (!o.node_ops.setattr) throw new FS.ErrnoError(63);
            o.node_ops.setattr(o, { timestamp: Date.now() });
          },
          lchown: function (e, r, n) {
            FS.chown(e, r, n, !0);
          },
          fchown: function (e, r, n) {
            var t = FS.getStream(e);
            if (!t) throw new FS.ErrnoError(8);
            FS.chown(t.node, r, n);
          },
          truncate: function (e, r) {
            if (r < 0) throw new FS.ErrnoError(28);
            var n;
            if (typeof e == "string") {
              var t = FS.lookupPath(e, { follow: !0 });
              n = t.node;
            } else n = e;
            if (!n.node_ops.setattr) throw new FS.ErrnoError(63);
            if (FS.isDir(n.mode)) throw new FS.ErrnoError(31);
            if (!FS.isFile(n.mode)) throw new FS.ErrnoError(28);
            var o = FS.nodePermissions(n, "w");
            if (o) throw new FS.ErrnoError(o);
            n.node_ops.setattr(n, { size: r, timestamp: Date.now() });
          },
          ftruncate: function (e, r) {
            var n = FS.getStream(e);
            if (!n) throw new FS.ErrnoError(8);
            if ((n.flags & 2097155) === 0) throw new FS.ErrnoError(28);
            FS.truncate(n.node, r);
          },
          utime: function (e, r, n) {
            var t = FS.lookupPath(e, { follow: !0 }),
              o = t.node;
            o.node_ops.setattr(o, { timestamp: Math.max(r, n) });
          },
          open: function (e, r, n, t, o) {
            if (e === "") throw new FS.ErrnoError(44);
            (r = typeof r == "string" ? FS.modeStringToFlags(r) : r),
              (n = typeof n > "u" ? 438 : n),
              r & 64 ? (n = (n & 4095) | 32768) : (n = 0);
            var a;
            if (typeof e == "object") a = e;
            else {
              e = PATH.normalize(e);
              try {
                var i = FS.lookupPath(e, { follow: !(r & 131072) });
                a = i.node;
              } catch {}
            }
            var s = !1;
            if (r & 64)
              if (a) {
                if (r & 128) throw new FS.ErrnoError(20);
              } else (a = FS.mknod(e, n, 0)), (s = !0);
            if (!a) throw new FS.ErrnoError(44);
            if (
              (FS.isChrdev(a.mode) && (r &= -513),
              r & 65536 && !FS.isDir(a.mode))
            )
              throw new FS.ErrnoError(54);
            if (!s) {
              var u = FS.mayOpen(a, r);
              if (u) throw new FS.ErrnoError(u);
            }
            r & 512 && FS.truncate(a, 0), (r &= -131713);
            var c = FS.createStream(
              {
                node: a,
                path: FS.getPath(a),
                flags: r,
                seekable: !0,
                position: 0,
                stream_ops: a.stream_ops,
                ungotten: [],
                error: !1,
              },
              t,
              o
            );
            c.stream_ops.open && c.stream_ops.open(c),
              Module.logReadFiles &&
                !(r & 1) &&
                (FS.readFiles || (FS.readFiles = {}),
                e in FS.readFiles ||
                  ((FS.readFiles[e] = 1),
                  err("FS.trackingDelegate error on read file: " + e)));
            try {
              if (FS.trackingDelegate.onOpenFile) {
                var _ = 0;
                (r & 2097155) !== 1 && (_ |= FS.tracking.openFlags.READ),
                  (r & 2097155) !== 0 && (_ |= FS.tracking.openFlags.WRITE),
                  FS.trackingDelegate.onOpenFile(e, _);
              }
            } catch (E) {
              err(
                "FS.trackingDelegate['onOpenFile']('" +
                  e +
                  "', flags) threw an exception: " +
                  E.message
              );
            }
            return c;
          },
          close: function (e) {
            if (FS.isClosed(e)) throw new FS.ErrnoError(8);
            e.getdents && (e.getdents = null);
            try {
              e.stream_ops.close && e.stream_ops.close(e);
            } catch (r) {
              throw r;
            } finally {
              FS.closeStream(e.fd);
            }
            e.fd = null;
          },
          isClosed: function (e) {
            return e.fd === null;
          },
          llseek: function (e, r, n) {
            if (FS.isClosed(e)) throw new FS.ErrnoError(8);
            if (!e.seekable || !e.stream_ops.llseek)
              throw new FS.ErrnoError(70);
            if (n != 0 && n != 1 && n != 2) throw new FS.ErrnoError(28);
            return (
              (e.position = e.stream_ops.llseek(e, r, n)),
              (e.ungotten = []),
              e.position
            );
          },
          read: function (e, r, n, t, o) {
            if (t < 0 || o < 0) throw new FS.ErrnoError(28);
            if (FS.isClosed(e)) throw new FS.ErrnoError(8);
            if ((e.flags & 2097155) === 1) throw new FS.ErrnoError(8);
            if (FS.isDir(e.node.mode)) throw new FS.ErrnoError(31);
            if (!e.stream_ops.read) throw new FS.ErrnoError(28);
            var a = typeof o < "u";
            if (!a) o = e.position;
            else if (!e.seekable) throw new FS.ErrnoError(70);
            var i = e.stream_ops.read(e, r, n, t, o);
            return a || (e.position += i), i;
          },
          write: function (e, r, n, t, o, a) {
            if (t < 0 || o < 0) throw new FS.ErrnoError(28);
            if (FS.isClosed(e)) throw new FS.ErrnoError(8);
            if ((e.flags & 2097155) === 0) throw new FS.ErrnoError(8);
            if (FS.isDir(e.node.mode)) throw new FS.ErrnoError(31);
            if (!e.stream_ops.write) throw new FS.ErrnoError(28);
            e.seekable && e.flags & 1024 && FS.llseek(e, 0, 2);
            var i = typeof o < "u";
            if (!i) o = e.position;
            else if (!e.seekable) throw new FS.ErrnoError(70);
            var s = e.stream_ops.write(e, r, n, t, o, a);
            i || (e.position += s);
            try {
              e.path &&
                FS.trackingDelegate.onWriteToFile &&
                FS.trackingDelegate.onWriteToFile(e.path);
            } catch (u) {
              err(
                "FS.trackingDelegate['onWriteToFile']('" +
                  e.path +
                  "') threw an exception: " +
                  u.message
              );
            }
            return s;
          },
          allocate: function (e, r, n) {
            if (FS.isClosed(e)) throw new FS.ErrnoError(8);
            if (r < 0 || n <= 0) throw new FS.ErrnoError(28);
            if ((e.flags & 2097155) === 0) throw new FS.ErrnoError(8);
            if (!FS.isFile(e.node.mode) && !FS.isDir(e.node.mode))
              throw new FS.ErrnoError(43);
            if (!e.stream_ops.allocate) throw new FS.ErrnoError(138);
            e.stream_ops.allocate(e, r, n);
          },
          mmap: function (e, r, n, t, o, a) {
            if ((o & 2) !== 0 && (a & 2) === 0 && (e.flags & 2097155) !== 2)
              throw new FS.ErrnoError(2);
            if ((e.flags & 2097155) === 1) throw new FS.ErrnoError(2);
            if (!e.stream_ops.mmap) throw new FS.ErrnoError(43);
            return e.stream_ops.mmap(e, r, n, t, o, a);
          },
          msync: function (e, r, n, t, o) {
            return !e || !e.stream_ops.msync
              ? 0
              : e.stream_ops.msync(e, r, n, t, o);
          },
          munmap: function (e) {
            return 0;
          },
          ioctl: function (e, r, n) {
            if (!e.stream_ops.ioctl) throw new FS.ErrnoError(59);
            return e.stream_ops.ioctl(e, r, n);
          },
          readFile: function (e, r) {
            if (
              ((r = r || {}),
              (r.flags = r.flags || "r"),
              (r.encoding = r.encoding || "binary"),
              r.encoding !== "utf8" && r.encoding !== "binary")
            )
              throw new Error('Invalid encoding type "' + r.encoding + '"');
            var n,
              t = FS.open(e, r.flags),
              o = FS.stat(e),
              a = o.size,
              i = new Uint8Array(a);
            return (
              FS.read(t, i, 0, a, 0),
              r.encoding === "utf8"
                ? (n = UTF8ArrayToString(i, 0))
                : r.encoding === "binary" && (n = i),
              FS.close(t),
              n
            );
          },
          writeFile: function (e, r, n) {
            (n = n || {}), (n.flags = n.flags || "w");
            var t = FS.open(e, n.flags, n.mode);
            if (typeof r == "string") {
              var o = new Uint8Array(lengthBytesUTF8(r) + 1),
                a = stringToUTF8Array(r, o, 0, o.length);
              FS.write(t, o, 0, a, void 0, n.canOwn);
            } else if (ArrayBuffer.isView(r))
              FS.write(t, r, 0, r.byteLength, void 0, n.canOwn);
            else throw new Error("Unsupported data type");
            FS.close(t);
          },
          cwd: function () {
            return FS.currentPath;
          },
          chdir: function (e) {
            var r = FS.lookupPath(e, { follow: !0 });
            if (r.node === null) throw new FS.ErrnoError(44);
            if (!FS.isDir(r.node.mode)) throw new FS.ErrnoError(54);
            var n = FS.nodePermissions(r.node, "x");
            if (n) throw new FS.ErrnoError(n);
            FS.currentPath = r.path;
          },
          createDefaultDirectories: function () {
            FS.mkdir("/tmp"), FS.mkdir("/home"), FS.mkdir("/home/web_user");
          },
          createDefaultDevices: function () {
            FS.mkdir("/dev"),
              FS.registerDevice(FS.makedev(1, 3), {
                read: function () {
                  return 0;
                },
                write: function (n, t, o, a, i) {
                  return a;
                },
              }),
              FS.mkdev("/dev/null", FS.makedev(1, 3)),
              TTY.register(FS.makedev(5, 0), TTY.default_tty_ops),
              TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops),
              FS.mkdev("/dev/tty", FS.makedev(5, 0)),
              FS.mkdev("/dev/tty1", FS.makedev(6, 0));
            var e;
            if (
              typeof crypto == "object" &&
              typeof crypto.getRandomValues == "function"
            ) {
              var r = new Uint8Array(1);
              e = function () {
                return crypto.getRandomValues(r), r[0];
              };
            }
            e ||
              (e = function () {
                abort("random_device");
              }),
              FS.createDevice("/dev", "random", e),
              FS.createDevice("/dev", "urandom", e),
              FS.mkdir("/dev/shm"),
              FS.mkdir("/dev/shm/tmp");
          },
          createSpecialDirectories: function () {
            FS.mkdir("/proc"),
              FS.mkdir("/proc/self"),
              FS.mkdir("/proc/self/fd"),
              FS.mount(
                {
                  mount: function () {
                    var e = FS.createNode("/proc/self", "fd", 16895, 73);
                    return (
                      (e.node_ops = {
                        lookup: function (r, n) {
                          var t = +n,
                            o = FS.getStream(t);
                          if (!o) throw new FS.ErrnoError(8);
                          var a = {
                            parent: null,
                            mount: { mountpoint: "fake" },
                            node_ops: {
                              readlink: function () {
                                return o.path;
                              },
                            },
                          };
                          return (a.parent = a), a;
                        },
                      }),
                      e
                    );
                  },
                },
                {},
                "/proc/self/fd"
              );
          },
          createStandardStreams: function () {
            Module.stdin
              ? FS.createDevice("/dev", "stdin", Module.stdin)
              : FS.symlink("/dev/tty", "/dev/stdin"),
              Module.stdout
                ? FS.createDevice("/dev", "stdout", null, Module.stdout)
                : FS.symlink("/dev/tty", "/dev/stdout"),
              Module.stderr
                ? FS.createDevice("/dev", "stderr", null, Module.stderr)
                : FS.symlink("/dev/tty1", "/dev/stderr");
            var e = FS.open("/dev/stdin", "r"),
              r = FS.open("/dev/stdout", "w"),
              n = FS.open("/dev/stderr", "w");
          },
          ensureErrnoError: function () {
            FS.ErrnoError ||
              ((FS.ErrnoError = function (r, n) {
                (this.node = n),
                  (this.setErrno = function (t) {
                    this.errno = t;
                  }),
                  this.setErrno(r),
                  (this.message = "FS error");
              }),
              (FS.ErrnoError.prototype = new Error()),
              (FS.ErrnoError.prototype.constructor = FS.ErrnoError),
              [44].forEach(function (e) {
                (FS.genericErrors[e] = new FS.ErrnoError(e)),
                  (FS.genericErrors[e].stack = "<generic error, no stack>");
              }));
          },
          staticInit: function () {
            FS.ensureErrnoError(),
              (FS.nameTable = new Array(4096)),
              FS.mount(MEMFS, {}, "/"),
              FS.createDefaultDirectories(),
              FS.createDefaultDevices(),
              FS.createSpecialDirectories(),
              (FS.filesystems = { MEMFS });
          },
          init: function (e, r, n) {
            (FS.init.initialized = !0),
              FS.ensureErrnoError(),
              (Module.stdin = e || Module.stdin),
              (Module.stdout = r || Module.stdout),
              (Module.stderr = n || Module.stderr),
              FS.createStandardStreams();
          },
          quit: function () {
            FS.init.initialized = !1;
            var e = Module._fflush;
            e && e(0);
            for (var r = 0; r < FS.streams.length; r++) {
              var n = FS.streams[r];
              !n || FS.close(n);
            }
          },
          getMode: function (e, r) {
            var n = 0;
            return e && (n |= 365), r && (n |= 146), n;
          },
          joinPath: function (e, r) {
            var n = PATH.join.apply(null, e);
            return r && n[0] == "/" && (n = n.substr(1)), n;
          },
          absolutePath: function (e, r) {
            return PATH_FS.resolve(r, e);
          },
          standardizePath: function (e) {
            return PATH.normalize(e);
          },
          findObject: function (e, r) {
            var n = FS.analyzePath(e, r);
            return n.exists ? n.object : (setErrNo(n.error), null);
          },
          analyzePath: function (e, r) {
            try {
              var n = FS.lookupPath(e, { follow: !r });
              e = n.path;
            } catch {}
            var t = {
              isRoot: !1,
              exists: !1,
              error: 0,
              name: null,
              path: null,
              object: null,
              parentExists: !1,
              parentPath: null,
              parentObject: null,
            };
            try {
              var n = FS.lookupPath(e, { parent: !0 });
              (t.parentExists = !0),
                (t.parentPath = n.path),
                (t.parentObject = n.node),
                (t.name = PATH.basename(e)),
                (n = FS.lookupPath(e, { follow: !r })),
                (t.exists = !0),
                (t.path = n.path),
                (t.object = n.node),
                (t.name = n.node.name),
                (t.isRoot = n.path === "/");
            } catch (o) {
              t.error = o.errno;
            }
            return t;
          },
          createFolder: function (e, r, n, t) {
            var o = PATH.join2(typeof e == "string" ? e : FS.getPath(e), r),
              a = FS.getMode(n, t);
            return FS.mkdir(o, a);
          },
          createPath: function (e, r, n, t) {
            e = typeof e == "string" ? e : FS.getPath(e);
            for (var o = r.split("/").reverse(); o.length; ) {
              var a = o.pop();
              if (!!a) {
                var i = PATH.join2(e, a);
                try {
                  FS.mkdir(i);
                } catch {}
                e = i;
              }
            }
            return i;
          },
          createFile: function (e, r, n, t, o) {
            var a = PATH.join2(typeof e == "string" ? e : FS.getPath(e), r),
              i = FS.getMode(t, o);
            return FS.create(a, i);
          },
          createDataFile: function (e, r, n, t, o, a) {
            var i = r
                ? PATH.join2(typeof e == "string" ? e : FS.getPath(e), r)
                : e,
              s = FS.getMode(t, o),
              u = FS.create(i, s);
            if (n) {
              if (typeof n == "string") {
                for (
                  var c = new Array(n.length), _ = 0, E = n.length;
                  _ < E;
                  ++_
                )
                  c[_] = n.charCodeAt(_);
                n = c;
              }
              FS.chmod(u, s | 146);
              var f = FS.open(u, "w");
              FS.write(f, n, 0, n.length, 0, a), FS.close(f), FS.chmod(u, s);
            }
            return u;
          },
          createDevice: function (e, r, n, t) {
            var o = PATH.join2(typeof e == "string" ? e : FS.getPath(e), r),
              a = FS.getMode(!!n, !!t);
            FS.createDevice.major || (FS.createDevice.major = 64);
            var i = FS.makedev(FS.createDevice.major++, 0);
            return (
              FS.registerDevice(i, {
                open: function (s) {
                  s.seekable = !1;
                },
                close: function (s) {
                  t && t.buffer && t.buffer.length && t(10);
                },
                read: function (s, u, c, _, E) {
                  for (var f = 0, d = 0; d < _; d++) {
                    var m;
                    try {
                      m = n();
                    } catch {
                      throw new FS.ErrnoError(29);
                    }
                    if (m === void 0 && f === 0) throw new FS.ErrnoError(6);
                    if (m == null) break;
                    f++, (u[c + d] = m);
                  }
                  return f && (s.node.timestamp = Date.now()), f;
                },
                write: function (s, u, c, _, E) {
                  for (var f = 0; f < _; f++)
                    try {
                      t(u[c + f]);
                    } catch {
                      throw new FS.ErrnoError(29);
                    }
                  return _ && (s.node.timestamp = Date.now()), f;
                },
              }),
              FS.mkdev(o, a, i)
            );
          },
          createLink: function (e, r, n, t, o) {
            var a = PATH.join2(typeof e == "string" ? e : FS.getPath(e), r);
            return FS.symlink(n, a);
          },
          forceLoadFile: function (e) {
            if (e.isDevice || e.isFolder || e.link || e.contents) return !0;
            var r = !0;
            if (typeof XMLHttpRequest < "u")
              throw new Error(
                "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
              );
            if (read_)
              try {
                (e.contents = intArrayFromString(read_(e.url), !0)),
                  (e.usedBytes = e.contents.length);
              } catch {
                r = !1;
              }
            else
              throw new Error("Cannot load without read() or XMLHttpRequest.");
            return r || setErrNo(29), r;
          },
          createLazyFile: function (e, r, n, t, o) {
            function a() {
              (this.lengthKnown = !1), (this.chunks = []);
            }
            if (
              ((a.prototype.get = function (f) {
                if (!(f > this.length - 1 || f < 0)) {
                  var d = f % this.chunkSize,
                    m = (f / this.chunkSize) | 0;
                  return this.getter(m)[d];
                }
              }),
              (a.prototype.setDataGetter = function (f) {
                this.getter = f;
              }),
              (a.prototype.cacheLength = function () {
                var f = new XMLHttpRequest();
                if (
                  (f.open("HEAD", n, !1),
                  f.send(null),
                  !((f.status >= 200 && f.status < 300) || f.status === 304))
                )
                  throw new Error(
                    "Couldn't load " + n + ". Status: " + f.status
                  );
                var d = Number(f.getResponseHeader("Content-length")),
                  m,
                  F =
                    (m = f.getResponseHeader("Accept-Ranges")) && m === "bytes",
                  h =
                    (m = f.getResponseHeader("Content-Encoding")) &&
                    m === "gzip",
                  p = 1024 * 1024;
                F || (p = d);
                var l = function (v, y) {
                    if (v > y)
                      throw new Error(
                        "invalid range (" +
                          v +
                          ", " +
                          y +
                          ") or no bytes requested!"
                      );
                    if (y > d - 1)
                      throw new Error(
                        "only " + d + " bytes available! programmer error!"
                      );
                    var g = new XMLHttpRequest();
                    if (
                      (g.open("GET", n, !1),
                      d !== p &&
                        g.setRequestHeader("Range", "bytes=" + v + "-" + y),
                      typeof Uint8Array < "u" &&
                        (g.responseType = "arraybuffer"),
                      g.overrideMimeType &&
                        g.overrideMimeType(
                          "text/plain; charset=x-user-defined"
                        ),
                      g.send(null),
                      !(
                        (g.status >= 200 && g.status < 300) ||
                        g.status === 304
                      ))
                    )
                      throw new Error(
                        "Couldn't load " + n + ". Status: " + g.status
                      );
                    return g.response !== void 0
                      ? new Uint8Array(g.response || [])
                      : intArrayFromString(g.responseText || "", !0);
                  },
                  S = this;
                S.setDataGetter(function (v) {
                  var y = v * p,
                    g = (v + 1) * p - 1;
                  if (
                    ((g = Math.min(g, d - 1)),
                    typeof S.chunks[v] > "u" && (S.chunks[v] = l(y, g)),
                    typeof S.chunks[v] > "u")
                  )
                    throw new Error("doXHR failed!");
                  return S.chunks[v];
                }),
                  (h || !d) &&
                    ((p = d = 1),
                    (d = this.getter(0).length),
                    (p = d),
                    out(
                      "LazyFiles on gzip forces download of the whole file when length is accessed"
                    )),
                  (this._length = d),
                  (this._chunkSize = p),
                  (this.lengthKnown = !0);
              }),
              typeof XMLHttpRequest < "u")
            ) {
              if (!ENVIRONMENT_IS_WORKER)
                throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
              var i = new a();
              Object.defineProperties(i, {
                length: {
                  get: function () {
                    return this.lengthKnown || this.cacheLength(), this._length;
                  },
                },
                chunkSize: {
                  get: function () {
                    return (
                      this.lengthKnown || this.cacheLength(), this._chunkSize
                    );
                  },
                },
              });
              var s = { isDevice: !1, contents: i };
            } else var s = { isDevice: !1, url: n };
            var u = FS.createFile(e, r, s, t, o);
            s.contents
              ? (u.contents = s.contents)
              : s.url && ((u.contents = null), (u.url = s.url)),
              Object.defineProperties(u, {
                usedBytes: {
                  get: function () {
                    return this.contents.length;
                  },
                },
              });
            var c = {},
              _ = Object.keys(u.stream_ops);
            return (
              _.forEach(function (E) {
                var f = u.stream_ops[E];
                c[E] = function () {
                  if (!FS.forceLoadFile(u)) throw new FS.ErrnoError(29);
                  return f.apply(null, arguments);
                };
              }),
              (c.read = function (f, d, m, F, h) {
                if (!FS.forceLoadFile(u)) throw new FS.ErrnoError(29);
                var p = f.node.contents;
                if (h >= p.length) return 0;
                var l = Math.min(p.length - h, F);
                if (p.slice) for (var S = 0; S < l; S++) d[m + S] = p[h + S];
                else for (var S = 0; S < l; S++) d[m + S] = p.get(h + S);
                return l;
              }),
              (u.stream_ops = c),
              u
            );
          },
          createPreloadedFile: function (e, r, n, t, o, a, i, s, u, c) {
            Browser.init();
            var _ = r ? PATH_FS.resolve(PATH.join2(e, r)) : e,
              E = "cp " + _;
            function f(d) {
              function m(h) {
                c && c(),
                  s || FS.createDataFile(e, r, h, t, o, u),
                  a && a(),
                  removeRunDependency(E);
              }
              var F = !1;
              Module.preloadPlugins.forEach(function (h) {
                F ||
                  (h.canHandle(_) &&
                    (h.handle(d, _, m, function () {
                      i && i(), removeRunDependency(E);
                    }),
                    (F = !0)));
              }),
                F || m(d);
            }
            addRunDependency(E),
              typeof n == "string"
                ? Browser.asyncLoad(
                    n,
                    function (d) {
                      f(d);
                    },
                    i
                  )
                : f(n);
          },
          indexedDB: function () {
            return (
              window.indexedDB ||
              window.mozIndexedDB ||
              window.webkitIndexedDB ||
              window.msIndexedDB
            );
          },
          DB_NAME: function () {
            return "EM_FS_" + window.location.pathname;
          },
          DB_VERSION: 20,
          DB_STORE_NAME: "FILE_DATA",
          saveFilesToDB: function (e, r, n) {
            (r = r || function () {}), (n = n || function () {});
            var t = FS.indexedDB();
            try {
              var o = t.open(FS.DB_NAME(), FS.DB_VERSION);
            } catch (a) {
              return n(a);
            }
            (o.onupgradeneeded = function () {
              out("creating db");
              var i = o.result;
              i.createObjectStore(FS.DB_STORE_NAME);
            }),
              (o.onsuccess = function () {
                var i = o.result,
                  s = i.transaction([FS.DB_STORE_NAME], "readwrite"),
                  u = s.objectStore(FS.DB_STORE_NAME),
                  c = 0,
                  _ = 0,
                  E = e.length;
                function f() {
                  _ == 0 ? r() : n();
                }
                e.forEach(function (d) {
                  var m = u.put(FS.analyzePath(d).object.contents, d);
                  (m.onsuccess = function () {
                    c++, c + _ == E && f();
                  }),
                    (m.onerror = function () {
                      _++, c + _ == E && f();
                    });
                }),
                  (s.onerror = n);
              }),
              (o.onerror = n);
          },
          loadFilesFromDB: function (e, r, n) {
            (r = r || function () {}), (n = n || function () {});
            var t = FS.indexedDB();
            try {
              var o = t.open(FS.DB_NAME(), FS.DB_VERSION);
            } catch (a) {
              return n(a);
            }
            (o.onupgradeneeded = n),
              (o.onsuccess = function () {
                var i = o.result;
                try {
                  var s = i.transaction([FS.DB_STORE_NAME], "readonly");
                } catch (d) {
                  n(d);
                  return;
                }
                var u = s.objectStore(FS.DB_STORE_NAME),
                  c = 0,
                  _ = 0,
                  E = e.length;
                function f() {
                  _ == 0 ? r() : n();
                }
                e.forEach(function (d) {
                  var m = u.get(d);
                  (m.onsuccess = function () {
                    FS.analyzePath(d).exists && FS.unlink(d),
                      FS.createDataFile(
                        PATH.dirname(d),
                        PATH.basename(d),
                        m.result,
                        !0,
                        !0,
                        !0
                      ),
                      c++,
                      c + _ == E && f();
                  }),
                    (m.onerror = function () {
                      _++, c + _ == E && f();
                    });
                }),
                  (s.onerror = n);
              }),
              (o.onerror = n);
          },
        },
        SYSCALLS = {
          mappings: {},
          DEFAULT_POLLMASK: 5,
          umask: 511,
          calculateAt: function (e, r) {
            if (r[0] !== "/") {
              var n;
              if (e === -100) n = FS.cwd();
              else {
                var t = FS.getStream(e);
                if (!t) throw new FS.ErrnoError(8);
                n = t.path;
              }
              r = PATH.join2(n, r);
            }
            return r;
          },
          doStat: function (e, r, n) {
            try {
              var t = e(r);
            } catch (o) {
              if (
                o &&
                o.node &&
                PATH.normalize(r) !== PATH.normalize(FS.getPath(o.node))
              )
                return -54;
              throw o;
            }
            return (
              (HEAP32[n >> 2] = t.dev),
              (HEAP32[(n + 4) >> 2] = 0),
              (HEAP32[(n + 8) >> 2] = t.ino),
              (HEAP32[(n + 12) >> 2] = t.mode),
              (HEAP32[(n + 16) >> 2] = t.nlink),
              (HEAP32[(n + 20) >> 2] = t.uid),
              (HEAP32[(n + 24) >> 2] = t.gid),
              (HEAP32[(n + 28) >> 2] = t.rdev),
              (HEAP32[(n + 32) >> 2] = 0),
              (tempI64 = [
                t.size >>> 0,
                ((tempDouble = t.size),
                +Math_abs(tempDouble) >= 1
                  ? tempDouble > 0
                    ? (Math_min(
                        +Math_floor(tempDouble / 4294967296),
                        4294967295
                      ) |
                        0) >>>
                      0
                    : ~~+Math_ceil(
                        (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                      ) >>> 0
                  : 0),
              ]),
              (HEAP32[(n + 40) >> 2] = tempI64[0]),
              (HEAP32[(n + 44) >> 2] = tempI64[1]),
              (HEAP32[(n + 48) >> 2] = 4096),
              (HEAP32[(n + 52) >> 2] = t.blocks),
              (HEAP32[(n + 56) >> 2] = (t.atime.getTime() / 1e3) | 0),
              (HEAP32[(n + 60) >> 2] = 0),
              (HEAP32[(n + 64) >> 2] = (t.mtime.getTime() / 1e3) | 0),
              (HEAP32[(n + 68) >> 2] = 0),
              (HEAP32[(n + 72) >> 2] = (t.ctime.getTime() / 1e3) | 0),
              (HEAP32[(n + 76) >> 2] = 0),
              (tempI64 = [
                t.ino >>> 0,
                ((tempDouble = t.ino),
                +Math_abs(tempDouble) >= 1
                  ? tempDouble > 0
                    ? (Math_min(
                        +Math_floor(tempDouble / 4294967296),
                        4294967295
                      ) |
                        0) >>>
                      0
                    : ~~+Math_ceil(
                        (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                      ) >>> 0
                  : 0),
              ]),
              (HEAP32[(n + 80) >> 2] = tempI64[0]),
              (HEAP32[(n + 84) >> 2] = tempI64[1]),
              0
            );
          },
          doMsync: function (e, r, n, t, o) {
            var a = HEAPU8.slice(e, e + n);
            FS.msync(r, a, o, n, t);
          },
          doMkdir: function (e, r) {
            return (
              (e = PATH.normalize(e)),
              e[e.length - 1] === "/" && (e = e.substr(0, e.length - 1)),
              FS.mkdir(e, r, 0),
              0
            );
          },
          doMknod: function (e, r, n) {
            switch (r & 61440) {
              case 32768:
              case 8192:
              case 24576:
              case 4096:
              case 49152:
                break;
              default:
                return -28;
            }
            return FS.mknod(e, r, n), 0;
          },
          doReadlink: function (e, r, n) {
            if (n <= 0) return -28;
            var t = FS.readlink(e),
              o = Math.min(n, lengthBytesUTF8(t)),
              a = HEAP8[r + o];
            return stringToUTF8(t, r, n + 1), (HEAP8[r + o] = a), o;
          },
          doAccess: function (e, r) {
            if (r & -8) return -28;
            var n,
              t = FS.lookupPath(e, { follow: !0 });
            if (((n = t.node), !n)) return -44;
            var o = "";
            return (
              r & 4 && (o += "r"),
              r & 2 && (o += "w"),
              r & 1 && (o += "x"),
              o && FS.nodePermissions(n, o) ? -2 : 0
            );
          },
          doDup: function (e, r, n) {
            var t = FS.getStream(n);
            return t && FS.close(t), FS.open(e, r, 0, n, n).fd;
          },
          doReadv: function (e, r, n, t) {
            for (var o = 0, a = 0; a < n; a++) {
              var i = HEAP32[(r + a * 8) >> 2],
                s = HEAP32[(r + (a * 8 + 4)) >> 2],
                u = FS.read(e, HEAP8, i, s, t);
              if (u < 0) return -1;
              if (((o += u), u < s)) break;
            }
            return o;
          },
          doWritev: function (e, r, n, t) {
            for (var o = 0, a = 0; a < n; a++) {
              var i = HEAP32[(r + a * 8) >> 2],
                s = HEAP32[(r + (a * 8 + 4)) >> 2],
                u = FS.write(e, HEAP8, i, s, t);
              if (u < 0) return -1;
              o += u;
            }
            return o;
          },
          varargs: void 0,
          get: function () {
            SYSCALLS.varargs += 4;
            var e = HEAP32[(SYSCALLS.varargs - 4) >> 2];
            return e;
          },
          getStr: function (e) {
            var r = UTF8ToString(e);
            return r;
          },
          getStreamFromFD: function (e) {
            var r = FS.getStream(e);
            if (!r) throw new FS.ErrnoError(8);
            return r;
          },
          get64: function (e, r) {
            return e;
          },
        };
      function ___sys_unlink(e) {
        try {
          return (e = SYSCALLS.getStr(e)), FS.unlink(e), 0;
        } catch (r) {
          return (
            (typeof FS > "u" || !(r instanceof FS.ErrnoError)) && abort(r),
            -r.errno
          );
        }
      }
      function ___syscall10(e) {
        return ___sys_unlink(e);
      }
      var ERRNO_CODES = {
          EPERM: 63,
          ENOENT: 44,
          ESRCH: 71,
          EINTR: 27,
          EIO: 29,
          ENXIO: 60,
          E2BIG: 1,
          ENOEXEC: 45,
          EBADF: 8,
          ECHILD: 12,
          EAGAIN: 6,
          EWOULDBLOCK: 6,
          ENOMEM: 48,
          EACCES: 2,
          EFAULT: 21,
          ENOTBLK: 105,
          EBUSY: 10,
          EEXIST: 20,
          EXDEV: 75,
          ENODEV: 43,
          ENOTDIR: 54,
          EISDIR: 31,
          EINVAL: 28,
          ENFILE: 41,
          EMFILE: 33,
          ENOTTY: 59,
          ETXTBSY: 74,
          EFBIG: 22,
          ENOSPC: 51,
          ESPIPE: 70,
          EROFS: 69,
          EMLINK: 34,
          EPIPE: 64,
          EDOM: 18,
          ERANGE: 68,
          ENOMSG: 49,
          EIDRM: 24,
          ECHRNG: 106,
          EL2NSYNC: 156,
          EL3HLT: 107,
          EL3RST: 108,
          ELNRNG: 109,
          EUNATCH: 110,
          ENOCSI: 111,
          EL2HLT: 112,
          EDEADLK: 16,
          ENOLCK: 46,
          EBADE: 113,
          EBADR: 114,
          EXFULL: 115,
          ENOANO: 104,
          EBADRQC: 103,
          EBADSLT: 102,
          EDEADLOCK: 16,
          EBFONT: 101,
          ENOSTR: 100,
          ENODATA: 116,
          ETIME: 117,
          ENOSR: 118,
          ENONET: 119,
          ENOPKG: 120,
          EREMOTE: 121,
          ENOLINK: 47,
          EADV: 122,
          ESRMNT: 123,
          ECOMM: 124,
          EPROTO: 65,
          EMULTIHOP: 36,
          EDOTDOT: 125,
          EBADMSG: 9,
          ENOTUNIQ: 126,
          EBADFD: 127,
          EREMCHG: 128,
          ELIBACC: 129,
          ELIBBAD: 130,
          ELIBSCN: 131,
          ELIBMAX: 132,
          ELIBEXEC: 133,
          ENOSYS: 52,
          ENOTEMPTY: 55,
          ENAMETOOLONG: 37,
          ELOOP: 32,
          EOPNOTSUPP: 138,
          EPFNOSUPPORT: 139,
          ECONNRESET: 15,
          ENOBUFS: 42,
          EAFNOSUPPORT: 5,
          EPROTOTYPE: 67,
          ENOTSOCK: 57,
          ENOPROTOOPT: 50,
          ESHUTDOWN: 140,
          ECONNREFUSED: 14,
          EADDRINUSE: 3,
          ECONNABORTED: 13,
          ENETUNREACH: 40,
          ENETDOWN: 38,
          ETIMEDOUT: 73,
          EHOSTDOWN: 142,
          EHOSTUNREACH: 23,
          EINPROGRESS: 26,
          EALREADY: 7,
          EDESTADDRREQ: 17,
          EMSGSIZE: 35,
          EPROTONOSUPPORT: 66,
          ESOCKTNOSUPPORT: 137,
          EADDRNOTAVAIL: 4,
          ENETRESET: 39,
          EISCONN: 30,
          ENOTCONN: 53,
          ETOOMANYREFS: 141,
          EUSERS: 136,
          EDQUOT: 19,
          ESTALE: 72,
          ENOTSUP: 138,
          ENOMEDIUM: 148,
          EILSEQ: 25,
          EOVERFLOW: 61,
          ECANCELED: 11,
          ENOTRECOVERABLE: 56,
          EOWNERDEAD: 62,
          ESTRPIPE: 135,
        },
        SOCKFS = {
          mount: function (e) {
            return (
              (Module.websocket =
                Module.websocket && typeof Module.websocket == "object"
                  ? Module.websocket
                  : {}),
              (Module.websocket._callbacks = {}),
              (Module.websocket.on = function (r, n) {
                return typeof n == "function" && (this._callbacks[r] = n), this;
              }),
              (Module.websocket.emit = function (r, n) {
                typeof this._callbacks[r] == "function" &&
                  this._callbacks[r].call(this, n);
              }),
              FS.createNode(null, "/", 16895, 0)
            );
          },
          createSocket: function (e, r, n) {
            var t = r == 1;
            n && assert(t == (n == 6));
            var o = {
                family: e,
                type: r,
                protocol: n,
                server: null,
                error: null,
                peers: {},
                pending: [],
                recv_queue: [],
                sock_ops: SOCKFS.websocket_sock_ops,
              },
              a = SOCKFS.nextname(),
              i = FS.createNode(SOCKFS.root, a, 49152, 0);
            i.sock = o;
            var s = FS.createStream({
              path: a,
              node: i,
              flags: FS.modeStringToFlags("r+"),
              seekable: !1,
              stream_ops: SOCKFS.stream_ops,
            });
            return (o.stream = s), o;
          },
          getSocket: function (e) {
            var r = FS.getStream(e);
            return !r || !FS.isSocket(r.node.mode) ? null : r.node.sock;
          },
          stream_ops: {
            poll: function (e) {
              var r = e.node.sock;
              return r.sock_ops.poll(r);
            },
            ioctl: function (e, r, n) {
              var t = e.node.sock;
              return t.sock_ops.ioctl(t, r, n);
            },
            read: function (e, r, n, t, o) {
              var a = e.node.sock,
                i = a.sock_ops.recvmsg(a, t);
              return i ? (r.set(i.buffer, n), i.buffer.length) : 0;
            },
            write: function (e, r, n, t, o) {
              var a = e.node.sock;
              return a.sock_ops.sendmsg(a, r, n, t);
            },
            close: function (e) {
              var r = e.node.sock;
              r.sock_ops.close(r);
            },
          },
          nextname: function () {
            return (
              SOCKFS.nextname.current || (SOCKFS.nextname.current = 0),
              "socket[" + SOCKFS.nextname.current++ + "]"
            );
          },
          websocket_sock_ops: {
            createPeer: function (e, r, n) {
              var t;
              if (
                (typeof r == "object" && ((t = r), (r = null), (n = null)), t)
              )
                if (t._socket)
                  (r = t._socket.remoteAddress), (n = t._socket.remotePort);
                else {
                  var o = /ws[s]?:\/\/([^:]+):(\d+)/.exec(t.url);
                  if (!o)
                    throw new Error(
                      "WebSocket URL must be in the format ws(s)://address:port"
                    );
                  (r = o[1]), (n = parseInt(o[2], 10));
                }
              else
                try {
                  var a =
                      Module.websocket && typeof Module.websocket == "object",
                    i = "ws:#".replace("#", "//");
                  if (
                    (a &&
                      typeof Module.websocket.url == "string" &&
                      (i = Module.websocket.url),
                    i === "ws://" || i === "wss://")
                  ) {
                    var s = r.split("/");
                    i = i + s[0] + ":" + n + "/" + s.slice(1).join("/");
                  }
                  var u = "binary";
                  a &&
                    typeof Module.websocket.subprotocol == "string" &&
                    (u = Module.websocket.subprotocol);
                  var c = void 0;
                  u !== "null" &&
                    ((u = u.replace(/^ +| +$/g, "").split(/ *, */)),
                    (c = ENVIRONMENT_IS_NODE ? { protocol: u.toString() } : u)),
                    a &&
                      Module.websocket.subprotocol === null &&
                      ((u = "null"), (c = void 0));
                  var _;
                  (_ = WebSocket),
                    (t = new _(i, c)),
                    (t.binaryType = "arraybuffer");
                } catch {
                  throw new FS.ErrnoError(ERRNO_CODES.EHOSTUNREACH);
                }
              var E = { addr: r, port: n, socket: t, dgram_send_queue: [] };
              return (
                SOCKFS.websocket_sock_ops.addPeer(e, E),
                SOCKFS.websocket_sock_ops.handlePeerEvents(e, E),
                e.type === 2 &&
                  typeof e.sport < "u" &&
                  E.dgram_send_queue.push(
                    new Uint8Array([
                      255,
                      255,
                      255,
                      255,
                      "p".charCodeAt(0),
                      "o".charCodeAt(0),
                      "r".charCodeAt(0),
                      "t".charCodeAt(0),
                      (e.sport & 65280) >> 8,
                      e.sport & 255,
                    ])
                  ),
                E
              );
            },
            getPeer: function (e, r, n) {
              return e.peers[r + ":" + n];
            },
            addPeer: function (e, r) {
              e.peers[r.addr + ":" + r.port] = r;
            },
            removePeer: function (e, r) {
              delete e.peers[r.addr + ":" + r.port];
            },
            handlePeerEvents: function (e, r) {
              var n = !0,
                t = function () {
                  Module.websocket.emit("open", e.stream.fd);
                  try {
                    for (var a = r.dgram_send_queue.shift(); a; )
                      r.socket.send(a), (a = r.dgram_send_queue.shift());
                  } catch {
                    r.socket.close();
                  }
                };
              function o(a) {
                if (typeof a == "string") {
                  var i = new TextEncoder();
                  a = i.encode(a);
                } else {
                  if ((assert(a.byteLength !== void 0), a.byteLength == 0))
                    return;
                  a = new Uint8Array(a);
                }
                var s = n;
                if (
                  ((n = !1),
                  s &&
                    a.length === 10 &&
                    a[0] === 255 &&
                    a[1] === 255 &&
                    a[2] === 255 &&
                    a[3] === 255 &&
                    a[4] === "p".charCodeAt(0) &&
                    a[5] === "o".charCodeAt(0) &&
                    a[6] === "r".charCodeAt(0) &&
                    a[7] === "t".charCodeAt(0))
                ) {
                  var u = (a[8] << 8) | a[9];
                  SOCKFS.websocket_sock_ops.removePeer(e, r),
                    (r.port = u),
                    SOCKFS.websocket_sock_ops.addPeer(e, r);
                  return;
                }
                e.recv_queue.push({ addr: r.addr, port: r.port, data: a }),
                  Module.websocket.emit("message", e.stream.fd);
              }
              ENVIRONMENT_IS_NODE
                ? (r.socket.on("open", t),
                  r.socket.on("message", function (a, i) {
                    !i.binary || o(new Uint8Array(a).buffer);
                  }),
                  r.socket.on("close", function () {
                    Module.websocket.emit("close", e.stream.fd);
                  }),
                  r.socket.on("error", function (a) {
                    (e.error = ERRNO_CODES.ECONNREFUSED),
                      Module.websocket.emit("error", [
                        e.stream.fd,
                        e.error,
                        "ECONNREFUSED: Connection refused",
                      ]);
                  }))
                : ((r.socket.onopen = t),
                  (r.socket.onclose = function () {
                    Module.websocket.emit("close", e.stream.fd);
                  }),
                  (r.socket.onmessage = function (i) {
                    o(i.data);
                  }),
                  (r.socket.onerror = function (a) {
                    (e.error = ERRNO_CODES.ECONNREFUSED),
                      Module.websocket.emit("error", [
                        e.stream.fd,
                        e.error,
                        "ECONNREFUSED: Connection refused",
                      ]);
                  }));
            },
            poll: function (e) {
              if (e.type === 1 && e.server) return e.pending.length ? 65 : 0;
              var r = 0,
                n =
                  e.type === 1
                    ? SOCKFS.websocket_sock_ops.getPeer(e, e.daddr, e.dport)
                    : null;
              return (
                (e.recv_queue.length ||
                  !n ||
                  (n && n.socket.readyState === n.socket.CLOSING) ||
                  (n && n.socket.readyState === n.socket.CLOSED)) &&
                  (r |= 65),
                (!n || (n && n.socket.readyState === n.socket.OPEN)) &&
                  (r |= 4),
                ((n && n.socket.readyState === n.socket.CLOSING) ||
                  (n && n.socket.readyState === n.socket.CLOSED)) &&
                  (r |= 16),
                r
              );
            },
            ioctl: function (e, r, n) {
              switch (r) {
                case 21531:
                  var t = 0;
                  return (
                    e.recv_queue.length && (t = e.recv_queue[0].data.length),
                    (HEAP32[n >> 2] = t),
                    0
                  );
                default:
                  return ERRNO_CODES.EINVAL;
              }
            },
            close: function (e) {
              if (e.server) {
                try {
                  e.server.close();
                } catch {}
                e.server = null;
              }
              for (var r = Object.keys(e.peers), n = 0; n < r.length; n++) {
                var t = e.peers[r[n]];
                try {
                  t.socket.close();
                } catch {}
                SOCKFS.websocket_sock_ops.removePeer(e, t);
              }
              return 0;
            },
            bind: function (e, r, n) {
              if (typeof e.saddr < "u" || typeof e.sport < "u")
                throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
              if (((e.saddr = r), (e.sport = n), e.type === 2)) {
                e.server && (e.server.close(), (e.server = null));
                try {
                  e.sock_ops.listen(e, 0);
                } catch (t) {
                  if (
                    !(t instanceof FS.ErrnoError) ||
                    t.errno !== ERRNO_CODES.EOPNOTSUPP
                  )
                    throw t;
                }
              }
            },
            connect: function (e, r, n) {
              if (e.server) throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
              if (typeof e.daddr < "u" && typeof e.dport < "u") {
                var t = SOCKFS.websocket_sock_ops.getPeer(e, e.daddr, e.dport);
                if (t)
                  throw t.socket.readyState === t.socket.CONNECTING
                    ? new FS.ErrnoError(ERRNO_CODES.EALREADY)
                    : new FS.ErrnoError(ERRNO_CODES.EISCONN);
              }
              var o = SOCKFS.websocket_sock_ops.createPeer(e, r, n);
              throw (
                ((e.daddr = o.addr),
                (e.dport = o.port),
                new FS.ErrnoError(ERRNO_CODES.EINPROGRESS))
              );
            },
            listen: function (e, r) {
              if (!ENVIRONMENT_IS_NODE)
                throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
            },
            accept: function (e) {
              if (!e.server) throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
              var r = e.pending.shift();
              return (r.stream.flags = e.stream.flags), r;
            },
            getname: function (e, r) {
              var n, t;
              if (r) {
                if (e.daddr === void 0 || e.dport === void 0)
                  throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
                (n = e.daddr), (t = e.dport);
              } else (n = e.saddr || 0), (t = e.sport || 0);
              return { addr: n, port: t };
            },
            sendmsg: function (e, r, n, t, o, a) {
              if (e.type === 2) {
                if (
                  ((o === void 0 || a === void 0) &&
                    ((o = e.daddr), (a = e.dport)),
                  o === void 0 || a === void 0)
                )
                  throw new FS.ErrnoError(ERRNO_CODES.EDESTADDRREQ);
              } else (o = e.daddr), (a = e.dport);
              var i = SOCKFS.websocket_sock_ops.getPeer(e, o, a);
              if (e.type === 1) {
                if (
                  !i ||
                  i.socket.readyState === i.socket.CLOSING ||
                  i.socket.readyState === i.socket.CLOSED
                )
                  throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
                if (i.socket.readyState === i.socket.CONNECTING)
                  throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
              ArrayBuffer.isView(r) && ((n += r.byteOffset), (r = r.buffer));
              var s;
              if (
                ((s = r.slice(n, n + t)),
                e.type === 2 && (!i || i.socket.readyState !== i.socket.OPEN))
              )
                return (
                  (!i ||
                    i.socket.readyState === i.socket.CLOSING ||
                    i.socket.readyState === i.socket.CLOSED) &&
                    (i = SOCKFS.websocket_sock_ops.createPeer(e, o, a)),
                  i.dgram_send_queue.push(s),
                  t
                );
              try {
                return i.socket.send(s), t;
              } catch {
                throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
              }
            },
            recvmsg: function (e, r) {
              if (e.type === 1 && e.server)
                throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
              var n = e.recv_queue.shift();
              if (!n)
                if (e.type === 1) {
                  var t = SOCKFS.websocket_sock_ops.getPeer(
                    e,
                    e.daddr,
                    e.dport
                  );
                  if (t) {
                    if (
                      t.socket.readyState === t.socket.CLOSING ||
                      t.socket.readyState === t.socket.CLOSED
                    )
                      return null;
                    throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
                  } else throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
                } else throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              var o = n.data.byteLength || n.data.length,
                a = n.data.byteOffset || 0,
                i = n.data.buffer || n.data,
                s = Math.min(r, o),
                u = {
                  buffer: new Uint8Array(i, a, s),
                  addr: n.addr,
                  port: n.port,
                };
              if (e.type === 1 && s < o) {
                var c = o - s;
                (n.data = new Uint8Array(i, a + s, c)), e.recv_queue.unshift(n);
              }
              return u;
            },
          },
        };
      function __inet_pton4_raw(e) {
        for (var r = e.split("."), n = 0; n < 4; n++) {
          var t = Number(r[n]);
          if (isNaN(t)) return null;
          r[n] = t;
        }
        return (r[0] | (r[1] << 8) | (r[2] << 16) | (r[3] << 24)) >>> 0;
      }
      function jstoi_q(e) {
        return parseInt(e);
      }
      function __inet_pton6_raw(e) {
        var r,
          n,
          t,
          o,
          a =
            /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
          i = [];
        if (!a.test(e)) return null;
        if (e === "::") return [0, 0, 0, 0, 0, 0, 0, 0];
        for (
          e.indexOf("::") === 0
            ? (e = e.replace("::", "Z:"))
            : (e = e.replace("::", ":Z:")),
            e.indexOf(".") > 0
              ? ((e = e.replace(new RegExp("[.]", "g"), ":")),
                (r = e.split(":")),
                (r[r.length - 4] =
                  jstoi_q(r[r.length - 4]) + jstoi_q(r[r.length - 3]) * 256),
                (r[r.length - 3] =
                  jstoi_q(r[r.length - 2]) + jstoi_q(r[r.length - 1]) * 256),
                (r = r.slice(0, r.length - 2)))
              : (r = e.split(":")),
            t = 0,
            o = 0,
            n = 0;
          n < r.length;
          n++
        )
          if (typeof r[n] == "string")
            if (r[n] === "Z") {
              for (o = 0; o < 8 - r.length + 1; o++) i[n + o] = 0;
              t = o - 1;
            } else i[n + t] = _htons(parseInt(r[n], 16));
          else i[n + t] = r[n];
        return [
          (i[1] << 16) | i[0],
          (i[3] << 16) | i[2],
          (i[5] << 16) | i[4],
          (i[7] << 16) | i[6],
        ];
      }
      var DNS = {
        address_map: { id: 1, addrs: {}, names: {} },
        lookup_name: function (e) {
          var r = __inet_pton4_raw(e);
          if (r !== null || ((r = __inet_pton6_raw(e)), r !== null)) return e;
          var n;
          if (DNS.address_map.addrs[e]) n = DNS.address_map.addrs[e];
          else {
            var t = DNS.address_map.id++;
            assert(t < 65535, "exceeded max address mappings of 65535"),
              (n = "172.29." + (t & 255) + "." + (t & 65280)),
              (DNS.address_map.names[n] = e),
              (DNS.address_map.addrs[e] = n);
          }
          return n;
        },
        lookup_addr: function (e) {
          return DNS.address_map.names[e] ? DNS.address_map.names[e] : null;
        },
      };
      function __inet_ntop4_raw(e) {
        return (
          (e & 255) +
          "." +
          ((e >> 8) & 255) +
          "." +
          ((e >> 16) & 255) +
          "." +
          ((e >> 24) & 255)
        );
      }
      function __inet_ntop6_raw(e) {
        var r = "",
          n = 0,
          t = 0,
          o = 0,
          a = 0,
          i = 0,
          s = 0,
          u = [
            e[0] & 65535,
            e[0] >> 16,
            e[1] & 65535,
            e[1] >> 16,
            e[2] & 65535,
            e[2] >> 16,
            e[3] & 65535,
            e[3] >> 16,
          ],
          c = !0,
          _ = "";
        for (s = 0; s < 5; s++)
          if (u[s] !== 0) {
            c = !1;
            break;
          }
        if (c) {
          if (((_ = __inet_ntop4_raw(u[6] | (u[7] << 16))), u[5] === -1))
            return (r = "::ffff:"), (r += _), r;
          if (u[5] === 0)
            return (
              (r = "::"),
              _ === "0.0.0.0" && (_ = ""),
              _ === "0.0.0.1" && (_ = "1"),
              (r += _),
              r
            );
        }
        for (n = 0; n < 8; n++)
          u[n] === 0 && (n - o > 1 && (i = 0), (o = n), i++),
            i > t && ((t = i), (a = n - t + 1));
        for (n = 0; n < 8; n++) {
          if (t > 1 && u[n] === 0 && n >= a && n < a + t) {
            n === a && ((r += ":"), a === 0 && (r += ":"));
            continue;
          }
          (r += Number(_ntohs(u[n] & 65535)).toString(16)),
            (r += n < 7 ? ":" : "");
        }
        return r;
      }
      function __read_sockaddr(e, r) {
        var n = HEAP16[e >> 1],
          t = _ntohs(HEAPU16[(e + 2) >> 1]),
          o;
        switch (n) {
          case 2:
            if (r !== 16) return { errno: 28 };
            (o = HEAP32[(e + 4) >> 2]), (o = __inet_ntop4_raw(o));
            break;
          case 10:
            if (r !== 28) return { errno: 28 };
            (o = [
              HEAP32[(e + 8) >> 2],
              HEAP32[(e + 12) >> 2],
              HEAP32[(e + 16) >> 2],
              HEAP32[(e + 20) >> 2],
            ]),
              (o = __inet_ntop6_raw(o));
            break;
          default:
            return { errno: 5 };
        }
        return { family: n, addr: o, port: t };
      }
      function __write_sockaddr(e, r, n, t) {
        switch (r) {
          case 2:
            (n = __inet_pton4_raw(n)),
              (HEAP16[e >> 1] = r),
              (HEAP32[(e + 4) >> 2] = n),
              (HEAP16[(e + 2) >> 1] = _htons(t));
            break;
          case 10:
            (n = __inet_pton6_raw(n)),
              (HEAP32[e >> 2] = r),
              (HEAP32[(e + 8) >> 2] = n[0]),
              (HEAP32[(e + 12) >> 2] = n[1]),
              (HEAP32[(e + 16) >> 2] = n[2]),
              (HEAP32[(e + 20) >> 2] = n[3]),
              (HEAP16[(e + 2) >> 1] = _htons(t)),
              (HEAP32[(e + 4) >> 2] = 0),
              (HEAP32[(e + 24) >> 2] = 0);
            break;
          default:
            return { errno: 5 };
        }
        return {};
      }
      function ___sys_socketcall(e, r) {
        try {
          SYSCALLS.varargs = r;
          var n = function () {
              var R = SOCKFS.getSocket(SYSCALLS.get());
              if (!R) throw new FS.ErrnoError(8);
              return R;
            },
            t = function (R) {
              var x = SYSCALLS.get(),
                V = SYSCALLS.get();
              if (R && x === 0) return null;
              var I = __read_sockaddr(x, V);
              if (I.errno) throw new FS.ErrnoError(I.errno);
              return (I.addr = DNS.lookup_addr(I.addr) || I.addr), I;
            };
          switch (e) {
            case 1: {
              var o = SYSCALLS.get(),
                a = SYSCALLS.get(),
                i = SYSCALLS.get(),
                s = SOCKFS.createSocket(o, a, i);
              return s.stream.fd;
            }
            case 2: {
              var s = n(),
                u = t();
              return s.sock_ops.bind(s, u.addr, u.port), 0;
            }
            case 3: {
              var s = n(),
                u = t();
              return s.sock_ops.connect(s, u.addr, u.port), 0;
            }
            case 4: {
              var s = n(),
                c = SYSCALLS.get();
              return s.sock_ops.listen(s, c), 0;
            }
            case 5: {
              var s = n(),
                _ = SYSCALLS.get(),
                E = SYSCALLS.get(),
                f = s.sock_ops.accept(s);
              if (_)
                var d = __write_sockaddr(
                  _,
                  f.family,
                  DNS.lookup_name(f.daddr),
                  f.dport
                );
              return f.stream.fd;
            }
            case 6: {
              var s = n(),
                _ = SYSCALLS.get(),
                E = SYSCALLS.get(),
                d = __write_sockaddr(
                  _,
                  s.family,
                  DNS.lookup_name(s.saddr || "0.0.0.0"),
                  s.sport
                );
              return 0;
            }
            case 7: {
              var s = n(),
                _ = SYSCALLS.get(),
                E = SYSCALLS.get();
              if (!s.daddr) return -53;
              var d = __write_sockaddr(
                _,
                s.family,
                DNS.lookup_name(s.daddr),
                s.dport
              );
              return 0;
            }
            case 11: {
              var s = n(),
                m = SYSCALLS.get(),
                F = SYSCALLS.get(),
                h = SYSCALLS.get(),
                p = t(!0);
              return p
                ? s.sock_ops.sendmsg(s, HEAP8, m, F, p.addr, p.port)
                : FS.write(s.stream, HEAP8, m, F);
            }
            case 12: {
              var s = n(),
                l = SYSCALLS.get(),
                S = SYSCALLS.get(),
                h = SYSCALLS.get(),
                _ = SYSCALLS.get(),
                E = SYSCALLS.get(),
                v = s.sock_ops.recvmsg(s, S);
              if (!v) return 0;
              if (_)
                var d = __write_sockaddr(
                  _,
                  s.family,
                  DNS.lookup_name(v.addr),
                  v.port
                );
              return HEAPU8.set(v.buffer, l), v.buffer.byteLength;
            }
            case 14:
              return -50;
            case 15: {
              var s = n(),
                y = SYSCALLS.get(),
                g = SYSCALLS.get(),
                M = SYSCALLS.get(),
                w = SYSCALLS.get();
              return y === 1 && g === 4
                ? ((HEAP32[M >> 2] = s.error),
                  (HEAP32[w >> 2] = 4),
                  (s.error = null),
                  0)
                : -50;
            }
            case 16: {
              var s = n(),
                m = SYSCALLS.get(),
                h = SYSCALLS.get(),
                P = HEAP32[(m + 8) >> 2],
                N = HEAP32[(m + 12) >> 2],
                _,
                H,
                T = HEAP32[m >> 2],
                k = HEAP32[(m + 4) >> 2];
              if (T) {
                var u = __read_sockaddr(T, k);
                if (u.errno) return -u.errno;
                (H = u.port), (_ = DNS.lookup_addr(u.addr) || u.addr);
              }
              for (var b = 0, A = 0; A < N; A++)
                b += HEAP32[(P + (8 * A + 4)) >> 2];
              for (var D = new Uint8Array(b), O = 0, A = 0; A < N; A++)
                for (
                  var C = HEAP32[(P + (8 * A + 0)) >> 2],
                    L = HEAP32[(P + (8 * A + 4)) >> 2],
                    Y = 0;
                  Y < L;
                  Y++
                )
                  D[O++] = HEAP8[(C + Y) >> 0];
              return s.sock_ops.sendmsg(s, D, 0, b, _, H);
            }
            case 17: {
              for (
                var s = n(),
                  m = SYSCALLS.get(),
                  h = SYSCALLS.get(),
                  P = HEAP32[(m + 8) >> 2],
                  N = HEAP32[(m + 12) >> 2],
                  b = 0,
                  A = 0;
                A < N;
                A++
              )
                b += HEAP32[(P + (8 * A + 4)) >> 2];
              var v = s.sock_ops.recvmsg(s, b);
              if (!v) return 0;
              var T = HEAP32[m >> 2];
              if (T)
                var d = __write_sockaddr(
                  T,
                  s.family,
                  DNS.lookup_name(v.addr),
                  v.port
                );
              for (
                var U = 0, B = v.buffer.byteLength, A = 0;
                B > 0 && A < N;
                A++
              ) {
                var C = HEAP32[(P + (8 * A + 0)) >> 2],
                  L = HEAP32[(P + (8 * A + 4)) >> 2];
                if (!!L) {
                  var F = Math.min(L, B),
                    l = v.buffer.subarray(U, U + F);
                  HEAPU8.set(l, C + U), (U += F), (B -= F);
                }
              }
              return U;
            }
            default:
              return -52;
          }
        } catch (R) {
          return (
            (typeof FS > "u" || !(R instanceof FS.ErrnoError)) && abort(R),
            -R.errno
          );
        }
      }
      function ___syscall102(e, r) {
        return ___sys_socketcall(e, r);
      }
      function ___sys_wait4(e, r, n, t) {
        try {
          abort("cannot wait on child processes");
        } catch (o) {
          return (
            (typeof FS > "u" || !(o instanceof FS.ErrnoError)) && abort(o),
            -o.errno
          );
        }
      }
      function ___syscall114(e, r, n, t) {
        return ___sys_wait4(e, r, n, t);
      }
      function ___sys_chdir(e) {
        try {
          return (e = SYSCALLS.getStr(e)), FS.chdir(e), 0;
        } catch (r) {
          return (
            (typeof FS > "u" || !(r instanceof FS.ErrnoError)) && abort(r),
            -r.errno
          );
        }
      }
      function ___syscall12(e) {
        return ___sys_chdir(e);
      }
      function ___sys_uname(e) {
        try {
          if (!e) return -21;
          var r = {
              __size__: 390,
              sysname: 0,
              nodename: 65,
              release: 130,
              version: 195,
              machine: 260,
              domainname: 325,
            },
            n = function (t, o) {
              var a = r[t];
              writeAsciiToMemory(o, e + a);
            };
          return (
            n("sysname", "Emscripten"),
            n("nodename", "emscripten"),
            n("release", "1.0"),
            n("version", "#1"),
            n("machine", "x86-JS"),
            0
          );
        } catch (t) {
          return (
            (typeof FS > "u" || !(t instanceof FS.ErrnoError)) && abort(t),
            -t.errno
          );
        }
      }
      function ___syscall122(e) {
        return ___sys_uname(e);
      }
      function ___sys__newselect(e, r, n, t, o) {
        try {
          for (
            var a = 0,
              i = r ? HEAP32[r >> 2] : 0,
              s = r ? HEAP32[(r + 4) >> 2] : 0,
              u = n ? HEAP32[n >> 2] : 0,
              c = n ? HEAP32[(n + 4) >> 2] : 0,
              _ = t ? HEAP32[t >> 2] : 0,
              E = t ? HEAP32[(t + 4) >> 2] : 0,
              f = 0,
              d = 0,
              m = 0,
              F = 0,
              h = 0,
              p = 0,
              l =
                (r ? HEAP32[r >> 2] : 0) |
                (n ? HEAP32[n >> 2] : 0) |
                (t ? HEAP32[t >> 2] : 0),
              S =
                (r ? HEAP32[(r + 4) >> 2] : 0) |
                (n ? HEAP32[(n + 4) >> 2] : 0) |
                (t ? HEAP32[(t + 4) >> 2] : 0),
              v = function (P, N, H, T) {
                return P < 32 ? N & T : H & T;
              },
              y = 0;
            y < e;
            y++
          ) {
            var g = 1 << y % 32;
            if (!!v(y, l, S, g)) {
              var M = FS.getStream(y);
              if (!M) throw new FS.ErrnoError(8);
              var w = SYSCALLS.DEFAULT_POLLMASK;
              M.stream_ops.poll && (w = M.stream_ops.poll(M)),
                w & 1 &&
                  v(y, i, s, g) &&
                  (y < 32 ? (f = f | g) : (d = d | g), a++),
                w & 4 &&
                  v(y, u, c, g) &&
                  (y < 32 ? (m = m | g) : (F = F | g), a++),
                w & 2 &&
                  v(y, _, E, g) &&
                  (y < 32 ? (h = h | g) : (p = p | g), a++);
            }
          }
          return (
            r && ((HEAP32[r >> 2] = f), (HEAP32[(r + 4) >> 2] = d)),
            n && ((HEAP32[n >> 2] = m), (HEAP32[(n + 4) >> 2] = F)),
            t && ((HEAP32[t >> 2] = h), (HEAP32[(t + 4) >> 2] = p)),
            a
          );
        } catch (P) {
          return (
            (typeof FS > "u" || !(P instanceof FS.ErrnoError)) && abort(P),
            -P.errno
          );
        }
      }
      function ___syscall142(e, r, n, t, o) {
        return ___sys__newselect(e, r, n, t, o);
      }
      function ___sys_chmod(e, r) {
        try {
          return (e = SYSCALLS.getStr(e)), FS.chmod(e, r), 0;
        } catch (n) {
          return (
            (typeof FS > "u" || !(n instanceof FS.ErrnoError)) && abort(n),
            -n.errno
          );
        }
      }
      function ___syscall15(e, r) {
        return ___sys_chmod(e, r);
      }
      function ___sys_mremap(e, r, n, t) {
        return -48;
      }
      function ___syscall163(e, r, n, t, o) {
        return ___sys_mremap(e, r, n, t, o);
      }
      function ___sys_poll(e, r, n) {
        try {
          for (var t = 0, o = 0; o < r; o++) {
            var a = e + 8 * o,
              i = HEAP32[a >> 2],
              s = HEAP16[(a + 4) >> 1],
              u = 32,
              c = FS.getStream(i);
            c &&
              ((u = SYSCALLS.DEFAULT_POLLMASK),
              c.stream_ops.poll && (u = c.stream_ops.poll(c))),
              (u &= s | 8 | 16),
              u && t++,
              (HEAP16[(a + 6) >> 1] = u);
          }
          return t;
        } catch (_) {
          return (
            (typeof FS > "u" || !(_ instanceof FS.ErrnoError)) && abort(_),
            -_.errno
          );
        }
      }
      function ___syscall168(e, r, n) {
        return ___sys_poll(e, r, n);
      }
      function ___sys_getcwd(e, r) {
        try {
          if (r === 0) return -28;
          var n = FS.cwd(),
            t = lengthBytesUTF8(n);
          return r < t + 1 ? -68 : (stringToUTF8(n, e, r), e);
        } catch (o) {
          return (
            (typeof FS > "u" || !(o instanceof FS.ErrnoError)) && abort(o),
            -o.errno
          );
        }
      }
      function ___syscall183(e, r) {
        return ___sys_getcwd(e, r);
      }
      function syscallMmap2(e, r, n, t, o, a) {
        a <<= 12;
        var i,
          s = !1;
        if ((t & 16) !== 0 && e % 16384 !== 0) return -28;
        if ((t & 32) !== 0) {
          if (((i = _memalign(16384, r)), !i)) return -48;
          _memset(i, 0, r), (s = !0);
        } else {
          var u = FS.getStream(o);
          if (!u) return -8;
          var c = FS.mmap(u, e, r, a, n, t);
          (i = c.ptr), (s = c.allocated);
        }
        return (
          (SYSCALLS.mappings[i] = {
            malloc: i,
            len: r,
            allocated: s,
            fd: o,
            prot: n,
            flags: t,
            offset: a,
          }),
          i
        );
      }
      function ___sys_mmap2(e, r, n, t, o, a) {
        try {
          return syscallMmap2(e, r, n, t, o, a);
        } catch (i) {
          return (
            (typeof FS > "u" || !(i instanceof FS.ErrnoError)) && abort(i),
            -i.errno
          );
        }
      }
      function ___syscall192(e, r, n, t, o, a) {
        return ___sys_mmap2(e, r, n, t, o, a);
      }
      function ___sys_ftruncate64(e, r, n, t) {
        try {
          var o = SYSCALLS.get64(n, t);
          return FS.ftruncate(e, o), 0;
        } catch (a) {
          return (
            (typeof FS > "u" || !(a instanceof FS.ErrnoError)) && abort(a),
            -a.errno
          );
        }
      }
      function ___syscall194(e, r, n, t) {
        return ___sys_ftruncate64(e, r, n, t);
      }
      function ___sys_stat64(e, r) {
        try {
          return (e = SYSCALLS.getStr(e)), SYSCALLS.doStat(FS.stat, e, r);
        } catch (n) {
          return (
            (typeof FS > "u" || !(n instanceof FS.ErrnoError)) && abort(n),
            -n.errno
          );
        }
      }
      function ___syscall195(e, r) {
        return ___sys_stat64(e, r);
      }
      function ___sys_lstat64(e, r) {
        try {
          return (e = SYSCALLS.getStr(e)), SYSCALLS.doStat(FS.lstat, e, r);
        } catch (n) {
          return (
            (typeof FS > "u" || !(n instanceof FS.ErrnoError)) && abort(n),
            -n.errno
          );
        }
      }
      function ___syscall196(e, r) {
        return ___sys_lstat64(e, r);
      }
      function ___sys_fstat64(e, r) {
        try {
          var n = SYSCALLS.getStreamFromFD(e);
          return SYSCALLS.doStat(FS.stat, n.path, r);
        } catch (t) {
          return (
            (typeof FS > "u" || !(t instanceof FS.ErrnoError)) && abort(t),
            -t.errno
          );
        }
      }
      function ___syscall197(e, r) {
        return ___sys_fstat64(e, r);
      }
      function ___sys_lchown32(e, r, n) {
        try {
          return (e = SYSCALLS.getStr(e)), FS.chown(e, r, n), 0;
        } catch (t) {
          return (
            (typeof FS > "u" || !(t instanceof FS.ErrnoError)) && abort(t),
            -t.errno
          );
        }
      }
      function ___syscall198(e, r, n) {
        return ___sys_lchown32(e, r, n);
      }
      function ___sys_getegid32() {
        return 0;
      }
      function ___sys_getuid32() {
        return ___sys_getegid32();
      }
      function ___syscall199() {
        return ___sys_getuid32();
      }
      function ___sys_getpid() {
        return 42;
      }
      function ___syscall20() {
        return ___sys_getpid();
      }
      function ___sys_getgid32() {
        return ___sys_getegid32();
      }
      function ___syscall200() {
        return ___sys_getgid32();
      }
      function ___sys_geteuid32() {
        return ___sys_getegid32();
      }
      function ___syscall201() {
        return ___sys_geteuid32();
      }
      function ___sys_getgroups32(e, r) {
        return e < 1 ? -28 : ((HEAP32[r >> 2] = 0), 1);
      }
      function ___syscall205(e, r) {
        return ___sys_getgroups32(e, r);
      }
      function ___sys_fchown32(e, r, n) {
        try {
          return FS.fchown(e, r, n), 0;
        } catch (t) {
          return (
            (typeof FS > "u" || !(t instanceof FS.ErrnoError)) && abort(t),
            -t.errno
          );
        }
      }
      function ___syscall207(e, r, n) {
        return ___sys_fchown32(e, r, n);
      }
      function ___sys_chown32(e, r, n) {
        try {
          return (e = SYSCALLS.getStr(e)), FS.chown(e, r, n), 0;
        } catch (t) {
          return (
            (typeof FS > "u" || !(t instanceof FS.ErrnoError)) && abort(t),
            -t.errno
          );
        }
      }
      function ___syscall212(e, r, n) {
        return ___sys_chown32(e, r, n);
      }
      function ___sys_madvise1(e, r, n) {
        return 0;
      }
      function ___syscall219(e, r, n) {
        return ___sys_madvise1(e, r, n);
      }
      function ___sys_getdents64(e, r, n) {
        try {
          var t = SYSCALLS.getStreamFromFD(e);
          t.getdents || (t.getdents = FS.readdir(t.path));
          for (
            var o = 280, a = 0, i = FS.llseek(t, 0, 1), s = Math.floor(i / o);
            s < t.getdents.length && a + o <= n;

          ) {
            var u,
              c,
              _ = t.getdents[s];
            if (_[0] === ".") (u = 1), (c = 4);
            else {
              var E = FS.lookupNode(t.node, _);
              (u = E.id),
                (c = FS.isChrdev(E.mode)
                  ? 2
                  : FS.isDir(E.mode)
                  ? 4
                  : FS.isLink(E.mode)
                  ? 10
                  : 8);
            }
            (tempI64 = [
              u >>> 0,
              ((tempDouble = u),
              +Math_abs(tempDouble) >= 1
                ? tempDouble > 0
                  ? (Math_min(
                      +Math_floor(tempDouble / 4294967296),
                      4294967295
                    ) |
                      0) >>>
                    0
                  : ~~+Math_ceil(
                      (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                    ) >>> 0
                : 0),
            ]),
              (HEAP32[(r + a) >> 2] = tempI64[0]),
              (HEAP32[(r + a + 4) >> 2] = tempI64[1]),
              (tempI64 = [
                ((s + 1) * o) >>> 0,
                ((tempDouble = (s + 1) * o),
                +Math_abs(tempDouble) >= 1
                  ? tempDouble > 0
                    ? (Math_min(
                        +Math_floor(tempDouble / 4294967296),
                        4294967295
                      ) |
                        0) >>>
                      0
                    : ~~+Math_ceil(
                        (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                      ) >>> 0
                  : 0),
              ]),
              (HEAP32[(r + a + 8) >> 2] = tempI64[0]),
              (HEAP32[(r + a + 12) >> 2] = tempI64[1]),
              (HEAP16[(r + a + 16) >> 1] = 280),
              (HEAP8[(r + a + 18) >> 0] = c),
              stringToUTF8(_, r + a + 19, 256),
              (a += o),
              (s += 1);
          }
          return FS.llseek(t, s * o, 0), a;
        } catch (f) {
          return (
            (typeof FS > "u" || !(f instanceof FS.ErrnoError)) && abort(f),
            -f.errno
          );
        }
      }
      function ___syscall220(e, r, n) {
        return ___sys_getdents64(e, r, n);
      }
      function ___sys_fcntl64(e, r, n) {
        SYSCALLS.varargs = n;
        try {
          var t = SYSCALLS.getStreamFromFD(e);
          switch (r) {
            case 0: {
              var o = SYSCALLS.get();
              if (o < 0) return -28;
              var a;
              return (a = FS.open(t.path, t.flags, 0, o)), a.fd;
            }
            case 1:
            case 2:
              return 0;
            case 3:
              return t.flags;
            case 4: {
              var o = SYSCALLS.get();
              return (t.flags |= o), 0;
            }
            case 12: {
              var o = SYSCALLS.get(),
                i = 0;
              return (HEAP16[(o + i) >> 1] = 2), 0;
            }
            case 13:
            case 14:
              return 0;
            case 16:
            case 8:
              return -28;
            case 9:
              return setErrNo(28), -1;
            default:
              return -28;
          }
        } catch (s) {
          return (
            (typeof FS > "u" || !(s instanceof FS.ErrnoError)) && abort(s),
            -s.errno
          );
        }
      }
      function ___syscall221(e, r, n) {
        return ___sys_fcntl64(e, r, n);
      }
      function ___sys_statfs64(e, r, n) {
        try {
          return (
            (e = SYSCALLS.getStr(e)),
            (HEAP32[(n + 4) >> 2] = 4096),
            (HEAP32[(n + 40) >> 2] = 4096),
            (HEAP32[(n + 8) >> 2] = 1e6),
            (HEAP32[(n + 12) >> 2] = 5e5),
            (HEAP32[(n + 16) >> 2] = 5e5),
            (HEAP32[(n + 20) >> 2] = FS.nextInode),
            (HEAP32[(n + 24) >> 2] = 1e6),
            (HEAP32[(n + 28) >> 2] = 42),
            (HEAP32[(n + 44) >> 2] = 2),
            (HEAP32[(n + 36) >> 2] = 255),
            0
          );
        } catch (t) {
          return (
            (typeof FS > "u" || !(t instanceof FS.ErrnoError)) && abort(t),
            -t.errno
          );
        }
      }
      function ___syscall268(e, r, n) {
        return ___sys_statfs64(e, r, n);
      }
      function ___sys_read(e, r, n) {
        try {
          var t = SYSCALLS.getStreamFromFD(e);
          return FS.read(t, HEAP8, r, n);
        } catch (o) {
          return (
            (typeof FS > "u" || !(o instanceof FS.ErrnoError)) && abort(o),
            -o.errno
          );
        }
      }
      function ___syscall3(e, r, n) {
        return ___sys_read(e, r, n);
      }
      function ___sys_access(e, r) {
        try {
          return (e = SYSCALLS.getStr(e)), SYSCALLS.doAccess(e, r);
        } catch (n) {
          return (
            (typeof FS > "u" || !(n instanceof FS.ErrnoError)) && abort(n),
            -n.errno
          );
        }
      }
      function ___syscall33(e, r) {
        return ___sys_access(e, r);
      }
      function ___sys_nice(e) {
        return -63;
      }
      function ___syscall34(e) {
        return ___sys_nice(e);
      }
      function ___sys_rename(e, r) {
        try {
          return (
            (e = SYSCALLS.getStr(e)),
            (r = SYSCALLS.getStr(r)),
            FS.rename(e, r),
            0
          );
        } catch (n) {
          return (
            (typeof FS > "u" || !(n instanceof FS.ErrnoError)) && abort(n),
            -n.errno
          );
        }
      }
      function ___syscall38(e, r) {
        return ___sys_rename(e, r);
      }
      function ___sys_mkdir(e, r) {
        try {
          return (e = SYSCALLS.getStr(e)), SYSCALLS.doMkdir(e, r);
        } catch (n) {
          return (
            (typeof FS > "u" || !(n instanceof FS.ErrnoError)) && abort(n),
            -n.errno
          );
        }
      }
      function ___syscall39(e, r) {
        return ___sys_mkdir(e, r);
      }
      function ___sys_rmdir(e) {
        try {
          return (e = SYSCALLS.getStr(e)), FS.rmdir(e), 0;
        } catch (r) {
          return (
            (typeof FS > "u" || !(r instanceof FS.ErrnoError)) && abort(r),
            -r.errno
          );
        }
      }
      function ___syscall40(e) {
        return ___sys_rmdir(e);
      }
      function ___sys_dup(e) {
        try {
          var r = SYSCALLS.getStreamFromFD(e);
          return FS.open(r.path, r.flags, 0).fd;
        } catch (n) {
          return (
            (typeof FS > "u" || !(n instanceof FS.ErrnoError)) && abort(n),
            -n.errno
          );
        }
      }
      function ___syscall41(e) {
        return ___sys_dup(e);
      }
      var PIPEFS = {
        BUCKET_BUFFER_SIZE: 8192,
        mount: function (e) {
          return FS.createNode(null, "/", 16895, 0);
        },
        createPipe: function () {
          var e = { buckets: [] };
          e.buckets.push({
            buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
            offset: 0,
            roffset: 0,
          });
          var r = PIPEFS.nextname(),
            n = PIPEFS.nextname(),
            t = FS.createNode(PIPEFS.root, r, 4096, 0),
            o = FS.createNode(PIPEFS.root, n, 4096, 0);
          (t.pipe = e), (o.pipe = e);
          var a = FS.createStream({
            path: r,
            node: t,
            flags: FS.modeStringToFlags("r"),
            seekable: !1,
            stream_ops: PIPEFS.stream_ops,
          });
          t.stream = a;
          var i = FS.createStream({
            path: n,
            node: o,
            flags: FS.modeStringToFlags("w"),
            seekable: !1,
            stream_ops: PIPEFS.stream_ops,
          });
          return (o.stream = i), { readable_fd: a.fd, writable_fd: i.fd };
        },
        stream_ops: {
          poll: function (e) {
            var r = e.node.pipe;
            if ((e.flags & 2097155) === 1) return 260;
            if (r.buckets.length > 0)
              for (var n = 0; n < r.buckets.length; n++) {
                var t = r.buckets[n];
                if (t.offset - t.roffset > 0) return 65;
              }
            return 0;
          },
          ioctl: function (e, r, n) {
            return ERRNO_CODES.EINVAL;
          },
          fsync: function (e) {
            return ERRNO_CODES.EINVAL;
          },
          read: function (e, r, n, t, o) {
            for (var a = e.node.pipe, i = 0, s = 0; s < a.buckets.length; s++) {
              var u = a.buckets[s];
              i += u.offset - u.roffset;
            }
            assert(r instanceof ArrayBuffer || ArrayBuffer.isView(r));
            var c = r.subarray(n, n + t);
            if (t <= 0) return 0;
            if (i == 0) throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            for (
              var _ = Math.min(i, t), E = _, f = 0, s = 0;
              s < a.buckets.length;
              s++
            ) {
              var d = a.buckets[s],
                m = d.offset - d.roffset;
              if (_ <= m) {
                var F = d.buffer.subarray(d.roffset, d.offset);
                _ < m ? ((F = F.subarray(0, _)), (d.roffset += _)) : f++,
                  c.set(F);
                break;
              } else {
                var F = d.buffer.subarray(d.roffset, d.offset);
                c.set(F),
                  (c = c.subarray(F.byteLength)),
                  (_ -= F.byteLength),
                  f++;
              }
            }
            return (
              f &&
                f == a.buckets.length &&
                (f--, (a.buckets[f].offset = 0), (a.buckets[f].roffset = 0)),
              a.buckets.splice(0, f),
              E
            );
          },
          write: function (e, r, n, t, o) {
            var a = e.node.pipe;
            assert(r instanceof ArrayBuffer || ArrayBuffer.isView(r));
            var i = r.subarray(n, n + t),
              s = i.byteLength;
            if (s <= 0) return 0;
            var u = null;
            a.buckets.length == 0
              ? ((u = {
                  buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
                  offset: 0,
                  roffset: 0,
                }),
                a.buckets.push(u))
              : (u = a.buckets[a.buckets.length - 1]),
              assert(u.offset <= PIPEFS.BUCKET_BUFFER_SIZE);
            var c = PIPEFS.BUCKET_BUFFER_SIZE - u.offset;
            if (c >= s) return u.buffer.set(i, u.offset), (u.offset += s), s;
            c > 0 &&
              (u.buffer.set(i.subarray(0, c), u.offset),
              (u.offset += c),
              (i = i.subarray(c, i.byteLength)));
            for (
              var _ = (i.byteLength / PIPEFS.BUCKET_BUFFER_SIZE) | 0,
                E = i.byteLength % PIPEFS.BUCKET_BUFFER_SIZE,
                f = 0;
              f < _;
              f++
            ) {
              var d = {
                buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
                offset: PIPEFS.BUCKET_BUFFER_SIZE,
                roffset: 0,
              };
              a.buckets.push(d),
                d.buffer.set(i.subarray(0, PIPEFS.BUCKET_BUFFER_SIZE)),
                (i = i.subarray(PIPEFS.BUCKET_BUFFER_SIZE, i.byteLength));
            }
            if (E > 0) {
              var d = {
                buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
                offset: i.byteLength,
                roffset: 0,
              };
              a.buckets.push(d), d.buffer.set(i);
            }
            return s;
          },
          close: function (e) {
            var r = e.node.pipe;
            r.buckets = null;
          },
        },
        nextname: function () {
          return (
            PIPEFS.nextname.current || (PIPEFS.nextname.current = 0),
            "pipe[" + PIPEFS.nextname.current++ + "]"
          );
        },
      };
      function ___sys_pipe(e) {
        try {
          if (e == 0) throw new FS.ErrnoError(21);
          var r = PIPEFS.createPipe();
          return (
            (HEAP32[e >> 2] = r.readable_fd),
            (HEAP32[(e + 4) >> 2] = r.writable_fd),
            0
          );
        } catch (n) {
          return (
            (typeof FS > "u" || !(n instanceof FS.ErrnoError)) && abort(n),
            -n.errno
          );
        }
      }
      function ___syscall42(e) {
        return ___sys_pipe(e);
      }
      function ___sys_open(e, r, n) {
        SYSCALLS.varargs = n;
        try {
          var t = SYSCALLS.getStr(e),
            o = SYSCALLS.get(),
            a = FS.open(t, r, o);
          return a.fd;
        } catch (i) {
          return (
            (typeof FS > "u" || !(i instanceof FS.ErrnoError)) && abort(i),
            -i.errno
          );
        }
      }
      function ___syscall5(e, r, n) {
        return ___sys_open(e, r, n);
      }
      function ___sys_ioctl(e, r, n) {
        SYSCALLS.varargs = n;
        try {
          var t = SYSCALLS.getStreamFromFD(e);
          switch (r) {
            case 21509:
            case 21505:
              return t.tty ? 0 : -59;
            case 21510:
            case 21511:
            case 21512:
            case 21506:
            case 21507:
            case 21508:
              return t.tty ? 0 : -59;
            case 21519: {
              if (!t.tty) return -59;
              var o = SYSCALLS.get();
              return (HEAP32[o >> 2] = 0), 0;
            }
            case 21520:
              return t.tty ? -28 : -59;
            case 21531: {
              var o = SYSCALLS.get();
              return FS.ioctl(t, r, o);
            }
            case 21523:
              return t.tty ? 0 : -59;
            case 21524:
              return t.tty ? 0 : -59;
            default:
              abort("bad ioctl syscall " + r);
          }
        } catch (a) {
          return (
            (typeof FS > "u" || !(a instanceof FS.ErrnoError)) && abort(a),
            -a.errno
          );
        }
      }
      function ___syscall54(e, r, n) {
        return ___sys_ioctl(e, r, n);
      }
      function ___sys_umask(e) {
        try {
          var r = SYSCALLS.umask;
          return (SYSCALLS.umask = e), r;
        } catch (n) {
          return (
            (typeof FS > "u" || !(n instanceof FS.ErrnoError)) && abort(n),
            -n.errno
          );
        }
      }
      function ___syscall60(e) {
        return ___sys_umask(e);
      }
      function ___sys_dup2(e, r) {
        try {
          var n = SYSCALLS.getStreamFromFD(e);
          return n.fd === r ? r : SYSCALLS.doDup(n.path, n.flags, r);
        } catch (t) {
          return (
            (typeof FS > "u" || !(t instanceof FS.ErrnoError)) && abort(t),
            -t.errno
          );
        }
      }
      function ___syscall63(e, r) {
        return ___sys_dup2(e, r);
      }
      function ___sys_getrusage(e, r) {
        try {
          return (
            _memset(r, 0, 136),
            (HEAP32[r >> 2] = 1),
            (HEAP32[(r + 4) >> 2] = 2),
            (HEAP32[(r + 8) >> 2] = 3),
            (HEAP32[(r + 12) >> 2] = 4),
            0
          );
        } catch (n) {
          return (
            (typeof FS > "u" || !(n instanceof FS.ErrnoError)) && abort(n),
            -n.errno
          );
        }
      }
      function ___syscall77(e, r) {
        return ___sys_getrusage(e, r);
      }
      function ___sys_symlink(e, r) {
        try {
          return (
            (e = SYSCALLS.getStr(e)),
            (r = SYSCALLS.getStr(r)),
            FS.symlink(e, r),
            0
          );
        } catch (n) {
          return (
            (typeof FS > "u" || !(n instanceof FS.ErrnoError)) && abort(n),
            -n.errno
          );
        }
      }
      function ___syscall83(e, r) {
        return ___sys_symlink(e, r);
      }
      function ___sys_readlink(e, r, n) {
        try {
          return (e = SYSCALLS.getStr(e)), SYSCALLS.doReadlink(e, r, n);
        } catch (t) {
          return (
            (typeof FS > "u" || !(t instanceof FS.ErrnoError)) && abort(t),
            -t.errno
          );
        }
      }
      function ___syscall85(e, r, n) {
        return ___sys_readlink(e, r, n);
      }
      function ___sys_link(e, r) {
        return -34;
      }
      function ___syscall9(e, r) {
        return ___sys_link(e, r);
      }
      function syscallMunmap(e, r) {
        if ((e | 0) === -1 || r === 0) return -28;
        var n = SYSCALLS.mappings[e];
        if (!n) return 0;
        if (r === n.len) {
          var t = FS.getStream(n.fd);
          n.prot & 2 && SYSCALLS.doMsync(e, t, r, n.flags, n.offset),
            FS.munmap(t),
            (SYSCALLS.mappings[e] = null),
            n.allocated && _free(n.malloc);
        }
        return 0;
      }
      function ___sys_munmap(e, r) {
        try {
          return syscallMunmap(e, r);
        } catch (n) {
          return (
            (typeof FS > "u" || !(n instanceof FS.ErrnoError)) && abort(n),
            -n.errno
          );
        }
      }
      function ___syscall91(e, r) {
        return ___sys_munmap(e, r);
      }
      function ___sys_fchmod(e, r) {
        try {
          return FS.fchmod(e, r), 0;
        } catch (n) {
          return (
            (typeof FS > "u" || !(n instanceof FS.ErrnoError)) && abort(n),
            -n.errno
          );
        }
      }
      function ___syscall94(e, r) {
        return ___sys_fchmod(e, r);
      }
      function _fd_close(e) {
        try {
          var r = SYSCALLS.getStreamFromFD(e);
          return FS.close(r), 0;
        } catch (n) {
          return (
            (typeof FS > "u" || !(n instanceof FS.ErrnoError)) && abort(n),
            n.errno
          );
        }
      }
      function ___wasi_fd_close(e) {
        return _fd_close(e);
      }
      function _fd_fdstat_get(e, r) {
        try {
          var n = SYSCALLS.getStreamFromFD(e),
            t = n.tty ? 2 : FS.isDir(n.mode) ? 3 : FS.isLink(n.mode) ? 7 : 4;
          return (HEAP8[r >> 0] = t), 0;
        } catch (o) {
          return (
            (typeof FS > "u" || !(o instanceof FS.ErrnoError)) && abort(o),
            o.errno
          );
        }
      }
      function ___wasi_fd_fdstat_get(e, r) {
        return _fd_fdstat_get(e, r);
      }
      function _fd_read(e, r, n, t) {
        try {
          var o = SYSCALLS.getStreamFromFD(e),
            a = SYSCALLS.doReadv(o, r, n);
          return (HEAP32[t >> 2] = a), 0;
        } catch (i) {
          return (
            (typeof FS > "u" || !(i instanceof FS.ErrnoError)) && abort(i),
            i.errno
          );
        }
      }
      function ___wasi_fd_read(e, r, n, t) {
        return _fd_read(e, r, n, t);
      }
      function _fd_seek(e, r, n, t, o) {
        try {
          var a = SYSCALLS.getStreamFromFD(e),
            i = 4294967296,
            s = n * i + (r >>> 0),
            u = 9007199254740992;
          return s <= -u || s >= u
            ? -61
            : (FS.llseek(a, s, t),
              (tempI64 = [
                a.position >>> 0,
                ((tempDouble = a.position),
                +Math_abs(tempDouble) >= 1
                  ? tempDouble > 0
                    ? (Math_min(
                        +Math_floor(tempDouble / 4294967296),
                        4294967295
                      ) |
                        0) >>>
                      0
                    : ~~+Math_ceil(
                        (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                      ) >>> 0
                  : 0),
              ]),
              (HEAP32[o >> 2] = tempI64[0]),
              (HEAP32[(o + 4) >> 2] = tempI64[1]),
              a.getdents && s === 0 && t === 0 && (a.getdents = null),
              0);
        } catch (c) {
          return (
            (typeof FS > "u" || !(c instanceof FS.ErrnoError)) && abort(c),
            c.errno
          );
        }
      }
      function ___wasi_fd_seek(e, r, n, t, o) {
        return _fd_seek(e, r, n, t, o);
      }
      function _fd_sync(e) {
        try {
          var r = SYSCALLS.getStreamFromFD(e);
          return r.stream_ops && r.stream_ops.fsync
            ? -r.stream_ops.fsync(r)
            : 0;
        } catch (n) {
          return (
            (typeof FS > "u" || !(n instanceof FS.ErrnoError)) && abort(n),
            n.errno
          );
        }
      }
      function ___wasi_fd_sync(e) {
        return _fd_sync(e);
      }
      function _fd_write(e, r, n, t) {
        try {
          var o = SYSCALLS.getStreamFromFD(e),
            a = SYSCALLS.doWritev(o, r, n);
          return (HEAP32[t >> 2] = a), 0;
        } catch (i) {
          return (
            (typeof FS > "u" || !(i instanceof FS.ErrnoError)) && abort(i),
            i.errno
          );
        }
      }
      function ___wasi_fd_write(e, r, n, t) {
        return _fd_write(e, r, n, t);
      }
      function _exit(e) {
        exit(e);
      }
      function __exit(e) {
        return _exit(e);
      }
      function _abort() {
        abort();
      }
      function _tzset() {
        if (_tzset.called) return;
        (_tzset.called = !0),
          (HEAP32[__get_timezone() >> 2] = new Date().getTimezoneOffset() * 60);
        var e = new Date().getFullYear(),
          r = new Date(e, 0, 1),
          n = new Date(e, 6, 1);
        HEAP32[__get_daylight() >> 2] = Number(
          r.getTimezoneOffset() != n.getTimezoneOffset()
        );
        function t(u) {
          var c = u.toTimeString().match(/\(([A-Za-z ]+)\)$/);
          return c ? c[1] : "GMT";
        }
        var o = t(r),
          a = t(n),
          i = allocateUTF8(o),
          s = allocateUTF8(a);
        n.getTimezoneOffset() < r.getTimezoneOffset()
          ? ((HEAP32[__get_tzname() >> 2] = i),
            (HEAP32[(__get_tzname() + 4) >> 2] = s))
          : ((HEAP32[__get_tzname() >> 2] = s),
            (HEAP32[(__get_tzname() + 4) >> 2] = i));
      }
      function _mktime(e) {
        _tzset();
        var r = new Date(
            HEAP32[(e + 20) >> 2] + 1900,
            HEAP32[(e + 16) >> 2],
            HEAP32[(e + 12) >> 2],
            HEAP32[(e + 8) >> 2],
            HEAP32[(e + 4) >> 2],
            HEAP32[e >> 2],
            0
          ),
          n = HEAP32[(e + 32) >> 2],
          t = r.getTimezoneOffset(),
          o = new Date(r.getFullYear(), 0, 1),
          a = new Date(r.getFullYear(), 6, 1).getTimezoneOffset(),
          i = o.getTimezoneOffset(),
          s = Math.min(i, a);
        if (n < 0) HEAP32[(e + 32) >> 2] = Number(a != i && s == t);
        else if (n > 0 != (s == t)) {
          var u = Math.max(i, a),
            c = n > 0 ? s : u;
          r.setTime(r.getTime() + (c - t) * 6e4);
        }
        HEAP32[(e + 24) >> 2] = r.getDay();
        var _ = ((r.getTime() - o.getTime()) / (1e3 * 60 * 60 * 24)) | 0;
        return (HEAP32[(e + 28) >> 2] = _), (r.getTime() / 1e3) | 0;
      }
      function _asctime_r(e, r) {
        var n = {
            tm_sec: HEAP32[e >> 2],
            tm_min: HEAP32[(e + 4) >> 2],
            tm_hour: HEAP32[(e + 8) >> 2],
            tm_mday: HEAP32[(e + 12) >> 2],
            tm_mon: HEAP32[(e + 16) >> 2],
            tm_year: HEAP32[(e + 20) >> 2],
            tm_wday: HEAP32[(e + 24) >> 2],
          },
          t = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          o = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          a =
            t[n.tm_wday] +
            " " +
            o[n.tm_mon] +
            (n.tm_mday < 10 ? "  " : " ") +
            n.tm_mday +
            (n.tm_hour < 10 ? " 0" : " ") +
            n.tm_hour +
            (n.tm_min < 10 ? ":0" : ":") +
            n.tm_min +
            (n.tm_sec < 10 ? ":0" : ":") +
            n.tm_sec +
            " " +
            (1900 + n.tm_year) +
            `
`;
        return stringToUTF8(a, r, 26), r;
      }
      function _chroot(e) {
        return setErrNo(2), -1;
      }
      function _difftime(e, r) {
        return e - r;
      }
      function _dlclose(e) {
        abort(
          "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
        );
      }
      function _dlerror() {
        abort(
          "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
        );
      }
      function _dlopen(e, r) {
        abort(
          "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
        );
      }
      function _dlsym(e, r) {
        abort(
          "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
        );
      }
      function _emscripten_get_heap_size() {
        return HEAPU8.length;
      }
      function emscripten_realloc_buffer(e) {
        try {
          return (
            wasmMemory.grow((e - buffer.byteLength + 65535) >>> 16),
            updateGlobalBufferAndViews(wasmMemory.buffer),
            1
          );
        } catch {}
      }
      function _emscripten_resize_heap(e) {
        e = e >>> 0;
        var r = _emscripten_get_heap_size(),
          n = 65536,
          t = 2147483648 - n;
        if (e > t) return !1;
        for (var o = 16777216, a = 1; a <= 4; a *= 2) {
          var i = r * (1 + 0.2 / a);
          i = Math.min(i, e + 100663296);
          var s = Math.min(t, alignUp(Math.max(o, e, i), n)),
            u = emscripten_realloc_buffer(s);
          if (u) return !0;
        }
        return !1;
      }
      function _execl(e, r, n) {
        return setErrNo(45), -1;
      }
      function _execle(e, r, n) {
        return _execl(e, r, n);
      }
      function _execvp(e, r, n) {
        return _execl(e, r, n);
      }
      function _flock(e, r) {
        return 0;
      }
      function _fork() {
        return setErrNo(6), -1;
      }
      var GAI_ERRNO_MESSAGES = {};
      function _gai_strerror(e) {
        var r = 256;
        _gai_strerror.buffer ||
          ((_gai_strerror.buffer = _malloc(r)),
          (GAI_ERRNO_MESSAGES[0] = "Success"),
          (GAI_ERRNO_MESSAGES["" + -1] = "Invalid value for 'ai_flags' field"),
          (GAI_ERRNO_MESSAGES["" + -2] = "NAME or SERVICE is unknown"),
          (GAI_ERRNO_MESSAGES["" + -3] =
            "Temporary failure in name resolution"),
          (GAI_ERRNO_MESSAGES["" + -4] = "Non-recoverable failure in name res"),
          (GAI_ERRNO_MESSAGES["" + -6] = "'ai_family' not supported"),
          (GAI_ERRNO_MESSAGES["" + -7] = "'ai_socktype' not supported"),
          (GAI_ERRNO_MESSAGES["" + -8] =
            "SERVICE not supported for 'ai_socktype'"),
          (GAI_ERRNO_MESSAGES["" + -10] = "Memory allocation failure"),
          (GAI_ERRNO_MESSAGES["" + -11] = "System error returned in 'errno'"),
          (GAI_ERRNO_MESSAGES["" + -12] = "Argument buffer overflow"));
        var n = "Unknown error";
        return (
          e in GAI_ERRNO_MESSAGES &&
            (GAI_ERRNO_MESSAGES[e].length > r - 1
              ? (n = "Message too long")
              : (n = GAI_ERRNO_MESSAGES[e])),
          writeAsciiToMemory(n, _gai_strerror.buffer),
          _gai_strerror.buffer
        );
      }
      function _getaddrinfo(e, r, n, t) {
        var o = 0,
          a = 0,
          i = 0,
          s = 0,
          u = 0,
          c = 0,
          _;
        function E(f, d, m, F, h, p) {
          var l, S, v, y;
          return (
            (S = f === 10 ? 28 : 16),
            (h = f === 10 ? __inet_ntop6_raw(h) : __inet_ntop4_raw(h)),
            (l = _malloc(S)),
            (y = __write_sockaddr(l, f, h, p)),
            assert(!y.errno),
            (v = _malloc(32)),
            (HEAP32[(v + 4) >> 2] = f),
            (HEAP32[(v + 8) >> 2] = d),
            (HEAP32[(v + 12) >> 2] = m),
            (HEAP32[(v + 24) >> 2] = F),
            (HEAP32[(v + 20) >> 2] = l),
            f === 10
              ? (HEAP32[(v + 16) >> 2] = 28)
              : (HEAP32[(v + 16) >> 2] = 16),
            (HEAP32[(v + 28) >> 2] = 0),
            v
          );
        }
        if (
          (n &&
            ((i = HEAP32[n >> 2]),
            (s = HEAP32[(n + 4) >> 2]),
            (u = HEAP32[(n + 8) >> 2]),
            (c = HEAP32[(n + 12) >> 2])),
          u && !c && (c = u === 2 ? 17 : 6),
          !u && c && (u = c === 17 ? 2 : 1),
          c === 0 && (c = 6),
          u === 0 && (u = 1),
          !e && !r)
        )
          return -2;
        if (i & -1088 || (n !== 0 && HEAP32[n >> 2] & 2 && !e)) return -1;
        if (i & 32) return -2;
        if (u !== 0 && u !== 1 && u !== 2) return -7;
        if (s !== 0 && s !== 2 && s !== 10) return -6;
        if (r && ((r = UTF8ToString(r)), (a = parseInt(r, 10)), isNaN(a)))
          return i & 1024 ? -2 : -8;
        if (!e)
          return (
            s === 0 && (s = 2),
            (i & 1) === 0 &&
              (s === 2 ? (o = _htonl(2130706433)) : (o = [0, 0, 0, 1])),
            (_ = E(s, u, c, null, o, a)),
            (HEAP32[t >> 2] = _),
            0
          );
        if (((e = UTF8ToString(e)), (o = __inet_pton4_raw(e)), o !== null))
          if (s === 0 || s === 2) s = 2;
          else if (s === 10 && i & 8) (o = [0, 0, _htonl(65535), o]), (s = 10);
          else return -2;
        else if (((o = __inet_pton6_raw(e)), o !== null))
          if (s === 0 || s === 10) s = 10;
          else return -2;
        return o != null
          ? ((_ = E(s, u, c, e, o, a)), (HEAP32[t >> 2] = _), 0)
          : i & 4
          ? -2
          : ((e = DNS.lookup_name(e)),
            (o = __inet_pton4_raw(e)),
            s === 0 ? (s = 2) : s === 10 && (o = [0, 0, _htonl(65535), o]),
            (_ = E(s, u, c, null, o, a)),
            (HEAP32[t >> 2] = _),
            0);
      }
      function _getdtablesize() {
        err("missing function: getdtablesize"), abort(-1);
      }
      function _getenv(e) {
        return e === 0 || ((e = UTF8ToString(e)), !ENV.hasOwnProperty(e))
          ? 0
          : (_getenv.ret && _free(_getenv.ret),
            (_getenv.ret = allocateUTF8(ENV[e])),
            _getenv.ret);
      }
      function _getgrnam() {
        throw "getgrnam: TODO";
      }
      function _gethostbyname(e) {
        e = UTF8ToString(e);
        var r = _malloc(20),
          n = _malloc(e.length + 1);
        stringToUTF8(e, n, e.length + 1), (HEAP32[r >> 2] = n);
        var t = _malloc(4);
        (HEAP32[t >> 2] = 0), (HEAP32[(r + 4) >> 2] = t);
        var o = 2;
        (HEAP32[(r + 8) >> 2] = o), (HEAP32[(r + 12) >> 2] = 4);
        var a = _malloc(12);
        return (
          (HEAP32[a >> 2] = a + 8),
          (HEAP32[(a + 4) >> 2] = 0),
          (HEAP32[(a + 8) >> 2] = __inet_pton4_raw(DNS.lookup_name(e))),
          (HEAP32[(r + 16) >> 2] = a),
          r
        );
      }
      function _gethostbyaddr(e, r, n) {
        if (n !== 2) return setErrNo(5), null;
        e = HEAP32[e >> 2];
        var t = __inet_ntop4_raw(e),
          o = DNS.lookup_addr(t);
        o && (t = o);
        var a = allocate(intArrayFromString(t), "i8", ALLOC_STACK);
        return _gethostbyname(a);
      }
      function _gethostbyname_r(e, r, n, t, o, a) {
        var i = _gethostbyname(e);
        return (
          _memcpy(r, i, 20),
          _free(i),
          (HEAP32[a >> 2] = 0),
          (HEAP32[o >> 2] = r),
          0
        );
      }
      function _getloadavg(e, r) {
        for (var n = Math.min(r, 3), t = 8, o = 0; o < n; o++)
          HEAPF64[(e + o * t) >> 3] = 0.1;
        return n;
      }
      var Protocols = { list: [], map: {} };
      function _setprotoent(e) {
        function r(a, i, s) {
          var u = _malloc(a.length + 1);
          writeAsciiToMemory(a, u);
          for (
            var c = 0, _ = s.length, E = _malloc((_ + 1) * 4), f = 0;
            f < _;
            f++, c += 4
          ) {
            var d = s[f],
              m = _malloc(d.length + 1);
            writeAsciiToMemory(d, m), (HEAP32[(E + c) >> 2] = m);
          }
          HEAP32[(E + c) >> 2] = 0;
          var F = _malloc(12);
          return (
            (HEAP32[F >> 2] = u),
            (HEAP32[(F + 4) >> 2] = E),
            (HEAP32[(F + 8) >> 2] = i),
            F
          );
        }
        var n = Protocols.list,
          t = Protocols.map;
        if (n.length === 0) {
          var o = r("tcp", 6, ["TCP"]);
          n.push(o),
            (t.tcp = t[6] = o),
            (o = r("udp", 17, ["UDP"])),
            n.push(o),
            (t.udp = t[17] = o);
        }
        _setprotoent.index = 0;
      }
      function _getprotobyname(e) {
        (e = UTF8ToString(e)), _setprotoent(!0);
        var r = Protocols.map[e];
        return r;
      }
      function _getprotobynumber(e) {
        _setprotoent(!0);
        var r = Protocols.map[e];
        return r;
      }
      function _getpwnam() {
        throw "getpwnam: TODO";
      }
      function _getpwuid() {
        throw "getpwuid: TODO";
      }
      function _gettimeofday(e) {
        var r = Date.now();
        return (
          (HEAP32[e >> 2] = (r / 1e3) | 0),
          (HEAP32[(e + 4) >> 2] = ((r % 1e3) * 1e3) | 0),
          0
        );
      }
      var ___tm_timezone = (stringToUTF8("GMT", 2505792, 4), 2505792);
      function _gmtime_r(e, r) {
        var n = new Date(HEAP32[e >> 2] * 1e3);
        (HEAP32[r >> 2] = n.getUTCSeconds()),
          (HEAP32[(r + 4) >> 2] = n.getUTCMinutes()),
          (HEAP32[(r + 8) >> 2] = n.getUTCHours()),
          (HEAP32[(r + 12) >> 2] = n.getUTCDate()),
          (HEAP32[(r + 16) >> 2] = n.getUTCMonth()),
          (HEAP32[(r + 20) >> 2] = n.getUTCFullYear() - 1900),
          (HEAP32[(r + 24) >> 2] = n.getUTCDay()),
          (HEAP32[(r + 36) >> 2] = 0),
          (HEAP32[(r + 32) >> 2] = 0);
        var t = Date.UTC(n.getUTCFullYear(), 0, 1, 0, 0, 0, 0),
          o = ((n.getTime() - t) / (1e3 * 60 * 60 * 24)) | 0;
        return (
          (HEAP32[(r + 28) >> 2] = o),
          (HEAP32[(r + 40) >> 2] = ___tm_timezone),
          r
        );
      }
      function _kill(e, r) {
        return setErrNo(ERRNO_CODES.EPERM), -1;
      }
      function _llvm_log10_f32(e) {
        return Math.log(e) / Math.LN10;
      }
      function _llvm_log10_f64(e) {
        return _llvm_log10_f32(e);
      }
      function _llvm_stackrestore(e) {
        var r = _llvm_stacksave,
          n = r.LLVM_SAVEDSTACKS[e];
        r.LLVM_SAVEDSTACKS.splice(e, 1), stackRestore(n);
      }
      function _llvm_stacksave() {
        var e = _llvm_stacksave;
        return (
          e.LLVM_SAVEDSTACKS || (e.LLVM_SAVEDSTACKS = []),
          e.LLVM_SAVEDSTACKS.push(stackSave()),
          e.LLVM_SAVEDSTACKS.length - 1
        );
      }
      function _llvm_trap() {
        abort("trap!");
      }
      function _localtime_r(e, r) {
        _tzset();
        var n = new Date(HEAP32[e >> 2] * 1e3);
        (HEAP32[r >> 2] = n.getSeconds()),
          (HEAP32[(r + 4) >> 2] = n.getMinutes()),
          (HEAP32[(r + 8) >> 2] = n.getHours()),
          (HEAP32[(r + 12) >> 2] = n.getDate()),
          (HEAP32[(r + 16) >> 2] = n.getMonth()),
          (HEAP32[(r + 20) >> 2] = n.getFullYear() - 1900),
          (HEAP32[(r + 24) >> 2] = n.getDay());
        var t = new Date(n.getFullYear(), 0, 1),
          o = ((n.getTime() - t.getTime()) / (1e3 * 60 * 60 * 24)) | 0;
        (HEAP32[(r + 28) >> 2] = o),
          (HEAP32[(r + 36) >> 2] = -(n.getTimezoneOffset() * 60));
        var a = new Date(n.getFullYear(), 6, 1).getTimezoneOffset(),
          i = t.getTimezoneOffset(),
          s = (a != i && n.getTimezoneOffset() == Math.min(i, a)) | 0;
        HEAP32[(r + 32) >> 2] = s;
        var u = HEAP32[(__get_tzname() + (s ? 4 : 0)) >> 2];
        return (HEAP32[(r + 40) >> 2] = u), r;
      }
      function _longjmp(e, r) {
        throw (_setThrew(e, r || 1), "longjmp");
      }
      function _emscripten_memcpy_big(e, r, n) {
        HEAPU8.copyWithin(e, r, r + n);
      }
      function _usleep(e) {
        for (
          var r = _emscripten_get_now();
          _emscripten_get_now() - r < e / 1e3;

        );
      }
      Module._usleep = _usleep;
      function _nanosleep(e, r) {
        if (e === 0) return setErrNo(28), -1;
        var n = HEAP32[e >> 2],
          t = HEAP32[(e + 4) >> 2];
        return t < 0 || t > 999999999 || n < 0
          ? (setErrNo(28), -1)
          : (r !== 0 && ((HEAP32[r >> 2] = 0), (HEAP32[(r + 4) >> 2] = 0)),
            _usleep(n * 1e6 + t / 1e3));
      }
      function _popen() {
        err("missing function: popen"), abort(-1);
      }
      function _pthread_create() {
        return 6;
      }
      function _pthread_join() {}
      function _pthread_mutexattr_destroy() {}
      function _pthread_mutexattr_init() {}
      function _pthread_mutexattr_settype() {}
      function _pthread_setcancelstate() {
        return 0;
      }
      function _putenv(e) {
        if (e === 0) return setErrNo(28), -1;
        e = UTF8ToString(e);
        var r = e.indexOf("=");
        if (e === "" || e.indexOf("=") === -1) return setErrNo(28), -1;
        var n = e.slice(0, r),
          t = e.slice(r + 1);
        return (
          (!(n in ENV) || ENV[n] !== t) &&
            ((ENV[n] = t), ___buildEnvironment(__get_environ())),
          0
        );
      }
      function _setTempRet0(e) {
        setTempRet0(e | 0);
      }
      function _setitimer() {
        throw "setitimer() is not implemented yet";
      }
      function _sigaction(e, r, n) {
        return 0;
      }
      function _sigaddset(e, r) {
        return (HEAP32[e >> 2] = HEAP32[e >> 2] | (1 << (r - 1))), 0;
      }
      function _sigdelset(e, r) {
        return (HEAP32[e >> 2] = HEAP32[e >> 2] & ~(1 << (r - 1))), 0;
      }
      function _sigemptyset(e) {
        return (HEAP32[e >> 2] = 0), 0;
      }
      function _sigfillset(e) {
        return (HEAP32[e >> 2] = 4294967295), 0;
      }
      var __sigalrm_handler = 0;
      function _signal(e, r) {
        return e == 14 && (__sigalrm_handler = r), 0;
      }
      function _sigprocmask() {
        return 0;
      }
      function __isLeapYear(e) {
        return e % 4 === 0 && (e % 100 !== 0 || e % 400 === 0);
      }
      function __arraySum(e, r) {
        for (var n = 0, t = 0; t <= r; n += e[t++]);
        return n;
      }
      var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      function __addDays(e, r) {
        for (var n = new Date(e.getTime()); r > 0; ) {
          var t = __isLeapYear(n.getFullYear()),
            o = n.getMonth(),
            a = (t ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[o];
          if (r > a - n.getDate())
            (r -= a - n.getDate() + 1),
              n.setDate(1),
              o < 11
                ? n.setMonth(o + 1)
                : (n.setMonth(0), n.setFullYear(n.getFullYear() + 1));
          else return n.setDate(n.getDate() + r), n;
        }
        return n;
      }
      function _strftime(e, r, n, t) {
        var o = HEAP32[(t + 40) >> 2],
          a = {
            tm_sec: HEAP32[t >> 2],
            tm_min: HEAP32[(t + 4) >> 2],
            tm_hour: HEAP32[(t + 8) >> 2],
            tm_mday: HEAP32[(t + 12) >> 2],
            tm_mon: HEAP32[(t + 16) >> 2],
            tm_year: HEAP32[(t + 20) >> 2],
            tm_wday: HEAP32[(t + 24) >> 2],
            tm_yday: HEAP32[(t + 28) >> 2],
            tm_isdst: HEAP32[(t + 32) >> 2],
            tm_gmtoff: HEAP32[(t + 36) >> 2],
            tm_zone: o ? UTF8ToString(o) : "",
          },
          i = UTF8ToString(n),
          s = {
            "%c": "%a %b %d %H:%M:%S %Y",
            "%D": "%m/%d/%y",
            "%F": "%Y-%m-%d",
            "%h": "%b",
            "%r": "%I:%M:%S %p",
            "%R": "%H:%M",
            "%T": "%H:%M:%S",
            "%x": "%m/%d/%y",
            "%X": "%H:%M:%S",
            "%Ec": "%c",
            "%EC": "%C",
            "%Ex": "%m/%d/%y",
            "%EX": "%H:%M:%S",
            "%Ey": "%y",
            "%EY": "%Y",
            "%Od": "%d",
            "%Oe": "%e",
            "%OH": "%H",
            "%OI": "%I",
            "%Om": "%m",
            "%OM": "%M",
            "%OS": "%S",
            "%Ou": "%u",
            "%OU": "%U",
            "%OV": "%V",
            "%Ow": "%w",
            "%OW": "%W",
            "%Oy": "%y",
          };
        for (var u in s) i = i.replace(new RegExp(u, "g"), s[u]);
        var c = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          _ = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
        function E(l, S, v) {
          for (
            var y = typeof l == "number" ? l.toString() : l || "";
            y.length < S;

          )
            y = v[0] + y;
          return y;
        }
        function f(l, S) {
          return E(l, S, "0");
        }
        function d(l, S) {
          function v(g) {
            return g < 0 ? -1 : g > 0 ? 1 : 0;
          }
          var y;
          return (
            (y = v(l.getFullYear() - S.getFullYear())) === 0 &&
              (y = v(l.getMonth() - S.getMonth())) === 0 &&
              (y = v(l.getDate() - S.getDate())),
            y
          );
        }
        function m(l) {
          switch (l.getDay()) {
            case 0:
              return new Date(l.getFullYear() - 1, 11, 29);
            case 1:
              return l;
            case 2:
              return new Date(l.getFullYear(), 0, 3);
            case 3:
              return new Date(l.getFullYear(), 0, 2);
            case 4:
              return new Date(l.getFullYear(), 0, 1);
            case 5:
              return new Date(l.getFullYear() - 1, 11, 31);
            case 6:
              return new Date(l.getFullYear() - 1, 11, 30);
          }
        }
        function F(l) {
          var S = __addDays(new Date(l.tm_year + 1900, 0, 1), l.tm_yday),
            v = new Date(S.getFullYear(), 0, 4),
            y = new Date(S.getFullYear() + 1, 0, 4),
            g = m(v),
            M = m(y);
          return d(g, S) <= 0
            ? d(M, S) <= 0
              ? S.getFullYear() + 1
              : S.getFullYear()
            : S.getFullYear() - 1;
        }
        var h = {
          "%a": function (l) {
            return c[l.tm_wday].substring(0, 3);
          },
          "%A": function (l) {
            return c[l.tm_wday];
          },
          "%b": function (l) {
            return _[l.tm_mon].substring(0, 3);
          },
          "%B": function (l) {
            return _[l.tm_mon];
          },
          "%C": function (l) {
            var S = l.tm_year + 1900;
            return f((S / 100) | 0, 2);
          },
          "%d": function (l) {
            return f(l.tm_mday, 2);
          },
          "%e": function (l) {
            return E(l.tm_mday, 2, " ");
          },
          "%g": function (l) {
            return F(l).toString().substring(2);
          },
          "%G": function (l) {
            return F(l);
          },
          "%H": function (l) {
            return f(l.tm_hour, 2);
          },
          "%I": function (l) {
            var S = l.tm_hour;
            return S == 0 ? (S = 12) : S > 12 && (S -= 12), f(S, 2);
          },
          "%j": function (l) {
            return f(
              l.tm_mday +
                __arraySum(
                  __isLeapYear(l.tm_year + 1900)
                    ? __MONTH_DAYS_LEAP
                    : __MONTH_DAYS_REGULAR,
                  l.tm_mon - 1
                ),
              3
            );
          },
          "%m": function (l) {
            return f(l.tm_mon + 1, 2);
          },
          "%M": function (l) {
            return f(l.tm_min, 2);
          },
          "%n": function () {
            return `
`;
          },
          "%p": function (l) {
            return l.tm_hour >= 0 && l.tm_hour < 12 ? "AM" : "PM";
          },
          "%S": function (l) {
            return f(l.tm_sec, 2);
          },
          "%t": function () {
            return "	";
          },
          "%u": function (l) {
            return l.tm_wday || 7;
          },
          "%U": function (l) {
            var S = new Date(l.tm_year + 1900, 0, 1),
              v = S.getDay() === 0 ? S : __addDays(S, 7 - S.getDay()),
              y = new Date(l.tm_year + 1900, l.tm_mon, l.tm_mday);
            if (d(v, y) < 0) {
              var g =
                  __arraySum(
                    __isLeapYear(y.getFullYear())
                      ? __MONTH_DAYS_LEAP
                      : __MONTH_DAYS_REGULAR,
                    y.getMonth() - 1
                  ) - 31,
                M = 31 - v.getDate(),
                w = M + g + y.getDate();
              return f(Math.ceil(w / 7), 2);
            }
            return d(v, S) === 0 ? "01" : "00";
          },
          "%V": function (l) {
            var S = new Date(l.tm_year + 1900, 0, 4),
              v = new Date(l.tm_year + 1901, 0, 4),
              y = m(S),
              g = m(v),
              M = __addDays(new Date(l.tm_year + 1900, 0, 1), l.tm_yday);
            if (d(M, y) < 0) return "53";
            if (d(g, M) <= 0) return "01";
            var w;
            return (
              y.getFullYear() < l.tm_year + 1900
                ? (w = l.tm_yday + 32 - y.getDate())
                : (w = l.tm_yday + 1 - y.getDate()),
              f(Math.ceil(w / 7), 2)
            );
          },
          "%w": function (l) {
            return l.tm_wday;
          },
          "%W": function (l) {
            var S = new Date(l.tm_year, 0, 1),
              v =
                S.getDay() === 1
                  ? S
                  : __addDays(S, S.getDay() === 0 ? 1 : 7 - S.getDay() + 1),
              y = new Date(l.tm_year + 1900, l.tm_mon, l.tm_mday);
            if (d(v, y) < 0) {
              var g =
                  __arraySum(
                    __isLeapYear(y.getFullYear())
                      ? __MONTH_DAYS_LEAP
                      : __MONTH_DAYS_REGULAR,
                    y.getMonth() - 1
                  ) - 31,
                M = 31 - v.getDate(),
                w = M + g + y.getDate();
              return f(Math.ceil(w / 7), 2);
            }
            return d(v, S) === 0 ? "01" : "00";
          },
          "%y": function (l) {
            return (l.tm_year + 1900).toString().substring(2);
          },
          "%Y": function (l) {
            return l.tm_year + 1900;
          },
          "%z": function (l) {
            var S = l.tm_gmtoff,
              v = S >= 0;
            return (
              (S = Math.abs(S) / 60),
              (S = (S / 60) * 100 + (S % 60)),
              (v ? "+" : "-") + String("0000" + S).slice(-4)
            );
          },
          "%Z": function (l) {
            return l.tm_zone;
          },
          "%%": function () {
            return "%";
          },
        };
        for (var u in h)
          i.indexOf(u) >= 0 && (i = i.replace(new RegExp(u, "g"), h[u](a)));
        var p = intArrayFromString(i, !1);
        return p.length > r ? 0 : (writeArrayToMemory(p, e), p.length - 1);
      }
      function _strptime(e, r, n) {
        for (
          var t = UTF8ToString(r),
            o = "\\!@#$^&*()+=-[]/{}|:<>?,.",
            a = 0,
            i = o.length;
          a < i;
          ++a
        )
          t = t.replace(new RegExp("\\" + o[a], "g"), "\\" + o[a]);
        var s = {
          "%A": "%a",
          "%B": "%b",
          "%c": "%a %b %d %H:%M:%S %Y",
          "%D": "%m\\/%d\\/%y",
          "%e": "%d",
          "%F": "%Y-%m-%d",
          "%h": "%b",
          "%R": "%H\\:%M",
          "%r": "%I\\:%M\\:%S\\s%p",
          "%T": "%H\\:%M\\:%S",
          "%x": "%m\\/%d\\/(?:%y|%Y)",
          "%X": "%H\\:%M\\:%S",
        };
        for (var u in s) t = t.replace(u, s[u]);
        var c = {
            "%a": "(?:Sun(?:day)?)|(?:Mon(?:day)?)|(?:Tue(?:sday)?)|(?:Wed(?:nesday)?)|(?:Thu(?:rsday)?)|(?:Fri(?:day)?)|(?:Sat(?:urday)?)",
            "%b": "(?:Jan(?:uary)?)|(?:Feb(?:ruary)?)|(?:Mar(?:ch)?)|(?:Apr(?:il)?)|May|(?:Jun(?:e)?)|(?:Jul(?:y)?)|(?:Aug(?:ust)?)|(?:Sep(?:tember)?)|(?:Oct(?:ober)?)|(?:Nov(?:ember)?)|(?:Dec(?:ember)?)",
            "%C": "\\d\\d",
            "%d": "0[1-9]|[1-9](?!\\d)|1\\d|2\\d|30|31",
            "%H": "\\d(?!\\d)|[0,1]\\d|20|21|22|23",
            "%I": "\\d(?!\\d)|0\\d|10|11|12",
            "%j": "00[1-9]|0?[1-9](?!\\d)|0?[1-9]\\d(?!\\d)|[1,2]\\d\\d|3[0-6]\\d",
            "%m": "0[1-9]|[1-9](?!\\d)|10|11|12",
            "%M": "0\\d|\\d(?!\\d)|[1-5]\\d",
            "%n": "\\s",
            "%p": "AM|am|PM|pm|A\\.M\\.|a\\.m\\.|P\\.M\\.|p\\.m\\.",
            "%S": "0\\d|\\d(?!\\d)|[1-5]\\d|60",
            "%U": "0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53",
            "%W": "0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53",
            "%w": "[0-6]",
            "%y": "\\d\\d",
            "%Y": "\\d\\d\\d\\d",
            "%%": "%",
            "%t": "\\s",
          },
          _ = {
            JAN: 0,
            FEB: 1,
            MAR: 2,
            APR: 3,
            MAY: 4,
            JUN: 5,
            JUL: 6,
            AUG: 7,
            SEP: 8,
            OCT: 9,
            NOV: 10,
            DEC: 11,
          },
          E = { SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6 },
          f = { MON: 0, TUE: 1, WED: 2, THU: 3, FRI: 4, SAT: 5, SUN: 6 };
        for (var d in c) t = t.replace(d, "(" + d + c[d] + ")");
        for (var m = [], a = t.indexOf("%"); a >= 0; a = t.indexOf("%"))
          m.push(t[a + 1]),
            (t = t.replace(new RegExp("\\%" + t[a + 1], "g"), ""));
        var F = new RegExp("^" + t, "i").exec(UTF8ToString(e));
        function h() {
          function D(O, C, L) {
            return typeof O != "number" || isNaN(O)
              ? C
              : O >= C
              ? O <= L
                ? O
                : L
              : C;
          }
          return {
            year: D(HEAP32[(n + 20) >> 2] + 1900, 1970, 9999),
            month: D(HEAP32[(n + 16) >> 2], 0, 11),
            day: D(HEAP32[(n + 12) >> 2], 1, 31),
            hour: D(HEAP32[(n + 8) >> 2], 0, 23),
            min: D(HEAP32[(n + 4) >> 2], 0, 59),
            sec: D(HEAP32[n >> 2], 0, 59),
          };
        }
        if (F) {
          var p = h(),
            l,
            S = function (D) {
              var O = m.indexOf(D);
              if (O >= 0) return F[O + 1];
            };
          if (
            ((l = S("S")) && (p.sec = jstoi_q(l)),
            (l = S("M")) && (p.min = jstoi_q(l)),
            (l = S("H")))
          )
            p.hour = jstoi_q(l);
          else if ((l = S("I"))) {
            var v = jstoi_q(l);
            (l = S("p")) && (v += l.toUpperCase()[0] === "P" ? 12 : 0),
              (p.hour = v);
          }
          if ((l = S("Y"))) p.year = jstoi_q(l);
          else if ((l = S("y"))) {
            var y = jstoi_q(l);
            (l = S("C")) ? (y += jstoi_q(l) * 100) : (y += y < 69 ? 2e3 : 1900),
              (p.year = y);
          }
          if (
            ((l = S("m"))
              ? (p.month = jstoi_q(l) - 1)
              : (l = S("b")) &&
                (p.month = _[l.substring(0, 3).toUpperCase()] || 0),
            (l = S("d")))
          )
            p.day = jstoi_q(l);
          else if ((l = S("j")))
            for (
              var g = jstoi_q(l), M = __isLeapYear(p.year), w = 0;
              w < 12;
              ++w
            ) {
              var P = __arraySum(
                M ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR,
                w - 1
              );
              g <= P + (M ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[w] &&
                (p.day = g - P);
            }
          else if ((l = S("a"))) {
            var N = l.substring(0, 3).toUpperCase();
            if ((l = S("U"))) {
              var H = E[N],
                T = jstoi_q(l),
                k = new Date(p.year, 0, 1),
                b;
              k.getDay() === 0
                ? (b = __addDays(k, H + 7 * (T - 1)))
                : (b = __addDays(k, 7 - k.getDay() + H + 7 * (T - 1))),
                (p.day = b.getDate()),
                (p.month = b.getMonth());
            } else if ((l = S("W"))) {
              var H = f[N],
                T = jstoi_q(l),
                k = new Date(p.year, 0, 1),
                b;
              k.getDay() === 1
                ? (b = __addDays(k, H + 7 * (T - 1)))
                : (b = __addDays(k, 7 - k.getDay() + 1 + H + 7 * (T - 1))),
                (p.day = b.getDate()),
                (p.month = b.getMonth());
            }
          }
          var A = new Date(p.year, p.month, p.day, p.hour, p.min, p.sec, 0);
          return (
            (HEAP32[n >> 2] = A.getSeconds()),
            (HEAP32[(n + 4) >> 2] = A.getMinutes()),
            (HEAP32[(n + 8) >> 2] = A.getHours()),
            (HEAP32[(n + 12) >> 2] = A.getDate()),
            (HEAP32[(n + 16) >> 2] = A.getMonth()),
            (HEAP32[(n + 20) >> 2] = A.getFullYear() - 1900),
            (HEAP32[(n + 24) >> 2] = A.getDay()),
            (HEAP32[(n + 28) >> 2] =
              __arraySum(
                __isLeapYear(A.getFullYear())
                  ? __MONTH_DAYS_LEAP
                  : __MONTH_DAYS_REGULAR,
                A.getMonth() - 1
              ) +
              A.getDate() -
              1),
            (HEAP32[(n + 32) >> 2] = 0),
            e + intArrayFromString(F[0]).length - 1
          );
        }
        return 0;
      }
      function _sysconf(e) {
        switch (e) {
          case 30:
            return 16384;
          case 85:
            var r = 4 * 1024 * 1024 * 1024;
            return r / 16384;
          case 132:
          case 133:
          case 12:
          case 137:
          case 138:
          case 15:
          case 235:
          case 16:
          case 17:
          case 18:
          case 19:
          case 20:
          case 149:
          case 13:
          case 10:
          case 236:
          case 153:
          case 9:
          case 21:
          case 22:
          case 159:
          case 154:
          case 14:
          case 77:
          case 78:
          case 139:
          case 80:
          case 81:
          case 82:
          case 68:
          case 67:
          case 164:
          case 11:
          case 29:
          case 47:
          case 48:
          case 95:
          case 52:
          case 51:
          case 46:
          case 79:
            return 200809;
          case 27:
          case 246:
          case 127:
          case 128:
          case 23:
          case 24:
          case 160:
          case 161:
          case 181:
          case 182:
          case 242:
          case 183:
          case 184:
          case 243:
          case 244:
          case 245:
          case 165:
          case 178:
          case 179:
          case 49:
          case 50:
          case 168:
          case 169:
          case 175:
          case 170:
          case 171:
          case 172:
          case 97:
          case 76:
          case 32:
          case 173:
          case 35:
            return -1;
          case 176:
          case 177:
          case 7:
          case 155:
          case 8:
          case 157:
          case 125:
          case 126:
          case 92:
          case 93:
          case 129:
          case 130:
          case 131:
          case 94:
          case 91:
            return 1;
          case 74:
          case 60:
          case 69:
          case 70:
          case 4:
            return 1024;
          case 31:
          case 42:
          case 72:
            return 32;
          case 87:
          case 26:
          case 33:
            return 2147483647;
          case 34:
          case 1:
            return 47839;
          case 38:
          case 36:
            return 99;
          case 43:
          case 37:
            return 2048;
          case 0:
            return 2097152;
          case 3:
            return 65536;
          case 28:
            return 32768;
          case 44:
            return 32767;
          case 75:
            return 16384;
          case 39:
            return 1e3;
          case 89:
            return 700;
          case 71:
            return 256;
          case 40:
            return 255;
          case 2:
            return 100;
          case 180:
            return 64;
          case 25:
            return 20;
          case 5:
            return 16;
          case 6:
            return 6;
          case 73:
            return 4;
          case 84:
            return (
              (typeof navigator == "object" && navigator.hardwareConcurrency) ||
              1
            );
        }
        return setErrNo(28), -1;
      }
      function _time(e) {
        var r = (Date.now() / 1e3) | 0;
        return e && (HEAP32[e >> 2] = r), r;
      }
      function _unsetenv(e) {
        return e === 0 ||
          ((e = UTF8ToString(e)), e === "" || e.indexOf("=") !== -1)
          ? (setErrNo(28), -1)
          : (ENV.hasOwnProperty(e) &&
              (delete ENV[e], ___buildEnvironment(__get_environ())),
            0);
      }
      function _utime(e, r) {
        var n;
        if (r) {
          var t = 4;
          (n = HEAP32[(r + t) >> 2]), (n *= 1e3);
        } else n = Date.now();
        e = UTF8ToString(e);
        try {
          return FS.utime(e, n, n), 0;
        } catch (o) {
          return FS.handleFSError(o), -1;
        }
      }
      function _wait(e) {
        return setErrNo(12), -1;
      }
      function _waitpid(e) {
        return _wait(e);
      }
      var FSNode = function (e, r, n, t) {
          e || (e = this),
            (this.parent = e),
            (this.mount = e.mount),
            (this.mounted = null),
            (this.id = FS.nextInode++),
            (this.name = r),
            (this.mode = n),
            (this.node_ops = {}),
            (this.stream_ops = {}),
            (this.rdev = t);
        },
        readMode = 365,
        writeMode = 146;
      Object.defineProperties(FSNode.prototype, {
        read: {
          get: function () {
            return (this.mode & readMode) === readMode;
          },
          set: function (e) {
            e ? (this.mode |= readMode) : (this.mode &= ~readMode);
          },
        },
        write: {
          get: function () {
            return (this.mode & writeMode) === writeMode;
          },
          set: function (e) {
            e ? (this.mode |= writeMode) : (this.mode &= ~writeMode);
          },
        },
        isFolder: {
          get: function () {
            return FS.isDir(this.mode);
          },
        },
        isDevice: {
          get: function () {
            return FS.isChrdev(this.mode);
          },
        },
      }),
        (FS.FSNode = FSNode),
        FS.staticInit();
      function intArrayFromString(e, r, n) {
        var t = n > 0 ? n : lengthBytesUTF8(e) + 1,
          o = new Array(t),
          a = stringToUTF8Array(e, o, 0, o.length);
        return r && (o.length = a), o;
      }
      function invoke_i(e) {
        var r = stackSave();
        try {
          return dynCall_i(e);
        } catch (n) {
          if ((stackRestore(r), n !== n + 0 && n !== "longjmp")) throw n;
          _setThrew(1, 0);
        }
      }
      function invoke_ii(e, r) {
        var n = stackSave();
        try {
          return dynCall_ii(e, r);
        } catch (t) {
          if ((stackRestore(n), t !== t + 0 && t !== "longjmp")) throw t;
          _setThrew(1, 0);
        }
      }
      function invoke_iii(e, r, n) {
        var t = stackSave();
        try {
          return dynCall_iii(e, r, n);
        } catch (o) {
          if ((stackRestore(t), o !== o + 0 && o !== "longjmp")) throw o;
          _setThrew(1, 0);
        }
      }
      function invoke_iiii(e, r, n, t) {
        var o = stackSave();
        try {
          return dynCall_iiii(e, r, n, t);
        } catch (a) {
          if ((stackRestore(o), a !== a + 0 && a !== "longjmp")) throw a;
          _setThrew(1, 0);
        }
      }
      function invoke_iiiii(e, r, n, t, o) {
        var a = stackSave();
        try {
          return dynCall_iiiii(e, r, n, t, o);
        } catch (i) {
          if ((stackRestore(a), i !== i + 0 && i !== "longjmp")) throw i;
          _setThrew(1, 0);
        }
      }
      function invoke_iiiiii(e, r, n, t, o, a) {
        var i = stackSave();
        try {
          return dynCall_iiiiii(e, r, n, t, o, a);
        } catch (s) {
          if ((stackRestore(i), s !== s + 0 && s !== "longjmp")) throw s;
          _setThrew(1, 0);
        }
      }
      function invoke_iiiiiii(e, r, n, t, o, a, i) {
        var s = stackSave();
        try {
          return dynCall_iiiiiii(e, r, n, t, o, a, i);
        } catch (u) {
          if ((stackRestore(s), u !== u + 0 && u !== "longjmp")) throw u;
          _setThrew(1, 0);
        }
      }
      function invoke_v(e) {
        var r = stackSave();
        try {
          dynCall_v(e);
        } catch (n) {
          if ((stackRestore(r), n !== n + 0 && n !== "longjmp")) throw n;
          _setThrew(1, 0);
        }
      }
      function invoke_vi(e, r) {
        var n = stackSave();
        try {
          dynCall_vi(e, r);
        } catch (t) {
          if ((stackRestore(n), t !== t + 0 && t !== "longjmp")) throw t;
          _setThrew(1, 0);
        }
      }
      function invoke_vii(e, r, n) {
        var t = stackSave();
        try {
          dynCall_vii(e, r, n);
        } catch (o) {
          if ((stackRestore(t), o !== o + 0 && o !== "longjmp")) throw o;
          _setThrew(1, 0);
        }
      }
      function invoke_viii(e, r, n, t) {
        var o = stackSave();
        try {
          dynCall_viii(e, r, n, t);
        } catch (a) {
          if ((stackRestore(o), a !== a + 0 && a !== "longjmp")) throw a;
          _setThrew(1, 0);
        }
      }
      function invoke_viiii(e, r, n, t, o) {
        var a = stackSave();
        try {
          dynCall_viiii(e, r, n, t, o);
        } catch (i) {
          if ((stackRestore(a), i !== i + 0 && i !== "longjmp")) throw i;
          _setThrew(1, 0);
        }
      }
      var asmGlobalArg = {},
        asmLibraryArg = {
          J: ___assert_fail,
          xb: ___buildEnvironment,
          wb: ___clock_gettime,
          vb: ___map_file,
          ub: ___syscall10,
          q: ___syscall102,
          tb: ___syscall114,
          sb: ___syscall12,
          rb: ___syscall122,
          qb: ___syscall142,
          oa: ___syscall15,
          pb: ___syscall163,
          ob: ___syscall168,
          nb: ___syscall183,
          mb: ___syscall192,
          lb: ___syscall194,
          na: ___syscall195,
          kb: ___syscall196,
          jb: ___syscall197,
          ib: ___syscall198,
          u: ___syscall199,
          w: ___syscall20,
          B: ___syscall200,
          ma: ___syscall201,
          hb: ___syscall205,
          gb: ___syscall207,
          la: ___syscall212,
          fb: ___syscall219,
          eb: ___syscall220,
          o: ___syscall221,
          db: ___syscall268,
          cb: ___syscall3,
          bb: ___syscall33,
          ab: ___syscall34,
          $a: ___syscall38,
          _a: ___syscall39,
          Za: ___syscall40,
          Ya: ___syscall41,
          Xa: ___syscall42,
          _: ___syscall5,
          Wa: ___syscall54,
          Va: ___syscall60,
          Ua: ___syscall63,
          Ta: ___syscall77,
          Sa: ___syscall83,
          Ra: ___syscall85,
          Qa: ___syscall9,
          Pa: ___syscall91,
          Oa: ___syscall94,
          I: ___wasi_fd_close,
          ka: ___wasi_fd_fdstat_get,
          Na: ___wasi_fd_read,
          yb: ___wasi_fd_seek,
          Ma: ___wasi_fd_sync,
          ja: ___wasi_fd_write,
          Q: __exit,
          __memory_base: 1024,
          __table_base: 0,
          ia: _abort,
          La: _asctime_r,
          Ka: _chroot,
          Ja: _clock_gettime,
          Ia: _difftime,
          y: _dlclose,
          t: _dlerror,
          D: _dlopen,
          v: _dlsym,
          ha: _emscripten_asm_const_ii,
          G: _emscripten_asm_const_iii,
          Ga: _emscripten_asm_const_iiii,
          A: _emscripten_get_heap_size,
          Fa: _emscripten_memcpy_big,
          z: _emscripten_resize_heap,
          Ea: _execl,
          Da: _execle,
          Ca: _execvp,
          C: _exit,
          ga: _flock,
          Aa: _fork,
          fa: _gai_strerror,
          za: _getaddrinfo,
          ya: _getdtablesize,
          n: _getenv,
          ea: _getgrnam,
          da: _gethostbyaddr,
          ca: _gethostbyname_r,
          xa: _getloadavg,
          wa: _getprotobyname,
          Gb: _getprotobynumber,
          va: _getpwnam,
          Fb: _getpwuid,
          m: _gettimeofday,
          P: _gmtime_r,
          ua: _kill,
          Z: _llvm_log10_f64,
          F: _llvm_stackrestore,
          O: _llvm_stacksave,
          ta: _llvm_trap,
          N: _localtime_r,
          b: _longjmp,
          ba: _mktime,
          Y: _nanosleep,
          M: _popen,
          X: _pthread_create,
          l: _pthread_join,
          Eb: _pthread_mutexattr_destroy,
          Db: _pthread_mutexattr_init,
          Cb: _pthread_mutexattr_settype,
          E: _pthread_setcancelstate,
          W: _putenv,
          sa: _setTempRet0,
          L: _setitimer,
          k: _sigaction,
          V: _sigaddset,
          r: _sigdelset,
          K: _sigemptyset,
          Bb: _sigfillset,
          Ab: _signal,
          U: _sigprocmask,
          aa: _strftime,
          zb: _strptime,
          T: _sysconf,
          e: _time,
          $: _tzset,
          ra: _unsetenv,
          qa: _usleep,
          S: _utime,
          pa: _waitpid,
          h: abort,
          a: getTempRet0,
          R: invoke_i,
          f: invoke_ii,
          j: invoke_iii,
          g: invoke_iiii,
          H: invoke_iiiii,
          Ha: invoke_iiiiii,
          Ba: invoke_iiiiiii,
          i: invoke_v,
          d: invoke_vi,
          p: invoke_vii,
          x: invoke_viii,
          s: invoke_viiii,
          memory: wasmMemory,
          c: setTempRet0,
          table: wasmTable,
        },
        asm = Module.asm(asmGlobalArg, asmLibraryArg, buffer),
        ___emscripten_environ_constructor =
          (Module.___emscripten_environ_constructor = function () {
            return (___emscripten_environ_constructor =
              Module.___emscripten_environ_constructor =
                Module.asm.Hb).apply(null, arguments);
          }),
        ___errno_location = (Module.___errno_location = function () {
          return (___errno_location = Module.___errno_location =
            Module.asm.Ib).apply(null, arguments);
        }),
        __get_daylight = (Module.__get_daylight = function () {
          return (__get_daylight = Module.__get_daylight = Module.asm.Jb).apply(
            null,
            arguments
          );
        }),
        __get_environ = (Module.__get_environ = function () {
          return (__get_environ = Module.__get_environ = Module.asm.Kb).apply(
            null,
            arguments
          );
        }),
        __get_timezone = (Module.__get_timezone = function () {
          return (__get_timezone = Module.__get_timezone = Module.asm.Lb).apply(
            null,
            arguments
          );
        }),
        __get_tzname = (Module.__get_tzname = function () {
          return (__get_tzname = Module.__get_tzname = Module.asm.Mb).apply(
            null,
            arguments
          );
        }),
        _del_callback = (Module._del_callback = function () {
          return (_del_callback = Module._del_callback = Module.asm.Nb).apply(
            null,
            arguments
          );
        }),
        _exec_callback = (Module._exec_callback = function () {
          return (_exec_callback = Module._exec_callback = Module.asm.Ob).apply(
            null,
            arguments
          );
        }),
        _free = (Module._free = function () {
          return (_free = Module._free = Module.asm.Pb).apply(null, arguments);
        }),
        _htonl = (Module._htonl = function () {
          return (_htonl = Module._htonl = Module.asm.Qb).apply(
            null,
            arguments
          );
        }),
        _htons = (Module._htons = function () {
          return (_htons = Module._htons = Module.asm.Rb).apply(
            null,
            arguments
          );
        }),
        _main = (Module._main = function () {
          return (_main = Module._main = Module.asm.Sb).apply(null, arguments);
        }),
        _malloc = (Module._malloc = function () {
          return (_malloc = Module._malloc = Module.asm.Tb).apply(
            null,
            arguments
          );
        }),
        _memalign = (Module._memalign = function () {
          return (_memalign = Module._memalign = Module.asm.Ub).apply(
            null,
            arguments
          );
        }),
        _memcpy = (Module._memcpy = function () {
          return (_memcpy = Module._memcpy = Module.asm.Vb).apply(
            null,
            arguments
          );
        }),
        _memset = (Module._memset = function () {
          return (_memset = Module._memset = Module.asm.Wb).apply(
            null,
            arguments
          );
        }),
        _ntohs = (Module._ntohs = function () {
          return (_ntohs = Module._ntohs = Module.asm.Xb).apply(
            null,
            arguments
          );
        }),
        _php_embed_init = (Module._php_embed_init = function () {
          return (_php_embed_init = Module._php_embed_init =
            Module.asm.Yb).apply(null, arguments);
        }),
        _php_embed_shutdown = (Module._php_embed_shutdown = function () {
          return (_php_embed_shutdown = Module._php_embed_shutdown =
            Module.asm.Zb).apply(null, arguments);
        }),
        _pib_destroy = (Module._pib_destroy = function () {
          return (_pib_destroy = Module._pib_destroy = Module.asm._b).apply(
            null,
            arguments
          );
        }),
        _pib_exec = (Module._pib_exec = function () {
          return (_pib_exec = Module._pib_exec = Module.asm.$b).apply(
            null,
            arguments
          );
        }),
        _pib_init = (Module._pib_init = function () {
          return (_pib_init = Module._pib_init = Module.asm.ac).apply(
            null,
            arguments
          );
        }),
        _pib_refresh = (Module._pib_refresh = function () {
          return (_pib_refresh = Module._pib_refresh = Module.asm.bc).apply(
            null,
            arguments
          );
        }),
        _pib_run = (Module._pib_run = function () {
          return (_pib_run = Module._pib_run = Module.asm.cc).apply(
            null,
            arguments
          );
        }),
        _setThrew = (Module._setThrew = function () {
          return (_setThrew = Module._setThrew = Module.asm.dc).apply(
            null,
            arguments
          );
        }),
        _zend_eval_string = (Module._zend_eval_string = function () {
          return (_zend_eval_string = Module._zend_eval_string =
            Module.asm.ec).apply(null, arguments);
        }),
        stackAlloc = (Module.stackAlloc = function () {
          return (stackAlloc = Module.stackAlloc = Module.asm.rc).apply(
            null,
            arguments
          );
        }),
        stackRestore = (Module.stackRestore = function () {
          return (stackRestore = Module.stackRestore = Module.asm.sc).apply(
            null,
            arguments
          );
        }),
        stackSave = (Module.stackSave = function () {
          return (stackSave = Module.stackSave = Module.asm.tc).apply(
            null,
            arguments
          );
        }),
        dynCall_i = (Module.dynCall_i = function () {
          return (dynCall_i = Module.dynCall_i = Module.asm.fc).apply(
            null,
            arguments
          );
        }),
        dynCall_ii = (Module.dynCall_ii = function () {
          return (dynCall_ii = Module.dynCall_ii = Module.asm.gc).apply(
            null,
            arguments
          );
        }),
        dynCall_iii = (Module.dynCall_iii = function () {
          return (dynCall_iii = Module.dynCall_iii = Module.asm.hc).apply(
            null,
            arguments
          );
        }),
        dynCall_iiii = (Module.dynCall_iiii = function () {
          return (dynCall_iiii = Module.dynCall_iiii = Module.asm.ic).apply(
            null,
            arguments
          );
        }),
        dynCall_iiiii = (Module.dynCall_iiiii = function () {
          return (dynCall_iiiii = Module.dynCall_iiiii = Module.asm.jc).apply(
            null,
            arguments
          );
        }),
        dynCall_iiiiii = (Module.dynCall_iiiiii = function () {
          return (dynCall_iiiiii = Module.dynCall_iiiiii = Module.asm.kc).apply(
            null,
            arguments
          );
        }),
        dynCall_iiiiiii = (Module.dynCall_iiiiiii = function () {
          return (dynCall_iiiiiii = Module.dynCall_iiiiiii =
            Module.asm.lc).apply(null, arguments);
        }),
        dynCall_v = (Module.dynCall_v = function () {
          return (dynCall_v = Module.dynCall_v = Module.asm.mc).apply(
            null,
            arguments
          );
        }),
        dynCall_vi = (Module.dynCall_vi = function () {
          return (dynCall_vi = Module.dynCall_vi = Module.asm.nc).apply(
            null,
            arguments
          );
        }),
        dynCall_vii = (Module.dynCall_vii = function () {
          return (dynCall_vii = Module.dynCall_vii = Module.asm.oc).apply(
            null,
            arguments
          );
        }),
        dynCall_viii = (Module.dynCall_viii = function () {
          return (dynCall_viii = Module.dynCall_viii = Module.asm.pc).apply(
            null,
            arguments
          );
        }),
        dynCall_viiii = (Module.dynCall_viiii = function () {
          return (dynCall_viiii = Module.dynCall_viiii = Module.asm.qc).apply(
            null,
            arguments
          );
        });
      (Module.ccall = ccall),
        (Module.UTF8ToString = UTF8ToString),
        (Module.lengthBytesUTF8 = lengthBytesUTF8);
      var calledRun;
      function ExitStatus(e) {
        (this.name = "ExitStatus"),
          (this.message = "Program terminated with exit(" + e + ")"),
          (this.status = e);
      }
      var calledMain = !1;
      dependenciesFulfilled = function e() {
        calledRun || run(), calledRun || (dependenciesFulfilled = e);
      };
      function callMain(e) {
        var r = Module._main;
        e = e || [];
        var n = e.length + 1,
          t = stackAlloc((n + 1) * 4);
        HEAP32[t >> 2] = allocateUTF8OnStack(thisProgram);
        for (var o = 1; o < n; o++)
          HEAP32[(t >> 2) + o] = allocateUTF8OnStack(e[o - 1]);
        HEAP32[(t >> 2) + n] = 0;
        try {
          var a = r(n, t);
          exit(a, !0);
        } catch (s) {
          if (s instanceof ExitStatus) return;
          if (s == "unwind") {
            noExitRuntime = !0;
            return;
          } else {
            var i = s;
            s && typeof s == "object" && s.stack && (i = [s, s.stack]),
              err("exception thrown: " + i),
              quit_(1, s);
          }
        } finally {
          calledMain = !0;
        }
      }
      function run(e) {
        if (
          ((e = e || arguments_),
          runDependencies > 0 || (preRun(), runDependencies > 0))
        )
          return;
        function r() {
          calledRun ||
            ((calledRun = !0),
            (Module.calledRun = !0),
            !ABORT &&
              (initRuntime(),
              preMain(),
              readyPromiseResolve(Module),
              Module.onRuntimeInitialized && Module.onRuntimeInitialized(),
              shouldRunNow && callMain(e),
              postRun()));
        }
        Module.setStatus
          ? (Module.setStatus("Running..."),
            setTimeout(function () {
              setTimeout(function () {
                Module.setStatus("");
              }, 1),
                r();
            }, 1))
          : r();
      }
      Module.run = run;
      function exit(e, r) {
        (r && noExitRuntime && e === 0) ||
          (noExitRuntime ||
            ((ABORT = !0),
            (EXITSTATUS = e),
            exitRuntime(),
            Module.onExit && Module.onExit(e)),
          quit_(e, new ExitStatus(e)));
      }
      if (Module.preInit)
        for (
          typeof Module.preInit == "function" &&
          (Module.preInit = [Module.preInit]);
          Module.preInit.length > 0;

        )
          Module.preInit.pop()();
      var shouldRunNow = !1;
      return (
        Module.noInitialRun && (shouldRunNow = !1),
        (noExitRuntime = !0),
        run(),
        PHP.ready
      );
    };
  })();
  typeof exports == "object" && typeof module == "object"
    ? (module.exports = PHP)
    : typeof define == "function" && define.amd
    ? define([], function () {
        return PHP;
      })
    : typeof exports == "object" && (exports.PHP = PHP);
});
var ee = Q(j()),
  { default: G, ...re } = ee,
  te = G !== void 0 ? G : re;
export { te as default };
