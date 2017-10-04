grapesjs.plugins.add('gjs-plugin-placeholder', (editor, opts) => {
  let c = opts || {};
  let config = editor.getConfig();
  let pfx = config.stylePrefix;

  let defaults = {
    blocks: ['TextPlaceholder'],
    labelTextPlaceholderName: 'TextPlaceholder',
    labelTraitType: 'Type',
    labelTypeSubmit: 'Submit',
    labelTypeReset: 'Reset',
    labelTypeButton: 'Button'
  };

  for (let name in defaults) {
    if (!(name in c))
      c[name] = defaults[name];
  }

  // Add components
  let loadComponents = require('./components');
  loadComponents.default(editor, c);

  // Add traits
  require('./traits').default(editor, c);

  // Add blocks
  let loadBlocks = require('./blocks');
  loadBlocks.default(editor, c);

});
