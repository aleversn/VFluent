import InfoBox from './src/index.vue'

InfoBox.install = function (Vue)
{
    Vue.component(InfoBox.name, InfoBox)

    let currentInfoBox;
    Vue.prototype.$infoBox = (msg, options) =>
    {
        let thisOptions = {
            title: 'Tip',
            status: 'default',
            mode: 'fixed',
            toast: true,
            confirmTitle: '确定',
            cancelTitle: '取消',
            acrylic: false,
            confirm: async () => {},
            cancel: async () => {},
            theme: 'system'
        };
        thisOptions = Object.assign(thisOptions, options);
        currentInfoBox = createInfoBox({
            Vue,
            msg,
            propsData: thisOptions,
            onConfirm: async () => {
                await thisOptions.confirm();
                currentInfoBox = null;
            },
            onClose: async () =>
            {
                await thisOptions.cancel();
                currentInfoBox = null;
            }
        });
    }

    let createInfoBox = ({ Vue, msg, propsData, onConfirm, onClose }) =>
    {
        const infoBox = Vue.extend(InfoBox)
        let m = new infoBox({
            propsData
        })
        m.$slots.msg = [msg];
        m.$mount();
        m.$on('confirm', onConfirm);
        m.$on('close', onClose);
        document.body.appendChild(m.$el);
        return m;
    };
}

export default InfoBox;
