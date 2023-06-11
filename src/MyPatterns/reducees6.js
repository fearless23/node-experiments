// CONVERT ARRAY TO MAP

// FOR EACH
const result = {};
accounts.forEach(account => {
  const { account_id } = account;
  if (!result[account_id]) result[account_id] = account;
});

// FOR EACH
const map = {};
for (const account of accounts) {
  const { account_id } = account;
  if (!result[account_id]) map[account_id] = account;
};

// ES6 reduce,better to set initial value -> easy and readable
const account_map = accounts.reduce((result, account) => {
  const { account_id } = account;
  if (!result[account_id]) result[account_id] = account;
  return result;
}, {});


// EXAMPLE 2: SUM an array

// FOR EACH
let s = 0;
accounts.forEach(i => (s += i.balance));

// FOR EACH
let s2 = 0;
for (const i of accounts) { s2 += i.balance };

// ES6 reduce,better to set initial value -> easy and readable
const balance = accounts.reduce((r, i) => (r += i.balance), 0);