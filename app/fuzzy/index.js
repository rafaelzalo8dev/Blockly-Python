const getResult = function (options) {
  var variables = construct(options.variables_input),
      fuzzy_input = fuzzification(options.crisp_input, variables),
      out_combination = output_combination(fuzzy_input, options.inferences, options.variable_output),
      fuzzy_output = takeMaxOfArraySet(out_combination),
      crisp_output = defuzzification(fuzzy_output, constructVariable(options.variable_output.sets));

  return crisp_output;
}

const construct = function(variables) {
  var ob = [],
      i;

  for (i = variables.length - 1; i >= 0; i -= 1) {
      ob[i] = constructVariable(variables[i].sets);
  }

  return ob;
}

const constructVariable = function (f) {
  var obv = [],
      i;

  for (i = f.length - 1; i >= 0; i -= 1) {
      obv[i] = {
          a: f[i],
          firstPoint: (f[i][0] === f[i][1]) ? 1 : 0,
          lastPoint: (f[i][2] === f[i][3]) ? 1 : 0,
          mUp: (1 / (f[i][1] - f[i][0])),
          mDown: (1 / (f[i][3] - f[i][2]))
      };
  }
  return obv;
};

const fuzzification = function(input, variables) {
    var value = [],
        i;

    for (i = variables.length - 1; i >= 0; i -= 1) {
        value[i] = fuzzification_variable(input[i], variables[i]);
    }

    return value;
};

const fuzzification_variable = function(x, sets) {
    var valori = [],
        i;

    for (i = sets.length - 1; i >= 0; i -= 1) {
        valori[i] = fuzzification_function(x, sets[i]);
    }

    return valori;
};

const fuzzification_function = function(x, set) {
    var f = 0;

    if (x <= set.a[0]) {
        f = set.firstPoint;
    } else {
        if (x < set.a[1]) {
            f = set.mUp * (x - set.a[0]);
        } else {
            if (x <= set.a[2]) {
                f = 1;
            } else {
                if (x < set.a[3]) {
                    f = 1 - set.mDown * (x - set.a[2]);
                } else {
                    if (x >= set.a[3]) {
                        f = set.lastPoint;
                    }
                }
            }
        }
    }

    return f;
};

const output_combination = function(valori, inferences, variable_output) {
    var a = [],
        i,
        j;

    for (i = variable_output.sets.length - 1; i >= 0; i -= 1) {
        a[i] = [];
    }

    for (i = inferences.length - 1; i >= 0; i -= 1) {
        for (j = inferences[i].length - 1; j >= 0; j -= 1) {
            if (inferences[i][j] >= 0) {
                a[inferences[i][j]].push(valori[i][j]);
            }
        }
    }

    return a;
};

const defuzzification = function(outputSet, variable) {
    var num = 0,
        den = 0,
        i,
        v,
        point,
        h,
        b,
        a,
        a1,
        a2,
        area,
        y_baricentro,
        x_baricentro,
        amezzi,
        bmezzi,
        mmezzi;

    for (i = outputSet.length - 1; i >= 0; i -= 1) {
        v = variable[i];
        point = v.a;
        h = outputSet[i];
        b = point[3] - point[0];
        a1 = point[0];
        if (point[0] !== point[1]) {
            a1 += h / v.mUp;
        }
        a2 = point[3];
        if (point[2] !== point[3]) {
            a2 -= h / v.mDown;
        }
        area = 0;
        if (point[0] !== a1) {
            area += (a1 - point[0]) * outputSet[i] / 2;
        }
        if (a1 !== a2) {
            area += (a2 - a1) * outputSet[i];
        }
        if (a2 !== point[3]) {
            area += (point[3] - a2) * outputSet[i] / 2;
        }
        a = a2 - a1;
        y_baricentro = (h / 3) * (b + 2 * a) / (a + b);
        amezzi = a1 + (a2 - a1) / 2;
        bmezzi = point[0] + (point[3] - point[0]) / 2;
        mmezzi = 0;
        if (amezzi - bmezzi !== 0) {
            mmezzi = h / (amezzi - bmezzi);
        }
        x_baricentro = bmezzi;
        if (mmezzi !== 0) {
            x_baricentro += y_baricentro / mmezzi;
        }
        num += area * x_baricentro;
        den += area;
    }

    return (den === 0 ? 0 : (num / den));
};

const takeMaxOfArraySet = function(set) {
    var output = [],
        i;

    for (i = set.length - 1; i >= 0; i -= 1) {
        output[i] = takeMaxOfArray(set[i]);
    }

    return output;
};

const takeMaxOfArray = function(arr) {
    var max = arr[0],
        j;

    for (j = 1; j < arr.length; j += 1) {
        max = arr[j] > max ? arr[j] : max;
    }

    return max;
}

export default {
  getResult,
  construct,
  constructVariable,
  fuzzification,
  fuzzification_variable,
  fuzzification_function,
  output_combination,
  defuzzification,
  takeMaxOfArraySet,
  takeMaxOfArray
};
