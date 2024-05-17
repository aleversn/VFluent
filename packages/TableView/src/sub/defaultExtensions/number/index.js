import numberHead from './numberHead.vue';
import numberCell from './numberCell.vue';

export default {
    name: 'Number',
    type: 'number',
    icon: 'NumberField',
    emoji: '🔢',
    headComponent: numberHead,
    cellComponent: numberCell,
    filter: ({ input, value }) => {
        if (!input) return true;
        return (
            input === value
        );
    },
    sortAsc: (a, b) => {
        return a.localeCompare(b);
    },
    sortDesc: (a, b) => {
        return b.localeCompare(a);
    }
}