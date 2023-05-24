### e-commerce

NodeJS should be installed and added to System vars.  
Redux DevTools (RD) extension should be added to browser.

- Clone repo to local dir, open cmd.exe in it, and run (backend server): npm i && npm run prod
- In another cmd.exe run (frontend server): cd frontend && npm i --force && npm start
- In browser:
  - go to (stripe.com/docs/testing >) stripe.com/docs/testing#regulatory-cards > 3D Secure auth > Always authenticate > copy card # (4000 0027 6000 3184)
  - Login > Cart > Check out > Continue > Proceed to Payment > paste card # > any future expiry and any cvc > Pay
  - go to Stripe Dashboard > Payments
