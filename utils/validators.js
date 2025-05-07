exports.validateUserInput = ({ name, email, password }) => {
    if (!name || !email || !password) return 'All fields required';
    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(email)) return 'Invalid email format';
    return null;
  };
  