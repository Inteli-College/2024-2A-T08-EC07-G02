"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/approve",{

/***/ "./src/pages/approve.tsx":
/*!*******************************!*\
  !*** ./src/pages/approve.tsx ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Approve; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction Approve() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"self-center text-5xl font-bold \",\n                children: \" N\\xe3o possui falhas \"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Inteli\\\\Documents\\\\GitHub\\\\2024-2A-T08-EC07-G02\\\\src\\\\frontend\\\\src\\\\pages\\\\approve.tsx\",\n                lineNumber: 5,\n                columnNumber: 4\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"self-center\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                    className: \"max-w-20 max-w-20\",\n                    src: \"/image 7.png\",\n                    alt: \"\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Inteli\\\\Documents\\\\GitHub\\\\2024-2A-T08-EC07-G02\\\\src\\\\frontend\\\\src\\\\pages\\\\approve.tsx\",\n                    lineNumber: 6,\n                    columnNumber: 33\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Inteli\\\\Documents\\\\GitHub\\\\2024-2A-T08-EC07-G02\\\\src\\\\frontend\\\\src\\\\pages\\\\approve.tsx\",\n                lineNumber: 6,\n                columnNumber: 4\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"self-center text-2xl\",\n                children: \" Identificador de falhas \"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Inteli\\\\Documents\\\\GitHub\\\\2024-2A-T08-EC07-G02\\\\src\\\\frontend\\\\src\\\\pages\\\\approve.tsx\",\n                lineNumber: 7,\n                columnNumber: 4\n            }, this)\n        ]\n    }, void 0, true);\n}\n_c = Approve;\nvar _c;\n$RefreshReg$(_c, \"Approve\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvYXBwcm92ZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFlLFNBQVNBO0lBQ3ZCLHFCQUNDOzswQkFFQyw4REFBQ0M7Z0JBQUlDLFdBQVU7MEJBQWtDOzs7Ozs7MEJBQ2pELDhEQUFDRDtnQkFBSUMsV0FBVTswQkFBYyw0RUFBQ0M7b0JBQUlELFdBQVU7b0JBQW9CRSxLQUFJO29CQUFlQyxLQUFJOzs7Ozs7Ozs7OzswQkFDdkYsOERBQUNKO2dCQUFJQyxXQUFVOzBCQUF1Qjs7Ozs7Ozs7QUFHekM7S0FUd0JGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9wYWdlcy9hcHByb3ZlLnRzeD9iMTY0Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcHJvdmUoKSB7XHJcblx0cmV0dXJuIChcclxuXHRcdDw+XHJcblx0XHRcdFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlbGYtY2VudGVyIHRleHQtNXhsIGZvbnQtYm9sZFx0XCI+IE7Do28gcG9zc3VpIGZhbGhhcyA8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWxmLWNlbnRlclwiPjxpbWcgY2xhc3NOYW1lPSdtYXgtdy0yMCBtYXgtdy0yMCcgc3JjPVwiL2ltYWdlIDcucG5nXCIgYWx0PVwiXCIgLz48L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWxmLWNlbnRlciB0ZXh0LTJ4bFwiPiBJZGVudGlmaWNhZG9yIGRlIGZhbGhhcyA8L2Rpdj5cclxuXHRcdDwvPlxyXG5cdCk7XHJcbn1cclxuXHJcbiJdLCJuYW1lcyI6WyJBcHByb3ZlIiwiZGl2IiwiY2xhc3NOYW1lIiwiaW1nIiwic3JjIiwiYWx0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/approve.tsx\n"));

/***/ })

});