export default function (editor, opt = {}) {
  const c = opt;
  
  let bm = editor.BlockManager;

  if (c.blocks.indexOf('input') >= 0) {
    bm.add('input', {
      label: `
      <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z"></path>
        <polygon class="gjs-block-svg-path" points="4 10 5 10 5 14 4 14"></polygon>
      </svg>
      <div class="gjs-block-label">${c.labelInputName}</div>`,
      category: 'Forms',
      content: '<input class="input"/>',
    });
  }


  if (c.blocks.indexOf('TextPlaceholder') >= 0) {
    bm.add('TextPlaceholder', {
      label: `
      <div class="gjs-fonts gjs-f-text"></div>
      <div class="gjs-block-label">${c.labelTextPlaceholderName}</div>`,
      category: 'Forms',
      content:  {
        type:'TextPlaceholder',
        content:'text',
        style: {padding: '10px' },
        activeOnRender: 1
      },
      attributes: { type: 'placeholder' },
      copyable: false
    });
  }

  editor.on('block:drag:stop', function(model) {
    
     if(model.attributes.type == 'custom-type' || model.attributes.type =='TextPlaceholder' ){
     
       var modal = editor.Modal;
       modal.setTitle("Please Select Available Token");
       modal.setContent('<select id="customVariable"></select><br /><button id="sbm">submit</button>')
       var p = c.param
       $('#customVariable').append($('<option>', { 
         value: "",
         text : 'Please Select' 
       }));
       $.each(p, function (i, item) {
         if(i != "" || Object.keys(i).length > 0){
           $('#customVariable').append($('<option>', { 
               value: item,
               text : item 
           }));
         }
       });
       modal.open();
 
       $("#sbm").on("click", function() { 
         console.log(model)

         var val =  $("#customVariable").val()
         if(val != ""){
           model.set('content', val);
           console.log("." + model.cid)
           var doc = editor.Canvas.getBody().ownerDocument;
           doc.querySelector("." + model.cid).innerHTML = val
         }
         modal.close()
       })
 
       
   
     }else{
       //model.set('content', 'test2');
     }
    
 
   });
    
   // Parse a URL into its parts
   let parseURL = function(url)
   {
       var p = document.createElement('a');
 
       p.href = url;
 
       var obj = {
           'protocol' : p.protocol,
           'hostname' : p.hostname,
           'port' : p.port,
           'pathname' : p.pathname,
           'search' : p.search,
           'query' : p.search.substring(1),
           'args' : parseStr(p.search.substring(1)),
           'hash' : p.hash,
           'host' : p.host
       };
 
       return obj;
   }
   // Parse a query string
   let parseStr = function(string)
   {
       var args = string.split('&');
       var argsParsed = {};
 
       for (var i = 0; i < args.length; i++)
       {
           var arg = decodeURIComponent(args[i]);
 
           if (arg.indexOf('=') == -1)
           {
               argsParsed[arg.trim()] = true;
           }
           else
           {
               var kvp = arg.split('=');
               argsParsed[kvp[0].trim()] = kvp[1].trim();
           }
       }
 
       return argsParsed;
   }
}
