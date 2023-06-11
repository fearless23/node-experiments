/*
f: T -> Z  ( original function )
g: T -> Q  ( modified function G ) & Q is WrapperType of Z
m: (Q, g) -> Q
*/

// f: string -> user
const get_user = async (logger, user_id) => {
  const user = await db.get_user(logger, user_id);
  return user;
}

// g: string -> user|error
const get_user_2 = async (logger,user_id) => {
  const user = await db.get_user(logger, user_id);
  if(!user) throw new Error('user not found')
  return user;
}

// m
const myMonad = (Q, g) => {
  if(Q) return Q;
  throw new Error('user not found')
}
