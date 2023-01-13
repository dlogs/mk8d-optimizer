# Mario Kart 8 Optimizer

Kart build optimizer for Mario Kart 8 Deluxe

Hosted by Cloudflare Pages at [https://mk8d-optimizer.pages.dev/](https://mk8d-optimizer.pages.dev/)

To see what each stat really does, see the [Super Mario Wiki's descriptions](https://www.mariowiki.com/Mario_Kart_8_Deluxe_in-game_statistics#Statistics_translation_tables)

## Weights

Terrain weights allow for a single stat that is the weighted average of the terrain-specific values

Diminishing returns allows for creating a more balanced cart by reducing the value of each additional point by the % specified

## Stats Sources

"In Game" Stats are from the [Super Mario Wiki](https://www.mariowiki.com/Mario_Kart_8_Deluxe#Drivers'_and_vehicle_parts'_statistics)

"Raw" Stats are from [Luigi_Fan2's spreadsheet](https://docs.google.com/spreadsheets/d/1g7A-38tn9UAIbB2B3sZI-MpILsS3ZS870UTVMRRxh4Q/edit#gid=0)

## Developing

### Build Commands

This project uses [Vite](https://vitejs.dev/)

`npm run dev` - start the local dev server

`npm run build` - build for production

`npm run preview` - locally preview production build

This project uses eslint + prettier for linting

`npm run lint` - run eslint

`npm run lint:fix` - run eslint and fix errors

`npm run format` - run prettier

### Code Structure

It's a bit of a mess right now, but the front-end assets attempt to use [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

The optimizer logic is primarily in `src\optimizer`
