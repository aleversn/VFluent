<script>
import Popper from './popper.vue'
import { getBoundingRect } from './utils/Bound.js'
export default {
    name: 'FvCallout',
    components: {
        Popper,
    },
    props: {
        visible: {
            default: undefined,
        },
        theme: {
            type: String,
            default: 'system',
        },
        disabled: {
            default: false,
        },
        space: {
            type: Number,
            default: 0,
        },
        beak: {
            type: Number,
            default: 10,
        },
        position: {
            type: String,
            default: 'bottomCenter',
        },
        lockScroll: {
            default: false,
        },
        focusTrap: {
            default: false,
        },
        delayClose: {
            type: Number,
            default: 0,
        },
        effect: {
            type: String,
            default: 'click',
        },
        popperStyle: {
            default: () => {
                return {}
            },
        },
        popperClass: {
            default: () => {
                return []
            },
        },
    },
    data() {
        return {
            slotNames: ['header', 'main', 'footer'],
            positionName: ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight', 'leftTop', 'leftCenter', 'leftRight', 'rightTop', 'rightCenter', 'rightBottom'],
            window: {},
            targetEvent: {},
            popperEvent: {},
            timeout: {
                close: null,
                hoverClose: null, // 鼠标移开后延时关闭
            },
            lock: {
                popper: true,
            },
            cached: {
                visible: this.visible || false,
            },
        }
    },
    watch: {
        position(val) {
            this.adjustPopperPosition(val)
        },
        disabled(val) {
            if (val) this.init()
        },
    },
    computed: {
        _popper() {
            return this.$refs.popper
        },
        $theme() {
            if (this.theme == 'system') return this.$fvGlobal.state.theme
            return this.theme
        },
        popperShow: {
            set(val) {
                if (val) {
                    this.adjustPopperPosition(this.position)
                }
                this.$emit('update:visible', val)
                this.cached.visible = val
            },
            get() {
                if (this.visible != undefined) {
                    return this.visible
                }
                return this.cached.visible
            },
        },
    },
    render() {
        let target = this.getFirstDefaultSlotElement()
        let slots = this.slot()
        return (
            <div>
                {target}
                <Popper ref="popper" theme={this.$theme} show={this.popperShow} popperStyle={this.popperStyle} popperClass={this.popperClass} nodes={slots} />
            </div>
        )
    },
    methods: {
        /**
         * 获取第一个VNode
         */
        getFirstDefaultSlotElement() {
            let vNode = this.$slots.default
            if (!Array.isArray(vNode)) return null
            for (let index in vNode) {
                let node = vNode[index]
                if (node.tag != undefined) {
                    if (this.slotNames.indexOf(node.tag) == -1) {
                        return node
                    }
                }
            }
            return null
        },
        /**
         * 获取slot
         */
        slot() {
            let vNode = this.$slots.default
            if (!Array.isArray(vNode)) return null
            let slots = {
                header: [],
                main: [],
                footer: [],
            }
            for (let index in vNode) {
                let node = vNode[index]
                for (let slotName of this.slotNames) {
                    if (node.tag == slotName) {
                        slots[slotName].push(...node.children)
                        break
                    }
                }
            }
            return slots
        },
        /**
         * 调整悬浮的位置
         * @param position {string} 位置
         */
        adjustPopperPosition(position) {
            // 检查是否有超出范围
            const rect = getBoundingRect(this._popper.$el)
            // 获取了元素显示的宽高
            const { width, height } = rect
            // 循环枚举方向
            let startIndex = this.positionName.indexOf(position)
            let showFlag = false
            for (let index = 0; index < this.positionName.length; ++index) {
                startIndex = (startIndex + index) % this.positionName.length
                let position = this.positionName[startIndex]
                let predictRect = this.locate(this._popper.targetElement, this.beak + this.space, position, height, width)
                if (!this.isOutBody(predictRect)) {
                    this.setPopperPosition(position)
                    showFlag = true
                    break
                }
            }
            if (!showFlag) {
                this.setPopperPosition(position)
            }
        },
        /**
         * 获取悬浮窗的定位
         * @param targetElement {HTMLElement} 目标元素
         * @param offset {number} 偏移位置
         * @param position {string} 位置
         * @param height {number} 高度
         * @param width {number} 宽度
         * @returns {DOMRect} 位置
         */
        locate(targetElement, offset, position, height, width) {
            let rect =  getBoundingRect(targetElement)
            let el = {
                top: 0,
                left: 0,
                height,
                width,
            }
            switch (position) {
                case 'bottomLeft':
                    el.left = rect.left
                    el.top = rect.bottom + offset
                    break
                case 'bottomCenter':
                    el.left = rect.left + (rect.width - el.width) / 2.0
                    el.top = rect.bottom + offset
                    break
                case 'bottomRight':
                    el.left = rect.right - el.width
                    el.top = rect.bottom + offset
                    break
                case 'topLeft':
                    el.left = rect.left
                    el.top = rect.top - offset - el.height
                    break
                case 'topCenter':
                    el.left = rect.left + (rect.width - el.width) / 2.0
                    el.top = rect.top - offset - el.height
                    break
                case 'topRight':
                    el.left = rect.right - el.width
                    el.top = rect.top - offset - el.height
                    break
                case 'leftTop':
                    el.left = rect.left - offset - el.width
                    el.top = rect.top
                    break
                case 'leftCenter':
                    el.left = rect.left - offset - el.width
                    el.top = rect.top + (rect.height - el.height) / 2.0
                    break
                case 'leftBottom':
                    el.left = rect.left - offset - el.width
                    el.top = rect.bottom - el.height
                    break
                case 'rightTop':
                    el.left = rect.right + offset
                    el.top = rect.top
                    break
                case 'rightCenter':
                    el.left = rect.right + offset
                    el.top = rect.top + (rect.height - el.height) / 2.0
                    break
                case 'rightBottom':
                    el.left = rect.right + offset
                    el.top = rect.bottom - el.height
                    break
            }
            return el
        },
        /**
         * @param rect {DOMRect} 边界
         * @returns {Boolean} 是否出界
         */
        isOutBody(rect) {
            if (rect.left < 0 || rect.top < 0 || rect.height + rect.top > window.innerHeight || rect.width + rect.left > window.innerWidth) {
                return true
            }
            return false
        },
        /**
         * @summary 设置悬浮的位置
         * @param {string} position Popper Position
         */
        setPopperPosition(position) {
            this._popper.position = this.position
            let callout = this._popper.style.callout
            this._popper.style.beak = {}
            let beak = this._popper.style.beak
            let target = getBoundingRect(this._popper.targetElement)
            if (this.beak < 10) {
                this.$set(beak, 'display', 'none')
            } else {
                this.$set(beak, 'display', 'block')
                this.$set(beak, 'width', this.beak + 'px')
                this.$set(beak, 'height', this.beak + 'px')
            }
            let space = this.beak + this.space
            //clear
            this.$delete(callout, 'right')
            this.$delete(callout, 'left')
            this.$delete(callout, 'top')
            this.$delete(callout, 'bottom')

            this.$set(this._popper.class, 'callout', [position])

            switch (position) {
                case 'bottomLeft':
                    this.$set(callout, 'top', `${target.top + target.height + space}px`)
                    this.$set(callout, 'left', `${target.left}px`)
                    this.$set(beak, 'top', `0`)
                    this.$set(beak, 'left', `0`)
                    this.$set(beak, 'transform', `translate(50%, -50%) rotate(45deg)`)
                    break
                case 'bottomRight':
                    this.$set(callout, 'top', `${target.top + target.height + space}px`)
                    this.$set(callout, 'left', `${target.right}px`)
                    this.$set(beak, 'top', `0`)
                    this.$set(beak, 'left', `100%`)
                    this.$set(beak, 'transform', `translate(-140%, -50%) rotate(45deg)`)
                    break
                case 'bottomCenter':
                    this.$set(callout, 'top', `${target.top + target.height + space}px`)
                    this.$set(callout, 'left', `${target.left + target.width / 2}px`)
                    this.$set(beak, 'top', `0px`)
                    this.$set(beak, 'transform', `translate(-50%, -50%) rotate(45deg)`)
                    break
                case 'topLeft':
                    this.$set(callout, 'top', `${target.top - space}px`)
                    this.$set(callout, 'left', `${target.left}px`)
                    this.$set(beak, 'bottom', `0px`)
                    this.$set(beak, 'left', `0px`)
                    this.$set(beak, 'transform', `translate(50%, 50%) rotate(45deg)`)
                    break
                case 'topRight':
                    this.$set(callout, 'top', `${target.top - space}px`)
                    this.$set(callout, 'left', `${target.right}px`)
                    this.$set(beak, 'bottom', `0px`)
                    this.$set(beak, 'left', `100%`)
                    this.$set(beak, 'transform', `translate(-140%, 50%) rotate(45deg)`)
                    break
                case 'topCenter':
                    this.$set(callout, 'top', `${target.top - space}px`)
                    this.$set(callout, 'left', `${target.left + target.width / 2}px`)
                    this.$set(beak, 'bottom', `0px`)
                    this.$set(beak, 'transform', `translate(-50%, 50%) rotate(45deg)`)
                    break
                case 'leftTop':
                    this.$set(callout, 'left', `${target.left - space}px`)
                    this.$set(callout, 'top', `${target.top}px`)
                    this.$set(beak, 'left', `100%`)
                    this.$set(beak, 'top', 0)
                    this.$set(beak, 'transform', `translate(-50%, 50%) rotate(45deg)`)
                    break
                case 'leftBottom':
                    this.$set(callout, 'left', `${target.left - space}px`)
                    this.$set(callout, 'top', `${target.bottom}px`)
                    this.$set(beak, 'left', `100%`)
                    this.$set(beak, 'bottom', 0)
                    this.$set(beak, 'transform', `translate(-50%, -80%) rotate(45deg)`)
                    break
                case 'leftCenter':
                    this.$set(callout, 'left', `${target.left - space}px`)
                    this.$set(callout, 'top', `${target.top + target.height / 2}px`)
                    this.$set(beak, 'left', `100%`)
                    this.$set(beak, 'top', '50%')
                    this.$set(beak, 'transform', `translate(-50%, -50%) rotate(45deg)`)
                    break
                case 'rightTop':
                    this.$set(callout, 'left', `${target.right + space}px`)
                    this.$set(callout, 'top', `${target.top}px`)
                    this.$set(beak, 'left', 0)
                    this.$set(beak, 'top', 0)
                    this.$set(beak, 'transform', `translate(-50%, 50%) rotate(45deg)`)
                    break
                case 'rightBottom':
                    this.$set(callout, 'left', `${target.right + space}px`)
                    this.$set(callout, 'top', `${target.bottom}px`)
                    this.$set(beak, 'left', 0)
                    this.$set(beak, 'bottom', 0)
                    this.$set(beak, 'transform', `translate(-50%, -80%) rotate(45deg)`)
                    break
                case 'rightCenter':
                    this.$set(callout, 'left', `${target.right + space}px`)
                    this.$set(callout, 'top', `${target.top + target.height / 2}px`)
                    this.$set(beak, 'left', 0)
                    this.$set(beak, 'top', '50%')
                    this.$set(beak, 'transform', `translate(-50%, -50%) rotate(45deg)`)
                    break
            }
        },
        initWindowEvent() {
            if (this.disabled) return
            this.window = {
                resize: () => {
                    this.adjustPopperPosition(this.position)
                },
                scroll: () => {
                    if (!this.lockScroll) {
                        this.popperShow = false
                    } else this.adjustPopperPosition(this.position)
                },
                click: (evt) => {
                    let isOutSide = (el) => {
                        let parent = el
                        while (parent) {
                            if (parent == this._popper.$el || parent == this._popper.targetElement) {
                                return false
                            }
                            parent = parent.parentNode
                        }
                        return true
                    }
                    if (!this.focusTrap && isOutSide(evt.target)) {
                        this.popperShow = false
                    }
                },
            }
        },
        initTargetEvent() {
            if (this.effect === 'click') {
                this.targetEvent.click = () => {
                    this.popperShow = !this.popperShow
                }
            } else if (this.effect === 'hover') {
                // 目标鼠标移入
                this.targetEvent.mouseenter = () => {
                    this.lock.popper = true
                    clearInterval(this.timeout.hoverClose)
                    this.popperShow = true
                }
                // 目标鼠标移出
                this.targetEvent.mouseleave = () => {
                    if (!this.lock.popper) return
                    this.lock.popper = false
                    this.timeout.hoverClose = setInterval(() => {
                        this.popperShow = false
                        this.lock.popper = true
                        clearInterval(this.timeout.hoverClose)
                    }, 300)
                }
                this.popperEvent.mouseenter = () => {
                    let el = this.$parent
                    while (el) {
                        if (el.$options.name === 'FvOutsidePopper') {
                            if (!el.show) {
                                this.popperShow = true
                                el = el.target
                            } else {
                                break
                            }
                        } else {
                            el = el.$parent
                        }
                    }
                    this.lock.popper = true
                    this.popperShow = true
                    clearInterval(this.timeout.hoverClose)
                }
                this.popperEvent.mouseleave = () => {
                    let el = this.$parent
                    while (el) {
                        if (el.$options.name === 'FvOutsidePopper' && el.target.effect == 'hover') {
                            if (el.show) {
                                this.popperShow = false
                                el = el.target
                            } else {
                                break
                            }
                        } else {
                            el = el.$parent
                        }
                    }
                    this.popperShow = false
                }
            }
        },
        init() {
            this._popper.target = this
            this._popper.targetElement = this.$el.firstElementChild
            this.initWindowEvent()
            this.initTargetEvent()
            for (let key in this.window) {
                window.addEventListener(key, this.window[key])
            }
            for (let key in this.targetEvent) {
                this._popper.targetElement.addEventListener(key, this.targetEvent[key])
            }
            for (let key in this.popperEvent) {
                this._popper.$el.addEventListener(key, this.popperEvent[key])
            }
            if (this.delayClose > 0 && this.popperShow) {
                this.timeout.close = setTimeout(() => {
                    this.popperShow = false
                }, this.delayClose)
            }
        },
    },
    mounted() {
        document.body.append(this._popper.$el)
        this.init()
    },
    beforeDestroy() {
        for (let key in this.timeout) {
            clearTimeout(this.timeout[key])
        }
        for (let key in this.window) {
            window.removeEventListener(key, this.window[key])
        }
        for (let key in this.targetEvent) {
            this._popper.targetElement.removeEventListener(key, this.targetEvent[key])
        }
        for (let key in this.popperEvent) {
            this._popper.$el.removeEventListener(key, this.popperEvent[key])
        }
        this._popper.$el.remove()
        this._popper.$destroy()
    },
}
</script>
