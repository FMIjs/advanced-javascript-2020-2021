const Sequelize = require('sequelize');
// const Op = Sequelize.Op;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'trivial.sqlite'
  });

// check connectivity
 
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .then(runDB)
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// describe my model
  
const Model = Sequelize.Model;
class Payment extends Model {}
Payment.init({
  // attributes
  paymentID: {
    type: Sequelize.TEXT,
    primaryKey: true,
    allowNull: false
  },
  amount: {
    type: Sequelize.REAL,
    allowNull: false
  },
  currency: {
    type: Sequelize.TEXT,
    allowNull: false
  },  
  dueDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  payDate: {
    type: Sequelize.DATE
    // allowNull defaults to true
  }
}, {
  sequelize,
  modelName: 'Payment'
  // options
});

// run the program after the 

function runDB() {
    // Note: using `force: true` will drop the table if it already exists
    Payment.sync({ force: false })
        .then(() => {
            return Payment.findOrCreate( {where:  {
                paymentID:  "EE487ee",
                amount:     20.0,
                currency:   "EUR",
                dueDate:    "01-05-2020"
            }});
        })
        .then(() => {
            Payment.findAll().then(payments => {
                console.log("All payments:", JSON.stringify(payments, null, 4));
              });              
        })
        .catch(err => {
            console.error(err);
        });
}