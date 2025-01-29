export const formReducer = (
  state: any,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.payload.field]: action.payload.value };
    case 'SET_ALL':
      return { ...action.payload };
    default:
      return state;
  }
};
