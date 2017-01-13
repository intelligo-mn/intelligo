import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    post: {
        status: 'INIT',
        error: -1
    },
    list: {
        status: 'INIT',
        data: [],
        isLast: false
    },
    edit: {
        status: 'INIT',
        error: -1
    },
    remove: {
        status: 'INIT',
        error: -1
    },
    star: {
        status: 'INIT',
        error: -1
    }
};

export default function memo(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch(action.type) {
        /* MEMO_POST */
        case types.MEMO_POST:
            return update(state, {
                post: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.MEMO_POST_SUCCESS:
            return update(state, {
                post: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.MEMO_POST_FAILURE:
            return update(state, {
                post: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });

        /* MEMO_LIST */
        case types.MEMO_LIST:
            return update(state, {
                list: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.MEMO_LIST_SUCCESS:
            if(action.isInitial) {
                return update(state, {
                    list: {
                        status: { $set: 'SUCCESS' },
                        data: { $set: action.data },
                        isLast: { $set: action.data.length < 6 }
                    }
                });
            }

            if(action.listType === 'new') {
                return update(state, {
                    list: {
                        status: { $set: 'SUCCESS' },
                        data: { $unshift: action.data }
                    }
                });
            }

            return update(state, {
                list: {
                    status: { $set: 'SUCCESS' },
                    data: { $push: action.data },
                    isLast: { $set: action.data.length < 6 }
                }
            });

        /* MEMO EDIT */
        case types.MEMO_EDIT:
            return update(state, {
                edit: {
                    status: { $set: 'WAITING ' },
                    error: { $set: -1 },
                    memo: { $set: undefined }
                }
            });
        case types.MEMO_EDIT_SUCCESS:
            return update(state, {
                edit: {
                    status: { $set: 'SUCCESS' }
                },
                list: {
                    data: {
                        [action.index]: { $set: action.memo }
                    }
                }
            });
        case types.MEMO_EDIT_FAILURE:
            return update(state, {
                edit: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });

        /* MEMO REMOVE */
        case types.MEMO_REMOVE:
            return update(state, {
                remove: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.MEMO_REMOVE_SUCCESS:
            return update(state, {
                remove:{
                    status: { $set: 'SUCCESS' }
                },
                list: {
                    data: { $splice: [[action.index, 1]] }
                }
            });
        case types.MEMO_REMOVE_FAILURE:
            return update(state, {
                remove: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });

        /* MEMO STAR */
        case types.MEMO_STAR:
            return update(state, {
                star: {
                    status: { $set: 'WAITING '},
                    error: { $set: -1 }
                }
            });
        case types.MEMO_STAR_SUCCESS:
            return update(state, {
                star: {
                    status: { $set: 'SUCCESS' }
                },
                list: {
                    data: {
                        [action.index]: { $set: action.memo }
                    }
                }
            });
        case types.MEMO_STAR_FAILURE:
            return update(state, {
                star: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        default:
            return state;
    }
}
