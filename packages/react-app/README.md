# Mellow Finance Front End
Front end template

## Setup & Installation

```bash


pnpm i
pnpm run dev
```
Navigate to the directory containing mellowfi.base
Open a new terminal and type this command: cd packages/react-app/
Run `pnpm i` to install all the required dependencies to run the dApp.
Run `pnpm run dev` to run the development server
Ctrl+click the local host link to access the Mellow Finance website
On the home page, click the "Get Started" button
Click "Connect Wallet"
Select the wallet you would like to connect from the options provided (Coinbase wallet, Metamask, Rainbow, WalletConnect). Tip: We prefer connecting with the Coinbase wallet because it does not require you to recall your seed phrase. Even if you do not have a Coinbase wallet yet, you can easily sign up from the Mellow finance dApp. 
Click 'Sign up'
Click the 'Create' button on the pop up. This creates a passkey to sign in to keys.coinbase.com
Create a recovery pin. This helps you access your saved passkeys on any device.
Up to this point, you have successfully connected your Coinbase wallet on Mellow Finance--Congratulations!



## Architecture

-   `/pages` includes the main application components (specifically `index.tsx` and `_app.tsx`)
    -   `_app.tsx` includes configuration
    -   `index.tsx` is the main page of the application
-   `/components` includes components that are rendered in `index.tsx`
-   `/public` includes static files
