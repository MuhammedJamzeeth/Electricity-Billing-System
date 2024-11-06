
export const handleInputChange = (event, setState) => {
  setState((prevState) => ({
    ...prevState,
    [event.target.name]: event.target.value
  }));
};