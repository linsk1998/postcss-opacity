module.exports = function(opts) {
  opts = opts || {};
  var legacy = opts.legacy || false;
  var preserve = opts.preserve;
  var moz = opts.moz;
  var khtml = opts.khtml;
  var ie8 = opts.ie8;

  return {
    postcssPlugin: 'postcss-opacity',
    Declaration: {
      opacity: decl => {
        var subOne = decl.value;
        var subHundred = Math.floor(subOne * 100);

        if (ie8 !== false) {
          if (!decl.parent.some(decl => decl.prop === '-ms-filter')) {
            decl.cloneBefore({ prop: "-ms-filter", value: '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + subHundred + ')"' });
          }
        }
        if (legacy) {
          if (!decl.parent.some(decl => decl.prop === 'filter')) {
            decl.cloneBefore({ prop: "filter", value: 'alpha(opacity=' + subHundred + ')' });
          }
        }
        if (moz || (legacy && moz !== false)) {
          if (!decl.parent.some(decl => decl.prop === '-moz-opacity')) {
            decl.cloneBefore({ prop: "-moz-opacity", value: subOne });
          }
        }
        if (khtml || (legacy && khtml !== false)) {
          if (!decl.parent.some(decl => decl.prop === '-khtml-opacity')) {
            decl.cloneBefore({ prop: "-khtml-opacity", value: subOne });
          }
        }
        if (preserve === false) {
          decl.remove();
        }
      }
    }
  };
};
module.exports.postcss = true;
