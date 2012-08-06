Ext.define('Dragndrop.controller.Main', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'Ext.util.Draggable',
        'Ext.ux.util.Draggable',
        'Ext.ux.util.Droppable'
    ],
    
    config: {
        refs: {
            draggsCnt: '#draggsCnt',
            dropCnt: '#dropCnt'
        },
        
        control: {
            draggsCnt: {
                initialize: 'onDraggsCntInit'
            },
            
            dropCnt: {
                initialize: 'onDropCntInit'
            }
        }
    },
    
    onDraggsCntInit: function(cnt) {
        var me = this;
        console.log('Init draggs');
        
        Ext.each(cnt.getInnerItems(), function(item) {
            if (Ext.isDefined(item.draggableBehavior)) {
                var draggable = item.draggableBehavior.getDraggable();
                
                draggable.group = 'base';// Default group for droppable
                draggable.revert = true;
                
                draggable.setConstraint({
                    min: { x: -Infinity, y: -Infinity },
                    max: { x: Infinity, y: Infinity }
                });
                
                draggable.on({
                    scope: me,
                    dragstart: me.onDragStart,
                    dragend: me.onDragEnd
                });
            }
        });
    },
    
    onDragStart: function() {
        var me = this;
        
        console.log('Start dragging', arguments);
    },
    
    onDragEnd: function() {
        console.log('End of dragging', arguments);
    },
    
    onDropCntInit: function(cnt) {
        var me = this;
        
        var drop = Ext.create('Ext.ux.util.Droppable', {
            element: cnt.element
        });
        
        drop.on({
            scope: me,
            drop: me.onDrop
        });
        
        drop.cleared = false;
        
        console.log('Droppable init', drop);
    },
    
    onDrop: function(droppable, draggable) {
        var me = this;
        console.log('Dropped', arguments);
        
        var draggsCnt = me.getDraggsCnt();
        var dropCnt = me.getDropCnt();
        var dragg = Ext.getCmp(draggable.getElement().getId());
        
        if (!droppable.cleared) {
            dropCnt.setHtml('');
            droppable.cleared = true;
        }
        
        dropCnt.insert(0, Ext.create('Ext.Container', {
            html: me.getHiString(),
            padding: 20,
            margin: 5,
            style: 'border: black solid; border-radius: 7px; background-color: white; color: black;',
            layout: {
                type: 'vbox',
                align: 'center'
            }
        }));
        
        dragg.destroy();
    },
    
    getHiString: function() {
        var strings = ['Good!', 'Beautiful!', 'Excellent!', 'Awesome!'];
        return strings[Math.floor(Math.random()*4)];
    }
});