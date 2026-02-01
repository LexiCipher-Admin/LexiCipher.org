# Font Files Required

This directory should contain the OpenDyslexic font files for the application to work correctly.

## Required Files

1. `OpenDyslexic-Regular.otf`
2. `OpenDyslexic-Bold.otf`

## How to Obtain

### Option 1: Download from OpenDyslexic Official Site
1. Visit: https://opendyslexic.org/
2. Download the font package
3. Extract the `.otf` files and place them in this directory

### Option 2: Download from GitHub
1. Visit: https://github.com/antijingoist/opendyslexic
2. Navigate to the `compiled` folder
3. Download `OpenDyslexic-Regular.otf` and `OpenDyslexic-Bold.otf`
4. Place them in this directory

## License

OpenDyslexic is licensed under the SIL Open Font License (OFL).
See: https://opendyslexic.org/license

## After Adding Fonts

Once you've added the font files, your directory structure should look like:

```
app/public/fonts/
├── README.md
├── OpenDyslexic-Regular.otf
└── OpenDyslexic-Bold.otf
```

The fonts will automatically be available at `/fonts/OpenDyslexic-Regular.otf` and `/fonts/OpenDyslexic-Bold.otf` in the application.