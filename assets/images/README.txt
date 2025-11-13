needed lib svg-sprite cli - https://github.com/svg-sprite/svg-sprite/


put all svg files to src/assets/img and then to create sprite execute command:
svg-sprite --view=true --view-bust=false  --vs=sprite.svg   --dest=src/assets/build src/assets/img/*/*.svg src/assets/img/*.svg
