/* Existing resources and prices from the site's product listings. */
window.products = [
  {id:1,title:'Steps to Christ',image:'images/steps-to-christ.jpg',price:9.99,category:'Books',description:'A Christian resource for personal study and spiritual growth.'},
  {id:2,title:'God Predicts Your Future',price:5.95,category:'Bible Studies',image:'images/future.jpg',description:'Explore Bible prophecy through personal study.'},
  {id:3,title:'Last Day Events',image:'images/last-day-events.jpg',price:12.99,category:'Books',description:'A resource for studying the final events of earth’s history.'},
  {id:4,title:'The Desire of Ages',image:'images/the-desire-of-ages.jpg',price:15.99,category:'Books',description:'Study the life and ministry of Jesus Christ.'}
];

window.products = Object.freeze(window.products.map(product => Object.freeze(product)));
