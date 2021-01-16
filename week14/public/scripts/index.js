(() => {
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };

  // node_modules/d3-array/dist/d3-array.js
  var require_d3_array = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.d3 = global.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      function ascending(a, b) {
        return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
      }
      function bisector(f) {
        let delta = f;
        let compare = f;
        if (f.length === 1) {
          delta = (d, x) => f(d) - x;
          compare = ascendingComparator(f);
        }
        function left(a, x, lo, hi) {
          if (lo == null)
            lo = 0;
          if (hi == null)
            hi = a.length;
          while (lo < hi) {
            const mid = lo + hi >>> 1;
            if (compare(a[mid], x) < 0)
              lo = mid + 1;
            else
              hi = mid;
          }
          return lo;
        }
        function right(a, x, lo, hi) {
          if (lo == null)
            lo = 0;
          if (hi == null)
            hi = a.length;
          while (lo < hi) {
            const mid = lo + hi >>> 1;
            if (compare(a[mid], x) > 0)
              hi = mid;
            else
              lo = mid + 1;
          }
          return lo;
        }
        function center(a, x, lo, hi) {
          if (lo == null)
            lo = 0;
          if (hi == null)
            hi = a.length;
          const i = left(a, x, lo, hi - 1);
          return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
        }
        return {left, center, right};
      }
      function ascendingComparator(f) {
        return (d, x) => ascending(f(d), x);
      }
      function number(x) {
        return x === null ? NaN : +x;
      }
      function* numbers(values, valueof) {
        if (valueof === void 0) {
          for (let value of values) {
            if (value != null && (value = +value) >= value) {
              yield value;
            }
          }
        } else {
          let index2 = -1;
          for (let value of values) {
            if ((value = valueof(value, ++index2, values)) != null && (value = +value) >= value) {
              yield value;
            }
          }
        }
      }
      const ascendingBisect = bisector(ascending);
      const bisectRight = ascendingBisect.right;
      const bisectLeft = ascendingBisect.left;
      const bisectCenter = bisector(number).center;
      function count(values, valueof) {
        let count2 = 0;
        if (valueof === void 0) {
          for (let value of values) {
            if (value != null && (value = +value) >= value) {
              ++count2;
            }
          }
        } else {
          let index2 = -1;
          for (let value of values) {
            if ((value = valueof(value, ++index2, values)) != null && (value = +value) >= value) {
              ++count2;
            }
          }
        }
        return count2;
      }
      function length(array2) {
        return array2.length | 0;
      }
      function empty(length2) {
        return !(length2 > 0);
      }
      function arrayify(values) {
        return typeof values !== "object" || "length" in values ? values : Array.from(values);
      }
      function reducer(reduce2) {
        return (values) => reduce2(...values);
      }
      function cross(...values) {
        const reduce2 = typeof values[values.length - 1] === "function" && reducer(values.pop());
        values = values.map(arrayify);
        const lengths = values.map(length);
        const j = values.length - 1;
        const index2 = new Array(j + 1).fill(0);
        const product = [];
        if (j < 0 || lengths.some(empty))
          return product;
        while (true) {
          product.push(index2.map((j2, i2) => values[i2][j2]));
          let i = j;
          while (++index2[i] === lengths[i]) {
            if (i === 0)
              return reduce2 ? product.map(reduce2) : product;
            index2[i--] = 0;
          }
        }
      }
      function cumsum(values, valueof) {
        var sum2 = 0, index2 = 0;
        return Float64Array.from(values, valueof === void 0 ? (v) => sum2 += +v || 0 : (v) => sum2 += +valueof(v, index2++, values) || 0);
      }
      function descending(a, b) {
        return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
      }
      function variance(values, valueof) {
        let count2 = 0;
        let delta;
        let mean2 = 0;
        let sum2 = 0;
        if (valueof === void 0) {
          for (let value of values) {
            if (value != null && (value = +value) >= value) {
              delta = value - mean2;
              mean2 += delta / ++count2;
              sum2 += delta * (value - mean2);
            }
          }
        } else {
          let index2 = -1;
          for (let value of values) {
            if ((value = valueof(value, ++index2, values)) != null && (value = +value) >= value) {
              delta = value - mean2;
              mean2 += delta / ++count2;
              sum2 += delta * (value - mean2);
            }
          }
        }
        if (count2 > 1)
          return sum2 / (count2 - 1);
      }
      function deviation(values, valueof) {
        const v = variance(values, valueof);
        return v ? Math.sqrt(v) : v;
      }
      function extent(values, valueof) {
        let min2;
        let max2;
        if (valueof === void 0) {
          for (const value of values) {
            if (value != null) {
              if (min2 === void 0) {
                if (value >= value)
                  min2 = max2 = value;
              } else {
                if (min2 > value)
                  min2 = value;
                if (max2 < value)
                  max2 = value;
              }
            }
          }
        } else {
          let index2 = -1;
          for (let value of values) {
            if ((value = valueof(value, ++index2, values)) != null) {
              if (min2 === void 0) {
                if (value >= value)
                  min2 = max2 = value;
              } else {
                if (min2 > value)
                  min2 = value;
                if (max2 < value)
                  max2 = value;
              }
            }
          }
        }
        return [min2, max2];
      }
      class Adder {
        constructor() {
          this._partials = new Float64Array(32);
          this._n = 0;
        }
        add(x) {
          const p = this._partials;
          let i = 0;
          for (let j = 0; j < this._n && j < 32; j++) {
            const y = p[j], hi = x + y, lo = Math.abs(x) < Math.abs(y) ? x - (hi - y) : y - (hi - x);
            if (lo)
              p[i++] = lo;
            x = hi;
          }
          p[i] = x;
          this._n = i + 1;
          return this;
        }
        valueOf() {
          const p = this._partials;
          let n = this._n, x, y, lo, hi = 0;
          if (n > 0) {
            hi = p[--n];
            while (n > 0) {
              x = hi;
              y = p[--n];
              hi = x + y;
              lo = y - (hi - x);
              if (lo)
                break;
            }
            if (n > 0 && (lo < 0 && p[n - 1] < 0 || lo > 0 && p[n - 1] > 0)) {
              y = lo * 2;
              x = hi + y;
              if (y == x - hi)
                hi = x;
            }
          }
          return hi;
        }
      }
      function fsum(values, valueof) {
        const adder = new Adder();
        if (valueof === void 0) {
          for (let value of values) {
            if (value = +value) {
              adder.add(value);
            }
          }
        } else {
          let index2 = -1;
          for (let value of values) {
            if (value = +valueof(value, ++index2, values)) {
              adder.add(value);
            }
          }
        }
        return +adder;
      }
      function identity(x) {
        return x;
      }
      function group(values, ...keys) {
        return nest(values, identity, identity, keys);
      }
      function groups(values, ...keys) {
        return nest(values, Array.from, identity, keys);
      }
      function rollup(values, reduce2, ...keys) {
        return nest(values, identity, reduce2, keys);
      }
      function rollups(values, reduce2, ...keys) {
        return nest(values, Array.from, reduce2, keys);
      }
      function index(values, ...keys) {
        return nest(values, identity, unique, keys);
      }
      function indexes(values, ...keys) {
        return nest(values, Array.from, unique, keys);
      }
      function unique(values) {
        if (values.length !== 1)
          throw new Error("duplicate key");
        return values[0];
      }
      function nest(values, map2, reduce2, keys) {
        return function regroup(values2, i) {
          if (i >= keys.length)
            return reduce2(values2);
          const groups2 = new Map();
          const keyof = keys[i++];
          let index2 = -1;
          for (const value of values2) {
            const key = keyof(value, ++index2, values2);
            const group2 = groups2.get(key);
            if (group2)
              group2.push(value);
            else
              groups2.set(key, [value]);
          }
          for (const [key, values3] of groups2) {
            groups2.set(key, regroup(values3, i));
          }
          return map2(groups2);
        }(values, 0);
      }
      var array = Array.prototype;
      var slice = array.slice;
      function constant(x) {
        return function() {
          return x;
        };
      }
      var e10 = Math.sqrt(50), e5 = Math.sqrt(10), e2 = Math.sqrt(2);
      function ticks(start, stop, count2) {
        var reverse2, i = -1, n, ticks2, step;
        stop = +stop, start = +start, count2 = +count2;
        if (start === stop && count2 > 0)
          return [start];
        if (reverse2 = stop < start)
          n = start, start = stop, stop = n;
        if ((step = tickIncrement(start, stop, count2)) === 0 || !isFinite(step))
          return [];
        if (step > 0) {
          start = Math.ceil(start / step);
          stop = Math.floor(stop / step);
          ticks2 = new Array(n = Math.ceil(stop - start + 1));
          while (++i < n)
            ticks2[i] = (start + i) * step;
        } else {
          step = -step;
          start = Math.ceil(start * step);
          stop = Math.floor(stop * step);
          ticks2 = new Array(n = Math.ceil(stop - start + 1));
          while (++i < n)
            ticks2[i] = (start + i) / step;
        }
        if (reverse2)
          ticks2.reverse();
        return ticks2;
      }
      function tickIncrement(start, stop, count2) {
        var step = (stop - start) / Math.max(0, count2), power = Math.floor(Math.log(step) / Math.LN10), error = step / Math.pow(10, power);
        return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
      }
      function tickStep(start, stop, count2) {
        var step0 = Math.abs(stop - start) / Math.max(0, count2), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
        if (error >= e10)
          step1 *= 10;
        else if (error >= e5)
          step1 *= 5;
        else if (error >= e2)
          step1 *= 2;
        return stop < start ? -step1 : step1;
      }
      function nice(start, stop, count2) {
        let prestep;
        while (true) {
          const step = tickIncrement(start, stop, count2);
          if (step === prestep || step === 0 || !isFinite(step)) {
            return [start, stop];
          } else if (step > 0) {
            start = Math.floor(start / step) * step;
            stop = Math.ceil(stop / step) * step;
          } else if (step < 0) {
            start = Math.ceil(start * step) / step;
            stop = Math.floor(stop * step) / step;
          }
          prestep = step;
        }
      }
      function sturges(values) {
        return Math.ceil(Math.log(count(values)) / Math.LN2) + 1;
      }
      function bin() {
        var value = identity, domain = extent, threshold = sturges;
        function histogram(data) {
          if (!Array.isArray(data))
            data = Array.from(data);
          var i, n = data.length, x, values = new Array(n);
          for (i = 0; i < n; ++i) {
            values[i] = value(data[i], i, data);
          }
          var xz = domain(values), x0 = xz[0], x1 = xz[1], tz = threshold(values, x0, x1);
          if (!Array.isArray(tz)) {
            const max2 = x1, tn = +tz;
            if (domain === extent)
              [x0, x1] = nice(x0, x1, tn);
            tz = ticks(x0, x1, tn);
            if (tz[tz.length - 1] >= x1) {
              if (max2 >= x1 && domain === extent) {
                const step = tickIncrement(x0, x1, tn);
                if (isFinite(step)) {
                  if (step > 0) {
                    x1 = (Math.floor(x1 / step) + 1) * step;
                  } else if (step < 0) {
                    x1 = (Math.ceil(x1 * -step) + 1) / -step;
                  }
                }
              } else {
                tz.pop();
              }
            }
          }
          var m = tz.length;
          while (tz[0] <= x0)
            tz.shift(), --m;
          while (tz[m - 1] > x1)
            tz.pop(), --m;
          var bins = new Array(m + 1), bin2;
          for (i = 0; i <= m; ++i) {
            bin2 = bins[i] = [];
            bin2.x0 = i > 0 ? tz[i - 1] : x0;
            bin2.x1 = i < m ? tz[i] : x1;
          }
          for (i = 0; i < n; ++i) {
            x = values[i];
            if (x0 <= x && x <= x1) {
              bins[bisectRight(tz, x, 0, m)].push(data[i]);
            }
          }
          return bins;
        }
        histogram.value = function(_) {
          return arguments.length ? (value = typeof _ === "function" ? _ : constant(_), histogram) : value;
        };
        histogram.domain = function(_) {
          return arguments.length ? (domain = typeof _ === "function" ? _ : constant([_[0], _[1]]), histogram) : domain;
        };
        histogram.thresholds = function(_) {
          return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), histogram) : threshold;
        };
        return histogram;
      }
      function max(values, valueof) {
        let max2;
        if (valueof === void 0) {
          for (const value of values) {
            if (value != null && (max2 < value || max2 === void 0 && value >= value)) {
              max2 = value;
            }
          }
        } else {
          let index2 = -1;
          for (let value of values) {
            if ((value = valueof(value, ++index2, values)) != null && (max2 < value || max2 === void 0 && value >= value)) {
              max2 = value;
            }
          }
        }
        return max2;
      }
      function min(values, valueof) {
        let min2;
        if (valueof === void 0) {
          for (const value of values) {
            if (value != null && (min2 > value || min2 === void 0 && value >= value)) {
              min2 = value;
            }
          }
        } else {
          let index2 = -1;
          for (let value of values) {
            if ((value = valueof(value, ++index2, values)) != null && (min2 > value || min2 === void 0 && value >= value)) {
              min2 = value;
            }
          }
        }
        return min2;
      }
      function quickselect(array2, k, left = 0, right = array2.length - 1, compare = ascending) {
        while (right > left) {
          if (right - left > 600) {
            const n = right - left + 1;
            const m = k - left + 1;
            const z = Math.log(n);
            const s = 0.5 * Math.exp(2 * z / 3);
            const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
            const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            quickselect(array2, k, newLeft, newRight, compare);
          }
          const t = array2[k];
          let i = left;
          let j = right;
          swap(array2, left, k);
          if (compare(array2[right], t) > 0)
            swap(array2, left, right);
          while (i < j) {
            swap(array2, i, j), ++i, --j;
            while (compare(array2[i], t) < 0)
              ++i;
            while (compare(array2[j], t) > 0)
              --j;
          }
          if (compare(array2[left], t) === 0)
            swap(array2, left, j);
          else
            ++j, swap(array2, j, right);
          if (j <= k)
            left = j + 1;
          if (k <= j)
            right = j - 1;
        }
        return array2;
      }
      function swap(array2, i, j) {
        const t = array2[i];
        array2[i] = array2[j];
        array2[j] = t;
      }
      function quantile(values, p, valueof) {
        values = Float64Array.from(numbers(values, valueof));
        if (!(n = values.length))
          return;
        if ((p = +p) <= 0 || n < 2)
          return min(values);
        if (p >= 1)
          return max(values);
        var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = max(quickselect(values, i0).subarray(0, i0 + 1)), value1 = min(values.subarray(i0 + 1));
        return value0 + (value1 - value0) * (i - i0);
      }
      function quantileSorted(values, p, valueof = number) {
        if (!(n = values.length))
          return;
        if ((p = +p) <= 0 || n < 2)
          return +valueof(values[0], 0, values);
        if (p >= 1)
          return +valueof(values[n - 1], n - 1, values);
        var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = +valueof(values[i0], i0, values), value1 = +valueof(values[i0 + 1], i0 + 1, values);
        return value0 + (value1 - value0) * (i - i0);
      }
      function freedmanDiaconis(values, min2, max2) {
        return Math.ceil((max2 - min2) / (2 * (quantile(values, 0.75) - quantile(values, 0.25)) * Math.pow(count(values), -1 / 3)));
      }
      function scott(values, min2, max2) {
        return Math.ceil((max2 - min2) / (3.5 * deviation(values) * Math.pow(count(values), -1 / 3)));
      }
      function maxIndex(values, valueof) {
        let max2;
        let maxIndex2 = -1;
        let index2 = -1;
        if (valueof === void 0) {
          for (const value of values) {
            ++index2;
            if (value != null && (max2 < value || max2 === void 0 && value >= value)) {
              max2 = value, maxIndex2 = index2;
            }
          }
        } else {
          for (let value of values) {
            if ((value = valueof(value, ++index2, values)) != null && (max2 < value || max2 === void 0 && value >= value)) {
              max2 = value, maxIndex2 = index2;
            }
          }
        }
        return maxIndex2;
      }
      function mean(values, valueof) {
        let count2 = 0;
        let sum2 = 0;
        if (valueof === void 0) {
          for (let value of values) {
            if (value != null && (value = +value) >= value) {
              ++count2, sum2 += value;
            }
          }
        } else {
          let index2 = -1;
          for (let value of values) {
            if ((value = valueof(value, ++index2, values)) != null && (value = +value) >= value) {
              ++count2, sum2 += value;
            }
          }
        }
        if (count2)
          return sum2 / count2;
      }
      function median(values, valueof) {
        return quantile(values, 0.5, valueof);
      }
      function* flatten(arrays) {
        for (const array2 of arrays) {
          yield* array2;
        }
      }
      function merge(arrays) {
        return Array.from(flatten(arrays));
      }
      function minIndex(values, valueof) {
        let min2;
        let minIndex2 = -1;
        let index2 = -1;
        if (valueof === void 0) {
          for (const value of values) {
            ++index2;
            if (value != null && (min2 > value || min2 === void 0 && value >= value)) {
              min2 = value, minIndex2 = index2;
            }
          }
        } else {
          for (let value of values) {
            if ((value = valueof(value, ++index2, values)) != null && (min2 > value || min2 === void 0 && value >= value)) {
              min2 = value, minIndex2 = index2;
            }
          }
        }
        return minIndex2;
      }
      function pairs(values, pairof = pair) {
        const pairs2 = [];
        let previous;
        let first = false;
        for (const value of values) {
          if (first)
            pairs2.push(pairof(previous, value));
          previous = value;
          first = true;
        }
        return pairs2;
      }
      function pair(a, b) {
        return [a, b];
      }
      function permute(source, keys) {
        return Array.from(keys, (key) => source[key]);
      }
      function range(start, stop, step) {
        start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
        var i = -1, n = Math.max(0, Math.ceil((stop - start) / step)) | 0, range2 = new Array(n);
        while (++i < n) {
          range2[i] = start + i * step;
        }
        return range2;
      }
      function least(values, compare = ascending) {
        let min2;
        let defined = false;
        if (compare.length === 1) {
          let minValue;
          for (const element of values) {
            const value = compare(element);
            if (defined ? ascending(value, minValue) < 0 : ascending(value, value) === 0) {
              min2 = element;
              minValue = value;
              defined = true;
            }
          }
        } else {
          for (const value of values) {
            if (defined ? compare(value, min2) < 0 : compare(value, value) === 0) {
              min2 = value;
              defined = true;
            }
          }
        }
        return min2;
      }
      function leastIndex(values, compare = ascending) {
        if (compare.length === 1)
          return minIndex(values, compare);
        let minValue;
        let min2 = -1;
        let index2 = -1;
        for (const value of values) {
          ++index2;
          if (min2 < 0 ? compare(value, value) === 0 : compare(value, minValue) < 0) {
            minValue = value;
            min2 = index2;
          }
        }
        return min2;
      }
      function greatest(values, compare = ascending) {
        let max2;
        let defined = false;
        if (compare.length === 1) {
          let maxValue;
          for (const element of values) {
            const value = compare(element);
            if (defined ? ascending(value, maxValue) > 0 : ascending(value, value) === 0) {
              max2 = element;
              maxValue = value;
              defined = true;
            }
          }
        } else {
          for (const value of values) {
            if (defined ? compare(value, max2) > 0 : compare(value, value) === 0) {
              max2 = value;
              defined = true;
            }
          }
        }
        return max2;
      }
      function greatestIndex(values, compare = ascending) {
        if (compare.length === 1)
          return maxIndex(values, compare);
        let maxValue;
        let max2 = -1;
        let index2 = -1;
        for (const value of values) {
          ++index2;
          if (max2 < 0 ? compare(value, value) === 0 : compare(value, maxValue) > 0) {
            maxValue = value;
            max2 = index2;
          }
        }
        return max2;
      }
      function scan(values, compare) {
        const index2 = leastIndex(values, compare);
        return index2 < 0 ? void 0 : index2;
      }
      var shuffle = shuffler(Math.random);
      function shuffler(random) {
        return function shuffle2(array2, i0 = 0, i1 = array2.length) {
          let m = i1 - (i0 = +i0);
          while (m) {
            const i = random() * m-- | 0, t = array2[m + i0];
            array2[m + i0] = array2[i + i0];
            array2[i + i0] = t;
          }
          return array2;
        };
      }
      function sum(values, valueof) {
        let sum2 = 0;
        if (valueof === void 0) {
          for (let value of values) {
            if (value = +value) {
              sum2 += value;
            }
          }
        } else {
          let index2 = -1;
          for (let value of values) {
            if (value = +valueof(value, ++index2, values)) {
              sum2 += value;
            }
          }
        }
        return sum2;
      }
      function transpose(matrix) {
        if (!(n = matrix.length))
          return [];
        for (var i = -1, m = min(matrix, length$1), transpose2 = new Array(m); ++i < m; ) {
          for (var j = -1, n, row = transpose2[i] = new Array(n); ++j < n; ) {
            row[j] = matrix[j][i];
          }
        }
        return transpose2;
      }
      function length$1(d) {
        return d.length;
      }
      function zip() {
        return transpose(arguments);
      }
      function every(values, test) {
        if (typeof test !== "function")
          throw new TypeError("test is not a function");
        let index2 = -1;
        for (const value of values) {
          if (!test(value, ++index2, values)) {
            return false;
          }
        }
        return true;
      }
      function some(values, test) {
        if (typeof test !== "function")
          throw new TypeError("test is not a function");
        let index2 = -1;
        for (const value of values) {
          if (test(value, ++index2, values)) {
            return true;
          }
        }
        return false;
      }
      function filter(values, test) {
        if (typeof test !== "function")
          throw new TypeError("test is not a function");
        const array2 = [];
        let index2 = -1;
        for (const value of values) {
          if (test(value, ++index2, values)) {
            array2.push(value);
          }
        }
        return array2;
      }
      function map(values, mapper) {
        if (typeof values[Symbol.iterator] !== "function")
          throw new TypeError("values is not iterable");
        if (typeof mapper !== "function")
          throw new TypeError("mapper is not a function");
        return Array.from(values, (value, index2) => mapper(value, index2, values));
      }
      function reduce(values, reducer2, value) {
        if (typeof reducer2 !== "function")
          throw new TypeError("reducer is not a function");
        const iterator = values[Symbol.iterator]();
        let done, next, index2 = -1;
        if (arguments.length < 3) {
          ({done, value} = iterator.next());
          if (done)
            return;
          ++index2;
        }
        while ({done, value: next} = iterator.next(), !done) {
          value = reducer2(value, next, ++index2, values);
        }
        return value;
      }
      function reverse(values) {
        if (typeof values[Symbol.iterator] !== "function")
          throw new TypeError("values is not iterable");
        return Array.from(values).reverse();
      }
      function sort(values, f = ascending) {
        if (typeof values[Symbol.iterator] !== "function")
          throw new TypeError("values is not iterable");
        values = Array.from(values);
        if (f.length === 1) {
          f = values.map(f);
          return permute(values, values.map((d, i) => i).sort((i, j) => ascending(f[i], f[j])));
        }
        return values.sort(f);
      }
      function difference(values, ...others) {
        values = new Set(values);
        for (const other of others) {
          for (const value of other) {
            values.delete(value);
          }
        }
        return values;
      }
      function disjoint(values, other) {
        const iterator = other[Symbol.iterator](), set2 = new Set();
        for (const v of values) {
          if (set2.has(v))
            return false;
          let value, done;
          while ({value, done} = iterator.next()) {
            if (done)
              break;
            if (Object.is(v, value))
              return false;
            set2.add(value);
          }
        }
        return true;
      }
      function set(values) {
        return values instanceof Set ? values : new Set(values);
      }
      function intersection(values, ...others) {
        values = new Set(values);
        others = others.map(set);
        out:
          for (const value of values) {
            for (const other of others) {
              if (!other.has(value)) {
                values.delete(value);
                continue out;
              }
            }
          }
        return values;
      }
      function superset(values, other) {
        const iterator = values[Symbol.iterator](), set2 = new Set();
        for (const o of other) {
          if (set2.has(o))
            continue;
          let value, done;
          while ({value, done} = iterator.next()) {
            if (done)
              return false;
            set2.add(value);
            if (Object.is(o, value))
              break;
          }
        }
        return true;
      }
      function subset(values, other) {
        return superset(other, values);
      }
      function union(...others) {
        const set2 = new Set();
        for (const other of others) {
          for (const o of other) {
            set2.add(o);
          }
        }
        return set2;
      }
      exports2.Adder = Adder;
      exports2.ascending = ascending;
      exports2.bin = bin;
      exports2.bisect = bisectRight;
      exports2.bisectCenter = bisectCenter;
      exports2.bisectLeft = bisectLeft;
      exports2.bisectRight = bisectRight;
      exports2.bisector = bisector;
      exports2.count = count;
      exports2.cross = cross;
      exports2.cumsum = cumsum;
      exports2.descending = descending;
      exports2.deviation = deviation;
      exports2.difference = difference;
      exports2.disjoint = disjoint;
      exports2.every = every;
      exports2.extent = extent;
      exports2.filter = filter;
      exports2.fsum = fsum;
      exports2.greatest = greatest;
      exports2.greatestIndex = greatestIndex;
      exports2.group = group;
      exports2.groups = groups;
      exports2.histogram = bin;
      exports2.index = index;
      exports2.indexes = indexes;
      exports2.intersection = intersection;
      exports2.least = least;
      exports2.leastIndex = leastIndex;
      exports2.map = map;
      exports2.max = max;
      exports2.maxIndex = maxIndex;
      exports2.mean = mean;
      exports2.median = median;
      exports2.merge = merge;
      exports2.min = min;
      exports2.minIndex = minIndex;
      exports2.nice = nice;
      exports2.pairs = pairs;
      exports2.permute = permute;
      exports2.quantile = quantile;
      exports2.quantileSorted = quantileSorted;
      exports2.quickselect = quickselect;
      exports2.range = range;
      exports2.reduce = reduce;
      exports2.reverse = reverse;
      exports2.rollup = rollup;
      exports2.rollups = rollups;
      exports2.scan = scan;
      exports2.shuffle = shuffle;
      exports2.shuffler = shuffler;
      exports2.some = some;
      exports2.sort = sort;
      exports2.subset = subset;
      exports2.sum = sum;
      exports2.superset = superset;
      exports2.thresholdFreedmanDiaconis = freedmanDiaconis;
      exports2.thresholdScott = scott;
      exports2.thresholdSturges = sturges;
      exports2.tickIncrement = tickIncrement;
      exports2.tickStep = tickStep;
      exports2.ticks = ticks;
      exports2.transpose = transpose;
      exports2.union = union;
      exports2.variance = variance;
      exports2.zip = zip;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-axis/dist/d3-axis.js
  var require_d3_axis = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      var slice = Array.prototype.slice;
      function identity(x) {
        return x;
      }
      var top = 1, right = 2, bottom = 3, left = 4, epsilon = 1e-6;
      function translateX(x) {
        return "translate(" + (x + 0.5) + ",0)";
      }
      function translateY(y) {
        return "translate(0," + (y + 0.5) + ")";
      }
      function number(scale) {
        return (d) => +scale(d);
      }
      function center(scale) {
        var offset = Math.max(0, scale.bandwidth() - 1) / 2;
        if (scale.round())
          offset = Math.round(offset);
        return function(d) {
          return +scale(d) + offset;
        };
      }
      function entering() {
        return !this.__axis;
      }
      function axis(orient, scale) {
        var tickArguments = [], tickValues = null, tickFormat = null, tickSizeInner = 6, tickSizeOuter = 6, tickPadding = 3, k = orient === top || orient === left ? -1 : 1, x = orient === left || orient === right ? "x" : "y", transform = orient === top || orient === bottom ? translateX : translateY;
        function axis2(context) {
          var values = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues, format = tickFormat == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity : tickFormat, spacing = Math.max(tickSizeInner, 0) + tickPadding, range = scale.range(), range0 = +range[0] + 0.5, range1 = +range[range.length - 1] + 0.5, position = (scale.bandwidth ? center : number)(scale.copy()), selection = context.selection ? context.selection() : context, path = selection.selectAll(".domain").data([null]), tick = selection.selectAll(".tick").data(values, scale).order(), tickExit = tick.exit(), tickEnter = tick.enter().append("g").attr("class", "tick"), line = tick.select("line"), text = tick.select("text");
          path = path.merge(path.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor"));
          tick = tick.merge(tickEnter);
          line = line.merge(tickEnter.append("line").attr("stroke", "currentColor").attr(x + "2", k * tickSizeInner));
          text = text.merge(tickEnter.append("text").attr("fill", "currentColor").attr(x, k * spacing).attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));
          if (context !== selection) {
            path = path.transition(context);
            tick = tick.transition(context);
            line = line.transition(context);
            text = text.transition(context);
            tickExit = tickExit.transition(context).attr("opacity", epsilon).attr("transform", function(d) {
              return isFinite(d = position(d)) ? transform(d) : this.getAttribute("transform");
            });
            tickEnter.attr("opacity", epsilon).attr("transform", function(d) {
              var p = this.parentNode.__axis;
              return transform(p && isFinite(p = p(d)) ? p : position(d));
            });
          }
          tickExit.remove();
          path.attr("d", orient === left || orient == right ? tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H0.5V" + range1 + "H" + k * tickSizeOuter : "M0.5," + range0 + "V" + range1 : tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V0.5H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + ",0.5H" + range1);
          tick.attr("opacity", 1).attr("transform", function(d) {
            return transform(position(d));
          });
          line.attr(x + "2", k * tickSizeInner);
          text.attr(x, k * spacing).text(format);
          selection.filter(entering).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");
          selection.each(function() {
            this.__axis = position;
          });
        }
        axis2.scale = function(_) {
          return arguments.length ? (scale = _, axis2) : scale;
        };
        axis2.ticks = function() {
          return tickArguments = slice.call(arguments), axis2;
        };
        axis2.tickArguments = function(_) {
          return arguments.length ? (tickArguments = _ == null ? [] : slice.call(_), axis2) : tickArguments.slice();
        };
        axis2.tickValues = function(_) {
          return arguments.length ? (tickValues = _ == null ? null : slice.call(_), axis2) : tickValues && tickValues.slice();
        };
        axis2.tickFormat = function(_) {
          return arguments.length ? (tickFormat = _, axis2) : tickFormat;
        };
        axis2.tickSize = function(_) {
          return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis2) : tickSizeInner;
        };
        axis2.tickSizeInner = function(_) {
          return arguments.length ? (tickSizeInner = +_, axis2) : tickSizeInner;
        };
        axis2.tickSizeOuter = function(_) {
          return arguments.length ? (tickSizeOuter = +_, axis2) : tickSizeOuter;
        };
        axis2.tickPadding = function(_) {
          return arguments.length ? (tickPadding = +_, axis2) : tickPadding;
        };
        return axis2;
      }
      function axisTop(scale) {
        return axis(top, scale);
      }
      function axisRight(scale) {
        return axis(right, scale);
      }
      function axisBottom(scale) {
        return axis(bottom, scale);
      }
      function axisLeft(scale) {
        return axis(left, scale);
      }
      exports2.axisBottom = axisBottom;
      exports2.axisLeft = axisLeft;
      exports2.axisRight = axisRight;
      exports2.axisTop = axisTop;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-dispatch/dist/d3-dispatch.js
  var require_d3_dispatch = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      var noop = {value: () => {
      }};
      function dispatch() {
        for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
          if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t))
            throw new Error("illegal type: " + t);
          _[t] = [];
        }
        return new Dispatch(_);
      }
      function Dispatch(_) {
        this._ = _;
      }
      function parseTypenames(typenames, types) {
        return typenames.trim().split(/^|\s+/).map(function(t) {
          var name = "", i = t.indexOf(".");
          if (i >= 0)
            name = t.slice(i + 1), t = t.slice(0, i);
          if (t && !types.hasOwnProperty(t))
            throw new Error("unknown type: " + t);
          return {type: t, name};
        });
      }
      Dispatch.prototype = dispatch.prototype = {
        constructor: Dispatch,
        on: function(typename, callback) {
          var _ = this._, T = parseTypenames(typename + "", _), t, i = -1, n = T.length;
          if (arguments.length < 2) {
            while (++i < n)
              if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name)))
                return t;
            return;
          }
          if (callback != null && typeof callback !== "function")
            throw new Error("invalid callback: " + callback);
          while (++i < n) {
            if (t = (typename = T[i]).type)
              _[t] = set(_[t], typename.name, callback);
            else if (callback == null)
              for (t in _)
                _[t] = set(_[t], typename.name, null);
          }
          return this;
        },
        copy: function() {
          var copy = {}, _ = this._;
          for (var t in _)
            copy[t] = _[t].slice();
          return new Dispatch(copy);
        },
        call: function(type, that) {
          if ((n = arguments.length - 2) > 0)
            for (var args = new Array(n), i = 0, n, t; i < n; ++i)
              args[i] = arguments[i + 2];
          if (!this._.hasOwnProperty(type))
            throw new Error("unknown type: " + type);
          for (t = this._[type], i = 0, n = t.length; i < n; ++i)
            t[i].value.apply(that, args);
        },
        apply: function(type, that, args) {
          if (!this._.hasOwnProperty(type))
            throw new Error("unknown type: " + type);
          for (var t = this._[type], i = 0, n = t.length; i < n; ++i)
            t[i].value.apply(that, args);
        }
      };
      function get(type, name) {
        for (var i = 0, n = type.length, c; i < n; ++i) {
          if ((c = type[i]).name === name) {
            return c.value;
          }
        }
      }
      function set(type, name, callback) {
        for (var i = 0, n = type.length; i < n; ++i) {
          if (type[i].name === name) {
            type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
            break;
          }
        }
        if (callback != null)
          type.push({name, value: callback});
        return type;
      }
      exports2.dispatch = dispatch;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-selection/dist/d3-selection.js
  var require_d3_selection = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      var xhtml = "http://www.w3.org/1999/xhtml";
      var namespaces = {
        svg: "http://www.w3.org/2000/svg",
        xhtml,
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
      };
      function namespace(name) {
        var prefix = name += "", i = prefix.indexOf(":");
        if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns")
          name = name.slice(i + 1);
        return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
      }
      function creatorInherit(name) {
        return function() {
          var document2 = this.ownerDocument, uri = this.namespaceURI;
          return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
        };
      }
      function creatorFixed(fullname) {
        return function() {
          return this.ownerDocument.createElementNS(fullname.space, fullname.local);
        };
      }
      function creator(name) {
        var fullname = namespace(name);
        return (fullname.local ? creatorFixed : creatorInherit)(fullname);
      }
      function none() {
      }
      function selector(selector2) {
        return selector2 == null ? none : function() {
          return this.querySelector(selector2);
        };
      }
      function selection_select(select2) {
        if (typeof select2 !== "function")
          select2 = selector(select2);
        for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
          for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
            if ((node = group[i]) && (subnode = select2.call(node, node.__data__, i, group))) {
              if ("__data__" in node)
                subnode.__data__ = node.__data__;
              subgroup[i] = subnode;
            }
          }
        }
        return new Selection(subgroups, this._parents);
      }
      function array(x) {
        return typeof x === "object" && "length" in x ? x : Array.from(x);
      }
      function empty() {
        return [];
      }
      function selectorAll(selector2) {
        return selector2 == null ? empty : function() {
          return this.querySelectorAll(selector2);
        };
      }
      function arrayAll(select2) {
        return function() {
          var group = select2.apply(this, arguments);
          return group == null ? [] : array(group);
        };
      }
      function selection_selectAll(select2) {
        if (typeof select2 === "function")
          select2 = arrayAll(select2);
        else
          select2 = selectorAll(select2);
        for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
          for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
            if (node = group[i]) {
              subgroups.push(select2.call(node, node.__data__, i, group));
              parents.push(node);
            }
          }
        }
        return new Selection(subgroups, parents);
      }
      function matcher(selector2) {
        return function() {
          return this.matches(selector2);
        };
      }
      function childMatcher(selector2) {
        return function(node) {
          return node.matches(selector2);
        };
      }
      var find = Array.prototype.find;
      function childFind(match) {
        return function() {
          return find.call(this.children, match);
        };
      }
      function childFirst() {
        return this.firstElementChild;
      }
      function selection_selectChild(match) {
        return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
      }
      var filter = Array.prototype.filter;
      function children() {
        return this.children;
      }
      function childrenFilter(match) {
        return function() {
          return filter.call(this.children, match);
        };
      }
      function selection_selectChildren(match) {
        return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
      }
      function selection_filter(match) {
        if (typeof match !== "function")
          match = matcher(match);
        for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
          for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
            if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
              subgroup.push(node);
            }
          }
        }
        return new Selection(subgroups, this._parents);
      }
      function sparse(update) {
        return new Array(update.length);
      }
      function selection_enter() {
        return new Selection(this._enter || this._groups.map(sparse), this._parents);
      }
      function EnterNode(parent, datum2) {
        this.ownerDocument = parent.ownerDocument;
        this.namespaceURI = parent.namespaceURI;
        this._next = null;
        this._parent = parent;
        this.__data__ = datum2;
      }
      EnterNode.prototype = {
        constructor: EnterNode,
        appendChild: function(child) {
          return this._parent.insertBefore(child, this._next);
        },
        insertBefore: function(child, next) {
          return this._parent.insertBefore(child, next);
        },
        querySelector: function(selector2) {
          return this._parent.querySelector(selector2);
        },
        querySelectorAll: function(selector2) {
          return this._parent.querySelectorAll(selector2);
        }
      };
      function constant(x) {
        return function() {
          return x;
        };
      }
      function bindIndex(parent, group, enter, update, exit, data) {
        var i = 0, node, groupLength = group.length, dataLength = data.length;
        for (; i < dataLength; ++i) {
          if (node = group[i]) {
            node.__data__ = data[i];
            update[i] = node;
          } else {
            enter[i] = new EnterNode(parent, data[i]);
          }
        }
        for (; i < groupLength; ++i) {
          if (node = group[i]) {
            exit[i] = node;
          }
        }
      }
      function bindKey(parent, group, enter, update, exit, data, key) {
        var i, node, nodeByKeyValue = new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
        for (i = 0; i < groupLength; ++i) {
          if (node = group[i]) {
            keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
            if (nodeByKeyValue.has(keyValue)) {
              exit[i] = node;
            } else {
              nodeByKeyValue.set(keyValue, node);
            }
          }
        }
        for (i = 0; i < dataLength; ++i) {
          keyValue = key.call(parent, data[i], i, data) + "";
          if (node = nodeByKeyValue.get(keyValue)) {
            update[i] = node;
            node.__data__ = data[i];
            nodeByKeyValue.delete(keyValue);
          } else {
            enter[i] = new EnterNode(parent, data[i]);
          }
        }
        for (i = 0; i < groupLength; ++i) {
          if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
            exit[i] = node;
          }
        }
      }
      function datum(node) {
        return node.__data__;
      }
      function selection_data(value, key) {
        if (!arguments.length)
          return Array.from(this, datum);
        var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
        if (typeof value !== "function")
          value = constant(value);
        for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
          var parent = parents[j], group = groups[j], groupLength = group.length, data = array(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
          bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
          for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
            if (previous = enterGroup[i0]) {
              if (i0 >= i1)
                i1 = i0 + 1;
              while (!(next = updateGroup[i1]) && ++i1 < dataLength)
                ;
              previous._next = next || null;
            }
          }
        }
        update = new Selection(update, parents);
        update._enter = enter;
        update._exit = exit;
        return update;
      }
      function selection_exit() {
        return new Selection(this._exit || this._groups.map(sparse), this._parents);
      }
      function selection_join(onenter, onupdate, onexit) {
        var enter = this.enter(), update = this, exit = this.exit();
        enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
        if (onupdate != null)
          update = onupdate(update);
        if (onexit == null)
          exit.remove();
        else
          onexit(exit);
        return enter && update ? enter.merge(update).order() : update;
      }
      function selection_merge(selection2) {
        if (!(selection2 instanceof Selection))
          throw new Error("invalid merge");
        for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
          for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
            if (node = group0[i] || group1[i]) {
              merge[i] = node;
            }
          }
        }
        for (; j < m0; ++j) {
          merges[j] = groups0[j];
        }
        return new Selection(merges, this._parents);
      }
      function selection_order() {
        for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
          for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
            if (node = group[i]) {
              if (next && node.compareDocumentPosition(next) ^ 4)
                next.parentNode.insertBefore(node, next);
              next = node;
            }
          }
        }
        return this;
      }
      function selection_sort(compare) {
        if (!compare)
          compare = ascending;
        function compareNode(a, b) {
          return a && b ? compare(a.__data__, b.__data__) : !a - !b;
        }
        for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
          for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
            if (node = group[i]) {
              sortgroup[i] = node;
            }
          }
          sortgroup.sort(compareNode);
        }
        return new Selection(sortgroups, this._parents).order();
      }
      function ascending(a, b) {
        return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
      }
      function selection_call() {
        var callback = arguments[0];
        arguments[0] = this;
        callback.apply(null, arguments);
        return this;
      }
      function selection_nodes() {
        return Array.from(this);
      }
      function selection_node() {
        for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
          for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
            var node = group[i];
            if (node)
              return node;
          }
        }
        return null;
      }
      function selection_size() {
        let size = 0;
        for (const node of this)
          ++size;
        return size;
      }
      function selection_empty() {
        return !this.node();
      }
      function selection_each(callback) {
        for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
          for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
            if (node = group[i])
              callback.call(node, node.__data__, i, group);
          }
        }
        return this;
      }
      function attrRemove(name) {
        return function() {
          this.removeAttribute(name);
        };
      }
      function attrRemoveNS(fullname) {
        return function() {
          this.removeAttributeNS(fullname.space, fullname.local);
        };
      }
      function attrConstant(name, value) {
        return function() {
          this.setAttribute(name, value);
        };
      }
      function attrConstantNS(fullname, value) {
        return function() {
          this.setAttributeNS(fullname.space, fullname.local, value);
        };
      }
      function attrFunction(name, value) {
        return function() {
          var v = value.apply(this, arguments);
          if (v == null)
            this.removeAttribute(name);
          else
            this.setAttribute(name, v);
        };
      }
      function attrFunctionNS(fullname, value) {
        return function() {
          var v = value.apply(this, arguments);
          if (v == null)
            this.removeAttributeNS(fullname.space, fullname.local);
          else
            this.setAttributeNS(fullname.space, fullname.local, v);
        };
      }
      function selection_attr(name, value) {
        var fullname = namespace(name);
        if (arguments.length < 2) {
          var node = this.node();
          return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
        }
        return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
      }
      function defaultView(node) {
        return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
      }
      function styleRemove(name) {
        return function() {
          this.style.removeProperty(name);
        };
      }
      function styleConstant(name, value, priority) {
        return function() {
          this.style.setProperty(name, value, priority);
        };
      }
      function styleFunction(name, value, priority) {
        return function() {
          var v = value.apply(this, arguments);
          if (v == null)
            this.style.removeProperty(name);
          else
            this.style.setProperty(name, v, priority);
        };
      }
      function selection_style(name, value, priority) {
        return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
      }
      function styleValue(node, name) {
        return node.style.getPropertyValue(name) || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
      }
      function propertyRemove(name) {
        return function() {
          delete this[name];
        };
      }
      function propertyConstant(name, value) {
        return function() {
          this[name] = value;
        };
      }
      function propertyFunction(name, value) {
        return function() {
          var v = value.apply(this, arguments);
          if (v == null)
            delete this[name];
          else
            this[name] = v;
        };
      }
      function selection_property(name, value) {
        return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
      }
      function classArray(string) {
        return string.trim().split(/^|\s+/);
      }
      function classList(node) {
        return node.classList || new ClassList(node);
      }
      function ClassList(node) {
        this._node = node;
        this._names = classArray(node.getAttribute("class") || "");
      }
      ClassList.prototype = {
        add: function(name) {
          var i = this._names.indexOf(name);
          if (i < 0) {
            this._names.push(name);
            this._node.setAttribute("class", this._names.join(" "));
          }
        },
        remove: function(name) {
          var i = this._names.indexOf(name);
          if (i >= 0) {
            this._names.splice(i, 1);
            this._node.setAttribute("class", this._names.join(" "));
          }
        },
        contains: function(name) {
          return this._names.indexOf(name) >= 0;
        }
      };
      function classedAdd(node, names) {
        var list = classList(node), i = -1, n = names.length;
        while (++i < n)
          list.add(names[i]);
      }
      function classedRemove(node, names) {
        var list = classList(node), i = -1, n = names.length;
        while (++i < n)
          list.remove(names[i]);
      }
      function classedTrue(names) {
        return function() {
          classedAdd(this, names);
        };
      }
      function classedFalse(names) {
        return function() {
          classedRemove(this, names);
        };
      }
      function classedFunction(names, value) {
        return function() {
          (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
        };
      }
      function selection_classed(name, value) {
        var names = classArray(name + "");
        if (arguments.length < 2) {
          var list = classList(this.node()), i = -1, n = names.length;
          while (++i < n)
            if (!list.contains(names[i]))
              return false;
          return true;
        }
        return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
      }
      function textRemove() {
        this.textContent = "";
      }
      function textConstant(value) {
        return function() {
          this.textContent = value;
        };
      }
      function textFunction(value) {
        return function() {
          var v = value.apply(this, arguments);
          this.textContent = v == null ? "" : v;
        };
      }
      function selection_text(value) {
        return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
      }
      function htmlRemove() {
        this.innerHTML = "";
      }
      function htmlConstant(value) {
        return function() {
          this.innerHTML = value;
        };
      }
      function htmlFunction(value) {
        return function() {
          var v = value.apply(this, arguments);
          this.innerHTML = v == null ? "" : v;
        };
      }
      function selection_html(value) {
        return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
      }
      function raise() {
        if (this.nextSibling)
          this.parentNode.appendChild(this);
      }
      function selection_raise() {
        return this.each(raise);
      }
      function lower() {
        if (this.previousSibling)
          this.parentNode.insertBefore(this, this.parentNode.firstChild);
      }
      function selection_lower() {
        return this.each(lower);
      }
      function selection_append(name) {
        var create2 = typeof name === "function" ? name : creator(name);
        return this.select(function() {
          return this.appendChild(create2.apply(this, arguments));
        });
      }
      function constantNull() {
        return null;
      }
      function selection_insert(name, before) {
        var create2 = typeof name === "function" ? name : creator(name), select2 = before == null ? constantNull : typeof before === "function" ? before : selector(before);
        return this.select(function() {
          return this.insertBefore(create2.apply(this, arguments), select2.apply(this, arguments) || null);
        });
      }
      function remove() {
        var parent = this.parentNode;
        if (parent)
          parent.removeChild(this);
      }
      function selection_remove() {
        return this.each(remove);
      }
      function selection_cloneShallow() {
        var clone = this.cloneNode(false), parent = this.parentNode;
        return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
      }
      function selection_cloneDeep() {
        var clone = this.cloneNode(true), parent = this.parentNode;
        return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
      }
      function selection_clone(deep) {
        return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
      }
      function selection_datum(value) {
        return arguments.length ? this.property("__data__", value) : this.node().__data__;
      }
      function contextListener(listener) {
        return function(event) {
          listener.call(this, event, this.__data__);
        };
      }
      function parseTypenames(typenames) {
        return typenames.trim().split(/^|\s+/).map(function(t) {
          var name = "", i = t.indexOf(".");
          if (i >= 0)
            name = t.slice(i + 1), t = t.slice(0, i);
          return {type: t, name};
        });
      }
      function onRemove(typename) {
        return function() {
          var on = this.__on;
          if (!on)
            return;
          for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
            if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
              this.removeEventListener(o.type, o.listener, o.options);
            } else {
              on[++i] = o;
            }
          }
          if (++i)
            on.length = i;
          else
            delete this.__on;
        };
      }
      function onAdd(typename, value, options) {
        return function() {
          var on = this.__on, o, listener = contextListener(value);
          if (on)
            for (var j = 0, m = on.length; j < m; ++j) {
              if ((o = on[j]).type === typename.type && o.name === typename.name) {
                this.removeEventListener(o.type, o.listener, o.options);
                this.addEventListener(o.type, o.listener = listener, o.options = options);
                o.value = value;
                return;
              }
            }
          this.addEventListener(typename.type, listener, options);
          o = {type: typename.type, name: typename.name, value, listener, options};
          if (!on)
            this.__on = [o];
          else
            on.push(o);
        };
      }
      function selection_on(typename, value, options) {
        var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
        if (arguments.length < 2) {
          var on = this.node().__on;
          if (on)
            for (var j = 0, m = on.length, o; j < m; ++j) {
              for (i = 0, o = on[j]; i < n; ++i) {
                if ((t = typenames[i]).type === o.type && t.name === o.name) {
                  return o.value;
                }
              }
            }
          return;
        }
        on = value ? onAdd : onRemove;
        for (i = 0; i < n; ++i)
          this.each(on(typenames[i], value, options));
        return this;
      }
      function dispatchEvent(node, type, params) {
        var window2 = defaultView(node), event = window2.CustomEvent;
        if (typeof event === "function") {
          event = new event(type, params);
        } else {
          event = window2.document.createEvent("Event");
          if (params)
            event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
          else
            event.initEvent(type, false, false);
        }
        node.dispatchEvent(event);
      }
      function dispatchConstant(type, params) {
        return function() {
          return dispatchEvent(this, type, params);
        };
      }
      function dispatchFunction(type, params) {
        return function() {
          return dispatchEvent(this, type, params.apply(this, arguments));
        };
      }
      function selection_dispatch(type, params) {
        return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
      }
      function* selection_iterator() {
        for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
          for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
            if (node = group[i])
              yield node;
          }
        }
      }
      var root = [null];
      function Selection(groups, parents) {
        this._groups = groups;
        this._parents = parents;
      }
      function selection() {
        return new Selection([[document.documentElement]], root);
      }
      function selection_selection() {
        return this;
      }
      Selection.prototype = selection.prototype = {
        constructor: Selection,
        select: selection_select,
        selectAll: selection_selectAll,
        selectChild: selection_selectChild,
        selectChildren: selection_selectChildren,
        filter: selection_filter,
        data: selection_data,
        enter: selection_enter,
        exit: selection_exit,
        join: selection_join,
        merge: selection_merge,
        selection: selection_selection,
        order: selection_order,
        sort: selection_sort,
        call: selection_call,
        nodes: selection_nodes,
        node: selection_node,
        size: selection_size,
        empty: selection_empty,
        each: selection_each,
        attr: selection_attr,
        style: selection_style,
        property: selection_property,
        classed: selection_classed,
        text: selection_text,
        html: selection_html,
        raise: selection_raise,
        lower: selection_lower,
        append: selection_append,
        insert: selection_insert,
        remove: selection_remove,
        clone: selection_clone,
        datum: selection_datum,
        on: selection_on,
        dispatch: selection_dispatch,
        [Symbol.iterator]: selection_iterator
      };
      function select(selector2) {
        return typeof selector2 === "string" ? new Selection([[document.querySelector(selector2)]], [document.documentElement]) : new Selection([[selector2]], root);
      }
      function create(name) {
        return select(creator(name).call(document.documentElement));
      }
      var nextId = 0;
      function local() {
        return new Local();
      }
      function Local() {
        this._ = "@" + (++nextId).toString(36);
      }
      Local.prototype = local.prototype = {
        constructor: Local,
        get: function(node) {
          var id = this._;
          while (!(id in node))
            if (!(node = node.parentNode))
              return;
          return node[id];
        },
        set: function(node, value) {
          return node[this._] = value;
        },
        remove: function(node) {
          return this._ in node && delete node[this._];
        },
        toString: function() {
          return this._;
        }
      };
      function sourceEvent(event) {
        let sourceEvent2;
        while (sourceEvent2 = event.sourceEvent)
          event = sourceEvent2;
        return event;
      }
      function pointer(event, node) {
        event = sourceEvent(event);
        if (node === void 0)
          node = event.currentTarget;
        if (node) {
          var svg = node.ownerSVGElement || node;
          if (svg.createSVGPoint) {
            var point = svg.createSVGPoint();
            point.x = event.clientX, point.y = event.clientY;
            point = point.matrixTransform(node.getScreenCTM().inverse());
            return [point.x, point.y];
          }
          if (node.getBoundingClientRect) {
            var rect = node.getBoundingClientRect();
            return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
          }
        }
        return [event.pageX, event.pageY];
      }
      function pointers(events, node) {
        if (events.target) {
          events = sourceEvent(events);
          if (node === void 0)
            node = events.currentTarget;
          events = events.touches || [events];
        }
        return Array.from(events, (event) => pointer(event, node));
      }
      function selectAll(selector2) {
        return typeof selector2 === "string" ? new Selection([document.querySelectorAll(selector2)], [document.documentElement]) : new Selection([selector2 == null ? [] : array(selector2)], root);
      }
      exports2.create = create;
      exports2.creator = creator;
      exports2.local = local;
      exports2.matcher = matcher;
      exports2.namespace = namespace;
      exports2.namespaces = namespaces;
      exports2.pointer = pointer;
      exports2.pointers = pointers;
      exports2.select = select;
      exports2.selectAll = selectAll;
      exports2.selection = selection;
      exports2.selector = selector;
      exports2.selectorAll = selectorAll;
      exports2.style = styleValue;
      exports2.window = defaultView;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-drag/dist/d3-drag.js
  var require_d3_drag = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_d3_dispatch(), require_d3_selection()) : typeof define === "function" && define.amd ? define(["exports", "d3-dispatch", "d3-selection"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}, global.d3, global.d3));
    })(exports, function(exports2, d3Dispatch, d3Selection) {
      "use strict";
      function nopropagation(event) {
        event.stopImmediatePropagation();
      }
      function noevent(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      function nodrag(view) {
        var root = view.document.documentElement, selection = d3Selection.select(view).on("dragstart.drag", noevent, true);
        if ("onselectstart" in root) {
          selection.on("selectstart.drag", noevent, true);
        } else {
          root.__noselect = root.style.MozUserSelect;
          root.style.MozUserSelect = "none";
        }
      }
      function yesdrag(view, noclick) {
        var root = view.document.documentElement, selection = d3Selection.select(view).on("dragstart.drag", null);
        if (noclick) {
          selection.on("click.drag", noevent, true);
          setTimeout(function() {
            selection.on("click.drag", null);
          }, 0);
        }
        if ("onselectstart" in root) {
          selection.on("selectstart.drag", null);
        } else {
          root.style.MozUserSelect = root.__noselect;
          delete root.__noselect;
        }
      }
      var constant = (x) => () => x;
      function DragEvent(type, {
        sourceEvent,
        subject,
        target,
        identifier,
        active,
        x,
        y,
        dx,
        dy,
        dispatch
      }) {
        Object.defineProperties(this, {
          type: {value: type, enumerable: true, configurable: true},
          sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
          subject: {value: subject, enumerable: true, configurable: true},
          target: {value: target, enumerable: true, configurable: true},
          identifier: {value: identifier, enumerable: true, configurable: true},
          active: {value: active, enumerable: true, configurable: true},
          x: {value: x, enumerable: true, configurable: true},
          y: {value: y, enumerable: true, configurable: true},
          dx: {value: dx, enumerable: true, configurable: true},
          dy: {value: dy, enumerable: true, configurable: true},
          _: {value: dispatch}
        });
      }
      DragEvent.prototype.on = function() {
        var value = this._.on.apply(this._, arguments);
        return value === this._ ? this : value;
      };
      function defaultFilter(event) {
        return !event.ctrlKey && !event.button;
      }
      function defaultContainer() {
        return this.parentNode;
      }
      function defaultSubject(event, d) {
        return d == null ? {x: event.x, y: event.y} : d;
      }
      function defaultTouchable() {
        return navigator.maxTouchPoints || "ontouchstart" in this;
      }
      function drag() {
        var filter = defaultFilter, container = defaultContainer, subject = defaultSubject, touchable = defaultTouchable, gestures = {}, listeners = d3Dispatch.dispatch("start", "drag", "end"), active = 0, mousedownx, mousedowny, mousemoving, touchending, clickDistance2 = 0;
        function drag2(selection) {
          selection.on("mousedown.drag", mousedowned).filter(touchable).on("touchstart.drag", touchstarted).on("touchmove.drag", touchmoved).on("touchend.drag touchcancel.drag", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
        }
        function mousedowned(event, d) {
          if (touchending || !filter.call(this, event, d))
            return;
          var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
          if (!gesture)
            return;
          d3Selection.select(event.view).on("mousemove.drag", mousemoved, true).on("mouseup.drag", mouseupped, true);
          nodrag(event.view);
          nopropagation(event);
          mousemoving = false;
          mousedownx = event.clientX;
          mousedowny = event.clientY;
          gesture("start", event);
        }
        function mousemoved(event) {
          noevent(event);
          if (!mousemoving) {
            var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
            mousemoving = dx * dx + dy * dy > clickDistance2;
          }
          gestures.mouse("drag", event);
        }
        function mouseupped(event) {
          d3Selection.select(event.view).on("mousemove.drag mouseup.drag", null);
          yesdrag(event.view, mousemoving);
          noevent(event);
          gestures.mouse("end", event);
        }
        function touchstarted(event, d) {
          if (!filter.call(this, event, d))
            return;
          var touches = event.changedTouches, c = container.call(this, event, d), n = touches.length, i, gesture;
          for (i = 0; i < n; ++i) {
            if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
              nopropagation(event);
              gesture("start", event, touches[i]);
            }
          }
        }
        function touchmoved(event) {
          var touches = event.changedTouches, n = touches.length, i, gesture;
          for (i = 0; i < n; ++i) {
            if (gesture = gestures[touches[i].identifier]) {
              noevent(event);
              gesture("drag", event, touches[i]);
            }
          }
        }
        function touchended(event) {
          var touches = event.changedTouches, n = touches.length, i, gesture;
          if (touchending)
            clearTimeout(touchending);
          touchending = setTimeout(function() {
            touchending = null;
          }, 500);
          for (i = 0; i < n; ++i) {
            if (gesture = gestures[touches[i].identifier]) {
              nopropagation(event);
              gesture("end", event, touches[i]);
            }
          }
        }
        function beforestart(that, container2, event, d, identifier, touch) {
          var dispatch = listeners.copy(), p = d3Selection.pointer(touch || event, container2), dx, dy, s;
          if ((s = subject.call(that, new DragEvent("beforestart", {
            sourceEvent: event,
            target: drag2,
            identifier,
            active,
            x: p[0],
            y: p[1],
            dx: 0,
            dy: 0,
            dispatch
          }), d)) == null)
            return;
          dx = s.x - p[0] || 0;
          dy = s.y - p[1] || 0;
          return function gesture(type, event2, touch2) {
            var p0 = p, n;
            switch (type) {
              case "start":
                gestures[identifier] = gesture, n = active++;
                break;
              case "end":
                delete gestures[identifier], --active;
              case "drag":
                p = d3Selection.pointer(touch2 || event2, container2), n = active;
                break;
            }
            dispatch.call(type, that, new DragEvent(type, {
              sourceEvent: event2,
              subject: s,
              target: drag2,
              identifier,
              active: n,
              x: p[0] + dx,
              y: p[1] + dy,
              dx: p[0] - p0[0],
              dy: p[1] - p0[1],
              dispatch
            }), d);
          };
        }
        drag2.filter = function(_) {
          return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), drag2) : filter;
        };
        drag2.container = function(_) {
          return arguments.length ? (container = typeof _ === "function" ? _ : constant(_), drag2) : container;
        };
        drag2.subject = function(_) {
          return arguments.length ? (subject = typeof _ === "function" ? _ : constant(_), drag2) : subject;
        };
        drag2.touchable = function(_) {
          return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), drag2) : touchable;
        };
        drag2.on = function() {
          var value = listeners.on.apply(listeners, arguments);
          return value === listeners ? drag2 : value;
        };
        drag2.clickDistance = function(_) {
          return arguments.length ? (clickDistance2 = (_ = +_) * _, drag2) : Math.sqrt(clickDistance2);
        };
        return drag2;
      }
      exports2.drag = drag;
      exports2.dragDisable = nodrag;
      exports2.dragEnable = yesdrag;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-color/dist/d3-color.js
  var require_d3_color = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      function define2(constructor, factory, prototype) {
        constructor.prototype = factory.prototype = prototype;
        prototype.constructor = constructor;
      }
      function extend(parent, definition) {
        var prototype = Object.create(parent.prototype);
        for (var key in definition)
          prototype[key] = definition[key];
        return prototype;
      }
      function Color() {
      }
      var darker = 0.7;
      var brighter = 1 / darker;
      var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"), reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"), reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"), reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"), reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"), reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
      var named = {
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        rebeccapurple: 6697881,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
      };
      define2(Color, color, {
        copy: function(channels) {
          return Object.assign(new this.constructor(), this, channels);
        },
        displayable: function() {
          return this.rgb().displayable();
        },
        hex: color_formatHex,
        formatHex: color_formatHex,
        formatHsl: color_formatHsl,
        formatRgb: color_formatRgb,
        toString: color_formatRgb
      });
      function color_formatHex() {
        return this.rgb().formatHex();
      }
      function color_formatHsl() {
        return hslConvert(this).formatHsl();
      }
      function color_formatRgb() {
        return this.rgb().formatRgb();
      }
      function color(format) {
        var m, l;
        format = (format + "").trim().toLowerCase();
        return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
      }
      function rgbn(n) {
        return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
      }
      function rgba(r, g, b, a) {
        if (a <= 0)
          r = g = b = NaN;
        return new Rgb(r, g, b, a);
      }
      function rgbConvert(o) {
        if (!(o instanceof Color))
          o = color(o);
        if (!o)
          return new Rgb();
        o = o.rgb();
        return new Rgb(o.r, o.g, o.b, o.opacity);
      }
      function rgb(r, g, b, opacity) {
        return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
      }
      function Rgb(r, g, b, opacity) {
        this.r = +r;
        this.g = +g;
        this.b = +b;
        this.opacity = +opacity;
      }
      define2(Rgb, rgb, extend(Color, {
        brighter: function(k) {
          k = k == null ? brighter : Math.pow(brighter, k);
          return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
        },
        darker: function(k) {
          k = k == null ? darker : Math.pow(darker, k);
          return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
        },
        rgb: function() {
          return this;
        },
        displayable: function() {
          return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
        },
        hex: rgb_formatHex,
        formatHex: rgb_formatHex,
        formatRgb: rgb_formatRgb,
        toString: rgb_formatRgb
      }));
      function rgb_formatHex() {
        return "#" + hex(this.r) + hex(this.g) + hex(this.b);
      }
      function rgb_formatRgb() {
        var a = this.opacity;
        a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
        return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
      }
      function hex(value) {
        value = Math.max(0, Math.min(255, Math.round(value) || 0));
        return (value < 16 ? "0" : "") + value.toString(16);
      }
      function hsla(h, s, l, a) {
        if (a <= 0)
          h = s = l = NaN;
        else if (l <= 0 || l >= 1)
          h = s = NaN;
        else if (s <= 0)
          h = NaN;
        return new Hsl(h, s, l, a);
      }
      function hslConvert(o) {
        if (o instanceof Hsl)
          return new Hsl(o.h, o.s, o.l, o.opacity);
        if (!(o instanceof Color))
          o = color(o);
        if (!o)
          return new Hsl();
        if (o instanceof Hsl)
          return o;
        o = o.rgb();
        var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
        if (s) {
          if (r === max)
            h = (g - b) / s + (g < b) * 6;
          else if (g === max)
            h = (b - r) / s + 2;
          else
            h = (r - g) / s + 4;
          s /= l < 0.5 ? max + min : 2 - max - min;
          h *= 60;
        } else {
          s = l > 0 && l < 1 ? 0 : h;
        }
        return new Hsl(h, s, l, o.opacity);
      }
      function hsl(h, s, l, opacity) {
        return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
      }
      function Hsl(h, s, l, opacity) {
        this.h = +h;
        this.s = +s;
        this.l = +l;
        this.opacity = +opacity;
      }
      define2(Hsl, hsl, extend(Color, {
        brighter: function(k) {
          k = k == null ? brighter : Math.pow(brighter, k);
          return new Hsl(this.h, this.s, this.l * k, this.opacity);
        },
        darker: function(k) {
          k = k == null ? darker : Math.pow(darker, k);
          return new Hsl(this.h, this.s, this.l * k, this.opacity);
        },
        rgb: function() {
          var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
          return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
        },
        displayable: function() {
          return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
        },
        formatHsl: function() {
          var a = this.opacity;
          a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
          return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
        }
      }));
      function hsl2rgb(h, m1, m2) {
        return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
      }
      const radians = Math.PI / 180;
      const degrees = 180 / Math.PI;
      const K = 18, Xn = 0.96422, Yn = 1, Zn = 0.82521, t0 = 4 / 29, t1 = 6 / 29, t2 = 3 * t1 * t1, t3 = t1 * t1 * t1;
      function labConvert(o) {
        if (o instanceof Lab)
          return new Lab(o.l, o.a, o.b, o.opacity);
        if (o instanceof Hcl)
          return hcl2lab(o);
        if (!(o instanceof Rgb))
          o = rgbConvert(o);
        var r = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b = rgb2lrgb(o.b), y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
        if (r === g && g === b)
          x = z = y;
        else {
          x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
          z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
        }
        return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
      }
      function gray(l, opacity) {
        return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
      }
      function lab(l, a, b, opacity) {
        return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
      }
      function Lab(l, a, b, opacity) {
        this.l = +l;
        this.a = +a;
        this.b = +b;
        this.opacity = +opacity;
      }
      define2(Lab, lab, extend(Color, {
        brighter: function(k) {
          return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
        },
        darker: function(k) {
          return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
        },
        rgb: function() {
          var y = (this.l + 16) / 116, x = isNaN(this.a) ? y : y + this.a / 500, z = isNaN(this.b) ? y : y - this.b / 200;
          x = Xn * lab2xyz(x);
          y = Yn * lab2xyz(y);
          z = Zn * lab2xyz(z);
          return new Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.033454 * z), lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
        }
      }));
      function xyz2lab(t) {
        return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
      }
      function lab2xyz(t) {
        return t > t1 ? t * t * t : t2 * (t - t0);
      }
      function lrgb2rgb(x) {
        return 255 * (x <= 31308e-7 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
      }
      function rgb2lrgb(x) {
        return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
      }
      function hclConvert(o) {
        if (o instanceof Hcl)
          return new Hcl(o.h, o.c, o.l, o.opacity);
        if (!(o instanceof Lab))
          o = labConvert(o);
        if (o.a === 0 && o.b === 0)
          return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
        var h = Math.atan2(o.b, o.a) * degrees;
        return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
      }
      function lch(l, c, h, opacity) {
        return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
      }
      function hcl(h, c, l, opacity) {
        return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
      }
      function Hcl(h, c, l, opacity) {
        this.h = +h;
        this.c = +c;
        this.l = +l;
        this.opacity = +opacity;
      }
      function hcl2lab(o) {
        if (isNaN(o.h))
          return new Lab(o.l, 0, 0, o.opacity);
        var h = o.h * radians;
        return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
      }
      define2(Hcl, hcl, extend(Color, {
        brighter: function(k) {
          return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
        },
        darker: function(k) {
          return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
        },
        rgb: function() {
          return hcl2lab(this).rgb();
        }
      }));
      var A = -0.14861, B = 1.78277, C = -0.29227, D = -0.90649, E = 1.97294, ED = E * D, EB = E * B, BC_DA = B * C - D * A;
      function cubehelixConvert(o) {
        if (o instanceof Cubehelix)
          return new Cubehelix(o.h, o.s, o.l, o.opacity);
        if (!(o instanceof Rgb))
          o = rgbConvert(o);
        var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), h = s ? Math.atan2(k, bl) * degrees - 120 : NaN;
        return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
      }
      function cubehelix(h, s, l, opacity) {
        return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
      }
      function Cubehelix(h, s, l, opacity) {
        this.h = +h;
        this.s = +s;
        this.l = +l;
        this.opacity = +opacity;
      }
      define2(Cubehelix, cubehelix, extend(Color, {
        brighter: function(k) {
          k = k == null ? brighter : Math.pow(brighter, k);
          return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
        },
        darker: function(k) {
          k = k == null ? darker : Math.pow(darker, k);
          return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
        },
        rgb: function() {
          var h = isNaN(this.h) ? 0 : (this.h + 120) * radians, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
          return new Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
        }
      }));
      exports2.color = color;
      exports2.cubehelix = cubehelix;
      exports2.gray = gray;
      exports2.hcl = hcl;
      exports2.hsl = hsl;
      exports2.lab = lab;
      exports2.lch = lch;
      exports2.rgb = rgb;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-interpolate/dist/d3-interpolate.js
  var require_d3_interpolate = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_d3_color()) : typeof define === "function" && define.amd ? define(["exports", "d3-color"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}, global.d3));
    })(exports, function(exports2, d3Color) {
      "use strict";
      function basis(t1, v0, v1, v2, v3) {
        var t2 = t1 * t1, t3 = t2 * t1;
        return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
      }
      function basis$1(values) {
        var n = values.length - 1;
        return function(t) {
          var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
          return basis((t - i / n) * n, v0, v1, v2, v3);
        };
      }
      function basisClosed(values) {
        var n = values.length;
        return function(t) {
          var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
          return basis((t - i / n) * n, v0, v1, v2, v3);
        };
      }
      var constant = (x) => () => x;
      function linear(a, d) {
        return function(t) {
          return a + t * d;
        };
      }
      function exponential(a, b, y) {
        return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
          return Math.pow(a + t * b, y);
        };
      }
      function hue(a, b) {
        var d = b - a;
        return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
      }
      function gamma(y) {
        return (y = +y) === 1 ? nogamma : function(a, b) {
          return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
        };
      }
      function nogamma(a, b) {
        var d = b - a;
        return d ? linear(a, d) : constant(isNaN(a) ? b : a);
      }
      var rgb = function rgbGamma(y) {
        var color = gamma(y);
        function rgb2(start, end) {
          var r = color((start = d3Color.rgb(start)).r, (end = d3Color.rgb(end)).r), g = color(start.g, end.g), b = color(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
          return function(t) {
            start.r = r(t);
            start.g = g(t);
            start.b = b(t);
            start.opacity = opacity(t);
            return start + "";
          };
        }
        rgb2.gamma = rgbGamma;
        return rgb2;
      }(1);
      function rgbSpline(spline) {
        return function(colors) {
          var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color;
          for (i = 0; i < n; ++i) {
            color = d3Color.rgb(colors[i]);
            r[i] = color.r || 0;
            g[i] = color.g || 0;
            b[i] = color.b || 0;
          }
          r = spline(r);
          g = spline(g);
          b = spline(b);
          color.opacity = 1;
          return function(t) {
            color.r = r(t);
            color.g = g(t);
            color.b = b(t);
            return color + "";
          };
        };
      }
      var rgbBasis = rgbSpline(basis$1);
      var rgbBasisClosed = rgbSpline(basisClosed);
      function numberArray(a, b) {
        if (!b)
          b = [];
        var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
        return function(t) {
          for (i = 0; i < n; ++i)
            c[i] = a[i] * (1 - t) + b[i] * t;
          return c;
        };
      }
      function isNumberArray(x) {
        return ArrayBuffer.isView(x) && !(x instanceof DataView);
      }
      function array(a, b) {
        return (isNumberArray(b) ? numberArray : genericArray)(a, b);
      }
      function genericArray(a, b) {
        var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i;
        for (i = 0; i < na; ++i)
          x[i] = value(a[i], b[i]);
        for (; i < nb; ++i)
          c[i] = b[i];
        return function(t) {
          for (i = 0; i < na; ++i)
            c[i] = x[i](t);
          return c;
        };
      }
      function date(a, b) {
        var d = new Date();
        return a = +a, b = +b, function(t) {
          return d.setTime(a * (1 - t) + b * t), d;
        };
      }
      function number(a, b) {
        return a = +a, b = +b, function(t) {
          return a * (1 - t) + b * t;
        };
      }
      function object(a, b) {
        var i = {}, c = {}, k;
        if (a === null || typeof a !== "object")
          a = {};
        if (b === null || typeof b !== "object")
          b = {};
        for (k in b) {
          if (k in a) {
            i[k] = value(a[k], b[k]);
          } else {
            c[k] = b[k];
          }
        }
        return function(t) {
          for (k in i)
            c[k] = i[k](t);
          return c;
        };
      }
      var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
      function zero(b) {
        return function() {
          return b;
        };
      }
      function one(b) {
        return function(t) {
          return b(t) + "";
        };
      }
      function string(a, b) {
        var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
        a = a + "", b = b + "";
        while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
          if ((bs = bm.index) > bi) {
            bs = b.slice(bi, bs);
            if (s[i])
              s[i] += bs;
            else
              s[++i] = bs;
          }
          if ((am = am[0]) === (bm = bm[0])) {
            if (s[i])
              s[i] += bm;
            else
              s[++i] = bm;
          } else {
            s[++i] = null;
            q.push({i, x: number(am, bm)});
          }
          bi = reB.lastIndex;
        }
        if (bi < b.length) {
          bs = b.slice(bi);
          if (s[i])
            s[i] += bs;
          else
            s[++i] = bs;
        }
        return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
          for (var i2 = 0, o; i2 < b; ++i2)
            s[(o = q[i2]).i] = o.x(t);
          return s.join("");
        });
      }
      function value(a, b) {
        var t = typeof b, c;
        return b == null || t === "boolean" ? constant(b) : (t === "number" ? number : t === "string" ? (c = d3Color.color(b)) ? (b = c, rgb) : string : b instanceof d3Color.color ? rgb : b instanceof Date ? date : isNumberArray(b) ? numberArray : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : number)(a, b);
      }
      function discrete(range) {
        var n = range.length;
        return function(t) {
          return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
        };
      }
      function hue$1(a, b) {
        var i = hue(+a, +b);
        return function(t) {
          var x = i(t);
          return x - 360 * Math.floor(x / 360);
        };
      }
      function round(a, b) {
        return a = +a, b = +b, function(t) {
          return Math.round(a * (1 - t) + b * t);
        };
      }
      var degrees = 180 / Math.PI;
      var identity = {
        translateX: 0,
        translateY: 0,
        rotate: 0,
        skewX: 0,
        scaleX: 1,
        scaleY: 1
      };
      function decompose(a, b, c, d, e, f) {
        var scaleX, scaleY, skewX;
        if (scaleX = Math.sqrt(a * a + b * b))
          a /= scaleX, b /= scaleX;
        if (skewX = a * c + b * d)
          c -= a * skewX, d -= b * skewX;
        if (scaleY = Math.sqrt(c * c + d * d))
          c /= scaleY, d /= scaleY, skewX /= scaleY;
        if (a * d < b * c)
          a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
        return {
          translateX: e,
          translateY: f,
          rotate: Math.atan2(b, a) * degrees,
          skewX: Math.atan(skewX) * degrees,
          scaleX,
          scaleY
        };
      }
      var svgNode;
      function parseCss(value2) {
        const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value2 + "");
        return m.isIdentity ? identity : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
      }
      function parseSvg(value2) {
        if (value2 == null)
          return identity;
        if (!svgNode)
          svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
        svgNode.setAttribute("transform", value2);
        if (!(value2 = svgNode.transform.baseVal.consolidate()))
          return identity;
        value2 = value2.matrix;
        return decompose(value2.a, value2.b, value2.c, value2.d, value2.e, value2.f);
      }
      function interpolateTransform(parse, pxComma, pxParen, degParen) {
        function pop(s) {
          return s.length ? s.pop() + " " : "";
        }
        function translate(xa, ya, xb, yb, s, q) {
          if (xa !== xb || ya !== yb) {
            var i = s.push("translate(", null, pxComma, null, pxParen);
            q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
          } else if (xb || yb) {
            s.push("translate(" + xb + pxComma + yb + pxParen);
          }
        }
        function rotate(a, b, s, q) {
          if (a !== b) {
            if (a - b > 180)
              b += 360;
            else if (b - a > 180)
              a += 360;
            q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number(a, b)});
          } else if (b) {
            s.push(pop(s) + "rotate(" + b + degParen);
          }
        }
        function skewX(a, b, s, q) {
          if (a !== b) {
            q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number(a, b)});
          } else if (b) {
            s.push(pop(s) + "skewX(" + b + degParen);
          }
        }
        function scale(xa, ya, xb, yb, s, q) {
          if (xa !== xb || ya !== yb) {
            var i = s.push(pop(s) + "scale(", null, ",", null, ")");
            q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
          } else if (xb !== 1 || yb !== 1) {
            s.push(pop(s) + "scale(" + xb + "," + yb + ")");
          }
        }
        return function(a, b) {
          var s = [], q = [];
          a = parse(a), b = parse(b);
          translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
          rotate(a.rotate, b.rotate, s, q);
          skewX(a.skewX, b.skewX, s, q);
          scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
          a = b = null;
          return function(t) {
            var i = -1, n = q.length, o;
            while (++i < n)
              s[(o = q[i]).i] = o.x(t);
            return s.join("");
          };
        };
      }
      var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
      var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
      var epsilon2 = 1e-12;
      function cosh(x) {
        return ((x = Math.exp(x)) + 1 / x) / 2;
      }
      function sinh(x) {
        return ((x = Math.exp(x)) - 1 / x) / 2;
      }
      function tanh(x) {
        return ((x = Math.exp(2 * x)) - 1) / (x + 1);
      }
      var zoom = function zoomRho(rho, rho2, rho4) {
        function zoom2(p0, p1) {
          var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
          if (d2 < epsilon2) {
            S = Math.log(w1 / w0) / rho;
            i = function(t) {
              return [
                ux0 + t * dx,
                uy0 + t * dy,
                w0 * Math.exp(rho * t * S)
              ];
            };
          } else {
            var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
            S = (r1 - r0) / rho;
            i = function(t) {
              var s = t * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
              return [
                ux0 + u * dx,
                uy0 + u * dy,
                w0 * coshr0 / cosh(rho * s + r0)
              ];
            };
          }
          i.duration = S * 1e3 * rho / Math.SQRT2;
          return i;
        }
        zoom2.rho = function(_) {
          var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
          return zoomRho(_1, _2, _4);
        };
        return zoom2;
      }(Math.SQRT2, 2, 4);
      function hsl(hue2) {
        return function(start, end) {
          var h = hue2((start = d3Color.hsl(start)).h, (end = d3Color.hsl(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
          return function(t) {
            start.h = h(t);
            start.s = s(t);
            start.l = l(t);
            start.opacity = opacity(t);
            return start + "";
          };
        };
      }
      var hsl$1 = hsl(hue);
      var hslLong = hsl(nogamma);
      function lab(start, end) {
        var l = nogamma((start = d3Color.lab(start)).l, (end = d3Color.lab(end)).l), a = nogamma(start.a, end.a), b = nogamma(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
        return function(t) {
          start.l = l(t);
          start.a = a(t);
          start.b = b(t);
          start.opacity = opacity(t);
          return start + "";
        };
      }
      function hcl(hue2) {
        return function(start, end) {
          var h = hue2((start = d3Color.hcl(start)).h, (end = d3Color.hcl(end)).h), c = nogamma(start.c, end.c), l = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
          return function(t) {
            start.h = h(t);
            start.c = c(t);
            start.l = l(t);
            start.opacity = opacity(t);
            return start + "";
          };
        };
      }
      var hcl$1 = hcl(hue);
      var hclLong = hcl(nogamma);
      function cubehelix(hue2) {
        return function cubehelixGamma(y) {
          y = +y;
          function cubehelix2(start, end) {
            var h = hue2((start = d3Color.cubehelix(start)).h, (end = d3Color.cubehelix(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
            return function(t) {
              start.h = h(t);
              start.s = s(t);
              start.l = l(Math.pow(t, y));
              start.opacity = opacity(t);
              return start + "";
            };
          }
          cubehelix2.gamma = cubehelixGamma;
          return cubehelix2;
        }(1);
      }
      var cubehelix$1 = cubehelix(hue);
      var cubehelixLong = cubehelix(nogamma);
      function piecewise(interpolate, values) {
        if (values === void 0)
          values = interpolate, interpolate = value;
        var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
        while (i < n)
          I[i] = interpolate(v, v = values[++i]);
        return function(t) {
          var i2 = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
          return I[i2](t - i2);
        };
      }
      function quantize(interpolator, n) {
        var samples = new Array(n);
        for (var i = 0; i < n; ++i)
          samples[i] = interpolator(i / (n - 1));
        return samples;
      }
      exports2.interpolate = value;
      exports2.interpolateArray = array;
      exports2.interpolateBasis = basis$1;
      exports2.interpolateBasisClosed = basisClosed;
      exports2.interpolateCubehelix = cubehelix$1;
      exports2.interpolateCubehelixLong = cubehelixLong;
      exports2.interpolateDate = date;
      exports2.interpolateDiscrete = discrete;
      exports2.interpolateHcl = hcl$1;
      exports2.interpolateHclLong = hclLong;
      exports2.interpolateHsl = hsl$1;
      exports2.interpolateHslLong = hslLong;
      exports2.interpolateHue = hue$1;
      exports2.interpolateLab = lab;
      exports2.interpolateNumber = number;
      exports2.interpolateNumberArray = numberArray;
      exports2.interpolateObject = object;
      exports2.interpolateRgb = rgb;
      exports2.interpolateRgbBasis = rgbBasis;
      exports2.interpolateRgbBasisClosed = rgbBasisClosed;
      exports2.interpolateRound = round;
      exports2.interpolateString = string;
      exports2.interpolateTransformCss = interpolateTransformCss;
      exports2.interpolateTransformSvg = interpolateTransformSvg;
      exports2.interpolateZoom = zoom;
      exports2.piecewise = piecewise;
      exports2.quantize = quantize;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-timer/dist/d3-timer.js
  var require_d3_timer = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      var frame = 0, timeout = 0, interval = 0, pokeDelay = 1e3, taskHead, taskTail, clockLast = 0, clockNow = 0, clockSkew = 0, clock = typeof performance === "object" && performance.now ? performance : Date, setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
        setTimeout(f, 17);
      };
      function now() {
        return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
      }
      function clearNow() {
        clockNow = 0;
      }
      function Timer() {
        this._call = this._time = this._next = null;
      }
      Timer.prototype = timer.prototype = {
        constructor: Timer,
        restart: function(callback, delay, time) {
          if (typeof callback !== "function")
            throw new TypeError("callback is not a function");
          time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
          if (!this._next && taskTail !== this) {
            if (taskTail)
              taskTail._next = this;
            else
              taskHead = this;
            taskTail = this;
          }
          this._call = callback;
          this._time = time;
          sleep();
        },
        stop: function() {
          if (this._call) {
            this._call = null;
            this._time = Infinity;
            sleep();
          }
        }
      };
      function timer(callback, delay, time) {
        var t = new Timer();
        t.restart(callback, delay, time);
        return t;
      }
      function timerFlush() {
        now();
        ++frame;
        var t = taskHead, e;
        while (t) {
          if ((e = clockNow - t._time) >= 0)
            t._call.call(null, e);
          t = t._next;
        }
        --frame;
      }
      function wake() {
        clockNow = (clockLast = clock.now()) + clockSkew;
        frame = timeout = 0;
        try {
          timerFlush();
        } finally {
          frame = 0;
          nap();
          clockNow = 0;
        }
      }
      function poke() {
        var now2 = clock.now(), delay = now2 - clockLast;
        if (delay > pokeDelay)
          clockSkew -= delay, clockLast = now2;
      }
      function nap() {
        var t0, t1 = taskHead, t2, time = Infinity;
        while (t1) {
          if (t1._call) {
            if (time > t1._time)
              time = t1._time;
            t0 = t1, t1 = t1._next;
          } else {
            t2 = t1._next, t1._next = null;
            t1 = t0 ? t0._next = t2 : taskHead = t2;
          }
        }
        taskTail = t0;
        sleep(time);
      }
      function sleep(time) {
        if (frame)
          return;
        if (timeout)
          timeout = clearTimeout(timeout);
        var delay = time - clockNow;
        if (delay > 24) {
          if (time < Infinity)
            timeout = setTimeout(wake, time - clock.now() - clockSkew);
          if (interval)
            interval = clearInterval(interval);
        } else {
          if (!interval)
            clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
          frame = 1, setFrame(wake);
        }
      }
      function timeout$1(callback, delay, time) {
        var t = new Timer();
        delay = delay == null ? 0 : +delay;
        t.restart((elapsed) => {
          t.stop();
          callback(elapsed + delay);
        }, delay, time);
        return t;
      }
      function interval$1(callback, delay, time) {
        var t = new Timer(), total = delay;
        if (delay == null)
          return t.restart(callback, delay, time), t;
        t._restart = t.restart;
        t.restart = function(callback2, delay2, time2) {
          delay2 = +delay2, time2 = time2 == null ? now() : +time2;
          t._restart(function tick(elapsed) {
            elapsed += total;
            t._restart(tick, total += delay2, time2);
            callback2(elapsed);
          }, delay2, time2);
        };
        t.restart(callback, delay, time);
        return t;
      }
      exports2.interval = interval$1;
      exports2.now = now;
      exports2.timeout = timeout$1;
      exports2.timer = timer;
      exports2.timerFlush = timerFlush;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-ease/dist/d3-ease.js
  var require_d3_ease = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      const linear = (t) => +t;
      function quadIn(t) {
        return t * t;
      }
      function quadOut(t) {
        return t * (2 - t);
      }
      function quadInOut(t) {
        return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
      }
      function cubicIn(t) {
        return t * t * t;
      }
      function cubicOut(t) {
        return --t * t * t + 1;
      }
      function cubicInOut(t) {
        return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
      }
      var exponent = 3;
      var polyIn = function custom(e) {
        e = +e;
        function polyIn2(t) {
          return Math.pow(t, e);
        }
        polyIn2.exponent = custom;
        return polyIn2;
      }(exponent);
      var polyOut = function custom(e) {
        e = +e;
        function polyOut2(t) {
          return 1 - Math.pow(1 - t, e);
        }
        polyOut2.exponent = custom;
        return polyOut2;
      }(exponent);
      var polyInOut = function custom(e) {
        e = +e;
        function polyInOut2(t) {
          return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
        }
        polyInOut2.exponent = custom;
        return polyInOut2;
      }(exponent);
      var pi = Math.PI, halfPi = pi / 2;
      function sinIn(t) {
        return +t === 1 ? 1 : 1 - Math.cos(t * halfPi);
      }
      function sinOut(t) {
        return Math.sin(t * halfPi);
      }
      function sinInOut(t) {
        return (1 - Math.cos(pi * t)) / 2;
      }
      function tpmt(x) {
        return (Math.pow(2, -10 * x) - 9765625e-10) * 1.0009775171065494;
      }
      function expIn(t) {
        return tpmt(1 - +t);
      }
      function expOut(t) {
        return 1 - tpmt(t);
      }
      function expInOut(t) {
        return ((t *= 2) <= 1 ? tpmt(1 - t) : 2 - tpmt(t - 1)) / 2;
      }
      function circleIn(t) {
        return 1 - Math.sqrt(1 - t * t);
      }
      function circleOut(t) {
        return Math.sqrt(1 - --t * t);
      }
      function circleInOut(t) {
        return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
      }
      var b1 = 4 / 11, b2 = 6 / 11, b3 = 8 / 11, b4 = 3 / 4, b5 = 9 / 11, b6 = 10 / 11, b7 = 15 / 16, b8 = 21 / 22, b9 = 63 / 64, b0 = 1 / b1 / b1;
      function bounceIn(t) {
        return 1 - bounceOut(1 - t);
      }
      function bounceOut(t) {
        return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
      }
      function bounceInOut(t) {
        return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
      }
      var overshoot = 1.70158;
      var backIn = function custom(s) {
        s = +s;
        function backIn2(t) {
          return (t = +t) * t * (s * (t - 1) + t);
        }
        backIn2.overshoot = custom;
        return backIn2;
      }(overshoot);
      var backOut = function custom(s) {
        s = +s;
        function backOut2(t) {
          return --t * t * ((t + 1) * s + t) + 1;
        }
        backOut2.overshoot = custom;
        return backOut2;
      }(overshoot);
      var backInOut = function custom(s) {
        s = +s;
        function backInOut2(t) {
          return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
        }
        backInOut2.overshoot = custom;
        return backInOut2;
      }(overshoot);
      var tau = 2 * Math.PI, amplitude = 1, period = 0.3;
      var elasticIn = function custom(a, p) {
        var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
        function elasticIn2(t) {
          return a * tpmt(- --t) * Math.sin((s - t) / p);
        }
        elasticIn2.amplitude = function(a2) {
          return custom(a2, p * tau);
        };
        elasticIn2.period = function(p2) {
          return custom(a, p2);
        };
        return elasticIn2;
      }(amplitude, period);
      var elasticOut = function custom(a, p) {
        var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
        function elasticOut2(t) {
          return 1 - a * tpmt(t = +t) * Math.sin((t + s) / p);
        }
        elasticOut2.amplitude = function(a2) {
          return custom(a2, p * tau);
        };
        elasticOut2.period = function(p2) {
          return custom(a, p2);
        };
        return elasticOut2;
      }(amplitude, period);
      var elasticInOut = function custom(a, p) {
        var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
        function elasticInOut2(t) {
          return ((t = t * 2 - 1) < 0 ? a * tpmt(-t) * Math.sin((s - t) / p) : 2 - a * tpmt(t) * Math.sin((s + t) / p)) / 2;
        }
        elasticInOut2.amplitude = function(a2) {
          return custom(a2, p * tau);
        };
        elasticInOut2.period = function(p2) {
          return custom(a, p2);
        };
        return elasticInOut2;
      }(amplitude, period);
      exports2.easeBack = backInOut;
      exports2.easeBackIn = backIn;
      exports2.easeBackInOut = backInOut;
      exports2.easeBackOut = backOut;
      exports2.easeBounce = bounceOut;
      exports2.easeBounceIn = bounceIn;
      exports2.easeBounceInOut = bounceInOut;
      exports2.easeBounceOut = bounceOut;
      exports2.easeCircle = circleInOut;
      exports2.easeCircleIn = circleIn;
      exports2.easeCircleInOut = circleInOut;
      exports2.easeCircleOut = circleOut;
      exports2.easeCubic = cubicInOut;
      exports2.easeCubicIn = cubicIn;
      exports2.easeCubicInOut = cubicInOut;
      exports2.easeCubicOut = cubicOut;
      exports2.easeElastic = elasticOut;
      exports2.easeElasticIn = elasticIn;
      exports2.easeElasticInOut = elasticInOut;
      exports2.easeElasticOut = elasticOut;
      exports2.easeExp = expInOut;
      exports2.easeExpIn = expIn;
      exports2.easeExpInOut = expInOut;
      exports2.easeExpOut = expOut;
      exports2.easeLinear = linear;
      exports2.easePoly = polyInOut;
      exports2.easePolyIn = polyIn;
      exports2.easePolyInOut = polyInOut;
      exports2.easePolyOut = polyOut;
      exports2.easeQuad = quadInOut;
      exports2.easeQuadIn = quadIn;
      exports2.easeQuadInOut = quadInOut;
      exports2.easeQuadOut = quadOut;
      exports2.easeSin = sinInOut;
      exports2.easeSinIn = sinIn;
      exports2.easeSinInOut = sinInOut;
      exports2.easeSinOut = sinOut;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-transition/dist/d3-transition.js
  var require_d3_transition = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_d3_selection(), require_d3_dispatch(), require_d3_timer(), require_d3_interpolate(), require_d3_color(), require_d3_ease()) : typeof define === "function" && define.amd ? define(["exports", "d3-selection", "d3-dispatch", "d3-timer", "d3-interpolate", "d3-color", "d3-ease"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3));
    })(exports, function(exports2, d3Selection, d3Dispatch, d3Timer, d3Interpolate, d3Color, d3Ease) {
      "use strict";
      var emptyOn = d3Dispatch.dispatch("start", "end", "cancel", "interrupt");
      var emptyTween = [];
      var CREATED = 0;
      var SCHEDULED = 1;
      var STARTING = 2;
      var STARTED = 3;
      var RUNNING = 4;
      var ENDING = 5;
      var ENDED = 6;
      function schedule(node, name, id2, index, group, timing) {
        var schedules = node.__transition;
        if (!schedules)
          node.__transition = {};
        else if (id2 in schedules)
          return;
        create(node, id2, {
          name,
          index,
          group,
          on: emptyOn,
          tween: emptyTween,
          time: timing.time,
          delay: timing.delay,
          duration: timing.duration,
          ease: timing.ease,
          timer: null,
          state: CREATED
        });
      }
      function init(node, id2) {
        var schedule2 = get(node, id2);
        if (schedule2.state > CREATED)
          throw new Error("too late; already scheduled");
        return schedule2;
      }
      function set(node, id2) {
        var schedule2 = get(node, id2);
        if (schedule2.state > STARTED)
          throw new Error("too late; already running");
        return schedule2;
      }
      function get(node, id2) {
        var schedule2 = node.__transition;
        if (!schedule2 || !(schedule2 = schedule2[id2]))
          throw new Error("transition not found");
        return schedule2;
      }
      function create(node, id2, self2) {
        var schedules = node.__transition, tween;
        schedules[id2] = self2;
        self2.timer = d3Timer.timer(schedule2, 0, self2.time);
        function schedule2(elapsed) {
          self2.state = SCHEDULED;
          self2.timer.restart(start2, self2.delay, self2.time);
          if (self2.delay <= elapsed)
            start2(elapsed - self2.delay);
        }
        function start2(elapsed) {
          var i, j, n, o;
          if (self2.state !== SCHEDULED)
            return stop();
          for (i in schedules) {
            o = schedules[i];
            if (o.name !== self2.name)
              continue;
            if (o.state === STARTED)
              return d3Timer.timeout(start2);
            if (o.state === RUNNING) {
              o.state = ENDED;
              o.timer.stop();
              o.on.call("interrupt", node, node.__data__, o.index, o.group);
              delete schedules[i];
            } else if (+i < id2) {
              o.state = ENDED;
              o.timer.stop();
              o.on.call("cancel", node, node.__data__, o.index, o.group);
              delete schedules[i];
            }
          }
          d3Timer.timeout(function() {
            if (self2.state === STARTED) {
              self2.state = RUNNING;
              self2.timer.restart(tick, self2.delay, self2.time);
              tick(elapsed);
            }
          });
          self2.state = STARTING;
          self2.on.call("start", node, node.__data__, self2.index, self2.group);
          if (self2.state !== STARTING)
            return;
          self2.state = STARTED;
          tween = new Array(n = self2.tween.length);
          for (i = 0, j = -1; i < n; ++i) {
            if (o = self2.tween[i].value.call(node, node.__data__, self2.index, self2.group)) {
              tween[++j] = o;
            }
          }
          tween.length = j + 1;
        }
        function tick(elapsed) {
          var t = elapsed < self2.duration ? self2.ease.call(null, elapsed / self2.duration) : (self2.timer.restart(stop), self2.state = ENDING, 1), i = -1, n = tween.length;
          while (++i < n) {
            tween[i].call(node, t);
          }
          if (self2.state === ENDING) {
            self2.on.call("end", node, node.__data__, self2.index, self2.group);
            stop();
          }
        }
        function stop() {
          self2.state = ENDED;
          self2.timer.stop();
          delete schedules[id2];
          for (var i in schedules)
            return;
          delete node.__transition;
        }
      }
      function interrupt(node, name) {
        var schedules = node.__transition, schedule2, active2, empty = true, i;
        if (!schedules)
          return;
        name = name == null ? null : name + "";
        for (i in schedules) {
          if ((schedule2 = schedules[i]).name !== name) {
            empty = false;
            continue;
          }
          active2 = schedule2.state > STARTING && schedule2.state < ENDING;
          schedule2.state = ENDED;
          schedule2.timer.stop();
          schedule2.on.call(active2 ? "interrupt" : "cancel", node, node.__data__, schedule2.index, schedule2.group);
          delete schedules[i];
        }
        if (empty)
          delete node.__transition;
      }
      function selection_interrupt(name) {
        return this.each(function() {
          interrupt(this, name);
        });
      }
      function tweenRemove(id2, name) {
        var tween0, tween1;
        return function() {
          var schedule2 = set(this, id2), tween = schedule2.tween;
          if (tween !== tween0) {
            tween1 = tween0 = tween;
            for (var i = 0, n = tween1.length; i < n; ++i) {
              if (tween1[i].name === name) {
                tween1 = tween1.slice();
                tween1.splice(i, 1);
                break;
              }
            }
          }
          schedule2.tween = tween1;
        };
      }
      function tweenFunction(id2, name, value) {
        var tween0, tween1;
        if (typeof value !== "function")
          throw new Error();
        return function() {
          var schedule2 = set(this, id2), tween = schedule2.tween;
          if (tween !== tween0) {
            tween1 = (tween0 = tween).slice();
            for (var t = {name, value}, i = 0, n = tween1.length; i < n; ++i) {
              if (tween1[i].name === name) {
                tween1[i] = t;
                break;
              }
            }
            if (i === n)
              tween1.push(t);
          }
          schedule2.tween = tween1;
        };
      }
      function transition_tween(name, value) {
        var id2 = this._id;
        name += "";
        if (arguments.length < 2) {
          var tween = get(this.node(), id2).tween;
          for (var i = 0, n = tween.length, t; i < n; ++i) {
            if ((t = tween[i]).name === name) {
              return t.value;
            }
          }
          return null;
        }
        return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
      }
      function tweenValue(transition2, name, value) {
        var id2 = transition2._id;
        transition2.each(function() {
          var schedule2 = set(this, id2);
          (schedule2.value || (schedule2.value = {}))[name] = value.apply(this, arguments);
        });
        return function(node) {
          return get(node, id2).value[name];
        };
      }
      function interpolate(a, b) {
        var c;
        return (typeof b === "number" ? d3Interpolate.interpolateNumber : b instanceof d3Color.color ? d3Interpolate.interpolateRgb : (c = d3Color.color(b)) ? (b = c, d3Interpolate.interpolateRgb) : d3Interpolate.interpolateString)(a, b);
      }
      function attrRemove(name) {
        return function() {
          this.removeAttribute(name);
        };
      }
      function attrRemoveNS(fullname) {
        return function() {
          this.removeAttributeNS(fullname.space, fullname.local);
        };
      }
      function attrConstant(name, interpolate2, value1) {
        var string00, string1 = value1 + "", interpolate0;
        return function() {
          var string0 = this.getAttribute(name);
          return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
        };
      }
      function attrConstantNS(fullname, interpolate2, value1) {
        var string00, string1 = value1 + "", interpolate0;
        return function() {
          var string0 = this.getAttributeNS(fullname.space, fullname.local);
          return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
        };
      }
      function attrFunction(name, interpolate2, value) {
        var string00, string10, interpolate0;
        return function() {
          var string0, value1 = value(this), string1;
          if (value1 == null)
            return void this.removeAttribute(name);
          string0 = this.getAttribute(name);
          string1 = value1 + "";
          return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
        };
      }
      function attrFunctionNS(fullname, interpolate2, value) {
        var string00, string10, interpolate0;
        return function() {
          var string0, value1 = value(this), string1;
          if (value1 == null)
            return void this.removeAttributeNS(fullname.space, fullname.local);
          string0 = this.getAttributeNS(fullname.space, fullname.local);
          string1 = value1 + "";
          return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
        };
      }
      function transition_attr(name, value) {
        var fullname = d3Selection.namespace(name), i = fullname === "transform" ? d3Interpolate.interpolateTransformSvg : interpolate;
        return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
      }
      function attrInterpolate(name, i) {
        return function(t) {
          this.setAttribute(name, i.call(this, t));
        };
      }
      function attrInterpolateNS(fullname, i) {
        return function(t) {
          this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
        };
      }
      function attrTweenNS(fullname, value) {
        var t0, i0;
        function tween() {
          var i = value.apply(this, arguments);
          if (i !== i0)
            t0 = (i0 = i) && attrInterpolateNS(fullname, i);
          return t0;
        }
        tween._value = value;
        return tween;
      }
      function attrTween(name, value) {
        var t0, i0;
        function tween() {
          var i = value.apply(this, arguments);
          if (i !== i0)
            t0 = (i0 = i) && attrInterpolate(name, i);
          return t0;
        }
        tween._value = value;
        return tween;
      }
      function transition_attrTween(name, value) {
        var key = "attr." + name;
        if (arguments.length < 2)
          return (key = this.tween(key)) && key._value;
        if (value == null)
          return this.tween(key, null);
        if (typeof value !== "function")
          throw new Error();
        var fullname = d3Selection.namespace(name);
        return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
      }
      function delayFunction(id2, value) {
        return function() {
          init(this, id2).delay = +value.apply(this, arguments);
        };
      }
      function delayConstant(id2, value) {
        return value = +value, function() {
          init(this, id2).delay = value;
        };
      }
      function transition_delay(value) {
        var id2 = this._id;
        return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get(this.node(), id2).delay;
      }
      function durationFunction(id2, value) {
        return function() {
          set(this, id2).duration = +value.apply(this, arguments);
        };
      }
      function durationConstant(id2, value) {
        return value = +value, function() {
          set(this, id2).duration = value;
        };
      }
      function transition_duration(value) {
        var id2 = this._id;
        return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get(this.node(), id2).duration;
      }
      function easeConstant(id2, value) {
        if (typeof value !== "function")
          throw new Error();
        return function() {
          set(this, id2).ease = value;
        };
      }
      function transition_ease(value) {
        var id2 = this._id;
        return arguments.length ? this.each(easeConstant(id2, value)) : get(this.node(), id2).ease;
      }
      function easeVarying(id2, value) {
        return function() {
          var v = value.apply(this, arguments);
          if (typeof v !== "function")
            throw new Error();
          set(this, id2).ease = v;
        };
      }
      function transition_easeVarying(value) {
        if (typeof value !== "function")
          throw new Error();
        return this.each(easeVarying(this._id, value));
      }
      function transition_filter(match) {
        if (typeof match !== "function")
          match = d3Selection.matcher(match);
        for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
          for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
            if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
              subgroup.push(node);
            }
          }
        }
        return new Transition(subgroups, this._parents, this._name, this._id);
      }
      function transition_merge(transition2) {
        if (transition2._id !== this._id)
          throw new Error();
        for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
          for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
            if (node = group0[i] || group1[i]) {
              merge[i] = node;
            }
          }
        }
        for (; j < m0; ++j) {
          merges[j] = groups0[j];
        }
        return new Transition(merges, this._parents, this._name, this._id);
      }
      function start(name) {
        return (name + "").trim().split(/^|\s+/).every(function(t) {
          var i = t.indexOf(".");
          if (i >= 0)
            t = t.slice(0, i);
          return !t || t === "start";
        });
      }
      function onFunction(id2, name, listener) {
        var on0, on1, sit = start(name) ? init : set;
        return function() {
          var schedule2 = sit(this, id2), on = schedule2.on;
          if (on !== on0)
            (on1 = (on0 = on).copy()).on(name, listener);
          schedule2.on = on1;
        };
      }
      function transition_on(name, listener) {
        var id2 = this._id;
        return arguments.length < 2 ? get(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
      }
      function removeFunction(id2) {
        return function() {
          var parent = this.parentNode;
          for (var i in this.__transition)
            if (+i !== id2)
              return;
          if (parent)
            parent.removeChild(this);
        };
      }
      function transition_remove() {
        return this.on("end.remove", removeFunction(this._id));
      }
      function transition_select(select) {
        var name = this._name, id2 = this._id;
        if (typeof select !== "function")
          select = d3Selection.selector(select);
        for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
          for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
            if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
              if ("__data__" in node)
                subnode.__data__ = node.__data__;
              subgroup[i] = subnode;
              schedule(subgroup[i], name, id2, i, subgroup, get(node, id2));
            }
          }
        }
        return new Transition(subgroups, this._parents, name, id2);
      }
      function transition_selectAll(select) {
        var name = this._name, id2 = this._id;
        if (typeof select !== "function")
          select = d3Selection.selectorAll(select);
        for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
          for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
            if (node = group[i]) {
              for (var children = select.call(node, node.__data__, i, group), child, inherit2 = get(node, id2), k = 0, l = children.length; k < l; ++k) {
                if (child = children[k]) {
                  schedule(child, name, id2, k, children, inherit2);
                }
              }
              subgroups.push(children);
              parents.push(node);
            }
          }
        }
        return new Transition(subgroups, parents, name, id2);
      }
      var Selection = d3Selection.selection.prototype.constructor;
      function transition_selection() {
        return new Selection(this._groups, this._parents);
      }
      function styleNull(name, interpolate2) {
        var string00, string10, interpolate0;
        return function() {
          var string0 = d3Selection.style(this, name), string1 = (this.style.removeProperty(name), d3Selection.style(this, name));
          return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, string10 = string1);
        };
      }
      function styleRemove(name) {
        return function() {
          this.style.removeProperty(name);
        };
      }
      function styleConstant(name, interpolate2, value1) {
        var string00, string1 = value1 + "", interpolate0;
        return function() {
          var string0 = d3Selection.style(this, name);
          return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
        };
      }
      function styleFunction(name, interpolate2, value) {
        var string00, string10, interpolate0;
        return function() {
          var string0 = d3Selection.style(this, name), value1 = value(this), string1 = value1 + "";
          if (value1 == null)
            string1 = value1 = (this.style.removeProperty(name), d3Selection.style(this, name));
          return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
        };
      }
      function styleMaybeRemove(id2, name) {
        var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
        return function() {
          var schedule2 = set(this, id2), on = schedule2.on, listener = schedule2.value[key] == null ? remove || (remove = styleRemove(name)) : void 0;
          if (on !== on0 || listener0 !== listener)
            (on1 = (on0 = on).copy()).on(event, listener0 = listener);
          schedule2.on = on1;
        };
      }
      function transition_style(name, value, priority) {
        var i = (name += "") === "transform" ? d3Interpolate.interpolateTransformCss : interpolate;
        return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove(name)) : typeof value === "function" ? this.styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant(name, i, value), priority).on("end.style." + name, null);
      }
      function styleInterpolate(name, i, priority) {
        return function(t) {
          this.style.setProperty(name, i.call(this, t), priority);
        };
      }
      function styleTween(name, value, priority) {
        var t, i0;
        function tween() {
          var i = value.apply(this, arguments);
          if (i !== i0)
            t = (i0 = i) && styleInterpolate(name, i, priority);
          return t;
        }
        tween._value = value;
        return tween;
      }
      function transition_styleTween(name, value, priority) {
        var key = "style." + (name += "");
        if (arguments.length < 2)
          return (key = this.tween(key)) && key._value;
        if (value == null)
          return this.tween(key, null);
        if (typeof value !== "function")
          throw new Error();
        return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
      }
      function textConstant(value) {
        return function() {
          this.textContent = value;
        };
      }
      function textFunction(value) {
        return function() {
          var value1 = value(this);
          this.textContent = value1 == null ? "" : value1;
        };
      }
      function transition_text(value) {
        return this.tween("text", typeof value === "function" ? textFunction(tweenValue(this, "text", value)) : textConstant(value == null ? "" : value + ""));
      }
      function textInterpolate(i) {
        return function(t) {
          this.textContent = i.call(this, t);
        };
      }
      function textTween(value) {
        var t0, i0;
        function tween() {
          var i = value.apply(this, arguments);
          if (i !== i0)
            t0 = (i0 = i) && textInterpolate(i);
          return t0;
        }
        tween._value = value;
        return tween;
      }
      function transition_textTween(value) {
        var key = "text";
        if (arguments.length < 1)
          return (key = this.tween(key)) && key._value;
        if (value == null)
          return this.tween(key, null);
        if (typeof value !== "function")
          throw new Error();
        return this.tween(key, textTween(value));
      }
      function transition_transition() {
        var name = this._name, id0 = this._id, id1 = newId();
        for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
          for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
            if (node = group[i]) {
              var inherit2 = get(node, id0);
              schedule(node, name, id1, i, group, {
                time: inherit2.time + inherit2.delay + inherit2.duration,
                delay: 0,
                duration: inherit2.duration,
                ease: inherit2.ease
              });
            }
          }
        }
        return new Transition(groups, this._parents, name, id1);
      }
      function transition_end() {
        var on0, on1, that = this, id2 = that._id, size = that.size();
        return new Promise(function(resolve, reject) {
          var cancel = {value: reject}, end = {value: function() {
            if (--size === 0)
              resolve();
          }};
          that.each(function() {
            var schedule2 = set(this, id2), on = schedule2.on;
            if (on !== on0) {
              on1 = (on0 = on).copy();
              on1._.cancel.push(cancel);
              on1._.interrupt.push(cancel);
              on1._.end.push(end);
            }
            schedule2.on = on1;
          });
          if (size === 0)
            resolve();
        });
      }
      var id = 0;
      function Transition(groups, parents, name, id2) {
        this._groups = groups;
        this._parents = parents;
        this._name = name;
        this._id = id2;
      }
      function transition(name) {
        return d3Selection.selection().transition(name);
      }
      function newId() {
        return ++id;
      }
      var selection_prototype = d3Selection.selection.prototype;
      Transition.prototype = transition.prototype = {
        constructor: Transition,
        select: transition_select,
        selectAll: transition_selectAll,
        filter: transition_filter,
        merge: transition_merge,
        selection: transition_selection,
        transition: transition_transition,
        call: selection_prototype.call,
        nodes: selection_prototype.nodes,
        node: selection_prototype.node,
        size: selection_prototype.size,
        empty: selection_prototype.empty,
        each: selection_prototype.each,
        on: transition_on,
        attr: transition_attr,
        attrTween: transition_attrTween,
        style: transition_style,
        styleTween: transition_styleTween,
        text: transition_text,
        textTween: transition_textTween,
        remove: transition_remove,
        tween: transition_tween,
        delay: transition_delay,
        duration: transition_duration,
        ease: transition_ease,
        easeVarying: transition_easeVarying,
        end: transition_end,
        [Symbol.iterator]: selection_prototype[Symbol.iterator]
      };
      var defaultTiming = {
        time: null,
        delay: 0,
        duration: 250,
        ease: d3Ease.easeCubicInOut
      };
      function inherit(node, id2) {
        var timing;
        while (!(timing = node.__transition) || !(timing = timing[id2])) {
          if (!(node = node.parentNode)) {
            throw new Error(`transition ${id2} not found`);
          }
        }
        return timing;
      }
      function selection_transition(name) {
        var id2, timing;
        if (name instanceof Transition) {
          id2 = name._id, name = name._name;
        } else {
          id2 = newId(), (timing = defaultTiming).time = d3Timer.now(), name = name == null ? null : name + "";
        }
        for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
          for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
            if (node = group[i]) {
              schedule(node, name, id2, i, group, timing || inherit(node, id2));
            }
          }
        }
        return new Transition(groups, this._parents, name, id2);
      }
      d3Selection.selection.prototype.interrupt = selection_interrupt;
      d3Selection.selection.prototype.transition = selection_transition;
      var root = [null];
      function active(node, name) {
        var schedules = node.__transition, schedule2, i;
        if (schedules) {
          name = name == null ? null : name + "";
          for (i in schedules) {
            if ((schedule2 = schedules[i]).state > SCHEDULED && schedule2.name === name) {
              return new Transition([[node]], root, name, +i);
            }
          }
        }
        return null;
      }
      exports2.active = active;
      exports2.interrupt = interrupt;
      exports2.transition = transition;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-brush/dist/d3-brush.js
  var require_d3_brush = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_d3_dispatch(), require_d3_drag(), require_d3_interpolate(), require_d3_selection(), require_d3_transition()) : typeof define === "function" && define.amd ? define(["exports", "d3-dispatch", "d3-drag", "d3-interpolate", "d3-selection", "d3-transition"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}, global.d3, global.d3, global.d3, global.d3, global.d3));
    })(exports, function(exports2, d3Dispatch, d3Drag, d3Interpolate, d3Selection, d3Transition) {
      "use strict";
      var constant = (x) => () => x;
      function BrushEvent(type2, {
        sourceEvent,
        target,
        selection,
        mode,
        dispatch
      }) {
        Object.defineProperties(this, {
          type: {value: type2, enumerable: true, configurable: true},
          sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
          target: {value: target, enumerable: true, configurable: true},
          selection: {value: selection, enumerable: true, configurable: true},
          mode: {value: mode, enumerable: true, configurable: true},
          _: {value: dispatch}
        });
      }
      function nopropagation(event) {
        event.stopImmediatePropagation();
      }
      function noevent(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      var MODE_DRAG = {name: "drag"}, MODE_SPACE = {name: "space"}, MODE_HANDLE = {name: "handle"}, MODE_CENTER = {name: "center"};
      const {abs, max, min} = Math;
      function number1(e) {
        return [+e[0], +e[1]];
      }
      function number2(e) {
        return [number1(e[0]), number1(e[1])];
      }
      var X = {
        name: "x",
        handles: ["w", "e"].map(type),
        input: function(x, e) {
          return x == null ? null : [[+x[0], e[0][1]], [+x[1], e[1][1]]];
        },
        output: function(xy) {
          return xy && [xy[0][0], xy[1][0]];
        }
      };
      var Y = {
        name: "y",
        handles: ["n", "s"].map(type),
        input: function(y, e) {
          return y == null ? null : [[e[0][0], +y[0]], [e[1][0], +y[1]]];
        },
        output: function(xy) {
          return xy && [xy[0][1], xy[1][1]];
        }
      };
      var XY = {
        name: "xy",
        handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
        input: function(xy) {
          return xy == null ? null : number2(xy);
        },
        output: function(xy) {
          return xy;
        }
      };
      var cursors = {
        overlay: "crosshair",
        selection: "move",
        n: "ns-resize",
        e: "ew-resize",
        s: "ns-resize",
        w: "ew-resize",
        nw: "nwse-resize",
        ne: "nesw-resize",
        se: "nwse-resize",
        sw: "nesw-resize"
      };
      var flipX = {
        e: "w",
        w: "e",
        nw: "ne",
        ne: "nw",
        se: "sw",
        sw: "se"
      };
      var flipY = {
        n: "s",
        s: "n",
        nw: "sw",
        ne: "se",
        se: "ne",
        sw: "nw"
      };
      var signsX = {
        overlay: 1,
        selection: 1,
        n: null,
        e: 1,
        s: null,
        w: -1,
        nw: -1,
        ne: 1,
        se: 1,
        sw: -1
      };
      var signsY = {
        overlay: 1,
        selection: 1,
        n: -1,
        e: null,
        s: 1,
        w: null,
        nw: -1,
        ne: -1,
        se: 1,
        sw: 1
      };
      function type(t) {
        return {type: t};
      }
      function defaultFilter(event) {
        return !event.ctrlKey && !event.button;
      }
      function defaultExtent() {
        var svg = this.ownerSVGElement || this;
        if (svg.hasAttribute("viewBox")) {
          svg = svg.viewBox.baseVal;
          return [[svg.x, svg.y], [svg.x + svg.width, svg.y + svg.height]];
        }
        return [[0, 0], [svg.width.baseVal.value, svg.height.baseVal.value]];
      }
      function defaultTouchable() {
        return navigator.maxTouchPoints || "ontouchstart" in this;
      }
      function local(node) {
        while (!node.__brush)
          if (!(node = node.parentNode))
            return;
        return node.__brush;
      }
      function empty(extent) {
        return extent[0][0] === extent[1][0] || extent[0][1] === extent[1][1];
      }
      function brushSelection(node) {
        var state = node.__brush;
        return state ? state.dim.output(state.selection) : null;
      }
      function brushX() {
        return brush$1(X);
      }
      function brushY() {
        return brush$1(Y);
      }
      function brush() {
        return brush$1(XY);
      }
      function brush$1(dim) {
        var extent = defaultExtent, filter = defaultFilter, touchable = defaultTouchable, keys = true, listeners = d3Dispatch.dispatch("start", "brush", "end"), handleSize = 6, touchending;
        function brush2(group) {
          var overlay = group.property("__brush", initialize).selectAll(".overlay").data([type("overlay")]);
          overlay.enter().append("rect").attr("class", "overlay").attr("pointer-events", "all").attr("cursor", cursors.overlay).merge(overlay).each(function() {
            var extent2 = local(this).extent;
            d3Selection.select(this).attr("x", extent2[0][0]).attr("y", extent2[0][1]).attr("width", extent2[1][0] - extent2[0][0]).attr("height", extent2[1][1] - extent2[0][1]);
          });
          group.selectAll(".selection").data([type("selection")]).enter().append("rect").attr("class", "selection").attr("cursor", cursors.selection).attr("fill", "#777").attr("fill-opacity", 0.3).attr("stroke", "#fff").attr("shape-rendering", "crispEdges");
          var handle = group.selectAll(".handle").data(dim.handles, function(d) {
            return d.type;
          });
          handle.exit().remove();
          handle.enter().append("rect").attr("class", function(d) {
            return "handle handle--" + d.type;
          }).attr("cursor", function(d) {
            return cursors[d.type];
          });
          group.each(redraw).attr("fill", "none").attr("pointer-events", "all").on("mousedown.brush", started).filter(touchable).on("touchstart.brush", started).on("touchmove.brush", touchmoved).on("touchend.brush touchcancel.brush", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
        }
        brush2.move = function(group, selection) {
          if (group.tween) {
            group.on("start.brush", function(event) {
              emitter(this, arguments).beforestart().start(event);
            }).on("interrupt.brush end.brush", function(event) {
              emitter(this, arguments).end(event);
            }).tween("brush", function() {
              var that = this, state = that.__brush, emit = emitter(that, arguments), selection0 = state.selection, selection1 = dim.input(typeof selection === "function" ? selection.apply(this, arguments) : selection, state.extent), i = d3Interpolate.interpolate(selection0, selection1);
              function tween(t) {
                state.selection = t === 1 && selection1 === null ? null : i(t);
                redraw.call(that);
                emit.brush();
              }
              return selection0 !== null && selection1 !== null ? tween : tween(1);
            });
          } else {
            group.each(function() {
              var that = this, args = arguments, state = that.__brush, selection1 = dim.input(typeof selection === "function" ? selection.apply(that, args) : selection, state.extent), emit = emitter(that, args).beforestart();
              d3Transition.interrupt(that);
              state.selection = selection1 === null ? null : selection1;
              redraw.call(that);
              emit.start().brush().end();
            });
          }
        };
        brush2.clear = function(group) {
          brush2.move(group, null);
        };
        function redraw() {
          var group = d3Selection.select(this), selection = local(this).selection;
          if (selection) {
            group.selectAll(".selection").style("display", null).attr("x", selection[0][0]).attr("y", selection[0][1]).attr("width", selection[1][0] - selection[0][0]).attr("height", selection[1][1] - selection[0][1]);
            group.selectAll(".handle").style("display", null).attr("x", function(d) {
              return d.type[d.type.length - 1] === "e" ? selection[1][0] - handleSize / 2 : selection[0][0] - handleSize / 2;
            }).attr("y", function(d) {
              return d.type[0] === "s" ? selection[1][1] - handleSize / 2 : selection[0][1] - handleSize / 2;
            }).attr("width", function(d) {
              return d.type === "n" || d.type === "s" ? selection[1][0] - selection[0][0] + handleSize : handleSize;
            }).attr("height", function(d) {
              return d.type === "e" || d.type === "w" ? selection[1][1] - selection[0][1] + handleSize : handleSize;
            });
          } else {
            group.selectAll(".selection,.handle").style("display", "none").attr("x", null).attr("y", null).attr("width", null).attr("height", null);
          }
        }
        function emitter(that, args, clean) {
          var emit = that.__brush.emitter;
          return emit && (!clean || !emit.clean) ? emit : new Emitter(that, args, clean);
        }
        function Emitter(that, args, clean) {
          this.that = that;
          this.args = args;
          this.state = that.__brush;
          this.active = 0;
          this.clean = clean;
        }
        Emitter.prototype = {
          beforestart: function() {
            if (++this.active === 1)
              this.state.emitter = this, this.starting = true;
            return this;
          },
          start: function(event, mode) {
            if (this.starting)
              this.starting = false, this.emit("start", event, mode);
            else
              this.emit("brush", event);
            return this;
          },
          brush: function(event, mode) {
            this.emit("brush", event, mode);
            return this;
          },
          end: function(event, mode) {
            if (--this.active === 0)
              delete this.state.emitter, this.emit("end", event, mode);
            return this;
          },
          emit: function(type2, event, mode) {
            var d = d3Selection.select(this.that).datum();
            listeners.call(type2, this.that, new BrushEvent(type2, {
              sourceEvent: event,
              target: brush2,
              selection: dim.output(this.state.selection),
              mode,
              dispatch: listeners
            }), d);
          }
        };
        function started(event) {
          if (touchending && !event.touches)
            return;
          if (!filter.apply(this, arguments))
            return;
          var that = this, type2 = event.target.__data__.type, mode = (keys && event.metaKey ? type2 = "overlay" : type2) === "selection" ? MODE_DRAG : keys && event.altKey ? MODE_CENTER : MODE_HANDLE, signX = dim === Y ? null : signsX[type2], signY = dim === X ? null : signsY[type2], state = local(that), extent2 = state.extent, selection = state.selection, W = extent2[0][0], w0, w1, N = extent2[0][1], n0, n1, E = extent2[1][0], e0, e1, S = extent2[1][1], s0, s1, dx = 0, dy = 0, moving, shifting = signX && signY && keys && event.shiftKey, lockX, lockY, points = Array.from(event.touches || [event], (t) => {
            const i = t.identifier;
            t = d3Selection.pointer(t, that);
            t.point0 = t.slice();
            t.identifier = i;
            return t;
          });
          if (type2 === "overlay") {
            if (selection)
              moving = true;
            const pts = [points[0], points[1] || points[0]];
            state.selection = selection = [[
              w0 = dim === Y ? W : min(pts[0][0], pts[1][0]),
              n0 = dim === X ? N : min(pts[0][1], pts[1][1])
            ], [
              e0 = dim === Y ? E : max(pts[0][0], pts[1][0]),
              s0 = dim === X ? S : max(pts[0][1], pts[1][1])
            ]];
            if (points.length > 1)
              move();
          } else {
            w0 = selection[0][0];
            n0 = selection[0][1];
            e0 = selection[1][0];
            s0 = selection[1][1];
          }
          w1 = w0;
          n1 = n0;
          e1 = e0;
          s1 = s0;
          var group = d3Selection.select(that).attr("pointer-events", "none");
          var overlay = group.selectAll(".overlay").attr("cursor", cursors[type2]);
          d3Transition.interrupt(that);
          var emit = emitter(that, arguments, true).beforestart();
          if (event.touches) {
            emit.moved = moved;
            emit.ended = ended;
          } else {
            var view = d3Selection.select(event.view).on("mousemove.brush", moved, true).on("mouseup.brush", ended, true);
            if (keys)
              view.on("keydown.brush", keydowned, true).on("keyup.brush", keyupped, true);
            d3Drag.dragDisable(event.view);
          }
          redraw.call(that);
          emit.start(event, mode.name);
          function moved(event2) {
            for (const p of event2.changedTouches || [event2]) {
              for (const d of points)
                if (d.identifier === p.identifier)
                  d.cur = d3Selection.pointer(p, that);
            }
            if (shifting && !lockX && !lockY && points.length === 1) {
              const point = points[0];
              if (abs(point.cur[0] - point[0]) > abs(point.cur[1] - point[1]))
                lockY = true;
              else
                lockX = true;
            }
            for (const point of points)
              if (point.cur)
                point[0] = point.cur[0], point[1] = point.cur[1];
            moving = true;
            noevent(event2);
            move(event2);
          }
          function move(event2) {
            const point = points[0], point0 = point.point0;
            var t;
            dx = point[0] - point0[0];
            dy = point[1] - point0[1];
            switch (mode) {
              case MODE_SPACE:
              case MODE_DRAG: {
                if (signX)
                  dx = max(W - w0, min(E - e0, dx)), w1 = w0 + dx, e1 = e0 + dx;
                if (signY)
                  dy = max(N - n0, min(S - s0, dy)), n1 = n0 + dy, s1 = s0 + dy;
                break;
              }
              case MODE_HANDLE: {
                if (points[1]) {
                  if (signX)
                    w1 = max(W, min(E, points[0][0])), e1 = max(W, min(E, points[1][0])), signX = 1;
                  if (signY)
                    n1 = max(N, min(S, points[0][1])), s1 = max(N, min(S, points[1][1])), signY = 1;
                } else {
                  if (signX < 0)
                    dx = max(W - w0, min(E - w0, dx)), w1 = w0 + dx, e1 = e0;
                  else if (signX > 0)
                    dx = max(W - e0, min(E - e0, dx)), w1 = w0, e1 = e0 + dx;
                  if (signY < 0)
                    dy = max(N - n0, min(S - n0, dy)), n1 = n0 + dy, s1 = s0;
                  else if (signY > 0)
                    dy = max(N - s0, min(S - s0, dy)), n1 = n0, s1 = s0 + dy;
                }
                break;
              }
              case MODE_CENTER: {
                if (signX)
                  w1 = max(W, min(E, w0 - dx * signX)), e1 = max(W, min(E, e0 + dx * signX));
                if (signY)
                  n1 = max(N, min(S, n0 - dy * signY)), s1 = max(N, min(S, s0 + dy * signY));
                break;
              }
            }
            if (e1 < w1) {
              signX *= -1;
              t = w0, w0 = e0, e0 = t;
              t = w1, w1 = e1, e1 = t;
              if (type2 in flipX)
                overlay.attr("cursor", cursors[type2 = flipX[type2]]);
            }
            if (s1 < n1) {
              signY *= -1;
              t = n0, n0 = s0, s0 = t;
              t = n1, n1 = s1, s1 = t;
              if (type2 in flipY)
                overlay.attr("cursor", cursors[type2 = flipY[type2]]);
            }
            if (state.selection)
              selection = state.selection;
            if (lockX)
              w1 = selection[0][0], e1 = selection[1][0];
            if (lockY)
              n1 = selection[0][1], s1 = selection[1][1];
            if (selection[0][0] !== w1 || selection[0][1] !== n1 || selection[1][0] !== e1 || selection[1][1] !== s1) {
              state.selection = [[w1, n1], [e1, s1]];
              redraw.call(that);
              emit.brush(event2, mode.name);
            }
          }
          function ended(event2) {
            nopropagation(event2);
            if (event2.touches) {
              if (event2.touches.length)
                return;
              if (touchending)
                clearTimeout(touchending);
              touchending = setTimeout(function() {
                touchending = null;
              }, 500);
            } else {
              d3Drag.dragEnable(event2.view, moving);
              view.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
            }
            group.attr("pointer-events", "all");
            overlay.attr("cursor", cursors.overlay);
            if (state.selection)
              selection = state.selection;
            if (empty(selection))
              state.selection = null, redraw.call(that);
            emit.end(event2, mode.name);
          }
          function keydowned(event2) {
            switch (event2.keyCode) {
              case 16: {
                shifting = signX && signY;
                break;
              }
              case 18: {
                if (mode === MODE_HANDLE) {
                  if (signX)
                    e0 = e1 - dx * signX, w0 = w1 + dx * signX;
                  if (signY)
                    s0 = s1 - dy * signY, n0 = n1 + dy * signY;
                  mode = MODE_CENTER;
                  move();
                }
                break;
              }
              case 32: {
                if (mode === MODE_HANDLE || mode === MODE_CENTER) {
                  if (signX < 0)
                    e0 = e1 - dx;
                  else if (signX > 0)
                    w0 = w1 - dx;
                  if (signY < 0)
                    s0 = s1 - dy;
                  else if (signY > 0)
                    n0 = n1 - dy;
                  mode = MODE_SPACE;
                  overlay.attr("cursor", cursors.selection);
                  move();
                }
                break;
              }
              default:
                return;
            }
            noevent(event2);
          }
          function keyupped(event2) {
            switch (event2.keyCode) {
              case 16: {
                if (shifting) {
                  lockX = lockY = shifting = false;
                  move();
                }
                break;
              }
              case 18: {
                if (mode === MODE_CENTER) {
                  if (signX < 0)
                    e0 = e1;
                  else if (signX > 0)
                    w0 = w1;
                  if (signY < 0)
                    s0 = s1;
                  else if (signY > 0)
                    n0 = n1;
                  mode = MODE_HANDLE;
                  move();
                }
                break;
              }
              case 32: {
                if (mode === MODE_SPACE) {
                  if (event2.altKey) {
                    if (signX)
                      e0 = e1 - dx * signX, w0 = w1 + dx * signX;
                    if (signY)
                      s0 = s1 - dy * signY, n0 = n1 + dy * signY;
                    mode = MODE_CENTER;
                  } else {
                    if (signX < 0)
                      e0 = e1;
                    else if (signX > 0)
                      w0 = w1;
                    if (signY < 0)
                      s0 = s1;
                    else if (signY > 0)
                      n0 = n1;
                    mode = MODE_HANDLE;
                  }
                  overlay.attr("cursor", cursors[type2]);
                  move();
                }
                break;
              }
              default:
                return;
            }
            noevent(event2);
          }
        }
        function touchmoved(event) {
          emitter(this, arguments).moved(event);
        }
        function touchended(event) {
          emitter(this, arguments).ended(event);
        }
        function initialize() {
          var state = this.__brush || {selection: null};
          state.extent = number2(extent.apply(this, arguments));
          state.dim = dim;
          return state;
        }
        brush2.extent = function(_) {
          return arguments.length ? (extent = typeof _ === "function" ? _ : constant(number2(_)), brush2) : extent;
        };
        brush2.filter = function(_) {
          return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), brush2) : filter;
        };
        brush2.touchable = function(_) {
          return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), brush2) : touchable;
        };
        brush2.handleSize = function(_) {
          return arguments.length ? (handleSize = +_, brush2) : handleSize;
        };
        brush2.keyModifiers = function(_) {
          return arguments.length ? (keys = !!_, brush2) : keys;
        };
        brush2.on = function() {
          var value = listeners.on.apply(listeners, arguments);
          return value === listeners ? brush2 : value;
        };
        return brush2;
      }
      exports2.brush = brush;
      exports2.brushSelection = brushSelection;
      exports2.brushX = brushX;
      exports2.brushY = brushY;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-path/dist/d3-path.js
  var require_d3_path = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      const pi = Math.PI, tau = 2 * pi, epsilon = 1e-6, tauEpsilon = tau - epsilon;
      function Path() {
        this._x0 = this._y0 = this._x1 = this._y1 = null;
        this._ = "";
      }
      function path() {
        return new Path();
      }
      Path.prototype = path.prototype = {
        constructor: Path,
        moveTo: function(x, y) {
          this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
        },
        closePath: function() {
          if (this._x1 !== null) {
            this._x1 = this._x0, this._y1 = this._y0;
            this._ += "Z";
          }
        },
        lineTo: function(x, y) {
          this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
        },
        quadraticCurveTo: function(x1, y1, x, y) {
          this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
        },
        bezierCurveTo: function(x1, y1, x2, y2, x, y) {
          this._ += "C" + +x1 + "," + +y1 + "," + +x2 + "," + +y2 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
        },
        arcTo: function(x1, y1, x2, y2, r) {
          x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
          var x0 = this._x1, y0 = this._y1, x21 = x2 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
          if (r < 0)
            throw new Error("negative radius: " + r);
          if (this._x1 === null) {
            this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
          } else if (!(l01_2 > epsilon))
            ;
          else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
            this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
          } else {
            var x20 = x2 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
            if (Math.abs(t01 - 1) > epsilon) {
              this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
            }
            this._ += "A" + r + "," + r + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
          }
        },
        arc: function(x, y, r, a0, a1, ccw) {
          x = +x, y = +y, r = +r, ccw = !!ccw;
          var dx = r * Math.cos(a0), dy = r * Math.sin(a0), x0 = x + dx, y0 = y + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
          if (r < 0)
            throw new Error("negative radius: " + r);
          if (this._x1 === null) {
            this._ += "M" + x0 + "," + y0;
          } else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
            this._ += "L" + x0 + "," + y0;
          }
          if (!r)
            return;
          if (da < 0)
            da = da % tau + tau;
          if (da > tauEpsilon) {
            this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
          } else if (da > epsilon) {
            this._ += "A" + r + "," + r + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
          }
        },
        rect: function(x, y, w, h) {
          this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + +w + "v" + +h + "h" + -w + "Z";
        },
        toString: function() {
          return this._;
        }
      };
      exports2.path = path;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-chord/dist/d3-chord.js
  var require_d3_chord = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_d3_path()) : typeof define === "function" && define.amd ? define(["exports", "d3-path"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}, global.d3));
    })(exports, function(exports2, d3Path) {
      "use strict";
      var abs = Math.abs;
      var cos = Math.cos;
      var sin = Math.sin;
      var pi = Math.PI;
      var halfPi = pi / 2;
      var tau = pi * 2;
      var max = Math.max;
      var epsilon = 1e-12;
      function range(i, j) {
        return Array.from({length: j - i}, (_, k) => i + k);
      }
      function compareValue(compare) {
        return function(a, b) {
          return compare(a.source.value + a.target.value, b.source.value + b.target.value);
        };
      }
      function chord() {
        return chord$1(false, false);
      }
      function chordTranspose() {
        return chord$1(false, true);
      }
      function chordDirected() {
        return chord$1(true, false);
      }
      function chord$1(directed, transpose) {
        var padAngle = 0, sortGroups = null, sortSubgroups = null, sortChords = null;
        function chord2(matrix) {
          var n = matrix.length, groupSums = new Array(n), groupIndex = range(0, n), chords = new Array(n * n), groups = new Array(n), k = 0, dx;
          matrix = Float64Array.from({length: n * n}, transpose ? (_, i) => matrix[i % n][i / n | 0] : (_, i) => matrix[i / n | 0][i % n]);
          for (let i = 0; i < n; ++i) {
            let x = 0;
            for (let j = 0; j < n; ++j)
              x += matrix[i * n + j] + directed * matrix[j * n + i];
            k += groupSums[i] = x;
          }
          k = max(0, tau - padAngle * n) / k;
          dx = k ? padAngle : tau / n;
          {
            let x = 0;
            if (sortGroups)
              groupIndex.sort((a, b) => sortGroups(groupSums[a], groupSums[b]));
            for (const i of groupIndex) {
              const x0 = x;
              if (directed) {
                const subgroupIndex = range(~n + 1, n).filter((j) => j < 0 ? matrix[~j * n + i] : matrix[i * n + j]);
                if (sortSubgroups)
                  subgroupIndex.sort((a, b) => sortSubgroups(a < 0 ? -matrix[~a * n + i] : matrix[i * n + a], b < 0 ? -matrix[~b * n + i] : matrix[i * n + b]));
                for (const j of subgroupIndex) {
                  if (j < 0) {
                    const chord3 = chords[~j * n + i] || (chords[~j * n + i] = {source: null, target: null});
                    chord3.target = {index: i, startAngle: x, endAngle: x += matrix[~j * n + i] * k, value: matrix[~j * n + i]};
                  } else {
                    const chord3 = chords[i * n + j] || (chords[i * n + j] = {source: null, target: null});
                    chord3.source = {index: i, startAngle: x, endAngle: x += matrix[i * n + j] * k, value: matrix[i * n + j]};
                  }
                }
                groups[i] = {index: i, startAngle: x0, endAngle: x, value: groupSums[i]};
              } else {
                const subgroupIndex = range(0, n).filter((j) => matrix[i * n + j] || matrix[j * n + i]);
                if (sortSubgroups)
                  subgroupIndex.sort((a, b) => sortSubgroups(matrix[i * n + a], matrix[i * n + b]));
                for (const j of subgroupIndex) {
                  let chord3;
                  if (i < j) {
                    chord3 = chords[i * n + j] || (chords[i * n + j] = {source: null, target: null});
                    chord3.source = {index: i, startAngle: x, endAngle: x += matrix[i * n + j] * k, value: matrix[i * n + j]};
                  } else {
                    chord3 = chords[j * n + i] || (chords[j * n + i] = {source: null, target: null});
                    chord3.target = {index: i, startAngle: x, endAngle: x += matrix[i * n + j] * k, value: matrix[i * n + j]};
                    if (i === j)
                      chord3.source = chord3.target;
                  }
                  if (chord3.source && chord3.target && chord3.source.value < chord3.target.value) {
                    const source = chord3.source;
                    chord3.source = chord3.target;
                    chord3.target = source;
                  }
                }
                groups[i] = {index: i, startAngle: x0, endAngle: x, value: groupSums[i]};
              }
              x += dx;
            }
          }
          chords = Object.values(chords);
          chords.groups = groups;
          return sortChords ? chords.sort(sortChords) : chords;
        }
        chord2.padAngle = function(_) {
          return arguments.length ? (padAngle = max(0, _), chord2) : padAngle;
        };
        chord2.sortGroups = function(_) {
          return arguments.length ? (sortGroups = _, chord2) : sortGroups;
        };
        chord2.sortSubgroups = function(_) {
          return arguments.length ? (sortSubgroups = _, chord2) : sortSubgroups;
        };
        chord2.sortChords = function(_) {
          return arguments.length ? (_ == null ? sortChords = null : (sortChords = compareValue(_))._ = _, chord2) : sortChords && sortChords._;
        };
        return chord2;
      }
      var slice = Array.prototype.slice;
      function constant(x) {
        return function() {
          return x;
        };
      }
      function defaultSource(d) {
        return d.source;
      }
      function defaultTarget(d) {
        return d.target;
      }
      function defaultRadius(d) {
        return d.radius;
      }
      function defaultStartAngle(d) {
        return d.startAngle;
      }
      function defaultEndAngle(d) {
        return d.endAngle;
      }
      function defaultPadAngle() {
        return 0;
      }
      function defaultArrowheadRadius() {
        return 10;
      }
      function ribbon(headRadius) {
        var source = defaultSource, target = defaultTarget, sourceRadius = defaultRadius, targetRadius = defaultRadius, startAngle = defaultStartAngle, endAngle = defaultEndAngle, padAngle = defaultPadAngle, context = null;
        function ribbon2() {
          var buffer, s = source.apply(this, arguments), t = target.apply(this, arguments), ap = padAngle.apply(this, arguments) / 2, argv = slice.call(arguments), sr = +sourceRadius.apply(this, (argv[0] = s, argv)), sa0 = startAngle.apply(this, argv) - halfPi, sa1 = endAngle.apply(this, argv) - halfPi, tr = +targetRadius.apply(this, (argv[0] = t, argv)), ta0 = startAngle.apply(this, argv) - halfPi, ta1 = endAngle.apply(this, argv) - halfPi;
          if (!context)
            context = buffer = d3Path.path();
          if (ap > epsilon) {
            if (abs(sa1 - sa0) > ap * 2 + epsilon)
              sa1 > sa0 ? (sa0 += ap, sa1 -= ap) : (sa0 -= ap, sa1 += ap);
            else
              sa0 = sa1 = (sa0 + sa1) / 2;
            if (abs(ta1 - ta0) > ap * 2 + epsilon)
              ta1 > ta0 ? (ta0 += ap, ta1 -= ap) : (ta0 -= ap, ta1 += ap);
            else
              ta0 = ta1 = (ta0 + ta1) / 2;
          }
          context.moveTo(sr * cos(sa0), sr * sin(sa0));
          context.arc(0, 0, sr, sa0, sa1);
          if (sa0 !== ta0 || sa1 !== ta1) {
            if (headRadius) {
              var hr = +headRadius.apply(this, arguments), tr2 = tr - hr, ta2 = (ta0 + ta1) / 2;
              context.quadraticCurveTo(0, 0, tr2 * cos(ta0), tr2 * sin(ta0));
              context.lineTo(tr * cos(ta2), tr * sin(ta2));
              context.lineTo(tr2 * cos(ta1), tr2 * sin(ta1));
            } else {
              context.quadraticCurveTo(0, 0, tr * cos(ta0), tr * sin(ta0));
              context.arc(0, 0, tr, ta0, ta1);
            }
          }
          context.quadraticCurveTo(0, 0, sr * cos(sa0), sr * sin(sa0));
          context.closePath();
          if (buffer)
            return context = null, buffer + "" || null;
        }
        if (headRadius)
          ribbon2.headRadius = function(_) {
            return arguments.length ? (headRadius = typeof _ === "function" ? _ : constant(+_), ribbon2) : headRadius;
          };
        ribbon2.radius = function(_) {
          return arguments.length ? (sourceRadius = targetRadius = typeof _ === "function" ? _ : constant(+_), ribbon2) : sourceRadius;
        };
        ribbon2.sourceRadius = function(_) {
          return arguments.length ? (sourceRadius = typeof _ === "function" ? _ : constant(+_), ribbon2) : sourceRadius;
        };
        ribbon2.targetRadius = function(_) {
          return arguments.length ? (targetRadius = typeof _ === "function" ? _ : constant(+_), ribbon2) : targetRadius;
        };
        ribbon2.startAngle = function(_) {
          return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), ribbon2) : startAngle;
        };
        ribbon2.endAngle = function(_) {
          return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), ribbon2) : endAngle;
        };
        ribbon2.padAngle = function(_) {
          return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), ribbon2) : padAngle;
        };
        ribbon2.source = function(_) {
          return arguments.length ? (source = _, ribbon2) : source;
        };
        ribbon2.target = function(_) {
          return arguments.length ? (target = _, ribbon2) : target;
        };
        ribbon2.context = function(_) {
          return arguments.length ? (context = _ == null ? null : _, ribbon2) : context;
        };
        return ribbon2;
      }
      function ribbon$1() {
        return ribbon();
      }
      function ribbonArrow() {
        return ribbon(defaultArrowheadRadius);
      }
      exports2.chord = chord;
      exports2.chordDirected = chordDirected;
      exports2.chordTranspose = chordTranspose;
      exports2.ribbon = ribbon$1;
      exports2.ribbonArrow = ribbonArrow;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-contour/dist/d3-contour.js
  var require_d3_contour = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_d3_array()) : typeof define === "function" && define.amd ? define(["exports", "d3-array"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}, global.d3));
    })(exports, function(exports2, d3Array) {
      "use strict";
      var array = Array.prototype;
      var slice = array.slice;
      function ascending(a, b) {
        return a - b;
      }
      function area(ring) {
        var i = 0, n = ring.length, area2 = ring[n - 1][1] * ring[0][0] - ring[n - 1][0] * ring[0][1];
        while (++i < n)
          area2 += ring[i - 1][1] * ring[i][0] - ring[i - 1][0] * ring[i][1];
        return area2;
      }
      var constant = (x) => () => x;
      function contains(ring, hole) {
        var i = -1, n = hole.length, c;
        while (++i < n)
          if (c = ringContains(ring, hole[i]))
            return c;
        return 0;
      }
      function ringContains(ring, point) {
        var x = point[0], y = point[1], contains2 = -1;
        for (var i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
          var pi = ring[i], xi = pi[0], yi = pi[1], pj = ring[j], xj = pj[0], yj = pj[1];
          if (segmentContains(pi, pj, point))
            return 0;
          if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi)
            contains2 = -contains2;
        }
        return contains2;
      }
      function segmentContains(a, b, c) {
        var i;
        return collinear(a, b, c) && within(a[i = +(a[0] === b[0])], c[i], b[i]);
      }
      function collinear(a, b, c) {
        return (b[0] - a[0]) * (c[1] - a[1]) === (c[0] - a[0]) * (b[1] - a[1]);
      }
      function within(p, q, r) {
        return p <= q && q <= r || r <= q && q <= p;
      }
      function noop() {
      }
      var cases = [
        [],
        [[[1, 1.5], [0.5, 1]]],
        [[[1.5, 1], [1, 1.5]]],
        [[[1.5, 1], [0.5, 1]]],
        [[[1, 0.5], [1.5, 1]]],
        [[[1, 1.5], [0.5, 1]], [[1, 0.5], [1.5, 1]]],
        [[[1, 0.5], [1, 1.5]]],
        [[[1, 0.5], [0.5, 1]]],
        [[[0.5, 1], [1, 0.5]]],
        [[[1, 1.5], [1, 0.5]]],
        [[[0.5, 1], [1, 0.5]], [[1.5, 1], [1, 1.5]]],
        [[[1.5, 1], [1, 0.5]]],
        [[[0.5, 1], [1.5, 1]]],
        [[[1, 1.5], [1.5, 1]]],
        [[[0.5, 1], [1, 1.5]]],
        []
      ];
      function contours() {
        var dx = 1, dy = 1, threshold = d3Array.thresholdSturges, smooth = smoothLinear;
        function contours2(values) {
          var tz = threshold(values);
          if (!Array.isArray(tz)) {
            var domain = d3Array.extent(values), start = domain[0], stop = domain[1];
            tz = d3Array.tickStep(start, stop, tz);
            tz = d3Array.range(Math.floor(start / tz) * tz, Math.floor(stop / tz) * tz, tz);
          } else {
            tz = tz.slice().sort(ascending);
          }
          return tz.map(function(value) {
            return contour(values, value);
          });
        }
        function contour(values, value) {
          var polygons = [], holes = [];
          isorings(values, value, function(ring) {
            smooth(ring, values, value);
            if (area(ring) > 0)
              polygons.push([ring]);
            else
              holes.push(ring);
          });
          holes.forEach(function(hole) {
            for (var i = 0, n = polygons.length, polygon; i < n; ++i) {
              if (contains((polygon = polygons[i])[0], hole) !== -1) {
                polygon.push(hole);
                return;
              }
            }
          });
          return {
            type: "MultiPolygon",
            value,
            coordinates: polygons
          };
        }
        function isorings(values, value, callback) {
          var fragmentByStart = new Array(), fragmentByEnd = new Array(), x, y, t0, t1, t2, t3;
          x = y = -1;
          t1 = values[0] >= value;
          cases[t1 << 1].forEach(stitch);
          while (++x < dx - 1) {
            t0 = t1, t1 = values[x + 1] >= value;
            cases[t0 | t1 << 1].forEach(stitch);
          }
          cases[t1 << 0].forEach(stitch);
          while (++y < dy - 1) {
            x = -1;
            t1 = values[y * dx + dx] >= value;
            t2 = values[y * dx] >= value;
            cases[t1 << 1 | t2 << 2].forEach(stitch);
            while (++x < dx - 1) {
              t0 = t1, t1 = values[y * dx + dx + x + 1] >= value;
              t3 = t2, t2 = values[y * dx + x + 1] >= value;
              cases[t0 | t1 << 1 | t2 << 2 | t3 << 3].forEach(stitch);
            }
            cases[t1 | t2 << 3].forEach(stitch);
          }
          x = -1;
          t2 = values[y * dx] >= value;
          cases[t2 << 2].forEach(stitch);
          while (++x < dx - 1) {
            t3 = t2, t2 = values[y * dx + x + 1] >= value;
            cases[t2 << 2 | t3 << 3].forEach(stitch);
          }
          cases[t2 << 3].forEach(stitch);
          function stitch(line) {
            var start = [line[0][0] + x, line[0][1] + y], end = [line[1][0] + x, line[1][1] + y], startIndex = index(start), endIndex = index(end), f, g;
            if (f = fragmentByEnd[startIndex]) {
              if (g = fragmentByStart[endIndex]) {
                delete fragmentByEnd[f.end];
                delete fragmentByStart[g.start];
                if (f === g) {
                  f.ring.push(end);
                  callback(f.ring);
                } else {
                  fragmentByStart[f.start] = fragmentByEnd[g.end] = {start: f.start, end: g.end, ring: f.ring.concat(g.ring)};
                }
              } else {
                delete fragmentByEnd[f.end];
                f.ring.push(end);
                fragmentByEnd[f.end = endIndex] = f;
              }
            } else if (f = fragmentByStart[endIndex]) {
              if (g = fragmentByEnd[startIndex]) {
                delete fragmentByStart[f.start];
                delete fragmentByEnd[g.end];
                if (f === g) {
                  f.ring.push(end);
                  callback(f.ring);
                } else {
                  fragmentByStart[g.start] = fragmentByEnd[f.end] = {start: g.start, end: f.end, ring: g.ring.concat(f.ring)};
                }
              } else {
                delete fragmentByStart[f.start];
                f.ring.unshift(start);
                fragmentByStart[f.start = startIndex] = f;
              }
            } else {
              fragmentByStart[startIndex] = fragmentByEnd[endIndex] = {start: startIndex, end: endIndex, ring: [start, end]};
            }
          }
        }
        function index(point) {
          return point[0] * 2 + point[1] * (dx + 1) * 4;
        }
        function smoothLinear(ring, values, value) {
          ring.forEach(function(point) {
            var x = point[0], y = point[1], xt = x | 0, yt = y | 0, v0, v1 = values[yt * dx + xt];
            if (x > 0 && x < dx && xt === x) {
              v0 = values[yt * dx + xt - 1];
              point[0] = x + (value - v0) / (v1 - v0) - 0.5;
            }
            if (y > 0 && y < dy && yt === y) {
              v0 = values[(yt - 1) * dx + xt];
              point[1] = y + (value - v0) / (v1 - v0) - 0.5;
            }
          });
        }
        contours2.contour = contour;
        contours2.size = function(_) {
          if (!arguments.length)
            return [dx, dy];
          var _0 = Math.floor(_[0]), _1 = Math.floor(_[1]);
          if (!(_0 >= 0 && _1 >= 0))
            throw new Error("invalid size");
          return dx = _0, dy = _1, contours2;
        };
        contours2.thresholds = function(_) {
          return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), contours2) : threshold;
        };
        contours2.smooth = function(_) {
          return arguments.length ? (smooth = _ ? smoothLinear : noop, contours2) : smooth === smoothLinear;
        };
        return contours2;
      }
      function blurX(source, target, r) {
        var n = source.width, m = source.height, w = (r << 1) + 1;
        for (var j = 0; j < m; ++j) {
          for (var i = 0, sr = 0; i < n + r; ++i) {
            if (i < n) {
              sr += source.data[i + j * n];
            }
            if (i >= r) {
              if (i >= w) {
                sr -= source.data[i - w + j * n];
              }
              target.data[i - r + j * n] = sr / Math.min(i + 1, n - 1 + w - i, w);
            }
          }
        }
      }
      function blurY(source, target, r) {
        var n = source.width, m = source.height, w = (r << 1) + 1;
        for (var i = 0; i < n; ++i) {
          for (var j = 0, sr = 0; j < m + r; ++j) {
            if (j < m) {
              sr += source.data[i + j * n];
            }
            if (j >= r) {
              if (j >= w) {
                sr -= source.data[i + (j - w) * n];
              }
              target.data[i + (j - r) * n] = sr / Math.min(j + 1, m - 1 + w - j, w);
            }
          }
        }
      }
      function defaultX(d) {
        return d[0];
      }
      function defaultY(d) {
        return d[1];
      }
      function defaultWeight() {
        return 1;
      }
      function density() {
        var x = defaultX, y = defaultY, weight = defaultWeight, dx = 960, dy = 500, r = 20, k = 2, o = r * 3, n = dx + o * 2 >> k, m = dy + o * 2 >> k, threshold = constant(20);
        function density2(data) {
          var values0 = new Float32Array(n * m), values1 = new Float32Array(n * m);
          data.forEach(function(d, i, data2) {
            var xi = +x(d, i, data2) + o >> k, yi = +y(d, i, data2) + o >> k, wi = +weight(d, i, data2);
            if (xi >= 0 && xi < n && yi >= 0 && yi < m) {
              values0[xi + yi * n] += wi;
            }
          });
          blurX({width: n, height: m, data: values0}, {width: n, height: m, data: values1}, r >> k);
          blurY({width: n, height: m, data: values1}, {width: n, height: m, data: values0}, r >> k);
          blurX({width: n, height: m, data: values0}, {width: n, height: m, data: values1}, r >> k);
          blurY({width: n, height: m, data: values1}, {width: n, height: m, data: values0}, r >> k);
          blurX({width: n, height: m, data: values0}, {width: n, height: m, data: values1}, r >> k);
          blurY({width: n, height: m, data: values1}, {width: n, height: m, data: values0}, r >> k);
          var tz = threshold(values0);
          if (!Array.isArray(tz)) {
            var stop = d3Array.max(values0);
            tz = d3Array.tickStep(0, stop, tz);
            tz = d3Array.range(0, Math.floor(stop / tz) * tz, tz);
            tz.shift();
          }
          return contours().thresholds(tz).size([n, m])(values0).map(transform);
        }
        function transform(geometry) {
          geometry.value *= Math.pow(2, -2 * k);
          geometry.coordinates.forEach(transformPolygon);
          return geometry;
        }
        function transformPolygon(coordinates) {
          coordinates.forEach(transformRing);
        }
        function transformRing(coordinates) {
          coordinates.forEach(transformPoint);
        }
        function transformPoint(coordinates) {
          coordinates[0] = coordinates[0] * Math.pow(2, k) - o;
          coordinates[1] = coordinates[1] * Math.pow(2, k) - o;
        }
        function resize() {
          o = r * 3;
          n = dx + o * 2 >> k;
          m = dy + o * 2 >> k;
          return density2;
        }
        density2.x = function(_) {
          return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), density2) : x;
        };
        density2.y = function(_) {
          return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), density2) : y;
        };
        density2.weight = function(_) {
          return arguments.length ? (weight = typeof _ === "function" ? _ : constant(+_), density2) : weight;
        };
        density2.size = function(_) {
          if (!arguments.length)
            return [dx, dy];
          var _0 = +_[0], _1 = +_[1];
          if (!(_0 >= 0 && _1 >= 0))
            throw new Error("invalid size");
          return dx = _0, dy = _1, resize();
        };
        density2.cellSize = function(_) {
          if (!arguments.length)
            return 1 << k;
          if (!((_ = +_) >= 1))
            throw new Error("invalid cell size");
          return k = Math.floor(Math.log(_) / Math.LN2), resize();
        };
        density2.thresholds = function(_) {
          return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), density2) : threshold;
        };
        density2.bandwidth = function(_) {
          if (!arguments.length)
            return Math.sqrt(r * (r + 1));
          if (!((_ = +_) >= 0))
            throw new Error("invalid bandwidth");
          return r = Math.round((Math.sqrt(4 * _ * _ + 1) - 1) / 2), resize();
        };
        return density2;
      }
      exports2.contourDensity = density;
      exports2.contours = contours;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-delaunay/dist/d3-delaunay.js
  var require_d3_delaunay = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      const EPSILON = Math.pow(2, -52);
      const EDGE_STACK = new Uint32Array(512);
      class Delaunator {
        static from(points, getX = defaultGetX, getY = defaultGetY) {
          const n = points.length;
          const coords = new Float64Array(n * 2);
          for (let i = 0; i < n; i++) {
            const p = points[i];
            coords[2 * i] = getX(p);
            coords[2 * i + 1] = getY(p);
          }
          return new Delaunator(coords);
        }
        constructor(coords) {
          const n = coords.length >> 1;
          if (n > 0 && typeof coords[0] !== "number")
            throw new Error("Expected coords to contain numbers.");
          this.coords = coords;
          const maxTriangles = Math.max(2 * n - 5, 0);
          this._triangles = new Uint32Array(maxTriangles * 3);
          this._halfedges = new Int32Array(maxTriangles * 3);
          this._hashSize = Math.ceil(Math.sqrt(n));
          this._hullPrev = new Uint32Array(n);
          this._hullNext = new Uint32Array(n);
          this._hullTri = new Uint32Array(n);
          this._hullHash = new Int32Array(this._hashSize).fill(-1);
          this._ids = new Uint32Array(n);
          this._dists = new Float64Array(n);
          this.update();
        }
        update() {
          const {coords, _hullPrev: hullPrev, _hullNext: hullNext, _hullTri: hullTri, _hullHash: hullHash} = this;
          const n = coords.length >> 1;
          let minX = Infinity;
          let minY = Infinity;
          let maxX = -Infinity;
          let maxY = -Infinity;
          for (let i = 0; i < n; i++) {
            const x = coords[2 * i];
            const y = coords[2 * i + 1];
            if (x < minX)
              minX = x;
            if (y < minY)
              minY = y;
            if (x > maxX)
              maxX = x;
            if (y > maxY)
              maxY = y;
            this._ids[i] = i;
          }
          const cx = (minX + maxX) / 2;
          const cy = (minY + maxY) / 2;
          let minDist = Infinity;
          let i0, i1, i2;
          for (let i = 0; i < n; i++) {
            const d = dist(cx, cy, coords[2 * i], coords[2 * i + 1]);
            if (d < minDist) {
              i0 = i;
              minDist = d;
            }
          }
          const i0x = coords[2 * i0];
          const i0y = coords[2 * i0 + 1];
          minDist = Infinity;
          for (let i = 0; i < n; i++) {
            if (i === i0)
              continue;
            const d = dist(i0x, i0y, coords[2 * i], coords[2 * i + 1]);
            if (d < minDist && d > 0) {
              i1 = i;
              minDist = d;
            }
          }
          let i1x = coords[2 * i1];
          let i1y = coords[2 * i1 + 1];
          let minRadius = Infinity;
          for (let i = 0; i < n; i++) {
            if (i === i0 || i === i1)
              continue;
            const r = circumradius(i0x, i0y, i1x, i1y, coords[2 * i], coords[2 * i + 1]);
            if (r < minRadius) {
              i2 = i;
              minRadius = r;
            }
          }
          let i2x = coords[2 * i2];
          let i2y = coords[2 * i2 + 1];
          if (minRadius === Infinity) {
            for (let i = 0; i < n; i++) {
              this._dists[i] = coords[2 * i] - coords[0] || coords[2 * i + 1] - coords[1];
            }
            quicksort(this._ids, this._dists, 0, n - 1);
            const hull = new Uint32Array(n);
            let j = 0;
            for (let i = 0, d0 = -Infinity; i < n; i++) {
              const id = this._ids[i];
              if (this._dists[id] > d0) {
                hull[j++] = id;
                d0 = this._dists[id];
              }
            }
            this.hull = hull.subarray(0, j);
            this.triangles = new Uint32Array(0);
            this.halfedges = new Uint32Array(0);
            return;
          }
          if (orient(i0x, i0y, i1x, i1y, i2x, i2y)) {
            const i = i1;
            const x = i1x;
            const y = i1y;
            i1 = i2;
            i1x = i2x;
            i1y = i2y;
            i2 = i;
            i2x = x;
            i2y = y;
          }
          const center = circumcenter(i0x, i0y, i1x, i1y, i2x, i2y);
          this._cx = center.x;
          this._cy = center.y;
          for (let i = 0; i < n; i++) {
            this._dists[i] = dist(coords[2 * i], coords[2 * i + 1], center.x, center.y);
          }
          quicksort(this._ids, this._dists, 0, n - 1);
          this._hullStart = i0;
          let hullSize = 3;
          hullNext[i0] = hullPrev[i2] = i1;
          hullNext[i1] = hullPrev[i0] = i2;
          hullNext[i2] = hullPrev[i1] = i0;
          hullTri[i0] = 0;
          hullTri[i1] = 1;
          hullTri[i2] = 2;
          hullHash.fill(-1);
          hullHash[this._hashKey(i0x, i0y)] = i0;
          hullHash[this._hashKey(i1x, i1y)] = i1;
          hullHash[this._hashKey(i2x, i2y)] = i2;
          this.trianglesLen = 0;
          this._addTriangle(i0, i1, i2, -1, -1, -1);
          for (let k = 0, xp, yp; k < this._ids.length; k++) {
            const i = this._ids[k];
            const x = coords[2 * i];
            const y = coords[2 * i + 1];
            if (k > 0 && Math.abs(x - xp) <= EPSILON && Math.abs(y - yp) <= EPSILON)
              continue;
            xp = x;
            yp = y;
            if (i === i0 || i === i1 || i === i2)
              continue;
            let start = 0;
            for (let j = 0, key = this._hashKey(x, y); j < this._hashSize; j++) {
              start = hullHash[(key + j) % this._hashSize];
              if (start !== -1 && start !== hullNext[start])
                break;
            }
            start = hullPrev[start];
            let e = start, q;
            while (q = hullNext[e], !orient(x, y, coords[2 * e], coords[2 * e + 1], coords[2 * q], coords[2 * q + 1])) {
              e = q;
              if (e === start) {
                e = -1;
                break;
              }
            }
            if (e === -1)
              continue;
            let t = this._addTriangle(e, i, hullNext[e], -1, -1, hullTri[e]);
            hullTri[i] = this._legalize(t + 2);
            hullTri[e] = t;
            hullSize++;
            let n2 = hullNext[e];
            while (q = hullNext[n2], orient(x, y, coords[2 * n2], coords[2 * n2 + 1], coords[2 * q], coords[2 * q + 1])) {
              t = this._addTriangle(n2, i, q, hullTri[i], -1, hullTri[n2]);
              hullTri[i] = this._legalize(t + 2);
              hullNext[n2] = n2;
              hullSize--;
              n2 = q;
            }
            if (e === start) {
              while (q = hullPrev[e], orient(x, y, coords[2 * q], coords[2 * q + 1], coords[2 * e], coords[2 * e + 1])) {
                t = this._addTriangle(q, i, e, -1, hullTri[e], hullTri[q]);
                this._legalize(t + 2);
                hullTri[q] = t;
                hullNext[e] = e;
                hullSize--;
                e = q;
              }
            }
            this._hullStart = hullPrev[i] = e;
            hullNext[e] = hullPrev[n2] = i;
            hullNext[i] = n2;
            hullHash[this._hashKey(x, y)] = i;
            hullHash[this._hashKey(coords[2 * e], coords[2 * e + 1])] = e;
          }
          this.hull = new Uint32Array(hullSize);
          for (let i = 0, e = this._hullStart; i < hullSize; i++) {
            this.hull[i] = e;
            e = hullNext[e];
          }
          this.triangles = this._triangles.subarray(0, this.trianglesLen);
          this.halfedges = this._halfedges.subarray(0, this.trianglesLen);
        }
        _hashKey(x, y) {
          return Math.floor(pseudoAngle(x - this._cx, y - this._cy) * this._hashSize) % this._hashSize;
        }
        _legalize(a) {
          const {_triangles: triangles, _halfedges: halfedges, coords} = this;
          let i = 0;
          let ar = 0;
          while (true) {
            const b = halfedges[a];
            const a0 = a - a % 3;
            ar = a0 + (a + 2) % 3;
            if (b === -1) {
              if (i === 0)
                break;
              a = EDGE_STACK[--i];
              continue;
            }
            const b0 = b - b % 3;
            const al = a0 + (a + 1) % 3;
            const bl = b0 + (b + 2) % 3;
            const p0 = triangles[ar];
            const pr = triangles[a];
            const pl = triangles[al];
            const p1 = triangles[bl];
            const illegal = inCircle(coords[2 * p0], coords[2 * p0 + 1], coords[2 * pr], coords[2 * pr + 1], coords[2 * pl], coords[2 * pl + 1], coords[2 * p1], coords[2 * p1 + 1]);
            if (illegal) {
              triangles[a] = p1;
              triangles[b] = p0;
              const hbl = halfedges[bl];
              if (hbl === -1) {
                let e = this._hullStart;
                do {
                  if (this._hullTri[e] === bl) {
                    this._hullTri[e] = a;
                    break;
                  }
                  e = this._hullPrev[e];
                } while (e !== this._hullStart);
              }
              this._link(a, hbl);
              this._link(b, halfedges[ar]);
              this._link(ar, bl);
              const br = b0 + (b + 1) % 3;
              if (i < EDGE_STACK.length) {
                EDGE_STACK[i++] = br;
              }
            } else {
              if (i === 0)
                break;
              a = EDGE_STACK[--i];
            }
          }
          return ar;
        }
        _link(a, b) {
          this._halfedges[a] = b;
          if (b !== -1)
            this._halfedges[b] = a;
        }
        _addTriangle(i0, i1, i2, a, b, c) {
          const t = this.trianglesLen;
          this._triangles[t] = i0;
          this._triangles[t + 1] = i1;
          this._triangles[t + 2] = i2;
          this._link(t, a);
          this._link(t + 1, b);
          this._link(t + 2, c);
          this.trianglesLen += 3;
          return t;
        }
      }
      function pseudoAngle(dx, dy) {
        const p = dx / (Math.abs(dx) + Math.abs(dy));
        return (dy > 0 ? 3 - p : 1 + p) / 4;
      }
      function dist(ax, ay, bx, by) {
        const dx = ax - bx;
        const dy = ay - by;
        return dx * dx + dy * dy;
      }
      function orientIfSure(px, py, rx, ry, qx, qy) {
        const l = (ry - py) * (qx - px);
        const r = (rx - px) * (qy - py);
        return Math.abs(l - r) >= 33306690738754716e-32 * Math.abs(l + r) ? l - r : 0;
      }
      function orient(rx, ry, qx, qy, px, py) {
        const sign = orientIfSure(px, py, rx, ry, qx, qy) || orientIfSure(rx, ry, qx, qy, px, py) || orientIfSure(qx, qy, px, py, rx, ry);
        return sign < 0;
      }
      function inCircle(ax, ay, bx, by, cx, cy, px, py) {
        const dx = ax - px;
        const dy = ay - py;
        const ex = bx - px;
        const ey = by - py;
        const fx = cx - px;
        const fy = cy - py;
        const ap = dx * dx + dy * dy;
        const bp = ex * ex + ey * ey;
        const cp = fx * fx + fy * fy;
        return dx * (ey * cp - bp * fy) - dy * (ex * cp - bp * fx) + ap * (ex * fy - ey * fx) < 0;
      }
      function circumradius(ax, ay, bx, by, cx, cy) {
        const dx = bx - ax;
        const dy = by - ay;
        const ex = cx - ax;
        const ey = cy - ay;
        const bl = dx * dx + dy * dy;
        const cl = ex * ex + ey * ey;
        const d = 0.5 / (dx * ey - dy * ex);
        const x = (ey * bl - dy * cl) * d;
        const y = (dx * cl - ex * bl) * d;
        return x * x + y * y;
      }
      function circumcenter(ax, ay, bx, by, cx, cy) {
        const dx = bx - ax;
        const dy = by - ay;
        const ex = cx - ax;
        const ey = cy - ay;
        const bl = dx * dx + dy * dy;
        const cl = ex * ex + ey * ey;
        const d = 0.5 / (dx * ey - dy * ex);
        const x = ax + (ey * bl - dy * cl) * d;
        const y = ay + (dx * cl - ex * bl) * d;
        return {x, y};
      }
      function quicksort(ids, dists, left, right) {
        if (right - left <= 20) {
          for (let i = left + 1; i <= right; i++) {
            const temp = ids[i];
            const tempDist = dists[temp];
            let j = i - 1;
            while (j >= left && dists[ids[j]] > tempDist)
              ids[j + 1] = ids[j--];
            ids[j + 1] = temp;
          }
        } else {
          const median = left + right >> 1;
          let i = left + 1;
          let j = right;
          swap(ids, median, i);
          if (dists[ids[left]] > dists[ids[right]])
            swap(ids, left, right);
          if (dists[ids[i]] > dists[ids[right]])
            swap(ids, i, right);
          if (dists[ids[left]] > dists[ids[i]])
            swap(ids, left, i);
          const temp = ids[i];
          const tempDist = dists[temp];
          while (true) {
            do
              i++;
            while (dists[ids[i]] < tempDist);
            do
              j--;
            while (dists[ids[j]] > tempDist);
            if (j < i)
              break;
            swap(ids, i, j);
          }
          ids[left + 1] = ids[j];
          ids[j] = temp;
          if (right - i + 1 >= j - left) {
            quicksort(ids, dists, i, right);
            quicksort(ids, dists, left, j - 1);
          } else {
            quicksort(ids, dists, left, j - 1);
            quicksort(ids, dists, i, right);
          }
        }
      }
      function swap(arr, i, j) {
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
      function defaultGetX(p) {
        return p[0];
      }
      function defaultGetY(p) {
        return p[1];
      }
      const epsilon = 1e-6;
      class Path {
        constructor() {
          this._x0 = this._y0 = this._x1 = this._y1 = null;
          this._ = "";
        }
        moveTo(x, y) {
          this._ += `M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
        }
        closePath() {
          if (this._x1 !== null) {
            this._x1 = this._x0, this._y1 = this._y0;
            this._ += "Z";
          }
        }
        lineTo(x, y) {
          this._ += `L${this._x1 = +x},${this._y1 = +y}`;
        }
        arc(x, y, r) {
          x = +x, y = +y, r = +r;
          const x0 = x + r;
          const y0 = y;
          if (r < 0)
            throw new Error("negative radius");
          if (this._x1 === null)
            this._ += `M${x0},${y0}`;
          else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon)
            this._ += "L" + x0 + "," + y0;
          if (!r)
            return;
          this._ += `A${r},${r},0,1,1,${x - r},${y}A${r},${r},0,1,1,${this._x1 = x0},${this._y1 = y0}`;
        }
        rect(x, y, w, h) {
          this._ += `M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${+w}v${+h}h${-w}Z`;
        }
        value() {
          return this._ || null;
        }
      }
      class Polygon {
        constructor() {
          this._ = [];
        }
        moveTo(x, y) {
          this._.push([x, y]);
        }
        closePath() {
          this._.push(this._[0].slice());
        }
        lineTo(x, y) {
          this._.push([x, y]);
        }
        value() {
          return this._.length ? this._ : null;
        }
      }
      class Voronoi {
        constructor(delaunay, [xmin, ymin, xmax, ymax] = [0, 0, 960, 500]) {
          if (!((xmax = +xmax) >= (xmin = +xmin)) || !((ymax = +ymax) >= (ymin = +ymin)))
            throw new Error("invalid bounds");
          this.delaunay = delaunay;
          this._circumcenters = new Float64Array(delaunay.points.length * 2);
          this.vectors = new Float64Array(delaunay.points.length * 2);
          this.xmax = xmax, this.xmin = xmin;
          this.ymax = ymax, this.ymin = ymin;
          this._init();
        }
        update() {
          this.delaunay.update();
          this._init();
          return this;
        }
        _init() {
          const {delaunay: {points, hull, triangles}, vectors} = this;
          const circumcenters = this.circumcenters = this._circumcenters.subarray(0, triangles.length / 3 * 2);
          for (let i = 0, j = 0, n = triangles.length, x, y; i < n; i += 3, j += 2) {
            const t1 = triangles[i] * 2;
            const t2 = triangles[i + 1] * 2;
            const t3 = triangles[i + 2] * 2;
            const x12 = points[t1];
            const y12 = points[t1 + 1];
            const x2 = points[t2];
            const y2 = points[t2 + 1];
            const x3 = points[t3];
            const y3 = points[t3 + 1];
            const dx = x2 - x12;
            const dy = y2 - y12;
            const ex = x3 - x12;
            const ey = y3 - y12;
            const bl = dx * dx + dy * dy;
            const cl = ex * ex + ey * ey;
            const ab = (dx * ey - dy * ex) * 2;
            if (!ab) {
              x = (x12 + x3) / 2 - 1e8 * ey;
              y = (y12 + y3) / 2 + 1e8 * ex;
            } else if (Math.abs(ab) < 1e-8) {
              x = (x12 + x3) / 2;
              y = (y12 + y3) / 2;
            } else {
              const d = 1 / ab;
              x = x12 + (ey * bl - dy * cl) * d;
              y = y12 + (dx * cl - ex * bl) * d;
            }
            circumcenters[j] = x;
            circumcenters[j + 1] = y;
          }
          let h = hull[hull.length - 1];
          let p0, p1 = h * 4;
          let x0, x1 = points[2 * h];
          let y0, y1 = points[2 * h + 1];
          vectors.fill(0);
          for (let i = 0; i < hull.length; ++i) {
            h = hull[i];
            p0 = p1, x0 = x1, y0 = y1;
            p1 = h * 4, x1 = points[2 * h], y1 = points[2 * h + 1];
            vectors[p0 + 2] = vectors[p1] = y0 - y1;
            vectors[p0 + 3] = vectors[p1 + 1] = x1 - x0;
          }
        }
        render(context) {
          const buffer = context == null ? context = new Path() : void 0;
          const {delaunay: {halfedges, inedges, hull}, circumcenters, vectors} = this;
          if (hull.length <= 1)
            return null;
          for (let i = 0, n = halfedges.length; i < n; ++i) {
            const j = halfedges[i];
            if (j < i)
              continue;
            const ti = Math.floor(i / 3) * 2;
            const tj = Math.floor(j / 3) * 2;
            const xi = circumcenters[ti];
            const yi = circumcenters[ti + 1];
            const xj = circumcenters[tj];
            const yj = circumcenters[tj + 1];
            this._renderSegment(xi, yi, xj, yj, context);
          }
          let h0, h1 = hull[hull.length - 1];
          for (let i = 0; i < hull.length; ++i) {
            h0 = h1, h1 = hull[i];
            const t = Math.floor(inedges[h1] / 3) * 2;
            const x = circumcenters[t];
            const y = circumcenters[t + 1];
            const v = h0 * 4;
            const p = this._project(x, y, vectors[v + 2], vectors[v + 3]);
            if (p)
              this._renderSegment(x, y, p[0], p[1], context);
          }
          return buffer && buffer.value();
        }
        renderBounds(context) {
          const buffer = context == null ? context = new Path() : void 0;
          context.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
          return buffer && buffer.value();
        }
        renderCell(i, context) {
          const buffer = context == null ? context = new Path() : void 0;
          const points = this._clip(i);
          if (points === null || !points.length)
            return;
          context.moveTo(points[0], points[1]);
          let n = points.length;
          while (points[0] === points[n - 2] && points[1] === points[n - 1] && n > 1)
            n -= 2;
          for (let i2 = 2; i2 < n; i2 += 2) {
            if (points[i2] !== points[i2 - 2] || points[i2 + 1] !== points[i2 - 1])
              context.lineTo(points[i2], points[i2 + 1]);
          }
          context.closePath();
          return buffer && buffer.value();
        }
        *cellPolygons() {
          const {delaunay: {points}} = this;
          for (let i = 0, n = points.length / 2; i < n; ++i) {
            const cell = this.cellPolygon(i);
            if (cell)
              cell.index = i, yield cell;
          }
        }
        cellPolygon(i) {
          const polygon = new Polygon();
          this.renderCell(i, polygon);
          return polygon.value();
        }
        _renderSegment(x0, y0, x1, y1, context) {
          let S;
          const c0 = this._regioncode(x0, y0);
          const c1 = this._regioncode(x1, y1);
          if (c0 === 0 && c1 === 0) {
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
          } else if (S = this._clipSegment(x0, y0, x1, y1, c0, c1)) {
            context.moveTo(S[0], S[1]);
            context.lineTo(S[2], S[3]);
          }
        }
        contains(i, x, y) {
          if ((x = +x, x !== x) || (y = +y, y !== y))
            return false;
          return this.delaunay._step(i, x, y) === i;
        }
        *neighbors(i) {
          const ci = this._clip(i);
          if (ci)
            for (const j of this.delaunay.neighbors(i)) {
              const cj = this._clip(j);
              if (cj)
                loop:
                  for (let ai = 0, li = ci.length; ai < li; ai += 2) {
                    for (let aj = 0, lj = cj.length; aj < lj; aj += 2) {
                      if (ci[ai] == cj[aj] && ci[ai + 1] == cj[aj + 1] && ci[(ai + 2) % li] == cj[(aj + lj - 2) % lj] && ci[(ai + 3) % li] == cj[(aj + lj - 1) % lj]) {
                        yield j;
                        break loop;
                      }
                    }
                  }
            }
        }
        _cell(i) {
          const {circumcenters, delaunay: {inedges, halfedges, triangles}} = this;
          const e0 = inedges[i];
          if (e0 === -1)
            return null;
          const points = [];
          let e = e0;
          do {
            const t = Math.floor(e / 3);
            points.push(circumcenters[t * 2], circumcenters[t * 2 + 1]);
            e = e % 3 === 2 ? e - 2 : e + 1;
            if (triangles[e] !== i)
              break;
            e = halfedges[e];
          } while (e !== e0 && e !== -1);
          return points;
        }
        _clip(i) {
          if (i === 0 && this.delaunay.hull.length === 1) {
            return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
          }
          const points = this._cell(i);
          if (points === null)
            return null;
          const {vectors: V} = this;
          const v = i * 4;
          return V[v] || V[v + 1] ? this._clipInfinite(i, points, V[v], V[v + 1], V[v + 2], V[v + 3]) : this._clipFinite(i, points);
        }
        _clipFinite(i, points) {
          const n = points.length;
          let P = null;
          let x0, y0, x1 = points[n - 2], y1 = points[n - 1];
          let c0, c1 = this._regioncode(x1, y1);
          let e0, e1;
          for (let j = 0; j < n; j += 2) {
            x0 = x1, y0 = y1, x1 = points[j], y1 = points[j + 1];
            c0 = c1, c1 = this._regioncode(x1, y1);
            if (c0 === 0 && c1 === 0) {
              e0 = e1, e1 = 0;
              if (P)
                P.push(x1, y1);
              else
                P = [x1, y1];
            } else {
              let S, sx0, sy0, sx1, sy1;
              if (c0 === 0) {
                if ((S = this._clipSegment(x0, y0, x1, y1, c0, c1)) === null)
                  continue;
                [sx0, sy0, sx1, sy1] = S;
              } else {
                if ((S = this._clipSegment(x1, y1, x0, y0, c1, c0)) === null)
                  continue;
                [sx1, sy1, sx0, sy0] = S;
                e0 = e1, e1 = this._edgecode(sx0, sy0);
                if (e0 && e1)
                  this._edge(i, e0, e1, P, P.length);
                if (P)
                  P.push(sx0, sy0);
                else
                  P = [sx0, sy0];
              }
              e0 = e1, e1 = this._edgecode(sx1, sy1);
              if (e0 && e1)
                this._edge(i, e0, e1, P, P.length);
              if (P)
                P.push(sx1, sy1);
              else
                P = [sx1, sy1];
            }
          }
          if (P) {
            e0 = e1, e1 = this._edgecode(P[0], P[1]);
            if (e0 && e1)
              this._edge(i, e0, e1, P, P.length);
          } else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
            return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
          }
          return P;
        }
        _clipSegment(x0, y0, x1, y1, c0, c1) {
          while (true) {
            if (c0 === 0 && c1 === 0)
              return [x0, y0, x1, y1];
            if (c0 & c1)
              return null;
            let x, y, c = c0 || c1;
            if (c & 8)
              x = x0 + (x1 - x0) * (this.ymax - y0) / (y1 - y0), y = this.ymax;
            else if (c & 4)
              x = x0 + (x1 - x0) * (this.ymin - y0) / (y1 - y0), y = this.ymin;
            else if (c & 2)
              y = y0 + (y1 - y0) * (this.xmax - x0) / (x1 - x0), x = this.xmax;
            else
              y = y0 + (y1 - y0) * (this.xmin - x0) / (x1 - x0), x = this.xmin;
            if (c0)
              x0 = x, y0 = y, c0 = this._regioncode(x0, y0);
            else
              x1 = x, y1 = y, c1 = this._regioncode(x1, y1);
          }
        }
        _clipInfinite(i, points, vx0, vy0, vxn, vyn) {
          let P = Array.from(points), p;
          if (p = this._project(P[0], P[1], vx0, vy0))
            P.unshift(p[0], p[1]);
          if (p = this._project(P[P.length - 2], P[P.length - 1], vxn, vyn))
            P.push(p[0], p[1]);
          if (P = this._clipFinite(i, P)) {
            for (let j = 0, n = P.length, c0, c1 = this._edgecode(P[n - 2], P[n - 1]); j < n; j += 2) {
              c0 = c1, c1 = this._edgecode(P[j], P[j + 1]);
              if (c0 && c1)
                j = this._edge(i, c0, c1, P, j), n = P.length;
            }
          } else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
            P = [this.xmin, this.ymin, this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax];
          }
          return P;
        }
        _edge(i, e0, e1, P, j) {
          while (e0 !== e1) {
            let x, y;
            switch (e0) {
              case 5:
                e0 = 4;
                continue;
              case 4:
                e0 = 6, x = this.xmax, y = this.ymin;
                break;
              case 6:
                e0 = 2;
                continue;
              case 2:
                e0 = 10, x = this.xmax, y = this.ymax;
                break;
              case 10:
                e0 = 8;
                continue;
              case 8:
                e0 = 9, x = this.xmin, y = this.ymax;
                break;
              case 9:
                e0 = 1;
                continue;
              case 1:
                e0 = 5, x = this.xmin, y = this.ymin;
                break;
            }
            if ((P[j] !== x || P[j + 1] !== y) && this.contains(i, x, y)) {
              P.splice(j, 0, x, y), j += 2;
            }
          }
          if (P.length > 4) {
            for (let i2 = 0; i2 < P.length; i2 += 2) {
              const j2 = (i2 + 2) % P.length, k = (i2 + 4) % P.length;
              if (P[i2] === P[j2] && P[j2] === P[k] || P[i2 + 1] === P[j2 + 1] && P[j2 + 1] === P[k + 1])
                P.splice(j2, 2), i2 -= 2;
            }
          }
          return j;
        }
        _project(x0, y0, vx, vy) {
          let t = Infinity, c, x, y;
          if (vy < 0) {
            if (y0 <= this.ymin)
              return null;
            if ((c = (this.ymin - y0) / vy) < t)
              y = this.ymin, x = x0 + (t = c) * vx;
          } else if (vy > 0) {
            if (y0 >= this.ymax)
              return null;
            if ((c = (this.ymax - y0) / vy) < t)
              y = this.ymax, x = x0 + (t = c) * vx;
          }
          if (vx > 0) {
            if (x0 >= this.xmax)
              return null;
            if ((c = (this.xmax - x0) / vx) < t)
              x = this.xmax, y = y0 + (t = c) * vy;
          } else if (vx < 0) {
            if (x0 <= this.xmin)
              return null;
            if ((c = (this.xmin - x0) / vx) < t)
              x = this.xmin, y = y0 + (t = c) * vy;
          }
          return [x, y];
        }
        _edgecode(x, y) {
          return (x === this.xmin ? 1 : x === this.xmax ? 2 : 0) | (y === this.ymin ? 4 : y === this.ymax ? 8 : 0);
        }
        _regioncode(x, y) {
          return (x < this.xmin ? 1 : x > this.xmax ? 2 : 0) | (y < this.ymin ? 4 : y > this.ymax ? 8 : 0);
        }
      }
      const tau = 2 * Math.PI, pow = Math.pow;
      function pointX(p) {
        return p[0];
      }
      function pointY(p) {
        return p[1];
      }
      function collinear(d) {
        const {triangles, coords} = d;
        for (let i = 0; i < triangles.length; i += 3) {
          const a = 2 * triangles[i], b = 2 * triangles[i + 1], c = 2 * triangles[i + 2], cross = (coords[c] - coords[a]) * (coords[b + 1] - coords[a + 1]) - (coords[b] - coords[a]) * (coords[c + 1] - coords[a + 1]);
          if (cross > 1e-10)
            return false;
        }
        return true;
      }
      function jitter(x, y, r) {
        return [x + Math.sin(x + y) * r, y + Math.cos(x - y) * r];
      }
      class Delaunay {
        static from(points, fx = pointX, fy = pointY, that) {
          return new Delaunay("length" in points ? flatArray(points, fx, fy, that) : Float64Array.from(flatIterable(points, fx, fy, that)));
        }
        constructor(points) {
          this._delaunator = new Delaunator(points);
          this.inedges = new Int32Array(points.length / 2);
          this._hullIndex = new Int32Array(points.length / 2);
          this.points = this._delaunator.coords;
          this._init();
        }
        update() {
          this._delaunator.update();
          this._init();
          return this;
        }
        _init() {
          const d = this._delaunator, points = this.points;
          if (d.hull && d.hull.length > 2 && collinear(d)) {
            this.collinear = Int32Array.from({length: points.length / 2}, (_, i) => i).sort((i, j) => points[2 * i] - points[2 * j] || points[2 * i + 1] - points[2 * j + 1]);
            const e = this.collinear[0], f = this.collinear[this.collinear.length - 1], bounds = [points[2 * e], points[2 * e + 1], points[2 * f], points[2 * f + 1]], r = 1e-8 * Math.hypot(bounds[3] - bounds[1], bounds[2] - bounds[0]);
            for (let i = 0, n = points.length / 2; i < n; ++i) {
              const p = jitter(points[2 * i], points[2 * i + 1], r);
              points[2 * i] = p[0];
              points[2 * i + 1] = p[1];
            }
            this._delaunator = new Delaunator(points);
          } else {
            delete this.collinear;
          }
          const halfedges = this.halfedges = this._delaunator.halfedges;
          const hull = this.hull = this._delaunator.hull;
          const triangles = this.triangles = this._delaunator.triangles;
          const inedges = this.inedges.fill(-1);
          const hullIndex = this._hullIndex.fill(-1);
          for (let e = 0, n = halfedges.length; e < n; ++e) {
            const p = triangles[e % 3 === 2 ? e - 2 : e + 1];
            if (halfedges[e] === -1 || inedges[p] === -1)
              inedges[p] = e;
          }
          for (let i = 0, n = hull.length; i < n; ++i) {
            hullIndex[hull[i]] = i;
          }
          if (hull.length <= 2 && hull.length > 0) {
            this.triangles = new Int32Array(3).fill(-1);
            this.halfedges = new Int32Array(3).fill(-1);
            this.triangles[0] = hull[0];
            this.triangles[1] = hull[1];
            this.triangles[2] = hull[1];
            inedges[hull[0]] = 1;
            if (hull.length === 2)
              inedges[hull[1]] = 0;
          }
        }
        voronoi(bounds) {
          return new Voronoi(this, bounds);
        }
        *neighbors(i) {
          const {inedges, hull, _hullIndex, halfedges, triangles, collinear: collinear2} = this;
          if (collinear2) {
            const l = collinear2.indexOf(i);
            if (l > 0)
              yield collinear2[l - 1];
            if (l < collinear2.length - 1)
              yield collinear2[l + 1];
            return;
          }
          const e0 = inedges[i];
          if (e0 === -1)
            return;
          let e = e0, p0 = -1;
          do {
            yield p0 = triangles[e];
            e = e % 3 === 2 ? e - 2 : e + 1;
            if (triangles[e] !== i)
              return;
            e = halfedges[e];
            if (e === -1) {
              const p = hull[(_hullIndex[i] + 1) % hull.length];
              if (p !== p0)
                yield p;
              return;
            }
          } while (e !== e0);
        }
        find(x, y, i = 0) {
          if ((x = +x, x !== x) || (y = +y, y !== y))
            return -1;
          const i0 = i;
          let c;
          while ((c = this._step(i, x, y)) >= 0 && c !== i && c !== i0)
            i = c;
          return c;
        }
        _step(i, x, y) {
          const {inedges, hull, _hullIndex, halfedges, triangles, points} = this;
          if (inedges[i] === -1 || !points.length)
            return (i + 1) % (points.length >> 1);
          let c = i;
          let dc = pow(x - points[i * 2], 2) + pow(y - points[i * 2 + 1], 2);
          const e0 = inedges[i];
          let e = e0;
          do {
            let t = triangles[e];
            const dt = pow(x - points[t * 2], 2) + pow(y - points[t * 2 + 1], 2);
            if (dt < dc)
              dc = dt, c = t;
            e = e % 3 === 2 ? e - 2 : e + 1;
            if (triangles[e] !== i)
              break;
            e = halfedges[e];
            if (e === -1) {
              e = hull[(_hullIndex[i] + 1) % hull.length];
              if (e !== t) {
                if (pow(x - points[e * 2], 2) + pow(y - points[e * 2 + 1], 2) < dc)
                  return e;
              }
              break;
            }
          } while (e !== e0);
          return c;
        }
        render(context) {
          const buffer = context == null ? context = new Path() : void 0;
          const {points, halfedges, triangles} = this;
          for (let i = 0, n = halfedges.length; i < n; ++i) {
            const j = halfedges[i];
            if (j < i)
              continue;
            const ti = triangles[i] * 2;
            const tj = triangles[j] * 2;
            context.moveTo(points[ti], points[ti + 1]);
            context.lineTo(points[tj], points[tj + 1]);
          }
          this.renderHull(context);
          return buffer && buffer.value();
        }
        renderPoints(context, r = 2) {
          const buffer = context == null ? context = new Path() : void 0;
          const {points} = this;
          for (let i = 0, n = points.length; i < n; i += 2) {
            const x = points[i], y = points[i + 1];
            context.moveTo(x + r, y);
            context.arc(x, y, r, 0, tau);
          }
          return buffer && buffer.value();
        }
        renderHull(context) {
          const buffer = context == null ? context = new Path() : void 0;
          const {hull, points} = this;
          const h = hull[0] * 2, n = hull.length;
          context.moveTo(points[h], points[h + 1]);
          for (let i = 1; i < n; ++i) {
            const h2 = 2 * hull[i];
            context.lineTo(points[h2], points[h2 + 1]);
          }
          context.closePath();
          return buffer && buffer.value();
        }
        hullPolygon() {
          const polygon = new Polygon();
          this.renderHull(polygon);
          return polygon.value();
        }
        renderTriangle(i, context) {
          const buffer = context == null ? context = new Path() : void 0;
          const {points, triangles} = this;
          const t0 = triangles[i *= 3] * 2;
          const t1 = triangles[i + 1] * 2;
          const t2 = triangles[i + 2] * 2;
          context.moveTo(points[t0], points[t0 + 1]);
          context.lineTo(points[t1], points[t1 + 1]);
          context.lineTo(points[t2], points[t2 + 1]);
          context.closePath();
          return buffer && buffer.value();
        }
        *trianglePolygons() {
          const {triangles} = this;
          for (let i = 0, n = triangles.length / 3; i < n; ++i) {
            yield this.trianglePolygon(i);
          }
        }
        trianglePolygon(i) {
          const polygon = new Polygon();
          this.renderTriangle(i, polygon);
          return polygon.value();
        }
      }
      function flatArray(points, fx, fy, that) {
        const n = points.length;
        const array = new Float64Array(n * 2);
        for (let i = 0; i < n; ++i) {
          const p = points[i];
          array[i * 2] = fx.call(that, p, i, points);
          array[i * 2 + 1] = fy.call(that, p, i, points);
        }
        return array;
      }
      function* flatIterable(points, fx, fy, that) {
        let i = 0;
        for (const p of points) {
          yield fx.call(that, p, i, points);
          yield fy.call(that, p, i, points);
          ++i;
        }
      }
      exports2.Delaunay = Delaunay;
      exports2.Voronoi = Voronoi;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-dsv/dist/d3-dsv.js
  var require_d3_dsv = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      var EOL = {}, EOF = {}, QUOTE = 34, NEWLINE = 10, RETURN = 13;
      function objectConverter(columns) {
        return new Function("d", "return {" + columns.map(function(name, i) {
          return JSON.stringify(name) + ": d[" + i + '] || ""';
        }).join(",") + "}");
      }
      function customConverter(columns, f) {
        var object = objectConverter(columns);
        return function(row, i) {
          return f(object(row), i, columns);
        };
      }
      function inferColumns(rows) {
        var columnSet = Object.create(null), columns = [];
        rows.forEach(function(row) {
          for (var column in row) {
            if (!(column in columnSet)) {
              columns.push(columnSet[column] = column);
            }
          }
        });
        return columns;
      }
      function pad(value, width2) {
        var s = value + "", length = s.length;
        return length < width2 ? new Array(width2 - length + 1).join(0) + s : s;
      }
      function formatYear(year) {
        return year < 0 ? "-" + pad(-year, 6) : year > 9999 ? "+" + pad(year, 6) : pad(year, 4);
      }
      function formatDate(date) {
        var hours = date.getUTCHours(), minutes = date.getUTCMinutes(), seconds = date.getUTCSeconds(), milliseconds = date.getUTCMilliseconds();
        return isNaN(date) ? "Invalid Date" : formatYear(date.getUTCFullYear()) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2) + (milliseconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3) + "Z" : seconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "Z" : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z" : "");
      }
      function dsv(delimiter) {
        var reFormat = new RegExp('["' + delimiter + "\n\r]"), DELIMITER = delimiter.charCodeAt(0);
        function parse(text, f) {
          var convert, columns, rows = parseRows(text, function(row, i) {
            if (convert)
              return convert(row, i - 1);
            columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
          });
          rows.columns = columns || [];
          return rows;
        }
        function parseRows(text, f) {
          var rows = [], N = text.length, I = 0, n = 0, t, eof = N <= 0, eol = false;
          if (text.charCodeAt(N - 1) === NEWLINE)
            --N;
          if (text.charCodeAt(N - 1) === RETURN)
            --N;
          function token() {
            if (eof)
              return EOF;
            if (eol)
              return eol = false, EOL;
            var i, j = I, c;
            if (text.charCodeAt(j) === QUOTE) {
              while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE)
                ;
              if ((i = I) >= N)
                eof = true;
              else if ((c = text.charCodeAt(I++)) === NEWLINE)
                eol = true;
              else if (c === RETURN) {
                eol = true;
                if (text.charCodeAt(I) === NEWLINE)
                  ++I;
              }
              return text.slice(j + 1, i - 1).replace(/""/g, '"');
            }
            while (I < N) {
              if ((c = text.charCodeAt(i = I++)) === NEWLINE)
                eol = true;
              else if (c === RETURN) {
                eol = true;
                if (text.charCodeAt(I) === NEWLINE)
                  ++I;
              } else if (c !== DELIMITER)
                continue;
              return text.slice(j, i);
            }
            return eof = true, text.slice(j, N);
          }
          while ((t = token()) !== EOF) {
            var row = [];
            while (t !== EOL && t !== EOF)
              row.push(t), t = token();
            if (f && (row = f(row, n++)) == null)
              continue;
            rows.push(row);
          }
          return rows;
        }
        function preformatBody(rows, columns) {
          return rows.map(function(row) {
            return columns.map(function(column) {
              return formatValue(row[column]);
            }).join(delimiter);
          });
        }
        function format(rows, columns) {
          if (columns == null)
            columns = inferColumns(rows);
          return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
        }
        function formatBody(rows, columns) {
          if (columns == null)
            columns = inferColumns(rows);
          return preformatBody(rows, columns).join("\n");
        }
        function formatRows(rows) {
          return rows.map(formatRow).join("\n");
        }
        function formatRow(row) {
          return row.map(formatValue).join(delimiter);
        }
        function formatValue(value) {
          return value == null ? "" : value instanceof Date ? formatDate(value) : reFormat.test(value += "") ? '"' + value.replace(/"/g, '""') + '"' : value;
        }
        return {
          parse,
          parseRows,
          format,
          formatBody,
          formatRows,
          formatRow,
          formatValue
        };
      }
      var csv = dsv(",");
      var csvParse = csv.parse;
      var csvParseRows = csv.parseRows;
      var csvFormat = csv.format;
      var csvFormatBody = csv.formatBody;
      var csvFormatRows = csv.formatRows;
      var csvFormatRow = csv.formatRow;
      var csvFormatValue = csv.formatValue;
      var tsv = dsv("	");
      var tsvParse = tsv.parse;
      var tsvParseRows = tsv.parseRows;
      var tsvFormat = tsv.format;
      var tsvFormatBody = tsv.formatBody;
      var tsvFormatRows = tsv.formatRows;
      var tsvFormatRow = tsv.formatRow;
      var tsvFormatValue = tsv.formatValue;
      function autoType(object) {
        for (var key in object) {
          var value = object[key].trim(), number, m;
          if (!value)
            value = null;
          else if (value === "true")
            value = true;
          else if (value === "false")
            value = false;
          else if (value === "NaN")
            value = NaN;
          else if (!isNaN(number = +value))
            value = number;
          else if (m = value.match(/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/)) {
            if (fixtz && !!m[4] && !m[7])
              value = value.replace(/-/g, "/").replace(/T/, " ");
            value = new Date(value);
          } else
            continue;
          object[key] = value;
        }
        return object;
      }
      const fixtz = new Date("2019-01-01T00:00").getHours() || new Date("2019-07-01T00:00").getHours();
      exports2.autoType = autoType;
      exports2.csvFormat = csvFormat;
      exports2.csvFormatBody = csvFormatBody;
      exports2.csvFormatRow = csvFormatRow;
      exports2.csvFormatRows = csvFormatRows;
      exports2.csvFormatValue = csvFormatValue;
      exports2.csvParse = csvParse;
      exports2.csvParseRows = csvParseRows;
      exports2.dsvFormat = dsv;
      exports2.tsvFormat = tsvFormat;
      exports2.tsvFormatBody = tsvFormatBody;
      exports2.tsvFormatRow = tsvFormatRow;
      exports2.tsvFormatRows = tsvFormatRows;
      exports2.tsvFormatValue = tsvFormatValue;
      exports2.tsvParse = tsvParse;
      exports2.tsvParseRows = tsvParseRows;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-fetch/dist/d3-fetch.js
  var require_d3_fetch = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_d3_dsv()) : typeof define === "function" && define.amd ? define(["exports", "d3-dsv"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}, global.d3));
    })(exports, function(exports2, d3Dsv) {
      "use strict";
      function responseBlob(response) {
        if (!response.ok)
          throw new Error(response.status + " " + response.statusText);
        return response.blob();
      }
      function blob(input, init) {
        return fetch(input, init).then(responseBlob);
      }
      function responseArrayBuffer(response) {
        if (!response.ok)
          throw new Error(response.status + " " + response.statusText);
        return response.arrayBuffer();
      }
      function buffer(input, init) {
        return fetch(input, init).then(responseArrayBuffer);
      }
      function responseText(response) {
        if (!response.ok)
          throw new Error(response.status + " " + response.statusText);
        return response.text();
      }
      function text(input, init) {
        return fetch(input, init).then(responseText);
      }
      function dsvParse(parse) {
        return function(input, init, row) {
          if (arguments.length === 2 && typeof init === "function")
            row = init, init = void 0;
          return text(input, init).then(function(response) {
            return parse(response, row);
          });
        };
      }
      function dsv(delimiter, input, init, row) {
        if (arguments.length === 3 && typeof init === "function")
          row = init, init = void 0;
        var format = d3Dsv.dsvFormat(delimiter);
        return text(input, init).then(function(response) {
          return format.parse(response, row);
        });
      }
      var csv = dsvParse(d3Dsv.csvParse);
      var tsv = dsvParse(d3Dsv.tsvParse);
      function image(input, init) {
        return new Promise(function(resolve, reject) {
          var image2 = new Image();
          for (var key in init)
            image2[key] = init[key];
          image2.onerror = reject;
          image2.onload = function() {
            resolve(image2);
          };
          image2.src = input;
        });
      }
      function responseJson(response) {
        if (!response.ok)
          throw new Error(response.status + " " + response.statusText);
        if (response.status === 204 || response.status === 205)
          return;
        return response.json();
      }
      function json2(input, init) {
        return fetch(input, init).then(responseJson);
      }
      function parser(type) {
        return (input, init) => text(input, init).then((text2) => new DOMParser().parseFromString(text2, type));
      }
      var xml = parser("application/xml");
      var html = parser("text/html");
      var svg = parser("image/svg+xml");
      exports2.blob = blob;
      exports2.buffer = buffer;
      exports2.csv = csv;
      exports2.dsv = dsv;
      exports2.html = html;
      exports2.image = image;
      exports2.json = json2;
      exports2.svg = svg;
      exports2.text = text;
      exports2.tsv = tsv;
      exports2.xml = xml;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-quadtree/dist/d3-quadtree.js
  var require_d3_quadtree = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      function tree_add(d) {
        const x = +this._x.call(null, d), y = +this._y.call(null, d);
        return add(this.cover(x, y), x, y, d);
      }
      function add(tree, x, y, d) {
        if (isNaN(x) || isNaN(y))
          return tree;
        var parent, node = tree._root, leaf = {data: d}, x0 = tree._x0, y0 = tree._y0, x1 = tree._x1, y1 = tree._y1, xm, ym, xp, yp, right, bottom, i, j;
        if (!node)
          return tree._root = leaf, tree;
        while (node.length) {
          if (right = x >= (xm = (x0 + x1) / 2))
            x0 = xm;
          else
            x1 = xm;
          if (bottom = y >= (ym = (y0 + y1) / 2))
            y0 = ym;
          else
            y1 = ym;
          if (parent = node, !(node = node[i = bottom << 1 | right]))
            return parent[i] = leaf, tree;
        }
        xp = +tree._x.call(null, node.data);
        yp = +tree._y.call(null, node.data);
        if (x === xp && y === yp)
          return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;
        do {
          parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
          if (right = x >= (xm = (x0 + x1) / 2))
            x0 = xm;
          else
            x1 = xm;
          if (bottom = y >= (ym = (y0 + y1) / 2))
            y0 = ym;
          else
            y1 = ym;
        } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | xp >= xm));
        return parent[j] = node, parent[i] = leaf, tree;
      }
      function addAll(data) {
        var d, i, n = data.length, x, y, xz = new Array(n), yz = new Array(n), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
        for (i = 0; i < n; ++i) {
          if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d)))
            continue;
          xz[i] = x;
          yz[i] = y;
          if (x < x0)
            x0 = x;
          if (x > x1)
            x1 = x;
          if (y < y0)
            y0 = y;
          if (y > y1)
            y1 = y;
        }
        if (x0 > x1 || y0 > y1)
          return this;
        this.cover(x0, y0).cover(x1, y1);
        for (i = 0; i < n; ++i) {
          add(this, xz[i], yz[i], data[i]);
        }
        return this;
      }
      function tree_cover(x, y) {
        if (isNaN(x = +x) || isNaN(y = +y))
          return this;
        var x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1;
        if (isNaN(x0)) {
          x1 = (x0 = Math.floor(x)) + 1;
          y1 = (y0 = Math.floor(y)) + 1;
        } else {
          var z = x1 - x0 || 1, node = this._root, parent, i;
          while (x0 > x || x >= x1 || y0 > y || y >= y1) {
            i = (y < y0) << 1 | x < x0;
            parent = new Array(4), parent[i] = node, node = parent, z *= 2;
            switch (i) {
              case 0:
                x1 = x0 + z, y1 = y0 + z;
                break;
              case 1:
                x0 = x1 - z, y1 = y0 + z;
                break;
              case 2:
                x1 = x0 + z, y0 = y1 - z;
                break;
              case 3:
                x0 = x1 - z, y0 = y1 - z;
                break;
            }
          }
          if (this._root && this._root.length)
            this._root = node;
        }
        this._x0 = x0;
        this._y0 = y0;
        this._x1 = x1;
        this._y1 = y1;
        return this;
      }
      function tree_data() {
        var data = [];
        this.visit(function(node) {
          if (!node.length)
            do
              data.push(node.data);
            while (node = node.next);
        });
        return data;
      }
      function tree_extent(_) {
        return arguments.length ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
      }
      function Quad(node, x0, y0, x1, y1) {
        this.node = node;
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
      }
      function tree_find(x, y, radius) {
        var data, x0 = this._x0, y0 = this._y0, x1, y1, x2, y2, x3 = this._x1, y3 = this._y1, quads = [], node = this._root, q, i;
        if (node)
          quads.push(new Quad(node, x0, y0, x3, y3));
        if (radius == null)
          radius = Infinity;
        else {
          x0 = x - radius, y0 = y - radius;
          x3 = x + radius, y3 = y + radius;
          radius *= radius;
        }
        while (q = quads.pop()) {
          if (!(node = q.node) || (x1 = q.x0) > x3 || (y1 = q.y0) > y3 || (x2 = q.x1) < x0 || (y2 = q.y1) < y0)
            continue;
          if (node.length) {
            var xm = (x1 + x2) / 2, ym = (y1 + y2) / 2;
            quads.push(new Quad(node[3], xm, ym, x2, y2), new Quad(node[2], x1, ym, xm, y2), new Quad(node[1], xm, y1, x2, ym), new Quad(node[0], x1, y1, xm, ym));
            if (i = (y >= ym) << 1 | x >= xm) {
              q = quads[quads.length - 1];
              quads[quads.length - 1] = quads[quads.length - 1 - i];
              quads[quads.length - 1 - i] = q;
            }
          } else {
            var dx = x - +this._x.call(null, node.data), dy = y - +this._y.call(null, node.data), d2 = dx * dx + dy * dy;
            if (d2 < radius) {
              var d = Math.sqrt(radius = d2);
              x0 = x - d, y0 = y - d;
              x3 = x + d, y3 = y + d;
              data = node.data;
            }
          }
        }
        return data;
      }
      function tree_remove(d) {
        if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d)))
          return this;
        var parent, node = this._root, retainer, previous, next, x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1, x, y, xm, ym, right, bottom, i, j;
        if (!node)
          return this;
        if (node.length)
          while (true) {
            if (right = x >= (xm = (x0 + x1) / 2))
              x0 = xm;
            else
              x1 = xm;
            if (bottom = y >= (ym = (y0 + y1) / 2))
              y0 = ym;
            else
              y1 = ym;
            if (!(parent = node, node = node[i = bottom << 1 | right]))
              return this;
            if (!node.length)
              break;
            if (parent[i + 1 & 3] || parent[i + 2 & 3] || parent[i + 3 & 3])
              retainer = parent, j = i;
          }
        while (node.data !== d)
          if (!(previous = node, node = node.next))
            return this;
        if (next = node.next)
          delete node.next;
        if (previous)
          return next ? previous.next = next : delete previous.next, this;
        if (!parent)
          return this._root = next, this;
        next ? parent[i] = next : delete parent[i];
        if ((node = parent[0] || parent[1] || parent[2] || parent[3]) && node === (parent[3] || parent[2] || parent[1] || parent[0]) && !node.length) {
          if (retainer)
            retainer[j] = node;
          else
            this._root = node;
        }
        return this;
      }
      function removeAll(data) {
        for (var i = 0, n = data.length; i < n; ++i)
          this.remove(data[i]);
        return this;
      }
      function tree_root() {
        return this._root;
      }
      function tree_size() {
        var size = 0;
        this.visit(function(node) {
          if (!node.length)
            do
              ++size;
            while (node = node.next);
        });
        return size;
      }
      function tree_visit(callback) {
        var quads = [], q, node = this._root, child, x0, y0, x1, y1;
        if (node)
          quads.push(new Quad(node, this._x0, this._y0, this._x1, this._y1));
        while (q = quads.pop()) {
          if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
            var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
            if (child = node[3])
              quads.push(new Quad(child, xm, ym, x1, y1));
            if (child = node[2])
              quads.push(new Quad(child, x0, ym, xm, y1));
            if (child = node[1])
              quads.push(new Quad(child, xm, y0, x1, ym));
            if (child = node[0])
              quads.push(new Quad(child, x0, y0, xm, ym));
          }
        }
        return this;
      }
      function tree_visitAfter(callback) {
        var quads = [], next = [], q;
        if (this._root)
          quads.push(new Quad(this._root, this._x0, this._y0, this._x1, this._y1));
        while (q = quads.pop()) {
          var node = q.node;
          if (node.length) {
            var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
            if (child = node[0])
              quads.push(new Quad(child, x0, y0, xm, ym));
            if (child = node[1])
              quads.push(new Quad(child, xm, y0, x1, ym));
            if (child = node[2])
              quads.push(new Quad(child, x0, ym, xm, y1));
            if (child = node[3])
              quads.push(new Quad(child, xm, ym, x1, y1));
          }
          next.push(q);
        }
        while (q = next.pop()) {
          callback(q.node, q.x0, q.y0, q.x1, q.y1);
        }
        return this;
      }
      function defaultX(d) {
        return d[0];
      }
      function tree_x(_) {
        return arguments.length ? (this._x = _, this) : this._x;
      }
      function defaultY(d) {
        return d[1];
      }
      function tree_y(_) {
        return arguments.length ? (this._y = _, this) : this._y;
      }
      function quadtree(nodes, x, y) {
        var tree = new Quadtree(x == null ? defaultX : x, y == null ? defaultY : y, NaN, NaN, NaN, NaN);
        return nodes == null ? tree : tree.addAll(nodes);
      }
      function Quadtree(x, y, x0, y0, x1, y1) {
        this._x = x;
        this._y = y;
        this._x0 = x0;
        this._y0 = y0;
        this._x1 = x1;
        this._y1 = y1;
        this._root = void 0;
      }
      function leaf_copy(leaf) {
        var copy = {data: leaf.data}, next = copy;
        while (leaf = leaf.next)
          next = next.next = {data: leaf.data};
        return copy;
      }
      var treeProto = quadtree.prototype = Quadtree.prototype;
      treeProto.copy = function() {
        var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1), node = this._root, nodes, child;
        if (!node)
          return copy;
        if (!node.length)
          return copy._root = leaf_copy(node), copy;
        nodes = [{source: node, target: copy._root = new Array(4)}];
        while (node = nodes.pop()) {
          for (var i = 0; i < 4; ++i) {
            if (child = node.source[i]) {
              if (child.length)
                nodes.push({source: child, target: node.target[i] = new Array(4)});
              else
                node.target[i] = leaf_copy(child);
            }
          }
        }
        return copy;
      };
      treeProto.add = tree_add;
      treeProto.addAll = addAll;
      treeProto.cover = tree_cover;
      treeProto.data = tree_data;
      treeProto.extent = tree_extent;
      treeProto.find = tree_find;
      treeProto.remove = tree_remove;
      treeProto.removeAll = removeAll;
      treeProto.root = tree_root;
      treeProto.size = tree_size;
      treeProto.visit = tree_visit;
      treeProto.visitAfter = tree_visitAfter;
      treeProto.x = tree_x;
      treeProto.y = tree_y;
      exports2.quadtree = quadtree;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-force/dist/d3-force.js
  var require_d3_force = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_d3_quadtree(), require_d3_dispatch(), require_d3_timer()) : typeof define === "function" && define.amd ? define(["exports", "d3-quadtree", "d3-dispatch", "d3-timer"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}, global.d3, global.d3, global.d3));
    })(exports, function(exports2, d3Quadtree, d3Dispatch, d3Timer) {
      "use strict";
      function center(x2, y2) {
        var nodes, strength = 1;
        if (x2 == null)
          x2 = 0;
        if (y2 == null)
          y2 = 0;
        function force() {
          var i, n = nodes.length, node, sx = 0, sy = 0;
          for (i = 0; i < n; ++i) {
            node = nodes[i], sx += node.x, sy += node.y;
          }
          for (sx = (sx / n - x2) * strength, sy = (sy / n - y2) * strength, i = 0; i < n; ++i) {
            node = nodes[i], node.x -= sx, node.y -= sy;
          }
        }
        force.initialize = function(_) {
          nodes = _;
        };
        force.x = function(_) {
          return arguments.length ? (x2 = +_, force) : x2;
        };
        force.y = function(_) {
          return arguments.length ? (y2 = +_, force) : y2;
        };
        force.strength = function(_) {
          return arguments.length ? (strength = +_, force) : strength;
        };
        return force;
      }
      function constant(x2) {
        return function() {
          return x2;
        };
      }
      function jiggle(random) {
        return (random() - 0.5) * 1e-6;
      }
      function x(d) {
        return d.x + d.vx;
      }
      function y(d) {
        return d.y + d.vy;
      }
      function collide(radius) {
        var nodes, radii, random, strength = 1, iterations = 1;
        if (typeof radius !== "function")
          radius = constant(radius == null ? 1 : +radius);
        function force() {
          var i, n = nodes.length, tree, node, xi, yi, ri, ri2;
          for (var k = 0; k < iterations; ++k) {
            tree = d3Quadtree.quadtree(nodes, x, y).visitAfter(prepare);
            for (i = 0; i < n; ++i) {
              node = nodes[i];
              ri = radii[node.index], ri2 = ri * ri;
              xi = node.x + node.vx;
              yi = node.y + node.vy;
              tree.visit(apply);
            }
          }
          function apply(quad, x0, y0, x1, y1) {
            var data = quad.data, rj = quad.r, r = ri + rj;
            if (data) {
              if (data.index > node.index) {
                var x2 = xi - data.x - data.vx, y2 = yi - data.y - data.vy, l = x2 * x2 + y2 * y2;
                if (l < r * r) {
                  if (x2 === 0)
                    x2 = jiggle(random), l += x2 * x2;
                  if (y2 === 0)
                    y2 = jiggle(random), l += y2 * y2;
                  l = (r - (l = Math.sqrt(l))) / l * strength;
                  node.vx += (x2 *= l) * (r = (rj *= rj) / (ri2 + rj));
                  node.vy += (y2 *= l) * r;
                  data.vx -= x2 * (r = 1 - r);
                  data.vy -= y2 * r;
                }
              }
              return;
            }
            return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
          }
        }
        function prepare(quad) {
          if (quad.data)
            return quad.r = radii[quad.data.index];
          for (var i = quad.r = 0; i < 4; ++i) {
            if (quad[i] && quad[i].r > quad.r) {
              quad.r = quad[i].r;
            }
          }
        }
        function initialize() {
          if (!nodes)
            return;
          var i, n = nodes.length, node;
          radii = new Array(n);
          for (i = 0; i < n; ++i)
            node = nodes[i], radii[node.index] = +radius(node, i, nodes);
        }
        force.initialize = function(_nodes, _random) {
          nodes = _nodes;
          random = _random;
          initialize();
        };
        force.iterations = function(_) {
          return arguments.length ? (iterations = +_, force) : iterations;
        };
        force.strength = function(_) {
          return arguments.length ? (strength = +_, force) : strength;
        };
        force.radius = function(_) {
          return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), initialize(), force) : radius;
        };
        return force;
      }
      function index(d) {
        return d.index;
      }
      function find(nodeById, nodeId) {
        var node = nodeById.get(nodeId);
        if (!node)
          throw new Error("node not found: " + nodeId);
        return node;
      }
      function link(links) {
        var id = index, strength = defaultStrength, strengths, distance = constant(30), distances, nodes, count, bias, random, iterations = 1;
        if (links == null)
          links = [];
        function defaultStrength(link2) {
          return 1 / Math.min(count[link2.source.index], count[link2.target.index]);
        }
        function force(alpha) {
          for (var k = 0, n = links.length; k < iterations; ++k) {
            for (var i = 0, link2, source, target, x2, y2, l, b; i < n; ++i) {
              link2 = links[i], source = link2.source, target = link2.target;
              x2 = target.x + target.vx - source.x - source.vx || jiggle(random);
              y2 = target.y + target.vy - source.y - source.vy || jiggle(random);
              l = Math.sqrt(x2 * x2 + y2 * y2);
              l = (l - distances[i]) / l * alpha * strengths[i];
              x2 *= l, y2 *= l;
              target.vx -= x2 * (b = bias[i]);
              target.vy -= y2 * b;
              source.vx += x2 * (b = 1 - b);
              source.vy += y2 * b;
            }
          }
        }
        function initialize() {
          if (!nodes)
            return;
          var i, n = nodes.length, m2 = links.length, nodeById = new Map(nodes.map((d, i2) => [id(d, i2, nodes), d])), link2;
          for (i = 0, count = new Array(n); i < m2; ++i) {
            link2 = links[i], link2.index = i;
            if (typeof link2.source !== "object")
              link2.source = find(nodeById, link2.source);
            if (typeof link2.target !== "object")
              link2.target = find(nodeById, link2.target);
            count[link2.source.index] = (count[link2.source.index] || 0) + 1;
            count[link2.target.index] = (count[link2.target.index] || 0) + 1;
          }
          for (i = 0, bias = new Array(m2); i < m2; ++i) {
            link2 = links[i], bias[i] = count[link2.source.index] / (count[link2.source.index] + count[link2.target.index]);
          }
          strengths = new Array(m2), initializeStrength();
          distances = new Array(m2), initializeDistance();
        }
        function initializeStrength() {
          if (!nodes)
            return;
          for (var i = 0, n = links.length; i < n; ++i) {
            strengths[i] = +strength(links[i], i, links);
          }
        }
        function initializeDistance() {
          if (!nodes)
            return;
          for (var i = 0, n = links.length; i < n; ++i) {
            distances[i] = +distance(links[i], i, links);
          }
        }
        force.initialize = function(_nodes, _random) {
          nodes = _nodes;
          random = _random;
          initialize();
        };
        force.links = function(_) {
          return arguments.length ? (links = _, initialize(), force) : links;
        };
        force.id = function(_) {
          return arguments.length ? (id = _, force) : id;
        };
        force.iterations = function(_) {
          return arguments.length ? (iterations = +_, force) : iterations;
        };
        force.strength = function(_) {
          return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initializeStrength(), force) : strength;
        };
        force.distance = function(_) {
          return arguments.length ? (distance = typeof _ === "function" ? _ : constant(+_), initializeDistance(), force) : distance;
        };
        return force;
      }
      const a = 1664525;
      const c = 1013904223;
      const m = 4294967296;
      function lcg() {
        let s = 1;
        return () => (s = (a * s + c) % m) / m;
      }
      function x$1(d) {
        return d.x;
      }
      function y$1(d) {
        return d.y;
      }
      var initialRadius = 10, initialAngle = Math.PI * (3 - Math.sqrt(5));
      function simulation(nodes) {
        var simulation2, alpha = 1, alphaMin = 1e-3, alphaDecay = 1 - Math.pow(alphaMin, 1 / 300), alphaTarget = 0, velocityDecay = 0.6, forces = new Map(), stepper = d3Timer.timer(step), event = d3Dispatch.dispatch("tick", "end"), random = lcg();
        if (nodes == null)
          nodes = [];
        function step() {
          tick();
          event.call("tick", simulation2);
          if (alpha < alphaMin) {
            stepper.stop();
            event.call("end", simulation2);
          }
        }
        function tick(iterations) {
          var i, n = nodes.length, node;
          if (iterations === void 0)
            iterations = 1;
          for (var k = 0; k < iterations; ++k) {
            alpha += (alphaTarget - alpha) * alphaDecay;
            forces.forEach(function(force) {
              force(alpha);
            });
            for (i = 0; i < n; ++i) {
              node = nodes[i];
              if (node.fx == null)
                node.x += node.vx *= velocityDecay;
              else
                node.x = node.fx, node.vx = 0;
              if (node.fy == null)
                node.y += node.vy *= velocityDecay;
              else
                node.y = node.fy, node.vy = 0;
            }
          }
          return simulation2;
        }
        function initializeNodes() {
          for (var i = 0, n = nodes.length, node; i < n; ++i) {
            node = nodes[i], node.index = i;
            if (node.fx != null)
              node.x = node.fx;
            if (node.fy != null)
              node.y = node.fy;
            if (isNaN(node.x) || isNaN(node.y)) {
              var radius = initialRadius * Math.sqrt(0.5 + i), angle = i * initialAngle;
              node.x = radius * Math.cos(angle);
              node.y = radius * Math.sin(angle);
            }
            if (isNaN(node.vx) || isNaN(node.vy)) {
              node.vx = node.vy = 0;
            }
          }
        }
        function initializeForce(force) {
          if (force.initialize)
            force.initialize(nodes, random);
          return force;
        }
        initializeNodes();
        return simulation2 = {
          tick,
          restart: function() {
            return stepper.restart(step), simulation2;
          },
          stop: function() {
            return stepper.stop(), simulation2;
          },
          nodes: function(_) {
            return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation2) : nodes;
          },
          alpha: function(_) {
            return arguments.length ? (alpha = +_, simulation2) : alpha;
          },
          alphaMin: function(_) {
            return arguments.length ? (alphaMin = +_, simulation2) : alphaMin;
          },
          alphaDecay: function(_) {
            return arguments.length ? (alphaDecay = +_, simulation2) : +alphaDecay;
          },
          alphaTarget: function(_) {
            return arguments.length ? (alphaTarget = +_, simulation2) : alphaTarget;
          },
          velocityDecay: function(_) {
            return arguments.length ? (velocityDecay = 1 - _, simulation2) : 1 - velocityDecay;
          },
          randomSource: function(_) {
            return arguments.length ? (random = _, forces.forEach(initializeForce), simulation2) : random;
          },
          force: function(name, _) {
            return arguments.length > 1 ? (_ == null ? forces.delete(name) : forces.set(name, initializeForce(_)), simulation2) : forces.get(name);
          },
          find: function(x2, y2, radius) {
            var i = 0, n = nodes.length, dx, dy, d2, node, closest;
            if (radius == null)
              radius = Infinity;
            else
              radius *= radius;
            for (i = 0; i < n; ++i) {
              node = nodes[i];
              dx = x2 - node.x;
              dy = y2 - node.y;
              d2 = dx * dx + dy * dy;
              if (d2 < radius)
                closest = node, radius = d2;
            }
            return closest;
          },
          on: function(name, _) {
            return arguments.length > 1 ? (event.on(name, _), simulation2) : event.on(name);
          }
        };
      }
      function manyBody() {
        var nodes, node, random, alpha, strength = constant(-30), strengths, distanceMin2 = 1, distanceMax2 = Infinity, theta2 = 0.81;
        function force(_) {
          var i, n = nodes.length, tree = d3Quadtree.quadtree(nodes, x$1, y$1).visitAfter(accumulate);
          for (alpha = _, i = 0; i < n; ++i)
            node = nodes[i], tree.visit(apply);
        }
        function initialize() {
          if (!nodes)
            return;
          var i, n = nodes.length, node2;
          strengths = new Array(n);
          for (i = 0; i < n; ++i)
            node2 = nodes[i], strengths[node2.index] = +strength(node2, i, nodes);
        }
        function accumulate(quad) {
          var strength2 = 0, q, c2, weight = 0, x2, y2, i;
          if (quad.length) {
            for (x2 = y2 = i = 0; i < 4; ++i) {
              if ((q = quad[i]) && (c2 = Math.abs(q.value))) {
                strength2 += q.value, weight += c2, x2 += c2 * q.x, y2 += c2 * q.y;
              }
            }
            quad.x = x2 / weight;
            quad.y = y2 / weight;
          } else {
            q = quad;
            q.x = q.data.x;
            q.y = q.data.y;
            do
              strength2 += strengths[q.data.index];
            while (q = q.next);
          }
          quad.value = strength2;
        }
        function apply(quad, x1, _, x2) {
          if (!quad.value)
            return true;
          var x3 = quad.x - node.x, y2 = quad.y - node.y, w = x2 - x1, l = x3 * x3 + y2 * y2;
          if (w * w / theta2 < l) {
            if (l < distanceMax2) {
              if (x3 === 0)
                x3 = jiggle(random), l += x3 * x3;
              if (y2 === 0)
                y2 = jiggle(random), l += y2 * y2;
              if (l < distanceMin2)
                l = Math.sqrt(distanceMin2 * l);
              node.vx += x3 * quad.value * alpha / l;
              node.vy += y2 * quad.value * alpha / l;
            }
            return true;
          } else if (quad.length || l >= distanceMax2)
            return;
          if (quad.data !== node || quad.next) {
            if (x3 === 0)
              x3 = jiggle(random), l += x3 * x3;
            if (y2 === 0)
              y2 = jiggle(random), l += y2 * y2;
            if (l < distanceMin2)
              l = Math.sqrt(distanceMin2 * l);
          }
          do
            if (quad.data !== node) {
              w = strengths[quad.data.index] * alpha / l;
              node.vx += x3 * w;
              node.vy += y2 * w;
            }
          while (quad = quad.next);
        }
        force.initialize = function(_nodes, _random) {
          nodes = _nodes;
          random = _random;
          initialize();
        };
        force.strength = function(_) {
          return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
        };
        force.distanceMin = function(_) {
          return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
        };
        force.distanceMax = function(_) {
          return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
        };
        force.theta = function(_) {
          return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
        };
        return force;
      }
      function radial(radius, x2, y2) {
        var nodes, strength = constant(0.1), strengths, radiuses;
        if (typeof radius !== "function")
          radius = constant(+radius);
        if (x2 == null)
          x2 = 0;
        if (y2 == null)
          y2 = 0;
        function force(alpha) {
          for (var i = 0, n = nodes.length; i < n; ++i) {
            var node = nodes[i], dx = node.x - x2 || 1e-6, dy = node.y - y2 || 1e-6, r = Math.sqrt(dx * dx + dy * dy), k = (radiuses[i] - r) * strengths[i] * alpha / r;
            node.vx += dx * k;
            node.vy += dy * k;
          }
        }
        function initialize() {
          if (!nodes)
            return;
          var i, n = nodes.length;
          strengths = new Array(n);
          radiuses = new Array(n);
          for (i = 0; i < n; ++i) {
            radiuses[i] = +radius(nodes[i], i, nodes);
            strengths[i] = isNaN(radiuses[i]) ? 0 : +strength(nodes[i], i, nodes);
          }
        }
        force.initialize = function(_) {
          nodes = _, initialize();
        };
        force.strength = function(_) {
          return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
        };
        force.radius = function(_) {
          return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), initialize(), force) : radius;
        };
        force.x = function(_) {
          return arguments.length ? (x2 = +_, force) : x2;
        };
        force.y = function(_) {
          return arguments.length ? (y2 = +_, force) : y2;
        };
        return force;
      }
      function x$2(x2) {
        var strength = constant(0.1), nodes, strengths, xz;
        if (typeof x2 !== "function")
          x2 = constant(x2 == null ? 0 : +x2);
        function force(alpha) {
          for (var i = 0, n = nodes.length, node; i < n; ++i) {
            node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;
          }
        }
        function initialize() {
          if (!nodes)
            return;
          var i, n = nodes.length;
          strengths = new Array(n);
          xz = new Array(n);
          for (i = 0; i < n; ++i) {
            strengths[i] = isNaN(xz[i] = +x2(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
          }
        }
        force.initialize = function(_) {
          nodes = _;
          initialize();
        };
        force.strength = function(_) {
          return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
        };
        force.x = function(_) {
          return arguments.length ? (x2 = typeof _ === "function" ? _ : constant(+_), initialize(), force) : x2;
        };
        return force;
      }
      function y$2(y2) {
        var strength = constant(0.1), nodes, strengths, yz;
        if (typeof y2 !== "function")
          y2 = constant(y2 == null ? 0 : +y2);
        function force(alpha) {
          for (var i = 0, n = nodes.length, node; i < n; ++i) {
            node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;
          }
        }
        function initialize() {
          if (!nodes)
            return;
          var i, n = nodes.length;
          strengths = new Array(n);
          yz = new Array(n);
          for (i = 0; i < n; ++i) {
            strengths[i] = isNaN(yz[i] = +y2(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
          }
        }
        force.initialize = function(_) {
          nodes = _;
          initialize();
        };
        force.strength = function(_) {
          return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
        };
        force.y = function(_) {
          return arguments.length ? (y2 = typeof _ === "function" ? _ : constant(+_), initialize(), force) : y2;
        };
        return force;
      }
      exports2.forceCenter = center;
      exports2.forceCollide = collide;
      exports2.forceLink = link;
      exports2.forceManyBody = manyBody;
      exports2.forceRadial = radial;
      exports2.forceSimulation = simulation;
      exports2.forceX = x$2;
      exports2.forceY = y$2;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-format/dist/d3-format.js
  var require_d3_format = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.d3 = global.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      function formatDecimal(x) {
        return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
      }
      function formatDecimalParts(x, p) {
        if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0)
          return null;
        var i, coefficient = x.slice(0, i);
        return [
          coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
          +x.slice(i + 1)
        ];
      }
      function exponent(x) {
        return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
      }
      function formatGroup(grouping, thousands) {
        return function(value, width2) {
          var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
          while (i > 0 && g > 0) {
            if (length + g + 1 > width2)
              g = Math.max(1, width2 - length);
            t.push(value.substring(i -= g, i + g));
            if ((length += g + 1) > width2)
              break;
            g = grouping[j = (j + 1) % grouping.length];
          }
          return t.reverse().join(thousands);
        };
      }
      function formatNumerals(numerals) {
        return function(value) {
          return value.replace(/[0-9]/g, function(i) {
            return numerals[+i];
          });
        };
      }
      var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
      function formatSpecifier(specifier) {
        if (!(match = re.exec(specifier)))
          throw new Error("invalid format: " + specifier);
        var match;
        return new FormatSpecifier({
          fill: match[1],
          align: match[2],
          sign: match[3],
          symbol: match[4],
          zero: match[5],
          width: match[6],
          comma: match[7],
          precision: match[8] && match[8].slice(1),
          trim: match[9],
          type: match[10]
        });
      }
      formatSpecifier.prototype = FormatSpecifier.prototype;
      function FormatSpecifier(specifier) {
        this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
        this.align = specifier.align === void 0 ? ">" : specifier.align + "";
        this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
        this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
        this.zero = !!specifier.zero;
        this.width = specifier.width === void 0 ? void 0 : +specifier.width;
        this.comma = !!specifier.comma;
        this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
        this.trim = !!specifier.trim;
        this.type = specifier.type === void 0 ? "" : specifier.type + "";
      }
      FormatSpecifier.prototype.toString = function() {
        return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
      };
      function formatTrim(s) {
        out:
          for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
            switch (s[i]) {
              case ".":
                i0 = i1 = i;
                break;
              case "0":
                if (i0 === 0)
                  i0 = i;
                i1 = i;
                break;
              default:
                if (!+s[i])
                  break out;
                if (i0 > 0)
                  i0 = 0;
                break;
            }
          }
        return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
      }
      var prefixExponent;
      function formatPrefixAuto(x, p) {
        var d = formatDecimalParts(x, p);
        if (!d)
          return x + "";
        var coefficient = d[0], exponent2 = d[1], i = exponent2 - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent2 / 3))) * 3) + 1, n = coefficient.length;
        return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0];
      }
      function formatRounded(x, p) {
        var d = formatDecimalParts(x, p);
        if (!d)
          return x + "";
        var coefficient = d[0], exponent2 = d[1];
        return exponent2 < 0 ? "0." + new Array(-exponent2).join("0") + coefficient : coefficient.length > exponent2 + 1 ? coefficient.slice(0, exponent2 + 1) + "." + coefficient.slice(exponent2 + 1) : coefficient + new Array(exponent2 - coefficient.length + 2).join("0");
      }
      var formatTypes = {
        "%": (x, p) => (x * 100).toFixed(p),
        b: (x) => Math.round(x).toString(2),
        c: (x) => x + "",
        d: formatDecimal,
        e: (x, p) => x.toExponential(p),
        f: (x, p) => x.toFixed(p),
        g: (x, p) => x.toPrecision(p),
        o: (x) => Math.round(x).toString(8),
        p: (x, p) => formatRounded(x * 100, p),
        r: formatRounded,
        s: formatPrefixAuto,
        X: (x) => Math.round(x).toString(16).toUpperCase(),
        x: (x) => Math.round(x).toString(16)
      };
      function identity(x) {
        return x;
      }
      var map = Array.prototype.map, prefixes = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
      function formatLocale(locale2) {
        var group = locale2.grouping === void 0 || locale2.thousands === void 0 ? identity : formatGroup(map.call(locale2.grouping, Number), locale2.thousands + ""), currencyPrefix = locale2.currency === void 0 ? "" : locale2.currency[0] + "", currencySuffix = locale2.currency === void 0 ? "" : locale2.currency[1] + "", decimal = locale2.decimal === void 0 ? "." : locale2.decimal + "", numerals = locale2.numerals === void 0 ? identity : formatNumerals(map.call(locale2.numerals, String)), percent = locale2.percent === void 0 ? "%" : locale2.percent + "", minus = locale2.minus === void 0 ? "\u2212" : locale2.minus + "", nan = locale2.nan === void 0 ? "NaN" : locale2.nan + "";
        function newFormat(specifier) {
          specifier = formatSpecifier(specifier);
          var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero = specifier.zero, width2 = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
          if (type === "n")
            comma = true, type = "g";
          else if (!formatTypes[type])
            precision === void 0 && (precision = 12), trim = true, type = "g";
          if (zero || fill === "0" && align === "=")
            zero = true, fill = "0", align = "=";
          var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
          var formatType = formatTypes[type], maybeSuffix = /[defgprs%]/.test(type);
          precision = precision === void 0 ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
          function format(value) {
            var valuePrefix = prefix, valueSuffix = suffix, i, n, c;
            if (type === "c") {
              valueSuffix = formatType(value) + valueSuffix;
              value = "";
            } else {
              value = +value;
              var valueNegative = value < 0 || 1 / value < 0;
              value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
              if (trim)
                value = formatTrim(value);
              if (valueNegative && +value === 0 && sign !== "+")
                valueNegative = false;
              valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
              valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
              if (maybeSuffix) {
                i = -1, n = value.length;
                while (++i < n) {
                  if (c = value.charCodeAt(i), 48 > c || c > 57) {
                    valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                    value = value.slice(0, i);
                    break;
                  }
                }
              }
            }
            if (comma && !zero)
              value = group(value, Infinity);
            var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width2 ? new Array(width2 - length + 1).join(fill) : "";
            if (comma && zero)
              value = group(padding + value, padding.length ? width2 - valueSuffix.length : Infinity), padding = "";
            switch (align) {
              case "<":
                value = valuePrefix + value + valueSuffix + padding;
                break;
              case "=":
                value = valuePrefix + padding + value + valueSuffix;
                break;
              case "^":
                value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
                break;
              default:
                value = padding + valuePrefix + value + valueSuffix;
                break;
            }
            return numerals(value);
          }
          format.toString = function() {
            return specifier + "";
          };
          return format;
        }
        function formatPrefix(specifier, value) {
          var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3, k = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
          return function(value2) {
            return f(k * value2) + prefix;
          };
        }
        return {
          format: newFormat,
          formatPrefix
        };
      }
      var locale;
      defaultLocale({
        thousands: ",",
        grouping: [3],
        currency: ["$", ""]
      });
      function defaultLocale(definition) {
        locale = formatLocale(definition);
        exports2.format = locale.format;
        exports2.formatPrefix = locale.formatPrefix;
        return locale;
      }
      function precisionFixed(step) {
        return Math.max(0, -exponent(Math.abs(step)));
      }
      function precisionPrefix(step, value) {
        return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
      }
      function precisionRound(step, max) {
        step = Math.abs(step), max = Math.abs(max) - step;
        return Math.max(0, exponent(max) - exponent(step)) + 1;
      }
      exports2.FormatSpecifier = FormatSpecifier;
      exports2.formatDefaultLocale = defaultLocale;
      exports2.formatLocale = formatLocale;
      exports2.formatSpecifier = formatSpecifier;
      exports2.precisionFixed = precisionFixed;
      exports2.precisionPrefix = precisionPrefix;
      exports2.precisionRound = precisionRound;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-geo/dist/d3-geo.js
  var require_d3_geo = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_d3_array()) : typeof define === "function" && define.amd ? define(["exports", "d3-array"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}, global.d3));
    })(exports, function(exports2, d3Array) {
      "use strict";
      var epsilon = 1e-6;
      var epsilon2 = 1e-12;
      var pi = Math.PI;
      var halfPi = pi / 2;
      var quarterPi = pi / 4;
      var tau = pi * 2;
      var degrees = 180 / pi;
      var radians = pi / 180;
      var abs = Math.abs;
      var atan = Math.atan;
      var atan2 = Math.atan2;
      var cos = Math.cos;
      var ceil = Math.ceil;
      var exp = Math.exp;
      var hypot = Math.hypot;
      var log = Math.log;
      var pow = Math.pow;
      var sin = Math.sin;
      var sign = Math.sign || function(x) {
        return x > 0 ? 1 : x < 0 ? -1 : 0;
      };
      var sqrt = Math.sqrt;
      var tan = Math.tan;
      function acos(x) {
        return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
      }
      function asin(x) {
        return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
      }
      function haversin(x) {
        return (x = sin(x / 2)) * x;
      }
      function noop() {
      }
      function streamGeometry(geometry, stream) {
        if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
          streamGeometryType[geometry.type](geometry, stream);
        }
      }
      var streamObjectType = {
        Feature: function(object2, stream) {
          streamGeometry(object2.geometry, stream);
        },
        FeatureCollection: function(object2, stream) {
          var features = object2.features, i = -1, n = features.length;
          while (++i < n)
            streamGeometry(features[i].geometry, stream);
        }
      };
      var streamGeometryType = {
        Sphere: function(object2, stream) {
          stream.sphere();
        },
        Point: function(object2, stream) {
          object2 = object2.coordinates;
          stream.point(object2[0], object2[1], object2[2]);
        },
        MultiPoint: function(object2, stream) {
          var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
          while (++i < n)
            object2 = coordinates2[i], stream.point(object2[0], object2[1], object2[2]);
        },
        LineString: function(object2, stream) {
          streamLine(object2.coordinates, stream, 0);
        },
        MultiLineString: function(object2, stream) {
          var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
          while (++i < n)
            streamLine(coordinates2[i], stream, 0);
        },
        Polygon: function(object2, stream) {
          streamPolygon(object2.coordinates, stream);
        },
        MultiPolygon: function(object2, stream) {
          var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
          while (++i < n)
            streamPolygon(coordinates2[i], stream);
        },
        GeometryCollection: function(object2, stream) {
          var geometries = object2.geometries, i = -1, n = geometries.length;
          while (++i < n)
            streamGeometry(geometries[i], stream);
        }
      };
      function streamLine(coordinates2, stream, closed) {
        var i = -1, n = coordinates2.length - closed, coordinate;
        stream.lineStart();
        while (++i < n)
          coordinate = coordinates2[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
        stream.lineEnd();
      }
      function streamPolygon(coordinates2, stream) {
        var i = -1, n = coordinates2.length;
        stream.polygonStart();
        while (++i < n)
          streamLine(coordinates2[i], stream, 1);
        stream.polygonEnd();
      }
      function geoStream(object2, stream) {
        if (object2 && streamObjectType.hasOwnProperty(object2.type)) {
          streamObjectType[object2.type](object2, stream);
        } else {
          streamGeometry(object2, stream);
        }
      }
      var areaRingSum = new d3Array.Adder();
      var areaSum = new d3Array.Adder(), lambda00, phi00, lambda0, cosPhi0, sinPhi0;
      var areaStream = {
        point: noop,
        lineStart: noop,
        lineEnd: noop,
        polygonStart: function() {
          areaRingSum = new d3Array.Adder();
          areaStream.lineStart = areaRingStart;
          areaStream.lineEnd = areaRingEnd;
        },
        polygonEnd: function() {
          var areaRing = +areaRingSum;
          areaSum.add(areaRing < 0 ? tau + areaRing : areaRing);
          this.lineStart = this.lineEnd = this.point = noop;
        },
        sphere: function() {
          areaSum.add(tau);
        }
      };
      function areaRingStart() {
        areaStream.point = areaPointFirst;
      }
      function areaRingEnd() {
        areaPoint(lambda00, phi00);
      }
      function areaPointFirst(lambda, phi) {
        areaStream.point = areaPoint;
        lambda00 = lambda, phi00 = phi;
        lambda *= radians, phi *= radians;
        lambda0 = lambda, cosPhi0 = cos(phi = phi / 2 + quarterPi), sinPhi0 = sin(phi);
      }
      function areaPoint(lambda, phi) {
        lambda *= radians, phi *= radians;
        phi = phi / 2 + quarterPi;
        var dLambda = lambda - lambda0, sdLambda = dLambda >= 0 ? 1 : -1, adLambda = sdLambda * dLambda, cosPhi = cos(phi), sinPhi = sin(phi), k = sinPhi0 * sinPhi, u = cosPhi0 * cosPhi + k * cos(adLambda), v = k * sdLambda * sin(adLambda);
        areaRingSum.add(atan2(v, u));
        lambda0 = lambda, cosPhi0 = cosPhi, sinPhi0 = sinPhi;
      }
      function area(object2) {
        areaSum = new d3Array.Adder();
        geoStream(object2, areaStream);
        return areaSum * 2;
      }
      function spherical(cartesian2) {
        return [atan2(cartesian2[1], cartesian2[0]), asin(cartesian2[2])];
      }
      function cartesian(spherical2) {
        var lambda = spherical2[0], phi = spherical2[1], cosPhi = cos(phi);
        return [cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi)];
      }
      function cartesianDot(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      }
      function cartesianCross(a, b) {
        return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
      }
      function cartesianAddInPlace(a, b) {
        a[0] += b[0], a[1] += b[1], a[2] += b[2];
      }
      function cartesianScale(vector, k) {
        return [vector[0] * k, vector[1] * k, vector[2] * k];
      }
      function cartesianNormalizeInPlace(d) {
        var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
        d[0] /= l, d[1] /= l, d[2] /= l;
      }
      var lambda0$1, phi0, lambda1, phi1, lambda2, lambda00$1, phi00$1, p0, deltaSum, ranges, range;
      var boundsStream = {
        point: boundsPoint,
        lineStart: boundsLineStart,
        lineEnd: boundsLineEnd,
        polygonStart: function() {
          boundsStream.point = boundsRingPoint;
          boundsStream.lineStart = boundsRingStart;
          boundsStream.lineEnd = boundsRingEnd;
          deltaSum = new d3Array.Adder();
          areaStream.polygonStart();
        },
        polygonEnd: function() {
          areaStream.polygonEnd();
          boundsStream.point = boundsPoint;
          boundsStream.lineStart = boundsLineStart;
          boundsStream.lineEnd = boundsLineEnd;
          if (areaRingSum < 0)
            lambda0$1 = -(lambda1 = 180), phi0 = -(phi1 = 90);
          else if (deltaSum > epsilon)
            phi1 = 90;
          else if (deltaSum < -epsilon)
            phi0 = -90;
          range[0] = lambda0$1, range[1] = lambda1;
        },
        sphere: function() {
          lambda0$1 = -(lambda1 = 180), phi0 = -(phi1 = 90);
        }
      };
      function boundsPoint(lambda, phi) {
        ranges.push(range = [lambda0$1 = lambda, lambda1 = lambda]);
        if (phi < phi0)
          phi0 = phi;
        if (phi > phi1)
          phi1 = phi;
      }
      function linePoint(lambda, phi) {
        var p = cartesian([lambda * radians, phi * radians]);
        if (p0) {
          var normal = cartesianCross(p0, p), equatorial = [normal[1], -normal[0], 0], inflection = cartesianCross(equatorial, normal);
          cartesianNormalizeInPlace(inflection);
          inflection = spherical(inflection);
          var delta = lambda - lambda2, sign2 = delta > 0 ? 1 : -1, lambdai = inflection[0] * degrees * sign2, phii, antimeridian = abs(delta) > 180;
          if (antimeridian ^ (sign2 * lambda2 < lambdai && lambdai < sign2 * lambda)) {
            phii = inflection[1] * degrees;
            if (phii > phi1)
              phi1 = phii;
          } else if (lambdai = (lambdai + 360) % 360 - 180, antimeridian ^ (sign2 * lambda2 < lambdai && lambdai < sign2 * lambda)) {
            phii = -inflection[1] * degrees;
            if (phii < phi0)
              phi0 = phii;
          } else {
            if (phi < phi0)
              phi0 = phi;
            if (phi > phi1)
              phi1 = phi;
          }
          if (antimeridian) {
            if (lambda < lambda2) {
              if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1))
                lambda1 = lambda;
            } else {
              if (angle(lambda, lambda1) > angle(lambda0$1, lambda1))
                lambda0$1 = lambda;
            }
          } else {
            if (lambda1 >= lambda0$1) {
              if (lambda < lambda0$1)
                lambda0$1 = lambda;
              if (lambda > lambda1)
                lambda1 = lambda;
            } else {
              if (lambda > lambda2) {
                if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1))
                  lambda1 = lambda;
              } else {
                if (angle(lambda, lambda1) > angle(lambda0$1, lambda1))
                  lambda0$1 = lambda;
              }
            }
          }
        } else {
          ranges.push(range = [lambda0$1 = lambda, lambda1 = lambda]);
        }
        if (phi < phi0)
          phi0 = phi;
        if (phi > phi1)
          phi1 = phi;
        p0 = p, lambda2 = lambda;
      }
      function boundsLineStart() {
        boundsStream.point = linePoint;
      }
      function boundsLineEnd() {
        range[0] = lambda0$1, range[1] = lambda1;
        boundsStream.point = boundsPoint;
        p0 = null;
      }
      function boundsRingPoint(lambda, phi) {
        if (p0) {
          var delta = lambda - lambda2;
          deltaSum.add(abs(delta) > 180 ? delta + (delta > 0 ? 360 : -360) : delta);
        } else {
          lambda00$1 = lambda, phi00$1 = phi;
        }
        areaStream.point(lambda, phi);
        linePoint(lambda, phi);
      }
      function boundsRingStart() {
        areaStream.lineStart();
      }
      function boundsRingEnd() {
        boundsRingPoint(lambda00$1, phi00$1);
        areaStream.lineEnd();
        if (abs(deltaSum) > epsilon)
          lambda0$1 = -(lambda1 = 180);
        range[0] = lambda0$1, range[1] = lambda1;
        p0 = null;
      }
      function angle(lambda02, lambda12) {
        return (lambda12 -= lambda02) < 0 ? lambda12 + 360 : lambda12;
      }
      function rangeCompare(a, b) {
        return a[0] - b[0];
      }
      function rangeContains(range2, x) {
        return range2[0] <= range2[1] ? range2[0] <= x && x <= range2[1] : x < range2[0] || range2[1] < x;
      }
      function bounds(feature) {
        var i, n, a, b, merged, deltaMax, delta;
        phi1 = lambda1 = -(lambda0$1 = phi0 = Infinity);
        ranges = [];
        geoStream(feature, boundsStream);
        if (n = ranges.length) {
          ranges.sort(rangeCompare);
          for (i = 1, a = ranges[0], merged = [a]; i < n; ++i) {
            b = ranges[i];
            if (rangeContains(a, b[0]) || rangeContains(a, b[1])) {
              if (angle(a[0], b[1]) > angle(a[0], a[1]))
                a[1] = b[1];
              if (angle(b[0], a[1]) > angle(a[0], a[1]))
                a[0] = b[0];
            } else {
              merged.push(a = b);
            }
          }
          for (deltaMax = -Infinity, n = merged.length - 1, i = 0, a = merged[n]; i <= n; a = b, ++i) {
            b = merged[i];
            if ((delta = angle(a[1], b[0])) > deltaMax)
              deltaMax = delta, lambda0$1 = b[0], lambda1 = a[1];
          }
        }
        ranges = range = null;
        return lambda0$1 === Infinity || phi0 === Infinity ? [[NaN, NaN], [NaN, NaN]] : [[lambda0$1, phi0], [lambda1, phi1]];
      }
      var W0, W1, X0, Y0, Z0, X1, Y1, Z1, X2, Y2, Z2, lambda00$2, phi00$2, x0, y0, z0;
      var centroidStream = {
        sphere: noop,
        point: centroidPoint,
        lineStart: centroidLineStart,
        lineEnd: centroidLineEnd,
        polygonStart: function() {
          centroidStream.lineStart = centroidRingStart;
          centroidStream.lineEnd = centroidRingEnd;
        },
        polygonEnd: function() {
          centroidStream.lineStart = centroidLineStart;
          centroidStream.lineEnd = centroidLineEnd;
        }
      };
      function centroidPoint(lambda, phi) {
        lambda *= radians, phi *= radians;
        var cosPhi = cos(phi);
        centroidPointCartesian(cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi));
      }
      function centroidPointCartesian(x, y, z) {
        ++W0;
        X0 += (x - X0) / W0;
        Y0 += (y - Y0) / W0;
        Z0 += (z - Z0) / W0;
      }
      function centroidLineStart() {
        centroidStream.point = centroidLinePointFirst;
      }
      function centroidLinePointFirst(lambda, phi) {
        lambda *= radians, phi *= radians;
        var cosPhi = cos(phi);
        x0 = cosPhi * cos(lambda);
        y0 = cosPhi * sin(lambda);
        z0 = sin(phi);
        centroidStream.point = centroidLinePoint;
        centroidPointCartesian(x0, y0, z0);
      }
      function centroidLinePoint(lambda, phi) {
        lambda *= radians, phi *= radians;
        var cosPhi = cos(phi), x = cosPhi * cos(lambda), y = cosPhi * sin(lambda), z = sin(phi), w = atan2(sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
        W1 += w;
        X1 += w * (x0 + (x0 = x));
        Y1 += w * (y0 + (y0 = y));
        Z1 += w * (z0 + (z0 = z));
        centroidPointCartesian(x0, y0, z0);
      }
      function centroidLineEnd() {
        centroidStream.point = centroidPoint;
      }
      function centroidRingStart() {
        centroidStream.point = centroidRingPointFirst;
      }
      function centroidRingEnd() {
        centroidRingPoint(lambda00$2, phi00$2);
        centroidStream.point = centroidPoint;
      }
      function centroidRingPointFirst(lambda, phi) {
        lambda00$2 = lambda, phi00$2 = phi;
        lambda *= radians, phi *= radians;
        centroidStream.point = centroidRingPoint;
        var cosPhi = cos(phi);
        x0 = cosPhi * cos(lambda);
        y0 = cosPhi * sin(lambda);
        z0 = sin(phi);
        centroidPointCartesian(x0, y0, z0);
      }
      function centroidRingPoint(lambda, phi) {
        lambda *= radians, phi *= radians;
        var cosPhi = cos(phi), x = cosPhi * cos(lambda), y = cosPhi * sin(lambda), z = sin(phi), cx = y0 * z - z0 * y, cy = z0 * x - x0 * z, cz = x0 * y - y0 * x, m = hypot(cx, cy, cz), w = asin(m), v = m && -w / m;
        X2.add(v * cx);
        Y2.add(v * cy);
        Z2.add(v * cz);
        W1 += w;
        X1 += w * (x0 + (x0 = x));
        Y1 += w * (y0 + (y0 = y));
        Z1 += w * (z0 + (z0 = z));
        centroidPointCartesian(x0, y0, z0);
      }
      function centroid(object2) {
        W0 = W1 = X0 = Y0 = Z0 = X1 = Y1 = Z1 = 0;
        X2 = new d3Array.Adder();
        Y2 = new d3Array.Adder();
        Z2 = new d3Array.Adder();
        geoStream(object2, centroidStream);
        var x = +X2, y = +Y2, z = +Z2, m = hypot(x, y, z);
        if (m < epsilon2) {
          x = X1, y = Y1, z = Z1;
          if (W1 < epsilon)
            x = X0, y = Y0, z = Z0;
          m = hypot(x, y, z);
          if (m < epsilon2)
            return [NaN, NaN];
        }
        return [atan2(y, x) * degrees, asin(z / m) * degrees];
      }
      function constant(x) {
        return function() {
          return x;
        };
      }
      function compose(a, b) {
        function compose2(x, y) {
          return x = a(x, y), b(x[0], x[1]);
        }
        if (a.invert && b.invert)
          compose2.invert = function(x, y) {
            return x = b.invert(x, y), x && a.invert(x[0], x[1]);
          };
        return compose2;
      }
      function rotationIdentity(lambda, phi) {
        return [abs(lambda) > pi ? lambda + Math.round(-lambda / tau) * tau : lambda, phi];
      }
      rotationIdentity.invert = rotationIdentity;
      function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
        return (deltaLambda %= tau) ? deltaPhi || deltaGamma ? compose(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma)) : rotationLambda(deltaLambda) : deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma) : rotationIdentity;
      }
      function forwardRotationLambda(deltaLambda) {
        return function(lambda, phi) {
          return lambda += deltaLambda, [lambda > pi ? lambda - tau : lambda < -pi ? lambda + tau : lambda, phi];
        };
      }
      function rotationLambda(deltaLambda) {
        var rotation2 = forwardRotationLambda(deltaLambda);
        rotation2.invert = forwardRotationLambda(-deltaLambda);
        return rotation2;
      }
      function rotationPhiGamma(deltaPhi, deltaGamma) {
        var cosDeltaPhi = cos(deltaPhi), sinDeltaPhi = sin(deltaPhi), cosDeltaGamma = cos(deltaGamma), sinDeltaGamma = sin(deltaGamma);
        function rotation2(lambda, phi) {
          var cosPhi = cos(phi), x = cos(lambda) * cosPhi, y = sin(lambda) * cosPhi, z = sin(phi), k = z * cosDeltaPhi + x * sinDeltaPhi;
          return [
            atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi),
            asin(k * cosDeltaGamma + y * sinDeltaGamma)
          ];
        }
        rotation2.invert = function(lambda, phi) {
          var cosPhi = cos(phi), x = cos(lambda) * cosPhi, y = sin(lambda) * cosPhi, z = sin(phi), k = z * cosDeltaGamma - y * sinDeltaGamma;
          return [
            atan2(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi),
            asin(k * cosDeltaPhi - x * sinDeltaPhi)
          ];
        };
        return rotation2;
      }
      function rotation(rotate) {
        rotate = rotateRadians(rotate[0] * radians, rotate[1] * radians, rotate.length > 2 ? rotate[2] * radians : 0);
        function forward(coordinates2) {
          coordinates2 = rotate(coordinates2[0] * radians, coordinates2[1] * radians);
          return coordinates2[0] *= degrees, coordinates2[1] *= degrees, coordinates2;
        }
        forward.invert = function(coordinates2) {
          coordinates2 = rotate.invert(coordinates2[0] * radians, coordinates2[1] * radians);
          return coordinates2[0] *= degrees, coordinates2[1] *= degrees, coordinates2;
        };
        return forward;
      }
      function circleStream(stream, radius, delta, direction, t0, t1) {
        if (!delta)
          return;
        var cosRadius = cos(radius), sinRadius = sin(radius), step = direction * delta;
        if (t0 == null) {
          t0 = radius + direction * tau;
          t1 = radius - step / 2;
        } else {
          t0 = circleRadius(cosRadius, t0);
          t1 = circleRadius(cosRadius, t1);
          if (direction > 0 ? t0 < t1 : t0 > t1)
            t0 += direction * tau;
        }
        for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
          point = spherical([cosRadius, -sinRadius * cos(t), -sinRadius * sin(t)]);
          stream.point(point[0], point[1]);
        }
      }
      function circleRadius(cosRadius, point) {
        point = cartesian(point), point[0] -= cosRadius;
        cartesianNormalizeInPlace(point);
        var radius = acos(-point[1]);
        return ((-point[2] < 0 ? -radius : radius) + tau - epsilon) % tau;
      }
      function circle() {
        var center = constant([0, 0]), radius = constant(90), precision = constant(6), ring, rotate, stream = {point};
        function point(x, y) {
          ring.push(x = rotate(x, y));
          x[0] *= degrees, x[1] *= degrees;
        }
        function circle2() {
          var c = center.apply(this, arguments), r = radius.apply(this, arguments) * radians, p = precision.apply(this, arguments) * radians;
          ring = [];
          rotate = rotateRadians(-c[0] * radians, -c[1] * radians, 0).invert;
          circleStream(stream, r, p, 1);
          c = {type: "Polygon", coordinates: [ring]};
          ring = rotate = null;
          return c;
        }
        circle2.center = function(_) {
          return arguments.length ? (center = typeof _ === "function" ? _ : constant([+_[0], +_[1]]), circle2) : center;
        };
        circle2.radius = function(_) {
          return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), circle2) : radius;
        };
        circle2.precision = function(_) {
          return arguments.length ? (precision = typeof _ === "function" ? _ : constant(+_), circle2) : precision;
        };
        return circle2;
      }
      function clipBuffer() {
        var lines = [], line;
        return {
          point: function(x, y, m) {
            line.push([x, y, m]);
          },
          lineStart: function() {
            lines.push(line = []);
          },
          lineEnd: noop,
          rejoin: function() {
            if (lines.length > 1)
              lines.push(lines.pop().concat(lines.shift()));
          },
          result: function() {
            var result = lines;
            lines = [];
            line = null;
            return result;
          }
        };
      }
      function pointEqual(a, b) {
        return abs(a[0] - b[0]) < epsilon && abs(a[1] - b[1]) < epsilon;
      }
      function Intersection(point, points, other, entry) {
        this.x = point;
        this.z = points;
        this.o = other;
        this.e = entry;
        this.v = false;
        this.n = this.p = null;
      }
      function clipRejoin(segments, compareIntersection2, startInside, interpolate2, stream) {
        var subject = [], clip2 = [], i, n;
        segments.forEach(function(segment) {
          if ((n2 = segment.length - 1) <= 0)
            return;
          var n2, p02 = segment[0], p1 = segment[n2], x;
          if (pointEqual(p02, p1)) {
            if (!p02[2] && !p1[2]) {
              stream.lineStart();
              for (i = 0; i < n2; ++i)
                stream.point((p02 = segment[i])[0], p02[1]);
              stream.lineEnd();
              return;
            }
            p1[0] += 2 * epsilon;
          }
          subject.push(x = new Intersection(p02, segment, null, true));
          clip2.push(x.o = new Intersection(p02, null, x, false));
          subject.push(x = new Intersection(p1, segment, null, false));
          clip2.push(x.o = new Intersection(p1, null, x, true));
        });
        if (!subject.length)
          return;
        clip2.sort(compareIntersection2);
        link(subject);
        link(clip2);
        for (i = 0, n = clip2.length; i < n; ++i) {
          clip2[i].e = startInside = !startInside;
        }
        var start = subject[0], points, point;
        while (1) {
          var current = start, isSubject = true;
          while (current.v)
            if ((current = current.n) === start)
              return;
          points = current.z;
          stream.lineStart();
          do {
            current.v = current.o.v = true;
            if (current.e) {
              if (isSubject) {
                for (i = 0, n = points.length; i < n; ++i)
                  stream.point((point = points[i])[0], point[1]);
              } else {
                interpolate2(current.x, current.n.x, 1, stream);
              }
              current = current.n;
            } else {
              if (isSubject) {
                points = current.p.z;
                for (i = points.length - 1; i >= 0; --i)
                  stream.point((point = points[i])[0], point[1]);
              } else {
                interpolate2(current.x, current.p.x, -1, stream);
              }
              current = current.p;
            }
            current = current.o;
            points = current.z;
            isSubject = !isSubject;
          } while (!current.v);
          stream.lineEnd();
        }
      }
      function link(array) {
        if (!(n = array.length))
          return;
        var n, i = 0, a = array[0], b;
        while (++i < n) {
          a.n = b = array[i];
          b.p = a;
          a = b;
        }
        a.n = b = array[0];
        b.p = a;
      }
      function longitude(point) {
        if (abs(point[0]) <= pi)
          return point[0];
        else
          return sign(point[0]) * ((abs(point[0]) + pi) % tau - pi);
      }
      function polygonContains(polygon, point) {
        var lambda = longitude(point), phi = point[1], sinPhi = sin(phi), normal = [sin(lambda), -cos(lambda), 0], angle2 = 0, winding = 0;
        var sum = new d3Array.Adder();
        if (sinPhi === 1)
          phi = halfPi + epsilon;
        else if (sinPhi === -1)
          phi = -halfPi - epsilon;
        for (var i = 0, n = polygon.length; i < n; ++i) {
          if (!(m = (ring = polygon[i]).length))
            continue;
          var ring, m, point0 = ring[m - 1], lambda02 = longitude(point0), phi02 = point0[1] / 2 + quarterPi, sinPhi02 = sin(phi02), cosPhi02 = cos(phi02);
          for (var j = 0; j < m; ++j, lambda02 = lambda12, sinPhi02 = sinPhi1, cosPhi02 = cosPhi1, point0 = point1) {
            var point1 = ring[j], lambda12 = longitude(point1), phi12 = point1[1] / 2 + quarterPi, sinPhi1 = sin(phi12), cosPhi1 = cos(phi12), delta = lambda12 - lambda02, sign2 = delta >= 0 ? 1 : -1, absDelta = sign2 * delta, antimeridian = absDelta > pi, k = sinPhi02 * sinPhi1;
            sum.add(atan2(k * sign2 * sin(absDelta), cosPhi02 * cosPhi1 + k * cos(absDelta)));
            angle2 += antimeridian ? delta + sign2 * tau : delta;
            if (antimeridian ^ lambda02 >= lambda ^ lambda12 >= lambda) {
              var arc = cartesianCross(cartesian(point0), cartesian(point1));
              cartesianNormalizeInPlace(arc);
              var intersection = cartesianCross(normal, arc);
              cartesianNormalizeInPlace(intersection);
              var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin(intersection[2]);
              if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
                winding += antimeridian ^ delta >= 0 ? 1 : -1;
              }
            }
          }
        }
        return (angle2 < -epsilon || angle2 < epsilon && sum < -epsilon2) ^ winding & 1;
      }
      function clip(pointVisible, clipLine2, interpolate2, start) {
        return function(sink) {
          var line = clipLine2(sink), ringBuffer = clipBuffer(), ringSink = clipLine2(ringBuffer), polygonStarted = false, polygon, segments, ring;
          var clip2 = {
            point,
            lineStart,
            lineEnd,
            polygonStart: function() {
              clip2.point = pointRing;
              clip2.lineStart = ringStart;
              clip2.lineEnd = ringEnd;
              segments = [];
              polygon = [];
            },
            polygonEnd: function() {
              clip2.point = point;
              clip2.lineStart = lineStart;
              clip2.lineEnd = lineEnd;
              segments = d3Array.merge(segments);
              var startInside = polygonContains(polygon, start);
              if (segments.length) {
                if (!polygonStarted)
                  sink.polygonStart(), polygonStarted = true;
                clipRejoin(segments, compareIntersection, startInside, interpolate2, sink);
              } else if (startInside) {
                if (!polygonStarted)
                  sink.polygonStart(), polygonStarted = true;
                sink.lineStart();
                interpolate2(null, null, 1, sink);
                sink.lineEnd();
              }
              if (polygonStarted)
                sink.polygonEnd(), polygonStarted = false;
              segments = polygon = null;
            },
            sphere: function() {
              sink.polygonStart();
              sink.lineStart();
              interpolate2(null, null, 1, sink);
              sink.lineEnd();
              sink.polygonEnd();
            }
          };
          function point(lambda, phi) {
            if (pointVisible(lambda, phi))
              sink.point(lambda, phi);
          }
          function pointLine(lambda, phi) {
            line.point(lambda, phi);
          }
          function lineStart() {
            clip2.point = pointLine;
            line.lineStart();
          }
          function lineEnd() {
            clip2.point = point;
            line.lineEnd();
          }
          function pointRing(lambda, phi) {
            ring.push([lambda, phi]);
            ringSink.point(lambda, phi);
          }
          function ringStart() {
            ringSink.lineStart();
            ring = [];
          }
          function ringEnd() {
            pointRing(ring[0][0], ring[0][1]);
            ringSink.lineEnd();
            var clean = ringSink.clean(), ringSegments = ringBuffer.result(), i, n = ringSegments.length, m, segment, point2;
            ring.pop();
            polygon.push(ring);
            ring = null;
            if (!n)
              return;
            if (clean & 1) {
              segment = ringSegments[0];
              if ((m = segment.length - 1) > 0) {
                if (!polygonStarted)
                  sink.polygonStart(), polygonStarted = true;
                sink.lineStart();
                for (i = 0; i < m; ++i)
                  sink.point((point2 = segment[i])[0], point2[1]);
                sink.lineEnd();
              }
              return;
            }
            if (n > 1 && clean & 2)
              ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
            segments.push(ringSegments.filter(validSegment));
          }
          return clip2;
        };
      }
      function validSegment(segment) {
        return segment.length > 1;
      }
      function compareIntersection(a, b) {
        return ((a = a.x)[0] < 0 ? a[1] - halfPi - epsilon : halfPi - a[1]) - ((b = b.x)[0] < 0 ? b[1] - halfPi - epsilon : halfPi - b[1]);
      }
      var clipAntimeridian = clip(function() {
        return true;
      }, clipAntimeridianLine, clipAntimeridianInterpolate, [-pi, -halfPi]);
      function clipAntimeridianLine(stream) {
        var lambda02 = NaN, phi02 = NaN, sign0 = NaN, clean;
        return {
          lineStart: function() {
            stream.lineStart();
            clean = 1;
          },
          point: function(lambda12, phi12) {
            var sign1 = lambda12 > 0 ? pi : -pi, delta = abs(lambda12 - lambda02);
            if (abs(delta - pi) < epsilon) {
              stream.point(lambda02, phi02 = (phi02 + phi12) / 2 > 0 ? halfPi : -halfPi);
              stream.point(sign0, phi02);
              stream.lineEnd();
              stream.lineStart();
              stream.point(sign1, phi02);
              stream.point(lambda12, phi02);
              clean = 0;
            } else if (sign0 !== sign1 && delta >= pi) {
              if (abs(lambda02 - sign0) < epsilon)
                lambda02 -= sign0 * epsilon;
              if (abs(lambda12 - sign1) < epsilon)
                lambda12 -= sign1 * epsilon;
              phi02 = clipAntimeridianIntersect(lambda02, phi02, lambda12, phi12);
              stream.point(sign0, phi02);
              stream.lineEnd();
              stream.lineStart();
              stream.point(sign1, phi02);
              clean = 0;
            }
            stream.point(lambda02 = lambda12, phi02 = phi12);
            sign0 = sign1;
          },
          lineEnd: function() {
            stream.lineEnd();
            lambda02 = phi02 = NaN;
          },
          clean: function() {
            return 2 - clean;
          }
        };
      }
      function clipAntimeridianIntersect(lambda02, phi02, lambda12, phi12) {
        var cosPhi02, cosPhi1, sinLambda0Lambda1 = sin(lambda02 - lambda12);
        return abs(sinLambda0Lambda1) > epsilon ? atan((sin(phi02) * (cosPhi1 = cos(phi12)) * sin(lambda12) - sin(phi12) * (cosPhi02 = cos(phi02)) * sin(lambda02)) / (cosPhi02 * cosPhi1 * sinLambda0Lambda1)) : (phi02 + phi12) / 2;
      }
      function clipAntimeridianInterpolate(from, to, direction, stream) {
        var phi;
        if (from == null) {
          phi = direction * halfPi;
          stream.point(-pi, phi);
          stream.point(0, phi);
          stream.point(pi, phi);
          stream.point(pi, 0);
          stream.point(pi, -phi);
          stream.point(0, -phi);
          stream.point(-pi, -phi);
          stream.point(-pi, 0);
          stream.point(-pi, phi);
        } else if (abs(from[0] - to[0]) > epsilon) {
          var lambda = from[0] < to[0] ? pi : -pi;
          phi = direction * lambda / 2;
          stream.point(-lambda, phi);
          stream.point(0, phi);
          stream.point(lambda, phi);
        } else {
          stream.point(to[0], to[1]);
        }
      }
      function clipCircle(radius) {
        var cr = cos(radius), delta = 6 * radians, smallRadius = cr > 0, notHemisphere = abs(cr) > epsilon;
        function interpolate2(from, to, direction, stream) {
          circleStream(stream, radius, delta, direction, from, to);
        }
        function visible(lambda, phi) {
          return cos(lambda) * cos(phi) > cr;
        }
        function clipLine2(stream) {
          var point0, c0, v0, v00, clean;
          return {
            lineStart: function() {
              v00 = v0 = false;
              clean = 1;
            },
            point: function(lambda, phi) {
              var point1 = [lambda, phi], point2, v = visible(lambda, phi), c = smallRadius ? v ? 0 : code(lambda, phi) : v ? code(lambda + (lambda < 0 ? pi : -pi), phi) : 0;
              if (!point0 && (v00 = v0 = v))
                stream.lineStart();
              if (v !== v0) {
                point2 = intersect(point0, point1);
                if (!point2 || pointEqual(point0, point2) || pointEqual(point1, point2))
                  point1[2] = 1;
              }
              if (v !== v0) {
                clean = 0;
                if (v) {
                  stream.lineStart();
                  point2 = intersect(point1, point0);
                  stream.point(point2[0], point2[1]);
                } else {
                  point2 = intersect(point0, point1);
                  stream.point(point2[0], point2[1], 2);
                  stream.lineEnd();
                }
                point0 = point2;
              } else if (notHemisphere && point0 && smallRadius ^ v) {
                var t;
                if (!(c & c0) && (t = intersect(point1, point0, true))) {
                  clean = 0;
                  if (smallRadius) {
                    stream.lineStart();
                    stream.point(t[0][0], t[0][1]);
                    stream.point(t[1][0], t[1][1]);
                    stream.lineEnd();
                  } else {
                    stream.point(t[1][0], t[1][1]);
                    stream.lineEnd();
                    stream.lineStart();
                    stream.point(t[0][0], t[0][1], 3);
                  }
                }
              }
              if (v && (!point0 || !pointEqual(point0, point1))) {
                stream.point(point1[0], point1[1]);
              }
              point0 = point1, v0 = v, c0 = c;
            },
            lineEnd: function() {
              if (v0)
                stream.lineEnd();
              point0 = null;
            },
            clean: function() {
              return clean | (v00 && v0) << 1;
            }
          };
        }
        function intersect(a, b, two) {
          var pa = cartesian(a), pb = cartesian(b);
          var n1 = [1, 0, 0], n2 = cartesianCross(pa, pb), n2n2 = cartesianDot(n2, n2), n1n2 = n2[0], determinant = n2n2 - n1n2 * n1n2;
          if (!determinant)
            return !two && a;
          var c1 = cr * n2n2 / determinant, c2 = -cr * n1n2 / determinant, n1xn2 = cartesianCross(n1, n2), A = cartesianScale(n1, c1), B = cartesianScale(n2, c2);
          cartesianAddInPlace(A, B);
          var u = n1xn2, w = cartesianDot(A, u), uu = cartesianDot(u, u), t2 = w * w - uu * (cartesianDot(A, A) - 1);
          if (t2 < 0)
            return;
          var t = sqrt(t2), q = cartesianScale(u, (-w - t) / uu);
          cartesianAddInPlace(q, A);
          q = spherical(q);
          if (!two)
            return q;
          var lambda02 = a[0], lambda12 = b[0], phi02 = a[1], phi12 = b[1], z;
          if (lambda12 < lambda02)
            z = lambda02, lambda02 = lambda12, lambda12 = z;
          var delta2 = lambda12 - lambda02, polar = abs(delta2 - pi) < epsilon, meridian = polar || delta2 < epsilon;
          if (!polar && phi12 < phi02)
            z = phi02, phi02 = phi12, phi12 = z;
          if (meridian ? polar ? phi02 + phi12 > 0 ^ q[1] < (abs(q[0] - lambda02) < epsilon ? phi02 : phi12) : phi02 <= q[1] && q[1] <= phi12 : delta2 > pi ^ (lambda02 <= q[0] && q[0] <= lambda12)) {
            var q1 = cartesianScale(u, (-w + t) / uu);
            cartesianAddInPlace(q1, A);
            return [q, spherical(q1)];
          }
        }
        function code(lambda, phi) {
          var r = smallRadius ? radius : pi - radius, code2 = 0;
          if (lambda < -r)
            code2 |= 1;
          else if (lambda > r)
            code2 |= 2;
          if (phi < -r)
            code2 |= 4;
          else if (phi > r)
            code2 |= 8;
          return code2;
        }
        return clip(visible, clipLine2, interpolate2, smallRadius ? [0, -radius] : [-pi, radius - pi]);
      }
      function clipLine(a, b, x02, y02, x12, y12) {
        var ax = a[0], ay = a[1], bx = b[0], by = b[1], t0 = 0, t1 = 1, dx = bx - ax, dy = by - ay, r;
        r = x02 - ax;
        if (!dx && r > 0)
          return;
        r /= dx;
        if (dx < 0) {
          if (r < t0)
            return;
          if (r < t1)
            t1 = r;
        } else if (dx > 0) {
          if (r > t1)
            return;
          if (r > t0)
            t0 = r;
        }
        r = x12 - ax;
        if (!dx && r < 0)
          return;
        r /= dx;
        if (dx < 0) {
          if (r > t1)
            return;
          if (r > t0)
            t0 = r;
        } else if (dx > 0) {
          if (r < t0)
            return;
          if (r < t1)
            t1 = r;
        }
        r = y02 - ay;
        if (!dy && r > 0)
          return;
        r /= dy;
        if (dy < 0) {
          if (r < t0)
            return;
          if (r < t1)
            t1 = r;
        } else if (dy > 0) {
          if (r > t1)
            return;
          if (r > t0)
            t0 = r;
        }
        r = y12 - ay;
        if (!dy && r < 0)
          return;
        r /= dy;
        if (dy < 0) {
          if (r > t1)
            return;
          if (r > t0)
            t0 = r;
        } else if (dy > 0) {
          if (r < t0)
            return;
          if (r < t1)
            t1 = r;
        }
        if (t0 > 0)
          a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
        if (t1 < 1)
          b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
        return true;
      }
      var clipMax = 1e9, clipMin = -clipMax;
      function clipRectangle(x02, y02, x12, y12) {
        function visible(x, y) {
          return x02 <= x && x <= x12 && y02 <= y && y <= y12;
        }
        function interpolate2(from, to, direction, stream) {
          var a = 0, a1 = 0;
          if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoint(from, to) < 0 ^ direction > 0) {
            do
              stream.point(a === 0 || a === 3 ? x02 : x12, a > 1 ? y12 : y02);
            while ((a = (a + direction + 4) % 4) !== a1);
          } else {
            stream.point(to[0], to[1]);
          }
        }
        function corner(p, direction) {
          return abs(p[0] - x02) < epsilon ? direction > 0 ? 0 : 3 : abs(p[0] - x12) < epsilon ? direction > 0 ? 2 : 1 : abs(p[1] - y02) < epsilon ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2;
        }
        function compareIntersection2(a, b) {
          return comparePoint(a.x, b.x);
        }
        function comparePoint(a, b) {
          var ca = corner(a, 1), cb = corner(b, 1);
          return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
        }
        return function(stream) {
          var activeStream = stream, bufferStream = clipBuffer(), segments, polygon, ring, x__, y__, v__, x_, y_, v_, first, clean;
          var clipStream = {
            point,
            lineStart,
            lineEnd,
            polygonStart,
            polygonEnd
          };
          function point(x, y) {
            if (visible(x, y))
              activeStream.point(x, y);
          }
          function polygonInside() {
            var winding = 0;
            for (var i = 0, n = polygon.length; i < n; ++i) {
              for (var ring2 = polygon[i], j = 1, m = ring2.length, point2 = ring2[0], a0, a1, b0 = point2[0], b1 = point2[1]; j < m; ++j) {
                a0 = b0, a1 = b1, point2 = ring2[j], b0 = point2[0], b1 = point2[1];
                if (a1 <= y12) {
                  if (b1 > y12 && (b0 - a0) * (y12 - a1) > (b1 - a1) * (x02 - a0))
                    ++winding;
                } else {
                  if (b1 <= y12 && (b0 - a0) * (y12 - a1) < (b1 - a1) * (x02 - a0))
                    --winding;
                }
              }
            }
            return winding;
          }
          function polygonStart() {
            activeStream = bufferStream, segments = [], polygon = [], clean = true;
          }
          function polygonEnd() {
            var startInside = polygonInside(), cleanInside = clean && startInside, visible2 = (segments = d3Array.merge(segments)).length;
            if (cleanInside || visible2) {
              stream.polygonStart();
              if (cleanInside) {
                stream.lineStart();
                interpolate2(null, null, 1, stream);
                stream.lineEnd();
              }
              if (visible2) {
                clipRejoin(segments, compareIntersection2, startInside, interpolate2, stream);
              }
              stream.polygonEnd();
            }
            activeStream = stream, segments = polygon = ring = null;
          }
          function lineStart() {
            clipStream.point = linePoint2;
            if (polygon)
              polygon.push(ring = []);
            first = true;
            v_ = false;
            x_ = y_ = NaN;
          }
          function lineEnd() {
            if (segments) {
              linePoint2(x__, y__);
              if (v__ && v_)
                bufferStream.rejoin();
              segments.push(bufferStream.result());
            }
            clipStream.point = point;
            if (v_)
              activeStream.lineEnd();
          }
          function linePoint2(x, y) {
            var v = visible(x, y);
            if (polygon)
              ring.push([x, y]);
            if (first) {
              x__ = x, y__ = y, v__ = v;
              first = false;
              if (v) {
                activeStream.lineStart();
                activeStream.point(x, y);
              }
            } else {
              if (v && v_)
                activeStream.point(x, y);
              else {
                var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))], b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];
                if (clipLine(a, b, x02, y02, x12, y12)) {
                  if (!v_) {
                    activeStream.lineStart();
                    activeStream.point(a[0], a[1]);
                  }
                  activeStream.point(b[0], b[1]);
                  if (!v)
                    activeStream.lineEnd();
                  clean = false;
                } else if (v) {
                  activeStream.lineStart();
                  activeStream.point(x, y);
                  clean = false;
                }
              }
            }
            x_ = x, y_ = y, v_ = v;
          }
          return clipStream;
        };
      }
      function extent() {
        var x02 = 0, y02 = 0, x12 = 960, y12 = 500, cache, cacheStream, clip2;
        return clip2 = {
          stream: function(stream) {
            return cache && cacheStream === stream ? cache : cache = clipRectangle(x02, y02, x12, y12)(cacheStream = stream);
          },
          extent: function(_) {
            return arguments.length ? (x02 = +_[0][0], y02 = +_[0][1], x12 = +_[1][0], y12 = +_[1][1], cache = cacheStream = null, clip2) : [[x02, y02], [x12, y12]];
          }
        };
      }
      var lengthSum, lambda0$2, sinPhi0$1, cosPhi0$1;
      var lengthStream = {
        sphere: noop,
        point: noop,
        lineStart: lengthLineStart,
        lineEnd: noop,
        polygonStart: noop,
        polygonEnd: noop
      };
      function lengthLineStart() {
        lengthStream.point = lengthPointFirst;
        lengthStream.lineEnd = lengthLineEnd;
      }
      function lengthLineEnd() {
        lengthStream.point = lengthStream.lineEnd = noop;
      }
      function lengthPointFirst(lambda, phi) {
        lambda *= radians, phi *= radians;
        lambda0$2 = lambda, sinPhi0$1 = sin(phi), cosPhi0$1 = cos(phi);
        lengthStream.point = lengthPoint;
      }
      function lengthPoint(lambda, phi) {
        lambda *= radians, phi *= radians;
        var sinPhi = sin(phi), cosPhi = cos(phi), delta = abs(lambda - lambda0$2), cosDelta = cos(delta), sinDelta = sin(delta), x = cosPhi * sinDelta, y = cosPhi0$1 * sinPhi - sinPhi0$1 * cosPhi * cosDelta, z = sinPhi0$1 * sinPhi + cosPhi0$1 * cosPhi * cosDelta;
        lengthSum.add(atan2(sqrt(x * x + y * y), z));
        lambda0$2 = lambda, sinPhi0$1 = sinPhi, cosPhi0$1 = cosPhi;
      }
      function length(object2) {
        lengthSum = new d3Array.Adder();
        geoStream(object2, lengthStream);
        return +lengthSum;
      }
      var coordinates = [null, null], object = {type: "LineString", coordinates};
      function distance(a, b) {
        coordinates[0] = a;
        coordinates[1] = b;
        return length(object);
      }
      var containsObjectType = {
        Feature: function(object2, point) {
          return containsGeometry(object2.geometry, point);
        },
        FeatureCollection: function(object2, point) {
          var features = object2.features, i = -1, n = features.length;
          while (++i < n)
            if (containsGeometry(features[i].geometry, point))
              return true;
          return false;
        }
      };
      var containsGeometryType = {
        Sphere: function() {
          return true;
        },
        Point: function(object2, point) {
          return containsPoint(object2.coordinates, point);
        },
        MultiPoint: function(object2, point) {
          var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
          while (++i < n)
            if (containsPoint(coordinates2[i], point))
              return true;
          return false;
        },
        LineString: function(object2, point) {
          return containsLine(object2.coordinates, point);
        },
        MultiLineString: function(object2, point) {
          var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
          while (++i < n)
            if (containsLine(coordinates2[i], point))
              return true;
          return false;
        },
        Polygon: function(object2, point) {
          return containsPolygon(object2.coordinates, point);
        },
        MultiPolygon: function(object2, point) {
          var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
          while (++i < n)
            if (containsPolygon(coordinates2[i], point))
              return true;
          return false;
        },
        GeometryCollection: function(object2, point) {
          var geometries = object2.geometries, i = -1, n = geometries.length;
          while (++i < n)
            if (containsGeometry(geometries[i], point))
              return true;
          return false;
        }
      };
      function containsGeometry(geometry, point) {
        return geometry && containsGeometryType.hasOwnProperty(geometry.type) ? containsGeometryType[geometry.type](geometry, point) : false;
      }
      function containsPoint(coordinates2, point) {
        return distance(coordinates2, point) === 0;
      }
      function containsLine(coordinates2, point) {
        var ao, bo, ab;
        for (var i = 0, n = coordinates2.length; i < n; i++) {
          bo = distance(coordinates2[i], point);
          if (bo === 0)
            return true;
          if (i > 0) {
            ab = distance(coordinates2[i], coordinates2[i - 1]);
            if (ab > 0 && ao <= ab && bo <= ab && (ao + bo - ab) * (1 - Math.pow((ao - bo) / ab, 2)) < epsilon2 * ab)
              return true;
          }
          ao = bo;
        }
        return false;
      }
      function containsPolygon(coordinates2, point) {
        return !!polygonContains(coordinates2.map(ringRadians), pointRadians(point));
      }
      function ringRadians(ring) {
        return ring = ring.map(pointRadians), ring.pop(), ring;
      }
      function pointRadians(point) {
        return [point[0] * radians, point[1] * radians];
      }
      function contains(object2, point) {
        return (object2 && containsObjectType.hasOwnProperty(object2.type) ? containsObjectType[object2.type] : containsGeometry)(object2, point);
      }
      function graticuleX(y02, y12, dy) {
        var y = d3Array.range(y02, y12 - epsilon, dy).concat(y12);
        return function(x) {
          return y.map(function(y2) {
            return [x, y2];
          });
        };
      }
      function graticuleY(x02, x12, dx) {
        var x = d3Array.range(x02, x12 - epsilon, dx).concat(x12);
        return function(y) {
          return x.map(function(x2) {
            return [x2, y];
          });
        };
      }
      function graticule() {
        var x12, x02, X12, X02, y12, y02, Y12, Y02, dx = 10, dy = dx, DX = 90, DY = 360, x, y, X, Y, precision = 2.5;
        function graticule2() {
          return {type: "MultiLineString", coordinates: lines()};
        }
        function lines() {
          return d3Array.range(ceil(X02 / DX) * DX, X12, DX).map(X).concat(d3Array.range(ceil(Y02 / DY) * DY, Y12, DY).map(Y)).concat(d3Array.range(ceil(x02 / dx) * dx, x12, dx).filter(function(x2) {
            return abs(x2 % DX) > epsilon;
          }).map(x)).concat(d3Array.range(ceil(y02 / dy) * dy, y12, dy).filter(function(y2) {
            return abs(y2 % DY) > epsilon;
          }).map(y));
        }
        graticule2.lines = function() {
          return lines().map(function(coordinates2) {
            return {type: "LineString", coordinates: coordinates2};
          });
        };
        graticule2.outline = function() {
          return {
            type: "Polygon",
            coordinates: [
              X(X02).concat(Y(Y12).slice(1), X(X12).reverse().slice(1), Y(Y02).reverse().slice(1))
            ]
          };
        };
        graticule2.extent = function(_) {
          if (!arguments.length)
            return graticule2.extentMinor();
          return graticule2.extentMajor(_).extentMinor(_);
        };
        graticule2.extentMajor = function(_) {
          if (!arguments.length)
            return [[X02, Y02], [X12, Y12]];
          X02 = +_[0][0], X12 = +_[1][0];
          Y02 = +_[0][1], Y12 = +_[1][1];
          if (X02 > X12)
            _ = X02, X02 = X12, X12 = _;
          if (Y02 > Y12)
            _ = Y02, Y02 = Y12, Y12 = _;
          return graticule2.precision(precision);
        };
        graticule2.extentMinor = function(_) {
          if (!arguments.length)
            return [[x02, y02], [x12, y12]];
          x02 = +_[0][0], x12 = +_[1][0];
          y02 = +_[0][1], y12 = +_[1][1];
          if (x02 > x12)
            _ = x02, x02 = x12, x12 = _;
          if (y02 > y12)
            _ = y02, y02 = y12, y12 = _;
          return graticule2.precision(precision);
        };
        graticule2.step = function(_) {
          if (!arguments.length)
            return graticule2.stepMinor();
          return graticule2.stepMajor(_).stepMinor(_);
        };
        graticule2.stepMajor = function(_) {
          if (!arguments.length)
            return [DX, DY];
          DX = +_[0], DY = +_[1];
          return graticule2;
        };
        graticule2.stepMinor = function(_) {
          if (!arguments.length)
            return [dx, dy];
          dx = +_[0], dy = +_[1];
          return graticule2;
        };
        graticule2.precision = function(_) {
          if (!arguments.length)
            return precision;
          precision = +_;
          x = graticuleX(y02, y12, 90);
          y = graticuleY(x02, x12, precision);
          X = graticuleX(Y02, Y12, 90);
          Y = graticuleY(X02, X12, precision);
          return graticule2;
        };
        return graticule2.extentMajor([[-180, -90 + epsilon], [180, 90 - epsilon]]).extentMinor([[-180, -80 - epsilon], [180, 80 + epsilon]]);
      }
      function graticule10() {
        return graticule()();
      }
      function interpolate(a, b) {
        var x02 = a[0] * radians, y02 = a[1] * radians, x12 = b[0] * radians, y12 = b[1] * radians, cy0 = cos(y02), sy0 = sin(y02), cy1 = cos(y12), sy1 = sin(y12), kx0 = cy0 * cos(x02), ky0 = cy0 * sin(x02), kx1 = cy1 * cos(x12), ky1 = cy1 * sin(x12), d = 2 * asin(sqrt(haversin(y12 - y02) + cy0 * cy1 * haversin(x12 - x02))), k = sin(d);
        var interpolate2 = d ? function(t) {
          var B = sin(t *= d) / k, A = sin(d - t) / k, x = A * kx0 + B * kx1, y = A * ky0 + B * ky1, z = A * sy0 + B * sy1;
          return [
            atan2(y, x) * degrees,
            atan2(z, sqrt(x * x + y * y)) * degrees
          ];
        } : function() {
          return [x02 * degrees, y02 * degrees];
        };
        interpolate2.distance = d;
        return interpolate2;
      }
      var identity = (x) => x;
      var areaSum$1 = new d3Array.Adder(), areaRingSum$1 = new d3Array.Adder(), x00, y00, x0$1, y0$1;
      var areaStream$1 = {
        point: noop,
        lineStart: noop,
        lineEnd: noop,
        polygonStart: function() {
          areaStream$1.lineStart = areaRingStart$1;
          areaStream$1.lineEnd = areaRingEnd$1;
        },
        polygonEnd: function() {
          areaStream$1.lineStart = areaStream$1.lineEnd = areaStream$1.point = noop;
          areaSum$1.add(abs(areaRingSum$1));
          areaRingSum$1 = new d3Array.Adder();
        },
        result: function() {
          var area2 = areaSum$1 / 2;
          areaSum$1 = new d3Array.Adder();
          return area2;
        }
      };
      function areaRingStart$1() {
        areaStream$1.point = areaPointFirst$1;
      }
      function areaPointFirst$1(x, y) {
        areaStream$1.point = areaPoint$1;
        x00 = x0$1 = x, y00 = y0$1 = y;
      }
      function areaPoint$1(x, y) {
        areaRingSum$1.add(y0$1 * x - x0$1 * y);
        x0$1 = x, y0$1 = y;
      }
      function areaRingEnd$1() {
        areaPoint$1(x00, y00);
      }
      var x0$2 = Infinity, y0$2 = x0$2, x1 = -x0$2, y1 = x1;
      var boundsStream$1 = {
        point: boundsPoint$1,
        lineStart: noop,
        lineEnd: noop,
        polygonStart: noop,
        polygonEnd: noop,
        result: function() {
          var bounds2 = [[x0$2, y0$2], [x1, y1]];
          x1 = y1 = -(y0$2 = x0$2 = Infinity);
          return bounds2;
        }
      };
      function boundsPoint$1(x, y) {
        if (x < x0$2)
          x0$2 = x;
        if (x > x1)
          x1 = x;
        if (y < y0$2)
          y0$2 = y;
        if (y > y1)
          y1 = y;
      }
      var X0$1 = 0, Y0$1 = 0, Z0$1 = 0, X1$1 = 0, Y1$1 = 0, Z1$1 = 0, X2$1 = 0, Y2$1 = 0, Z2$1 = 0, x00$1, y00$1, x0$3, y0$3;
      var centroidStream$1 = {
        point: centroidPoint$1,
        lineStart: centroidLineStart$1,
        lineEnd: centroidLineEnd$1,
        polygonStart: function() {
          centroidStream$1.lineStart = centroidRingStart$1;
          centroidStream$1.lineEnd = centroidRingEnd$1;
        },
        polygonEnd: function() {
          centroidStream$1.point = centroidPoint$1;
          centroidStream$1.lineStart = centroidLineStart$1;
          centroidStream$1.lineEnd = centroidLineEnd$1;
        },
        result: function() {
          var centroid2 = Z2$1 ? [X2$1 / Z2$1, Y2$1 / Z2$1] : Z1$1 ? [X1$1 / Z1$1, Y1$1 / Z1$1] : Z0$1 ? [X0$1 / Z0$1, Y0$1 / Z0$1] : [NaN, NaN];
          X0$1 = Y0$1 = Z0$1 = X1$1 = Y1$1 = Z1$1 = X2$1 = Y2$1 = Z2$1 = 0;
          return centroid2;
        }
      };
      function centroidPoint$1(x, y) {
        X0$1 += x;
        Y0$1 += y;
        ++Z0$1;
      }
      function centroidLineStart$1() {
        centroidStream$1.point = centroidPointFirstLine;
      }
      function centroidPointFirstLine(x, y) {
        centroidStream$1.point = centroidPointLine;
        centroidPoint$1(x0$3 = x, y0$3 = y);
      }
      function centroidPointLine(x, y) {
        var dx = x - x0$3, dy = y - y0$3, z = sqrt(dx * dx + dy * dy);
        X1$1 += z * (x0$3 + x) / 2;
        Y1$1 += z * (y0$3 + y) / 2;
        Z1$1 += z;
        centroidPoint$1(x0$3 = x, y0$3 = y);
      }
      function centroidLineEnd$1() {
        centroidStream$1.point = centroidPoint$1;
      }
      function centroidRingStart$1() {
        centroidStream$1.point = centroidPointFirstRing;
      }
      function centroidRingEnd$1() {
        centroidPointRing(x00$1, y00$1);
      }
      function centroidPointFirstRing(x, y) {
        centroidStream$1.point = centroidPointRing;
        centroidPoint$1(x00$1 = x0$3 = x, y00$1 = y0$3 = y);
      }
      function centroidPointRing(x, y) {
        var dx = x - x0$3, dy = y - y0$3, z = sqrt(dx * dx + dy * dy);
        X1$1 += z * (x0$3 + x) / 2;
        Y1$1 += z * (y0$3 + y) / 2;
        Z1$1 += z;
        z = y0$3 * x - x0$3 * y;
        X2$1 += z * (x0$3 + x);
        Y2$1 += z * (y0$3 + y);
        Z2$1 += z * 3;
        centroidPoint$1(x0$3 = x, y0$3 = y);
      }
      function PathContext(context) {
        this._context = context;
      }
      PathContext.prototype = {
        _radius: 4.5,
        pointRadius: function(_) {
          return this._radius = _, this;
        },
        polygonStart: function() {
          this._line = 0;
        },
        polygonEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._point = 0;
        },
        lineEnd: function() {
          if (this._line === 0)
            this._context.closePath();
          this._point = NaN;
        },
        point: function(x, y) {
          switch (this._point) {
            case 0: {
              this._context.moveTo(x, y);
              this._point = 1;
              break;
            }
            case 1: {
              this._context.lineTo(x, y);
              break;
            }
            default: {
              this._context.moveTo(x + this._radius, y);
              this._context.arc(x, y, this._radius, 0, tau);
              break;
            }
          }
        },
        result: noop
      };
      var lengthSum$1 = new d3Array.Adder(), lengthRing, x00$2, y00$2, x0$4, y0$4;
      var lengthStream$1 = {
        point: noop,
        lineStart: function() {
          lengthStream$1.point = lengthPointFirst$1;
        },
        lineEnd: function() {
          if (lengthRing)
            lengthPoint$1(x00$2, y00$2);
          lengthStream$1.point = noop;
        },
        polygonStart: function() {
          lengthRing = true;
        },
        polygonEnd: function() {
          lengthRing = null;
        },
        result: function() {
          var length2 = +lengthSum$1;
          lengthSum$1 = new d3Array.Adder();
          return length2;
        }
      };
      function lengthPointFirst$1(x, y) {
        lengthStream$1.point = lengthPoint$1;
        x00$2 = x0$4 = x, y00$2 = y0$4 = y;
      }
      function lengthPoint$1(x, y) {
        x0$4 -= x, y0$4 -= y;
        lengthSum$1.add(sqrt(x0$4 * x0$4 + y0$4 * y0$4));
        x0$4 = x, y0$4 = y;
      }
      function PathString() {
        this._string = [];
      }
      PathString.prototype = {
        _radius: 4.5,
        _circle: circle$1(4.5),
        pointRadius: function(_) {
          if ((_ = +_) !== this._radius)
            this._radius = _, this._circle = null;
          return this;
        },
        polygonStart: function() {
          this._line = 0;
        },
        polygonEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._point = 0;
        },
        lineEnd: function() {
          if (this._line === 0)
            this._string.push("Z");
          this._point = NaN;
        },
        point: function(x, y) {
          switch (this._point) {
            case 0: {
              this._string.push("M", x, ",", y);
              this._point = 1;
              break;
            }
            case 1: {
              this._string.push("L", x, ",", y);
              break;
            }
            default: {
              if (this._circle == null)
                this._circle = circle$1(this._radius);
              this._string.push("M", x, ",", y, this._circle);
              break;
            }
          }
        },
        result: function() {
          if (this._string.length) {
            var result = this._string.join("");
            this._string = [];
            return result;
          } else {
            return null;
          }
        }
      };
      function circle$1(radius) {
        return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z";
      }
      function index(projection2, context) {
        var pointRadius = 4.5, projectionStream, contextStream;
        function path(object2) {
          if (object2) {
            if (typeof pointRadius === "function")
              contextStream.pointRadius(+pointRadius.apply(this, arguments));
            geoStream(object2, projectionStream(contextStream));
          }
          return contextStream.result();
        }
        path.area = function(object2) {
          geoStream(object2, projectionStream(areaStream$1));
          return areaStream$1.result();
        };
        path.measure = function(object2) {
          geoStream(object2, projectionStream(lengthStream$1));
          return lengthStream$1.result();
        };
        path.bounds = function(object2) {
          geoStream(object2, projectionStream(boundsStream$1));
          return boundsStream$1.result();
        };
        path.centroid = function(object2) {
          geoStream(object2, projectionStream(centroidStream$1));
          return centroidStream$1.result();
        };
        path.projection = function(_) {
          return arguments.length ? (projectionStream = _ == null ? (projection2 = null, identity) : (projection2 = _).stream, path) : projection2;
        };
        path.context = function(_) {
          if (!arguments.length)
            return context;
          contextStream = _ == null ? (context = null, new PathString()) : new PathContext(context = _);
          if (typeof pointRadius !== "function")
            contextStream.pointRadius(pointRadius);
          return path;
        };
        path.pointRadius = function(_) {
          if (!arguments.length)
            return pointRadius;
          pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
          return path;
        };
        return path.projection(projection2).context(context);
      }
      function transform(methods) {
        return {
          stream: transformer(methods)
        };
      }
      function transformer(methods) {
        return function(stream) {
          var s = new TransformStream();
          for (var key in methods)
            s[key] = methods[key];
          s.stream = stream;
          return s;
        };
      }
      function TransformStream() {
      }
      TransformStream.prototype = {
        constructor: TransformStream,
        point: function(x, y) {
          this.stream.point(x, y);
        },
        sphere: function() {
          this.stream.sphere();
        },
        lineStart: function() {
          this.stream.lineStart();
        },
        lineEnd: function() {
          this.stream.lineEnd();
        },
        polygonStart: function() {
          this.stream.polygonStart();
        },
        polygonEnd: function() {
          this.stream.polygonEnd();
        }
      };
      function fit(projection2, fitBounds, object2) {
        var clip2 = projection2.clipExtent && projection2.clipExtent();
        projection2.scale(150).translate([0, 0]);
        if (clip2 != null)
          projection2.clipExtent(null);
        geoStream(object2, projection2.stream(boundsStream$1));
        fitBounds(boundsStream$1.result());
        if (clip2 != null)
          projection2.clipExtent(clip2);
        return projection2;
      }
      function fitExtent(projection2, extent2, object2) {
        return fit(projection2, function(b) {
          var w = extent2[1][0] - extent2[0][0], h = extent2[1][1] - extent2[0][1], k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])), x = +extent2[0][0] + (w - k * (b[1][0] + b[0][0])) / 2, y = +extent2[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;
          projection2.scale(150 * k).translate([x, y]);
        }, object2);
      }
      function fitSize(projection2, size, object2) {
        return fitExtent(projection2, [[0, 0], size], object2);
      }
      function fitWidth(projection2, width2, object2) {
        return fit(projection2, function(b) {
          var w = +width2, k = w / (b[1][0] - b[0][0]), x = (w - k * (b[1][0] + b[0][0])) / 2, y = -k * b[0][1];
          projection2.scale(150 * k).translate([x, y]);
        }, object2);
      }
      function fitHeight(projection2, height2, object2) {
        return fit(projection2, function(b) {
          var h = +height2, k = h / (b[1][1] - b[0][1]), x = -k * b[0][0], y = (h - k * (b[1][1] + b[0][1])) / 2;
          projection2.scale(150 * k).translate([x, y]);
        }, object2);
      }
      var maxDepth = 16, cosMinDistance = cos(30 * radians);
      function resample(project, delta2) {
        return +delta2 ? resample$1(project, delta2) : resampleNone(project);
      }
      function resampleNone(project) {
        return transformer({
          point: function(x, y) {
            x = project(x, y);
            this.stream.point(x[0], x[1]);
          }
        });
      }
      function resample$1(project, delta2) {
        function resampleLineTo(x02, y02, lambda02, a0, b0, c0, x12, y12, lambda12, a1, b1, c1, depth, stream) {
          var dx = x12 - x02, dy = y12 - y02, d2 = dx * dx + dy * dy;
          if (d2 > 4 * delta2 && depth--) {
            var a = a0 + a1, b = b0 + b1, c = c0 + c1, m = sqrt(a * a + b * b + c * c), phi2 = asin(c /= m), lambda22 = abs(abs(c) - 1) < epsilon || abs(lambda02 - lambda12) < epsilon ? (lambda02 + lambda12) / 2 : atan2(b, a), p = project(lambda22, phi2), x2 = p[0], y2 = p[1], dx2 = x2 - x02, dy2 = y2 - y02, dz = dy * dx2 - dx * dy2;
            if (dz * dz / d2 > delta2 || abs((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
              resampleLineTo(x02, y02, lambda02, a0, b0, c0, x2, y2, lambda22, a /= m, b /= m, c, depth, stream);
              stream.point(x2, y2);
              resampleLineTo(x2, y2, lambda22, a, b, c, x12, y12, lambda12, a1, b1, c1, depth, stream);
            }
          }
        }
        return function(stream) {
          var lambda002, x002, y002, a00, b00, c00, lambda02, x02, y02, a0, b0, c0;
          var resampleStream = {
            point,
            lineStart,
            lineEnd,
            polygonStart: function() {
              stream.polygonStart();
              resampleStream.lineStart = ringStart;
            },
            polygonEnd: function() {
              stream.polygonEnd();
              resampleStream.lineStart = lineStart;
            }
          };
          function point(x, y) {
            x = project(x, y);
            stream.point(x[0], x[1]);
          }
          function lineStart() {
            x02 = NaN;
            resampleStream.point = linePoint2;
            stream.lineStart();
          }
          function linePoint2(lambda, phi) {
            var c = cartesian([lambda, phi]), p = project(lambda, phi);
            resampleLineTo(x02, y02, lambda02, a0, b0, c0, x02 = p[0], y02 = p[1], lambda02 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
            stream.point(x02, y02);
          }
          function lineEnd() {
            resampleStream.point = point;
            stream.lineEnd();
          }
          function ringStart() {
            lineStart();
            resampleStream.point = ringPoint;
            resampleStream.lineEnd = ringEnd;
          }
          function ringPoint(lambda, phi) {
            linePoint2(lambda002 = lambda, phi), x002 = x02, y002 = y02, a00 = a0, b00 = b0, c00 = c0;
            resampleStream.point = linePoint2;
          }
          function ringEnd() {
            resampleLineTo(x02, y02, lambda02, a0, b0, c0, x002, y002, lambda002, a00, b00, c00, maxDepth, stream);
            resampleStream.lineEnd = lineEnd;
            lineEnd();
          }
          return resampleStream;
        };
      }
      var transformRadians = transformer({
        point: function(x, y) {
          this.stream.point(x * radians, y * radians);
        }
      });
      function transformRotate(rotate) {
        return transformer({
          point: function(x, y) {
            var r = rotate(x, y);
            return this.stream.point(r[0], r[1]);
          }
        });
      }
      function scaleTranslate(k, dx, dy, sx, sy) {
        function transform2(x, y) {
          x *= sx;
          y *= sy;
          return [dx + k * x, dy - k * y];
        }
        transform2.invert = function(x, y) {
          return [(x - dx) / k * sx, (dy - y) / k * sy];
        };
        return transform2;
      }
      function scaleTranslateRotate(k, dx, dy, sx, sy, alpha) {
        if (!alpha)
          return scaleTranslate(k, dx, dy, sx, sy);
        var cosAlpha = cos(alpha), sinAlpha = sin(alpha), a = cosAlpha * k, b = sinAlpha * k, ai = cosAlpha / k, bi = sinAlpha / k, ci = (sinAlpha * dy - cosAlpha * dx) / k, fi = (sinAlpha * dx + cosAlpha * dy) / k;
        function transform2(x, y) {
          x *= sx;
          y *= sy;
          return [a * x - b * y + dx, dy - b * x - a * y];
        }
        transform2.invert = function(x, y) {
          return [sx * (ai * x - bi * y + ci), sy * (fi - bi * x - ai * y)];
        };
        return transform2;
      }
      function projection(project) {
        return projectionMutator(function() {
          return project;
        })();
      }
      function projectionMutator(projectAt) {
        var project, k = 150, x = 480, y = 250, lambda = 0, phi = 0, deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, alpha = 0, sx = 1, sy = 1, theta = null, preclip = clipAntimeridian, x02 = null, y02, x12, y12, postclip = identity, delta2 = 0.5, projectResample, projectTransform, projectRotateTransform, cache, cacheStream;
        function projection2(point) {
          return projectRotateTransform(point[0] * radians, point[1] * radians);
        }
        function invert(point) {
          point = projectRotateTransform.invert(point[0], point[1]);
          return point && [point[0] * degrees, point[1] * degrees];
        }
        projection2.stream = function(stream) {
          return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
        };
        projection2.preclip = function(_) {
          return arguments.length ? (preclip = _, theta = void 0, reset()) : preclip;
        };
        projection2.postclip = function(_) {
          return arguments.length ? (postclip = _, x02 = y02 = x12 = y12 = null, reset()) : postclip;
        };
        projection2.clipAngle = function(_) {
          return arguments.length ? (preclip = +_ ? clipCircle(theta = _ * radians) : (theta = null, clipAntimeridian), reset()) : theta * degrees;
        };
        projection2.clipExtent = function(_) {
          return arguments.length ? (postclip = _ == null ? (x02 = y02 = x12 = y12 = null, identity) : clipRectangle(x02 = +_[0][0], y02 = +_[0][1], x12 = +_[1][0], y12 = +_[1][1]), reset()) : x02 == null ? null : [[x02, y02], [x12, y12]];
        };
        projection2.scale = function(_) {
          return arguments.length ? (k = +_, recenter()) : k;
        };
        projection2.translate = function(_) {
          return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
        };
        projection2.center = function(_) {
          return arguments.length ? (lambda = _[0] % 360 * radians, phi = _[1] % 360 * radians, recenter()) : [lambda * degrees, phi * degrees];
        };
        projection2.rotate = function(_) {
          return arguments.length ? (deltaLambda = _[0] % 360 * radians, deltaPhi = _[1] % 360 * radians, deltaGamma = _.length > 2 ? _[2] % 360 * radians : 0, recenter()) : [deltaLambda * degrees, deltaPhi * degrees, deltaGamma * degrees];
        };
        projection2.angle = function(_) {
          return arguments.length ? (alpha = _ % 360 * radians, recenter()) : alpha * degrees;
        };
        projection2.reflectX = function(_) {
          return arguments.length ? (sx = _ ? -1 : 1, recenter()) : sx < 0;
        };
        projection2.reflectY = function(_) {
          return arguments.length ? (sy = _ ? -1 : 1, recenter()) : sy < 0;
        };
        projection2.precision = function(_) {
          return arguments.length ? (projectResample = resample(projectTransform, delta2 = _ * _), reset()) : sqrt(delta2);
        };
        projection2.fitExtent = function(extent2, object2) {
          return fitExtent(projection2, extent2, object2);
        };
        projection2.fitSize = function(size, object2) {
          return fitSize(projection2, size, object2);
        };
        projection2.fitWidth = function(width2, object2) {
          return fitWidth(projection2, width2, object2);
        };
        projection2.fitHeight = function(height2, object2) {
          return fitHeight(projection2, height2, object2);
        };
        function recenter() {
          var center = scaleTranslateRotate(k, 0, 0, sx, sy, alpha).apply(null, project(lambda, phi)), transform2 = scaleTranslateRotate(k, x - center[0], y - center[1], sx, sy, alpha);
          rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma);
          projectTransform = compose(project, transform2);
          projectRotateTransform = compose(rotate, projectTransform);
          projectResample = resample(projectTransform, delta2);
          return reset();
        }
        function reset() {
          cache = cacheStream = null;
          return projection2;
        }
        return function() {
          project = projectAt.apply(this, arguments);
          projection2.invert = project.invert && invert;
          return recenter();
        };
      }
      function conicProjection(projectAt) {
        var phi02 = 0, phi12 = pi / 3, m = projectionMutator(projectAt), p = m(phi02, phi12);
        p.parallels = function(_) {
          return arguments.length ? m(phi02 = _[0] * radians, phi12 = _[1] * radians) : [phi02 * degrees, phi12 * degrees];
        };
        return p;
      }
      function cylindricalEqualAreaRaw(phi02) {
        var cosPhi02 = cos(phi02);
        function forward(lambda, phi) {
          return [lambda * cosPhi02, sin(phi) / cosPhi02];
        }
        forward.invert = function(x, y) {
          return [x / cosPhi02, asin(y * cosPhi02)];
        };
        return forward;
      }
      function conicEqualAreaRaw(y02, y12) {
        var sy0 = sin(y02), n = (sy0 + sin(y12)) / 2;
        if (abs(n) < epsilon)
          return cylindricalEqualAreaRaw(y02);
        var c = 1 + sy0 * (2 * n - sy0), r0 = sqrt(c) / n;
        function project(x, y) {
          var r = sqrt(c - 2 * n * sin(y)) / n;
          return [r * sin(x *= n), r0 - r * cos(x)];
        }
        project.invert = function(x, y) {
          var r0y = r0 - y, l = atan2(x, abs(r0y)) * sign(r0y);
          if (r0y * n < 0)
            l -= pi * sign(x) * sign(r0y);
          return [l / n, asin((c - (x * x + r0y * r0y) * n * n) / (2 * n))];
        };
        return project;
      }
      function conicEqualArea() {
        return conicProjection(conicEqualAreaRaw).scale(155.424).center([0, 33.6442]);
      }
      function albers() {
        return conicEqualArea().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([-0.6, 38.7]);
      }
      function multiplex(streams) {
        var n = streams.length;
        return {
          point: function(x, y) {
            var i = -1;
            while (++i < n)
              streams[i].point(x, y);
          },
          sphere: function() {
            var i = -1;
            while (++i < n)
              streams[i].sphere();
          },
          lineStart: function() {
            var i = -1;
            while (++i < n)
              streams[i].lineStart();
          },
          lineEnd: function() {
            var i = -1;
            while (++i < n)
              streams[i].lineEnd();
          },
          polygonStart: function() {
            var i = -1;
            while (++i < n)
              streams[i].polygonStart();
          },
          polygonEnd: function() {
            var i = -1;
            while (++i < n)
              streams[i].polygonEnd();
          }
        };
      }
      function albersUsa() {
        var cache, cacheStream, lower48 = albers(), lower48Point, alaska = conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), alaskaPoint, hawaii = conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), hawaiiPoint, point, pointStream = {point: function(x, y) {
          point = [x, y];
        }};
        function albersUsa2(coordinates2) {
          var x = coordinates2[0], y = coordinates2[1];
          return point = null, (lower48Point.point(x, y), point) || (alaskaPoint.point(x, y), point) || (hawaiiPoint.point(x, y), point);
        }
        albersUsa2.invert = function(coordinates2) {
          var k = lower48.scale(), t = lower48.translate(), x = (coordinates2[0] - t[0]) / k, y = (coordinates2[1] - t[1]) / k;
          return (y >= 0.12 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii : lower48).invert(coordinates2);
        };
        albersUsa2.stream = function(stream) {
          return cache && cacheStream === stream ? cache : cache = multiplex([lower48.stream(cacheStream = stream), alaska.stream(stream), hawaii.stream(stream)]);
        };
        albersUsa2.precision = function(_) {
          if (!arguments.length)
            return lower48.precision();
          lower48.precision(_), alaska.precision(_), hawaii.precision(_);
          return reset();
        };
        albersUsa2.scale = function(_) {
          if (!arguments.length)
            return lower48.scale();
          lower48.scale(_), alaska.scale(_ * 0.35), hawaii.scale(_);
          return albersUsa2.translate(lower48.translate());
        };
        albersUsa2.translate = function(_) {
          if (!arguments.length)
            return lower48.translate();
          var k = lower48.scale(), x = +_[0], y = +_[1];
          lower48Point = lower48.translate(_).clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]]).stream(pointStream);
          alaskaPoint = alaska.translate([x - 0.307 * k, y + 0.201 * k]).clipExtent([[x - 0.425 * k + epsilon, y + 0.12 * k + epsilon], [x - 0.214 * k - epsilon, y + 0.234 * k - epsilon]]).stream(pointStream);
          hawaiiPoint = hawaii.translate([x - 0.205 * k, y + 0.212 * k]).clipExtent([[x - 0.214 * k + epsilon, y + 0.166 * k + epsilon], [x - 0.115 * k - epsilon, y + 0.234 * k - epsilon]]).stream(pointStream);
          return reset();
        };
        albersUsa2.fitExtent = function(extent2, object2) {
          return fitExtent(albersUsa2, extent2, object2);
        };
        albersUsa2.fitSize = function(size, object2) {
          return fitSize(albersUsa2, size, object2);
        };
        albersUsa2.fitWidth = function(width2, object2) {
          return fitWidth(albersUsa2, width2, object2);
        };
        albersUsa2.fitHeight = function(height2, object2) {
          return fitHeight(albersUsa2, height2, object2);
        };
        function reset() {
          cache = cacheStream = null;
          return albersUsa2;
        }
        return albersUsa2.scale(1070);
      }
      function azimuthalRaw(scale) {
        return function(x, y) {
          var cx = cos(x), cy = cos(y), k = scale(cx * cy);
          if (k === Infinity)
            return [2, 0];
          return [
            k * cy * sin(x),
            k * sin(y)
          ];
        };
      }
      function azimuthalInvert(angle2) {
        return function(x, y) {
          var z = sqrt(x * x + y * y), c = angle2(z), sc = sin(c), cc = cos(c);
          return [
            atan2(x * sc, z * cc),
            asin(z && y * sc / z)
          ];
        };
      }
      var azimuthalEqualAreaRaw = azimuthalRaw(function(cxcy) {
        return sqrt(2 / (1 + cxcy));
      });
      azimuthalEqualAreaRaw.invert = azimuthalInvert(function(z) {
        return 2 * asin(z / 2);
      });
      function azimuthalEqualArea() {
        return projection(azimuthalEqualAreaRaw).scale(124.75).clipAngle(180 - 1e-3);
      }
      var azimuthalEquidistantRaw = azimuthalRaw(function(c) {
        return (c = acos(c)) && c / sin(c);
      });
      azimuthalEquidistantRaw.invert = azimuthalInvert(function(z) {
        return z;
      });
      function azimuthalEquidistant() {
        return projection(azimuthalEquidistantRaw).scale(79.4188).clipAngle(180 - 1e-3);
      }
      function mercatorRaw(lambda, phi) {
        return [lambda, log(tan((halfPi + phi) / 2))];
      }
      mercatorRaw.invert = function(x, y) {
        return [x, 2 * atan(exp(y)) - halfPi];
      };
      function mercator() {
        return mercatorProjection(mercatorRaw).scale(961 / tau);
      }
      function mercatorProjection(project) {
        var m = projection(project), center = m.center, scale = m.scale, translate = m.translate, clipExtent = m.clipExtent, x02 = null, y02, x12, y12;
        m.scale = function(_) {
          return arguments.length ? (scale(_), reclip()) : scale();
        };
        m.translate = function(_) {
          return arguments.length ? (translate(_), reclip()) : translate();
        };
        m.center = function(_) {
          return arguments.length ? (center(_), reclip()) : center();
        };
        m.clipExtent = function(_) {
          return arguments.length ? (_ == null ? x02 = y02 = x12 = y12 = null : (x02 = +_[0][0], y02 = +_[0][1], x12 = +_[1][0], y12 = +_[1][1]), reclip()) : x02 == null ? null : [[x02, y02], [x12, y12]];
        };
        function reclip() {
          var k = pi * scale(), t = m(rotation(m.rotate()).invert([0, 0]));
          return clipExtent(x02 == null ? [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]] : project === mercatorRaw ? [[Math.max(t[0] - k, x02), y02], [Math.min(t[0] + k, x12), y12]] : [[x02, Math.max(t[1] - k, y02)], [x12, Math.min(t[1] + k, y12)]]);
        }
        return reclip();
      }
      function tany(y) {
        return tan((halfPi + y) / 2);
      }
      function conicConformalRaw(y02, y12) {
        var cy0 = cos(y02), n = y02 === y12 ? sin(y02) : log(cy0 / cos(y12)) / log(tany(y12) / tany(y02)), f = cy0 * pow(tany(y02), n) / n;
        if (!n)
          return mercatorRaw;
        function project(x, y) {
          if (f > 0) {
            if (y < -halfPi + epsilon)
              y = -halfPi + epsilon;
          } else {
            if (y > halfPi - epsilon)
              y = halfPi - epsilon;
          }
          var r = f / pow(tany(y), n);
          return [r * sin(n * x), f - r * cos(n * x)];
        }
        project.invert = function(x, y) {
          var fy = f - y, r = sign(n) * sqrt(x * x + fy * fy), l = atan2(x, abs(fy)) * sign(fy);
          if (fy * n < 0)
            l -= pi * sign(x) * sign(fy);
          return [l / n, 2 * atan(pow(f / r, 1 / n)) - halfPi];
        };
        return project;
      }
      function conicConformal() {
        return conicProjection(conicConformalRaw).scale(109.5).parallels([30, 30]);
      }
      function equirectangularRaw(lambda, phi) {
        return [lambda, phi];
      }
      equirectangularRaw.invert = equirectangularRaw;
      function equirectangular() {
        return projection(equirectangularRaw).scale(152.63);
      }
      function conicEquidistantRaw(y02, y12) {
        var cy0 = cos(y02), n = y02 === y12 ? sin(y02) : (cy0 - cos(y12)) / (y12 - y02), g = cy0 / n + y02;
        if (abs(n) < epsilon)
          return equirectangularRaw;
        function project(x, y) {
          var gy = g - y, nx = n * x;
          return [gy * sin(nx), g - gy * cos(nx)];
        }
        project.invert = function(x, y) {
          var gy = g - y, l = atan2(x, abs(gy)) * sign(gy);
          if (gy * n < 0)
            l -= pi * sign(x) * sign(gy);
          return [l / n, g - sign(n) * sqrt(x * x + gy * gy)];
        };
        return project;
      }
      function conicEquidistant() {
        return conicProjection(conicEquidistantRaw).scale(131.154).center([0, 13.9389]);
      }
      var A1 = 1.340264, A2 = -0.081106, A3 = 893e-6, A4 = 3796e-6, M = sqrt(3) / 2, iterations = 12;
      function equalEarthRaw(lambda, phi) {
        var l = asin(M * sin(phi)), l2 = l * l, l6 = l2 * l2 * l2;
        return [
          lambda * cos(l) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))),
          l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2))
        ];
      }
      equalEarthRaw.invert = function(x, y) {
        var l = y, l2 = l * l, l6 = l2 * l2 * l2;
        for (var i = 0, delta, fy, fpy; i < iterations; ++i) {
          fy = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)) - y;
          fpy = A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2);
          l -= delta = fy / fpy, l2 = l * l, l6 = l2 * l2 * l2;
          if (abs(delta) < epsilon2)
            break;
        }
        return [
          M * x * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2)) / cos(l),
          asin(sin(l) / M)
        ];
      };
      function equalEarth() {
        return projection(equalEarthRaw).scale(177.158);
      }
      function gnomonicRaw(x, y) {
        var cy = cos(y), k = cos(x) * cy;
        return [cy * sin(x) / k, sin(y) / k];
      }
      gnomonicRaw.invert = azimuthalInvert(atan);
      function gnomonic() {
        return projection(gnomonicRaw).scale(144.049).clipAngle(60);
      }
      function identity$1() {
        var k = 1, tx = 0, ty = 0, sx = 1, sy = 1, alpha = 0, ca, sa, x02 = null, y02, x12, y12, kx = 1, ky = 1, transform2 = transformer({
          point: function(x, y) {
            var p = projection2([x, y]);
            this.stream.point(p[0], p[1]);
          }
        }), postclip = identity, cache, cacheStream;
        function reset() {
          kx = k * sx;
          ky = k * sy;
          cache = cacheStream = null;
          return projection2;
        }
        function projection2(p) {
          var x = p[0] * kx, y = p[1] * ky;
          if (alpha) {
            var t = y * ca - x * sa;
            x = x * ca + y * sa;
            y = t;
          }
          return [x + tx, y + ty];
        }
        projection2.invert = function(p) {
          var x = p[0] - tx, y = p[1] - ty;
          if (alpha) {
            var t = y * ca + x * sa;
            x = x * ca - y * sa;
            y = t;
          }
          return [x / kx, y / ky];
        };
        projection2.stream = function(stream) {
          return cache && cacheStream === stream ? cache : cache = transform2(postclip(cacheStream = stream));
        };
        projection2.postclip = function(_) {
          return arguments.length ? (postclip = _, x02 = y02 = x12 = y12 = null, reset()) : postclip;
        };
        projection2.clipExtent = function(_) {
          return arguments.length ? (postclip = _ == null ? (x02 = y02 = x12 = y12 = null, identity) : clipRectangle(x02 = +_[0][0], y02 = +_[0][1], x12 = +_[1][0], y12 = +_[1][1]), reset()) : x02 == null ? null : [[x02, y02], [x12, y12]];
        };
        projection2.scale = function(_) {
          return arguments.length ? (k = +_, reset()) : k;
        };
        projection2.translate = function(_) {
          return arguments.length ? (tx = +_[0], ty = +_[1], reset()) : [tx, ty];
        };
        projection2.angle = function(_) {
          return arguments.length ? (alpha = _ % 360 * radians, sa = sin(alpha), ca = cos(alpha), reset()) : alpha * degrees;
        };
        projection2.reflectX = function(_) {
          return arguments.length ? (sx = _ ? -1 : 1, reset()) : sx < 0;
        };
        projection2.reflectY = function(_) {
          return arguments.length ? (sy = _ ? -1 : 1, reset()) : sy < 0;
        };
        projection2.fitExtent = function(extent2, object2) {
          return fitExtent(projection2, extent2, object2);
        };
        projection2.fitSize = function(size, object2) {
          return fitSize(projection2, size, object2);
        };
        projection2.fitWidth = function(width2, object2) {
          return fitWidth(projection2, width2, object2);
        };
        projection2.fitHeight = function(height2, object2) {
          return fitHeight(projection2, height2, object2);
        };
        return projection2;
      }
      function naturalEarth1Raw(lambda, phi) {
        var phi2 = phi * phi, phi4 = phi2 * phi2;
        return [
          lambda * (0.8707 - 0.131979 * phi2 + phi4 * (-0.013791 + phi4 * (3971e-6 * phi2 - 1529e-6 * phi4))),
          phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 5916e-6 * phi4)))
        ];
      }
      naturalEarth1Raw.invert = function(x, y) {
        var phi = y, i = 25, delta;
        do {
          var phi2 = phi * phi, phi4 = phi2 * phi2;
          phi -= delta = (phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 5916e-6 * phi4))) - y) / (1.007226 + phi2 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi2 - 5916e-6 * 11 * phi4)));
        } while (abs(delta) > epsilon && --i > 0);
        return [
          x / (0.8707 + (phi2 = phi * phi) * (-0.131979 + phi2 * (-0.013791 + phi2 * phi2 * phi2 * (3971e-6 - 1529e-6 * phi2)))),
          phi
        ];
      };
      function naturalEarth1() {
        return projection(naturalEarth1Raw).scale(175.295);
      }
      function orthographicRaw(x, y) {
        return [cos(y) * sin(x), sin(y)];
      }
      orthographicRaw.invert = azimuthalInvert(asin);
      function orthographic() {
        return projection(orthographicRaw).scale(249.5).clipAngle(90 + epsilon);
      }
      function stereographicRaw(x, y) {
        var cy = cos(y), k = 1 + cos(x) * cy;
        return [cy * sin(x) / k, sin(y) / k];
      }
      stereographicRaw.invert = azimuthalInvert(function(z) {
        return 2 * atan(z);
      });
      function stereographic() {
        return projection(stereographicRaw).scale(250).clipAngle(142);
      }
      function transverseMercatorRaw(lambda, phi) {
        return [log(tan((halfPi + phi) / 2)), -lambda];
      }
      transverseMercatorRaw.invert = function(x, y) {
        return [-y, 2 * atan(exp(x)) - halfPi];
      };
      function transverseMercator() {
        var m = mercatorProjection(transverseMercatorRaw), center = m.center, rotate = m.rotate;
        m.center = function(_) {
          return arguments.length ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
        };
        m.rotate = function(_) {
          return arguments.length ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
        };
        return rotate([0, 0, 90]).scale(159.155);
      }
      exports2.geoAlbers = albers;
      exports2.geoAlbersUsa = albersUsa;
      exports2.geoArea = area;
      exports2.geoAzimuthalEqualArea = azimuthalEqualArea;
      exports2.geoAzimuthalEqualAreaRaw = azimuthalEqualAreaRaw;
      exports2.geoAzimuthalEquidistant = azimuthalEquidistant;
      exports2.geoAzimuthalEquidistantRaw = azimuthalEquidistantRaw;
      exports2.geoBounds = bounds;
      exports2.geoCentroid = centroid;
      exports2.geoCircle = circle;
      exports2.geoClipAntimeridian = clipAntimeridian;
      exports2.geoClipCircle = clipCircle;
      exports2.geoClipExtent = extent;
      exports2.geoClipRectangle = clipRectangle;
      exports2.geoConicConformal = conicConformal;
      exports2.geoConicConformalRaw = conicConformalRaw;
      exports2.geoConicEqualArea = conicEqualArea;
      exports2.geoConicEqualAreaRaw = conicEqualAreaRaw;
      exports2.geoConicEquidistant = conicEquidistant;
      exports2.geoConicEquidistantRaw = conicEquidistantRaw;
      exports2.geoContains = contains;
      exports2.geoDistance = distance;
      exports2.geoEqualEarth = equalEarth;
      exports2.geoEqualEarthRaw = equalEarthRaw;
      exports2.geoEquirectangular = equirectangular;
      exports2.geoEquirectangularRaw = equirectangularRaw;
      exports2.geoGnomonic = gnomonic;
      exports2.geoGnomonicRaw = gnomonicRaw;
      exports2.geoGraticule = graticule;
      exports2.geoGraticule10 = graticule10;
      exports2.geoIdentity = identity$1;
      exports2.geoInterpolate = interpolate;
      exports2.geoLength = length;
      exports2.geoMercator = mercator;
      exports2.geoMercatorRaw = mercatorRaw;
      exports2.geoNaturalEarth1 = naturalEarth1;
      exports2.geoNaturalEarth1Raw = naturalEarth1Raw;
      exports2.geoOrthographic = orthographic;
      exports2.geoOrthographicRaw = orthographicRaw;
      exports2.geoPath = index;
      exports2.geoProjection = projection;
      exports2.geoProjectionMutator = projectionMutator;
      exports2.geoRotation = rotation;
      exports2.geoStereographic = stereographic;
      exports2.geoStereographicRaw = stereographicRaw;
      exports2.geoStream = geoStream;
      exports2.geoTransform = transform;
      exports2.geoTransverseMercator = transverseMercator;
      exports2.geoTransverseMercatorRaw = transverseMercatorRaw;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-hierarchy/dist/d3-hierarchy.js
  var require_d3_hierarchy = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      function defaultSeparation(a, b) {
        return a.parent === b.parent ? 1 : 2;
      }
      function meanX(children) {
        return children.reduce(meanXReduce, 0) / children.length;
      }
      function meanXReduce(x, c) {
        return x + c.x;
      }
      function maxY(children) {
        return 1 + children.reduce(maxYReduce, 0);
      }
      function maxYReduce(y, c) {
        return Math.max(y, c.y);
      }
      function leafLeft(node) {
        var children;
        while (children = node.children)
          node = children[0];
        return node;
      }
      function leafRight(node) {
        var children;
        while (children = node.children)
          node = children[children.length - 1];
        return node;
      }
      function cluster() {
        var separation = defaultSeparation, dx = 1, dy = 1, nodeSize = false;
        function cluster2(root) {
          var previousNode, x = 0;
          root.eachAfter(function(node) {
            var children = node.children;
            if (children) {
              node.x = meanX(children);
              node.y = maxY(children);
            } else {
              node.x = previousNode ? x += separation(node, previousNode) : 0;
              node.y = 0;
              previousNode = node;
            }
          });
          var left = leafLeft(root), right = leafRight(root), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2;
          return root.eachAfter(nodeSize ? function(node) {
            node.x = (node.x - root.x) * dx;
            node.y = (root.y - node.y) * dy;
          } : function(node) {
            node.x = (node.x - x0) / (x1 - x0) * dx;
            node.y = (1 - (root.y ? node.y / root.y : 1)) * dy;
          });
        }
        cluster2.separation = function(x) {
          return arguments.length ? (separation = x, cluster2) : separation;
        };
        cluster2.size = function(x) {
          return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], cluster2) : nodeSize ? null : [dx, dy];
        };
        cluster2.nodeSize = function(x) {
          return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], cluster2) : nodeSize ? [dx, dy] : null;
        };
        return cluster2;
      }
      function count(node) {
        var sum = 0, children = node.children, i = children && children.length;
        if (!i)
          sum = 1;
        else
          while (--i >= 0)
            sum += children[i].value;
        node.value = sum;
      }
      function node_count() {
        return this.eachAfter(count);
      }
      function node_each(callback, that) {
        let index2 = -1;
        for (const node of this) {
          callback.call(that, node, ++index2, this);
        }
        return this;
      }
      function node_eachBefore(callback, that) {
        var node = this, nodes = [node], children, i, index2 = -1;
        while (node = nodes.pop()) {
          callback.call(that, node, ++index2, this);
          if (children = node.children) {
            for (i = children.length - 1; i >= 0; --i) {
              nodes.push(children[i]);
            }
          }
        }
        return this;
      }
      function node_eachAfter(callback, that) {
        var node = this, nodes = [node], next = [], children, i, n, index2 = -1;
        while (node = nodes.pop()) {
          next.push(node);
          if (children = node.children) {
            for (i = 0, n = children.length; i < n; ++i) {
              nodes.push(children[i]);
            }
          }
        }
        while (node = next.pop()) {
          callback.call(that, node, ++index2, this);
        }
        return this;
      }
      function node_find(callback, that) {
        let index2 = -1;
        for (const node of this) {
          if (callback.call(that, node, ++index2, this)) {
            return node;
          }
        }
      }
      function node_sum(value) {
        return this.eachAfter(function(node) {
          var sum = +value(node.data) || 0, children = node.children, i = children && children.length;
          while (--i >= 0)
            sum += children[i].value;
          node.value = sum;
        });
      }
      function node_sort(compare) {
        return this.eachBefore(function(node) {
          if (node.children) {
            node.children.sort(compare);
          }
        });
      }
      function node_path(end) {
        var start = this, ancestor = leastCommonAncestor(start, end), nodes = [start];
        while (start !== ancestor) {
          start = start.parent;
          nodes.push(start);
        }
        var k = nodes.length;
        while (end !== ancestor) {
          nodes.splice(k, 0, end);
          end = end.parent;
        }
        return nodes;
      }
      function leastCommonAncestor(a, b) {
        if (a === b)
          return a;
        var aNodes = a.ancestors(), bNodes = b.ancestors(), c = null;
        a = aNodes.pop();
        b = bNodes.pop();
        while (a === b) {
          c = a;
          a = aNodes.pop();
          b = bNodes.pop();
        }
        return c;
      }
      function node_ancestors() {
        var node = this, nodes = [node];
        while (node = node.parent) {
          nodes.push(node);
        }
        return nodes;
      }
      function node_descendants() {
        return Array.from(this);
      }
      function node_leaves() {
        var leaves = [];
        this.eachBefore(function(node) {
          if (!node.children) {
            leaves.push(node);
          }
        });
        return leaves;
      }
      function node_links() {
        var root = this, links = [];
        root.each(function(node) {
          if (node !== root) {
            links.push({source: node.parent, target: node});
          }
        });
        return links;
      }
      function* node_iterator() {
        var node = this, current, next = [node], children, i, n;
        do {
          current = next.reverse(), next = [];
          while (node = current.pop()) {
            yield node;
            if (children = node.children) {
              for (i = 0, n = children.length; i < n; ++i) {
                next.push(children[i]);
              }
            }
          }
        } while (next.length);
      }
      function hierarchy(data, children) {
        if (data instanceof Map) {
          data = [void 0, data];
          if (children === void 0)
            children = mapChildren;
        } else if (children === void 0) {
          children = objectChildren;
        }
        var root = new Node(data), node, nodes = [root], child, childs, i, n;
        while (node = nodes.pop()) {
          if ((childs = children(node.data)) && (n = (childs = Array.from(childs)).length)) {
            node.children = childs;
            for (i = n - 1; i >= 0; --i) {
              nodes.push(child = childs[i] = new Node(childs[i]));
              child.parent = node;
              child.depth = node.depth + 1;
            }
          }
        }
        return root.eachBefore(computeHeight);
      }
      function node_copy() {
        return hierarchy(this).eachBefore(copyData);
      }
      function objectChildren(d) {
        return d.children;
      }
      function mapChildren(d) {
        return Array.isArray(d) ? d[1] : null;
      }
      function copyData(node) {
        if (node.data.value !== void 0)
          node.value = node.data.value;
        node.data = node.data.data;
      }
      function computeHeight(node) {
        var height2 = 0;
        do
          node.height = height2;
        while ((node = node.parent) && node.height < ++height2);
      }
      function Node(data) {
        this.data = data;
        this.depth = this.height = 0;
        this.parent = null;
      }
      Node.prototype = hierarchy.prototype = {
        constructor: Node,
        count: node_count,
        each: node_each,
        eachAfter: node_eachAfter,
        eachBefore: node_eachBefore,
        find: node_find,
        sum: node_sum,
        sort: node_sort,
        path: node_path,
        ancestors: node_ancestors,
        descendants: node_descendants,
        leaves: node_leaves,
        links: node_links,
        copy: node_copy,
        [Symbol.iterator]: node_iterator
      };
      function array(x) {
        return typeof x === "object" && "length" in x ? x : Array.from(x);
      }
      function shuffle(array2) {
        var m = array2.length, t, i;
        while (m) {
          i = Math.random() * m-- | 0;
          t = array2[m];
          array2[m] = array2[i];
          array2[i] = t;
        }
        return array2;
      }
      function enclose(circles) {
        var i = 0, n = (circles = shuffle(Array.from(circles))).length, B = [], p, e;
        while (i < n) {
          p = circles[i];
          if (e && enclosesWeak(e, p))
            ++i;
          else
            e = encloseBasis(B = extendBasis(B, p)), i = 0;
        }
        return e;
      }
      function extendBasis(B, p) {
        var i, j;
        if (enclosesWeakAll(p, B))
          return [p];
        for (i = 0; i < B.length; ++i) {
          if (enclosesNot(p, B[i]) && enclosesWeakAll(encloseBasis2(B[i], p), B)) {
            return [B[i], p];
          }
        }
        for (i = 0; i < B.length - 1; ++i) {
          for (j = i + 1; j < B.length; ++j) {
            if (enclosesNot(encloseBasis2(B[i], B[j]), p) && enclosesNot(encloseBasis2(B[i], p), B[j]) && enclosesNot(encloseBasis2(B[j], p), B[i]) && enclosesWeakAll(encloseBasis3(B[i], B[j], p), B)) {
              return [B[i], B[j], p];
            }
          }
        }
        throw new Error();
      }
      function enclosesNot(a, b) {
        var dr = a.r - b.r, dx = b.x - a.x, dy = b.y - a.y;
        return dr < 0 || dr * dr < dx * dx + dy * dy;
      }
      function enclosesWeak(a, b) {
        var dr = a.r - b.r + Math.max(a.r, b.r, 1) * 1e-9, dx = b.x - a.x, dy = b.y - a.y;
        return dr > 0 && dr * dr > dx * dx + dy * dy;
      }
      function enclosesWeakAll(a, B) {
        for (var i = 0; i < B.length; ++i) {
          if (!enclosesWeak(a, B[i])) {
            return false;
          }
        }
        return true;
      }
      function encloseBasis(B) {
        switch (B.length) {
          case 1:
            return encloseBasis1(B[0]);
          case 2:
            return encloseBasis2(B[0], B[1]);
          case 3:
            return encloseBasis3(B[0], B[1], B[2]);
        }
      }
      function encloseBasis1(a) {
        return {
          x: a.x,
          y: a.y,
          r: a.r
        };
      }
      function encloseBasis2(a, b) {
        var x1 = a.x, y1 = a.y, r1 = a.r, x2 = b.x, y2 = b.y, r2 = b.r, x21 = x2 - x1, y21 = y2 - y1, r21 = r2 - r1, l = Math.sqrt(x21 * x21 + y21 * y21);
        return {
          x: (x1 + x2 + x21 / l * r21) / 2,
          y: (y1 + y2 + y21 / l * r21) / 2,
          r: (l + r1 + r2) / 2
        };
      }
      function encloseBasis3(a, b, c) {
        var x1 = a.x, y1 = a.y, r1 = a.r, x2 = b.x, y2 = b.y, r2 = b.r, x3 = c.x, y3 = c.y, r3 = c.r, a2 = x1 - x2, a3 = x1 - x3, b2 = y1 - y2, b3 = y1 - y3, c2 = r2 - r1, c3 = r3 - r1, d1 = x1 * x1 + y1 * y1 - r1 * r1, d2 = d1 - x2 * x2 - y2 * y2 + r2 * r2, d32 = d1 - x3 * x3 - y3 * y3 + r3 * r3, ab = a3 * b2 - a2 * b3, xa = (b2 * d32 - b3 * d2) / (ab * 2) - x1, xb = (b3 * c2 - b2 * c3) / ab, ya = (a3 * d2 - a2 * d32) / (ab * 2) - y1, yb = (a2 * c3 - a3 * c2) / ab, A = xb * xb + yb * yb - 1, B = 2 * (r1 + xa * xb + ya * yb), C = xa * xa + ya * ya - r1 * r1, r = -(A ? (B + Math.sqrt(B * B - 4 * A * C)) / (2 * A) : C / B);
        return {
          x: x1 + xa + xb * r,
          y: y1 + ya + yb * r,
          r
        };
      }
      function place(b, a, c) {
        var dx = b.x - a.x, x, a2, dy = b.y - a.y, y, b2, d2 = dx * dx + dy * dy;
        if (d2) {
          a2 = a.r + c.r, a2 *= a2;
          b2 = b.r + c.r, b2 *= b2;
          if (a2 > b2) {
            x = (d2 + b2 - a2) / (2 * d2);
            y = Math.sqrt(Math.max(0, b2 / d2 - x * x));
            c.x = b.x - x * dx - y * dy;
            c.y = b.y - x * dy + y * dx;
          } else {
            x = (d2 + a2 - b2) / (2 * d2);
            y = Math.sqrt(Math.max(0, a2 / d2 - x * x));
            c.x = a.x + x * dx - y * dy;
            c.y = a.y + x * dy + y * dx;
          }
        } else {
          c.x = a.x + c.r;
          c.y = a.y;
        }
      }
      function intersects(a, b) {
        var dr = a.r + b.r - 1e-6, dx = b.x - a.x, dy = b.y - a.y;
        return dr > 0 && dr * dr > dx * dx + dy * dy;
      }
      function score(node) {
        var a = node._, b = node.next._, ab = a.r + b.r, dx = (a.x * b.r + b.x * a.r) / ab, dy = (a.y * b.r + b.y * a.r) / ab;
        return dx * dx + dy * dy;
      }
      function Node$1(circle) {
        this._ = circle;
        this.next = null;
        this.previous = null;
      }
      function packEnclose(circles) {
        if (!(n = (circles = array(circles)).length))
          return 0;
        var a, b, c, n, aa, ca, i, j, k, sj, sk;
        a = circles[0], a.x = 0, a.y = 0;
        if (!(n > 1))
          return a.r;
        b = circles[1], a.x = -b.r, b.x = a.r, b.y = 0;
        if (!(n > 2))
          return a.r + b.r;
        place(b, a, c = circles[2]);
        a = new Node$1(a), b = new Node$1(b), c = new Node$1(c);
        a.next = c.previous = b;
        b.next = a.previous = c;
        c.next = b.previous = a;
        pack:
          for (i = 3; i < n; ++i) {
            place(a._, b._, c = circles[i]), c = new Node$1(c);
            j = b.next, k = a.previous, sj = b._.r, sk = a._.r;
            do {
              if (sj <= sk) {
                if (intersects(j._, c._)) {
                  b = j, a.next = b, b.previous = a, --i;
                  continue pack;
                }
                sj += j._.r, j = j.next;
              } else {
                if (intersects(k._, c._)) {
                  a = k, a.next = b, b.previous = a, --i;
                  continue pack;
                }
                sk += k._.r, k = k.previous;
              }
            } while (j !== k.next);
            c.previous = a, c.next = b, a.next = b.previous = b = c;
            aa = score(a);
            while ((c = c.next) !== b) {
              if ((ca = score(c)) < aa) {
                a = c, aa = ca;
              }
            }
            b = a.next;
          }
        a = [b._], c = b;
        while ((c = c.next) !== b)
          a.push(c._);
        c = enclose(a);
        for (i = 0; i < n; ++i)
          a = circles[i], a.x -= c.x, a.y -= c.y;
        return c.r;
      }
      function siblings(circles) {
        packEnclose(circles);
        return circles;
      }
      function optional(f) {
        return f == null ? null : required(f);
      }
      function required(f) {
        if (typeof f !== "function")
          throw new Error();
        return f;
      }
      function constantZero() {
        return 0;
      }
      function constant(x) {
        return function() {
          return x;
        };
      }
      function defaultRadius(d) {
        return Math.sqrt(d.value);
      }
      function index() {
        var radius = null, dx = 1, dy = 1, padding = constantZero;
        function pack(root) {
          root.x = dx / 2, root.y = dy / 2;
          if (radius) {
            root.eachBefore(radiusLeaf(radius)).eachAfter(packChildren(padding, 0.5)).eachBefore(translateChild(1));
          } else {
            root.eachBefore(radiusLeaf(defaultRadius)).eachAfter(packChildren(constantZero, 1)).eachAfter(packChildren(padding, root.r / Math.min(dx, dy))).eachBefore(translateChild(Math.min(dx, dy) / (2 * root.r)));
          }
          return root;
        }
        pack.radius = function(x) {
          return arguments.length ? (radius = optional(x), pack) : radius;
        };
        pack.size = function(x) {
          return arguments.length ? (dx = +x[0], dy = +x[1], pack) : [dx, dy];
        };
        pack.padding = function(x) {
          return arguments.length ? (padding = typeof x === "function" ? x : constant(+x), pack) : padding;
        };
        return pack;
      }
      function radiusLeaf(radius) {
        return function(node) {
          if (!node.children) {
            node.r = Math.max(0, +radius(node) || 0);
          }
        };
      }
      function packChildren(padding, k) {
        return function(node) {
          if (children = node.children) {
            var children, i, n = children.length, r = padding(node) * k || 0, e;
            if (r)
              for (i = 0; i < n; ++i)
                children[i].r += r;
            e = packEnclose(children);
            if (r)
              for (i = 0; i < n; ++i)
                children[i].r -= r;
            node.r = e + r;
          }
        };
      }
      function translateChild(k) {
        return function(node) {
          var parent = node.parent;
          node.r *= k;
          if (parent) {
            node.x = parent.x + k * node.x;
            node.y = parent.y + k * node.y;
          }
        };
      }
      function roundNode(node) {
        node.x0 = Math.round(node.x0);
        node.y0 = Math.round(node.y0);
        node.x1 = Math.round(node.x1);
        node.y1 = Math.round(node.y1);
      }
      function treemapDice(parent, x0, y0, x1, y1) {
        var nodes = parent.children, node, i = -1, n = nodes.length, k = parent.value && (x1 - x0) / parent.value;
        while (++i < n) {
          node = nodes[i], node.y0 = y0, node.y1 = y1;
          node.x0 = x0, node.x1 = x0 += node.value * k;
        }
      }
      function partition() {
        var dx = 1, dy = 1, padding = 0, round = false;
        function partition2(root) {
          var n = root.height + 1;
          root.x0 = root.y0 = padding;
          root.x1 = dx;
          root.y1 = dy / n;
          root.eachBefore(positionNode(dy, n));
          if (round)
            root.eachBefore(roundNode);
          return root;
        }
        function positionNode(dy2, n) {
          return function(node) {
            if (node.children) {
              treemapDice(node, node.x0, dy2 * (node.depth + 1) / n, node.x1, dy2 * (node.depth + 2) / n);
            }
            var x0 = node.x0, y0 = node.y0, x1 = node.x1 - padding, y1 = node.y1 - padding;
            if (x1 < x0)
              x0 = x1 = (x0 + x1) / 2;
            if (y1 < y0)
              y0 = y1 = (y0 + y1) / 2;
            node.x0 = x0;
            node.y0 = y0;
            node.x1 = x1;
            node.y1 = y1;
          };
        }
        partition2.round = function(x) {
          return arguments.length ? (round = !!x, partition2) : round;
        };
        partition2.size = function(x) {
          return arguments.length ? (dx = +x[0], dy = +x[1], partition2) : [dx, dy];
        };
        partition2.padding = function(x) {
          return arguments.length ? (padding = +x, partition2) : padding;
        };
        return partition2;
      }
      var preroot = {depth: -1}, ambiguous = {};
      function defaultId(d) {
        return d.id;
      }
      function defaultParentId(d) {
        return d.parentId;
      }
      function stratify() {
        var id = defaultId, parentId = defaultParentId;
        function stratify2(data) {
          var nodes = Array.from(data), n = nodes.length, d, i, root, parent, node, nodeId, nodeKey, nodeByKey = new Map();
          for (i = 0; i < n; ++i) {
            d = nodes[i], node = nodes[i] = new Node(d);
            if ((nodeId = id(d, i, data)) != null && (nodeId += "")) {
              nodeKey = node.id = nodeId;
              nodeByKey.set(nodeKey, nodeByKey.has(nodeKey) ? ambiguous : node);
            }
            if ((nodeId = parentId(d, i, data)) != null && (nodeId += "")) {
              node.parent = nodeId;
            }
          }
          for (i = 0; i < n; ++i) {
            node = nodes[i];
            if (nodeId = node.parent) {
              parent = nodeByKey.get(nodeId);
              if (!parent)
                throw new Error("missing: " + nodeId);
              if (parent === ambiguous)
                throw new Error("ambiguous: " + nodeId);
              if (parent.children)
                parent.children.push(node);
              else
                parent.children = [node];
              node.parent = parent;
            } else {
              if (root)
                throw new Error("multiple roots");
              root = node;
            }
          }
          if (!root)
            throw new Error("no root");
          root.parent = preroot;
          root.eachBefore(function(node2) {
            node2.depth = node2.parent.depth + 1;
            --n;
          }).eachBefore(computeHeight);
          root.parent = null;
          if (n > 0)
            throw new Error("cycle");
          return root;
        }
        stratify2.id = function(x) {
          return arguments.length ? (id = required(x), stratify2) : id;
        };
        stratify2.parentId = function(x) {
          return arguments.length ? (parentId = required(x), stratify2) : parentId;
        };
        return stratify2;
      }
      function defaultSeparation$1(a, b) {
        return a.parent === b.parent ? 1 : 2;
      }
      function nextLeft(v) {
        var children = v.children;
        return children ? children[0] : v.t;
      }
      function nextRight(v) {
        var children = v.children;
        return children ? children[children.length - 1] : v.t;
      }
      function moveSubtree(wm, wp, shift) {
        var change = shift / (wp.i - wm.i);
        wp.c -= change;
        wp.s += shift;
        wm.c += change;
        wp.z += shift;
        wp.m += shift;
      }
      function executeShifts(v) {
        var shift = 0, change = 0, children = v.children, i = children.length, w;
        while (--i >= 0) {
          w = children[i];
          w.z += shift;
          w.m += shift;
          shift += w.s + (change += w.c);
        }
      }
      function nextAncestor(vim, v, ancestor) {
        return vim.a.parent === v.parent ? vim.a : ancestor;
      }
      function TreeNode(node, i) {
        this._ = node;
        this.parent = null;
        this.children = null;
        this.A = null;
        this.a = this;
        this.z = 0;
        this.m = 0;
        this.c = 0;
        this.s = 0;
        this.t = null;
        this.i = i;
      }
      TreeNode.prototype = Object.create(Node.prototype);
      function treeRoot(root) {
        var tree2 = new TreeNode(root, 0), node, nodes = [tree2], child, children, i, n;
        while (node = nodes.pop()) {
          if (children = node._.children) {
            node.children = new Array(n = children.length);
            for (i = n - 1; i >= 0; --i) {
              nodes.push(child = node.children[i] = new TreeNode(children[i], i));
              child.parent = node;
            }
          }
        }
        (tree2.parent = new TreeNode(null, 0)).children = [tree2];
        return tree2;
      }
      function tree() {
        var separation = defaultSeparation$1, dx = 1, dy = 1, nodeSize = null;
        function tree2(root) {
          var t = treeRoot(root);
          t.eachAfter(firstWalk), t.parent.m = -t.z;
          t.eachBefore(secondWalk);
          if (nodeSize)
            root.eachBefore(sizeNode);
          else {
            var left = root, right = root, bottom = root;
            root.eachBefore(function(node) {
              if (node.x < left.x)
                left = node;
              if (node.x > right.x)
                right = node;
              if (node.depth > bottom.depth)
                bottom = node;
            });
            var s = left === right ? 1 : separation(left, right) / 2, tx = s - left.x, kx = dx / (right.x + s + tx), ky = dy / (bottom.depth || 1);
            root.eachBefore(function(node) {
              node.x = (node.x + tx) * kx;
              node.y = node.depth * ky;
            });
          }
          return root;
        }
        function firstWalk(v) {
          var children = v.children, siblings2 = v.parent.children, w = v.i ? siblings2[v.i - 1] : null;
          if (children) {
            executeShifts(v);
            var midpoint = (children[0].z + children[children.length - 1].z) / 2;
            if (w) {
              v.z = w.z + separation(v._, w._);
              v.m = v.z - midpoint;
            } else {
              v.z = midpoint;
            }
          } else if (w) {
            v.z = w.z + separation(v._, w._);
          }
          v.parent.A = apportion(v, w, v.parent.A || siblings2[0]);
        }
        function secondWalk(v) {
          v._.x = v.z + v.parent.m;
          v.m += v.parent.m;
        }
        function apportion(v, w, ancestor) {
          if (w) {
            var vip = v, vop = v, vim = w, vom = vip.parent.children[0], sip = vip.m, sop = vop.m, sim = vim.m, som = vom.m, shift;
            while (vim = nextRight(vim), vip = nextLeft(vip), vim && vip) {
              vom = nextLeft(vom);
              vop = nextRight(vop);
              vop.a = v;
              shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
              if (shift > 0) {
                moveSubtree(nextAncestor(vim, v, ancestor), v, shift);
                sip += shift;
                sop += shift;
              }
              sim += vim.m;
              sip += vip.m;
              som += vom.m;
              sop += vop.m;
            }
            if (vim && !nextRight(vop)) {
              vop.t = vim;
              vop.m += sim - sop;
            }
            if (vip && !nextLeft(vom)) {
              vom.t = vip;
              vom.m += sip - som;
              ancestor = v;
            }
          }
          return ancestor;
        }
        function sizeNode(node) {
          node.x *= dx;
          node.y = node.depth * dy;
        }
        tree2.separation = function(x) {
          return arguments.length ? (separation = x, tree2) : separation;
        };
        tree2.size = function(x) {
          return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], tree2) : nodeSize ? null : [dx, dy];
        };
        tree2.nodeSize = function(x) {
          return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], tree2) : nodeSize ? [dx, dy] : null;
        };
        return tree2;
      }
      function treemapSlice(parent, x0, y0, x1, y1) {
        var nodes = parent.children, node, i = -1, n = nodes.length, k = parent.value && (y1 - y0) / parent.value;
        while (++i < n) {
          node = nodes[i], node.x0 = x0, node.x1 = x1;
          node.y0 = y0, node.y1 = y0 += node.value * k;
        }
      }
      var phi = (1 + Math.sqrt(5)) / 2;
      function squarifyRatio(ratio, parent, x0, y0, x1, y1) {
        var rows = [], nodes = parent.children, row, nodeValue, i0 = 0, i1 = 0, n = nodes.length, dx, dy, value = parent.value, sumValue, minValue, maxValue, newRatio, minRatio, alpha, beta;
        while (i0 < n) {
          dx = x1 - x0, dy = y1 - y0;
          do
            sumValue = nodes[i1++].value;
          while (!sumValue && i1 < n);
          minValue = maxValue = sumValue;
          alpha = Math.max(dy / dx, dx / dy) / (value * ratio);
          beta = sumValue * sumValue * alpha;
          minRatio = Math.max(maxValue / beta, beta / minValue);
          for (; i1 < n; ++i1) {
            sumValue += nodeValue = nodes[i1].value;
            if (nodeValue < minValue)
              minValue = nodeValue;
            if (nodeValue > maxValue)
              maxValue = nodeValue;
            beta = sumValue * sumValue * alpha;
            newRatio = Math.max(maxValue / beta, beta / minValue);
            if (newRatio > minRatio) {
              sumValue -= nodeValue;
              break;
            }
            minRatio = newRatio;
          }
          rows.push(row = {value: sumValue, dice: dx < dy, children: nodes.slice(i0, i1)});
          if (row.dice)
            treemapDice(row, x0, y0, x1, value ? y0 += dy * sumValue / value : y1);
          else
            treemapSlice(row, x0, y0, value ? x0 += dx * sumValue / value : x1, y1);
          value -= sumValue, i0 = i1;
        }
        return rows;
      }
      var squarify = function custom(ratio) {
        function squarify2(parent, x0, y0, x1, y1) {
          squarifyRatio(ratio, parent, x0, y0, x1, y1);
        }
        squarify2.ratio = function(x) {
          return custom((x = +x) > 1 ? x : 1);
        };
        return squarify2;
      }(phi);
      function index$1() {
        var tile = squarify, round = false, dx = 1, dy = 1, paddingStack = [0], paddingInner = constantZero, paddingTop = constantZero, paddingRight = constantZero, paddingBottom = constantZero, paddingLeft = constantZero;
        function treemap(root) {
          root.x0 = root.y0 = 0;
          root.x1 = dx;
          root.y1 = dy;
          root.eachBefore(positionNode);
          paddingStack = [0];
          if (round)
            root.eachBefore(roundNode);
          return root;
        }
        function positionNode(node) {
          var p = paddingStack[node.depth], x0 = node.x0 + p, y0 = node.y0 + p, x1 = node.x1 - p, y1 = node.y1 - p;
          if (x1 < x0)
            x0 = x1 = (x0 + x1) / 2;
          if (y1 < y0)
            y0 = y1 = (y0 + y1) / 2;
          node.x0 = x0;
          node.y0 = y0;
          node.x1 = x1;
          node.y1 = y1;
          if (node.children) {
            p = paddingStack[node.depth + 1] = paddingInner(node) / 2;
            x0 += paddingLeft(node) - p;
            y0 += paddingTop(node) - p;
            x1 -= paddingRight(node) - p;
            y1 -= paddingBottom(node) - p;
            if (x1 < x0)
              x0 = x1 = (x0 + x1) / 2;
            if (y1 < y0)
              y0 = y1 = (y0 + y1) / 2;
            tile(node, x0, y0, x1, y1);
          }
        }
        treemap.round = function(x) {
          return arguments.length ? (round = !!x, treemap) : round;
        };
        treemap.size = function(x) {
          return arguments.length ? (dx = +x[0], dy = +x[1], treemap) : [dx, dy];
        };
        treemap.tile = function(x) {
          return arguments.length ? (tile = required(x), treemap) : tile;
        };
        treemap.padding = function(x) {
          return arguments.length ? treemap.paddingInner(x).paddingOuter(x) : treemap.paddingInner();
        };
        treemap.paddingInner = function(x) {
          return arguments.length ? (paddingInner = typeof x === "function" ? x : constant(+x), treemap) : paddingInner;
        };
        treemap.paddingOuter = function(x) {
          return arguments.length ? treemap.paddingTop(x).paddingRight(x).paddingBottom(x).paddingLeft(x) : treemap.paddingTop();
        };
        treemap.paddingTop = function(x) {
          return arguments.length ? (paddingTop = typeof x === "function" ? x : constant(+x), treemap) : paddingTop;
        };
        treemap.paddingRight = function(x) {
          return arguments.length ? (paddingRight = typeof x === "function" ? x : constant(+x), treemap) : paddingRight;
        };
        treemap.paddingBottom = function(x) {
          return arguments.length ? (paddingBottom = typeof x === "function" ? x : constant(+x), treemap) : paddingBottom;
        };
        treemap.paddingLeft = function(x) {
          return arguments.length ? (paddingLeft = typeof x === "function" ? x : constant(+x), treemap) : paddingLeft;
        };
        return treemap;
      }
      function binary(parent, x0, y0, x1, y1) {
        var nodes = parent.children, i, n = nodes.length, sum, sums = new Array(n + 1);
        for (sums[0] = sum = i = 0; i < n; ++i) {
          sums[i + 1] = sum += nodes[i].value;
        }
        partition2(0, n, parent.value, x0, y0, x1, y1);
        function partition2(i2, j, value, x02, y02, x12, y12) {
          if (i2 >= j - 1) {
            var node = nodes[i2];
            node.x0 = x02, node.y0 = y02;
            node.x1 = x12, node.y1 = y12;
            return;
          }
          var valueOffset = sums[i2], valueTarget = value / 2 + valueOffset, k = i2 + 1, hi = j - 1;
          while (k < hi) {
            var mid = k + hi >>> 1;
            if (sums[mid] < valueTarget)
              k = mid + 1;
            else
              hi = mid;
          }
          if (valueTarget - sums[k - 1] < sums[k] - valueTarget && i2 + 1 < k)
            --k;
          var valueLeft = sums[k] - valueOffset, valueRight = value - valueLeft;
          if (x12 - x02 > y12 - y02) {
            var xk = value ? (x02 * valueRight + x12 * valueLeft) / value : x12;
            partition2(i2, k, valueLeft, x02, y02, xk, y12);
            partition2(k, j, valueRight, xk, y02, x12, y12);
          } else {
            var yk = value ? (y02 * valueRight + y12 * valueLeft) / value : y12;
            partition2(i2, k, valueLeft, x02, y02, x12, yk);
            partition2(k, j, valueRight, x02, yk, x12, y12);
          }
        }
      }
      function sliceDice(parent, x0, y0, x1, y1) {
        (parent.depth & 1 ? treemapSlice : treemapDice)(parent, x0, y0, x1, y1);
      }
      var resquarify = function custom(ratio) {
        function resquarify2(parent, x0, y0, x1, y1) {
          if ((rows = parent._squarify) && rows.ratio === ratio) {
            var rows, row, nodes, i, j = -1, n, m = rows.length, value = parent.value;
            while (++j < m) {
              row = rows[j], nodes = row.children;
              for (i = row.value = 0, n = nodes.length; i < n; ++i)
                row.value += nodes[i].value;
              if (row.dice)
                treemapDice(row, x0, y0, x1, value ? y0 += (y1 - y0) * row.value / value : y1);
              else
                treemapSlice(row, x0, y0, value ? x0 += (x1 - x0) * row.value / value : x1, y1);
              value -= row.value;
            }
          } else {
            parent._squarify = rows = squarifyRatio(ratio, parent, x0, y0, x1, y1);
            rows.ratio = ratio;
          }
        }
        resquarify2.ratio = function(x) {
          return custom((x = +x) > 1 ? x : 1);
        };
        return resquarify2;
      }(phi);
      exports2.cluster = cluster;
      exports2.hierarchy = hierarchy;
      exports2.pack = index;
      exports2.packEnclose = enclose;
      exports2.packSiblings = siblings;
      exports2.partition = partition;
      exports2.stratify = stratify;
      exports2.tree = tree;
      exports2.treemap = index$1;
      exports2.treemapBinary = binary;
      exports2.treemapDice = treemapDice;
      exports2.treemapResquarify = resquarify;
      exports2.treemapSlice = treemapSlice;
      exports2.treemapSliceDice = sliceDice;
      exports2.treemapSquarify = squarify;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-polygon/dist/d3-polygon.js
  var require_d3_polygon = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      function area(polygon) {
        var i = -1, n = polygon.length, a, b = polygon[n - 1], area2 = 0;
        while (++i < n) {
          a = b;
          b = polygon[i];
          area2 += a[1] * b[0] - a[0] * b[1];
        }
        return area2 / 2;
      }
      function centroid(polygon) {
        var i = -1, n = polygon.length, x = 0, y = 0, a, b = polygon[n - 1], c, k = 0;
        while (++i < n) {
          a = b;
          b = polygon[i];
          k += c = a[0] * b[1] - b[0] * a[1];
          x += (a[0] + b[0]) * c;
          y += (a[1] + b[1]) * c;
        }
        return k *= 3, [x / k, y / k];
      }
      function cross(a, b, c) {
        return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
      }
      function lexicographicOrder(a, b) {
        return a[0] - b[0] || a[1] - b[1];
      }
      function computeUpperHullIndexes(points) {
        const n = points.length, indexes = [0, 1];
        let size = 2, i;
        for (i = 2; i < n; ++i) {
          while (size > 1 && cross(points[indexes[size - 2]], points[indexes[size - 1]], points[i]) <= 0)
            --size;
          indexes[size++] = i;
        }
        return indexes.slice(0, size);
      }
      function hull(points) {
        if ((n = points.length) < 3)
          return null;
        var i, n, sortedPoints = new Array(n), flippedPoints = new Array(n);
        for (i = 0; i < n; ++i)
          sortedPoints[i] = [+points[i][0], +points[i][1], i];
        sortedPoints.sort(lexicographicOrder);
        for (i = 0; i < n; ++i)
          flippedPoints[i] = [sortedPoints[i][0], -sortedPoints[i][1]];
        var upperIndexes = computeUpperHullIndexes(sortedPoints), lowerIndexes = computeUpperHullIndexes(flippedPoints);
        var skipLeft = lowerIndexes[0] === upperIndexes[0], skipRight = lowerIndexes[lowerIndexes.length - 1] === upperIndexes[upperIndexes.length - 1], hull2 = [];
        for (i = upperIndexes.length - 1; i >= 0; --i)
          hull2.push(points[sortedPoints[upperIndexes[i]][2]]);
        for (i = +skipLeft; i < lowerIndexes.length - skipRight; ++i)
          hull2.push(points[sortedPoints[lowerIndexes[i]][2]]);
        return hull2;
      }
      function contains(polygon, point) {
        var n = polygon.length, p = polygon[n - 1], x = point[0], y = point[1], x0 = p[0], y0 = p[1], x1, y1, inside = false;
        for (var i = 0; i < n; ++i) {
          p = polygon[i], x1 = p[0], y1 = p[1];
          if (y1 > y !== y0 > y && x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)
            inside = !inside;
          x0 = x1, y0 = y1;
        }
        return inside;
      }
      function length(polygon) {
        var i = -1, n = polygon.length, b = polygon[n - 1], xa, ya, xb = b[0], yb = b[1], perimeter = 0;
        while (++i < n) {
          xa = xb;
          ya = yb;
          b = polygon[i];
          xb = b[0];
          yb = b[1];
          xa -= xb;
          ya -= yb;
          perimeter += Math.hypot(xa, ya);
        }
        return perimeter;
      }
      exports2.polygonArea = area;
      exports2.polygonCentroid = centroid;
      exports2.polygonContains = contains;
      exports2.polygonHull = hull;
      exports2.polygonLength = length;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-random/dist/d3-random.js
  var require_d3_random = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.d3 = global.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      var defaultSource = Math.random;
      var uniform = function sourceRandomUniform(source) {
        function randomUniform(min, max) {
          min = min == null ? 0 : +min;
          max = max == null ? 1 : +max;
          if (arguments.length === 1)
            max = min, min = 0;
          else
            max -= min;
          return function() {
            return source() * max + min;
          };
        }
        randomUniform.source = sourceRandomUniform;
        return randomUniform;
      }(defaultSource);
      var int = function sourceRandomInt(source) {
        function randomInt(min, max) {
          if (arguments.length < 2)
            max = min, min = 0;
          min = Math.floor(min);
          max = Math.floor(max) - min;
          return function() {
            return Math.floor(source() * max + min);
          };
        }
        randomInt.source = sourceRandomInt;
        return randomInt;
      }(defaultSource);
      var normal = function sourceRandomNormal(source) {
        function randomNormal(mu, sigma) {
          var x, r;
          mu = mu == null ? 0 : +mu;
          sigma = sigma == null ? 1 : +sigma;
          return function() {
            var y;
            if (x != null)
              y = x, x = null;
            else
              do {
                x = source() * 2 - 1;
                y = source() * 2 - 1;
                r = x * x + y * y;
              } while (!r || r > 1);
            return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
          };
        }
        randomNormal.source = sourceRandomNormal;
        return randomNormal;
      }(defaultSource);
      var logNormal = function sourceRandomLogNormal(source) {
        var N = normal.source(source);
        function randomLogNormal() {
          var randomNormal = N.apply(this, arguments);
          return function() {
            return Math.exp(randomNormal());
          };
        }
        randomLogNormal.source = sourceRandomLogNormal;
        return randomLogNormal;
      }(defaultSource);
      var irwinHall = function sourceRandomIrwinHall(source) {
        function randomIrwinHall(n) {
          if ((n = +n) <= 0)
            return () => 0;
          return function() {
            for (var sum = 0, i = n; i > 1; --i)
              sum += source();
            return sum + i * source();
          };
        }
        randomIrwinHall.source = sourceRandomIrwinHall;
        return randomIrwinHall;
      }(defaultSource);
      var bates = function sourceRandomBates(source) {
        var I = irwinHall.source(source);
        function randomBates(n) {
          if ((n = +n) === 0)
            return source;
          var randomIrwinHall = I(n);
          return function() {
            return randomIrwinHall() / n;
          };
        }
        randomBates.source = sourceRandomBates;
        return randomBates;
      }(defaultSource);
      var exponential = function sourceRandomExponential(source) {
        function randomExponential(lambda) {
          return function() {
            return -Math.log1p(-source()) / lambda;
          };
        }
        randomExponential.source = sourceRandomExponential;
        return randomExponential;
      }(defaultSource);
      var pareto = function sourceRandomPareto(source) {
        function randomPareto(alpha) {
          if ((alpha = +alpha) < 0)
            throw new RangeError("invalid alpha");
          alpha = 1 / -alpha;
          return function() {
            return Math.pow(1 - source(), alpha);
          };
        }
        randomPareto.source = sourceRandomPareto;
        return randomPareto;
      }(defaultSource);
      var bernoulli = function sourceRandomBernoulli(source) {
        function randomBernoulli(p) {
          if ((p = +p) < 0 || p > 1)
            throw new RangeError("invalid p");
          return function() {
            return Math.floor(source() + p);
          };
        }
        randomBernoulli.source = sourceRandomBernoulli;
        return randomBernoulli;
      }(defaultSource);
      var geometric = function sourceRandomGeometric(source) {
        function randomGeometric(p) {
          if ((p = +p) < 0 || p > 1)
            throw new RangeError("invalid p");
          if (p === 0)
            return () => Infinity;
          if (p === 1)
            return () => 1;
          p = Math.log1p(-p);
          return function() {
            return 1 + Math.floor(Math.log1p(-source()) / p);
          };
        }
        randomGeometric.source = sourceRandomGeometric;
        return randomGeometric;
      }(defaultSource);
      var gamma = function sourceRandomGamma(source) {
        var randomNormal = normal.source(source)();
        function randomGamma(k, theta) {
          if ((k = +k) < 0)
            throw new RangeError("invalid k");
          if (k === 0)
            return () => 0;
          theta = theta == null ? 1 : +theta;
          if (k === 1)
            return () => -Math.log1p(-source()) * theta;
          var d = (k < 1 ? k + 1 : k) - 1 / 3, c = 1 / (3 * Math.sqrt(d)), multiplier = k < 1 ? () => Math.pow(source(), 1 / k) : () => 1;
          return function() {
            do {
              do {
                var x = randomNormal(), v = 1 + c * x;
              } while (v <= 0);
              v *= v * v;
              var u = 1 - source();
            } while (u >= 1 - 0.0331 * x * x * x * x && Math.log(u) >= 0.5 * x * x + d * (1 - v + Math.log(v)));
            return d * v * multiplier() * theta;
          };
        }
        randomGamma.source = sourceRandomGamma;
        return randomGamma;
      }(defaultSource);
      var beta = function sourceRandomBeta(source) {
        var G = gamma.source(source);
        function randomBeta(alpha, beta2) {
          var X = G(alpha), Y = G(beta2);
          return function() {
            var x = X();
            return x === 0 ? 0 : x / (x + Y());
          };
        }
        randomBeta.source = sourceRandomBeta;
        return randomBeta;
      }(defaultSource);
      var binomial = function sourceRandomBinomial(source) {
        var G = geometric.source(source), B = beta.source(source);
        function randomBinomial(n, p) {
          n = +n;
          if ((p = +p) >= 1)
            return () => n;
          if (p <= 0)
            return () => 0;
          return function() {
            var acc = 0, nn = n, pp = p;
            while (nn * pp > 16 && nn * (1 - pp) > 16) {
              var i = Math.floor((nn + 1) * pp), y = B(i, nn - i + 1)();
              if (y <= pp) {
                acc += i;
                nn -= i;
                pp = (pp - y) / (1 - y);
              } else {
                nn = i - 1;
                pp /= y;
              }
            }
            var sign = pp < 0.5, pFinal = sign ? pp : 1 - pp, g = G(pFinal);
            for (var s = g(), k = 0; s <= nn; ++k)
              s += g();
            return acc + (sign ? k : nn - k);
          };
        }
        randomBinomial.source = sourceRandomBinomial;
        return randomBinomial;
      }(defaultSource);
      var weibull = function sourceRandomWeibull(source) {
        function randomWeibull(k, a, b) {
          var outerFunc;
          if ((k = +k) === 0) {
            outerFunc = (x) => -Math.log(x);
          } else {
            k = 1 / k;
            outerFunc = (x) => Math.pow(x, k);
          }
          a = a == null ? 0 : +a;
          b = b == null ? 1 : +b;
          return function() {
            return a + b * outerFunc(-Math.log1p(-source()));
          };
        }
        randomWeibull.source = sourceRandomWeibull;
        return randomWeibull;
      }(defaultSource);
      var cauchy = function sourceRandomCauchy(source) {
        function randomCauchy(a, b) {
          a = a == null ? 0 : +a;
          b = b == null ? 1 : +b;
          return function() {
            return a + b * Math.tan(Math.PI * source());
          };
        }
        randomCauchy.source = sourceRandomCauchy;
        return randomCauchy;
      }(defaultSource);
      var logistic = function sourceRandomLogistic(source) {
        function randomLogistic(a, b) {
          a = a == null ? 0 : +a;
          b = b == null ? 1 : +b;
          return function() {
            var u = source();
            return a + b * Math.log(u / (1 - u));
          };
        }
        randomLogistic.source = sourceRandomLogistic;
        return randomLogistic;
      }(defaultSource);
      var poisson = function sourceRandomPoisson(source) {
        var G = gamma.source(source), B = binomial.source(source);
        function randomPoisson(lambda) {
          return function() {
            var acc = 0, l = lambda;
            while (l > 16) {
              var n = Math.floor(0.875 * l), t = G(n)();
              if (t > l)
                return acc + B(n - 1, l / t)();
              acc += n;
              l -= t;
            }
            for (var s = -Math.log1p(-source()), k = 0; s <= l; ++k)
              s -= Math.log1p(-source());
            return acc + k;
          };
        }
        randomPoisson.source = sourceRandomPoisson;
        return randomPoisson;
      }(defaultSource);
      const mul = 1664525;
      const inc = 1013904223;
      const eps = 1 / 4294967296;
      function lcg(seed = Math.random()) {
        let state = (0 <= seed && seed < 1 ? seed / eps : Math.abs(seed)) | 0;
        return () => (state = mul * state + inc | 0, eps * (state >>> 0));
      }
      exports2.randomBates = bates;
      exports2.randomBernoulli = bernoulli;
      exports2.randomBeta = beta;
      exports2.randomBinomial = binomial;
      exports2.randomCauchy = cauchy;
      exports2.randomExponential = exponential;
      exports2.randomGamma = gamma;
      exports2.randomGeometric = geometric;
      exports2.randomInt = int;
      exports2.randomIrwinHall = irwinHall;
      exports2.randomLcg = lcg;
      exports2.randomLogNormal = logNormal;
      exports2.randomLogistic = logistic;
      exports2.randomNormal = normal;
      exports2.randomPareto = pareto;
      exports2.randomPoisson = poisson;
      exports2.randomUniform = uniform;
      exports2.randomWeibull = weibull;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-time/dist/d3-time.js
  var require_d3_time = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      var t0 = new Date(), t1 = new Date();
      function newInterval(floori, offseti, count, field) {
        function interval(date) {
          return floori(date = arguments.length === 0 ? new Date() : new Date(+date)), date;
        }
        interval.floor = function(date) {
          return floori(date = new Date(+date)), date;
        };
        interval.ceil = function(date) {
          return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
        };
        interval.round = function(date) {
          var d0 = interval(date), d1 = interval.ceil(date);
          return date - d0 < d1 - date ? d0 : d1;
        };
        interval.offset = function(date, step) {
          return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
        };
        interval.range = function(start, stop, step) {
          var range = [], previous;
          start = interval.ceil(start);
          step = step == null ? 1 : Math.floor(step);
          if (!(start < stop) || !(step > 0))
            return range;
          do
            range.push(previous = new Date(+start)), offseti(start, step), floori(start);
          while (previous < start && start < stop);
          return range;
        };
        interval.filter = function(test) {
          return newInterval(function(date) {
            if (date >= date)
              while (floori(date), !test(date))
                date.setTime(date - 1);
          }, function(date, step) {
            if (date >= date) {
              if (step < 0)
                while (++step <= 0) {
                  while (offseti(date, -1), !test(date)) {
                  }
                }
              else
                while (--step >= 0) {
                  while (offseti(date, 1), !test(date)) {
                  }
                }
            }
          });
        };
        if (count) {
          interval.count = function(start, end) {
            t0.setTime(+start), t1.setTime(+end);
            floori(t0), floori(t1);
            return Math.floor(count(t0, t1));
          };
          interval.every = function(step) {
            step = Math.floor(step);
            return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function(d) {
              return field(d) % step === 0;
            } : function(d) {
              return interval.count(0, d) % step === 0;
            });
          };
        }
        return interval;
      }
      var millisecond = newInterval(function() {
      }, function(date, step) {
        date.setTime(+date + step);
      }, function(start, end) {
        return end - start;
      });
      millisecond.every = function(k) {
        k = Math.floor(k);
        if (!isFinite(k) || !(k > 0))
          return null;
        if (!(k > 1))
          return millisecond;
        return newInterval(function(date) {
          date.setTime(Math.floor(date / k) * k);
        }, function(date, step) {
          date.setTime(+date + step * k);
        }, function(start, end) {
          return (end - start) / k;
        });
      };
      var milliseconds = millisecond.range;
      var durationSecond = 1e3;
      var durationMinute = 6e4;
      var durationHour = 36e5;
      var durationDay = 864e5;
      var durationWeek = 6048e5;
      var second = newInterval(function(date) {
        date.setTime(date - date.getMilliseconds());
      }, function(date, step) {
        date.setTime(+date + step * durationSecond);
      }, function(start, end) {
        return (end - start) / durationSecond;
      }, function(date) {
        return date.getUTCSeconds();
      });
      var seconds = second.range;
      var minute = newInterval(function(date) {
        date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
      }, function(date, step) {
        date.setTime(+date + step * durationMinute);
      }, function(start, end) {
        return (end - start) / durationMinute;
      }, function(date) {
        return date.getMinutes();
      });
      var minutes = minute.range;
      var hour = newInterval(function(date) {
        date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
      }, function(date, step) {
        date.setTime(+date + step * durationHour);
      }, function(start, end) {
        return (end - start) / durationHour;
      }, function(date) {
        return date.getHours();
      });
      var hours = hour.range;
      var day = newInterval((date) => date.setHours(0, 0, 0, 0), (date, step) => date.setDate(date.getDate() + step), (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay, (date) => date.getDate() - 1);
      var days = day.range;
      function weekday(i) {
        return newInterval(function(date) {
          date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
          date.setHours(0, 0, 0, 0);
        }, function(date, step) {
          date.setDate(date.getDate() + step * 7);
        }, function(start, end) {
          return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
        });
      }
      var sunday = weekday(0);
      var monday = weekday(1);
      var tuesday = weekday(2);
      var wednesday = weekday(3);
      var thursday = weekday(4);
      var friday = weekday(5);
      var saturday = weekday(6);
      var sundays = sunday.range;
      var mondays = monday.range;
      var tuesdays = tuesday.range;
      var wednesdays = wednesday.range;
      var thursdays = thursday.range;
      var fridays = friday.range;
      var saturdays = saturday.range;
      var month = newInterval(function(date) {
        date.setDate(1);
        date.setHours(0, 0, 0, 0);
      }, function(date, step) {
        date.setMonth(date.getMonth() + step);
      }, function(start, end) {
        return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
      }, function(date) {
        return date.getMonth();
      });
      var months = month.range;
      var year = newInterval(function(date) {
        date.setMonth(0, 1);
        date.setHours(0, 0, 0, 0);
      }, function(date, step) {
        date.setFullYear(date.getFullYear() + step);
      }, function(start, end) {
        return end.getFullYear() - start.getFullYear();
      }, function(date) {
        return date.getFullYear();
      });
      year.every = function(k) {
        return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
          date.setFullYear(Math.floor(date.getFullYear() / k) * k);
          date.setMonth(0, 1);
          date.setHours(0, 0, 0, 0);
        }, function(date, step) {
          date.setFullYear(date.getFullYear() + step * k);
        });
      };
      var years = year.range;
      var utcMinute = newInterval(function(date) {
        date.setUTCSeconds(0, 0);
      }, function(date, step) {
        date.setTime(+date + step * durationMinute);
      }, function(start, end) {
        return (end - start) / durationMinute;
      }, function(date) {
        return date.getUTCMinutes();
      });
      var utcMinutes = utcMinute.range;
      var utcHour = newInterval(function(date) {
        date.setUTCMinutes(0, 0, 0);
      }, function(date, step) {
        date.setTime(+date + step * durationHour);
      }, function(start, end) {
        return (end - start) / durationHour;
      }, function(date) {
        return date.getUTCHours();
      });
      var utcHours = utcHour.range;
      var utcDay = newInterval(function(date) {
        date.setUTCHours(0, 0, 0, 0);
      }, function(date, step) {
        date.setUTCDate(date.getUTCDate() + step);
      }, function(start, end) {
        return (end - start) / durationDay;
      }, function(date) {
        return date.getUTCDate() - 1;
      });
      var utcDays = utcDay.range;
      function utcWeekday(i) {
        return newInterval(function(date) {
          date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
          date.setUTCHours(0, 0, 0, 0);
        }, function(date, step) {
          date.setUTCDate(date.getUTCDate() + step * 7);
        }, function(start, end) {
          return (end - start) / durationWeek;
        });
      }
      var utcSunday = utcWeekday(0);
      var utcMonday = utcWeekday(1);
      var utcTuesday = utcWeekday(2);
      var utcWednesday = utcWeekday(3);
      var utcThursday = utcWeekday(4);
      var utcFriday = utcWeekday(5);
      var utcSaturday = utcWeekday(6);
      var utcSundays = utcSunday.range;
      var utcMondays = utcMonday.range;
      var utcTuesdays = utcTuesday.range;
      var utcWednesdays = utcWednesday.range;
      var utcThursdays = utcThursday.range;
      var utcFridays = utcFriday.range;
      var utcSaturdays = utcSaturday.range;
      var utcMonth = newInterval(function(date) {
        date.setUTCDate(1);
        date.setUTCHours(0, 0, 0, 0);
      }, function(date, step) {
        date.setUTCMonth(date.getUTCMonth() + step);
      }, function(start, end) {
        return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
      }, function(date) {
        return date.getUTCMonth();
      });
      var utcMonths = utcMonth.range;
      var utcYear = newInterval(function(date) {
        date.setUTCMonth(0, 1);
        date.setUTCHours(0, 0, 0, 0);
      }, function(date, step) {
        date.setUTCFullYear(date.getUTCFullYear() + step);
      }, function(start, end) {
        return end.getUTCFullYear() - start.getUTCFullYear();
      }, function(date) {
        return date.getUTCFullYear();
      });
      utcYear.every = function(k) {
        return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
          date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
          date.setUTCMonth(0, 1);
          date.setUTCHours(0, 0, 0, 0);
        }, function(date, step) {
          date.setUTCFullYear(date.getUTCFullYear() + step * k);
        });
      };
      var utcYears = utcYear.range;
      exports2.timeDay = day;
      exports2.timeDays = days;
      exports2.timeFriday = friday;
      exports2.timeFridays = fridays;
      exports2.timeHour = hour;
      exports2.timeHours = hours;
      exports2.timeInterval = newInterval;
      exports2.timeMillisecond = millisecond;
      exports2.timeMilliseconds = milliseconds;
      exports2.timeMinute = minute;
      exports2.timeMinutes = minutes;
      exports2.timeMonday = monday;
      exports2.timeMondays = mondays;
      exports2.timeMonth = month;
      exports2.timeMonths = months;
      exports2.timeSaturday = saturday;
      exports2.timeSaturdays = saturdays;
      exports2.timeSecond = second;
      exports2.timeSeconds = seconds;
      exports2.timeSunday = sunday;
      exports2.timeSundays = sundays;
      exports2.timeThursday = thursday;
      exports2.timeThursdays = thursdays;
      exports2.timeTuesday = tuesday;
      exports2.timeTuesdays = tuesdays;
      exports2.timeWednesday = wednesday;
      exports2.timeWednesdays = wednesdays;
      exports2.timeWeek = sunday;
      exports2.timeWeeks = sundays;
      exports2.timeYear = year;
      exports2.timeYears = years;
      exports2.utcDay = utcDay;
      exports2.utcDays = utcDays;
      exports2.utcFriday = utcFriday;
      exports2.utcFridays = utcFridays;
      exports2.utcHour = utcHour;
      exports2.utcHours = utcHours;
      exports2.utcMillisecond = millisecond;
      exports2.utcMilliseconds = milliseconds;
      exports2.utcMinute = utcMinute;
      exports2.utcMinutes = utcMinutes;
      exports2.utcMonday = utcMonday;
      exports2.utcMondays = utcMondays;
      exports2.utcMonth = utcMonth;
      exports2.utcMonths = utcMonths;
      exports2.utcSaturday = utcSaturday;
      exports2.utcSaturdays = utcSaturdays;
      exports2.utcSecond = second;
      exports2.utcSeconds = seconds;
      exports2.utcSunday = utcSunday;
      exports2.utcSundays = utcSundays;
      exports2.utcThursday = utcThursday;
      exports2.utcThursdays = utcThursdays;
      exports2.utcTuesday = utcTuesday;
      exports2.utcTuesdays = utcTuesdays;
      exports2.utcWednesday = utcWednesday;
      exports2.utcWednesdays = utcWednesdays;
      exports2.utcWeek = utcSunday;
      exports2.utcWeeks = utcSundays;
      exports2.utcYear = utcYear;
      exports2.utcYears = utcYears;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-time-format/dist/d3-time-format.js
  var require_d3_time_format = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_d3_time()) : typeof define === "function" && define.amd ? define(["exports", "d3-time"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}, global.d3));
    })(exports, function(exports2, d3Time) {
      "use strict";
      function localDate(d) {
        if (0 <= d.y && d.y < 100) {
          var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
          date.setFullYear(d.y);
          return date;
        }
        return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
      }
      function utcDate(d) {
        if (0 <= d.y && d.y < 100) {
          var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
          date.setUTCFullYear(d.y);
          return date;
        }
        return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
      }
      function newDate(y, m, d) {
        return {y, m, d, H: 0, M: 0, S: 0, L: 0};
      }
      function formatLocale(locale2) {
        var locale_dateTime = locale2.dateTime, locale_date = locale2.date, locale_time = locale2.time, locale_periods = locale2.periods, locale_weekdays = locale2.days, locale_shortWeekdays = locale2.shortDays, locale_months = locale2.months, locale_shortMonths = locale2.shortMonths;
        var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
        var formats = {
          a: formatShortWeekday,
          A: formatWeekday,
          b: formatShortMonth,
          B: formatMonth,
          c: null,
          d: formatDayOfMonth,
          e: formatDayOfMonth,
          f: formatMicroseconds,
          g: formatYearISO,
          G: formatFullYearISO,
          H: formatHour24,
          I: formatHour12,
          j: formatDayOfYear,
          L: formatMilliseconds,
          m: formatMonthNumber,
          M: formatMinutes,
          p: formatPeriod,
          q: formatQuarter,
          Q: formatUnixTimestamp,
          s: formatUnixTimestampSeconds,
          S: formatSeconds,
          u: formatWeekdayNumberMonday,
          U: formatWeekNumberSunday,
          V: formatWeekNumberISO,
          w: formatWeekdayNumberSunday,
          W: formatWeekNumberMonday,
          x: null,
          X: null,
          y: formatYear,
          Y: formatFullYear,
          Z: formatZone,
          "%": formatLiteralPercent
        };
        var utcFormats = {
          a: formatUTCShortWeekday,
          A: formatUTCWeekday,
          b: formatUTCShortMonth,
          B: formatUTCMonth,
          c: null,
          d: formatUTCDayOfMonth,
          e: formatUTCDayOfMonth,
          f: formatUTCMicroseconds,
          g: formatUTCYearISO,
          G: formatUTCFullYearISO,
          H: formatUTCHour24,
          I: formatUTCHour12,
          j: formatUTCDayOfYear,
          L: formatUTCMilliseconds,
          m: formatUTCMonthNumber,
          M: formatUTCMinutes,
          p: formatUTCPeriod,
          q: formatUTCQuarter,
          Q: formatUnixTimestamp,
          s: formatUnixTimestampSeconds,
          S: formatUTCSeconds,
          u: formatUTCWeekdayNumberMonday,
          U: formatUTCWeekNumberSunday,
          V: formatUTCWeekNumberISO,
          w: formatUTCWeekdayNumberSunday,
          W: formatUTCWeekNumberMonday,
          x: null,
          X: null,
          y: formatUTCYear,
          Y: formatUTCFullYear,
          Z: formatUTCZone,
          "%": formatLiteralPercent
        };
        var parses = {
          a: parseShortWeekday,
          A: parseWeekday,
          b: parseShortMonth,
          B: parseMonth,
          c: parseLocaleDateTime,
          d: parseDayOfMonth,
          e: parseDayOfMonth,
          f: parseMicroseconds,
          g: parseYear,
          G: parseFullYear,
          H: parseHour24,
          I: parseHour24,
          j: parseDayOfYear,
          L: parseMilliseconds,
          m: parseMonthNumber,
          M: parseMinutes,
          p: parsePeriod,
          q: parseQuarter,
          Q: parseUnixTimestamp,
          s: parseUnixTimestampSeconds,
          S: parseSeconds,
          u: parseWeekdayNumberMonday,
          U: parseWeekNumberSunday,
          V: parseWeekNumberISO,
          w: parseWeekdayNumberSunday,
          W: parseWeekNumberMonday,
          x: parseLocaleDate,
          X: parseLocaleTime,
          y: parseYear,
          Y: parseFullYear,
          Z: parseZone,
          "%": parseLiteralPercent
        };
        formats.x = newFormat(locale_date, formats);
        formats.X = newFormat(locale_time, formats);
        formats.c = newFormat(locale_dateTime, formats);
        utcFormats.x = newFormat(locale_date, utcFormats);
        utcFormats.X = newFormat(locale_time, utcFormats);
        utcFormats.c = newFormat(locale_dateTime, utcFormats);
        function newFormat(specifier, formats2) {
          return function(date) {
            var string = [], i = -1, j = 0, n = specifier.length, c, pad2, format;
            if (!(date instanceof Date))
              date = new Date(+date);
            while (++i < n) {
              if (specifier.charCodeAt(i) === 37) {
                string.push(specifier.slice(j, i));
                if ((pad2 = pads[c = specifier.charAt(++i)]) != null)
                  c = specifier.charAt(++i);
                else
                  pad2 = c === "e" ? " " : "0";
                if (format = formats2[c])
                  c = format(date, pad2);
                string.push(c);
                j = i + 1;
              }
            }
            string.push(specifier.slice(j, i));
            return string.join("");
          };
        }
        function newParse(specifier, Z) {
          return function(string) {
            var d = newDate(1900, void 0, 1), i = parseSpecifier(d, specifier, string += "", 0), week, day;
            if (i != string.length)
              return null;
            if ("Q" in d)
              return new Date(d.Q);
            if ("s" in d)
              return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
            if (Z && !("Z" in d))
              d.Z = 0;
            if ("p" in d)
              d.H = d.H % 12 + d.p * 12;
            if (d.m === void 0)
              d.m = "q" in d ? d.q : 0;
            if ("V" in d) {
              if (d.V < 1 || d.V > 53)
                return null;
              if (!("w" in d))
                d.w = 1;
              if ("Z" in d) {
                week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
                week = day > 4 || day === 0 ? d3Time.utcMonday.ceil(week) : d3Time.utcMonday(week);
                week = d3Time.utcDay.offset(week, (d.V - 1) * 7);
                d.y = week.getUTCFullYear();
                d.m = week.getUTCMonth();
                d.d = week.getUTCDate() + (d.w + 6) % 7;
              } else {
                week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
                week = day > 4 || day === 0 ? d3Time.timeMonday.ceil(week) : d3Time.timeMonday(week);
                week = d3Time.timeDay.offset(week, (d.V - 1) * 7);
                d.y = week.getFullYear();
                d.m = week.getMonth();
                d.d = week.getDate() + (d.w + 6) % 7;
              }
            } else if ("W" in d || "U" in d) {
              if (!("w" in d))
                d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
              day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
              d.m = 0;
              d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
            }
            if ("Z" in d) {
              d.H += d.Z / 100 | 0;
              d.M += d.Z % 100;
              return utcDate(d);
            }
            return localDate(d);
          };
        }
        function parseSpecifier(d, specifier, string, j) {
          var i = 0, n = specifier.length, m = string.length, c, parse;
          while (i < n) {
            if (j >= m)
              return -1;
            c = specifier.charCodeAt(i++);
            if (c === 37) {
              c = specifier.charAt(i++);
              parse = parses[c in pads ? specifier.charAt(i++) : c];
              if (!parse || (j = parse(d, string, j)) < 0)
                return -1;
            } else if (c != string.charCodeAt(j++)) {
              return -1;
            }
          }
          return j;
        }
        function parsePeriod(d, string, i) {
          var n = periodRe.exec(string.slice(i));
          return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
        }
        function parseShortWeekday(d, string, i) {
          var n = shortWeekdayRe.exec(string.slice(i));
          return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
        }
        function parseWeekday(d, string, i) {
          var n = weekdayRe.exec(string.slice(i));
          return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
        }
        function parseShortMonth(d, string, i) {
          var n = shortMonthRe.exec(string.slice(i));
          return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
        }
        function parseMonth(d, string, i) {
          var n = monthRe.exec(string.slice(i));
          return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
        }
        function parseLocaleDateTime(d, string, i) {
          return parseSpecifier(d, locale_dateTime, string, i);
        }
        function parseLocaleDate(d, string, i) {
          return parseSpecifier(d, locale_date, string, i);
        }
        function parseLocaleTime(d, string, i) {
          return parseSpecifier(d, locale_time, string, i);
        }
        function formatShortWeekday(d) {
          return locale_shortWeekdays[d.getDay()];
        }
        function formatWeekday(d) {
          return locale_weekdays[d.getDay()];
        }
        function formatShortMonth(d) {
          return locale_shortMonths[d.getMonth()];
        }
        function formatMonth(d) {
          return locale_months[d.getMonth()];
        }
        function formatPeriod(d) {
          return locale_periods[+(d.getHours() >= 12)];
        }
        function formatQuarter(d) {
          return 1 + ~~(d.getMonth() / 3);
        }
        function formatUTCShortWeekday(d) {
          return locale_shortWeekdays[d.getUTCDay()];
        }
        function formatUTCWeekday(d) {
          return locale_weekdays[d.getUTCDay()];
        }
        function formatUTCShortMonth(d) {
          return locale_shortMonths[d.getUTCMonth()];
        }
        function formatUTCMonth(d) {
          return locale_months[d.getUTCMonth()];
        }
        function formatUTCPeriod(d) {
          return locale_periods[+(d.getUTCHours() >= 12)];
        }
        function formatUTCQuarter(d) {
          return 1 + ~~(d.getUTCMonth() / 3);
        }
        return {
          format: function(specifier) {
            var f = newFormat(specifier += "", formats);
            f.toString = function() {
              return specifier;
            };
            return f;
          },
          parse: function(specifier) {
            var p = newParse(specifier += "", false);
            p.toString = function() {
              return specifier;
            };
            return p;
          },
          utcFormat: function(specifier) {
            var f = newFormat(specifier += "", utcFormats);
            f.toString = function() {
              return specifier;
            };
            return f;
          },
          utcParse: function(specifier) {
            var p = newParse(specifier += "", true);
            p.toString = function() {
              return specifier;
            };
            return p;
          }
        };
      }
      var pads = {"-": "", _: " ", "0": "0"}, numberRe = /^\s*\d+/, percentRe = /^%/, requoteRe = /[\\^$*+?|[\]().{}]/g;
      function pad(value, fill, width2) {
        var sign = value < 0 ? "-" : "", string = (sign ? -value : value) + "", length = string.length;
        return sign + (length < width2 ? new Array(width2 - length + 1).join(fill) + string : string);
      }
      function requote(s) {
        return s.replace(requoteRe, "\\$&");
      }
      function formatRe(names) {
        return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
      }
      function formatLookup(names) {
        return new Map(names.map((name, i) => [name.toLowerCase(), i]));
      }
      function parseWeekdayNumberSunday(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 1));
        return n ? (d.w = +n[0], i + n[0].length) : -1;
      }
      function parseWeekdayNumberMonday(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 1));
        return n ? (d.u = +n[0], i + n[0].length) : -1;
      }
      function parseWeekNumberSunday(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.U = +n[0], i + n[0].length) : -1;
      }
      function parseWeekNumberISO(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.V = +n[0], i + n[0].length) : -1;
      }
      function parseWeekNumberMonday(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.W = +n[0], i + n[0].length) : -1;
      }
      function parseFullYear(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 4));
        return n ? (d.y = +n[0], i + n[0].length) : -1;
      }
      function parseYear(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), i + n[0].length) : -1;
      }
      function parseZone(d, string, i) {
        var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
        return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
      }
      function parseQuarter(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 1));
        return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
      }
      function parseMonthNumber(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
      }
      function parseDayOfMonth(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.d = +n[0], i + n[0].length) : -1;
      }
      function parseDayOfYear(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 3));
        return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
      }
      function parseHour24(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.H = +n[0], i + n[0].length) : -1;
      }
      function parseMinutes(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.M = +n[0], i + n[0].length) : -1;
      }
      function parseSeconds(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.S = +n[0], i + n[0].length) : -1;
      }
      function parseMilliseconds(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 3));
        return n ? (d.L = +n[0], i + n[0].length) : -1;
      }
      function parseMicroseconds(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 6));
        return n ? (d.L = Math.floor(n[0] / 1e3), i + n[0].length) : -1;
      }
      function parseLiteralPercent(d, string, i) {
        var n = percentRe.exec(string.slice(i, i + 1));
        return n ? i + n[0].length : -1;
      }
      function parseUnixTimestamp(d, string, i) {
        var n = numberRe.exec(string.slice(i));
        return n ? (d.Q = +n[0], i + n[0].length) : -1;
      }
      function parseUnixTimestampSeconds(d, string, i) {
        var n = numberRe.exec(string.slice(i));
        return n ? (d.s = +n[0], i + n[0].length) : -1;
      }
      function formatDayOfMonth(d, p) {
        return pad(d.getDate(), p, 2);
      }
      function formatHour24(d, p) {
        return pad(d.getHours(), p, 2);
      }
      function formatHour12(d, p) {
        return pad(d.getHours() % 12 || 12, p, 2);
      }
      function formatDayOfYear(d, p) {
        return pad(1 + d3Time.timeDay.count(d3Time.timeYear(d), d), p, 3);
      }
      function formatMilliseconds(d, p) {
        return pad(d.getMilliseconds(), p, 3);
      }
      function formatMicroseconds(d, p) {
        return formatMilliseconds(d, p) + "000";
      }
      function formatMonthNumber(d, p) {
        return pad(d.getMonth() + 1, p, 2);
      }
      function formatMinutes(d, p) {
        return pad(d.getMinutes(), p, 2);
      }
      function formatSeconds(d, p) {
        return pad(d.getSeconds(), p, 2);
      }
      function formatWeekdayNumberMonday(d) {
        var day = d.getDay();
        return day === 0 ? 7 : day;
      }
      function formatWeekNumberSunday(d, p) {
        return pad(d3Time.timeSunday.count(d3Time.timeYear(d) - 1, d), p, 2);
      }
      function dISO(d) {
        var day = d.getDay();
        return day >= 4 || day === 0 ? d3Time.timeThursday(d) : d3Time.timeThursday.ceil(d);
      }
      function formatWeekNumberISO(d, p) {
        d = dISO(d);
        return pad(d3Time.timeThursday.count(d3Time.timeYear(d), d) + (d3Time.timeYear(d).getDay() === 4), p, 2);
      }
      function formatWeekdayNumberSunday(d) {
        return d.getDay();
      }
      function formatWeekNumberMonday(d, p) {
        return pad(d3Time.timeMonday.count(d3Time.timeYear(d) - 1, d), p, 2);
      }
      function formatYear(d, p) {
        return pad(d.getFullYear() % 100, p, 2);
      }
      function formatYearISO(d, p) {
        d = dISO(d);
        return pad(d.getFullYear() % 100, p, 2);
      }
      function formatFullYear(d, p) {
        return pad(d.getFullYear() % 1e4, p, 4);
      }
      function formatFullYearISO(d, p) {
        var day = d.getDay();
        d = day >= 4 || day === 0 ? d3Time.timeThursday(d) : d3Time.timeThursday.ceil(d);
        return pad(d.getFullYear() % 1e4, p, 4);
      }
      function formatZone(d) {
        var z = d.getTimezoneOffset();
        return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
      }
      function formatUTCDayOfMonth(d, p) {
        return pad(d.getUTCDate(), p, 2);
      }
      function formatUTCHour24(d, p) {
        return pad(d.getUTCHours(), p, 2);
      }
      function formatUTCHour12(d, p) {
        return pad(d.getUTCHours() % 12 || 12, p, 2);
      }
      function formatUTCDayOfYear(d, p) {
        return pad(1 + d3Time.utcDay.count(d3Time.utcYear(d), d), p, 3);
      }
      function formatUTCMilliseconds(d, p) {
        return pad(d.getUTCMilliseconds(), p, 3);
      }
      function formatUTCMicroseconds(d, p) {
        return formatUTCMilliseconds(d, p) + "000";
      }
      function formatUTCMonthNumber(d, p) {
        return pad(d.getUTCMonth() + 1, p, 2);
      }
      function formatUTCMinutes(d, p) {
        return pad(d.getUTCMinutes(), p, 2);
      }
      function formatUTCSeconds(d, p) {
        return pad(d.getUTCSeconds(), p, 2);
      }
      function formatUTCWeekdayNumberMonday(d) {
        var dow = d.getUTCDay();
        return dow === 0 ? 7 : dow;
      }
      function formatUTCWeekNumberSunday(d, p) {
        return pad(d3Time.utcSunday.count(d3Time.utcYear(d) - 1, d), p, 2);
      }
      function UTCdISO(d) {
        var day = d.getUTCDay();
        return day >= 4 || day === 0 ? d3Time.utcThursday(d) : d3Time.utcThursday.ceil(d);
      }
      function formatUTCWeekNumberISO(d, p) {
        d = UTCdISO(d);
        return pad(d3Time.utcThursday.count(d3Time.utcYear(d), d) + (d3Time.utcYear(d).getUTCDay() === 4), p, 2);
      }
      function formatUTCWeekdayNumberSunday(d) {
        return d.getUTCDay();
      }
      function formatUTCWeekNumberMonday(d, p) {
        return pad(d3Time.utcMonday.count(d3Time.utcYear(d) - 1, d), p, 2);
      }
      function formatUTCYear(d, p) {
        return pad(d.getUTCFullYear() % 100, p, 2);
      }
      function formatUTCYearISO(d, p) {
        d = UTCdISO(d);
        return pad(d.getUTCFullYear() % 100, p, 2);
      }
      function formatUTCFullYear(d, p) {
        return pad(d.getUTCFullYear() % 1e4, p, 4);
      }
      function formatUTCFullYearISO(d, p) {
        var day = d.getUTCDay();
        d = day >= 4 || day === 0 ? d3Time.utcThursday(d) : d3Time.utcThursday.ceil(d);
        return pad(d.getUTCFullYear() % 1e4, p, 4);
      }
      function formatUTCZone() {
        return "+0000";
      }
      function formatLiteralPercent() {
        return "%";
      }
      function formatUnixTimestamp(d) {
        return +d;
      }
      function formatUnixTimestampSeconds(d) {
        return Math.floor(+d / 1e3);
      }
      var locale;
      defaultLocale({
        dateTime: "%x, %X",
        date: "%-m/%-d/%Y",
        time: "%-I:%M:%S %p",
        periods: ["AM", "PM"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      });
      function defaultLocale(definition) {
        locale = formatLocale(definition);
        exports2.timeFormat = locale.format;
        exports2.timeParse = locale.parse;
        exports2.utcFormat = locale.utcFormat;
        exports2.utcParse = locale.utcParse;
        return locale;
      }
      var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
      function formatIsoNative(date) {
        return date.toISOString();
      }
      var formatIso = Date.prototype.toISOString ? formatIsoNative : exports2.utcFormat(isoSpecifier);
      function parseIsoNative(string) {
        var date = new Date(string);
        return isNaN(date) ? null : date;
      }
      var parseIso = +new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : exports2.utcParse(isoSpecifier);
      exports2.isoFormat = formatIso;
      exports2.isoParse = parseIso;
      exports2.timeFormatDefaultLocale = defaultLocale;
      exports2.timeFormatLocale = formatLocale;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-scale/dist/d3-scale.js
  var require_d3_scale = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_d3_array(), require_d3_interpolate(), require_d3_format(), require_d3_time(), require_d3_time_format()) : typeof define === "function" && define.amd ? define(["exports", "d3-array", "d3-interpolate", "d3-format", "d3-time", "d3-time-format"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}, global.d3, global.d3, global.d3, global.d3, global.d3));
    })(exports, function(exports2, d3Array, d3Interpolate, d3Format, d3Time, d3TimeFormat) {
      "use strict";
      function initRange(domain, range) {
        switch (arguments.length) {
          case 0:
            break;
          case 1:
            this.range(domain);
            break;
          default:
            this.range(range).domain(domain);
            break;
        }
        return this;
      }
      function initInterpolator(domain, interpolator) {
        switch (arguments.length) {
          case 0:
            break;
          case 1: {
            if (typeof domain === "function")
              this.interpolator(domain);
            else
              this.range(domain);
            break;
          }
          default: {
            this.domain(domain);
            if (typeof interpolator === "function")
              this.interpolator(interpolator);
            else
              this.range(interpolator);
            break;
          }
        }
        return this;
      }
      const implicit = Symbol("implicit");
      function ordinal() {
        var index = new Map(), domain = [], range = [], unknown = implicit;
        function scale(d) {
          var key = d + "", i = index.get(key);
          if (!i) {
            if (unknown !== implicit)
              return unknown;
            index.set(key, i = domain.push(d));
          }
          return range[(i - 1) % range.length];
        }
        scale.domain = function(_) {
          if (!arguments.length)
            return domain.slice();
          domain = [], index = new Map();
          for (const value of _) {
            const key = value + "";
            if (index.has(key))
              continue;
            index.set(key, domain.push(value));
          }
          return scale;
        };
        scale.range = function(_) {
          return arguments.length ? (range = Array.from(_), scale) : range.slice();
        };
        scale.unknown = function(_) {
          return arguments.length ? (unknown = _, scale) : unknown;
        };
        scale.copy = function() {
          return ordinal(domain, range).unknown(unknown);
        };
        initRange.apply(scale, arguments);
        return scale;
      }
      function band() {
        var scale = ordinal().unknown(void 0), domain = scale.domain, ordinalRange = scale.range, r0 = 0, r1 = 1, step, bandwidth, round = false, paddingInner = 0, paddingOuter = 0, align = 0.5;
        delete scale.unknown;
        function rescale() {
          var n = domain().length, reverse = r1 < r0, start = reverse ? r1 : r0, stop = reverse ? r0 : r1;
          step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
          if (round)
            step = Math.floor(step);
          start += (stop - start - step * (n - paddingInner)) * align;
          bandwidth = step * (1 - paddingInner);
          if (round)
            start = Math.round(start), bandwidth = Math.round(bandwidth);
          var values = d3Array.range(n).map(function(i) {
            return start + step * i;
          });
          return ordinalRange(reverse ? values.reverse() : values);
        }
        scale.domain = function(_) {
          return arguments.length ? (domain(_), rescale()) : domain();
        };
        scale.range = function(_) {
          return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
        };
        scale.rangeRound = function(_) {
          return [r0, r1] = _, r0 = +r0, r1 = +r1, round = true, rescale();
        };
        scale.bandwidth = function() {
          return bandwidth;
        };
        scale.step = function() {
          return step;
        };
        scale.round = function(_) {
          return arguments.length ? (round = !!_, rescale()) : round;
        };
        scale.padding = function(_) {
          return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
        };
        scale.paddingInner = function(_) {
          return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
        };
        scale.paddingOuter = function(_) {
          return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
        };
        scale.align = function(_) {
          return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
        };
        scale.copy = function() {
          return band(domain(), [r0, r1]).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
        };
        return initRange.apply(rescale(), arguments);
      }
      function pointish(scale) {
        var copy2 = scale.copy;
        scale.padding = scale.paddingOuter;
        delete scale.paddingInner;
        delete scale.paddingOuter;
        scale.copy = function() {
          return pointish(copy2());
        };
        return scale;
      }
      function point() {
        return pointish(band.apply(null, arguments).paddingInner(1));
      }
      function constants(x) {
        return function() {
          return x;
        };
      }
      function number(x) {
        return +x;
      }
      var unit = [0, 1];
      function identity(x) {
        return x;
      }
      function normalize(a, b) {
        return (b -= a = +a) ? function(x) {
          return (x - a) / b;
        } : constants(isNaN(b) ? NaN : 0.5);
      }
      function clamper(a, b) {
        var t;
        if (a > b)
          t = a, a = b, b = t;
        return function(x) {
          return Math.max(a, Math.min(b, x));
        };
      }
      function bimap(domain, range, interpolate) {
        var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
        if (d1 < d0)
          d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
        else
          d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
        return function(x) {
          return r0(d0(x));
        };
      }
      function polymap(domain, range, interpolate) {
        var j = Math.min(domain.length, range.length) - 1, d = new Array(j), r = new Array(j), i = -1;
        if (domain[j] < domain[0]) {
          domain = domain.slice().reverse();
          range = range.slice().reverse();
        }
        while (++i < j) {
          d[i] = normalize(domain[i], domain[i + 1]);
          r[i] = interpolate(range[i], range[i + 1]);
        }
        return function(x) {
          var i2 = d3Array.bisect(domain, x, 1, j) - 1;
          return r[i2](d[i2](x));
        };
      }
      function copy(source, target) {
        return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
      }
      function transformer() {
        var domain = unit, range = unit, interpolate = d3Interpolate.interpolate, transform, untransform, unknown, clamp = identity, piecewise, output, input;
        function rescale() {
          var n = Math.min(domain.length, range.length);
          if (clamp !== identity)
            clamp = clamper(domain[0], domain[n - 1]);
          piecewise = n > 2 ? polymap : bimap;
          output = input = null;
          return scale;
        }
        function scale(x) {
          return isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
        }
        scale.invert = function(y) {
          return clamp(untransform((input || (input = piecewise(range, domain.map(transform), d3Interpolate.interpolateNumber)))(y)));
        };
        scale.domain = function(_) {
          return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
        };
        scale.range = function(_) {
          return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
        };
        scale.rangeRound = function(_) {
          return range = Array.from(_), interpolate = d3Interpolate.interpolateRound, rescale();
        };
        scale.clamp = function(_) {
          return arguments.length ? (clamp = _ ? true : identity, rescale()) : clamp !== identity;
        };
        scale.interpolate = function(_) {
          return arguments.length ? (interpolate = _, rescale()) : interpolate;
        };
        scale.unknown = function(_) {
          return arguments.length ? (unknown = _, scale) : unknown;
        };
        return function(t, u) {
          transform = t, untransform = u;
          return rescale();
        };
      }
      function continuous() {
        return transformer()(identity, identity);
      }
      function tickFormat(start, stop, count, specifier) {
        var step = d3Array.tickStep(start, stop, count), precision;
        specifier = d3Format.formatSpecifier(specifier == null ? ",f" : specifier);
        switch (specifier.type) {
          case "s": {
            var value = Math.max(Math.abs(start), Math.abs(stop));
            if (specifier.precision == null && !isNaN(precision = d3Format.precisionPrefix(step, value)))
              specifier.precision = precision;
            return d3Format.formatPrefix(specifier, value);
          }
          case "":
          case "e":
          case "g":
          case "p":
          case "r": {
            if (specifier.precision == null && !isNaN(precision = d3Format.precisionRound(step, Math.max(Math.abs(start), Math.abs(stop)))))
              specifier.precision = precision - (specifier.type === "e");
            break;
          }
          case "f":
          case "%": {
            if (specifier.precision == null && !isNaN(precision = d3Format.precisionFixed(step)))
              specifier.precision = precision - (specifier.type === "%") * 2;
            break;
          }
        }
        return d3Format.format(specifier);
      }
      function linearish(scale) {
        var domain = scale.domain;
        scale.ticks = function(count) {
          var d = domain();
          return d3Array.ticks(d[0], d[d.length - 1], count == null ? 10 : count);
        };
        scale.tickFormat = function(count, specifier) {
          var d = domain();
          return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
        };
        scale.nice = function(count) {
          if (count == null)
            count = 10;
          var d = domain();
          var i0 = 0;
          var i1 = d.length - 1;
          var start = d[i0];
          var stop = d[i1];
          var prestep;
          var step;
          var maxIter = 10;
          if (stop < start) {
            step = start, start = stop, stop = step;
            step = i0, i0 = i1, i1 = step;
          }
          while (maxIter-- > 0) {
            step = d3Array.tickIncrement(start, stop, count);
            if (step === prestep) {
              d[i0] = start;
              d[i1] = stop;
              return domain(d);
            } else if (step > 0) {
              start = Math.floor(start / step) * step;
              stop = Math.ceil(stop / step) * step;
            } else if (step < 0) {
              start = Math.ceil(start * step) / step;
              stop = Math.floor(stop * step) / step;
            } else {
              break;
            }
            prestep = step;
          }
          return scale;
        };
        return scale;
      }
      function linear() {
        var scale = continuous();
        scale.copy = function() {
          return copy(scale, linear());
        };
        initRange.apply(scale, arguments);
        return linearish(scale);
      }
      function identity$1(domain) {
        var unknown;
        function scale(x) {
          return isNaN(x = +x) ? unknown : x;
        }
        scale.invert = scale;
        scale.domain = scale.range = function(_) {
          return arguments.length ? (domain = Array.from(_, number), scale) : domain.slice();
        };
        scale.unknown = function(_) {
          return arguments.length ? (unknown = _, scale) : unknown;
        };
        scale.copy = function() {
          return identity$1(domain).unknown(unknown);
        };
        domain = arguments.length ? Array.from(domain, number) : [0, 1];
        return linearish(scale);
      }
      function nice(domain, interval) {
        domain = domain.slice();
        var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], t;
        if (x1 < x0) {
          t = i0, i0 = i1, i1 = t;
          t = x0, x0 = x1, x1 = t;
        }
        domain[i0] = interval.floor(x0);
        domain[i1] = interval.ceil(x1);
        return domain;
      }
      function transformLog(x) {
        return Math.log(x);
      }
      function transformExp(x) {
        return Math.exp(x);
      }
      function transformLogn(x) {
        return -Math.log(-x);
      }
      function transformExpn(x) {
        return -Math.exp(-x);
      }
      function pow10(x) {
        return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
      }
      function powp(base) {
        return base === 10 ? pow10 : base === Math.E ? Math.exp : function(x) {
          return Math.pow(base, x);
        };
      }
      function logp(base) {
        return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), function(x) {
          return Math.log(x) / base;
        });
      }
      function reflect(f) {
        return function(x) {
          return -f(-x);
        };
      }
      function loggish(transform) {
        var scale = transform(transformLog, transformExp), domain = scale.domain, base = 10, logs, pows;
        function rescale() {
          logs = logp(base), pows = powp(base);
          if (domain()[0] < 0) {
            logs = reflect(logs), pows = reflect(pows);
            transform(transformLogn, transformExpn);
          } else {
            transform(transformLog, transformExp);
          }
          return scale;
        }
        scale.base = function(_) {
          return arguments.length ? (base = +_, rescale()) : base;
        };
        scale.domain = function(_) {
          return arguments.length ? (domain(_), rescale()) : domain();
        };
        scale.ticks = function(count) {
          var d = domain(), u = d[0], v = d[d.length - 1], r;
          if (r = v < u)
            i = u, u = v, v = i;
          var i = logs(u), j = logs(v), p, k, t, n = count == null ? 10 : +count, z = [];
          if (!(base % 1) && j - i < n) {
            i = Math.floor(i), j = Math.ceil(j);
            if (u > 0)
              for (; i <= j; ++i) {
                for (k = 1, p = pows(i); k < base; ++k) {
                  t = p * k;
                  if (t < u)
                    continue;
                  if (t > v)
                    break;
                  z.push(t);
                }
              }
            else
              for (; i <= j; ++i) {
                for (k = base - 1, p = pows(i); k >= 1; --k) {
                  t = p * k;
                  if (t < u)
                    continue;
                  if (t > v)
                    break;
                  z.push(t);
                }
              }
            if (z.length * 2 < n)
              z = d3Array.ticks(u, v, n);
          } else {
            z = d3Array.ticks(i, j, Math.min(j - i, n)).map(pows);
          }
          return r ? z.reverse() : z;
        };
        scale.tickFormat = function(count, specifier) {
          if (specifier == null)
            specifier = base === 10 ? ".0e" : ",";
          if (typeof specifier !== "function")
            specifier = d3Format.format(specifier);
          if (count === Infinity)
            return specifier;
          if (count == null)
            count = 10;
          var k = Math.max(1, base * count / scale.ticks().length);
          return function(d) {
            var i = d / pows(Math.round(logs(d)));
            if (i * base < base - 0.5)
              i *= base;
            return i <= k ? specifier(d) : "";
          };
        };
        scale.nice = function() {
          return domain(nice(domain(), {
            floor: function(x) {
              return pows(Math.floor(logs(x)));
            },
            ceil: function(x) {
              return pows(Math.ceil(logs(x)));
            }
          }));
        };
        return scale;
      }
      function log() {
        var scale = loggish(transformer()).domain([1, 10]);
        scale.copy = function() {
          return copy(scale, log()).base(scale.base());
        };
        initRange.apply(scale, arguments);
        return scale;
      }
      function transformSymlog(c) {
        return function(x) {
          return Math.sign(x) * Math.log1p(Math.abs(x / c));
        };
      }
      function transformSymexp(c) {
        return function(x) {
          return Math.sign(x) * Math.expm1(Math.abs(x)) * c;
        };
      }
      function symlogish(transform) {
        var c = 1, scale = transform(transformSymlog(c), transformSymexp(c));
        scale.constant = function(_) {
          return arguments.length ? transform(transformSymlog(c = +_), transformSymexp(c)) : c;
        };
        return linearish(scale);
      }
      function symlog() {
        var scale = symlogish(transformer());
        scale.copy = function() {
          return copy(scale, symlog()).constant(scale.constant());
        };
        return initRange.apply(scale, arguments);
      }
      function transformPow(exponent) {
        return function(x) {
          return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
        };
      }
      function transformSqrt(x) {
        return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
      }
      function transformSquare(x) {
        return x < 0 ? -x * x : x * x;
      }
      function powish(transform) {
        var scale = transform(identity, identity), exponent = 1;
        function rescale() {
          return exponent === 1 ? transform(identity, identity) : exponent === 0.5 ? transform(transformSqrt, transformSquare) : transform(transformPow(exponent), transformPow(1 / exponent));
        }
        scale.exponent = function(_) {
          return arguments.length ? (exponent = +_, rescale()) : exponent;
        };
        return linearish(scale);
      }
      function pow() {
        var scale = powish(transformer());
        scale.copy = function() {
          return copy(scale, pow()).exponent(scale.exponent());
        };
        initRange.apply(scale, arguments);
        return scale;
      }
      function sqrt() {
        return pow.apply(null, arguments).exponent(0.5);
      }
      function square(x) {
        return Math.sign(x) * x * x;
      }
      function unsquare(x) {
        return Math.sign(x) * Math.sqrt(Math.abs(x));
      }
      function radial() {
        var squared = continuous(), range = [0, 1], round = false, unknown;
        function scale(x) {
          var y = unsquare(squared(x));
          return isNaN(y) ? unknown : round ? Math.round(y) : y;
        }
        scale.invert = function(y) {
          return squared.invert(square(y));
        };
        scale.domain = function(_) {
          return arguments.length ? (squared.domain(_), scale) : squared.domain();
        };
        scale.range = function(_) {
          return arguments.length ? (squared.range((range = Array.from(_, number)).map(square)), scale) : range.slice();
        };
        scale.rangeRound = function(_) {
          return scale.range(_).round(true);
        };
        scale.round = function(_) {
          return arguments.length ? (round = !!_, scale) : round;
        };
        scale.clamp = function(_) {
          return arguments.length ? (squared.clamp(_), scale) : squared.clamp();
        };
        scale.unknown = function(_) {
          return arguments.length ? (unknown = _, scale) : unknown;
        };
        scale.copy = function() {
          return radial(squared.domain(), range).round(round).clamp(squared.clamp()).unknown(unknown);
        };
        initRange.apply(scale, arguments);
        return linearish(scale);
      }
      function quantile() {
        var domain = [], range = [], thresholds = [], unknown;
        function rescale() {
          var i = 0, n = Math.max(1, range.length);
          thresholds = new Array(n - 1);
          while (++i < n)
            thresholds[i - 1] = d3Array.quantileSorted(domain, i / n);
          return scale;
        }
        function scale(x) {
          return isNaN(x = +x) ? unknown : range[d3Array.bisect(thresholds, x)];
        }
        scale.invertExtent = function(y) {
          var i = range.indexOf(y);
          return i < 0 ? [NaN, NaN] : [
            i > 0 ? thresholds[i - 1] : domain[0],
            i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
          ];
        };
        scale.domain = function(_) {
          if (!arguments.length)
            return domain.slice();
          domain = [];
          for (let d of _)
            if (d != null && !isNaN(d = +d))
              domain.push(d);
          domain.sort(d3Array.ascending);
          return rescale();
        };
        scale.range = function(_) {
          return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
        };
        scale.unknown = function(_) {
          return arguments.length ? (unknown = _, scale) : unknown;
        };
        scale.quantiles = function() {
          return thresholds.slice();
        };
        scale.copy = function() {
          return quantile().domain(domain).range(range).unknown(unknown);
        };
        return initRange.apply(scale, arguments);
      }
      function quantize() {
        var x0 = 0, x1 = 1, n = 1, domain = [0.5], range = [0, 1], unknown;
        function scale(x) {
          return x <= x ? range[d3Array.bisect(domain, x, 0, n)] : unknown;
        }
        function rescale() {
          var i = -1;
          domain = new Array(n);
          while (++i < n)
            domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
          return scale;
        }
        scale.domain = function(_) {
          return arguments.length ? ([x0, x1] = _, x0 = +x0, x1 = +x1, rescale()) : [x0, x1];
        };
        scale.range = function(_) {
          return arguments.length ? (n = (range = Array.from(_)).length - 1, rescale()) : range.slice();
        };
        scale.invertExtent = function(y) {
          var i = range.indexOf(y);
          return i < 0 ? [NaN, NaN] : i < 1 ? [x0, domain[0]] : i >= n ? [domain[n - 1], x1] : [domain[i - 1], domain[i]];
        };
        scale.unknown = function(_) {
          return arguments.length ? (unknown = _, scale) : scale;
        };
        scale.thresholds = function() {
          return domain.slice();
        };
        scale.copy = function() {
          return quantize().domain([x0, x1]).range(range).unknown(unknown);
        };
        return initRange.apply(linearish(scale), arguments);
      }
      function threshold() {
        var domain = [0.5], range = [0, 1], unknown, n = 1;
        function scale(x) {
          return x <= x ? range[d3Array.bisect(domain, x, 0, n)] : unknown;
        }
        scale.domain = function(_) {
          return arguments.length ? (domain = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
        };
        scale.range = function(_) {
          return arguments.length ? (range = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
        };
        scale.invertExtent = function(y) {
          var i = range.indexOf(y);
          return [domain[i - 1], domain[i]];
        };
        scale.unknown = function(_) {
          return arguments.length ? (unknown = _, scale) : unknown;
        };
        scale.copy = function() {
          return threshold().domain(domain).range(range).unknown(unknown);
        };
        return initRange.apply(scale, arguments);
      }
      var durationSecond = 1e3, durationMinute = durationSecond * 60, durationHour = durationMinute * 60, durationDay = durationHour * 24, durationWeek = durationDay * 7, durationMonth = durationDay * 30, durationYear = durationDay * 365;
      function date(t) {
        return new Date(t);
      }
      function number$1(t) {
        return t instanceof Date ? +t : +new Date(+t);
      }
      function calendar(year, month, week, day, hour, minute, second, millisecond, format) {
        var scale = continuous(), invert = scale.invert, domain = scale.domain;
        var formatMillisecond = format(".%L"), formatSecond = format(":%S"), formatMinute = format("%I:%M"), formatHour = format("%I %p"), formatDay = format("%a %d"), formatWeek = format("%b %d"), formatMonth = format("%B"), formatYear = format("%Y");
        var tickIntervals = [
          [second, 1, durationSecond],
          [second, 5, 5 * durationSecond],
          [second, 15, 15 * durationSecond],
          [second, 30, 30 * durationSecond],
          [minute, 1, durationMinute],
          [minute, 5, 5 * durationMinute],
          [minute, 15, 15 * durationMinute],
          [minute, 30, 30 * durationMinute],
          [hour, 1, durationHour],
          [hour, 3, 3 * durationHour],
          [hour, 6, 6 * durationHour],
          [hour, 12, 12 * durationHour],
          [day, 1, durationDay],
          [day, 2, 2 * durationDay],
          [week, 1, durationWeek],
          [month, 1, durationMonth],
          [month, 3, 3 * durationMonth],
          [year, 1, durationYear]
        ];
        function tickFormat2(date2) {
          return (second(date2) < date2 ? formatMillisecond : minute(date2) < date2 ? formatSecond : hour(date2) < date2 ? formatMinute : day(date2) < date2 ? formatHour : month(date2) < date2 ? week(date2) < date2 ? formatDay : formatWeek : year(date2) < date2 ? formatMonth : formatYear)(date2);
        }
        function tickInterval(interval, start, stop) {
          if (interval == null)
            interval = 10;
          if (typeof interval === "number") {
            var target = Math.abs(stop - start) / interval, i = d3Array.bisector(function(i2) {
              return i2[2];
            }).right(tickIntervals, target), step;
            if (i === tickIntervals.length) {
              step = d3Array.tickStep(start / durationYear, stop / durationYear, interval);
              interval = year;
            } else if (i) {
              i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
              step = i[1];
              interval = i[0];
            } else {
              step = Math.max(d3Array.tickStep(start, stop, interval), 1);
              interval = millisecond;
            }
            return interval.every(step);
          }
          return interval;
        }
        scale.invert = function(y) {
          return new Date(invert(y));
        };
        scale.domain = function(_) {
          return arguments.length ? domain(Array.from(_, number$1)) : domain().map(date);
        };
        scale.ticks = function(interval) {
          var d = domain(), t0 = d[0], t1 = d[d.length - 1], r = t1 < t0, t;
          if (r)
            t = t0, t0 = t1, t1 = t;
          t = tickInterval(interval, t0, t1);
          t = t ? t.range(t0, t1 + 1) : [];
          return r ? t.reverse() : t;
        };
        scale.tickFormat = function(count, specifier) {
          return specifier == null ? tickFormat2 : format(specifier);
        };
        scale.nice = function(interval) {
          var d = domain();
          return (interval = tickInterval(interval, d[0], d[d.length - 1])) ? domain(nice(d, interval)) : scale;
        };
        scale.copy = function() {
          return copy(scale, calendar(year, month, week, day, hour, minute, second, millisecond, format));
        };
        return scale;
      }
      function time() {
        return initRange.apply(calendar(d3Time.timeYear, d3Time.timeMonth, d3Time.timeWeek, d3Time.timeDay, d3Time.timeHour, d3Time.timeMinute, d3Time.timeSecond, d3Time.timeMillisecond, d3TimeFormat.timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
      }
      function utcTime() {
        return initRange.apply(calendar(d3Time.utcYear, d3Time.utcMonth, d3Time.utcWeek, d3Time.utcDay, d3Time.utcHour, d3Time.utcMinute, d3Time.utcSecond, d3Time.utcMillisecond, d3TimeFormat.utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
      }
      function transformer$1() {
        var x0 = 0, x1 = 1, t0, t1, k10, transform, interpolator = identity, clamp = false, unknown;
        function scale(x) {
          return isNaN(x = +x) ? unknown : interpolator(k10 === 0 ? 0.5 : (x = (transform(x) - t0) * k10, clamp ? Math.max(0, Math.min(1, x)) : x));
        }
        scale.domain = function(_) {
          return arguments.length ? ([x0, x1] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0), scale) : [x0, x1];
        };
        scale.clamp = function(_) {
          return arguments.length ? (clamp = !!_, scale) : clamp;
        };
        scale.interpolator = function(_) {
          return arguments.length ? (interpolator = _, scale) : interpolator;
        };
        function range(interpolate) {
          return function(_) {
            var r0, r1;
            return arguments.length ? ([r0, r1] = _, interpolator = interpolate(r0, r1), scale) : [interpolator(0), interpolator(1)];
          };
        }
        scale.range = range(d3Interpolate.interpolate);
        scale.rangeRound = range(d3Interpolate.interpolateRound);
        scale.unknown = function(_) {
          return arguments.length ? (unknown = _, scale) : unknown;
        };
        return function(t) {
          transform = t, t0 = t(x0), t1 = t(x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0);
          return scale;
        };
      }
      function copy$1(source, target) {
        return target.domain(source.domain()).interpolator(source.interpolator()).clamp(source.clamp()).unknown(source.unknown());
      }
      function sequential() {
        var scale = linearish(transformer$1()(identity));
        scale.copy = function() {
          return copy$1(scale, sequential());
        };
        return initInterpolator.apply(scale, arguments);
      }
      function sequentialLog() {
        var scale = loggish(transformer$1()).domain([1, 10]);
        scale.copy = function() {
          return copy$1(scale, sequentialLog()).base(scale.base());
        };
        return initInterpolator.apply(scale, arguments);
      }
      function sequentialSymlog() {
        var scale = symlogish(transformer$1());
        scale.copy = function() {
          return copy$1(scale, sequentialSymlog()).constant(scale.constant());
        };
        return initInterpolator.apply(scale, arguments);
      }
      function sequentialPow() {
        var scale = powish(transformer$1());
        scale.copy = function() {
          return copy$1(scale, sequentialPow()).exponent(scale.exponent());
        };
        return initInterpolator.apply(scale, arguments);
      }
      function sequentialSqrt() {
        return sequentialPow.apply(null, arguments).exponent(0.5);
      }
      function sequentialQuantile() {
        var domain = [], interpolator = identity;
        function scale(x) {
          if (!isNaN(x = +x))
            return interpolator((d3Array.bisect(domain, x, 1) - 1) / (domain.length - 1));
        }
        scale.domain = function(_) {
          if (!arguments.length)
            return domain.slice();
          domain = [];
          for (let d of _)
            if (d != null && !isNaN(d = +d))
              domain.push(d);
          domain.sort(d3Array.ascending);
          return scale;
        };
        scale.interpolator = function(_) {
          return arguments.length ? (interpolator = _, scale) : interpolator;
        };
        scale.range = function() {
          return domain.map((d, i) => interpolator(i / (domain.length - 1)));
        };
        scale.quantiles = function(n) {
          return Array.from({length: n + 1}, (_, i) => d3Array.quantile(domain, i / n));
        };
        scale.copy = function() {
          return sequentialQuantile(interpolator).domain(domain);
        };
        return initInterpolator.apply(scale, arguments);
      }
      function transformer$2() {
        var x0 = 0, x1 = 0.5, x2 = 1, s = 1, t0, t1, t2, k10, k21, interpolator = identity, transform, clamp = false, unknown;
        function scale(x) {
          return isNaN(x = +x) ? unknown : (x = 0.5 + ((x = +transform(x)) - t1) * (s * x < s * t1 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x)) : x));
        }
        scale.domain = function(_) {
          return arguments.length ? ([x0, x1, x2] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), t2 = transform(x2 = +x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), s = t1 < t0 ? -1 : 1, scale) : [x0, x1, x2];
        };
        scale.clamp = function(_) {
          return arguments.length ? (clamp = !!_, scale) : clamp;
        };
        scale.interpolator = function(_) {
          return arguments.length ? (interpolator = _, scale) : interpolator;
        };
        function range(interpolate) {
          return function(_) {
            var r0, r1, r2;
            return arguments.length ? ([r0, r1, r2] = _, interpolator = d3Interpolate.piecewise(interpolate, [r0, r1, r2]), scale) : [interpolator(0), interpolator(0.5), interpolator(1)];
          };
        }
        scale.range = range(d3Interpolate.interpolate);
        scale.rangeRound = range(d3Interpolate.interpolateRound);
        scale.unknown = function(_) {
          return arguments.length ? (unknown = _, scale) : unknown;
        };
        return function(t) {
          transform = t, t0 = t(x0), t1 = t(x1), t2 = t(x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), s = t1 < t0 ? -1 : 1;
          return scale;
        };
      }
      function diverging() {
        var scale = linearish(transformer$2()(identity));
        scale.copy = function() {
          return copy$1(scale, diverging());
        };
        return initInterpolator.apply(scale, arguments);
      }
      function divergingLog() {
        var scale = loggish(transformer$2()).domain([0.1, 1, 10]);
        scale.copy = function() {
          return copy$1(scale, divergingLog()).base(scale.base());
        };
        return initInterpolator.apply(scale, arguments);
      }
      function divergingSymlog() {
        var scale = symlogish(transformer$2());
        scale.copy = function() {
          return copy$1(scale, divergingSymlog()).constant(scale.constant());
        };
        return initInterpolator.apply(scale, arguments);
      }
      function divergingPow() {
        var scale = powish(transformer$2());
        scale.copy = function() {
          return copy$1(scale, divergingPow()).exponent(scale.exponent());
        };
        return initInterpolator.apply(scale, arguments);
      }
      function divergingSqrt() {
        return divergingPow.apply(null, arguments).exponent(0.5);
      }
      exports2.scaleBand = band;
      exports2.scaleDiverging = diverging;
      exports2.scaleDivergingLog = divergingLog;
      exports2.scaleDivergingPow = divergingPow;
      exports2.scaleDivergingSqrt = divergingSqrt;
      exports2.scaleDivergingSymlog = divergingSymlog;
      exports2.scaleIdentity = identity$1;
      exports2.scaleImplicit = implicit;
      exports2.scaleLinear = linear;
      exports2.scaleLog = log;
      exports2.scaleOrdinal = ordinal;
      exports2.scalePoint = point;
      exports2.scalePow = pow;
      exports2.scaleQuantile = quantile;
      exports2.scaleQuantize = quantize;
      exports2.scaleRadial = radial;
      exports2.scaleSequential = sequential;
      exports2.scaleSequentialLog = sequentialLog;
      exports2.scaleSequentialPow = sequentialPow;
      exports2.scaleSequentialQuantile = sequentialQuantile;
      exports2.scaleSequentialSqrt = sequentialSqrt;
      exports2.scaleSequentialSymlog = sequentialSymlog;
      exports2.scaleSqrt = sqrt;
      exports2.scaleSymlog = symlog;
      exports2.scaleThreshold = threshold;
      exports2.scaleTime = time;
      exports2.scaleUtc = utcTime;
      exports2.tickFormat = tickFormat;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-scale-chromatic/dist/d3-scale-chromatic.js
  var require_d3_scale_chromatic = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_d3_interpolate(), require_d3_color()) : typeof define === "function" && define.amd ? define(["exports", "d3-interpolate", "d3-color"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}, global.d3, global.d3));
    })(exports, function(exports2, d3Interpolate, d3Color) {
      "use strict";
      function colors(specifier) {
        var n = specifier.length / 6 | 0, colors2 = new Array(n), i = 0;
        while (i < n)
          colors2[i] = "#" + specifier.slice(i * 6, ++i * 6);
        return colors2;
      }
      var category10 = colors("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
      var Accent = colors("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");
      var Dark2 = colors("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");
      var Paired = colors("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");
      var Pastel1 = colors("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");
      var Pastel2 = colors("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");
      var Set1 = colors("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");
      var Set2 = colors("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");
      var Set3 = colors("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");
      var Tableau10 = colors("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");
      var ramp = (scheme2) => d3Interpolate.interpolateRgbBasis(scheme2[scheme2.length - 1]);
      var scheme = new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(colors);
      var BrBG = ramp(scheme);
      var scheme$1 = new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(colors);
      var PRGn = ramp(scheme$1);
      var scheme$2 = new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(colors);
      var PiYG = ramp(scheme$2);
      var scheme$3 = new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(colors);
      var PuOr = ramp(scheme$3);
      var scheme$4 = new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(colors);
      var RdBu = ramp(scheme$4);
      var scheme$5 = new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(colors);
      var RdGy = ramp(scheme$5);
      var scheme$6 = new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(colors);
      var RdYlBu = ramp(scheme$6);
      var scheme$7 = new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(colors);
      var RdYlGn = ramp(scheme$7);
      var scheme$8 = new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(colors);
      var Spectral = ramp(scheme$8);
      var scheme$9 = new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(colors);
      var BuGn = ramp(scheme$9);
      var scheme$a = new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(colors);
      var BuPu = ramp(scheme$a);
      var scheme$b = new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(colors);
      var GnBu = ramp(scheme$b);
      var scheme$c = new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(colors);
      var OrRd = ramp(scheme$c);
      var scheme$d = new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(colors);
      var PuBuGn = ramp(scheme$d);
      var scheme$e = new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(colors);
      var PuBu = ramp(scheme$e);
      var scheme$f = new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(colors);
      var PuRd = ramp(scheme$f);
      var scheme$g = new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(colors);
      var RdPu = ramp(scheme$g);
      var scheme$h = new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(colors);
      var YlGnBu = ramp(scheme$h);
      var scheme$i = new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(colors);
      var YlGn = ramp(scheme$i);
      var scheme$j = new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(colors);
      var YlOrBr = ramp(scheme$j);
      var scheme$k = new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(colors);
      var YlOrRd = ramp(scheme$k);
      var scheme$l = new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(colors);
      var Blues = ramp(scheme$l);
      var scheme$m = new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(colors);
      var Greens = ramp(scheme$m);
      var scheme$n = new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(colors);
      var Greys = ramp(scheme$n);
      var scheme$o = new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(colors);
      var Purples = ramp(scheme$o);
      var scheme$p = new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(colors);
      var Reds = ramp(scheme$p);
      var scheme$q = new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(colors);
      var Oranges = ramp(scheme$q);
      function cividis(t) {
        t = Math.max(0, Math.min(1, t));
        return "rgb(" + Math.max(0, Math.min(255, Math.round(-4.54 - t * (35.34 - t * (2381.73 - t * (6402.7 - t * (7024.72 - t * 2710.57))))))) + ", " + Math.max(0, Math.min(255, Math.round(32.49 + t * (170.73 + t * (52.82 - t * (131.46 - t * (176.58 - t * 67.37))))))) + ", " + Math.max(0, Math.min(255, Math.round(81.24 + t * (442.36 - t * (2482.43 - t * (6167.24 - t * (6614.94 - t * 2475.67))))))) + ")";
      }
      var cubehelix = d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(300, 0.5, 0), d3Color.cubehelix(-240, 0.5, 1));
      var warm = d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(-100, 0.75, 0.35), d3Color.cubehelix(80, 1.5, 0.8));
      var cool = d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(260, 0.75, 0.35), d3Color.cubehelix(80, 1.5, 0.8));
      var c = d3Color.cubehelix();
      function rainbow(t) {
        if (t < 0 || t > 1)
          t -= Math.floor(t);
        var ts = Math.abs(t - 0.5);
        c.h = 360 * t - 100;
        c.s = 1.5 - 1.5 * ts;
        c.l = 0.8 - 0.9 * ts;
        return c + "";
      }
      var c$1 = d3Color.rgb(), pi_1_3 = Math.PI / 3, pi_2_3 = Math.PI * 2 / 3;
      function sinebow(t) {
        var x;
        t = (0.5 - t) * Math.PI;
        c$1.r = 255 * (x = Math.sin(t)) * x;
        c$1.g = 255 * (x = Math.sin(t + pi_1_3)) * x;
        c$1.b = 255 * (x = Math.sin(t + pi_2_3)) * x;
        return c$1 + "";
      }
      function turbo(t) {
        t = Math.max(0, Math.min(1, t));
        return "rgb(" + Math.max(0, Math.min(255, Math.round(34.61 + t * (1172.33 - t * (10793.56 - t * (33300.12 - t * (38394.49 - t * 14825.05))))))) + ", " + Math.max(0, Math.min(255, Math.round(23.31 + t * (557.33 + t * (1225.33 - t * (3574.96 - t * (1073.77 + t * 707.56))))))) + ", " + Math.max(0, Math.min(255, Math.round(27.2 + t * (3211.1 - t * (15327.97 - t * (27814 - t * (22569.18 - t * 6838.66))))))) + ")";
      }
      function ramp$1(range) {
        var n = range.length;
        return function(t) {
          return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
        };
      }
      var viridis = ramp$1(colors("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
      var magma = ramp$1(colors("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
      var inferno = ramp$1(colors("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
      var plasma = ramp$1(colors("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
      exports2.interpolateBlues = Blues;
      exports2.interpolateBrBG = BrBG;
      exports2.interpolateBuGn = BuGn;
      exports2.interpolateBuPu = BuPu;
      exports2.interpolateCividis = cividis;
      exports2.interpolateCool = cool;
      exports2.interpolateCubehelixDefault = cubehelix;
      exports2.interpolateGnBu = GnBu;
      exports2.interpolateGreens = Greens;
      exports2.interpolateGreys = Greys;
      exports2.interpolateInferno = inferno;
      exports2.interpolateMagma = magma;
      exports2.interpolateOrRd = OrRd;
      exports2.interpolateOranges = Oranges;
      exports2.interpolatePRGn = PRGn;
      exports2.interpolatePiYG = PiYG;
      exports2.interpolatePlasma = plasma;
      exports2.interpolatePuBu = PuBu;
      exports2.interpolatePuBuGn = PuBuGn;
      exports2.interpolatePuOr = PuOr;
      exports2.interpolatePuRd = PuRd;
      exports2.interpolatePurples = Purples;
      exports2.interpolateRainbow = rainbow;
      exports2.interpolateRdBu = RdBu;
      exports2.interpolateRdGy = RdGy;
      exports2.interpolateRdPu = RdPu;
      exports2.interpolateRdYlBu = RdYlBu;
      exports2.interpolateRdYlGn = RdYlGn;
      exports2.interpolateReds = Reds;
      exports2.interpolateSinebow = sinebow;
      exports2.interpolateSpectral = Spectral;
      exports2.interpolateTurbo = turbo;
      exports2.interpolateViridis = viridis;
      exports2.interpolateWarm = warm;
      exports2.interpolateYlGn = YlGn;
      exports2.interpolateYlGnBu = YlGnBu;
      exports2.interpolateYlOrBr = YlOrBr;
      exports2.interpolateYlOrRd = YlOrRd;
      exports2.schemeAccent = Accent;
      exports2.schemeBlues = scheme$l;
      exports2.schemeBrBG = scheme;
      exports2.schemeBuGn = scheme$9;
      exports2.schemeBuPu = scheme$a;
      exports2.schemeCategory10 = category10;
      exports2.schemeDark2 = Dark2;
      exports2.schemeGnBu = scheme$b;
      exports2.schemeGreens = scheme$m;
      exports2.schemeGreys = scheme$n;
      exports2.schemeOrRd = scheme$c;
      exports2.schemeOranges = scheme$q;
      exports2.schemePRGn = scheme$1;
      exports2.schemePaired = Paired;
      exports2.schemePastel1 = Pastel1;
      exports2.schemePastel2 = Pastel2;
      exports2.schemePiYG = scheme$2;
      exports2.schemePuBu = scheme$e;
      exports2.schemePuBuGn = scheme$d;
      exports2.schemePuOr = scheme$3;
      exports2.schemePuRd = scheme$f;
      exports2.schemePurples = scheme$o;
      exports2.schemeRdBu = scheme$4;
      exports2.schemeRdGy = scheme$5;
      exports2.schemeRdPu = scheme$g;
      exports2.schemeRdYlBu = scheme$6;
      exports2.schemeRdYlGn = scheme$7;
      exports2.schemeReds = scheme$p;
      exports2.schemeSet1 = Set1;
      exports2.schemeSet2 = Set2;
      exports2.schemeSet3 = Set3;
      exports2.schemeSpectral = scheme$8;
      exports2.schemeTableau10 = Tableau10;
      exports2.schemeYlGn = scheme$i;
      exports2.schemeYlGnBu = scheme$h;
      exports2.schemeYlOrBr = scheme$j;
      exports2.schemeYlOrRd = scheme$k;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-shape/dist/d3-shape.js
  var require_d3_shape = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_d3_path()) : typeof define === "function" && define.amd ? define(["exports", "d3-path"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}, global.d3));
    })(exports, function(exports2, d3Path) {
      "use strict";
      function constant(x2) {
        return function constant2() {
          return x2;
        };
      }
      var abs = Math.abs;
      var atan2 = Math.atan2;
      var cos = Math.cos;
      var max = Math.max;
      var min = Math.min;
      var sin = Math.sin;
      var sqrt = Math.sqrt;
      var epsilon = 1e-12;
      var pi = Math.PI;
      var halfPi = pi / 2;
      var tau = 2 * pi;
      function acos(x2) {
        return x2 > 1 ? 0 : x2 < -1 ? pi : Math.acos(x2);
      }
      function asin(x2) {
        return x2 >= 1 ? halfPi : x2 <= -1 ? -halfPi : Math.asin(x2);
      }
      function arcInnerRadius(d) {
        return d.innerRadius;
      }
      function arcOuterRadius(d) {
        return d.outerRadius;
      }
      function arcStartAngle(d) {
        return d.startAngle;
      }
      function arcEndAngle(d) {
        return d.endAngle;
      }
      function arcPadAngle(d) {
        return d && d.padAngle;
      }
      function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
        var x10 = x1 - x0, y10 = y1 - y0, x32 = x3 - x2, y32 = y3 - y2, t = y32 * x10 - x32 * y10;
        if (t * t < epsilon)
          return;
        t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
        return [x0 + t * x10, y0 + t * y10];
      }
      function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
        var x01 = x0 - x1, y01 = y0 - y1, lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01), ox = lo * y01, oy = -lo * x01, x11 = x0 + ox, y11 = y0 + oy, x10 = x1 + ox, y10 = y1 + oy, x00 = (x11 + x10) / 2, y00 = (y11 + y10) / 2, dx = x10 - x11, dy = y10 - y11, d2 = dx * dx + dy * dy, r = r1 - rc, D = x11 * y10 - x10 * y11, d = (dy < 0 ? -1 : 1) * sqrt(max(0, r * r * d2 - D * D)), cx0 = (D * dy - dx * d) / d2, cy0 = (-D * dx - dy * d) / d2, cx1 = (D * dy + dx * d) / d2, cy1 = (-D * dx + dy * d) / d2, dx0 = cx0 - x00, dy0 = cy0 - y00, dx1 = cx1 - x00, dy1 = cy1 - y00;
        if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1)
          cx0 = cx1, cy0 = cy1;
        return {
          cx: cx0,
          cy: cy0,
          x01: -ox,
          y01: -oy,
          x11: cx0 * (r1 / r - 1),
          y11: cy0 * (r1 / r - 1)
        };
      }
      function arc() {
        var innerRadius = arcInnerRadius, outerRadius = arcOuterRadius, cornerRadius = constant(0), padRadius = null, startAngle = arcStartAngle, endAngle = arcEndAngle, padAngle = arcPadAngle, context = null;
        function arc2() {
          var buffer, r, r0 = +innerRadius.apply(this, arguments), r1 = +outerRadius.apply(this, arguments), a0 = startAngle.apply(this, arguments) - halfPi, a1 = endAngle.apply(this, arguments) - halfPi, da = abs(a1 - a0), cw = a1 > a0;
          if (!context)
            context = buffer = d3Path.path();
          if (r1 < r0)
            r = r1, r1 = r0, r0 = r;
          if (!(r1 > epsilon))
            context.moveTo(0, 0);
          else if (da > tau - epsilon) {
            context.moveTo(r1 * cos(a0), r1 * sin(a0));
            context.arc(0, 0, r1, a0, a1, !cw);
            if (r0 > epsilon) {
              context.moveTo(r0 * cos(a1), r0 * sin(a1));
              context.arc(0, 0, r0, a1, a0, cw);
            }
          } else {
            var a01 = a0, a11 = a1, a00 = a0, a10 = a1, da0 = da, da1 = da, ap = padAngle.apply(this, arguments) / 2, rp = ap > epsilon && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)), rc = min(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)), rc0 = rc, rc1 = rc, t0, t1;
            if (rp > epsilon) {
              var p0 = asin(rp / r0 * sin(ap)), p1 = asin(rp / r1 * sin(ap));
              if ((da0 -= p0 * 2) > epsilon)
                p0 *= cw ? 1 : -1, a00 += p0, a10 -= p0;
              else
                da0 = 0, a00 = a10 = (a0 + a1) / 2;
              if ((da1 -= p1 * 2) > epsilon)
                p1 *= cw ? 1 : -1, a01 += p1, a11 -= p1;
              else
                da1 = 0, a01 = a11 = (a0 + a1) / 2;
            }
            var x01 = r1 * cos(a01), y01 = r1 * sin(a01), x10 = r0 * cos(a10), y10 = r0 * sin(a10);
            if (rc > epsilon) {
              var x11 = r1 * cos(a11), y11 = r1 * sin(a11), x00 = r0 * cos(a00), y00 = r0 * sin(a00), oc;
              if (da < pi && (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10))) {
                var ax = x01 - oc[0], ay = y01 - oc[1], bx = x11 - oc[0], by = y11 - oc[1], kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2), lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
                rc0 = min(rc, (r0 - lc) / (kc - 1));
                rc1 = min(rc, (r1 - lc) / (kc + 1));
              }
            }
            if (!(da1 > epsilon))
              context.moveTo(x01, y01);
            else if (rc1 > epsilon) {
              t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
              t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
              context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);
              if (rc1 < rc)
                context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);
              else {
                context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
                context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
                context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
              }
            } else
              context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);
            if (!(r0 > epsilon) || !(da0 > epsilon))
              context.lineTo(x10, y10);
            else if (rc0 > epsilon) {
              t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
              t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);
              context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);
              if (rc0 < rc)
                context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);
              else {
                context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
                context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
                context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
              }
            } else
              context.arc(0, 0, r0, a10, a00, cw);
          }
          context.closePath();
          if (buffer)
            return context = null, buffer + "" || null;
        }
        arc2.centroid = function() {
          var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2, a2 = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
          return [cos(a2) * r, sin(a2) * r];
        };
        arc2.innerRadius = function(_) {
          return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), arc2) : innerRadius;
        };
        arc2.outerRadius = function(_) {
          return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant(+_), arc2) : outerRadius;
        };
        arc2.cornerRadius = function(_) {
          return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant(+_), arc2) : cornerRadius;
        };
        arc2.padRadius = function(_) {
          return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant(+_), arc2) : padRadius;
        };
        arc2.startAngle = function(_) {
          return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), arc2) : startAngle;
        };
        arc2.endAngle = function(_) {
          return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), arc2) : endAngle;
        };
        arc2.padAngle = function(_) {
          return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), arc2) : padAngle;
        };
        arc2.context = function(_) {
          return arguments.length ? (context = _ == null ? null : _, arc2) : context;
        };
        return arc2;
      }
      var slice = Array.prototype.slice;
      function array(x2) {
        return typeof x2 === "object" && "length" in x2 ? x2 : Array.from(x2);
      }
      function Linear(context) {
        this._context = context;
      }
      Linear.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._point = 0;
        },
        lineEnd: function() {
          if (this._line || this._line !== 0 && this._point === 1)
            this._context.closePath();
          this._line = 1 - this._line;
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          switch (this._point) {
            case 0:
              this._point = 1;
              this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
              break;
            case 1:
              this._point = 2;
            default:
              this._context.lineTo(x2, y2);
              break;
          }
        }
      };
      function curveLinear(context) {
        return new Linear(context);
      }
      function x(p) {
        return p[0];
      }
      function y(p) {
        return p[1];
      }
      function line(x$1, y$1) {
        var defined = constant(true), context = null, curve = curveLinear, output = null;
        x$1 = typeof x$1 === "function" ? x$1 : x$1 === void 0 ? x : constant(x$1);
        y$1 = typeof y$1 === "function" ? y$1 : y$1 === void 0 ? y : constant(y$1);
        function line2(data) {
          var i, n = (data = array(data)).length, d, defined0 = false, buffer;
          if (context == null)
            output = curve(buffer = d3Path.path());
          for (i = 0; i <= n; ++i) {
            if (!(i < n && defined(d = data[i], i, data)) === defined0) {
              if (defined0 = !defined0)
                output.lineStart();
              else
                output.lineEnd();
            }
            if (defined0)
              output.point(+x$1(d, i, data), +y$1(d, i, data));
          }
          if (buffer)
            return output = null, buffer + "" || null;
        }
        line2.x = function(_) {
          return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant(+_), line2) : x$1;
        };
        line2.y = function(_) {
          return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant(+_), line2) : y$1;
        };
        line2.defined = function(_) {
          return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line2) : defined;
        };
        line2.curve = function(_) {
          return arguments.length ? (curve = _, context != null && (output = curve(context)), line2) : curve;
        };
        line2.context = function(_) {
          return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line2) : context;
        };
        return line2;
      }
      function area(x0, y0, y1) {
        var x1 = null, defined = constant(true), context = null, curve = curveLinear, output = null;
        x0 = typeof x0 === "function" ? x0 : x0 === void 0 ? x : constant(+x0);
        y0 = typeof y0 === "function" ? y0 : y0 === void 0 ? constant(0) : constant(+y0);
        y1 = typeof y1 === "function" ? y1 : y1 === void 0 ? y : constant(+y1);
        function area2(data) {
          var i, j, k2, n = (data = array(data)).length, d, defined0 = false, buffer, x0z = new Array(n), y0z = new Array(n);
          if (context == null)
            output = curve(buffer = d3Path.path());
          for (i = 0; i <= n; ++i) {
            if (!(i < n && defined(d = data[i], i, data)) === defined0) {
              if (defined0 = !defined0) {
                j = i;
                output.areaStart();
                output.lineStart();
              } else {
                output.lineEnd();
                output.lineStart();
                for (k2 = i - 1; k2 >= j; --k2) {
                  output.point(x0z[k2], y0z[k2]);
                }
                output.lineEnd();
                output.areaEnd();
              }
            }
            if (defined0) {
              x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
              output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
            }
          }
          if (buffer)
            return output = null, buffer + "" || null;
        }
        function arealine() {
          return line().defined(defined).curve(curve).context(context);
        }
        area2.x = function(_) {
          return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), x1 = null, area2) : x0;
        };
        area2.x0 = function(_) {
          return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), area2) : x0;
        };
        area2.x1 = function(_) {
          return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area2) : x1;
        };
        area2.y = function(_) {
          return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), y1 = null, area2) : y0;
        };
        area2.y0 = function(_) {
          return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), area2) : y0;
        };
        area2.y1 = function(_) {
          return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area2) : y1;
        };
        area2.lineX0 = area2.lineY0 = function() {
          return arealine().x(x0).y(y0);
        };
        area2.lineY1 = function() {
          return arealine().x(x0).y(y1);
        };
        area2.lineX1 = function() {
          return arealine().x(x1).y(y0);
        };
        area2.defined = function(_) {
          return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), area2) : defined;
        };
        area2.curve = function(_) {
          return arguments.length ? (curve = _, context != null && (output = curve(context)), area2) : curve;
        };
        area2.context = function(_) {
          return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area2) : context;
        };
        return area2;
      }
      function descending(a2, b) {
        return b < a2 ? -1 : b > a2 ? 1 : b >= a2 ? 0 : NaN;
      }
      function identity(d) {
        return d;
      }
      function pie() {
        var value = identity, sortValues = descending, sort = null, startAngle = constant(0), endAngle = constant(tau), padAngle = constant(0);
        function pie2(data) {
          var i, n = (data = array(data)).length, j, k2, sum2 = 0, index = new Array(n), arcs = new Array(n), a0 = +startAngle.apply(this, arguments), da = Math.min(tau, Math.max(-tau, endAngle.apply(this, arguments) - a0)), a1, p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)), pa = p * (da < 0 ? -1 : 1), v;
          for (i = 0; i < n; ++i) {
            if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
              sum2 += v;
            }
          }
          if (sortValues != null)
            index.sort(function(i2, j2) {
              return sortValues(arcs[i2], arcs[j2]);
            });
          else if (sort != null)
            index.sort(function(i2, j2) {
              return sort(data[i2], data[j2]);
            });
          for (i = 0, k2 = sum2 ? (da - n * pa) / sum2 : 0; i < n; ++i, a0 = a1) {
            j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k2 : 0) + pa, arcs[j] = {
              data: data[j],
              index: i,
              value: v,
              startAngle: a0,
              endAngle: a1,
              padAngle: p
            };
          }
          return arcs;
        }
        pie2.value = function(_) {
          return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), pie2) : value;
        };
        pie2.sortValues = function(_) {
          return arguments.length ? (sortValues = _, sort = null, pie2) : sortValues;
        };
        pie2.sort = function(_) {
          return arguments.length ? (sort = _, sortValues = null, pie2) : sort;
        };
        pie2.startAngle = function(_) {
          return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), pie2) : startAngle;
        };
        pie2.endAngle = function(_) {
          return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), pie2) : endAngle;
        };
        pie2.padAngle = function(_) {
          return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), pie2) : padAngle;
        };
        return pie2;
      }
      var curveRadialLinear = curveRadial(curveLinear);
      function Radial(curve) {
        this._curve = curve;
      }
      Radial.prototype = {
        areaStart: function() {
          this._curve.areaStart();
        },
        areaEnd: function() {
          this._curve.areaEnd();
        },
        lineStart: function() {
          this._curve.lineStart();
        },
        lineEnd: function() {
          this._curve.lineEnd();
        },
        point: function(a2, r) {
          this._curve.point(r * Math.sin(a2), r * -Math.cos(a2));
        }
      };
      function curveRadial(curve) {
        function radial(context) {
          return new Radial(curve(context));
        }
        radial._curve = curve;
        return radial;
      }
      function lineRadial(l) {
        var c2 = l.curve;
        l.angle = l.x, delete l.x;
        l.radius = l.y, delete l.y;
        l.curve = function(_) {
          return arguments.length ? c2(curveRadial(_)) : c2()._curve;
        };
        return l;
      }
      function lineRadial$1() {
        return lineRadial(line().curve(curveRadialLinear));
      }
      function areaRadial() {
        var a2 = area().curve(curveRadialLinear), c2 = a2.curve, x0 = a2.lineX0, x1 = a2.lineX1, y0 = a2.lineY0, y1 = a2.lineY1;
        a2.angle = a2.x, delete a2.x;
        a2.startAngle = a2.x0, delete a2.x0;
        a2.endAngle = a2.x1, delete a2.x1;
        a2.radius = a2.y, delete a2.y;
        a2.innerRadius = a2.y0, delete a2.y0;
        a2.outerRadius = a2.y1, delete a2.y1;
        a2.lineStartAngle = function() {
          return lineRadial(x0());
        }, delete a2.lineX0;
        a2.lineEndAngle = function() {
          return lineRadial(x1());
        }, delete a2.lineX1;
        a2.lineInnerRadius = function() {
          return lineRadial(y0());
        }, delete a2.lineY0;
        a2.lineOuterRadius = function() {
          return lineRadial(y1());
        }, delete a2.lineY1;
        a2.curve = function(_) {
          return arguments.length ? c2(curveRadial(_)) : c2()._curve;
        };
        return a2;
      }
      function pointRadial(x2, y2) {
        return [(y2 = +y2) * Math.cos(x2 -= Math.PI / 2), y2 * Math.sin(x2)];
      }
      function linkSource(d) {
        return d.source;
      }
      function linkTarget(d) {
        return d.target;
      }
      function link(curve) {
        var source = linkSource, target = linkTarget, x$1 = x, y$1 = y, context = null;
        function link2() {
          var buffer, argv = slice.call(arguments), s2 = source.apply(this, argv), t = target.apply(this, argv);
          if (!context)
            context = buffer = d3Path.path();
          curve(context, +x$1.apply(this, (argv[0] = s2, argv)), +y$1.apply(this, argv), +x$1.apply(this, (argv[0] = t, argv)), +y$1.apply(this, argv));
          if (buffer)
            return context = null, buffer + "" || null;
        }
        link2.source = function(_) {
          return arguments.length ? (source = _, link2) : source;
        };
        link2.target = function(_) {
          return arguments.length ? (target = _, link2) : target;
        };
        link2.x = function(_) {
          return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant(+_), link2) : x$1;
        };
        link2.y = function(_) {
          return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant(+_), link2) : y$1;
        };
        link2.context = function(_) {
          return arguments.length ? (context = _ == null ? null : _, link2) : context;
        };
        return link2;
      }
      function curveHorizontal(context, x0, y0, x1, y1) {
        context.moveTo(x0, y0);
        context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
      }
      function curveVertical(context, x0, y0, x1, y1) {
        context.moveTo(x0, y0);
        context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
      }
      function curveRadial$1(context, x0, y0, x1, y1) {
        var p0 = pointRadial(x0, y0), p1 = pointRadial(x0, y0 = (y0 + y1) / 2), p2 = pointRadial(x1, y0), p3 = pointRadial(x1, y1);
        context.moveTo(p0[0], p0[1]);
        context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
      }
      function linkHorizontal() {
        return link(curveHorizontal);
      }
      function linkVertical() {
        return link(curveVertical);
      }
      function linkRadial() {
        var l = link(curveRadial$1);
        l.angle = l.x, delete l.x;
        l.radius = l.y, delete l.y;
        return l;
      }
      var circle = {
        draw: function(context, size) {
          var r = Math.sqrt(size / pi);
          context.moveTo(r, 0);
          context.arc(0, 0, r, 0, tau);
        }
      };
      var cross = {
        draw: function(context, size) {
          var r = Math.sqrt(size / 5) / 2;
          context.moveTo(-3 * r, -r);
          context.lineTo(-r, -r);
          context.lineTo(-r, -3 * r);
          context.lineTo(r, -3 * r);
          context.lineTo(r, -r);
          context.lineTo(3 * r, -r);
          context.lineTo(3 * r, r);
          context.lineTo(r, r);
          context.lineTo(r, 3 * r);
          context.lineTo(-r, 3 * r);
          context.lineTo(-r, r);
          context.lineTo(-3 * r, r);
          context.closePath();
        }
      };
      var tan30 = Math.sqrt(1 / 3), tan30_2 = tan30 * 2;
      var diamond = {
        draw: function(context, size) {
          var y2 = Math.sqrt(size / tan30_2), x2 = y2 * tan30;
          context.moveTo(0, -y2);
          context.lineTo(x2, 0);
          context.lineTo(0, y2);
          context.lineTo(-x2, 0);
          context.closePath();
        }
      };
      var ka = 0.8908130915292852, kr = Math.sin(pi / 10) / Math.sin(7 * pi / 10), kx = Math.sin(tau / 10) * kr, ky = -Math.cos(tau / 10) * kr;
      var star = {
        draw: function(context, size) {
          var r = Math.sqrt(size * ka), x2 = kx * r, y2 = ky * r;
          context.moveTo(0, -r);
          context.lineTo(x2, y2);
          for (var i = 1; i < 5; ++i) {
            var a2 = tau * i / 5, c2 = Math.cos(a2), s2 = Math.sin(a2);
            context.lineTo(s2 * r, -c2 * r);
            context.lineTo(c2 * x2 - s2 * y2, s2 * x2 + c2 * y2);
          }
          context.closePath();
        }
      };
      var square = {
        draw: function(context, size) {
          var w = Math.sqrt(size), x2 = -w / 2;
          context.rect(x2, x2, w, w);
        }
      };
      var sqrt3 = Math.sqrt(3);
      var triangle = {
        draw: function(context, size) {
          var y2 = -Math.sqrt(size / (sqrt3 * 3));
          context.moveTo(0, y2 * 2);
          context.lineTo(-sqrt3 * y2, -y2);
          context.lineTo(sqrt3 * y2, -y2);
          context.closePath();
        }
      };
      var c = -0.5, s = Math.sqrt(3) / 2, k = 1 / Math.sqrt(12), a = (k / 2 + 1) * 3;
      var wye = {
        draw: function(context, size) {
          var r = Math.sqrt(size / a), x0 = r / 2, y0 = r * k, x1 = x0, y1 = r * k + r, x2 = -x1, y2 = y1;
          context.moveTo(x0, y0);
          context.lineTo(x1, y1);
          context.lineTo(x2, y2);
          context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
          context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
          context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
          context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
          context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
          context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
          context.closePath();
        }
      };
      var symbols = [
        circle,
        cross,
        diamond,
        square,
        star,
        triangle,
        wye
      ];
      function symbol(type, size) {
        var context = null;
        type = typeof type === "function" ? type : constant(type || circle);
        size = typeof size === "function" ? size : constant(size === void 0 ? 64 : +size);
        function symbol2() {
          var buffer;
          if (!context)
            context = buffer = d3Path.path();
          type.apply(this, arguments).draw(context, +size.apply(this, arguments));
          if (buffer)
            return context = null, buffer + "" || null;
        }
        symbol2.type = function(_) {
          return arguments.length ? (type = typeof _ === "function" ? _ : constant(_), symbol2) : type;
        };
        symbol2.size = function(_) {
          return arguments.length ? (size = typeof _ === "function" ? _ : constant(+_), symbol2) : size;
        };
        symbol2.context = function(_) {
          return arguments.length ? (context = _ == null ? null : _, symbol2) : context;
        };
        return symbol2;
      }
      function noop() {
      }
      function point(that, x2, y2) {
        that._context.bezierCurveTo((2 * that._x0 + that._x1) / 3, (2 * that._y0 + that._y1) / 3, (that._x0 + 2 * that._x1) / 3, (that._y0 + 2 * that._y1) / 3, (that._x0 + 4 * that._x1 + x2) / 6, (that._y0 + 4 * that._y1 + y2) / 6);
      }
      function Basis(context) {
        this._context = context;
      }
      Basis.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._x0 = this._x1 = this._y0 = this._y1 = NaN;
          this._point = 0;
        },
        lineEnd: function() {
          switch (this._point) {
            case 3:
              point(this, this._x1, this._y1);
            case 2:
              this._context.lineTo(this._x1, this._y1);
              break;
          }
          if (this._line || this._line !== 0 && this._point === 1)
            this._context.closePath();
          this._line = 1 - this._line;
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          switch (this._point) {
            case 0:
              this._point = 1;
              this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              this._point = 3;
              this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
            default:
              point(this, x2, y2);
              break;
          }
          this._x0 = this._x1, this._x1 = x2;
          this._y0 = this._y1, this._y1 = y2;
        }
      };
      function basis(context) {
        return new Basis(context);
      }
      function BasisClosed(context) {
        this._context = context;
      }
      BasisClosed.prototype = {
        areaStart: noop,
        areaEnd: noop,
        lineStart: function() {
          this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
          this._point = 0;
        },
        lineEnd: function() {
          switch (this._point) {
            case 1: {
              this._context.moveTo(this._x2, this._y2);
              this._context.closePath();
              break;
            }
            case 2: {
              this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
              this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
              this._context.closePath();
              break;
            }
            case 3: {
              this.point(this._x2, this._y2);
              this.point(this._x3, this._y3);
              this.point(this._x4, this._y4);
              break;
            }
          }
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          switch (this._point) {
            case 0:
              this._point = 1;
              this._x2 = x2, this._y2 = y2;
              break;
            case 1:
              this._point = 2;
              this._x3 = x2, this._y3 = y2;
              break;
            case 2:
              this._point = 3;
              this._x4 = x2, this._y4 = y2;
              this._context.moveTo((this._x0 + 4 * this._x1 + x2) / 6, (this._y0 + 4 * this._y1 + y2) / 6);
              break;
            default:
              point(this, x2, y2);
              break;
          }
          this._x0 = this._x1, this._x1 = x2;
          this._y0 = this._y1, this._y1 = y2;
        }
      };
      function basisClosed(context) {
        return new BasisClosed(context);
      }
      function BasisOpen(context) {
        this._context = context;
      }
      BasisOpen.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._x0 = this._x1 = this._y0 = this._y1 = NaN;
          this._point = 0;
        },
        lineEnd: function() {
          if (this._line || this._line !== 0 && this._point === 3)
            this._context.closePath();
          this._line = 1 - this._line;
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          switch (this._point) {
            case 0:
              this._point = 1;
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              this._point = 3;
              var x0 = (this._x0 + 4 * this._x1 + x2) / 6, y0 = (this._y0 + 4 * this._y1 + y2) / 6;
              this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
              break;
            case 3:
              this._point = 4;
            default:
              point(this, x2, y2);
              break;
          }
          this._x0 = this._x1, this._x1 = x2;
          this._y0 = this._y1, this._y1 = y2;
        }
      };
      function basisOpen(context) {
        return new BasisOpen(context);
      }
      function Bundle(context, beta) {
        this._basis = new Basis(context);
        this._beta = beta;
      }
      Bundle.prototype = {
        lineStart: function() {
          this._x = [];
          this._y = [];
          this._basis.lineStart();
        },
        lineEnd: function() {
          var x2 = this._x, y2 = this._y, j = x2.length - 1;
          if (j > 0) {
            var x0 = x2[0], y0 = y2[0], dx = x2[j] - x0, dy = y2[j] - y0, i = -1, t;
            while (++i <= j) {
              t = i / j;
              this._basis.point(this._beta * x2[i] + (1 - this._beta) * (x0 + t * dx), this._beta * y2[i] + (1 - this._beta) * (y0 + t * dy));
            }
          }
          this._x = this._y = null;
          this._basis.lineEnd();
        },
        point: function(x2, y2) {
          this._x.push(+x2);
          this._y.push(+y2);
        }
      };
      var bundle = function custom(beta) {
        function bundle2(context) {
          return beta === 1 ? new Basis(context) : new Bundle(context, beta);
        }
        bundle2.beta = function(beta2) {
          return custom(+beta2);
        };
        return bundle2;
      }(0.85);
      function point$1(that, x2, y2) {
        that._context.bezierCurveTo(that._x1 + that._k * (that._x2 - that._x0), that._y1 + that._k * (that._y2 - that._y0), that._x2 + that._k * (that._x1 - x2), that._y2 + that._k * (that._y1 - y2), that._x2, that._y2);
      }
      function Cardinal(context, tension) {
        this._context = context;
        this._k = (1 - tension) / 6;
      }
      Cardinal.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
          this._point = 0;
        },
        lineEnd: function() {
          switch (this._point) {
            case 2:
              this._context.lineTo(this._x2, this._y2);
              break;
            case 3:
              point$1(this, this._x1, this._y1);
              break;
          }
          if (this._line || this._line !== 0 && this._point === 1)
            this._context.closePath();
          this._line = 1 - this._line;
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          switch (this._point) {
            case 0:
              this._point = 1;
              this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
              break;
            case 1:
              this._point = 2;
              this._x1 = x2, this._y1 = y2;
              break;
            case 2:
              this._point = 3;
            default:
              point$1(this, x2, y2);
              break;
          }
          this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
          this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
        }
      };
      var cardinal = function custom(tension) {
        function cardinal2(context) {
          return new Cardinal(context, tension);
        }
        cardinal2.tension = function(tension2) {
          return custom(+tension2);
        };
        return cardinal2;
      }(0);
      function CardinalClosed(context, tension) {
        this._context = context;
        this._k = (1 - tension) / 6;
      }
      CardinalClosed.prototype = {
        areaStart: noop,
        areaEnd: noop,
        lineStart: function() {
          this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
          this._point = 0;
        },
        lineEnd: function() {
          switch (this._point) {
            case 1: {
              this._context.moveTo(this._x3, this._y3);
              this._context.closePath();
              break;
            }
            case 2: {
              this._context.lineTo(this._x3, this._y3);
              this._context.closePath();
              break;
            }
            case 3: {
              this.point(this._x3, this._y3);
              this.point(this._x4, this._y4);
              this.point(this._x5, this._y5);
              break;
            }
          }
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          switch (this._point) {
            case 0:
              this._point = 1;
              this._x3 = x2, this._y3 = y2;
              break;
            case 1:
              this._point = 2;
              this._context.moveTo(this._x4 = x2, this._y4 = y2);
              break;
            case 2:
              this._point = 3;
              this._x5 = x2, this._y5 = y2;
              break;
            default:
              point$1(this, x2, y2);
              break;
          }
          this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
          this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
        }
      };
      var cardinalClosed = function custom(tension) {
        function cardinal2(context) {
          return new CardinalClosed(context, tension);
        }
        cardinal2.tension = function(tension2) {
          return custom(+tension2);
        };
        return cardinal2;
      }(0);
      function CardinalOpen(context, tension) {
        this._context = context;
        this._k = (1 - tension) / 6;
      }
      CardinalOpen.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
          this._point = 0;
        },
        lineEnd: function() {
          if (this._line || this._line !== 0 && this._point === 3)
            this._context.closePath();
          this._line = 1 - this._line;
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          switch (this._point) {
            case 0:
              this._point = 1;
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              this._point = 3;
              this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
              break;
            case 3:
              this._point = 4;
            default:
              point$1(this, x2, y2);
              break;
          }
          this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
          this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
        }
      };
      var cardinalOpen = function custom(tension) {
        function cardinal2(context) {
          return new CardinalOpen(context, tension);
        }
        cardinal2.tension = function(tension2) {
          return custom(+tension2);
        };
        return cardinal2;
      }(0);
      function point$2(that, x2, y2) {
        var x1 = that._x1, y1 = that._y1, x22 = that._x2, y22 = that._y2;
        if (that._l01_a > epsilon) {
          var a2 = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n = 3 * that._l01_a * (that._l01_a + that._l12_a);
          x1 = (x1 * a2 - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
          y1 = (y1 * a2 - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
        }
        if (that._l23_a > epsilon) {
          var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m = 3 * that._l23_a * (that._l23_a + that._l12_a);
          x22 = (x22 * b + that._x1 * that._l23_2a - x2 * that._l12_2a) / m;
          y22 = (y22 * b + that._y1 * that._l23_2a - y2 * that._l12_2a) / m;
        }
        that._context.bezierCurveTo(x1, y1, x22, y22, that._x2, that._y2);
      }
      function CatmullRom(context, alpha) {
        this._context = context;
        this._alpha = alpha;
      }
      CatmullRom.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
          this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
        },
        lineEnd: function() {
          switch (this._point) {
            case 2:
              this._context.lineTo(this._x2, this._y2);
              break;
            case 3:
              this.point(this._x2, this._y2);
              break;
          }
          if (this._line || this._line !== 0 && this._point === 1)
            this._context.closePath();
          this._line = 1 - this._line;
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          if (this._point) {
            var x23 = this._x2 - x2, y23 = this._y2 - y2;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
          }
          switch (this._point) {
            case 0:
              this._point = 1;
              this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              this._point = 3;
            default:
              point$2(this, x2, y2);
              break;
          }
          this._l01_a = this._l12_a, this._l12_a = this._l23_a;
          this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
          this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
          this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
        }
      };
      var catmullRom = function custom(alpha) {
        function catmullRom2(context) {
          return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
        }
        catmullRom2.alpha = function(alpha2) {
          return custom(+alpha2);
        };
        return catmullRom2;
      }(0.5);
      function CatmullRomClosed(context, alpha) {
        this._context = context;
        this._alpha = alpha;
      }
      CatmullRomClosed.prototype = {
        areaStart: noop,
        areaEnd: noop,
        lineStart: function() {
          this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
          this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
        },
        lineEnd: function() {
          switch (this._point) {
            case 1: {
              this._context.moveTo(this._x3, this._y3);
              this._context.closePath();
              break;
            }
            case 2: {
              this._context.lineTo(this._x3, this._y3);
              this._context.closePath();
              break;
            }
            case 3: {
              this.point(this._x3, this._y3);
              this.point(this._x4, this._y4);
              this.point(this._x5, this._y5);
              break;
            }
          }
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          if (this._point) {
            var x23 = this._x2 - x2, y23 = this._y2 - y2;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
          }
          switch (this._point) {
            case 0:
              this._point = 1;
              this._x3 = x2, this._y3 = y2;
              break;
            case 1:
              this._point = 2;
              this._context.moveTo(this._x4 = x2, this._y4 = y2);
              break;
            case 2:
              this._point = 3;
              this._x5 = x2, this._y5 = y2;
              break;
            default:
              point$2(this, x2, y2);
              break;
          }
          this._l01_a = this._l12_a, this._l12_a = this._l23_a;
          this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
          this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
          this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
        }
      };
      var catmullRomClosed = function custom(alpha) {
        function catmullRom2(context) {
          return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
        }
        catmullRom2.alpha = function(alpha2) {
          return custom(+alpha2);
        };
        return catmullRom2;
      }(0.5);
      function CatmullRomOpen(context, alpha) {
        this._context = context;
        this._alpha = alpha;
      }
      CatmullRomOpen.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
          this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
        },
        lineEnd: function() {
          if (this._line || this._line !== 0 && this._point === 3)
            this._context.closePath();
          this._line = 1 - this._line;
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          if (this._point) {
            var x23 = this._x2 - x2, y23 = this._y2 - y2;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
          }
          switch (this._point) {
            case 0:
              this._point = 1;
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              this._point = 3;
              this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
              break;
            case 3:
              this._point = 4;
            default:
              point$2(this, x2, y2);
              break;
          }
          this._l01_a = this._l12_a, this._l12_a = this._l23_a;
          this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
          this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
          this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
        }
      };
      var catmullRomOpen = function custom(alpha) {
        function catmullRom2(context) {
          return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
        }
        catmullRom2.alpha = function(alpha2) {
          return custom(+alpha2);
        };
        return catmullRom2;
      }(0.5);
      function LinearClosed(context) {
        this._context = context;
      }
      LinearClosed.prototype = {
        areaStart: noop,
        areaEnd: noop,
        lineStart: function() {
          this._point = 0;
        },
        lineEnd: function() {
          if (this._point)
            this._context.closePath();
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          if (this._point)
            this._context.lineTo(x2, y2);
          else
            this._point = 1, this._context.moveTo(x2, y2);
        }
      };
      function linearClosed(context) {
        return new LinearClosed(context);
      }
      function sign(x2) {
        return x2 < 0 ? -1 : 1;
      }
      function slope3(that, x2, y2) {
        var h0 = that._x1 - that._x0, h1 = x2 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0), p = (s0 * h1 + s1 * h0) / (h0 + h1);
        return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
      }
      function slope2(that, t) {
        var h = that._x1 - that._x0;
        return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
      }
      function point$3(that, t0, t1) {
        var x0 = that._x0, y0 = that._y0, x1 = that._x1, y1 = that._y1, dx = (x1 - x0) / 3;
        that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
      }
      function MonotoneX(context) {
        this._context = context;
      }
      MonotoneX.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
          this._point = 0;
        },
        lineEnd: function() {
          switch (this._point) {
            case 2:
              this._context.lineTo(this._x1, this._y1);
              break;
            case 3:
              point$3(this, this._t0, slope2(this, this._t0));
              break;
          }
          if (this._line || this._line !== 0 && this._point === 1)
            this._context.closePath();
          this._line = 1 - this._line;
        },
        point: function(x2, y2) {
          var t1 = NaN;
          x2 = +x2, y2 = +y2;
          if (x2 === this._x1 && y2 === this._y1)
            return;
          switch (this._point) {
            case 0:
              this._point = 1;
              this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              this._point = 3;
              point$3(this, slope2(this, t1 = slope3(this, x2, y2)), t1);
              break;
            default:
              point$3(this, this._t0, t1 = slope3(this, x2, y2));
              break;
          }
          this._x0 = this._x1, this._x1 = x2;
          this._y0 = this._y1, this._y1 = y2;
          this._t0 = t1;
        }
      };
      function MonotoneY(context) {
        this._context = new ReflectContext(context);
      }
      (MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x2, y2) {
        MonotoneX.prototype.point.call(this, y2, x2);
      };
      function ReflectContext(context) {
        this._context = context;
      }
      ReflectContext.prototype = {
        moveTo: function(x2, y2) {
          this._context.moveTo(y2, x2);
        },
        closePath: function() {
          this._context.closePath();
        },
        lineTo: function(x2, y2) {
          this._context.lineTo(y2, x2);
        },
        bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
          this._context.bezierCurveTo(y1, x1, y2, x2, y3, x3);
        }
      };
      function monotoneX(context) {
        return new MonotoneX(context);
      }
      function monotoneY(context) {
        return new MonotoneY(context);
      }
      function Natural(context) {
        this._context = context;
      }
      Natural.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._x = [];
          this._y = [];
        },
        lineEnd: function() {
          var x2 = this._x, y2 = this._y, n = x2.length;
          if (n) {
            this._line ? this._context.lineTo(x2[0], y2[0]) : this._context.moveTo(x2[0], y2[0]);
            if (n === 2) {
              this._context.lineTo(x2[1], y2[1]);
            } else {
              var px = controlPoints(x2), py = controlPoints(y2);
              for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
                this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x2[i1], y2[i1]);
              }
            }
          }
          if (this._line || this._line !== 0 && n === 1)
            this._context.closePath();
          this._line = 1 - this._line;
          this._x = this._y = null;
        },
        point: function(x2, y2) {
          this._x.push(+x2);
          this._y.push(+y2);
        }
      };
      function controlPoints(x2) {
        var i, n = x2.length - 1, m, a2 = new Array(n), b = new Array(n), r = new Array(n);
        a2[0] = 0, b[0] = 2, r[0] = x2[0] + 2 * x2[1];
        for (i = 1; i < n - 1; ++i)
          a2[i] = 1, b[i] = 4, r[i] = 4 * x2[i] + 2 * x2[i + 1];
        a2[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x2[n - 1] + x2[n];
        for (i = 1; i < n; ++i)
          m = a2[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
        a2[n - 1] = r[n - 1] / b[n - 1];
        for (i = n - 2; i >= 0; --i)
          a2[i] = (r[i] - a2[i + 1]) / b[i];
        b[n - 1] = (x2[n] + a2[n - 1]) / 2;
        for (i = 0; i < n - 1; ++i)
          b[i] = 2 * x2[i + 1] - a2[i + 1];
        return [a2, b];
      }
      function natural(context) {
        return new Natural(context);
      }
      function Step(context, t) {
        this._context = context;
        this._t = t;
      }
      Step.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._x = this._y = NaN;
          this._point = 0;
        },
        lineEnd: function() {
          if (0 < this._t && this._t < 1 && this._point === 2)
            this._context.lineTo(this._x, this._y);
          if (this._line || this._line !== 0 && this._point === 1)
            this._context.closePath();
          if (this._line >= 0)
            this._t = 1 - this._t, this._line = 1 - this._line;
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          switch (this._point) {
            case 0:
              this._point = 1;
              this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
              break;
            case 1:
              this._point = 2;
            default: {
              if (this._t <= 0) {
                this._context.lineTo(this._x, y2);
                this._context.lineTo(x2, y2);
              } else {
                var x1 = this._x * (1 - this._t) + x2 * this._t;
                this._context.lineTo(x1, this._y);
                this._context.lineTo(x1, y2);
              }
              break;
            }
          }
          this._x = x2, this._y = y2;
        }
      };
      function step(context) {
        return new Step(context, 0.5);
      }
      function stepBefore(context) {
        return new Step(context, 0);
      }
      function stepAfter(context) {
        return new Step(context, 1);
      }
      function none(series, order) {
        if (!((n = series.length) > 1))
          return;
        for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
          s0 = s1, s1 = series[order[i]];
          for (j = 0; j < m; ++j) {
            s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
          }
        }
      }
      function none$1(series) {
        var n = series.length, o = new Array(n);
        while (--n >= 0)
          o[n] = n;
        return o;
      }
      function stackValue(d, key) {
        return d[key];
      }
      function stackSeries(key) {
        const series = [];
        series.key = key;
        return series;
      }
      function stack() {
        var keys = constant([]), order = none$1, offset = none, value = stackValue;
        function stack2(data) {
          var sz = Array.from(keys.apply(this, arguments), stackSeries), i, n = sz.length, j = -1, oz;
          for (const d of data) {
            for (i = 0, ++j; i < n; ++i) {
              (sz[i][j] = [0, +value(d, sz[i].key, j, data)]).data = d;
            }
          }
          for (i = 0, oz = array(order(sz)); i < n; ++i) {
            sz[oz[i]].index = i;
          }
          offset(sz, oz);
          return sz;
        }
        stack2.keys = function(_) {
          return arguments.length ? (keys = typeof _ === "function" ? _ : constant(Array.from(_)), stack2) : keys;
        };
        stack2.value = function(_) {
          return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), stack2) : value;
        };
        stack2.order = function(_) {
          return arguments.length ? (order = _ == null ? none$1 : typeof _ === "function" ? _ : constant(Array.from(_)), stack2) : order;
        };
        stack2.offset = function(_) {
          return arguments.length ? (offset = _ == null ? none : _, stack2) : offset;
        };
        return stack2;
      }
      function expand(series, order) {
        if (!((n = series.length) > 0))
          return;
        for (var i, n, j = 0, m = series[0].length, y2; j < m; ++j) {
          for (y2 = i = 0; i < n; ++i)
            y2 += series[i][j][1] || 0;
          if (y2)
            for (i = 0; i < n; ++i)
              series[i][j][1] /= y2;
        }
        none(series, order);
      }
      function diverging(series, order) {
        if (!((n = series.length) > 0))
          return;
        for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
          for (yp = yn = 0, i = 0; i < n; ++i) {
            if ((dy = (d = series[order[i]][j])[1] - d[0]) > 0) {
              d[0] = yp, d[1] = yp += dy;
            } else if (dy < 0) {
              d[1] = yn, d[0] = yn += dy;
            } else {
              d[0] = 0, d[1] = dy;
            }
          }
        }
      }
      function silhouette(series, order) {
        if (!((n = series.length) > 0))
          return;
        for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
          for (var i = 0, y2 = 0; i < n; ++i)
            y2 += series[i][j][1] || 0;
          s0[j][1] += s0[j][0] = -y2 / 2;
        }
        none(series, order);
      }
      function wiggle(series, order) {
        if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0))
          return;
        for (var y2 = 0, j = 1, s0, m, n; j < m; ++j) {
          for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
            var si = series[order[i]], sij0 = si[j][1] || 0, sij1 = si[j - 1][1] || 0, s3 = (sij0 - sij1) / 2;
            for (var k2 = 0; k2 < i; ++k2) {
              var sk = series[order[k2]], skj0 = sk[j][1] || 0, skj1 = sk[j - 1][1] || 0;
              s3 += skj0 - skj1;
            }
            s1 += sij0, s2 += s3 * sij0;
          }
          s0[j - 1][1] += s0[j - 1][0] = y2;
          if (s1)
            y2 -= s2 / s1;
        }
        s0[j - 1][1] += s0[j - 1][0] = y2;
        none(series, order);
      }
      function appearance(series) {
        var peaks = series.map(peak);
        return none$1(series).sort(function(a2, b) {
          return peaks[a2] - peaks[b];
        });
      }
      function peak(series) {
        var i = -1, j = 0, n = series.length, vi, vj = -Infinity;
        while (++i < n)
          if ((vi = +series[i][1]) > vj)
            vj = vi, j = i;
        return j;
      }
      function ascending(series) {
        var sums = series.map(sum);
        return none$1(series).sort(function(a2, b) {
          return sums[a2] - sums[b];
        });
      }
      function sum(series) {
        var s2 = 0, i = -1, n = series.length, v;
        while (++i < n)
          if (v = +series[i][1])
            s2 += v;
        return s2;
      }
      function descending$1(series) {
        return ascending(series).reverse();
      }
      function insideOut(series) {
        var n = series.length, i, j, sums = series.map(sum), order = appearance(series), top = 0, bottom = 0, tops = [], bottoms = [];
        for (i = 0; i < n; ++i) {
          j = order[i];
          if (top < bottom) {
            top += sums[j];
            tops.push(j);
          } else {
            bottom += sums[j];
            bottoms.push(j);
          }
        }
        return bottoms.reverse().concat(tops);
      }
      function reverse(series) {
        return none$1(series).reverse();
      }
      exports2.arc = arc;
      exports2.area = area;
      exports2.areaRadial = areaRadial;
      exports2.curveBasis = basis;
      exports2.curveBasisClosed = basisClosed;
      exports2.curveBasisOpen = basisOpen;
      exports2.curveBundle = bundle;
      exports2.curveCardinal = cardinal;
      exports2.curveCardinalClosed = cardinalClosed;
      exports2.curveCardinalOpen = cardinalOpen;
      exports2.curveCatmullRom = catmullRom;
      exports2.curveCatmullRomClosed = catmullRomClosed;
      exports2.curveCatmullRomOpen = catmullRomOpen;
      exports2.curveLinear = curveLinear;
      exports2.curveLinearClosed = linearClosed;
      exports2.curveMonotoneX = monotoneX;
      exports2.curveMonotoneY = monotoneY;
      exports2.curveNatural = natural;
      exports2.curveStep = step;
      exports2.curveStepAfter = stepAfter;
      exports2.curveStepBefore = stepBefore;
      exports2.line = line;
      exports2.lineRadial = lineRadial$1;
      exports2.linkHorizontal = linkHorizontal;
      exports2.linkRadial = linkRadial;
      exports2.linkVertical = linkVertical;
      exports2.pie = pie;
      exports2.pointRadial = pointRadial;
      exports2.radialArea = areaRadial;
      exports2.radialLine = lineRadial$1;
      exports2.stack = stack;
      exports2.stackOffsetDiverging = diverging;
      exports2.stackOffsetExpand = expand;
      exports2.stackOffsetNone = none;
      exports2.stackOffsetSilhouette = silhouette;
      exports2.stackOffsetWiggle = wiggle;
      exports2.stackOrderAppearance = appearance;
      exports2.stackOrderAscending = ascending;
      exports2.stackOrderDescending = descending$1;
      exports2.stackOrderInsideOut = insideOut;
      exports2.stackOrderNone = none$1;
      exports2.stackOrderReverse = reverse;
      exports2.symbol = symbol;
      exports2.symbolCircle = circle;
      exports2.symbolCross = cross;
      exports2.symbolDiamond = diamond;
      exports2.symbolSquare = square;
      exports2.symbolStar = star;
      exports2.symbolTriangle = triangle;
      exports2.symbolWye = wye;
      exports2.symbols = symbols;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3-zoom/dist/d3-zoom.js
  var require_d3_zoom = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_d3_dispatch(), require_d3_drag(), require_d3_interpolate(), require_d3_selection(), require_d3_transition()) : typeof define === "function" && define.amd ? define(["exports", "d3-dispatch", "d3-drag", "d3-interpolate", "d3-selection", "d3-transition"], factory) : (global = global || self, factory(global.d3 = global.d3 || {}, global.d3, global.d3, global.d3, global.d3, global.d3));
    })(exports, function(exports2, d3Dispatch, d3Drag, d3Interpolate, d3Selection, d3Transition) {
      "use strict";
      var constant = (x) => () => x;
      function ZoomEvent(type, {
        sourceEvent,
        target,
        transform: transform2,
        dispatch
      }) {
        Object.defineProperties(this, {
          type: {value: type, enumerable: true, configurable: true},
          sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
          target: {value: target, enumerable: true, configurable: true},
          transform: {value: transform2, enumerable: true, configurable: true},
          _: {value: dispatch}
        });
      }
      function Transform(k, x, y) {
        this.k = k;
        this.x = x;
        this.y = y;
      }
      Transform.prototype = {
        constructor: Transform,
        scale: function(k) {
          return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
        },
        translate: function(x, y) {
          return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
        },
        apply: function(point) {
          return [point[0] * this.k + this.x, point[1] * this.k + this.y];
        },
        applyX: function(x) {
          return x * this.k + this.x;
        },
        applyY: function(y) {
          return y * this.k + this.y;
        },
        invert: function(location) {
          return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
        },
        invertX: function(x) {
          return (x - this.x) / this.k;
        },
        invertY: function(y) {
          return (y - this.y) / this.k;
        },
        rescaleX: function(x) {
          return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
        },
        rescaleY: function(y) {
          return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
        },
        toString: function() {
          return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
        }
      };
      var identity = new Transform(1, 0, 0);
      transform.prototype = Transform.prototype;
      function transform(node) {
        while (!node.__zoom)
          if (!(node = node.parentNode))
            return identity;
        return node.__zoom;
      }
      function nopropagation(event) {
        event.stopImmediatePropagation();
      }
      function noevent(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      function defaultFilter(event) {
        return (!event.ctrlKey || event.type === "wheel") && !event.button;
      }
      function defaultExtent() {
        var e = this;
        if (e instanceof SVGElement) {
          e = e.ownerSVGElement || e;
          if (e.hasAttribute("viewBox")) {
            e = e.viewBox.baseVal;
            return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
          }
          return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
        }
        return [[0, 0], [e.clientWidth, e.clientHeight]];
      }
      function defaultTransform() {
        return this.__zoom || identity;
      }
      function defaultWheelDelta(event) {
        return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 2e-3) * (event.ctrlKey ? 10 : 1);
      }
      function defaultTouchable() {
        return navigator.maxTouchPoints || "ontouchstart" in this;
      }
      function defaultConstrain(transform2, extent, translateExtent) {
        var dx0 = transform2.invertX(extent[0][0]) - translateExtent[0][0], dx1 = transform2.invertX(extent[1][0]) - translateExtent[1][0], dy0 = transform2.invertY(extent[0][1]) - translateExtent[0][1], dy1 = transform2.invertY(extent[1][1]) - translateExtent[1][1];
        return transform2.translate(dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1), dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1));
      }
      function zoom() {
        var filter = defaultFilter, extent = defaultExtent, constrain = defaultConstrain, wheelDelta = defaultWheelDelta, touchable = defaultTouchable, scaleExtent = [0, Infinity], translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]], duration = 250, interpolate = d3Interpolate.interpolateZoom, listeners = d3Dispatch.dispatch("start", "zoom", "end"), touchstarting, touchfirst, touchending, touchDelay = 500, wheelDelay = 150, clickDistance2 = 0, tapDistance = 10;
        function zoom2(selection) {
          selection.property("__zoom", defaultTransform).on("wheel.zoom", wheeled).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
        }
        zoom2.transform = function(collection, transform2, point, event) {
          var selection = collection.selection ? collection.selection() : collection;
          selection.property("__zoom", defaultTransform);
          if (collection !== selection) {
            schedule(collection, transform2, point, event);
          } else {
            selection.interrupt().each(function() {
              gesture(this, arguments).event(event).start().zoom(null, typeof transform2 === "function" ? transform2.apply(this, arguments) : transform2).end();
            });
          }
        };
        zoom2.scaleBy = function(selection, k, p, event) {
          zoom2.scaleTo(selection, function() {
            var k0 = this.__zoom.k, k1 = typeof k === "function" ? k.apply(this, arguments) : k;
            return k0 * k1;
          }, p, event);
        };
        zoom2.scaleTo = function(selection, k, p, event) {
          zoom2.transform(selection, function() {
            var e = extent.apply(this, arguments), t0 = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p, p1 = t0.invert(p0), k1 = typeof k === "function" ? k.apply(this, arguments) : k;
            return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
          }, p, event);
        };
        zoom2.translateBy = function(selection, x, y, event) {
          zoom2.transform(selection, function() {
            return constrain(this.__zoom.translate(typeof x === "function" ? x.apply(this, arguments) : x, typeof y === "function" ? y.apply(this, arguments) : y), extent.apply(this, arguments), translateExtent);
          }, null, event);
        };
        zoom2.translateTo = function(selection, x, y, p, event) {
          zoom2.transform(selection, function() {
            var e = extent.apply(this, arguments), t = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
            return constrain(identity.translate(p0[0], p0[1]).scale(t.k).translate(typeof x === "function" ? -x.apply(this, arguments) : -x, typeof y === "function" ? -y.apply(this, arguments) : -y), e, translateExtent);
          }, p, event);
        };
        function scale(transform2, k) {
          k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
          return k === transform2.k ? transform2 : new Transform(k, transform2.x, transform2.y);
        }
        function translate(transform2, p0, p1) {
          var x = p0[0] - p1[0] * transform2.k, y = p0[1] - p1[1] * transform2.k;
          return x === transform2.x && y === transform2.y ? transform2 : new Transform(transform2.k, x, y);
        }
        function centroid(extent2) {
          return [(+extent2[0][0] + +extent2[1][0]) / 2, (+extent2[0][1] + +extent2[1][1]) / 2];
        }
        function schedule(transition, transform2, point, event) {
          transition.on("start.zoom", function() {
            gesture(this, arguments).event(event).start();
          }).on("interrupt.zoom end.zoom", function() {
            gesture(this, arguments).event(event).end();
          }).tween("zoom", function() {
            var that = this, args = arguments, g = gesture(that, args).event(event), e = extent.apply(that, args), p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point, w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]), a = that.__zoom, b = typeof transform2 === "function" ? transform2.apply(that, args) : transform2, i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
            return function(t) {
              if (t === 1)
                t = b;
              else {
                var l = i(t), k = w / l[2];
                t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k);
              }
              g.zoom(null, t);
            };
          });
        }
        function gesture(that, args, clean) {
          return !clean && that.__zooming || new Gesture(that, args);
        }
        function Gesture(that, args) {
          this.that = that;
          this.args = args;
          this.active = 0;
          this.sourceEvent = null;
          this.extent = extent.apply(that, args);
          this.taps = 0;
        }
        Gesture.prototype = {
          event: function(event) {
            if (event)
              this.sourceEvent = event;
            return this;
          },
          start: function() {
            if (++this.active === 1) {
              this.that.__zooming = this;
              this.emit("start");
            }
            return this;
          },
          zoom: function(key, transform2) {
            if (this.mouse && key !== "mouse")
              this.mouse[1] = transform2.invert(this.mouse[0]);
            if (this.touch0 && key !== "touch")
              this.touch0[1] = transform2.invert(this.touch0[0]);
            if (this.touch1 && key !== "touch")
              this.touch1[1] = transform2.invert(this.touch1[0]);
            this.that.__zoom = transform2;
            this.emit("zoom");
            return this;
          },
          end: function() {
            if (--this.active === 0) {
              delete this.that.__zooming;
              this.emit("end");
            }
            return this;
          },
          emit: function(type) {
            var d = d3Selection.select(this.that).datum();
            listeners.call(type, this.that, new ZoomEvent(type, {
              sourceEvent: this.sourceEvent,
              target: zoom2,
              type,
              transform: this.that.__zoom,
              dispatch: listeners
            }), d);
          }
        };
        function wheeled(event, ...args) {
          if (!filter.apply(this, arguments))
            return;
          var g = gesture(this, args).event(event), t = this.__zoom, k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))), p = d3Selection.pointer(event);
          if (g.wheel) {
            if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
              g.mouse[1] = t.invert(g.mouse[0] = p);
            }
            clearTimeout(g.wheel);
          } else if (t.k === k)
            return;
          else {
            g.mouse = [p, t.invert(p)];
            d3Transition.interrupt(this);
            g.start();
          }
          noevent(event);
          g.wheel = setTimeout(wheelidled, wheelDelay);
          g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));
          function wheelidled() {
            g.wheel = null;
            g.end();
          }
        }
        function mousedowned(event, ...args) {
          if (touchending || !filter.apply(this, arguments))
            return;
          var g = gesture(this, args, true).event(event), v = d3Selection.select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true), p = d3Selection.pointer(event, currentTarget), currentTarget = event.currentTarget, x0 = event.clientX, y0 = event.clientY;
          d3Drag.dragDisable(event.view);
          nopropagation(event);
          g.mouse = [p, this.__zoom.invert(p)];
          d3Transition.interrupt(this);
          g.start();
          function mousemoved(event2) {
            noevent(event2);
            if (!g.moved) {
              var dx = event2.clientX - x0, dy = event2.clientY - y0;
              g.moved = dx * dx + dy * dy > clickDistance2;
            }
            g.event(event2).zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = d3Selection.pointer(event2, currentTarget), g.mouse[1]), g.extent, translateExtent));
          }
          function mouseupped(event2) {
            v.on("mousemove.zoom mouseup.zoom", null);
            d3Drag.dragEnable(event2.view, g.moved);
            noevent(event2);
            g.event(event2).end();
          }
        }
        function dblclicked(event, ...args) {
          if (!filter.apply(this, arguments))
            return;
          var t0 = this.__zoom, p0 = d3Selection.pointer(event.changedTouches ? event.changedTouches[0] : event, this), p1 = t0.invert(p0), k1 = t0.k * (event.shiftKey ? 0.5 : 2), t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);
          noevent(event);
          if (duration > 0)
            d3Selection.select(this).transition().duration(duration).call(schedule, t1, p0, event);
          else
            d3Selection.select(this).call(zoom2.transform, t1, p0, event);
        }
        function touchstarted(event, ...args) {
          if (!filter.apply(this, arguments))
            return;
          var touches = event.touches, n = touches.length, g = gesture(this, args, event.changedTouches.length === n).event(event), started, i, t, p;
          nopropagation(event);
          for (i = 0; i < n; ++i) {
            t = touches[i], p = d3Selection.pointer(t, this);
            p = [p, this.__zoom.invert(p), t.identifier];
            if (!g.touch0)
              g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
            else if (!g.touch1 && g.touch0[2] !== p[2])
              g.touch1 = p, g.taps = 0;
          }
          if (touchstarting)
            touchstarting = clearTimeout(touchstarting);
          if (started) {
            if (g.taps < 2)
              touchfirst = p[0], touchstarting = setTimeout(function() {
                touchstarting = null;
              }, touchDelay);
            d3Transition.interrupt(this);
            g.start();
          }
        }
        function touchmoved(event, ...args) {
          if (!this.__zooming)
            return;
          var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t, p, l;
          noevent(event);
          for (i = 0; i < n; ++i) {
            t = touches[i], p = d3Selection.pointer(t, this);
            if (g.touch0 && g.touch0[2] === t.identifier)
              g.touch0[0] = p;
            else if (g.touch1 && g.touch1[2] === t.identifier)
              g.touch1[0] = p;
          }
          t = g.that.__zoom;
          if (g.touch1) {
            var p0 = g.touch0[0], l0 = g.touch0[1], p1 = g.touch1[0], l1 = g.touch1[1], dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp, dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
            t = scale(t, Math.sqrt(dp / dl));
            p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
            l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
          } else if (g.touch0)
            p = g.touch0[0], l = g.touch0[1];
          else
            return;
          g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
        }
        function touchended(event, ...args) {
          if (!this.__zooming)
            return;
          var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t;
          nopropagation(event);
          if (touchending)
            clearTimeout(touchending);
          touchending = setTimeout(function() {
            touchending = null;
          }, touchDelay);
          for (i = 0; i < n; ++i) {
            t = touches[i];
            if (g.touch0 && g.touch0[2] === t.identifier)
              delete g.touch0;
            else if (g.touch1 && g.touch1[2] === t.identifier)
              delete g.touch1;
          }
          if (g.touch1 && !g.touch0)
            g.touch0 = g.touch1, delete g.touch1;
          if (g.touch0)
            g.touch0[1] = this.__zoom.invert(g.touch0[0]);
          else {
            g.end();
            if (g.taps === 2) {
              t = d3Selection.pointer(t, this);
              if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
                var p = d3Selection.select(this).on("dblclick.zoom");
                if (p)
                  p.apply(this, arguments);
              }
            }
          }
        }
        zoom2.wheelDelta = function(_) {
          return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant(+_), zoom2) : wheelDelta;
        };
        zoom2.filter = function(_) {
          return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), zoom2) : filter;
        };
        zoom2.touchable = function(_) {
          return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), zoom2) : touchable;
        };
        zoom2.extent = function(_) {
          return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom2) : extent;
        };
        zoom2.scaleExtent = function(_) {
          return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom2) : [scaleExtent[0], scaleExtent[1]];
        };
        zoom2.translateExtent = function(_) {
          return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom2) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
        };
        zoom2.constrain = function(_) {
          return arguments.length ? (constrain = _, zoom2) : constrain;
        };
        zoom2.duration = function(_) {
          return arguments.length ? (duration = +_, zoom2) : duration;
        };
        zoom2.interpolate = function(_) {
          return arguments.length ? (interpolate = _, zoom2) : interpolate;
        };
        zoom2.on = function() {
          var value = listeners.on.apply(listeners, arguments);
          return value === listeners ? zoom2 : value;
        };
        zoom2.clickDistance = function(_) {
          return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom2) : Math.sqrt(clickDistance2);
        };
        zoom2.tapDistance = function(_) {
          return arguments.length ? (tapDistance = +_, zoom2) : tapDistance;
        };
        return zoom2;
      }
      exports2.zoom = zoom;
      exports2.zoomIdentity = identity;
      exports2.zoomTransform = transform;
      Object.defineProperty(exports2, "__esModule", {value: true});
    });
  });

  // node_modules/d3/dist/d3.node.js
  var require_d3_node = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    var d3Array = require_d3_array();
    var d3Axis = require_d3_axis();
    var d3Brush = require_d3_brush();
    var d3Chord = require_d3_chord();
    var d3Color = require_d3_color();
    var d3Contour = require_d3_contour();
    var d3Delaunay = require_d3_delaunay();
    var d3Dispatch = require_d3_dispatch();
    var d3Drag = require_d3_drag();
    var d3Dsv = require_d3_dsv();
    var d3Ease = require_d3_ease();
    var d3Fetch = require_d3_fetch();
    var d3Force = require_d3_force();
    var d3Format = require_d3_format();
    var d3Geo = require_d3_geo();
    var d3Hierarchy = require_d3_hierarchy();
    var d3Interpolate = require_d3_interpolate();
    var d3Path = require_d3_path();
    var d3Polygon = require_d3_polygon();
    var d3Quadtree = require_d3_quadtree();
    var d3Random = require_d3_random();
    var d3Scale = require_d3_scale();
    var d3ScaleChromatic = require_d3_scale_chromatic();
    var d3Selection = require_d3_selection();
    var d3Shape = require_d3_shape();
    var d3Time = require_d3_time();
    var d3TimeFormat = require_d3_time_format();
    var d3Timer = require_d3_timer();
    var d3Transition = require_d3_transition();
    var d3Zoom = require_d3_zoom();
    var version = "6.3.1";
    Object.keys(d3Array).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Array[k];
          }
        });
    });
    Object.keys(d3Axis).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Axis[k];
          }
        });
    });
    Object.keys(d3Brush).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Brush[k];
          }
        });
    });
    Object.keys(d3Chord).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Chord[k];
          }
        });
    });
    Object.keys(d3Color).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Color[k];
          }
        });
    });
    Object.keys(d3Contour).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Contour[k];
          }
        });
    });
    Object.keys(d3Delaunay).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Delaunay[k];
          }
        });
    });
    Object.keys(d3Dispatch).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Dispatch[k];
          }
        });
    });
    Object.keys(d3Drag).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Drag[k];
          }
        });
    });
    Object.keys(d3Dsv).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Dsv[k];
          }
        });
    });
    Object.keys(d3Ease).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Ease[k];
          }
        });
    });
    Object.keys(d3Fetch).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Fetch[k];
          }
        });
    });
    Object.keys(d3Force).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Force[k];
          }
        });
    });
    Object.keys(d3Format).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Format[k];
          }
        });
    });
    Object.keys(d3Geo).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Geo[k];
          }
        });
    });
    Object.keys(d3Hierarchy).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Hierarchy[k];
          }
        });
    });
    Object.keys(d3Interpolate).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Interpolate[k];
          }
        });
    });
    Object.keys(d3Path).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Path[k];
          }
        });
    });
    Object.keys(d3Polygon).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Polygon[k];
          }
        });
    });
    Object.keys(d3Quadtree).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Quadtree[k];
          }
        });
    });
    Object.keys(d3Random).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Random[k];
          }
        });
    });
    Object.keys(d3Scale).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Scale[k];
          }
        });
    });
    Object.keys(d3ScaleChromatic).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3ScaleChromatic[k];
          }
        });
    });
    Object.keys(d3Selection).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Selection[k];
          }
        });
    });
    Object.keys(d3Shape).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Shape[k];
          }
        });
    });
    Object.keys(d3Time).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Time[k];
          }
        });
    });
    Object.keys(d3TimeFormat).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3TimeFormat[k];
          }
        });
    });
    Object.keys(d3Timer).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Timer[k];
          }
        });
    });
    Object.keys(d3Transition).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Transition[k];
          }
        });
    });
    Object.keys(d3Zoom).forEach(function(k) {
      if (k !== "default")
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Zoom[k];
          }
        });
    });
    exports.version = version;
  });

  // src/front/index.js
  var {json} = require_d3_node();
  var d3 = require_d3_node();
  var margin = {top: 30, right: 40, bottom: 30, left: 30};
  var width = 450 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;
  function updateData(data) {
    const svg = d3.select("#content");
    svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
    cnt = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    const y = d3.scaleLinear().domain([0, Math.max(...data.map((e) => e.h))]).range([height, 0]);
    const x = d3.scaleLinear().domain([0, data.length]).range([0, width]);
    cnt.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(x));
    cnt.append("g").attr("transform", `translate(${width},0)`).call(d3.axisRight(y));
    cnt.selectAll("circles").data(data).enter().append("circle").attr("cx", (d, i) => x(i)).attr("cy", (d) => y(d.h)).attr("r", 7);
  }
  function getData() {
    console.log("ready to get data!");
    fetch("/data").then((res) => res.json()).then((res) => {
      updateData(res);
    });
  }
  d3.select(window).on("load", getData);
})();
//# sourceMappingURL=index.js.map
