/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/writing/layout",{

/***/ "(app-pages-browser)/./ui/shared/ThemeSwitcher.module.css":
/*!********************************************!*\
  !*** ./ui/shared/ThemeSwitcher.module.css ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("// extracted by mini-css-extract-plugin\nmodule.exports = {\"iconTrigger\":\"ThemeSwitcher_iconTrigger__F28y_\"};\n    if(true) {\n      // 1728775486195\n      var cssReload = __webpack_require__(/*! ./node_modules/next/dist/compiled/mini-css-extract-plugin/hmr/hotModuleReplacement.js */ \"(app-pages-browser)/./node_modules/next/dist/compiled/mini-css-extract-plugin/hmr/hotModuleReplacement.js\")(module.id, {\"publicPath\":\"/_next/\",\"esModule\":false,\"locals\":true});\n      module.hot.dispose(cssReload);\n      \n    }\n  \nmodule.exports.__checksum = \"d3c7d264318c\"\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3VpL3NoYXJlZC9UaGVtZVN3aXRjaGVyLm1vZHVsZS5jc3MiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxrQkFBa0I7QUFDbEIsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsd01BQXdILGNBQWMsc0RBQXNEO0FBQzFOLE1BQU0sVUFBVTtBQUNoQjtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vdWkvc2hhcmVkL1RoZW1lU3dpdGNoZXIubW9kdWxlLmNzcz9mOGFiIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJpY29uVHJpZ2dlclwiOlwiVGhlbWVTd2l0Y2hlcl9pY29uVHJpZ2dlcl9fRjI4eV9cIn07XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyODc3NTQ4NjE5NVxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIvVXNlcnMvamFzb25ncmFudC9SZXBvcy9qYXNvbmdyYW50L25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY29tcGlsZWQvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wicHVibGljUGF0aFwiOlwiL19uZXh0L1wiLFwiZXNNb2R1bGVcIjpmYWxzZSxcImxvY2Fsc1wiOnRydWV9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgXG4gICAgfVxuICBcbm1vZHVsZS5leHBvcnRzLl9fY2hlY2tzdW0gPSBcImQzYzdkMjY0MzE4Y1wiXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./ui/shared/ThemeSwitcher.module.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./ui/shared/ThemeSwitcher.tsx":
/*!*************************************!*\
  !*** ./ui/shared/ThemeSwitcher.tsx ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _radix_ui_themes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/themes */ \"(app-pages-browser)/./node_modules/@radix-ui/themes/dist/esm/index.js\");\n/* harmony import */ var _radix_ui_react_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-icons */ \"(app-pages-browser)/./node_modules/@radix-ui/react-icons/dist/react-icons.esm.js\");\n/* harmony import */ var _ThemeSwitcher_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeSwitcher.module.css */ \"(app-pages-browser)/./ui/shared/ThemeSwitcher.module.css\");\n/* harmony import */ var _ThemeSwitcher_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ThemeSwitcher_module_css__WEBPACK_IMPORTED_MODULE_3__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nconst ThemeSwitcher = ()=>{\n    _s();\n    const [isLightMode, setIsLightMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const handleModeSwitch = ()=>{\n        setIsLightMode(!isLightMode);\n        document.documentElement.classList.toggle(\"light\");\n        document.documentElement.classList.toggle(\"dark\");\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_radix_ui_themes__WEBPACK_IMPORTED_MODULE_2__.Button, {\n        variant: \"ghost\",\n        size: \"4\",\n        onClick: handleModeSwitch,\n        className: (_ThemeSwitcher_module_css__WEBPACK_IMPORTED_MODULE_3___default().iconTrigger),\n        children: isLightMode ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_radix_ui_react_icons__WEBPACK_IMPORTED_MODULE_4__.MoonIcon, {}, void 0, false, {\n            fileName: \"/Users/jasongrant/Repos/jasongrant/ui/shared/ThemeSwitcher.tsx\",\n            lineNumber: 20,\n            columnNumber: 25\n        }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_radix_ui_react_icons__WEBPACK_IMPORTED_MODULE_4__.SunIcon, {}, void 0, false, {\n            fileName: \"/Users/jasongrant/Repos/jasongrant/ui/shared/ThemeSwitcher.tsx\",\n            lineNumber: 20,\n            columnNumber: 42\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/jasongrant/Repos/jasongrant/ui/shared/ThemeSwitcher.tsx\",\n        lineNumber: 19,\n        columnNumber: 5\n    }, undefined);\n};\n_s(ThemeSwitcher, \"CoMuiN0O/yAaZIfNzsPxTBRjsUs=\");\n_c = ThemeSwitcher;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ThemeSwitcher);\nvar _c;\n$RefreshReg$(_c, \"ThemeSwitcher\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3VpL3NoYXJlZC9UaGVtZVN3aXRjaGVyLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR2lDO0FBQ2tCO0FBQ087QUFDVjtBQUVoRCxNQUFNSyxnQkFBZ0I7O0lBQ3BCLE1BQU0sQ0FBQ0MsYUFBYUMsZUFBZSxHQUFHUCwrQ0FBUUEsQ0FBQztJQUUvQyxNQUFNUSxtQkFBbUI7UUFDdkJELGVBQWUsQ0FBQ0Q7UUFDaEJHLFNBQVNDLGVBQWUsQ0FBQ0MsU0FBUyxDQUFDQyxNQUFNLENBQUM7UUFDMUNILFNBQVNDLGVBQWUsQ0FBQ0MsU0FBUyxDQUFDQyxNQUFNLENBQUM7SUFDNUM7SUFFQSxxQkFDRSw4REFBQ1gsb0RBQU1BO1FBQUNZLFNBQVE7UUFBUUMsTUFBSztRQUFJQyxTQUFTUDtRQUFrQlEsV0FBV1osOEVBQWtCO2tCQUNwRkUsNEJBQWUsOERBQUNILDJEQUFRQTs7OztzQ0FBUSw4REFBQ0QsMERBQU9BOzs7Ozs7Ozs7O0FBR2pEO0dBZE1HO0tBQUFBO0FBZ0JOLCtEQUFlQSxhQUFhQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3VpL3NoYXJlZC9UaGVtZVN3aXRjaGVyLnRzeD8yZmMwIl0sInNvdXJjZXNDb250ZW50IjpbIlxuXCJ1c2UgY2xpZW50XCJcblxuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCdXR0b24sIEhlYWRpbmcgfSBmcm9tICdAcmFkaXgtdWkvdGhlbWVzJztcbmltcG9ydCB7IFN1bkljb24sIE1vb25JY29uIH0gZnJvbSAnQHJhZGl4LXVpL3JlYWN0LWljb25zJztcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9UaGVtZVN3aXRjaGVyLm1vZHVsZS5jc3MnO1xuXG5jb25zdCBUaGVtZVN3aXRjaGVyID0gKCkgPT4ge1xuICBjb25zdCBbaXNMaWdodE1vZGUsIHNldElzTGlnaHRNb2RlXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIGNvbnN0IGhhbmRsZU1vZGVTd2l0Y2ggPSAoKSA9PiB7XG4gICAgc2V0SXNMaWdodE1vZGUoIWlzTGlnaHRNb2RlKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbGlnaHQnKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyaycpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEJ1dHRvbiB2YXJpYW50PVwiZ2hvc3RcIiBzaXplPVwiNFwiIG9uQ2xpY2s9e2hhbmRsZU1vZGVTd2l0Y2h9IGNsYXNzTmFtZT17c3R5bGVzLmljb25UcmlnZ2VyfT5cbiAgICAgICAge2lzTGlnaHRNb2RlID8gKDxNb29uSWNvbiAvPikgOiAoPFN1bkljb24gLz4pfVxuICAgIDwvQnV0dG9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVGhlbWVTd2l0Y2hlcjsiXSwibmFtZXMiOlsidXNlU3RhdGUiLCJCdXR0b24iLCJTdW5JY29uIiwiTW9vbkljb24iLCJzdHlsZXMiLCJUaGVtZVN3aXRjaGVyIiwiaXNMaWdodE1vZGUiLCJzZXRJc0xpZ2h0TW9kZSIsImhhbmRsZU1vZGVTd2l0Y2giLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInZhcmlhbnQiLCJzaXplIiwib25DbGljayIsImNsYXNzTmFtZSIsImljb25UcmlnZ2VyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./ui/shared/ThemeSwitcher.tsx\n"));

/***/ })

});