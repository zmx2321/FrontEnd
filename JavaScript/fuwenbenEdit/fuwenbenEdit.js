window.onload = function(){
  let editor = document.getElementById("editor"),
      buttons= editor.getElementsByTagName("span"),
      selects= editor.getElementsByTagName("select");
  
  let textarea = document.getElementById("textarea");
      textarea.style.display = "none";
  let iframe = document.createElement("iframe");
      iframe.style.width = '390px';
      iframe.style.height= "100px";
      iframe.frameBorder = 0;
      textarea.parentNode.insertBefore(iframe, textarea);
  let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      iframeDocument.designMode = "on";
      iframeDocument.open();
      iframeDocument.write('<html><head></head><body bgcolor="#DDF3FF"></body></html>');
      iframeDocument.close();

  for (let i = 0,l = buttons.length; i < l; i++) {
    buttons[i].onclick = new function(){
      let command = buttons[i].getAttribute("title");
      return function(){
        iframeDocument.execCommand(command);
      };
    }
  };
  for (let i = 0,l = selects.length; i < l; i++) {
    selects[i].onchange = new function(){
      let select = selects[i];
      return function(){
        let command = select.getAttribute("title"),
            value   = select.options[select.selectedIndex].value;
            if (command == 'backcolor' && /a/[-1]=='a') {
              iframeDocument.execCommand("hilitecolor", false, value);
            } else {
              iframeDocument.execCommand(command, false, value);
            }
      };
    }
  }
};