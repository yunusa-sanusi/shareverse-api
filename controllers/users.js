const dashboard = (req, res) => {
  res.send('dashboard');
};

const editProfile = (req, res) => {
  res.send('edit profile');
};

const deleteProfile = (req, res) => {
  res.send('delete profile');
};

module.exports = { dashboard, editProfile, deleteProfile };
