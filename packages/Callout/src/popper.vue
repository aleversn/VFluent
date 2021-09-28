<script>
export default {
    name: "FvOutsidePopper",
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
    },
    data() {
        return {
            target: null,
            style: {
                callout: {},
                beak: {},
            },
            class:{
                callout:[]
            },
            callout: {
                style: {},
                class: [],
            },
            transition: "fv-callout-fade",
            theme: "light",
            show: false,
            open: true,
            width: 0,
            height: 0,
            position: "",
            visibility: "visible",
            transitionStyle: undefined,
        };
    },
    watch: {
        show(val,oldVal) {
            if (this.target != null) {
                this.target.showFunc(val);
            }
        },
    },
    render() {
        return (
            <transition name="fv-callout-fade">
                <div
                    name="fv-callout"
                    style={[
                        this.style.callout,
                        this.callout.style,
                    ]}
                    class={["fv-" + this.theme + "-callout", this.callout.class,this.class.callout]}
                    v-show={this.show}
                >
                    <div class="fv-callout-bg"></div>
                    <div class="beak" style={this.style.beak}></div>
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
            </transition>
        );
    },
};
</script>

<style>
</style>