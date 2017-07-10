## mega-menu-sample

Testing out SPFx and SPFx-extensions. 

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO

### Test options

?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&customActions={"aa8622ad-1815-4a49-a276-ee8991d1ca64":{"location":"ClientSideExtension.ApplicationCustomizer","properties":{"Header":"Header%20area%20of%20the%20page","Footer":"Footer%20area%20in%20the%20page"}}}