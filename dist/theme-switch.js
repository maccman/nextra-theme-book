function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var nextThemes = require('next-themes');

function ThemeSwitch() {
  const {
    theme,
    setTheme
  } = nextThemes.useTheme();
  return /*#__PURE__*/React.createElement("a", {
    className: "text-current p-2 cursor-pointer",
    onClick: () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  }, theme === 'dark' ? /*#__PURE__*/React.createElement("svg", {
    key: "dark",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
    shapeRendering: "geometricPrecision"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
  })) : theme === 'light' ? /*#__PURE__*/React.createElement("svg", {
    key: "light",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
    shapeRendering: "geometricPrecision"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 1v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 21v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4.22 4.22l1.42 1.42"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18.36 18.36l1.42 1.42"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M1 12h2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 12h2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4.22 19.78l1.42-1.42"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18.36 5.64l1.42-1.42"
  })) : /*#__PURE__*/React.createElement("svg", {
    key: "undefined",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
    shapeRendering: "geometricPrecision"
  }));
}

module.exports = ThemeSwitch;
