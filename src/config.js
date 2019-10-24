const myConfig = {
  Backend: "https://wasla-backend.herokuapp.com",
  app: {
      server: 'localhost',
      port: 3000
  },
  RuleBase:{
    facts:['Customer Inactivity', 'Count of Customer Promos', 'Sum of Customer Promos Cost'],
    operators:['lessThanInclusive','lessThan','equal','greaterThan','greaterThanInclusive'],
    messages:['Customer reached max allowed number of simultaneous promos', 'Inactive customer found!', 'Customer Reached Max Allowed Promos Cost'],
    categories: ['Customer Retention', 'Fair usage', 'Category 3', 'Category 4']
  }
};

export default myConfig;
