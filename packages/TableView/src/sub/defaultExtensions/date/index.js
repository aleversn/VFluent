import dateHead from './dateHead.vue';
import dateCell from './dateCell.vue';

export default {
    name: 'Date',
    type: 'date',
    icon: 'Calendar',
    emoji: '📅',
    headComponent: dateHead,
    cellComponent: dateCell,
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