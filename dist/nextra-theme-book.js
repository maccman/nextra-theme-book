function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ReactDOMServer = _interopDefault(require('react-dom/server'));
var router = require('next/router');
var Head = _interopDefault(require('next/head'));
var Link = _interopDefault(require('next/link'));
var slugify = _interopDefault(require('@sindresorhus/slugify'));
require('focus-visible');
var skipNav = require('@reach/skip-nav');
var nextThemes = require('next-themes');
var getTitle = _interopDefault(require('title'));
var matchSorter = _interopDefault(require('match-sorter'));
var cn = _interopDefault(require('classnames'));
var react = require('@mdx-js/react');
var Highlight = require('prism-react-renderer');
var Highlight__default = _interopDefault(Highlight);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function flatten(list) {
  return list.reduce((flat, toFlatten) => {
    return flat.concat(toFlatten.children ? flatten(toFlatten.children) : toFlatten);
  }, []);
}

function reorderBasedOnMeta(list) {
  let meta = list.find(item => item.name === 'meta.json');

  if (!meta) {
    meta = {};
  } else {
    meta = meta.meta;
  }

  const metaKeys = Object.keys(meta);
  return list.filter(a => {
    return a.name !== 'meta.json' && !a.name.startsWith('_');
  }).sort((a, b) => {
    return metaKeys.indexOf(a.name) - metaKeys.indexOf(b.name);
  }).map(a => {
    return _extends({}, a, {
      children: a.children ? reorderBasedOnMeta(a.children) : undefined,
      title: meta[a.name] || getTitle(a.name)
    });
  });
}

const Item = ({
  title,
  active,
  href,
  onMouseOver,
  search
}) => {
  const highlight = title.toLowerCase().indexOf(search.toLowerCase());
  return /*#__PURE__*/React__default.createElement(Link, {
    href: href
  }, /*#__PURE__*/React__default.createElement("a", {
    className: "block no-underline",
    onMouseOver: onMouseOver
  }, /*#__PURE__*/React__default.createElement("li", {
    className: cn('p-2 text-gray-800', {
      'bg-gray-100': active
    })
  }, title.substring(0, highlight), /*#__PURE__*/React__default.createElement("span", {
    className: "bg-yellow-300"
  }, title.substring(highlight, highlight + search.length)), title.substring(highlight + search.length))));
};

const Search = ({
  directories
}) => {
  const router$1 = router.useRouter();
  const [show, setShow] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [active, setActive] = React.useState(0);
  const input = React.useRef(null);
  const results = React.useMemo(() => {
    if (!search) return []; // Will need to scrape all the headers from each page and search through them here
    // (similar to what we already do to render the hash links in sidebar)
    // We could also try to search the entire string text from each page

    return matchSorter(directories, search, {
      keys: ['title']
    });
  }, [search]);
  const handleKeyDown = React.useCallback(e => {
    switch (e.key) {
      case 'ArrowDown':
        {
          e.preventDefault();

          if (active + 1 < results.length) {
            setActive(active + 1);
          }

          break;
        }

      case 'ArrowUp':
        {
          e.preventDefault();

          if (active - 1 >= 0) {
            setActive(active - 1);
          }

          break;
        }

      case 'Enter':
        {
          router$1.push(results[active].route);
          break;
        }
    }
  }, [active, results, router$1]);
  React.useEffect(() => {
    setActive(0);
  }, [search]);
  React.useEffect(() => {
    const inputs = ['input', 'select', 'button', 'textarea'];

    const down = e => {
      if (document.activeElement && inputs.indexOf(document.activeElement.tagName.toLowerCase() !== -1)) {
        if (e.key === '/') {
          e.preventDefault();
          input.current.focus();
        } else if (e.key === 'Escape') {
          setShow(false);
        }
      }
    };

    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, []);
  const renderList = show && results.length > 0;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "relative w-full md:w-64 mr-2"
  }, renderList && /*#__PURE__*/React__default.createElement("div", {
    className: "search-overlay z-1",
    onClick: () => setShow(false)
  }), /*#__PURE__*/React__default.createElement("input", {
    onChange: e => {
      setSearch(e.target.value);
      setShow(true);
    },
    className: "appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full",
    type: "search",
    placeholder: "Search (\"/\" to focus)",
    onKeyDown: handleKeyDown,
    onFocus: () => setShow(true),
    ref: input
  }), renderList && /*#__PURE__*/React__default.createElement("ul", {
    className: "shadow-md list-none p-0 m-0 absolute left-0 md:right-0 bg-white rounded mt-1 border top-100 divide-y divide-gray-300 z-2"
  }, results.map((res, i) => {
    return /*#__PURE__*/React__default.createElement(Item, {
      key: `search-item-${i}`,
      title: res.title,
      href: res.route,
      active: i === active,
      search: search,
      onMouseOver: () => setActive(i)
    });
  })));
};

var GitHubIcon = (({
  height = 40
}) => {
  return /*#__PURE__*/React__default.createElement("svg", {
    height: height,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React__default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z",
    fill: "currentColor"
  }));
});

var ArrowRight = ((_ref) => {
  let {
    height = 24
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["height"]);

  return /*#__PURE__*/React__default.createElement("svg", _extends({
    height: height,
    viewBox: "0 0 24 24",
    fill: "none"
  }, props), /*#__PURE__*/React__default.createElement("path", {
    d: "M3 12h18m0 0l-6.146-6M21 12l-6.146 6",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
});

function ThemeSwitch() {
  const {
    theme,
    setTheme
  } = nextThemes.useTheme();
  return /*#__PURE__*/React__default.createElement("a", {
    className: "text-current p-2 cursor-pointer",
    onClick: () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  }, theme === 'dark' ? /*#__PURE__*/React__default.createElement("svg", {
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
  }, /*#__PURE__*/React__default.createElement("path", {
    d: "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
  })) : theme === 'light' ? /*#__PURE__*/React__default.createElement("svg", {
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
  }, /*#__PURE__*/React__default.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "5"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M12 1v2"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M12 21v2"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M4.22 4.22l1.42 1.42"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M18.36 18.36l1.42 1.42"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M1 12h2"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M21 12h2"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M4.22 19.78l1.42-1.42"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M18.36 5.64l1.42-1.42"
  })) : /*#__PURE__*/React__default.createElement("svg", {
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

const THEME = {
  plain: {
    color: '#000',
    backgroundColor: 'transparent'
  },
  styles: [{
    types: ['keyword'],
    style: {
      color: '#ff0078',
      fontWeight: 'bold'
    }
  }, {
    types: ['comment'],
    style: {
      color: '#999',
      fontStyle: 'italic'
    }
  }, {
    types: ['string', 'url', 'attr-value'],
    style: {
      color: '#028265'
    }
  }, {
    types: ['variable', 'language-javascript'],
    style: {
      color: '#0076ff'
    }
  }, {
    types: ['builtin', 'char', 'constant'],
    style: {
      color: '#000'
    }
  }, {
    types: ['attr-name'],
    style: {
      color: '#d9931e',
      fontStyle: 'normal'
    }
  }, {
    types: ['punctuation', 'operator'],
    style: {
      color: '#333'
    }
  }, {
    types: ['number', 'function', 'tag'],
    style: {
      color: '#0076ff'
    }
  }, {
    types: ['boolean', 'regex'],
    style: {
      color: '#d9931e'
    }
  }]
}; // Anchor links

const HeaderLink = (_ref) => {
  let {
    tag: Tag,
    children
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["tag", "children"]);

  const slug = slugify(ReactDOMServer.renderToStaticMarkup(children) || '');
  return /*#__PURE__*/React__default.createElement(Tag, props, /*#__PURE__*/React__default.createElement("span", {
    className: "subheading-anchor",
    id: slug
  }), /*#__PURE__*/React__default.createElement("a", {
    href: '#' + slug,
    className: "text-current no-underline no-outline"
  }, children, /*#__PURE__*/React__default.createElement("span", {
    className: "anchor-icon",
    "aria-hidden": true
  }, "#")));
};

const H2 = (_ref2) => {
  let {
    children
  } = _ref2,
      props = _objectWithoutPropertiesLoose(_ref2, ["children"]);

  return /*#__PURE__*/React__default.createElement(HeaderLink, _extends({
    tag: "h2"
  }, props), children);
};

const H3 = (_ref3) => {
  let {
    children
  } = _ref3,
      props = _objectWithoutPropertiesLoose(_ref3, ["children"]);

  return /*#__PURE__*/React__default.createElement(HeaderLink, _extends({
    tag: "h3"
  }, props), children);
};

const H4 = (_ref4) => {
  let {
    children
  } = _ref4,
      props = _objectWithoutPropertiesLoose(_ref4, ["children"]);

  return /*#__PURE__*/React__default.createElement(HeaderLink, _extends({
    tag: "h4"
  }, props), children);
};

const H5 = (_ref5) => {
  let {
    children
  } = _ref5,
      props = _objectWithoutPropertiesLoose(_ref5, ["children"]);

  return /*#__PURE__*/React__default.createElement(HeaderLink, _extends({
    tag: "h5"
  }, props), children);
};

const H6 = (_ref6) => {
  let {
    children
  } = _ref6,
      props = _objectWithoutPropertiesLoose(_ref6, ["children"]);

  return /*#__PURE__*/React__default.createElement(HeaderLink, _extends({
    tag: "h6"
  }, props), children);
};

const A = (_ref7) => {
  let {
    children
  } = _ref7,
      props = _objectWithoutPropertiesLoose(_ref7, ["children"]);

  const isExternal = props.href && props.href.startsWith('https://');

  if (isExternal) {
    return /*#__PURE__*/React__default.createElement("a", _extends({
      target: "_blank"
    }, props), children);
  }

  return /*#__PURE__*/React__default.createElement(Link, {
    href: props.href
  }, /*#__PURE__*/React__default.createElement("a", props, children));
};

const Code = (_ref8) => {
  let {
    children,
    className,
    highlight
  } = _ref8,
      props = _objectWithoutPropertiesLoose(_ref8, ["children", "className", "highlight"]);

  if (!className) return /*#__PURE__*/React__default.createElement("code", props, children);
  const highlightedLines = highlight ? highlight.split(',').map(Number) : []; // https://mdxjs.com/guides/syntax-highlighting#all-together

  const language = className.replace(/language-/, '');
  return /*#__PURE__*/React__default.createElement(Highlight__default, _extends({}, Highlight.defaultProps, {
    code: children.trim(),
    language: language,
    theme: THEME
  }), ({
    className,
    style,
    tokens,
    getLineProps,
    getTokenProps
  }) => /*#__PURE__*/React__default.createElement("code", {
    className: className,
    style: _extends({}, style)
  }, tokens.map((line, i) => /*#__PURE__*/React__default.createElement("div", _extends({
    key: i
  }, getLineProps({
    line,
    key: i
  }), {
    style: highlightedLines.includes(i + 1) ? {
      background: '#cce0f5',
      margin: '0 -1rem',
      padding: '0 1rem'
    } : null
  }), line.map((token, key) => /*#__PURE__*/React__default.createElement("span", _extends({
    key: key
  }, getTokenProps({
    token,
    key
  }))))))));
};

const components = {
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: A,
  code: Code
};
var Theme = (({
  children
}) => {
  return /*#__PURE__*/React__default.createElement(react.MDXProvider, {
    components: components
  }, children);
});

var defaultConfig = {
  github: 'https://github.com/shuding/nextra',
  titleSuffix: ' – Nextra',
  nextLinks: true,
  prevLinks: true,
  search: true,
  darkMode: true,
  footer: true,
  footerText: 'MIT 2020 © Shu Ding.',
  footerEditOnGitHubLink: true,
  logo: /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("span", {
    className: "mr-2 font-extrabold hidden md:inline"
  }, "Nextra"), /*#__PURE__*/React__default.createElement("span", {
    className: "text-gray-600 font-normal hidden md:inline"
  }, "The Next Docs Builder")),
  head: /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("meta", {
    name: "msapplication-TileColor",
    content: "#ffffff"
  }), /*#__PURE__*/React__default.createElement("meta", {
    name: "theme-color",
    content: "#ffffff"
  }), /*#__PURE__*/React__default.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0"
  }), /*#__PURE__*/React__default.createElement("meta", {
    httpEquiv: "Content-Language",
    content: "en"
  }), /*#__PURE__*/React__default.createElement("meta", {
    name: "description",
    content: "Nextra: the next docs builder"
  }), /*#__PURE__*/React__default.createElement("meta", {
    name: "og:description",
    content: "Nextra: the next docs builder"
  }), /*#__PURE__*/React__default.createElement("meta", {
    name: "twitter:card",
    content: "summary_large_image"
  }), /*#__PURE__*/React__default.createElement("meta", {
    name: "twitter:site",
    content: "@shuding_"
  }), /*#__PURE__*/React__default.createElement("meta", {
    name: "og:title",
    content: "Nextra: the next docs builder"
  }), /*#__PURE__*/React__default.createElement("meta", {
    name: "apple-mobile-web-app-title",
    content: "Nextra"
  }))
};

const TreeState = new Map();
const titleType = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const MenuContext = React.createContext(false);
const emojiRe = /[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u2388\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2605\u2607-\u2612\u2614-\u2685\u2690-\u2705\u2708-\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2767\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299\u{1F000}-\u{1F0FF}\u{1F10D}-\u{1F10F}\u{1F12F}\u{1F16C}-\u{1F171}\u{1F17E}\u{1F17F}\u{1F18E}\u{1F191}-\u{1F19A}\u{1F1AD}-\u{1F1E5}\u{1F201}-\u{1F20F}\u{1F21A}\u{1F22F}\u{1F232}-\u{1F23A}\u{1F23C}-\u{1F23F}\u{1F249}-\u{1F3FA}\u{1F400}-\u{1F53D}\u{1F546}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F774}-\u{1F77F}\u{1F7D5}-\u{1F7FF}\u{1F80C}-\u{1F80F}\u{1F848}-\u{1F84F}\u{1F85A}-\u{1F85F}\u{1F888}-\u{1F88F}\u{1F8AE}-\u{1F8FF}\u{1F90C}-\u{1F93A}\u{1F93C}-\u{1F945}\u{1F947}-\u{1FAFF}\u{1FC00}-\u{1FFFD}]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55\u{1F004}\u{1F0CF}\u{1F18E}\u{1F191}-\u{1F19A}\u{1F1E6}-\u{1F1FF}\u{1F201}\u{1F21A}\u{1F22F}\u{1F232}-\u{1F236}\u{1F238}-\u{1F23A}\u{1F250}\u{1F251}\u{1F300}-\u{1F320}\u{1F32D}-\u{1F335}\u{1F337}-\u{1F37C}\u{1F37E}-\u{1F393}\u{1F3A0}-\u{1F3CA}\u{1F3CF}-\u{1F3D3}\u{1F3E0}-\u{1F3F0}\u{1F3F4}\u{1F3F8}-\u{1F43E}\u{1F440}\u{1F442}-\u{1F4FC}\u{1F4FF}-\u{1F53D}\u{1F54B}-\u{1F54E}\u{1F550}-\u{1F567}\u{1F57A}\u{1F595}\u{1F596}\u{1F5A4}\u{1F5FB}-\u{1F64F}\u{1F680}-\u{1F6C5}\u{1F6CC}\u{1F6D0}-\u{1F6D2}\u{1F6D5}-\u{1F6D7}\u{1F6EB}\u{1F6EC}\u{1F6F4}-\u{1F6FC}\u{1F7E0}-\u{1F7EB}\u{1F90C}-\u{1F93A}\u{1F93C}-\u{1F945}\u{1F947}-\u{1F978}\u{1F97A}-\u{1F9CB}\u{1F9CD}-\u{1F9FF}\u{1FA70}-\u{1FA74}\u{1FA78}-\u{1FA7A}\u{1FA80}-\u{1FA86}\u{1FA90}-\u{1FAA8}\u{1FAB0}-\u{1FAB6}\u{1FAC0}-\u{1FAC2}\u{1FAD0}-\u{1FAD6}]/gu;

function Emoji({
  children
}) {
  return /*#__PURE__*/React__default.createElement("div", {
    className: "inline-block w-5 mr-xxs"
  }, children);
}

function Folder({
  item,
  anchors
}) {
  var _TreeState$item$route;

  const route = router.useRouter().route + '/';
  const active = route.startsWith(item.route + '/');
  const open = (_TreeState$item$route = TreeState[item.route]) != null ? _TreeState$item$route : false;
  const [_, render] = React.useState(false);
  React.useEffect(() => {
    if (active) {
      TreeState[item.route] = true;
    }
  }, [active]);
  let title = item.title;
  let emoji;

  if (emojiRe.test(title)) {
    [emoji] = title.match(emojiRe);
    title = title.replace(emojiRe, '');
  }

  return /*#__PURE__*/React__default.createElement("li", {
    className: open ? 'active' : ''
  }, /*#__PURE__*/React__default.createElement("button", {
    onClick: () => {
      if (active) return;
      TreeState[item.route] = !open;
      render(x => !x);
    }
  }, emoji && /*#__PURE__*/React__default.createElement(Emoji, null, emoji), /*#__PURE__*/React__default.createElement("span", null, title)), /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: open ? undefined : 'none'
    }
  }, /*#__PURE__*/React__default.createElement(Menu, {
    dir: item.children,
    base: item.route,
    anchors: anchors
  })));
}

function File({
  item,
  anchors
}) {
  const {
    setMenu
  } = React.useContext(MenuContext);
  const route = router.useRouter().route + '/';
  const active = route.startsWith(item.route + '/');
  let title = item.title;
  let emoji;

  if (emojiRe.test(title)) {
    [emoji] = title.match(emojiRe);
    title = title.replace(emojiRe, '');
  }

  if (anchors && anchors.length) {
    if (active) {
      return /*#__PURE__*/React__default.createElement("li", {
        className: active ? 'active' : ''
      }, /*#__PURE__*/React__default.createElement(Link, {
        href: item.route
      }, /*#__PURE__*/React__default.createElement("a", null, emoji && /*#__PURE__*/React__default.createElement(Emoji, null, emoji), /*#__PURE__*/React__default.createElement("span", null, title))), /*#__PURE__*/React__default.createElement("ul", null, anchors.map(anchor => {
        const slug = slugify(ReactDOMServer.renderToStaticMarkup(anchor) || '');
        return /*#__PURE__*/React__default.createElement("a", {
          href: '#' + slug,
          key: `a-${slug}`,
          onClick: () => setMenu(false)
        }, /*#__PURE__*/React__default.createElement("span", {
          className: "flex"
        }, /*#__PURE__*/React__default.createElement("span", {
          className: "mr-2 opacity-25"
        }, "#"), /*#__PURE__*/React__default.createElement("span", {
          className: "inline-block"
        }, anchor)));
      })));
    }
  }

  return /*#__PURE__*/React__default.createElement("li", {
    className: active ? 'active' : ''
  }, /*#__PURE__*/React__default.createElement(Link, {
    href: item.route
  }, /*#__PURE__*/React__default.createElement("a", {
    onClick: () => setMenu(false)
  }, emoji && /*#__PURE__*/React__default.createElement(Emoji, null, emoji), /*#__PURE__*/React__default.createElement("span", null, title))));
}

function Menu({
  dir,
  anchors
}) {
  return /*#__PURE__*/React__default.createElement("ul", null, dir.map(item => {
    if (item.children) {
      return /*#__PURE__*/React__default.createElement(Folder, {
        key: item.name,
        item: item,
        anchors: anchors
      });
    }

    return /*#__PURE__*/React__default.createElement(File, {
      key: item.name,
      item: item,
      anchors: anchors
    });
  }));
}

function Sidebar({
  show,
  directories,
  anchors
}) {
  return /*#__PURE__*/React__default.createElement("aside", {
    className: `h-screen bg-white dark:bg-dark flex-shrink-0 w-full lg:w-84 md:w-64 md:border-r dark:border-gray-800 md:block fixed md:sticky z-10 transition-colors duration-200 ${show ? '' : 'hidden'}`,
    style: {
      top: '4rem',
      height: 'calc(100vh - 4rem)'
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sidebar w-full p-4 pb-40 md:pb-16 h-full overflow-y-auto"
  }, /*#__PURE__*/React__default.createElement(Menu, {
    dir: directories,
    anchors: anchors
  })));
}

const NextLink = ({
  config,
  flatDirectories,
  currentIndex
}) => {
  let next = flatDirectories[currentIndex + 1];

  if (!config.nextLinks || !next) {
    return null;
  }

  return /*#__PURE__*/React__default.createElement(Link, {
    href: next.route
  }, /*#__PURE__*/React__default.createElement("a", {
    className: "text-lg font-medium p-4 -m-4 no-underline text-gray-600 hover:text-blue-600 flex items-center ml-2"
  }, next.title, /*#__PURE__*/React__default.createElement(ArrowRight, {
    className: "inline ml-1 flex-shrink-0"
  })));
};

const PrevLink = ({
  config,
  flatDirectories,
  currentIndex
}) => {
  let prev = flatDirectories[currentIndex - 1];

  if (!config.prevLinks || !prev) {
    return null;
  }

  return /*#__PURE__*/React__default.createElement(Link, {
    href: prev.route
  }, /*#__PURE__*/React__default.createElement("a", {
    className: "text-lg font-medium p-4 -m-4 no-underline text-gray-600 hover:text-blue-600 flex items-center mr-2"
  }, /*#__PURE__*/React__default.createElement(ArrowRight, {
    className: "transform rotate-180 inline mr-1 flex-shrink-0"
  }), prev.title));
};

const Layout = ({
  filename,
  config: _config,
  pageMap,
  meta,
  children
}) => {
  const [menu, setMenu] = React.useState(false);
  const router$1 = router.useRouter();
  const {
    route,
    pathname
  } = router$1;
  const directories = React.useMemo(() => reorderBasedOnMeta(pageMap), [pageMap]);
  const flatDirectories = React.useMemo(() => flatten(directories), [directories]);
  const config = Object.assign({}, defaultConfig, _config);
  const filepath = route.slice(0, route.lastIndexOf('/') + 1);
  const filepathWithName = filepath + filename;
  const titles = React__default.Children.toArray(children).filter(child => titleType.includes(child.props.mdxType));
  const titleEl = titles.find(child => child.props.mdxType === 'h1');
  const title = meta.title || (titleEl ? titleEl.props.children : 'Untitled');
  const anchors = titles.filter(child => child.props.mdxType === 'h2').map(child => child.props.children);
  React.useEffect(() => {
    if (menu) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [menu]);
  const currentIndex = React.useMemo(() => flatDirectories.findIndex(dir => dir.route === pathname), [flatDirectories, pathname]);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Head, null, /*#__PURE__*/React__default.createElement("link", {
    rel: "stylesheet",
    href: "https://rsms.me/inter/inter.css"
  }), /*#__PURE__*/React__default.createElement("title", null, title, config.titleSuffix || ''), config.head || null), /*#__PURE__*/React__default.createElement("div", {
    className: "main-container flex flex-col"
  }, /*#__PURE__*/React__default.createElement("nav", {
    className: "flex items-center bg-white z-20 fixed top-0 left-0 right-0 h-16 border-b px-6 dark:bg-dark dark:border-gray-800 transition-colors duration-200"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hidden md:block w-full flex items-center"
  }, /*#__PURE__*/React__default.createElement(Link, {
    href: "/"
  }, /*#__PURE__*/React__default.createElement("a", {
    className: "no-underline text-current inline-flex items-center hover:opacity-75"
  }, config.logo))), config.customSearch || (config.search ? /*#__PURE__*/React__default.createElement(Search, {
    directories: flatDirectories
  }) : null), config.darkMode ? /*#__PURE__*/React__default.createElement(ThemeSwitch, null) : null, config.github ? /*#__PURE__*/React__default.createElement("a", {
    className: "text-current p-2 -mr-2",
    href: config.github,
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement(GitHubIcon, {
    height: 28
  })) : null, /*#__PURE__*/React__default.createElement("button", {
    className: "block md:hidden p-2 -mr-2 ml-2",
    onClick: () => setMenu(!menu)
  }, /*#__PURE__*/React__default.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React__default.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React__default.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React__default.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "21",
    y2: "18"
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "flex flex-1 h-full"
  }, /*#__PURE__*/React__default.createElement(MenuContext.Provider, {
    value: {
      setMenu
    }
  }, /*#__PURE__*/React__default.createElement(Sidebar, {
    show: menu,
    anchors: anchors,
    directories: directories
  })), /*#__PURE__*/React__default.createElement(skipNav.SkipNavContent, null), meta.full ? /*#__PURE__*/React__default.createElement("content", {
    className: "relative pt-16 w-full overflow-x-hidden"
  }, children) : /*#__PURE__*/React__default.createElement("content", {
    className: "relative pt-20 pb-16 px-6 md:px-8 w-full max-w-full overflow-x-hidden xl:pr-64"
  }, /*#__PURE__*/React__default.createElement("main", {
    className: "max-w-screen-md mx-auto"
  }, /*#__PURE__*/React__default.createElement(Theme, null, children), /*#__PURE__*/React__default.createElement("footer", {
    className: "mt-24"
  }, /*#__PURE__*/React__default.createElement("nav", {
    className: "flex flex-row items-center justify-between"
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(PrevLink, {
    config: config,
    flatDirectories: flatDirectories,
    currentIndex: currentIndex
  })), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(NextLink, {
    config: config,
    flatDirectories: flatDirectories,
    currentIndex: currentIndex
  }))), /*#__PURE__*/React__default.createElement("hr", null), config.footer ? /*#__PURE__*/React__default.createElement("div", {
    className: "mt-24 flex justify-between flex-col-reverse md:flex-row items-center md:items-end"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "text-gray-600"
  }, config.footerText), /*#__PURE__*/React__default.createElement("div", {
    className: "mt-6"
  }), config.footerEditOnGitHubLink ? /*#__PURE__*/React__default.createElement("a", {
    className: "text-sm",
    href: (config.siteGithub || config.github) + '/edit/master/pages' + filepathWithName,
    target: "_blank"
  }, "Edit this page on GitHub") : null) : null))))));
};

var index = ((opts, config) => props => /*#__PURE__*/React__default.createElement(nextThemes.ThemeProvider, {
  attribute: "class"
}, /*#__PURE__*/React__default.createElement(Layout, _extends({
  config: config
}, opts, props))));

module.exports = index;
