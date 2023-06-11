const getUser = async ({ email, user_id }) => {
  if (user_id) {
    const [user] = await db.getUserById(user_id);
    return user;
  }
  else if (email) {
    const [user] = await db.getUserById(user_id);
    return user;
  }
  else {
    throw new Error(`one of email or user_id is required`)
  }
}

const getUser2 = async ({ email, user_id }) => {
  if (!user_id && !email) throw new Error(`one of email or user_id is required`);

  if (user_id) {
    const [user] = await db.getUserById(user_id);
    return user;
  }

  const [user] = await db.getUserById(user_id);
  return user;
}

const getUser3 = async (email, user_id) => {
  // logic to get user
};

const getUser4 = async ({ email='', user_id }) => {
  // logic to get user
  email.trim().toLowerCase()
};

// email lowercase
// lodash get