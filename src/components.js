export default function(editor, opt = {}) {
  const c = opt;
  const domc = editor.DomComponents;
  const defaultType = domc.getType('default');
  const textType = domc.getType('text');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const textModel = textType.model;
  const textView = textType.view;

  let stateNormal = 'Normal';
  let stateSuccess = 'Success';
  let stateError = 'Error';

  const idTrait = {
    name: 'id',
    label: c.labelTraitId,
  };

  const forTrait = {
    name: 'for',
    label: c.labelTraitFor,
  };

  const nameTrait = {
    name: 'name',
    label: c.labelTraitName,
  };

  const placeholderTrait = {
    name: 'placeholder',
    label: c.labelTraitPlaceholder,
  };

  const valueTrait = {
    name: 'value',
    label: c.labelTraitValue,
  };

  const requiredTrait = {
    type: 'checkbox',
    name: 'required',
    label: c.labelTraitRequired,
  };

  const checkedTrait = {
    label: c.labelTraitChecked,
    type: 'checkbox',
    name: 'checked',
    changeProp: 1
  };

  const preventDefaultClick = () => {
    return defaultType.view.extend({
      events: {
        'mousedown': 'handleClick',
      },

      handleClick(e) {
        e.preventDefault();
      },
    });
  };

  // INPUT
  domc.addType('input', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': c.labelInputName,
        tagName: 'input',
        draggable: '*',
        droppable: false,
        traits: [
          nameTrait,
          placeholderTrait, {
            label: c.labelTraitType,
            type: 'select',
            name: 'type',
            options: [
              {value: 'text', name: c.labelTypeText},
              {value: 'email', name: c.labelTypeEmail},
              {value: 'password', name: c.labelTypePassword},
              {value: 'number', name: c.labelTypeNumber},
            ]
          }, requiredTrait
        ],
      }),
    }, {
      isComponent(el) {
        if(el.tagName == 'INPUT') {
          return {type: 'input'};
        }
      },
    }),
    view: defaultView,
  });

  var inputType = domc.getType('input');
  var inputModel = inputType.model;
  //custom-type #286 issue?
  domc.addType('TextPlaceholder', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': c.labelButtonName,
        tagName: 'textplaceholder',
        draggable: '*',
        droppable: true,
        attributes: { type: 'placeholder' },
        
        traits: [{
          type: 'content',
          label: 'Text',
        }]
      }),
    }, {
      isComponent(el) {
        if(el.tagName == 'div'){
          return {type: 'div'};
        }
      },
    }),
    view: defaultView.extend({
      events: {
        'click': 'handleClick'
      },

      init() {
        //this.listenTo(this.model, 'change:content', this.updateContent);
      },
      /*
      doStuff() {
         console.log("I been Called")
        // Open the modal
         const modal = this.em.get('Model');
         //var modal = editor.Modal
         modal.setTitle('Title');
         modal.setContent('Your content');
         modal.open();
      },
      */

      handleClick(e) {
        e.preventDefault();
      },
    }),
  });

}
