Ext.define('Dragndrop.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    
    requires: [
        'Ext.TitleBar',
        'Ext.Button'
    ],
    
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: false,
                
                layout: {
                    type: 'vbox',
                    align: 'center'
                },
                
                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Drag&Drop example for Sencha Touch'
                    },
                    
                    {
                        id: 'draggsCnt',
                        xtype: 'container',
                        
                        layout: {
                            type: 'hbox',
                            align: 'center'
                        },
                        
                        items: [
                            {
                                xtype: 'container',
                                cls: 'dmb',
                                style: 'background-color: green;',
                                padding: 5,
                                html: 'Drag me, baby',
                                draggable: true
                            },
                            {
                                xtype: 'spacer',
                                width: 5
                            },
                            {
                                xtype: 'container',
                                cls: 'dmb',
                                style: 'background-color: orange;',
                                padding: 5,
                                html: 'Drag me, baby',
                                draggable: true
                            },
                            {
                                xtype: 'spacer',
                                width: 5
                            },
                            {
                                xtype: 'container',
                                cls: 'dmb',
                                style: 'background-color: purple;',
                                padding: 5,
                                html: 'Drag me, baby',
                                draggable: true
                            },
                        ]
                    },
                    
                            
                    
                    {
                        xtype: 'spacer'
                    },
                    
                    {
                        id: 'dropCnt',
                        xtype: 'container',
                        width: '80%',
                        style: 'background-color: #1E90FF; border-radius: 7px; color: white; text-align: center',
                        padding: 60,
                        layout: {
                            type: 'vbox',
                            align: 'center'
                        },
                        html: 'Drop me here'
                    }
                ]
            },
            
            {
                title: 'About',
                iconCls: 'info',
                layout: 'fit',
                styleHtmlContent: true,
                html: '<p><strong>Drag&Drop example for Sencha Touch</strong></p>' +
                      '<p>Author: Constantine Smirnov, <a href="http://mindsaur.com">http://mindsaur.com</a></p>' +
                      '<p>License: Sencha</p>' +
                      '<p>GitHub: <a href="https://github.com/kostysh/Drag-Drop-example-for-Sencha-Touch">Drag-Drop-example-for-Sencha-Touch</a></p>',
                scrollable: 'vertical'
            }
        ]
    }
});
