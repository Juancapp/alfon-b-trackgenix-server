import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('63540a1ca582999d7ae4dbff'),
  description: 'auctor sed tristique in tempus sit amet sem fusce',
  date: '12/26/2020',
  task: mongoose.Types.ObjectId('6354059cd8bf9864098d13c9'),
  hours: 10,
  employee: mongoose.Types.ObjectId('63540397a5be57cf8ebf17d6'),
  project: mongoose.Types.ObjectId('635408ff26249caf8f9a98b3'),
},
{
  _id: mongoose.Types.ObjectId('63540a20f87e0242a09e1f83'),
  description: 'cubilia curae mauris viverra diam vitae quam suspendisse',
  date: '10/8/2020',
  task: mongoose.Types.ObjectId('635405a0ab8783392fe27376'),
  hours: 11,
  employee: mongoose.Types.ObjectId('6354039c6d5cab252b86b580'),
  project: mongoose.Types.ObjectId('635409049a99e64693f9c43a'),
}];
