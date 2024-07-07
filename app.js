const express = require('express');
const app = express();
const path = require('path');
const port = 3001;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin/public', express.static(path.join(__dirname, 'admin/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const livereload = require('livereload');
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
const connectLivereload = require('connect-livereload');
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASE_PASSWORD)
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// إعداد التوجيهات
const allRoutes = require('./routes/allRoutes');
const adminRoutes = require('./admin/routes/adminRoutes');

app.use('/admin', adminRoutes);
app.use(allRoutes);
