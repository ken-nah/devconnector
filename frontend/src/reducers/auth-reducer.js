const initialState = {
  isAuthenticated: false,
  user: {}
};
export default function(
  state = initialState,
  { payload, type }
) {
  switch (type) {
    default:
      return state;
  }
}
