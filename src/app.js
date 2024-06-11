const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const membershipRoutes = require('./routes/membershipRoutes');
const addonServiceRoutes = require('./routes/addonServiceRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');

app.use('/api/memberships', membershipRoutes);
app.use('/api/addonService', addonServiceRoutes);
app.use('/api/invoices', invoiceRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
