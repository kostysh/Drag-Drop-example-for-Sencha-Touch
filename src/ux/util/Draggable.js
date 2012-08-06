/**
 * Enable revert for draggable
 */
Ext.define('Ext.ux.util.Draggable', {
    override: 'Ext.util.Draggable',
    
    onDragEnd: function(e) {
        if (!this.isDragging) {
            return;
        }

        this.onDrag(e);
        
        if (this.revert) {
            this.setOffset(this.dragStartOffset.x, this.dragStartOffset.y, {
                duration: 250
            });
        }

        this.isDragging = false;

        this.getElement().removeCls(this.getDraggingCls());
        
        this.fireEvent('dragend', this, e, this.offset.x, this.offset.y);
    }
});

