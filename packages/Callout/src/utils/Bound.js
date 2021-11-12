/**
 * 获取element的真实属性
 * @param {HTMLElement} el 
 * @returns {DOMRect} 元素的宽高等
 */
function getBoundingRect(el) {
    const computed = getComputedStyle(el);
    if (computed.display != 'none') {
        return el.getBoundingClientRect()
    }
    let style = {
        display: "block", // 设置为显示
        visibility: "hidden", // 设置为用户不可见
        transition: "none" // 关闭所有的动画，避免影响结果
    }
    let oldStyle = {}
    // 备份样式
    for (let styleName in style) {
        oldStyle[styleName] = el.style.getPropertyValue(styleName);
    }
    // 设置样式
    for (let styleName in style) {
        el.style.setProperty(styleName, style[styleName], "important");
    }
    let result = el.getBoundingClientRect();
    // 还原为原本的样式
    for (let styleName in style) {
        el.style.setProperty(styleName, oldStyle[styleName])
    }
    return result;
}



export { getBoundingRect }

export default getBoundingRect