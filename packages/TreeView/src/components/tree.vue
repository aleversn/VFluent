<template>
    <li
        class="fv-TreeView__item"
        :style="{
            color: $attrs.foreground,
        }"
    >
        <div class="fv-TreeView__label-border">
            <div
                ref="label"
                class="fv-TreeView__label"
                :class="revealEffectClass"
                @click="expandFolder($event) && !checkable && click($event)"
                @mousedown="clickItem(item)"
                :style="style.label"
            >
                <checkbox
                    v-if="checkable"
                    ref="checkbox"
                    :status="item.checkboxStatus"
                    v-bind="$attrs"
                    @click="checkable && click($event)"
                />
                <!-- expandFolder twice to ignore parent -->
                <component
                    :is="isUrl($attrs.expandedIcon) ? 'img' : 'i'"
                    ref="expanded"
                    v-if="
                        $attrs.expandedIconPosition == 'left' &&
                        isFolder &&
                        item.expanded
                    "
                    :class="[
                        !isUrl($attrs.expandedIcon)
                            ? `ms-Icon--${$attrs.expandedIcon}`
                            : undefined,
                        !isUrl($attrs.expandedIcon) ? 'ms-Icon' : undefined,
                    ]"
                    :src="
                        isUrl($attrs.expandedIcon)
                            ? $attrs.expandedIcon
                            : undefined
                    "
                    draggable="false"
                />
                <component
                    v-else-if="
                        $attrs.expandedIconPosition == 'left' &&
                        isFolder &&
                        !item.expanded
                    "
                    :is="isUrl($attrs.unexpandedIcon) ? 'img' : 'i'"
                    ref="expanded"
                    :class="[
                        !isUrl($attrs.unexpandedIcon)
                            ? `ms-Icon--${$attrs.unexpandedIcon}`
                            : undefined,
                        !isUrl($attrs.unexpandedIcon) ? 'ms-Icon' : undefined,
                    ]"
                    :src="
                        isUrl($attrs.unexpandedIcon)
                            ? $attrs.unexpandedIcon
                            : undefined
                    "
                    draggable="false"
                />
                <i v-else style="width: 12px" />
                <template v-if="item.icon">
                    <i
                        v-if="!isUrl(item.icon)"
                        class="ms-Icon fv-TreeView__icon"
                        :class="[`ms-Icon--${item.icon}`]"
                    />
                    <img
                        v-else
                        :src="item.icon"
                        class="fv-TreeView__icon"
                        draggable="false"
                    />
                </template>
                <span class="fv-TreeView__text">{{ item.label }}</span>
                <div
                    class="fv-TreeView__right-box"
                    v-if="$attrs.expandedIconPosition == 'right'"
                >
                    <component
                        :is="isUrl($attrs.expandedIcon) ? 'img' : 'i'"
                        ref="expanded"
                        v-if="isFolder && item.expanded"
                        :class="[
                            !isUrl($attrs.expandedIcon)
                                ? `ms-Icon--${$attrs.expandedIcon}`
                                : undefined,
                            !isUrl($attrs.expandedIcon) ? 'ms-Icon' : undefined,
                        ]"
                        :src="
                            isUrl($attrs.expandedIcon)
                                ? $attrs.expandedIcon
                                : undefined
                        "
                        draggable="false"
                    />
                    <component
                        v-else-if="isFolder && !item.expanded"
                        :is="isUrl($attrs.unexpandedIcon) ? 'img' : 'i'"
                        ref="expanded"
                        :class="[
                            !isUrl($attrs.unexpandedIcon)
                                ? `ms-Icon--${$attrs.unexpandedIcon}`
                                : undefined,
                            !isUrl($attrs.unexpandedIcon)
                                ? 'ms-Icon'
                                : undefined,
                        ]"
                        :src="
                            isUrl($attrs.unexpandedIcon)
                                ? $attrs.unexpandedIcon
                                : undefined
                        "
                        draggable="false"
                    />
                </div>
            </div>
        </div>
        <transition name="fv-tree-item-show">
            <tree-content
                ref="content"
                v-if="item.children"
                v-show="item.expanded"
                v-bind="$attrs"
                :children="item.children"
                :deepth="deepth"
                :viewStyle="viewStyle"
                :checkable="checkable"
                :padding="padding"
                @click="clickItem"
            ></tree-content>
        </transition>
    </li>
</template>

<script>
import "office-ui-fabric-core/dist/css/fabric.min.css";
import one from "onecolor";
import id from "../mixins/id.js";
import checkbox from "./checkbox.vue";

export default {
    name: "FvTreeViewItem",
    components: {
        TreeContent: () => import("./content.vue"),
        checkbox,
    },
    mixins: [id],
    props: {
        item: {
            default: () => {
                return {};
            },
        },
        theme: {
            default: "system",
            type: String,
        },
        padding: {
            type: Number,
            default: 20,
        },
        deepth: {
            default: 1,
        },
        revealEffect: {
            type: Boolean,
            default: true,
        },
        viewStyle: {},
        checkable: {
            type: Boolean,
            default: false,
        },
    },
    model: {
        prop: "item",
        event: "update:item",
    },
    data() {
        return {
            event: {
                label: {
                    mouseover: () => {
                        this.$set(
                            this.style.label,
                            "backgroundColor",
                            this.hoverColor(
                                this.viewStyle.backgroundColor || "#fff",
                                0.9,
                                0.3
                            ).cssa()
                        );
                    },
                    mouseout: () => {
                        if (!this.item.selected) {
                            this.$set(
                                this.style.label,
                                "backgroundColor",
                                this.viewStyle.backgroundColor || "#fff"
                            );
                        } else {
                            this.$set(
                                this.style.label,
                                "backgroundColor",
                                this.hoverColor(
                                    this.viewStyle.backgroundColor || "#fff",
                                    0.8,
                                    0.2
                                ).cssa()
                            );
                        }
                    },
                },
            },
            style: {
                label: {
                    paddingLeft: 10 + this.deepth * this.padding + "px",
                },
            },
        };
    },
    computed: {
        data: {
            set: function (val) {
                this.$emit("update:item", val);
            },
            get: function () {
                return this.item;
            },
        },
        isFolder() {
            return this.item.children && this.item.children.length > 0;
        },
    },
    watch: {
        "item.selected"(val) {
            this.item.checkboxStatus = this.getStatus();
            this.setLabelBackgroundColor(val);
        },
        viewStyle: {
            handler: function () {
                this.setLabelBackgroundColor(this.item.selected);
                this.initFR();
            },
            deepth: true,
        },
        padding(val) {
            this.$set(
                this.style.label,
                "paddingLeft",
                10 + this.deepth * val + "px"
            );
        },
    },
    beforeCreate() {
        let parent = this.$parent;
        while (parent) {
            if (
                parent.$options.name &&
                parent.$options.name === "FvTreeViewItem"
            ) {
                this.parent = parent;
                return;
            }
            parent = parent.$parent;
        }
    },
    mounted() {
        if (!this.item.selected) {
            this.$set(this.item, "selected", false);
        }
        if (!this.item.expanded) {
            this.$set(this.item, "expanded", false);
        }
        this.$set(this.item, "checkboxStatus", this.getStatus());
        this.initEvent();
        this.$nextTick(() => {
            this.initFR();
            this.initStyle();
        });
    },
    methods: {
        initFR() {
            let className = this.revealEffectClass.length
                ? "." + this.revealEffectClass[0]
                : "";
            new this.$RevealEffects("body", {
                selector: ".fv-TreeView__label" + className,
                // borderLightColor: this.hoverColor(
                //     this.viewStyle.backgroundColor || "#000",
                //     0.3,
                //     1
                // )
                //     .alpha(0.6)
                //     .cssa(),
                backgroundLightColor: this.hoverColor(
                    this.viewStyle.backgroundColor || "#000",
                    0.3,
                    1
                )
                    .alpha(0.3)
                    .cssa(),
                backgroundGradientSize: 150,
            });
            // FluentRevealEffect.applyEffect(
            //     ".fv-TreeView__label-border" + className,
            //     {
            //         lightColor: this.hoverColor(
            //             this.viewStyle.backgroundColor || "#000",
            //             0.3,
            //             1
            //         )
            //             .alpha(0.6)
            //             .cssa(),
            //         gradientSize: 120,
            //     }
            // );
        },
        initStyle() {
            this.$set(
                this.style.label,
                "backgroundColor",
                this.viewStyle.backgroundColor || "#fff"
            );
        },
        initEvent() {
            for (let key in this.event) {
                let events = this.event[key];
                for (let event in events) {
                    this.$refs[key].addEventListener(event, events[event]);
                }
            }
        },
        DestroyEvent() {
            for (let key in this.event) {
                let events = this.event[key];
                for (let event in events) {
                    this.$refs[key].removeEventListener(event, events[event]);
                }
            }
        },
        hoverColor(color, dark, light) {
            let onecolor = one(color);
            if (onecolor.isLight()) {
                return onecolor.lightness(dark);
            } else {
                return onecolor.lightness(+(light ? light : dark));
            }
        },
        click(evt) {
            this.select(this.item.selected ^ true);
            return false;
        },
        expandFolder(evt) {
            // TODO: use v-on stop to instead of this
            if (
                this.$refs.checkbox &&
                evt.target.parentNode?.parentNode?.parentNode ==
                this.$refs.checkbox.$el
            )
                return;
            if (this.isFolder) {
                this.item.expanded ^= true;
            }
            return true;
        },
        getStatus() {
            let selectCount = 0;
            if (!this.item.children || !this.item.children.length) {
                if (this.item.selected) {
                    return "checked";
                } else {
                    return null;
                }
            }
            let children = this.item.children;
            for (let index in children) {
                let item = children[index];
                if (item.selected) {
                    selectCount++;
                }
                if (item.checkboxStatus === "Indeterminate") {
                    return "Indeterminate";
                }
            }
            if (children && selectCount === children.length) {
                return "checked";
            } else if (selectCount > 0) {
                return "Indeterminate";
            } else {
                return null;
            }
        },
        selectAll(item, status) {
            for (let index in item.children) {
                let child = item.children[index];
                this.selectAll(child, status);
            }
            item.selected = status;
        },
        updateSelect() {
            this.item.checkboxStatus = this.getStatus();
            if (this.item.checkboxStatus === "checked") {
                this.item.selected = true;
            } else {
                this.item.selected = false;
            }
            if (this.parent) {
                this.parent.updateSelect();
            }
        },
        select(status) {
            if (!this.checkable) {
                this.item.selected ^= true;
                return;
            }
            this.selectAll(this.item, status);
            this.updateSelect();
        },
        setLabelBackgroundColor(val) {
            if (val) {
                this.$set(
                    this.style.label,
                    "backgroundColor",
                    this.hoverColor(
                        this.viewStyle.backgroundColor || "#fff",
                        0.8,
                        0.2
                    ).cssa()
                );
            } else {
                this.$set(
                    this.style.label,
                    "backgroundColor",
                    this.viewStyle.backgroundColor || "#fff"
                );
            }
        },
        clickItem(item) {
            this.$emit("click", item);
        },
        updateParent() {
            let parent = this.$parent;
            while (parent) {
                if (
                    parent.$options.name &&
                    parent.$options.name === "FvTreeViewItem"
                ) {
                    this.parent = parent;
                    return;
                }
                parent = parent.$parent;
            }
        },
    },
    beforeDestroy() {
        this.DestroyEvent();
    },
};
</script>