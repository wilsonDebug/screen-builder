export default [
  {
    name: 'Variable',
    fields: [
      { name: 'name', hideFor: 'FormImage' },
      'fieldValue',
      'label',
      'dataFormat',
      'dataMask',
      'validation',
      'readonly',
      'disabled',
      'initiallyChecked',
      'screen',
      'multipleUpload',
      'linkUrl'
    ],
    open: true,
  },
  {
    name: 'Configuration',
    fields: [
      { name: 'name', showFor: 'FormImage' },
      'image',
      'eventData',
      'tooltip',
      'type',
      'placeholder',
      'content',
      'helper',
      'Multiselect checkbox (doesn’t exist)',
      'richtext',
      'rows',
      { name: 'options', showFor: 'FormMultiColumn' },
      'form',
      'editable',
    ],
    open: false,
  },
  {
    name(control) {
      if (control.component === "AiSection") {
        return "AI Section";
      }

      return control.component === "FormRecordList" ? "Columns" : "Data Source";
    },
    fields: [
      'fields',
      { name: 'options', hideFor: 'FormMultiColumn' },
    ],
    open: false,
  },
  {
    name: 'Design',
    fields: ['color', 'bgcolor', 'variant', 'toggle', 'height', 'width'],
    open: false,
  },
  {
    name: 'Advanced',
    fields: ['conditionalHide', 'deviceVisibility', 'customCssSelector', 'defaultValue', 'showForDesktop',
      {name: 'customFormatter', showFor: 'FormInput'},
      {name: 'ariaLabel', showFor: 'FormInput'},
      {name: 'ariaLabel', showFor: 'FormSelectList'},
      {name: 'ariaLabel', showFor: 'FormDatePicker'},
      {name: 'ariaLabel', showFor: 'FormCheckbox'},
      {name: 'ariaLabel', showFor: 'FormDatePicker'},
      {name: 'ariaLabel', showFor: 'FileUpload'},
      {name: 'ariaLabel', showFor: 'FileDownload'},
      {name: 'ariaLabel', showFor: 'FormSelectList'},
      {name: 'ariaLabel', showFor: 'FormButton'},
      {name: 'ariaLabel', showFor: 'FormTextArea'},
      {name: 'tabindex', showFor: 'FormInput'},
      {name: 'tabindex', showFor: 'FormSelectList'},
      {name: 'tabindex', showFor: 'FormDatePicker'},
      {name: 'tabindex', showFor: 'FormCheckbox'},
      {name: 'tabindex', showFor: 'FormDatePicker'},
      {name: 'tabindex', showFor: 'FileUpload'},
      {name: 'tabindex', showFor: 'FileDownload'},
      {name: 'tabindex', showFor: 'FormSelectList'},
      {name: 'tabindex', showFor: 'FormButton'},
      {name: 'tabindex', showFor: 'FormTextArea'},
    ],
    open: false,
  },
];
