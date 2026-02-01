# Beni Affet ♥ – Romantic Browser Game

A small romantic mini game: a gift for your special someone.

## How to Run Locally

1. Create a folder (e.g. `oyunn`) and put these files inside:
   - `index.html`
   - `styles.css`
   - `script.js`

2. **Option A – Double-click**  
   Open `index.html` in your browser.

3. **Option B – Local server (recommended for YouTube)**  
   Some browsers restrict YouTube embeds when opening `file://`. Use a simple server:
   - With Python 3: `python -m http.server 8000`
   - Then visit: `http://localhost:8000`

4. **Mobile:**  
   Run the server, find your computer’s IP (e.g. `ipconfig` on Windows), and open `http://YOUR_IP:8000` on the phone.

## Customization

In `script.js`, edit the `CONFIG` object:

- `mainText` – Main message text  
- `runawayButtonText` – Text of the “runaway” button  
- `acceptButtonText` – Text of the “accept” button  
- `youtubeVideoId` – YouTube video ID (from the URL)  
- `acceptScaleIncrement` – How much the accept button grows per failed click  
- `numberOfHearts` – Number of floating hearts  

In `styles.css`, edit `:root` variables for colors.