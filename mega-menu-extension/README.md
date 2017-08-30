## mega-menu-extension

This is where you include your WebPart documentation.

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


?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&customActions={"9ad64a3e-97a9-40da-8ef9-4e15f1ed81b4":{"location":"ClientSideExtension.ApplicationCustomizer","properties":{"Property1":"value"}}}