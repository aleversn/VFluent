import emailHead from './emailHead.vue';
import emailCell from './emailCell.vue';

export default {
    name: 'Email',
    type: 'email',
    icon: 'Accounts',
    emoji: '@',
    headComponent: emailHead,
    cellComponent: emailCell,
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