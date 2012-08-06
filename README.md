Drag-Drop-example-for-Sencha-Touch
==================================

Learn how to use drag and drop features of Sencha Touch 2. Even now, with ST2 2.1 Beta1

Introduction:
=============
As we know - current version of Sencha (2.1 Beta1) do not support Droppable behavior because it not implemented yet.  
But we have Droppable implementation from version 1.1.1 and we can rewrite it to current.  
Also, we know what current implementation of Draggable do not support 'revert' option.  
But we need it.


Features:
=========
- Classical Ext.util.Draggable with 'revert' option
- Experimental Droppable behavior util


Installing:
===========
- Place src to your app folder;
- Configure path for custom components: 
<!-- language: lang-js -->
        
        Ext.Loader.setPath({
            'Ext.ux': '[your-path-to]src/ux'
        });
- Require components:
<!-- language: lang-js -->
        
        requires: [
            'Ext.util.Draggable',
            'Ext.ux.util.Draggable',
            'Ext.ux.util.Droppable'
        ],
- Add path to Droppable and custom Draggable css into app.json (css section):
<!-- language: lang-js -->
        
        {
            "path": "[your-path-to]/resources/css/Droppable.css",
            "update": "delta"
        },
        {
            "path": "[your-path-to]/resources/css/Draggable.css",
            "update": "delta"
        }
- How to use Draggable and Droppable look into demo application  


Live demo: 
==========
http://mindsaur.com/demo/dragdrop