/**
 * @description 链接 菜单
 * @author wangfupeng
 */

import PanelMenu from '../Menu/PanelMenu'
import Editor from '../../editor/index'
import $ from '../../utils/dom-core'
import createPanelConf from './create-panel-conf'
import isActive from './is-active'
import Panel from '../Menu/Panel'

class Link extends PanelMenu {
    constructor(editor: Editor) {
        const $elem = $('<div class="w-e-menu"><i class="w-e-icon-link"></i></div>')
        super($elem, editor)
    }

    /**
     * 菜单点击事件
     */
    clickHandler(): void {
        const editor = this.editor
        let $linkElem

        if (this._active) {
            // 菜单被激活，说明选区在链接里
            $linkElem = editor.selection.getSelectionContainerElem()
            if (!$linkElem) {
                return
            }
            // 将该元素都包含在选取之内，以便后面整体替换
            editor.selection.createRangeByElem($linkElem)
            editor.selection.restoreSelection()
        } else {
            // 菜单未被激活，说明选区不在链接里
            if (editor.selection.isSelectionEmpty()) {
                // 选区是空的，未选中内容
                this.createPanel('', '')
            } else {
                // 选中内容了
                this.createPanel(editor.selection.getSelectionText(), '')
            }
        }
    }

    /**
     * 创建 panel
     * @param text 文本
     * @param link 链接
     */
    createPanel(text: string, link: string): void {
        const conf = createPanelConf(this.editor, text, link)
        const panel = new Panel(this, conf)
        panel.create()

        this.setPanel(panel)
    }

    /**
     * 尝试修改菜单 active 状态
     */
    tryChangeActive() {
        const editor = this.editor
        if (isActive(editor)) {
            this.active()
        } else {
            this.unActive()
        }
    }
}

export default Link
