import MessageBar from './src/index.vue'
import gsap from 'gsap';

MessageBar.install = function (Vue)
{
    Vue.component(MessageBar.name, MessageBar)

    let currentMsgBar;
    Vue.prototype.$barWarning = (msg, options) =>
    {
        let thisOptions = {
            status: 'default',
            showControl: false,
            showClose: true,
            control: '',
            mode: 'fixed',
            autoClose: 3000
        };
        thisOptions = Object.assign(thisOptions, options);
        if (currentMsgBar)
            currentMsgBar.destroySelf();
        currentMsgBar = createMsgBar({
            Vue,
            msg,
            control: thisOptions.control,
            propsData: thisOptions,
            onClose: () =>
            {
                currentMsgBar = null;
            }
        });
    }

    let createMsgBar = ({ Vue, msg, control, propsData, onClose }) =>
    {
        const msgBar = Vue.extend(MessageBar)
        let m = new msgBar({
            propsData
        })
        m.$slots.msg = [msg];
        m.$slots.control = [control];
        m.$mount();
        m.$on('close', onClose);
        document.body.appendChild(m.$el);
        m.$el.style.top = '-100%';
        gsap.to(m.$el, {
            top: 0,
            duration: 0.3
        });
        return m;
    };
}

export default MessageBar;
