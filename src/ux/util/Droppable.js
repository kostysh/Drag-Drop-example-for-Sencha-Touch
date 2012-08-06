/**
 * Custom implementation of Ext.util.Droppable
 * ported from ST2 v1.1.1
 * 
 * Important!!! This is not official. This util is experimental only!
 * Look for next official release of Sencha and do not forget - api can be changed
 */
Ext.define('Ext.ux.util.Droppable', {
    mixins: {
        observable: 'Ext.mixin.Observable'
    },
    
    requires: [
        'Ext.util.Region'
    ],
    
    /**
     * @event dropactivate
     * @param {Ext.ux.util.Droppable} this
     * @param {Ext.util.Draggable} draggable
     * @param {Ext.event.Event} e
     */

    /**
     * @event dropdeactivate
     * @param {Ext.ux.util.Droppable} this
     * @param {Ext.util.Draggable} draggable
     * @param {Ext.event.Event} e
     */

    /**
     * @event dropenter
     * @param {Ext.ux.util.Droppable} this
     * @param {Ext.util.Draggable} draggable
     * @param {Ext.event.Event} e
     */

    /**
     * @event dropleave
     * @param {Ext.ux.util.Droppable} this
     * @param {Ext.util.Draggable} draggable
     * @param {Ext.event.Event} e
     */

    /**
     * @event drop
     * @param {Ext.ux.util.Droppable} this
     * @param {Ext.util.Draggable} draggable
     * @param {Ext.event.Event} e
     */

    config: {
        
        baseCls: Ext.baseCSSPrefix + 'droppable',
        activeCls: Ext.baseCSSPrefix + 'drop-active',
        invalidCls: Ext.baseCSSPrefix + 'drop-invalid',
        hoverCls: Ext.baseCSSPrefix + 'drop-hover',
        
        element: null
    },  

    /**
     * @cfg {String} validDropMode
     * Valid values are: 'intersects' or 'contains'
     */
    validDropMode: 'intersect',

    /**
     * @cfg {Boolean} disabled
     */
    disabled: false,

    /**
     * @cfg {String} group
     * Draggable and Droppable objects can participate in a group which are
     * capable of interacting.
     */
    group: 'base',

    // not yet implemented
    tolerance: null,

    // @private
    monitoring: false,

    /**
     * Creates new Droppable
     * @param {Object} config Configuration options for this class.
     */
    constructor: function(config) {
        var me = this;
        var element;
        
        me.initialConfig = config;
        
        if (config && config.element) {
            element = config.element;
            delete config.element;

            this.setElement(element);
        }
    
        if (!config.disabled) {
            me.enable();
        }
        
        return me;
    },
    
    updateBaseCls: function(cls) {
        this.getElement().addCls(cls);
    },
    
    applyElement: function(element) {
        if (!element) {
            return;
        }
        
        return Ext.get(element);
    },

    updateElement: function(element) {
        element.on(this.listeners);
        this.initConfig(this.initialConfig);
    },
    
    updateCls: function(cls) {
        this.getElement().addCls(cls);
    },

    // @private
    onDragStart: function(draggable, e) {
        var me = this;        
        
        if (draggable.group === me.group) {
            me.monitoring = true;
            me.getElement().addCls(me.getActiveCls());
            
            me.region = me.getElement().getPageBox(true);
            
            draggable.on({
                drag: me.onDrag,
                dragend: me.onDragEnd,
                scope: me
            });

            if (me.isDragOver(draggable)) {
                me.setCanDrop(true, draggable, e);
            }

            me.fireEvent('dropactivate', me, draggable, e);
        } else {
            draggable.on({
                dragend: function() {
                    me.getElement().removeCls(me.getInvalidCls());
                },
                scope: me,
                single: true
            });
            
            me.getElement().addCls(me.getInvalidCls());
        }
    },

    // @private
    isDragOver: function(draggable) {
        var dRegion = draggable.getElement().getPageBox(true);
        return this.region[this.validDropMode](dRegion);
    },

    // @private
    onDrag: function(draggable, e) {
        this.setCanDrop(this.isDragOver(draggable), draggable, e);
    },

    // @private
    setCanDrop: function(canDrop, draggable, e) {
        if (canDrop && !this.canDrop) {
            this.canDrop = true;
            this.getElement().addCls(this.getHoverCls());
            this.fireEvent('dropenter', this, draggable, e);
        }
        else if (!canDrop && this.canDrop) {
            this.canDrop = false;
            this.getElement().removeCls(this.getHoverCls());
            this.fireEvent('dropleave', this, draggable, e);
        }
    },

    // @private
    onDragEnd: function(draggable, e) {
        this.monitoring = false;
        this.getElement().removeCls(this.getActiveCls());

        draggable.un({
            drag: this.onDrag,
            dragend: this.onDragEnd,
            scope: this
        });
        
        if (this.canDrop) {
            this.canDrop = false;
            this.getElement().removeCls(this.getHoverCls());
            this.fireEvent('drop', this, draggable, e);
        }

        this.fireEvent('dropdeactivate', this, draggable, e);
    },

    /**
     * Enable the Droppable target.
     * This is invoked immediately after constructing a Droppable if the
     * disabled parameter is NOT set to true.
     */
    enable: function() {
        if (!this.draggables) {
            this.draggables = [];
            
            var publs = this.getEventDispatcher().activePublishers;
            for (var i in publs) {
                if (i === 'element') {
                    var elems = publs[i];                    
                    for (var y in elems) {
                        if (Ext.isDefined(elems[y].subscribers['dragstart'] && 
                            elems[y].subscribers['dragstart'].id)) {
                            var draggs = elems[y].subscribers['dragstart'].id;
                            for (var x in draggs) {
                                if (x !== '$length') {
                                    var draggable = Ext.getCmp(x).getDraggableBehavior().draggable;
                                    this.draggables.push(draggable);
                                }
                            }
                        }
                    }
                }
            }
        }
        
        for (var i in this.draggables) {
            this.draggables[i].on({
                scope: this,
                dragstart: this.onDragStart
            });
        }
        
        this.disabled = false;
    },

    /**
     * Disable the Droppable
     */
    disable: function() {
        if (this.draggables) {
            for (var i in this.draggables) {
                this.draggables[i].un({
                    scope: this,
                    dragstart: this.onDragStart
                });
            }
        }
        
        this.disabled = true;
    },

    /**
     * Method to determine whether this Component is currently disabled.
     * @return {Boolean} the disabled state of this Component.
     */
    isDisabled: function() {
        return this.disabled;
    },

    /**
     * Method to determine whether this Droppable is currently monitoring drag operations of Draggables.
     * @return {Boolean} the monitoring state of this Droppable
     */
    isMonitoring: function() {
        return this.monitoring;
    }
});
