"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/changelog/page",{

/***/ "(app-pages-browser)/./app/changelog/page.tsx":
/*!********************************!*\
  !*** ./app/changelog/page.tsx ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handler: function() { return /* binding */ handler; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* __next_internal_client_entry_do_not_use__ handler,default auto */ \nvar _s = $RefreshSig$();\nfunction handler(req, res) {\n    if (req.method === \"GET\") {\n        res.status(200).json({\n            messages: [\n                \"Initial commit\",\n                \"Added new feature\",\n                \"Fixed bugs\"\n            ]\n        });\n    } else {\n        res.status(405).end(); // Method Not Allowed\n    }\n}\n\nconst ChangelogPage = ()=>{\n    _s();\n    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchChangelog = async ()=>{\n            try {\n                const response = await fetch(\"/api/changelog\");\n                if (!response.ok) {\n                    throw new Error(\"Failed to fetch changelog\");\n                }\n                const data = await response.json();\n                setMessages(data.messages);\n            } catch (err) {\n                if (err instanceof Error) {\n                    setError(err.message);\n                } else {\n                    setError(\"An unknown error occurred\");\n                }\n            } finally{\n                setLoading(false);\n            }\n        };\n        fetchChangelog();\n    }, []);\n    if (loading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"Loading...\"\n        }, void 0, false, {\n            fileName: \"/Users/jasongrant/Repos/jasongrant/app/changelog/page.tsx\",\n            lineNumber: 42,\n            columnNumber: 16\n        }, undefined);\n    }\n    if (error) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: [\n                \"Error: \",\n                error\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/jasongrant/Repos/jasongrant/app/changelog/page.tsx\",\n            lineNumber: 46,\n            columnNumber: 16\n        }, undefined);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Changelog\"\n            }, void 0, false, {\n                fileName: \"/Users/jasongrant/Repos/jasongrant/app/changelog/page.tsx\",\n                lineNumber: 51,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                children: messages.map((message, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                        children: message\n                    }, index, false, {\n                        fileName: \"/Users/jasongrant/Repos/jasongrant/app/changelog/page.tsx\",\n                        lineNumber: 54,\n                        columnNumber: 21\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"/Users/jasongrant/Repos/jasongrant/app/changelog/page.tsx\",\n                lineNumber: 52,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/jasongrant/Repos/jasongrant/app/changelog/page.tsx\",\n        lineNumber: 50,\n        columnNumber: 9\n    }, undefined);\n};\n_s(ChangelogPage, \"cs3D4i5NKu67WmfKAPFvxZcuk7s=\");\n_c = ChangelogPage;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ChangelogPage);\nvar _c;\n$RefreshReg$(_c, \"ChangelogPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jaGFuZ2Vsb2cvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBR08sU0FBU0EsUUFBUUMsR0FBbUIsRUFBRUMsR0FBb0I7SUFDN0QsSUFBSUQsSUFBSUUsTUFBTSxLQUFLLE9BQU87UUFDdEJELElBQUlFLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsVUFBVTtnQkFBQztnQkFBa0I7Z0JBQXFCO2FBQWE7UUFBQztJQUMzRixPQUFPO1FBQ0hKLElBQUlFLE1BQU0sQ0FBQyxLQUFLRyxHQUFHLElBQUkscUJBQXFCO0lBQ2hEO0FBQ0o7QUFDNEM7QUFFNUMsTUFBTUcsZ0JBQWdCOztJQUNsQixNQUFNLENBQUNKLFVBQVVLLFlBQVksR0FBR0YsK0NBQVFBLENBQVcsRUFBRTtJQUNyRCxNQUFNLENBQUNHLFNBQVNDLFdBQVcsR0FBR0osK0NBQVFBLENBQVU7SUFDaEQsTUFBTSxDQUFDSyxPQUFPQyxTQUFTLEdBQUdOLCtDQUFRQSxDQUFnQjtJQUVsREQsZ0RBQVNBLENBQUM7UUFDTixNQUFNUSxpQkFBaUI7WUFDbkIsSUFBSTtnQkFDQSxNQUFNQyxXQUFXLE1BQU1DLE1BQU07Z0JBQzdCLElBQUksQ0FBQ0QsU0FBU0UsRUFBRSxFQUFFO29CQUNkLE1BQU0sSUFBSUMsTUFBTTtnQkFDcEI7Z0JBQ0EsTUFBTUMsT0FBTyxNQUFNSixTQUFTWixJQUFJO2dCQUNoQ00sWUFBWVUsS0FBS2YsUUFBUTtZQUM3QixFQUFFLE9BQU9nQixLQUFLO2dCQUNWLElBQUlBLGVBQWVGLE9BQU87b0JBQ3RCTCxTQUFTTyxJQUFJQyxPQUFPO2dCQUN4QixPQUFPO29CQUNIUixTQUFTO2dCQUNiO1lBQ0osU0FBVTtnQkFDTkYsV0FBVztZQUNmO1FBQ0o7UUFFQUc7SUFDSixHQUFHLEVBQUU7SUFFTCxJQUFJSixTQUFTO1FBQ1QscUJBQU8sOERBQUNZO3NCQUFJOzs7Ozs7SUFDaEI7SUFFQSxJQUFJVixPQUFPO1FBQ1AscUJBQU8sOERBQUNVOztnQkFBSTtnQkFBUVY7Ozs7Ozs7SUFDeEI7SUFFQSxxQkFDSSw4REFBQ1U7OzBCQUNHLDhEQUFDQzswQkFBRzs7Ozs7OzBCQUNKLDhEQUFDQzswQkFDSXBCLFNBQVNxQixHQUFHLENBQUMsQ0FBQ0osU0FBU0ssc0JBQ3BCLDhEQUFDQztrQ0FBZ0JOO3VCQUFSSzs7Ozs7Ozs7Ozs7Ozs7OztBQUs3QjtHQTlDTWxCO0tBQUFBO0FBZ0ROLCtEQUFlQSxhQUFhQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9jaGFuZ2Vsb2cvcGFnZS50c3g/YjE5ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIlxuaW1wb3J0IHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gJ25leHQnO1xuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlcihyZXE6IE5leHRBcGlSZXF1ZXN0LCByZXM6IE5leHRBcGlSZXNwb25zZSkge1xuICAgIGlmIChyZXEubWV0aG9kID09PSAnR0VUJykge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IG1lc3NhZ2VzOiBbJ0luaXRpYWwgY29tbWl0JywgJ0FkZGVkIG5ldyBmZWF0dXJlJywgJ0ZpeGVkIGJ1Z3MnXSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXMuc3RhdHVzKDQwNSkuZW5kKCk7IC8vIE1ldGhvZCBOb3QgQWxsb3dlZFxuICAgIH1cbn1cbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IENoYW5nZWxvZ1BhZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4oW10pO1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBmZXRjaENoYW5nZWxvZyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9jaGFuZ2Vsb2cnKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIGNoYW5nZWxvZycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgIHNldE1lc3NhZ2VzKGRhdGEubWVzc2FnZXMpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEVycm9yKGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXRFcnJvcignQW4gdW5rbm93biBlcnJvciBvY2N1cnJlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZmV0Y2hDaGFuZ2Vsb2coKTtcbiAgICB9LCBbXSk7XG5cbiAgICBpZiAobG9hZGluZykge1xuICAgICAgICByZXR1cm4gPGRpdj5Mb2FkaW5nLi4uPC9kaXY+O1xuICAgIH1cblxuICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXR1cm4gPGRpdj5FcnJvcjoge2Vycm9yfTwvZGl2PjtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGgxPkNoYW5nZWxvZzwvaDE+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAge21lc3NhZ2VzLm1hcCgobWVzc2FnZSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGxpIGtleT17aW5kZXh9PnttZXNzYWdlfTwvbGk+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhbmdlbG9nUGFnZTsiXSwibmFtZXMiOlsiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlcyIsImVuZCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiQ2hhbmdlbG9nUGFnZSIsInNldE1lc3NhZ2VzIiwibG9hZGluZyIsInNldExvYWRpbmciLCJlcnJvciIsInNldEVycm9yIiwiZmV0Y2hDaGFuZ2Vsb2ciLCJyZXNwb25zZSIsImZldGNoIiwib2siLCJFcnJvciIsImRhdGEiLCJlcnIiLCJtZXNzYWdlIiwiZGl2IiwiaDEiLCJ1bCIsIm1hcCIsImluZGV4IiwibGkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/changelog/page.tsx\n"));

/***/ })

});