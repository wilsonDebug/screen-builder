import { get, isEqual, set } from 'lodash';
import Mustache from 'mustache';
import { ValidationMsg } from './ValidationRules';

export default {
  data() {
    return {
      nestedScreenInvalid : false,
    };
  },
  props: {
    vdata: {
      type: Object,
      required: true,
    },
    _parent: null,
  },
  computed: {
    references__() {
      return this.$parent && this.$parent.references__;
    },
  },
  methods: {
    tryFormField(variableName, callback, defaultValue = null) {
      try {
        return callback();
      } catch (e) {
        set(this.$v, `${variableName}.$invalid`, true);
        set(this.$v, `${variableName}.invalid_default_value`, false);
        return defaultValue;
      }
    },
    mustache(text) {
      try {
        const data = Object.assign({_parent: this._parent}, this.vdata);
        return text && Mustache.render(text, data);
      } catch (e) {
        return 'MUSTACHE: ' + e.message;
      }
    },
    nestedScreenIsInavalid(items) {
      items.forEach(item => {
        if (item.$refs.nestedScreen && !this.nestedScreenInvalid) {
          if (item.$refs.nestedScreen.$refs.renderer.$refs.component.$v.$invalid) {
            this.nestedScreenInvalid = true;
            return;
          }
        } else if (item.$children  && !this.nestedScreenInvalid) {
          this.nestedScreenIsInavalid(item.$children);
        }
      });
    },
    submitForm() {
      this.nestedScreenInvalid = false;
      this.nestedScreenIsInavalid(this.$children);
      if (this.nestedScreenInvalid) {
        //if the nested form is not valid the data is not emitted
        return;
      }

      if (this.$v.$invalid) {
        //if the form is not valid the data is not emitted
        return;
      }
      this.$emit('submit', this.vdata);
    },
    getValue(name, object = this) {
      return object ? get(object, name) : undefined;
    },
    setValue(name, value, object = this, defaults = object) {
      if (object && value !== undefined) {
        const splittedName = name.split('.');
        splittedName.forEach((attr, index) => {

          let isLastElement, setValue;
          const originalValue = get(object, attr);

          if (index === splittedName.length - 1) {
            isLastElement = true;
          } else {
            isLastElement = false;
          }

          if (isLastElement) {
            setValue = value;

          } else {
            setValue = originalValue;

            if (!setValue) {
              // Check defaults
              setValue = get(defaults, attr);
            }
            
            if (!setValue) {
              // Still no value? Set empty object
              setValue = {};
            }
          }

          if (isLastElement && isEqual(setValue, originalValue)) {
            return;
          }

          this.$set(
            object,
            attr,
            setValue
          );
          object = get(object, attr);
        });
      }
    },
    validationMessage(validation) {
      const message = [];
      Object.keys(ValidationMsg).forEach(key => {
        if (validation[key]!==undefined && !validation[key]) {
          message.push(this.$t(ValidationMsg[key]).replace(/\{(.+?)\}/g,(match,p1)=>{return validation.$params[key][p1];}));
        }
      });
      return message.join('.\n');
    },
    getCurrentPage() {
      return this.currentPage__;
    },
    setCurrentPage(page) {
      this.currentPage__ = page;
    },
  },
};
