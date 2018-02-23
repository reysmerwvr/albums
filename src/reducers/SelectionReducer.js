export default (state = null, action) => {
    switch (action.type) {
        case 'select_libray':
            return action.payload;
        default:
            return state;
    }
};
