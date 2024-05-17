import TableView from './src/index.vue'
import tableViewHeadBase from './src/sub/tableViewHeadBase.vue';
import tableViewCellBase from './src/sub/tableViewCellBase.vue';

TableView.install = function (Vue) {
    Vue.component(TableView.name, TableView)
    Vue.component(tableViewHeadBase.name, tableViewHeadBase)
    Vue.component(tableViewCellBase.name, tableViewCellBase)
}

export default TableView;

