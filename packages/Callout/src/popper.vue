<script>
export default {
    name: 'FvOutsidePopper',
    props: {
        nodes: {
            type: Object,
            default: () => {
                return {
                    main: [],
                    header: [],
                    footer: [],
                };
            },
        },
        popperStyle: {
            type: Object,
            default: () => {},
        },
        popperClass: {
            type: Array,
            default: () => [],
        },
        popperContentClass: {
            type: Array,
            default: () => [],
        },
        show: {
            type: Boolean,
            default: false,
        },
        theme: {
            type: String,
            default: 'light',
        },
        keepalive: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            style: {
                callout: {},
                beak: {},
            },
            class: {
                callout: [],
            },
            transition: 'fv-callout-fade',
            target: null,
        };
    },
    computed: {
        targetElement() {
            if (this.target == undefined) return this.target;
            return this.target.$el.firstElementChild || this.target.$el;
        },
        popperShow() {
            if (!this.targetElement) {
                return false;
            }
            // const rect = this.targetElement.getBoundingClientRect();
            if (this.target.disabled) {
                //  || rect.width == 0 || rect.height == 0) {
                return false;
            }
            return this.show;
        },
    },
    render() {
        return (
            <transition name="fv-callout-fade">
                <div name="fv-callout" style={[this.style.callout, this.popperStyle]} class={['fv-' + this.theme + '-callout', this.popperClass, this.class.callout]} v-show={this.popperShow}>
                    <div class="fv-callout-bg"></div>
                    <div class="beak" style={this.style.beak}></div>
                    {(this.show || this.keepalive) ? (
                        <div class={[this.popperContentClass]}>
                            <div class="header" v-show={this.nodes.header.length} key="header">
                                {this.nodes.header}
                            </div>
                            <div class="main" v-show={this.nodes.main.length} key="main">
                                {this.nodes.main}
                            </div>
                            <div class="footer" v-show={this.nodes.footer.length} key="footer">
                                {this.nodes.footer}
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </transition>
        );
    },
};
</script>

<style>
</style>