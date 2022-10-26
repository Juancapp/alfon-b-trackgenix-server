import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('635408ff26249caf8f9a98b3'),
  name: 'Calley',
  startDate: '3/30/2021',
  endDate: '9/28/2022',
  description: 'non mauris morbi non lectus aliquam sit amet',
  clientName: 'Caitrin',
  active: true,
  employees: [
    {
      employee: mongoose.Types.ObjectId('6354039c6d5cab252b86b580'),
      role: 'DEV',
      rate: 120,
    },
  ],
},
{
  _id: mongoose.Types.ObjectId('635409049a99e64693f9c43a'),
  name: 'Ashlin',
  startDate: '9/15/2021',
  endDate: '8/1/2022',
  description: 'curabitur convallis duis consequat dui nec nisi volutpat eleifend',
  clientName: 'Kristien',
  active: true,
  employees: [
    {
      employee: mongoose.Types.ObjectId('6354039c6d5cab252b86b580'),
      role: 'DEV',
      rate: 120,
    },
    {
      employee: mongoose.Types.ObjectId('6354039c6d5cab252b86b580'),
      role: 'QA',
      rate: 110,
    },
  ],
}];
