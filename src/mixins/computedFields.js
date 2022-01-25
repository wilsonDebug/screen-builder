import _ from 'lodash';
import { Parser } from 'expr-eval';

export default {
  methods: {
    evaluateExpression(expression, type) {
      let value = null;

      try {
        const self = this;
        const merged = {};

        _.merge(merged, self.vdata, self._data);

        //monitor if variable belongs to data (defined variables) or vdata (external variables)
        //in this way the event is not executed again when the variable is update
        const data = new Proxy(merged, {
          get(data, name) {
            if (undefined !== data[name]) {
              return data[name];
            }

            return self.vdata[name];
          },
          set() {
            throw 'You are not allowed to set properties from inside an expression';
          },
        });

        if (type === 'expression') {
          value = Parser.evaluate(expression, data);
        } else {
          value = new Function(expression).bind(data)();
        }

        if (value instanceof Date) {
          value = value.toISOString();
        }

        return value;

      } catch (e) {
        e;
      }
    },
  },
};
