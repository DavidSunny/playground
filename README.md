## React, Redux based Search app demo

### Preview

![Search-app.gif](https://media.giphy.com/media/DQdZpO5Fxl5cyRBPKk/giphy.gif)

### Get started

```bash
npm install
npm start

# Type 'localhost:3001' in address bar
```

### Folder Structure

```
webpack
  -- helpers
  -- client.dev.js
  -- server.dev.js
src
  -- assets
    -- img
  -- client
    -- configureStore.js
    -- envHelper.js
    -- index.js : Webpack client entry
  -- server
    -- api
    -- middlewares
    -- settings
    -- configureStore.js
    -- index.js
    -- render.js : Webpack server entry
  -- shared
    -- lib : Local libraries
    -- react
      -- components : View Components
      -- hoc : Higher Order Components
      -- layout : Layout Components
      -- pages : Page Container Components
    -- redux
      -- actions
      -- reducers
    -- router : React-First-Router
      -- pages
      -- index.js
    -- styles : Global style files
      -- css
        -- main.css
      -- scss
        -- common
        -- utils
        -- main.scss
```
