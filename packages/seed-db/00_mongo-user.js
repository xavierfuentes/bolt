db.createUser({
  user: 'bolt',
  pwd: 'Fa5t35t!',
  roles: [{ role: 'readWrite', db: 'bolt' }],
});
