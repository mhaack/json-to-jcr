# AEM Edge Deliver Service JSON to jcr JSON

A simple helper to convert a AEM Edge Deliver Service json into an JCR json format which can be uploaded to the repository.

Usage:

Run to convert the JSON, output will be stored in `jcr` folder.

```bash
node index.js https://main--builder-prospect--sapudex.aem.page/aemedge/tagging-contenthub.json
```

Run the following command to get it imported into your AEM Author env.

```bash
curl -u admin:admin \
     -F":name=config" \
     -F":contentFile=@config.json" \
     -F":operation=import" \
     -F":contentType=json" \
     -F":replace=true" \
     -F":replaceProperties=true" \
     http://localhost:4502/content/page
```
