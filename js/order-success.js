/* No order processor is connected; this page must not claim a completed purchase. */
document.querySelector('.success-box h1').textContent='Order status unavailable';
document.querySelector('.success-box .intro').textContent='This website has not processed a payment or submitted an order. Contact the ministry to confirm your order and arrange payment.';
document.querySelector('.success-icon').textContent='i';
document.querySelectorAll('.success-box .section, .total-box').forEach(section=>section.hidden=true);
