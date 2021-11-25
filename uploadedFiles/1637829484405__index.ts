import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';
import { showDialog, Dialog, InputDialog } from '@jupyterlab/apputils';
import { buildIcon } from '@jupyterlab/ui-components';

const extension: JupyterFrontEndPlugin<void> = {
  id: 'context-menu',
  autoStart: true,
  requires: [IFileBrowserFactory],
  
  activate: (app: JupyterFrontEnd, factory: IFileBrowserFactory) => {
    app.commands.addCommand('FileSharing/context-menu:open', {
      
     
      /*id select 필요없을 예정
        const options = ['one', 'two', 'three']
        InputDialog.getItem({
          title : 'example',
          items : options,
          current : Math.max(0, options.indexOf('one')),

        }).then((result) => {
          // If the user click on the accept button of the dialog
          if (result.button.accept) {
            console.log(result.value);            
            
          }
        })*/
        /*
            fetch('url',{
              method : 'post',
              headers : {'Content-Type' : 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Type': 'multipart/form-data'},
              
              body : JSON.stringify({
                // JSON 형식으로 데이터를 전송
              })
            }).then(res => res.json())
          */
            
      
      label: 'Share file',
      caption: "context menu button for file browser's items.",
      icon: buildIcon,
      execute: () => {

        console.log("Click the 'share file' button");
        const widget = factory.tracker.currentWidget;
        const file = widget.selectedItems().next();
        
        console.log('file: ' + file.path);
        console.log("Size: " + file.size);
        
        let input_url : string;
        
        InputDialog.getText({
          title : 'Please enter the URL',
          
        }).then(result =>{
          if(result.button.accept){
            input_url = result.value

            showDialog({
          
              title: 'Share file : ' + file.name, 
              body: 'Share file with professor : '+ file.path,
              buttons: [
                Dialog.okButton({label : 'Share'}),
                Dialog.cancelButton()
              ],
              
            }).then(result => {
              if(result.button.accept){
                console.log( "URL : " + input_url +"\n"+ "Shared the file :" + file.name );
                let uploadFile = new FormData();
                console.log('http://localhost:8888/lab/tree/' + file.path);
                fetch('http://localhost:8888/files/' + file.path +'?_xsrf=2%7C6cc81390%7C5bb85f06295e2c5df9b85c1ac96ce502%7C1635325547')
                .then(res => res.blob())
                .then(function(myblob){
                  console.log("Size: " + myblob.size);
                  console.log("type: \n" + myblob.type);
                  uploadFile.append('File',myblob, file.name);
                  
                fetch('http://localhost:3000/uploadFile',{
                  method : 'post',
                  headers : {},
                  body : uploadFile
    
                }).then(res => res.json())
                .then(res => console.log(res))
                .catch(e => console.log(e))
                });
                
                
                /*
                console.log("file error");
                uploadFile.append('DestURL',
                new Blob([JSON.stringify({"url": input_url})], { type: 'application/json' })
                ,"DestUrl");
                */

                
                
                
              }
            }).catch((e) => console.log(e));
          }
        })
      },

    });
    
  },
};

export default extension;
